export const generateQuizPrompt = (
  prevAnswer,
  questionIndex
) => `
You are an expert career counselor for students.

Rules:
- Total questions = 10
- Ask ONLY ONE question
- Question MUST depend on the previous answer
- Difficulty should adapt gradually
- Language should be simple and student-friendly
- Do NOT repeat previous questions
- Return ONLY valid JSON

Previous Answer:
"${prevAnswer || "This is the first question"}"

Ask question number ${questionIndex + 1}

Return format:
{
  "question": "",
  "options": [
    "",
    "",
    "",
    ""
  ]
}
`;
