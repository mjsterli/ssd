# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SSD (Simple Sign Delivery) is a full-stack real estate service management system. It has a Node.js/Express/TypeScript backend, a PostgreSQL database managed via Prisma ORM, and two frontend implementations (Angular and React — both are maintained in parallel).

## Development Setup

Start the backend and database via Docker:
```sh
docker-compose up
```
This starts PostgreSQL on port 5432 and the API on port 3000. On first run, Prisma pushes the schema and seeds the database automatically.

Run a frontend separately:
```sh
# Angular (port 4200)
cd frontend/ssd-angular && npm install && npx ng serve

# React (proxies /api → localhost:3000)
cd frontend/ssd-react && npm install && npm run dev
```

## Common Commands

### Backend (`/backend`)
```sh
npm run dev          # Dev server with hot reload (tsx watch)
npm run build        # Compile TypeScript
npm run test         # Run API tests (Mocha)
npm run btest        # Build then test
npx prisma db push   # Push schema changes to DB
npx prisma db seed   # Seed database with test data
npx prisma studio    # Open Prisma GUI
```

### Angular Frontend (`/frontend/ssd-angular`)
```sh
npx ng serve         # Dev server
npx ng build         # Production build → dist/
npx ng test          # Unit tests (Vitest)
```

### React Frontend (`/frontend/ssd-react`)
```sh
npm run dev          # Dev server (Vite)
npm run build        # Production build
```

## Architecture

### Backend (`/backend/src`)
- `index.ts` — Entry point, listens on port 3000
- `server/server.ts` — Express app, mounts `/api` router
- `server/api/apiRouter.ts` — All API route definitions
- `server/api/handlers/` — Request handlers grouped by entity (customer, order, employee)
- `server/db.ts` — Prisma client instance with computed fields (`FullName`, `FormattedPhoneNumber`)
- `server/twilio/` — SMS/phone integration via Twilio
- `prisma/schema.prisma` — Database schema (Customer, Order, Employee, Fullfillment, RequestService, Attachment)
- `prisma/seed.ts` — Seed data for development
- `shared/operations.js` — Shared ID generation utility

### Database Models
- **Customer** — Client info (name, phone, email, brokerage), has many Orders
- **Order** — Service request (address, occupancy, dates), linked to Customer and RequestService
- **RequestService** — Service types: Real Estate Sign, Supra iBox, Combo Box, Open House Sign
- **Employee** — Staff who fulfill orders
- **Fullfillment** — Tracks order completion
- **Attachment** — Binary file storage per order

### Angular Frontend (`/frontend/ssd-angular`)
Standalone component architecture with Angular 21, TailwindCSS 4, and Vitest for unit tests.

### React Frontend (`/frontend/ssd-react`)
Vite-based app with TanStack Router (file-based routing), MUI components, and styled-components. The Vite dev server proxies `/api` requests to `localhost:3000`.

## Code Style

Prettier is configured in all three packages with consistent rules: double quotes, no trailing commas, 2-space indent. Run `npx prettier --write .` in the relevant directory.

## Database Connection

Local dev: `postgresql://postgres:postgres@localhost:5432/ssd`
Docker internal: `postgresql://postgres:postgres@postgres:5432/ssd`
