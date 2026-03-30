import "./loadenv.js";
import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import morgan from "morgan";
import { connectDB } from "./db/connectDB.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import hpp from "hpp";

// APP
const app = express();
const __dirname = path.resolve();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Security Middlewares
app.use(helmet()); // Secure headers
app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP param pollution

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/auth", limiter);

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRouter);

// STATIC (Production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// SERVER
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🏃‍♂️ App running on port ${PORT}`);
  });
});
