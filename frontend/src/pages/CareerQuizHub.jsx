import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/careerQuizHub.css";
import { Play, RefreshCw } from "lucide-react";
import apiClient from "../services/apiClient";

const CareerQuizHub = () => {
  const navigate = useNavigate();
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    let active = true;

    const loadHistory = () => {
      apiClient
        .get("/api/quiz/history")
        .then((res) => {
          if (active) {
            setQuizHistory(res.data?.history || []);
          }
        })
        .catch(() => {
          if (active) {
            setQuizHistory([]);
          }
        });
    };

    loadHistory();

    const handleQuizCompleted = () => {
      loadHistory();
    };

    window.addEventListener("quiz:completed", handleQuizCompleted);

    return () => {
      active = false;
      window.removeEventListener("quiz:completed", handleQuizCompleted);
    };
  }, []);

  return (
    <div className="cq-page">
      <header className="cq-header">
        <div className="cq-title">
          <div className="cq-icon"><span>🧭</span></div>
          <h1>Career <span className="highlight">Quiz Hub</span></h1>
          <p>Discover your perfect career path with AI-powered assessments</p>
        </div>
      </header>

      <div className="cq-cards">
        {/* Start New Assessment Card */}
        <div className="cq-card start-assessment" onClick={() => navigate("/quiz")}>
          <div className="cq-card-icon play-icon"><Play /></div>
          <h2>Start New Assessment</h2>
          <p>Take our AI-powered career assessment to discover your ideal path.</p>
          <span className="powered">Powered by AI</span>
        </div>

        {/* View Quiz History Card */}
        <div
          className="cq-card view-history"
          onClick={() => navigate("/quiz-history")} // ✅ click navigates to full history page
          style={{ cursor: "pointer" }}
        >
          <div className="cq-card-icon refresh-icon"><RefreshCw /></div>
          <h2>View Quiz History</h2>
          <p>Track your assessment progress over time.</p>
          <span className="quiz-count">
            {quizHistory.length} Quizzes Completed
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareerQuizHub;
