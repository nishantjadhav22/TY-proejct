import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getCurrentProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/", protect, getCurrentProfile);
router.put("/", protect, updateProfile);

export default router;
