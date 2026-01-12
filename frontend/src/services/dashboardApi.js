const BASE_URL = "http://localhost:5000";

export async function getDashboardData() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login first.");

  const res = await fetch(`${BASE_URL}/api/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let message = "Failed to fetch dashboard data";
    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch (_) {}
    throw new Error(message);
  }

  return res.json();
}

export async function submitQuiz(quizPayload) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login first.");

  const res = await fetch(`${BASE_URL}/api/quiz/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quizPayload),
  });

  if (!res.ok) {
    let message = "Failed to submit quiz";
    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch (_) {}
    throw new Error(message);
  }

  return res.json();
}
