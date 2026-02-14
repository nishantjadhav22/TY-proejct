import React, { useEffect, useMemo, useState } from "react";
import apiClient from "../services/apiClient";
import {
  Search,
  Calendar,
  ChevronDown,
  LayoutGrid,
  List,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/QuizHistory.css";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const [dateFilter, setDateFilter] = useState(30);
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0);
  

  const itemsPerPage = 8;

  useEffect(() => {
    apiClient
      .get("/api/quiz/history")
      .then((res) => setHistory(res.data?.history || []))
      .catch(() => console.log("Error loading history"));
  }, []);

  // ================= FILTER + SORT =================

  const filtered = useMemo(() => {
    let data = [...history];

    // Search
    data = data.filter((q) =>
      q.topic.toLowerCase().includes(search.toLowerCase())
    );

    // Date Filter
    const now = new Date();
    data = data.filter((q) => {
      const diff =
        (now - new Date(q.date)) / (1000 * 60 * 60 * 24);
      return diff <= dateFilter;
    });

    // Sorting
    if (sortBy === "date") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "score") {
      data.sort(
        (a, b) =>
          b.score / b.totalQuestions -
          a.score / a.totalQuestions
      );
    }

    return data;
  }, [history, search, sortBy, dateFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(start, start + itemsPerPage);

  const totalAttempts = filtered.length;

  const overallAccuracy =
    totalAttempts === 0
      ? 0
      : Math.round(
          (filtered.reduce(
            (acc, q) => acc + q.score / q.totalQuestions,
            0
          ) /
            totalAttempts) *
            100
        );

        useEffect(() => {
    let start = 0;
    const end = overallAccuracy;

    if (start === end) {
      setAnimatedAccuracy(end);
      return;
    }

    const duration = 500;
    const stepTime = 15;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedAccuracy(Math.round(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [overallAccuracy]);

  const bestQuiz =
    filtered.length > 0
      ? filtered.reduce((max, q) =>
          q.score > max.score ? q : max
        )
      : null;

  const getStatus = (percentage) => {
    if (percentage >= 70)
      return { label: "Excellent", color: "green" };
    if (percentage >= 40)
      return { label: "Good", color: "blue" };
    return { label: "Needs Practice", color: "orange" };
  };

  return (
    <div className="qh-container">

      {/* HEADER */}
      <div className="qh-header">
        <div>
          <h1>Quiz History</h1>
          <p>Track your quiz attempts and performance</p>
        </div>

        <div className="qh-header-actions">

          <select
            className="qh-filter-btn"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>

          <select
            className="qh-filter-btn"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="score">Sort by Score</option>
          </select>

        </div>
      </div>

      {/* STATS */}
      <div className="qh-stats">

        <div className="qh-stat">
          <div
            className="qh-stat-circle"
            style={{
              background: `conic-gradient(#2563eb ${animatedAccuracy}%, #e2e8f0 ${animatedAccuracy}%)`
            }}
          >
            <span>{animatedAccuracy}%</span>
          </div>
          <div>
            <h4>Overall Accuracy</h4>
            <h2>{overallAccuracy}%</h2>
          </div>
        </div>

        <div className="qh-stat">
          <h4>Total Attempts</h4>
          <h2>{totalAttempts}</h2>
        </div>

        <div className="qh-stat">
          <CheckCircle color="#22c55e"/>
          <div>
            <h4>Best Score</h4>
            <h2>
              {bestQuiz
                ? `${bestQuiz.score}/${bestQuiz.totalQuestions}`
                : "0"}
            </h2>
          </div>
        </div>

      </div>

      {/* FILTER BAR */}
      <div className="qh-filter-bar">

        <div className="qh-search">
          <Search size={16}/>
          <input
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="qh-view-toggle">
          <button
            className={view === "cards" ? "active" : ""}
            onClick={() => setView("cards")}
          >
            <LayoutGrid size={16}/> Cards
          </button>

          <button
            className={view === "table" ? "active" : ""}
            onClick={() => setView("table")}
          >
            <List size={16}/> Table
          </button>
        </div>
      </div>

      {/* VIEW WITH ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
        >

          {view === "cards" ? (

            <div className="qh-grid">
              {currentData.map((q, i) => {
                const percentage = Math.round(
                  (q.score / q.totalQuestions) * 100
                );
                const status = getStatus(percentage);

                return (
                  <div key={i} className="qh-card">
                    <h3>{q.topic}</h3>
                    <p>
                      Test {q.testNumber} •{" "}
                      {new Date(q.date).toLocaleDateString()}
                    </p>

                    <div className="qh-progress">
                      <div
                        className={`qh-progress-fill ${status.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className={`qh-badge ${status.color}`}>
                      {status.label}
                    </div>

                    <div className="qh-score">
                      {q.score}/{q.totalQuestions}
                    </div>
                  </div>
                );
              })}
            </div>

          ) : (

            <div className="qh-table-wrapper">
              <table className="qh-table">
                <thead>
                  <tr>
                    <th>Topic</th>
                    <th>Date</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((q, i) => {
                    const percentage = Math.round(
                      (q.score / q.totalQuestions) * 100
                    );
                    const status = getStatus(percentage);

                    return (
                      <tr key={i}>
                        <td>{q.topic}</td>
                        <td>
                          {new Date(q.date).toLocaleDateString()}
                        </td>
                        <td>
                          {q.score}/{q.totalQuestions}
                        </td>
                        <td>
                          <span
                            className={`qh-badge ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          )}

        </motion.div>
      </AnimatePresence>

      {/* PAGINATION */}
      <div className="qh-pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default QuizHistory;
