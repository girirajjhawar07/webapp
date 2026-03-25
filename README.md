# CosmeticTrust – Counterfeit & Expiry Verification App

Production-oriented MVP for web + mobile-friendly skincare authentication.

## Stack
- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend:** Node.js + Express
- **Data:** MongoDB via Mongoose (with in-memory demo fallback if `MONGODB_URI` is not provided)
- **Auth:** JWT (email/password + Google endpoint stub)

## Features Delivered
- User authentication (`/api/auth/register`, `/api/auth/login`, `/api/auth/google`)
- Mobile-first scanner workflow: **Scan → Verify → Result**
- QR/barcode/batch verification with OCR-style batch parsing helper
- Authenticity engine with statuses: `genuine`, `suspicious`, `expired`, `not_found`
- Simulated tamper checks (seal signature validation + duplicate scan anomaly)
- Trust score calculation
- Brand admin dashboard (`/admin`) for batch upload and unique unit QR generation
- Demo data included in memory store + Mongo seed script

## Folder Structure
```
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── data
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── services
│   └── package.json
└── frontend
    ├── src/app
    ├── src/components
    ├── src/lib
    └── package.json
```

## Quick Start
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

If you have MongoDB:
```bash
# in backend/.env
MONGODB_URI=mongodb://localhost:27017/cosmeticauth
npm run seed
```

### 2) Frontend
```bash
cd frontend
npm install
NEXT_PUBLIC_API_BASE=http://localhost:4000 npm run dev
```

Open:
- Consumer app: `http://localhost:3000`
- Brand dashboard: `http://localhost:3000/admin`

## Demo Accounts
- Register from UI for consumer testing.
- In in-memory mode, brand admin seed identity:
  - `brand@dermaguard.com` (no password; create token via API register/login flow or adapt quickly for your OAuth/SSO).

## Key Verification Rules (MVP)
1. Product exists in brand registry? If no → `not_found`.
2. Expired date passed? → `expired`.
3. Near expiry (≤45 days), seal mismatch, or repeated scans (>=4) → `suspicious`.
4. Otherwise → `genuine`.

Trust score starts at 100 and decays based on risk signals.

## Scalability Notes
- Repository abstraction supports swapping memory store with MongoDB collections.
- Add Redis for scan burst detection and geo-fraud clustering.
- Extend tamper logic with cryptographic signed payloads per QR.
- Integrate OpenAI Vision or Tesseract for OCR image parsing from camera frames.

