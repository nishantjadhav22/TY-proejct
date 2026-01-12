import { getNextQuestionFromGemini } from "../services/geminiQuizService.js";
import mongoose from "mongoose";
import Activity from "../models/Activity.js";

export const getNextQuestion = async (req, res) => {
  try {
    const { prevAnswer, questionIndex } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const userId = mongoose.Types.ObjectId(req.user._id);

    // ✅ Quiz completed
    if (questionIndex >= 10) {
      try {
        await Activity.create({
          user: userId,
          type: "QUIZ_COMPLETION",
          message: `You completed a quiz!`,
          icon: "star", // optional
        });
      } catch (e) {
        console.error("Activity log error (quiz completion):", e);
      }

      return res.json({ completed: true });
    }

    // ✅ Generate next question
    const questionData = await getNextQuestionFromGemini(
      prevAnswer,
      questionIndex
    );

    res.json(questionData);
  } catch (error) {
    console.error("Quiz question error:", error);
    res.status(500).json({
      error: "Failed to generate question",
    });
  }
};
