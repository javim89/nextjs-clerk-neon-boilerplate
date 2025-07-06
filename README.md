# 🔥 Next.js + Clerk + Neon Boilerplate

This is a modern and minimalist boilerplate that combines [Next.js](https://nextjs.org/), [Clerk](https://clerk.com/) for authentication, and [Neon](https://neon.tech/) as a serverless PostgreSQL database. Ideal for quickly starting your SaaS projects, dashboards, or full-stack web apps.

---

## ✨ Features

- 🔐 User authentication and management with Clerk
- ⚡ Serverless PostgreSQL database with Neon
- 🚀 Hybrid rendering (SSR + SSG) with Next.js 14+
- 📦 Development and production-ready environment setup
- 🧪 Scalable folder structure
- 🛠️ Prisma-ready integration (optional)
- ✅ Strong typing with TypeScript

---

## 📦 Installation

```bash
git clone https://github.com/javim89/nextjs-clerk-neon-boilerplate.git
cd nextjs-clerk-neon-boilerplate
pnpm install
```

## 🔧 Configuration

1. Create a .env.local file based on the .env.example.

2. Complete the environment variables for Clerk and Neon:

```bash
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_FRONTEND_API=...

DATABASE_URL=postgresql://...
```
💡 You need a Clerk and Neon account to get your keys.

## Run in development
```bash
pnpm dev
```
## 🙌 Contributions

Contributions are welcome! Open an issue or make a PR if you have suggestions, improvements, or bugs you'd like to fix.