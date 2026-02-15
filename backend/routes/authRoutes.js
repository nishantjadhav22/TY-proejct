import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
  getProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===== EXISTING ROUTES (UNCHANGED) ===== */
router.post("/register", register);
router.post("/login", login);

/* ===== FORGOT PASSWORD ROUTES (ADDED) ===== */
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);
router.get("/me", protect, getProfile);

export default router;
