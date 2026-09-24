import app, { startServer } from "./backend/src/server.js";

export default app;

if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
  startServer();
}
