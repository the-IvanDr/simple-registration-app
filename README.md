# Instructions to Run the Application

> **Note:** This application was developed using **Node.js v18.18.0**. Make sure to use the same version to avoid compatibility issues.

---

## 0. Install Dependencies

Install all required packages for each part of the application:

```bash
cd blocked-numbers-backend && npm install
cd ../backend && npm install
cd ../frontend && npm install
```

---

## 1. Start Docker Services

Run Docker containers for Redis and MongoDB:

```bash
docker-compose up
```

---

## 2. Configure Environment Variables

Copy the contents of `env-example` to `.env` files in the following directories:

- `backend/.env`
- `blocked-numbers-backend/.env`

Ensure all required variables are correctly set.

---

## 3. Start the Blocked Numbers Service

```bash
cd blocked-numbers-backend
npm run dev
```

---

## 4. Start the Main Backend

```bash
cd backend
npm run dev
```

---

## 5. Start the Frontend Application

```bash
cd frontend
npm run dev
```

---

After completing these steps, the full-stack application should be running with all services connected.
