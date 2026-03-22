import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dns from "node:dns/promises";

import rateLimiter from "./middleware/rateLimiter.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Forces Node to use Cloudflare/Google DNS

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

//middle ware
app.use(cors({
  origin:"http://localhost:5173",
}))
app.use(express.json()); // this middle ware will parse json bodies: req.body
app.use(rateLimiter);

// middleware are used for mostly authentication
app.use("/api/notes", notesRoutes);

// our simple custum middleware
// app.use((req,res,next)=> {
//     console.log("got a new request");
//     console.log(`Req methos is ${req.method} and Req Url is ${req.url}`);
//     next();
// })

// app.use("/api/products", productsRoutes); this also used for these stuff
// app.use("/api/posts", postsRoutes);
// app.use("/api/payments", paymentesRoutes);
// app.use("/api/emails", emailsRoutes);

// rate limiting is a way to control how often someone can do something on a website or applike how many times they can refresh a page, make a request to an API, or try Login.

connectDB().then(() => { //first connectDB only then connect app
  app.listen(port, () => {
    console.log("Server started port : 5001");
  });
});
