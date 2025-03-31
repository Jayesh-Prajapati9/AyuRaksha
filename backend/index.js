import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect_DB from "./db/db.js";
import userRoute from "./route/user.route.js";
import authRoute from "./route/auth.route.js";
import otpRoute from "./route/otp.route.js";
import groupRoute from "./route/group.route.js";
import doctorRoute from "./route/doctor.route.js"
import hospitalRoute from "./route/clinic.route.js"
import appointmentRoute from "./route/appointment.route.js"
import { uploadFile } from "./util/cloudinary.js";
import { upload } from "./middleware/multer.middleware.js";
import dotenv from "dotenv";
import { ApiError } from "./util/ApiError.js";
import { app } from "./util/socket.js";

dotenv.config();

connect_DB();
app.use(express.json());


app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  // const origin = req.headers.origin;
  // if (allowedOrigins.includes(origin)) {
  //   // res.setHeader("Access-Control-Allow-Origin", origin);
  //   // res.setHeader("Access-Control-Allow-Credentials", "true");
  //   // res.setHeader(
  //   //   "Access-Control-Allow-Methods",
  //   //   "GET, POST, PUT, DELETE, OPTIONS"
  //   // );
  //   // res.setHeader(
  //   //   "Access-Control-Allow-Headers",
  //   //   "Content-Type, Authorization"
  //   // );
  // }
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute)
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/group", groupRoute);
app.use("/api/v1/hospital", hospitalRoute);
app.use("/api/v1/appointment", appointmentRoute);
// app.use("/api/v1/search", searchRoute);
app.use("/api/v1/otp", otpRoute);
app.post(
  "/api/v1/upload",
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "audioFile", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),
  uploadFile
);

// Error-handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    // Send ApiError response
    return res.status(err.statusCode).json(err.toJSON());
  }

  // Handle unexpected errors
  console.error("Unhandled Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});
