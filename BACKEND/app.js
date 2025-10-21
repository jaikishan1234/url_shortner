import express from "express";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import connectDB from "./src/config/monogo.config.js";
import short_url from "./src/routes/short_url.route.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import cookieParser from "cookie-parser"

// Correct way:
dotenv.config({ path: "./.env" });

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // frontend URL (Vite default)
  credentials: true,               // allow cookies/auth headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

app.listen(3000, () => {
    connectDB();
    console.log("Server is running on http://localhost:3000");
});
