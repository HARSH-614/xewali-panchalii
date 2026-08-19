# S. BARUAH FOODYVERSE

**A Taste of Assam. A Journey Across India.**

This repository contains the complete frontend architecture and backend setup instructions for the S. Baruah Foodyverse web application. The platform is designed to be a premium, nature-focused, multi-page restaurant system featuring online ordering, dynamic UPI payments, and table reservations.

---

## 1. Project Structure

The project is strictly separated into frontend assets (which can be hosted on any static provider) and a secure Node.js backend.

\`\`\`
/
├── index.html            # Homepage (SEO Optimized)
├── menu.html             # Full Menu Listing
├── menu-item.html        # Single Dish View
├── cart.html             # Shopping Cart
├── checkout.html         # Secure Checkout
├── payment.html          # Dynamic UPI QR Generator
├── track-order.html      # Order Status Tracking
├── reservation.html      # Table Booking Form
├── order-success.html    # Payment Confirmation UI
├── about.html            # Brand Story
├── gallery.html          # Visual Journey
├── contact.html          # Contact & Maps
│
├── css/                  # Design Tokens & Styles
│   ├── main.css          # Global variables & typography
│   ├── components.css    # Navbar, Buttons, Footer
│   └── pages/            # Page-specific styles
│
├── js/                   # Frontend Logic
│   ├── theme.js          # Dark/Light mode toggle
│   ├── language.js       # EN/AS Translation system
│   ├── menu.js           # Search, Filter, Sort logic
│   ├── cart.js           # LocalStorage cart management
│   ├── checkout.js       # Form validation & totals
│   ├── order.js          # Order tracking UI logic
│   ├── payment.js        # Dynamic UPI generation
│   └── admin.js          # SPA dashboard logic
│
├── data/                 
│   ├── menu.js           # Frontend initial menu dataset
│   ├── translations.js   # Bilingual strings
│   └── schema.sql        # PostgreSQL Database Architecture
│
├── admin/                # Authenticated Dashboard
│   ├── index.html        # Login Gateway
│   └── dashboard.html    # Admin Interface
│
└── backend/              # Node.js Server Environment
    ├── server.js         # Express App
    ├── db.js             # PostgreSQL Connection
    ├── package.json      # Dependencies
    ├── routes/           # API Endpoints
    └── utils/            # Email & Payment Adapters
\`\`\`

---

## 2. Local Development (Frontend)

The frontend uses pure Vanilla HTML, CSS, and JS. You do not need Node.js to view the UI.

1. Clone this repository.
2. Open `index.html` directly in your web browser.
3. For the best experience, use a local server extension (like "Live Server" in VS Code) to avoid CORS issues when the JS attempts to fetch local data files.

---

## 3. GitHub Pages Deployment (Frontend)

To make the website public for free:

1. Push this repository to GitHub.
2. Go to your repository **Settings** > **Pages**.
3. Under "Build and deployment", set the source to `Deploy from a branch`.
4. Select the `main` branch and `/root` folder, then click **Save**.
5. Within a few minutes, your frontend will be live at `https://[your-username].github.io/[repo-name]`.

*Note: GitHub Pages only hosts the frontend HTML/CSS/JS. It cannot run the secure backend or verify payments.*

---

## 4. Backend Setup (Production)

To handle real orders securely, you must deploy the `/backend` folder to a Node.js hosting provider (e.g., Render, Railway, DigitalOcean).

1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

---

## 5. Database Setup (PostgreSQL)

The system requires a PostgreSQL database to securely store prices, orders, and customer data.

1. Provision a PostgreSQL database (e.g., Supabase, Render Postgres, AWS RDS).
2. Connect to your database using a tool like pgAdmin or DBeaver.
3. Execute the contents of `data/schema.sql` to generate all tables, enums, and initial settings.

---

## 6. Environment Variables (.env)

In your backend hosting environment (or locally in `backend/.env`), you MUST configure the following secrets. **Never commit this file to GitHub.**

\`\`\`env
# Database Connections
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_PORT=5432

# Server Port
PORT=5000
FRONTEND_URL=https://sbaruahfoodyverse.com

# Email Settings (Phase 9)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=sajalbaruah65@gmail.com
SMTP_PASS=your_google_app_password

# Payment Gateway (Phase 10)
PAYMENT_API_KEY=your_live_key
PAYMENT_API_SECRET=your_live_secret
WEBHOOK_SECRET=your_webhook_secret
\`\`\`

---

## 7. Payment Setup (UPI Architecture)

Currently, the frontend generates a dynamic UPI URI (`sajalbaruah0614@upi`) via `js/payment.js`. 

**CRITICAL WARNING:** A button click on the frontend can NEVER securely verify that money arrived in your bank account. 
To go live with automated payments, you must:
1. Register for a Payment Aggregator (e.g., Razorpay, Cashfree).
2. Add their API keys to your `.env` file.
3. Configure the provider's dashboard to send Webhooks to `https://[YOUR_BACKEND_URL]/api/payment/webhook`.
4. Update `backend/utils/paymentAdapter.js` with the official provider SDK.

---

## 8. Email Setup

Order confirmations and admin alerts are sent via Nodemailer.
1. Enable 2-Step Verification on `sajalbaruah65@gmail.com`.
2. Generate an "App Password" in Google Account Settings.
3. Add this 16-character password to `SMTP_PASS` in your `.env` file.

---

## 9. Admin Setup

The dashboard is located at `/admin/index.html`. 
*   **Development Mock Login:** `admin` / `foodyverse2026`
*   **Production:** Before going live, you must replace the hardcoded Javascript check in `js/admin.js` with an API call to your backend, verifying a hashed password against the `admin_users` table in PostgreSQL.

---

## 10. Production Checklist

Before announcing S. Baruah Foodyverse to the public, ensure:
- [ ] Placeholder images (`/assets/images/*.jpg`) are replaced with real photography of your dishes and garden.
- [ ] Prices in `data/menu.js` match the backend `menu_items` table.
- [ ] The `pendingOrder` testing bypass in `js/payment.js` is removed.
- [ ] Database credentials are secure and not exposed to the public web.
- [ ] Google Maps links and contact numbers are verified.
- [ ] The custom domain (if purchased) is linked to your frontend host.
