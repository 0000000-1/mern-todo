import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dns from "node:dns";

import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
import { connectDB } from "./config/db.js";

if (process.env.NODE_ENV !== "production") {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  }),
);

app.use(express.json());

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  app.use(rateLimiter);
} else {
  console.warn("Upstash rate limiter env vars missing; rate limiting disabled.");
}

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.warn("MONGO_URI is not set. The server will start without MongoDB connection.");
}

app.get("/", (req, res) => {
  res.send("Todo API is running...");
});

// 1. Keep the export so other tools (like testing suites) can use it
export const startServer = () => {
  // Render recommends port 10000 by default
  const port = Number(process.env.PORT) || 10000; 
  
  // Explicitly binding to "0.0.0.0" ensures Render intercepts the port mapping flawlessly
  return app.listen(port, "0.0.0.0", () => {
    console.log(`Server started on port: ${port}`);
  });
};

// 2. FIX: Automatically execute the server listener when deploying
startServer();

export default app;
