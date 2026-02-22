# NexStock — Code Challenge

### 🗺️ Roadmap

This document tracks the development progress of the inventory and production control system.
**Stack:** Java 17 (Quarkus), PostgreSQL, React (Vite + Tailwind + Zustand).

---

### 📅 Phase 1: Setup & Foundation (Day 1)
The goal is to have the environment running and the database ready to receive tables.

- [X] **Monorepo Setup**
    - [X] Create the project root folder.
    - [X] Initialize Git (`git init`).
    - [X] Create `.gitignore` (ignoring `target/`, `node_modules/`, `.env`).
- [X] **Backend Setup (Quarkus)**
    - [X] Generate project at code.quarkus.io (Extensions: Quarkus Rest, Hibernate ORM Panache, JDBC Driver - PostgreSQL).
    - [X] Download and extract into `/backend`.
    - [X] Run "Hello World" (`./mvnw quarkus:dev`).
- [X] **Frontend Setup (React)**
    - [X] Create Vite project (`npm create vite@latest frontend -- --template react-ts`).
    - [X] Install and configure TailwindCSS.
    - [X] Install essential libraries: `axios`, `react-router-dom` (or tanstack router).
- [X] **Infrastructure (Docker)**
    - [X] Create `docker-compose.yml` at the root configuring the PostgreSQL service.
    - [X] Start the database (`docker-compose up -d`) and connect via DBeaver/PgAdmin to verify.

---

### 📅 Phase 2: Data Modeling & Basic CRUDs — Backend (Day 2)
Full focus on the API and data persistence. Remember: **code in English**.

- [X] **Entity Modeling (JPA/Panache)**
    - [X] Create Entity `RawMaterial` (id, name, stockQuantity).
    - [X] Create Entity `Product` (id, name, price).
    - [X] Create Entity `ProductComposition` (N:N relationship — id, product, rawMaterial, requiredQuantity).
- [X] **Repositories & Services**
    - [X] Use Panache's Active Record pattern.
    - [X] Create DTOs (Data Transfer Objects) to avoid exposing entities directly.
- [X] **Basic REST Endpoints**
    - [X] Implement `GET /raw-materials` and `POST /raw-materials`.
    - [X] Implement `GET /products` and `POST /products` (basic data only, no composition yet).
    - [X] Test endpoints via Postman/Insomnia/Curl.

---

### 📅 Phase 3: Business Logic & Associations — Backend (Day 3)
The hardest day. Implement the "smart" logic of the system.

- [X] **Composition Feature (RF003)**
    - [X] Adjust `POST /products` or create a dedicated endpoint to receive the list of raw materials and quantities.
    - [X] Ensure that saving a product creates the corresponding rows in the `ProductComposition` table.
- [X] **Production Algorithm (RF004)**
    - [X] Create `ProductionService`.
    - [X] Implement logic: Fetch products → Sort by price (descending) → Check stock → Calculate producible quantity.
    - [X] Create endpoint `GET /products/production-plan` returning a JSON with the production suggestion and total value.
- [X] **Tests (Desired)**
    - [X] Write unit tests (JUnit)
    - [X] Write endpoint tests (RestAssured)

---

### 📅 Phase 4: Frontend — Structure & Simple Forms (Day 4)
Start bringing the system to life visually.

- [X] **Base Components**
    - [X] Create Main Layout (Sidebar + Header + Content Area).
    - [X] Configure Routes (`/`, `/products`, `/materials`, `/production`).
- [X] **API Integration**
    - [X] Configure Axios instance (baseURL).
- [X] **Raw Materials Screen**
    - [X] Create listing table.
    - [X] Create Modal or Form page.
    - [X] Integrate with the backend (List and Create).

---

### 📅 Phase 5: Frontend — Complex Screens (Day 5)
Focus on the Products screen, which requires dynamically selecting raw materials.

- [X] **Products Screen**
    - [X] Create product listing table.
    - [X] **Product Form (The Challenge):**
        - [X] Basic fields (Name, Price).
        - [X] "Recipe" section: "Add Raw Material" button.
        - [X] Dropdown to select Raw Material + Quantity input.
        - [X] Visual logic to add/remove recipe rows.
    - [X] Submit the complete JSON to the backend for saving.

---

### 📅 Phase 6: Dashboard & Refinements (Day 6)
Visualise the output of the system's intelligence.

- [X] **Production Planning Dashboard**
    - [X] Consume the `/products/production-plan` endpoint.
    - [X] Display summary cards: "Estimated Total Value", "Total Items Produced".
    - [X] Display table: Product | Suggested Qty | Unit Price | Subtotal.
- [X] **UI/UX Refinements**
    - [X] User feedback (Toasts for "Saved successfully" or "Connection error").
    - [X] Error handling (e.g. trying to create a product without a name).
    - [X] Check responsiveness (smaller screens).
- [X] **Tests (Desired)**
    - [ ] Write component tests (Vitest or Jest)
    - [X] Write E2E tests (Cypress)

---

### 📅 Phase 7: Delivery & Documentation (Day 7)
The final polish that seals the deal.

- [X] **Documentation (README.md)**
    - [X] Describe the project.
    - [X] **How to Run:** "Just have Docker and run `docker-compose up`".
    - [X] **Technical Decisions:** Explain why Quarkus, Zustand and the Greedy algorithm were chosen.
- [X] **Code Cleanup**
    - [X] Remove `console.log` statements and commented-out code.
    - [X] Verify that all variable names are in English.
- [X] **Build & Deploy (Optional)**
    - [X] Generate React production build (`npm run build`).
    - [ ] (Optional) Deploy to Render/Railway/Vercel.
- [X] **Delivery**
    - [X] Push to GitHub.

---

### 🚀 Status
- [X] **Backend Complete**
- [X] **Frontend Complete**
- [X] **Full Integration Done**
- [X] **Ready for Delivery**
