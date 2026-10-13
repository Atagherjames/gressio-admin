# Gressio Admin Portal

Dedicated administration dashboard for the Gressio Campus Platform. Built with the architecture of `scitech-community` using **React 18 + Vite + TypeScript + Tailwind CSS + TanStack Query + Zustand + Lucide Icons**.

## Features

- **Admin Authentication**: Secure login supporting Administrator credentials (`role: ADMIN`) with JWT token storage and session persistence.
- **Registered Users Directory**: Paginated, searchable user registry displaying student accounts, verification badges, contact information, and university affiliations.
- **Marketplace Moderation Board**:
  - Filter by **Pending Approvals**, **Live Products**, and **All Products**.
  - Review seller submissions (images, price, description, seller profile).
  - One-click **Approve & Publish** to instantly make products live in the mobile app.
  - One-click **Unlist / Reject** actions with automated notifications to the seller.

## Administrator Account

- **Identifier / Email**: `security.admin@gressio.app`
- **Username**: `gressioadmin`
- **Role**: `ADMIN`
- **Password**: `Gressio#Secure_Admin%2026!Xk9`


## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:5174](http://localhost:5174) in your browser.
