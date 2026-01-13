import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

/* ===== EXISTING ROUTES (UNCHANGED) ===== */
router.post("/register", register);
router.post("/login", login);

/* ===== FORGOT PASSWORD ROUTES (ADDED) ===== */
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

export default router;
