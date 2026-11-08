# StudioSpace 🎬 — Creative Venue & Studio Booking Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-JWT-indigo?style=for-the-badge)](https://better-auth.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

StudioSpace is a full-stack creative venue booking marketplace designed for filmmakers, photographers, podcast producers, and audio engineers. It seamlessly connects creative professionals with specialized studios, stages, and production facilities.

---

## 🌐 Live Preview

- **Live Application URL:** [https://studiospace.vercel.app](https://studiospace.vercel.app) *(Replace with your deployed client URL)*
- **Backend API URL:** [https://studiospace-api.onrender.com](https://studiospace-api.onrender.com) *(Replace with your deployed server URL)*

---

## 🌟 Key Features

- **Dynamic Studio Discovery & Categories:** Browse creative spaces categorized into specialized tiers (Film Stages, Cyclorama Walls, Podcast Lounges, Audio Booths) with real-time availability filters.
- **Secure Authentication & Token Authorization:** Integrated modern session handling and JWT issuance using **BetterAuth**, safeguarding protected endpoints across frontend and backend services.
- **Host Dashboard & Listing Management:** Authenticated hosts can add new studio spaces, manage pricing, update descriptions, and remove active listings with ownership-level validation.
- **Interactive Booking Lifecycle:** Seamlessly reserve dates and time slots with instant cost calculations, booking confirmation states, and personal reservation tracking (`/myBookings`).
- **Resilient Error Handling & Theming:** Custom 404 studio-striking screens, full dark/light system adaptation with `next-themes`, zero-layout-shift hydration safeguards, and animated loading suspense transitions.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework:** Next.js (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn/UI primitives
- **Icons & UI:** Lucide React, React Icons
- **Theming:** `next-themes` (Dark / Light mode support)
- **Notifications:** Shadcn Toaster
- **Auth Client:** BetterAuth React Client (`@better-auth/client`) with JWT Plugin

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Native Driver)
- **Security & Tokens:** `jsonwebtoken` (JWT verification), CORS, Dotenv

---

## 🔑 Test Credentials (For Evaluator & Examiner)

Use the following credentials to test authenticated features (such as adding spaces, making reservations, and reviewing user dashboards):

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Standard User** | `paul@admin.com` | `Ka987654` | Booker Access |

> **Note:** You can also register a brand-new account directly via the Sign-Up modal to test full registration flows.

---

## ⚙️ Local Development Setup

Follow these instructions to clone and run the project locally.

### Prerequisites
- Node.js (v18.x or v20.x recommended)
- Git
- MongoDB connection string (Local or MongoDB Atlas)

---

### 1. Clone the Repository
```bash
git clone https://github.com/Mahidul-Badhon/studio-space
cd studio-space
```

---

### 2. Backend Setup

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Create environment configuration
touch .env
```

Add the following environment variables to `server/.env`:
```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studiospace?retryWrites=true&w=majority
BETTER_AUTH_SECRET=your_jwt_and_session_secret_min_32_characters
CLIENT_URL=http://localhost:3000
```

Start the Express development server:
```bash
npm run dev
# Server runs on http://localhost:8000
```

---

### 3. Frontend Setup

In a new terminal:
```bash
# Navigate to the frontend/root directory
cd client # (or stay in root if Next.js is located at the root)

# Install dependencies
npm install

# Create environment configuration
touch .env.local
```

Add the following environment variables to `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=your_jwt_and_session_secret_min_32_characters
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

