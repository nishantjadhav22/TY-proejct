import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { ArrowLeft } from "lucide-react";
import "../styles/QuizHistory.css";

const QuizHistory = () => {
  const navigate = useNavigate();
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sortOption, setSortOption] = useState("dateDesc");

  useEffect(() => {
    let active = true;

    const loadHistory = () => {
      apiClient
        .get("/api/quiz/history")
        .then((res) => {
          if (active) setQuizHistory(res.data?.history || []);
        })
        .catch(() => {
          if (active) setError("Failed to load quiz history.");
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    };

    loadHistory();
    return () => { active = false; };
  }, []);

  if (loading) return <p className="qh-loading">Loading quiz history...</p>;
  if (error) return <p className="qh-error">{error}</p>;

  const sortedQuizzes = [...quizHistory].sort((a, b) => {
    if (sortOption === "scoreDesc") return b.score - a.score;
    if (sortOption === "scoreAsc") return a.score - b.score;
    if (sortOption === "topicAsc") return a.topic.localeCompare(b.topic);
    if (sortOption === "topicDesc") return b.topic.localeCompare(a.topic);
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="qh-page">
      {/* Header */}
      <header className="qh-header">
        <button className="qh-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1>
          Quiz <span className="qh-highlight">History</span>
        </h1>
        <p className="qh-subtitle">Here are all your completed quizzes, newest first</p>

        {/* Sort/Filter */}
        <div className="qh-sort-filter">
          <label>
            Sort by:{" "}
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="dateDesc">Date ↓</option>
              <option value="dateAsc">Date ↑</option>
              <option value="scoreDesc">Score ↓</option>
              <option value="scoreAsc">Score ↑</option>
              <option value="topicAsc">Topic A-Z</option>
              <option value="topicDesc">Topic Z-A</option>
            </select>
          </label>
        </div>
      </header>

      {/* Quiz Cards */}
      <div className="qh-cards">
        {sortedQuizzes.length === 0 ? (
          <div className="qh-empty">You haven't completed any quizzes yet.</div>
        ) : (
          <ul className="qh-list">
            {sortedQuizzes.map((entry, idx) => {
              const percentage = Math.round((entry.score / entry.totalQuestions) * 100);
              const dateStr = new Date(entry.date).toLocaleString();
              return (
                <li key={`${entry.testNumber}-${idx}`} className="qh-card">
                  <div className="qh-card-info">
                    <h2 className="qh-card-title">{entry.topic}</h2>
                    <p className="qh-card-test">Test {entry.testNumber} • {dateStr}</p>

                    {/* Progress Bar */}
                    <div className="qh-progress-bar">
                      <div className="qh-progress-filled" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>

                  <div className="qh-card-score">
                    {entry.score}/{entry.totalQuestions}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuizHistory;
