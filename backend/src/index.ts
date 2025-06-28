import express from "express";
import { connectToDatabase } from "./config/database";
import userController from "./controllers/user.controller";

const app = express();

app.use(express.json());

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
