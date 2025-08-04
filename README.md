# 📚 Online Book Store (Full-Stack App)

A modern, full-stack book-selling web app built with **Next.js**, **MongoDB**, and **Prisma**. It includes full user authentication, shopping cart functionality, and secure API routes. Designed to be clean, scalable, and ideal for real-world deployment.

🔗 [GitHub Repository](https://github.com/Aathil1681/online-book-store)

---

## 🚀 Features

- 🔐 **Authentication**
  - JWT-based auth (stored in cookies)
  - Register/Login with validation
  - Passwords hashed using `argon2`
  - Route protection via middleware

- 📚 **Book Store**
  - View available books (image, title, price)
  - Book data fetched from MongoDB using Prisma
  - Add your own products and view other products


- ⚙️ **Backend API**
  - Next.js API Routes
  - Input validation via `Zod`
  - Central error handling with `handleError`
  - Prisma used with `$transaction` for critical flows
  - Protected routes with `middleware`

- 🎨 **Frontend UI**
  - Fully responsive with **Tailwind CSS**
  - Toast feedback with `react-hot-toast`
  - Smooth transitions and clean layout

---

## 🧱 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | Next.js, React, Tailwind CSS |
| Backend      | Next.js API Routes     |
| Database     | MongoDB (via Prisma)   |
| Auth         | JWT + Cookies + Argon2 |
| Validation   | Zod                    |
| Toasts       | react-hot-toast        |
| State Mgmt   | Context API or Zustand |

---

## 📁 Project Structure

/online-book-store
├── app # Next.js 13 app directory
│ ├── api # API route handlers (auth, books, cart, etc.)
│ └── pages # UI pages (login, register, home)
├── components # UI and logic components
├── lib # Prisma client, utilities
├── prisma # Prisma schema and migrations
├── public # Static assets (images)
├── styles # Tailwind global styles
├── .env # Local environment variables
├── .env.sample # Example env for contributors
├── package.json # Scripts and dependencies
└── README.md # Project docs

---


## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Aathil1681/online-book-store.git
cd online-book-store

2. Install Dependencies
  npm install
  
3. Setup Environment Variables
Create a .env file in the root and add the following:

env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_HOST_URL=http://localhost:3000
Or use the included .env.sample to guide setup.

4. Push Prisma Schema

   npx prisma db push

5. Run the Dev Server

   npm run dev


🚀 Deployment
To deploy in production:

npm run build
npm start
Recommend platforms: Vercel, Render, DigitalOcean, or Heroku.

🤝 Contributing
Contributions are welcome!

Fork the repo

Create a new branch git checkout -b feature/your-feature

Commit your changes

Push and open a Pull Request

📄 License
MIT License. Built with ❤️ by Aathil Ihlaas