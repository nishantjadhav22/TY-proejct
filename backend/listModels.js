import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing in .env");
}

// Initialize Gemini v1 API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
  apiVersion: "v1",
});

async function listModels() {
  try {
    const models = await genAI.listModels();
    console.log("Available Gemini models:");
    models.forEach((m) => {
      console.log(`- ${m.name} (supports: ${m.supportedMethods.join(", ")})`);
    });
  } catch (err) {
    console.error("Error fetching models:", err.message);
  }
}

listModels();
