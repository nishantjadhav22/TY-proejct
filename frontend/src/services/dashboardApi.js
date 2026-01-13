import apiClient from "./apiClient";

export async function getDashboardData() {
  const response = await apiClient.get("/api/dashboard");
  return response.data;
}

export async function submitQuiz(quizPayload) {
  const response = await apiClient.post("/api/quiz/submit", quizPayload);
  return response.data;
}
