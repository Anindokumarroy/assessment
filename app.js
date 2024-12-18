import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/api.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", userRoutes);

// Connect Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.log(err));
