import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { listSavedColleges, removeSavedCollege } from "../controllers/savedCollegeController.js";

const router = express.Router();

router.get("/", protect, listSavedColleges);
router.delete("/:id", protect, removeSavedCollege);

export default router;
