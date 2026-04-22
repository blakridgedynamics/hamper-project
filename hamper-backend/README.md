# 🧺 Hamper Shop — Backend

Complete Next.js App Router backend for the handmade gift hamper ecommerce store.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | MongoDB + Mongoose |
| Auth | JWT (HttpOnly cookie + Bearer token) |
| Images | Cloudinary v2 |
| Passwords | bcryptjs |
| Payments | Razorpay (stub, ready to enable) |
| Deployment | Vercel / Railway |

---

## Project Structure

```
├── app/
│   └── api/
│       ├── admin/
│       │   ├── login/route.js       POST — admin login
│       │   ├── logout/route.js      POST — admin logout
│       │   └── seed/route.js        POST — one-time admin creation
│       ├── products/
│       │   ├── route.js             GET (list) + POST (create)  [ADMIN]
│       │   └── [id]/route.js        GET / PUT / DELETE           [ADMIN]
│       ├── messages/
│       │   ├── route.js             GET (list) [ADMIN] + POST (create) [PUBLIC]
│       │   └── [id]/route.js        PATCH (mark read) + DELETE   [ADMIN]
│       └── public/
│           └── products/
│               ├── route.js         GET — list products          [PUBLIC]
│               └── [id]/route.js    GET — single product         [PUBLIC]
├── models/
│   ├── Admin.js
│   ├── Product.js
│   └── Message.js
├── lib/
│   ├── db.js           MongoDB singleton connection
│   ├── auth.js         JWT sign / verify / cookie helpers
│   ├── cloudinary.js   Image upload / delete
│   ├── whatsapp.js     WhatsApp order link generator
│   ├── razorpay.js     Razorpay stub (uncomment to activate)
│   └── apiResponse.js  Consistent JSON response helpers
├── middleware/
│   └── withAdmin.js    Higher-order route guard (optional per-route use)
├── middleware.js        Next.js edge middleware (JWT guard on protected routes)
├── scripts/
│   └── seedAdmin.js    CLI script to create first admin
├── next.config.js
├── jsconfig.json
├── .env.example
└── package.json
```

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in all values (see Environment Variables section below).

### 3. Create your first admin account

**Option A — CLI script (recommended)**
```bash
npm run seed:admin
```

**Option B — API endpoint**
```bash
# Add SEED_SECRET=my_secret to .env.local first
curl -X POST http://localhost:3000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword","seedSecret":"my_secret"}'
```

### 4. Start development server

```bash
npm run dev
```

---

## API Reference

### Authentication

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/admin/login` | Public | Login, returns JWT cookie + token |
| POST | `/api/admin/logout` | Public | Clear auth cookie |
| POST | `/api/admin/seed` | Seed secret | One-time admin creation |

**Login request body:**
```json
{ "email": "admin@example.com", "password": "yourpassword" }
```

**Login response:**
```json
{
  "success": true,
  "token": "eyJ...",
  "admin": { "id": "...", "email": "admin@example.com" }
}
```

---

### Admin Product Routes (protected)

All requests must include either:
- The `hamper_admin_token` HttpOnly cookie (set automatically after login), **or**
- `Authorization: Bearer <token>` header

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/products` | List all products (paginated) |
| POST | `/api/products` | Create product (multipart/form-data) |
| GET | `/api/products/:id` | Get single product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product + Cloudinary images |

**Create product (form-data fields):**
```
name         string   required
description  string   required
price        number   required
category     string   required  (birthday|anniversary|wedding|corporate|festive|baby-shower|thank-you|custom)
featured     boolean  optional  (default: false)
images       File[]   optional  (multiple image files)
```

**Query params for GET /api/products:**
```
?category=birthday
?featured=true
?page=1&limit=20
```

---

### Public Product Routes (no auth)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/public/products` | List in-stock products with WhatsApp links |
| GET | `/api/public/products/:id` | Single product detail with WhatsApp link |

Every product in public responses includes a `whatsappOrderLink` field:
```
https://wa.me/919876543210?text=Hi%2C+I+want+to+order+%22Luxury+Hamper%22+%E2%80%94+%E2%82%B91499
```

---

### Contact Form (public)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/messages` | Submit contact form |
| GET | `/api/messages` | List all messages (admin) |
| PATCH | `/api/messages/:id` | Mark message as read (admin) |
| DELETE | `/api/messages/:id` | Delete message (admin) |

**POST body:**
```json
{
  "name": "Priya Sharma",
  "emailOrPhone": "priya@example.com",
  "message": "I'd like a custom hamper for a wedding gift."
}
```

---

## Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/hamper-shop

# Auth
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# WhatsApp
WHATSAPP_NUMBER=919876543210

# Seed (one-time use, can remove after)
SEED_SECRET=your_seed_secret

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production

# Razorpay (add when ready)
# RAZORPAY_KEY_ID=rzp_live_xxx
# RAZORPAY_KEY_SECRET=xxx
```

---

## Connecting to Your Frontend Admin Dashboard

In your existing Next.js admin dashboard, use the token from the login response:

```js
// Login
const res = await fetch('/api/admin/login', {
  method: 'POST',
  credentials: 'include',   // <-- sends/receives the HttpOnly cookie
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})

// All subsequent admin API calls
const products = await fetch('/api/products', {
  credentials: 'include'    // <-- cookie is sent automatically
})
```

---

## Deploying to Vercel

1. Push to GitHub
2. Import project in Vercel dashboard
3. Add all environment variables in Vercel → Settings → Environment Variables
4. Deploy

**Important for Vercel:** MongoDB connections are managed via the singleton in `lib/db.js` which is safe for serverless/edge environments.

---

## Enabling Razorpay (future)

1. `npm install razorpay`
2. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to `.env.local`
3. Open `lib/razorpay.js` and uncomment the full implementation
4. Create `/app/api/orders/route.js` using `createOrder()` and `verifyPaymentSignature()`

---

## Security Notes

- Passwords are hashed with bcrypt (12 salt rounds)
- JWT is stored in an HttpOnly, SameSite=Strict cookie — not accessible to JavaScript
- All admin routes are protected at the Next.js edge middleware level
- Cloudinary images are deleted from CDN when a product is deleted
- The seed endpoint requires a separate `SEED_SECRET` — disable it in production by removing the route
