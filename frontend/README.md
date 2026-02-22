# NexStock — Frontend

React + TypeScript web application for the NexStock inventory management system.

---

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Vite 7** (build tool & dev server)
- **TailwindCSS 4** + **Shadcn/ui** (styling & components)
- **Zustand 5** (state management)
- **React Hook Form** + **Zod** (form handling & validation)
- **Axios** (HTTP client)
- **React Router Dom 7** (routing)
- **Cypress 15** + **MSW 2** (E2E testing with API mocking)
- **Biome** (linter & formatter)

---

## Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

---

## Environment Variables

Create a `.env` file in this directory:

```env
VITE_API_URL=http://localhost:8080
```

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` |

---

## Running Locally

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the dev server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

> Make sure the backend is running before starting the frontend. See `backend/README.md` for instructions.

---

## Available Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Lint and auto-fix with Biome |
| `pnpm format` | Format code with Biome |
| `pnpm test:e2e` | Run E2E tests headlessly (starts dev server automatically) |
| `pnpm test:e2e:open` | Open Cypress interactive runner |

---

## Running E2E Tests

The E2E tests use **Cypress** and **MSW (Mock Service Worker)** to mock all API requests — no running backend is needed.

Run in headless mode:
```bash
pnpm test:e2e
```

Open the interactive Cypress runner:
```bash
pnpm test:e2e:open
```

Both commands automatically start the Vite dev server on port `3001` in `test` mode before launching Cypress.
