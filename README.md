# NexStock

A fullstack web application for inventory and production planning control, developed as a code challenge for the Projedata Informática selection process.

---

## Table of Contents

- [NexStock](#nexstock)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Tech Stack](#tech-stack)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Project Structure](#project-structure)
  - [Features](#features)
    - [Raw Materials Management](#raw-materials-management)
    - [Products Management](#products-management)
    - [Production Planning Dashboard](#production-planning-dashboard)
  - [Production Planning Algorithm](#production-planning-algorithm)
  - [API Reference](#api-reference)
    - [Raw Materials — `/raw-materials`](#raw-materials--raw-materials)
    - [Products — `/products`](#products--products)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Running with Docker](#running-with-docker)
    - [Running Locally](#running-locally)
      - [1. Start the database](#1-start-the-database)
      - [2. Start the backend](#2-start-the-backend)
      - [3. Start the frontend](#3-start-the-frontend)
  - [Environment Variables](#environment-variables)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Testing](#testing)
    - [Backend Tests](#backend-tests)
    - [Frontend Tests (E2E)](#frontend-tests-e2e)

---

## Overview

NexStock is a fullstack stock management system that allows users to manage raw materials and finished products, and automatically generate a production plan based on the current inventory. The production planner uses a greedy algorithm to maximize the total value of goods that can be produced with available materials, prioritizing the most expensive products first.

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Core language |
| Quarkus | 3.31.3 | Application framework |
| Hibernate ORM Panache | — | Data persistence (Active Record pattern) |
| Hibernate Validator | — | Bean validation |
| RESTEasy (Quarkus REST) | — | JAX-RS REST API |
| PostgreSQL | — | Production database |
| H2 (in-memory) | — | Test database |
| JUnit 5 | — | Unit testing |
| REST Assured | — | API/integration testing |

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.9 | Type-safe JavaScript |
| Vite | 7 | Build tool & dev server |
| TailwindCSS | 4 | Utility-first styling |
| Shadcn/ui | — | Accessible component library |
| Radix UI | — | Headless UI primitives |
| Zustand | 5 | Global state management |
| React Hook Form + Zod | — | Form handling and validation |
| Axios | — | HTTP client |
| React Router Dom | 7 | Client-side routing |
| Cypress | 15 | End-to-end testing |
| MSW (Mock Service Worker) | 2 | API mocking for tests |
| Biome | 2 | Linter and code formatter |

---

## Project Structure

```
nexstock/
├── docker-compose.yml          # PostgreSQL database service
├── backend/                    # Quarkus Java application
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/br/tiagolopes/
│       │   │   ├── core/       # Error response models
│       │   │   ├── dto/        # Data Transfer Objects
│       │   │   ├── exception/  # Global exception handler
│       │   │   ├── model/      # JPA entities (Product, RawMaterial, ProductComposition)
│       │   │   ├── resource/   # REST endpoints
│       │   │   └── service/    # Business logic
│       │   └── resources/
│       │       ├── application.properties
│       │       └── import.sql
│       └── test/               # JUnit + REST Assured tests
└── frontend/                   # React + TypeScript application
    └── src/
        ├── features/
        │   ├── materials/      # Raw materials feature
        │   ├── products/       # Products feature
        │   └── production/     # Production plan dashboard
        ├── http/               # API request functions
        ├── components/         # Shared UI components
        ├── pages/
        └── types/
```

---

## Features

### Raw Materials Management
- **List** all raw materials with their name, unit and stock quantity
- **Create** new raw materials with name, measurement unit and initial stock quantity
- **Edit** a raw material's details and current stock quantity
- **Delete** a raw material from the inventory

### Products Management
- **List** all registered products with name, price and composition
- **Create** new products defining their name, selling price and the bill of materials (raw material + required quantity)
- **Edit** a product's name, price or composition
- **Delete** a product from the catalog

### Production Planning Dashboard
- Automatically calculates how many units of each product can be manufactured with the current raw material stock
- Prioritizes the most expensive products (greedy algorithm)
- Displays the production plan with per-product quantities, unit price, and subtotal
- Shows total planned production value and total number of items

---

## Production Planning Algorithm

The production plan is computed in `ProductionService` using a **greedy algorithm**:

1. A virtual copy of the current stock is created (no real data is consumed).
2. Products are sorted in **descending order by price**.
3. For each product (most expensive first), the algorithm repeatedly checks if all required raw materials are available in the virtual stock until no more units can be produced.
4. Each produced unit deducts the required quantities from the virtual stock.
5. The result is a list of producible items, the total production value, and the total item count.

This approach maximises the total monetary value of production across a single planning cycle.

---

## API Reference

Base URL: `http://localhost:8080`

### Raw Materials — `/raw-materials`

| Method | Path | Description |
|---|---|---|
| `GET` | `/raw-materials` | List all raw materials |
| `POST` | `/raw-materials` | Create a new raw material |
| `PUT` | `/raw-materials/{id}` | Update a raw material by ID |
| `DELETE` | `/raw-materials/{id}` | Delete a raw material by ID |

**Raw Material body example:**
```json
{
  "name": "Steel",
  "stockQuantity": 500,
  "unit": "kg"
}
```

---

### Products — `/products`

| Method | Path | Description |
|---|---|---|
| `GET` | `/products` | List all products |
| `POST` | `/products` | Create a new product |
| `PUT` | `/products/{id}` | Update a product by ID |
| `DELETE` | `/products/{id}` | Delete a product by ID |
| `GET` | `/products/production-plan` | Get the calculated production plan |

**Product body example:**
```json
{
  "name": "Metal Frame",
  "price": 299.99,
  "composition": [
    { "rawMaterialId": 1, "quantityRequired": 10 },
    { "rawMaterialId": 2, "quantityRequired": 5 }
  ]
}
```

**Production plan response example:**
```json
{
  "items": [
    {
      "productName": "Metal Frame",
      "quantity": 3,
      "unitPrice": 299.99,
      "subTotal": 899.97
    }
  ],
  "totalValue": 899.97,
  "totalItems": 3
}
```

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [Java 17+](https://adoptium.net/) and [Maven](https://maven.apache.org/) (for running the backend locally)
- [Node.js 20+](https://nodejs.org/) and [pnpm](https://pnpm.io/) (for running the frontend locally)

---

### Running with Docker

The `docker-compose.yml` at the root of the project starts the PostgreSQL database:

```bash
docker compose up -d
```

This will start:
- **PostgreSQL** on port `5432` with database `stock_db`, user `docker`, password `docker`

After the database is running, start the backend and frontend manually as described below.

---

### Running Locally

#### 1. Start the database

```bash
docker compose up -d
```

#### 2. Start the backend

```bash
cd backend
DB_USER=docker DB_PASSWORD=docker DB_URL=jdbc:postgresql://localhost:5432/stock_db FRONTEND_URL=http://localhost:5173 ./mvnw quarkus:dev
```

The API will be available at `http://localhost:8080`.  
The Quarkus Dev UI will be available at `http://localhost:8080/q/dev`.

#### 3. Start the frontend

```bash
cd frontend
pnpm install
pnpm dev
```

The application will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend

| Variable | Description | Example |
|---|---|---|
| `DB_USER` | PostgreSQL username | `docker` |
| `DB_PASSWORD` | PostgreSQL password | `docker` |
| `DB_URL` | JDBC connection URL | `jdbc:postgresql://localhost:5432/stock_db` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |

### Frontend

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | API URL | `http://localhost:8080` |

---

## Testing

### Backend Tests

The backend uses **JUnit 5** for unit tests and **REST Assured** for API/integration tests. Tests run against an **H2 in-memory database** automatically configured by the `%test` profile in `application.properties`.

```bash
cd backend
./mvnw test
```

Test reports are generated in `backend/target/surefire-reports/`.

---

### Frontend Tests (E2E)

The frontend uses **Cypress** for end-to-end tests. HTTP requests are intercepted and mocked using **MSW (Mock Service Worker)**, so no running backend is required.

Run tests in headless mode:
```bash
cd frontend
pnpm test:e2e
```

Open the Cypress interactive runner:
```bash
cd frontend
pnpm test:e2e:open
```

These commands will start the Vite dev server in `test` mode on port `3001` and then launch Cypress automatically.
