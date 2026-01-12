import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateQuizPrompt } from "../utils/quizPrompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getNextQuestionFromGemini = async (
  prevAnswer,
  questionIndex
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = generateQuizPrompt(prevAnswer, questionIndex);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // 🔒 SAFE JSON PARSE
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini JSON parse failed:", text);
    throw new Error("Invalid AI response");
  }
};
