# 🔐 SecureGate — Authentication & Security

SecureGate is a full‑stack MERN authentication system built for production‑grade SaaS delivery.  
It features secure user registration, email verification, password reset flows, and branded transactional emails, all deployed on Render with robust environment handling.

---

## 🚀 Features

- ✅ User registration with email verification
- ✅ Login with JWT authentication
- ✅ Password reset request + success flow
- ✅ Branded email templates (green‑themed SecureGate suite)
- ✅ Brevo SMTP integration (via direct API call)
- ✅ Rate‑limited endpoints for security
- ✅ Responsive frontend with React + Tailwind
- ✅ Render deployment with single web service
- ✅ Environment variable safety and build script hygiene

---

## 📧 Email System

SecureGate uses a dual‑environment email setup to ensure safe development and reliable production delivery.

### 🔹 Mailtrap (Development Mode)

Used during local development to safely test and preview emails.

- Captures emails without sending them to real users
- Ideal for debugging templates
- Zero risk of accidental delivery

### 🔹 Brevo SMTP (Production Mode)

Used in production to deliver real transactional emails.

- Verification emails
- Password reset requests
- Password reset confirmations
- Welcome emails

All emails are fully branded with SecureGate’s green theme and mobile‑friendly HTML templates.

---

## 🛠 Tech Stack

| Layer      | Tech                        |
| ---------- | --------------------------- |
| Frontend   | React, Tailwind CSS, Vite   |
| Backend    | Node.js, Express 4          |
| Database   | MongoDB, Mongoose           |
| Auth       | JWT, bcrypt                 |
| Email      | Brevo, Mailtrap             |
| Deployment | Render (single web service) |

---

## 🧪 Local Setup

    git clone https://github.com/viknesh-sathya/secureGate.git
    cd securegate
    npm run build

## Env

    ### GENERAL
        PORT=3000
        NODE_ENV=development
        SUPPORT_EMAIL=support@securegate.com

        CLIENT_URL=https://securegate-5wv8.onrender.com

    ### MONGODB
        MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/securegate

    ### JWT
        JWT_SECRET=your_jwt_secret_here

    ### MAILTRAP (development)
        MAIL_HOST=smtp.mailtrap.io
        MAIL_PORT=2525
        MAIL_USER=your_mailtrap_user
        MAIL_PASS=your_mailtrap_pass
        MAIL_FROM="SecureGate <no-reply@securegate.com>"

    ### BREVO (production)
        BREVO_HOST=smtp-relay.brevo.com
        BREVO_PORT=465
        BREVO_MAIL=your_sender_email
        BREVO_USERNAME=your_brevo_username
        BREVO_PASSWORD=your_brevo_password

![Node](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-black)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Build-purple)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Render](https://img.shields.io/badge/Deploy-Render-blue)
