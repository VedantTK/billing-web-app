# Masala Billing Web App

A production-ready full-stack billing web application specially designed for Masala and Spices wholesalers in India. 
Built to replace paper-based forms and manual calculator math, making invoicing simple, fast, and professional.

## Tech Stack
- Next.js 15 (App Router, React 19)
- TypeScript + Tailwind CSS
- Prisma + PostgreSQL
- Auth.js v5 (NextAuth) for Authentication
- @react-pdf/renderer for beautiful Invoice PDFs
- xlsx for Bulk Excel Import/Export
- Recharts for Dashboard Analytics
- Docker & Docker Compose for easy deployment

## Core Features
1. **Hindi Language First UI**: Designed specifically for non-tech-savvy shop owners.
2. **Product Module**: Add, edit, delete spices with unit (KG, GM, PACK) and prices. Includes Bulk Excel Import.
3. **Category Module**: Organize related products. E.g "चटणी मसाला" can carry 30 products.
4. **Lightning Fast Invoicing**: 
   - Add customer details.
   - Load an entire Category with one click (loads all items with Quantity=0) or manually search.
   - Live Math calculation based on KG/GM handling.
   - Instantly generate an A4 size professional Invoice PDF.
5. **Dashboard Analytics**: Track daily, monthly, and yearly revenue with pie charts and bar charts.
6. **Role Based Access**: Admin (full access) and Staff (billing only).

---

## 🚀 Setup & Local Testing (Docker Recommended)

The easiest way to test this project is via the included Docker and Docker Compose files.

1. **Clone & CD**:
   ```bash
   cd billing-web-app
   ```

2. **Start Docker Compose**: This will spin up the `PostgreSQL` database container and the `Next.js` app container.
   ```bash
   docker compose up -d --build
   ```

3. **Wait for startup**: The Next.js container automatically runs `npx prisma db push` and `npx prisma db seed` on boot. Wait around 20-30 seconds.

4. **Open Application**: 
   - URL: `http://localhost:3000`
   
5. **Login as Admin**: 
   - Default Seeded Email: `admin@masala.com`  
   - Default Seeded Password: `Admin@123`

   *(There is also a seeded Staff account: `staff@masala.com` / `Staff@123`)*

---

## Alternative: Manual Setup (No Docker)

If you'd prefer to run it manually with `npm run dev`:

1. Ensure you have a running PostgreSQL instance locally or remotely (e.g., Neon.tech, Railway).
2. Create an `.env` file from `.env.example` and update the `DATABASE_URL` with your Postgres connection string.
3. Install Dependencies:
   ```bash
   npm install
   ```
4. Push Schema and Seed Database:
   ```bash
   npx prisma db push
   npm run db:seed
   ```
5. Run dev server:
   ```bash
   npm run dev
   ```

## Production Deployment
- **Database**: Use a managed Postgres service like Supabase, Neon.tech, or Render.
- **App**: Host the Next.js app easily on Vercel. 
- Ensure you set `DATABASE_URL`, `AUTH_SECRET`, and `NEXTAUTH_URL` environment variables in your Vercel project settings.

## Maintainer Notes
The database schema (`prisma/schema.prisma`) uses a junction table for Category + Product (Many-to-Many). Prices are stored as Floats, but they are localized automatically on the frontend. The Auth.js session persists the Role for RBAC checks in `middleware.ts`. All data mutations happen securely via App Router Server Actions (`src/actions/*`).
