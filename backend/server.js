import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// ================= ROUTES =================
import collegeRoutes from "./routes/collegeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"; // ✅ FIXED
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARES =================
app.use(cors());
app.use(express.json());

// ================= API ROUTES =================
app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/dashboard", dashboardRoutes); // ✅ NOW WORKS
app.use("/api/quiz", quizRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("🚀 Career Advisor API Running");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
