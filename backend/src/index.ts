import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/database";
import userController from "./controllers/user.controller";

const app = express();

// Configs
app.use(
  cors({
    origin: process.env.FRONTEND_APP_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Routes
app.use("/users", userController);

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
