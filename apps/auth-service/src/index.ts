import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";
import {errorMiddleware}  from "@repo/error-handler";
import router from "./routes/auth.router.js";
import "dotenv/config";
// import * as dotenv from "dotenv";
// import path from "path";

const app = express();

// TODO: This should have to work, I have to copy the .env file inside the root and auth-service as well
// const envPath = path.resolve(process.cwd(), "../../.env");

// dotenv.config({path: envPath});

// if (!process.env.DATABASE_URL) {
//   console.error("❌ Error: DATABASE_URL is missing!");
//   console.error("   Looking for .env at:", envPath);
//   process.exit(1);
// } else {
//   console.log("✅ Environment loaded. DB URL found.");
// }

app.use(cors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());


app.get("/auth", (req, res) => {
    res.send({message: "THis is the auth api route."});
})

app.use("/api", router);

app.use(errorMiddleware);

const port = process.env.PORT ? Number(process.env.PORT) : 6001;
const HOST = process.env.HOST ?? 'localhost';

const server = app.listen(port, () => {
  console.log(`Server running at http://${HOST}:${port}`);
});

server.on('error', (error) => {
  console.error(`Server error: ${error.message}`);
});
