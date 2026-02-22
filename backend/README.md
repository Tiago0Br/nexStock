# NexStock — Backend

Quarkus REST API for the NexStock inventory management system.

---

## Tech Stack

- **Java 17**
- **Quarkus 3.31.3**
- **Hibernate ORM Panache** (Active Record pattern)
- **Hibernate Validator**
- **PostgreSQL** (production)
- **H2** (tests)
- **JUnit 5** + **REST Assured** (testing)

---

## Prerequisites

- [Java 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/) or use the included `./mvnw` wrapper
- [Docker](https://www.docker.com/) (to run the PostgreSQL database)

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DB_USER` | PostgreSQL username | `docker` |
| `DB_PASSWORD` | PostgreSQL password | `docker` |
| `DB_URL` | JDBC connection URL | `jdbc:postgresql://localhost:5432/stock_db` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |

---

## Running Locally

### 1. Start the database

From the **project root**, start the PostgreSQL container:

```bash
docker compose up -d
```

This starts PostgreSQL on port `5432` with:
- Database: `stock_db`
- User: `docker`
- Password: `docker`

### 2. Start the backend in dev mode

```bash
DB_USER=docker \
DB_PASSWORD=docker \
DB_URL=jdbc:postgresql://localhost:5432/stock_db \
FRONTEND_URL=http://localhost:5173 \
./mvnw quarkus:dev
```

The API will be available at `http://localhost:8080`.  
The Quarkus Dev UI will be available at `http://localhost:8080/q/dev`.

---

## Running Tests

Tests use an **H2 in-memory database** and require no external services.

```bash
./mvnw test
```

Test reports are generated in `target/surefire-reports/`.

---

## API Endpoints

Base URL: `http://localhost:8080`

| Method | Path | Description |
|---|---|---|
| `GET` | `/raw-materials` | List all raw materials |
| `POST` | `/raw-materials` | Create a raw material |
| `PUT` | `/raw-materials/{id}` | Update a raw material |
| `DELETE` | `/raw-materials/{id}` | Delete a raw material |
| `GET` | `/products` | List all products |
| `POST` | `/products` | Create a product |
| `PUT` | `/products/{id}` | Update a product |
| `DELETE` | `/products/{id}` | Delete a product |
| `GET` | `/products/production-plan` | Get the calculated production plan |
