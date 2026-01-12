// testAnalyzeResume.js
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ GEMINI_API_KEY check
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing in .env");
}

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, { apiVersion: "v1" });

const analyzeTestPDF = async () => {
  try {
    console.log("Starting resume analysis test...");

    // Load test.pdf
    const filePath = path.join(process.cwd(), "test.pdf");
    if (!fs.existsSync(filePath)) {
      console.error("test.pdf not found in backend root!");
      return;
    }
    const pdfBuffer = fs.readFileSync(filePath);

    // Extract text from PDF
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(pdfBuffer),
      standardFontDataUrl: `file://${path.join(process.cwd(), "node_modules/pdfjs-dist/legacy/build/")}/`,
    });

    const pdf = await loadingTask.promise;
    let resumeText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      resumeText += content.items.map((item) => item.str).join(" ") + "\n";
    }

    if (!resumeText.trim()) {
      console.error("No text extracted from PDF.");
      return;
    }

    // Use supported model
    const model = genAI.getGenerativeModel({ model: "models/text-bison-001" });

    // Strict JSON prompt
    const prompt = `
Return ONLY valid JSON:
{
  "atsScore": number,
  "missingSkills": [],
  "recommendedRoles": [],
  "improvementTips": []
}

Resume:
${resumeText.slice(0, 3000)}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Safe JSON parse
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

    console.log("Resume analysis result:", parsed);
  } catch (err) {
    console.error("Resume analysis error:", err.message);
  }
};

// Run the test
analyzeTestPDF();
