import express from "express";
import { getNextQuestion } from "../controllers/quizController.js";

const router = express.Router();

router.post("/next", getNextQuestion);

export default router;
