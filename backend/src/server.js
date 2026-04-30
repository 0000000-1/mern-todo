import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dns from "node:dns"; // Use standard dns for the check

import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

// 1. Only use custom DNS locally
if (process.env.NODE_ENV !== "production") {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

const app = express();

// 2. Allow all origins for now (so your live frontend can connect)
app.use(cors({
  origin: "*", 
}));

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

// 3. Connect to DB immediately (Vercel style)
connectDB();

app.get("/", (req, res) => {
    res.send("Todo API is running...");
});

// 4. Only listen locally
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    });
}

export default app;
