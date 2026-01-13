import express from "express";
import {
	listQuizTopics,
	getQuizQuestions,
	submitQuizResponses,
	getQuizHistory,
} from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/topics", protect, listQuizTopics);
router.get("/topics/:topicId", protect, getQuizQuestions);
router.post("/submit", protect, submitQuizResponses);
router.get("/history", protect, getQuizHistory);

export default router;
