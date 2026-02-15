import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/dashboard.css";
import { getDashboardData } from "../services/dashboardApi";
import apiClient from "../services/apiClient";
import DashboardProgressSection from "../components/DashboardProgress";
import {
  Bell,
  GraduationCap,
  Bookmark,
  Zap,
  Trophy,
  Map
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [hasNotification, setHasNotification] = useState(false);
  const [savedColleges, setSavedColleges] = useState([]);

  // ✅ fetch dashboard data including saved colleges
  const fetchData = async () => {
    try {
      const dashboardData = await getDashboardData();

      // 🔖 fetch saved colleges from backend for this user
      const res = await apiClient.get("/api/colleges/bookmark/count");
      const savedData = res.data || {};

      // ✅ update dashboardData with accurate saved count
      dashboardData.colleges = savedData.count || 0;
      setSavedColleges(savedData.savedColleges || []);

      setData(dashboardData);

      setHasNotification(dashboardData.notifications > 0);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate("/signin");
        return;
      }
      setError("Failed to load dashboard. Please try again.");
    }
  };

  useEffect(() => {
    fetchData();

    // 🔥 listen for realtime bookmark updates
    const handleSavedUpdate = () => {
      fetchData();
    };
    window.addEventListener("saved-colleges-updated", handleSavedUpdate);

    return () => {
      window.removeEventListener("saved-colleges-updated", handleSavedUpdate);
    };
  }, []);

  useEffect(() => {
    if (!location.hash || !data) return;
    const targetId = location.hash.replace("#", "");
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash, data]);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="loading">Loading...</p>;

  return (
    <div className="dashboard-container" id="dashboard-overview">

      {/* TOP RIGHT ACTIONS */}
      <div className="dashboard-actions">
        <div className="notification">
          <Bell size={18} />
          {hasNotification && <span className="dot" />}
        </div>
        <button className="view-profile" onClick={() => navigate("/profile")}>
          View Profile
        </button>
      </div>

      {/* HEADER */}
      <div className="dashboard-header" id="dashboard-header">
        <h1>
          Welcome back, <span>{data.username}</span> !
        </h1>
        <p>Continue your career discovery journey</p>
      </div>

      {/* STATS */}
      <div className="stats-grid" id="dashboard-stats">
        <div className="stat-card" id="dashboard-quizzes">
          <div className="icon blue"><GraduationCap /></div>
          <h2>{data.quizzes}</h2>
          <p>Quiz Completions</p>
        </div>

        {/* ✅ ONLY ADDITION: clickable Saved Colleges */}
        <div
          className="stat-card"
          id="dashboard-saved-colleges"
          onClick={() => navigate("/saved-colleges")}
          style={{ cursor: "pointer" }}   // ✅ added
        >
          <div className="icon pink"><Bookmark /></div>
          <h2>{savedColleges.length}</h2>
          <p>Saved Colleges</p>
        </div>

        <div className="stat-card" id="dashboard-skills">
          <div className="icon purple"><Zap /></div>
          <h2>{data.skills}</h2>
          <p>Skills Acquired</p>
        </div>

        <div className="stat-card" id="dashboard-achievements">
          <div className="icon yellow"><Trophy /></div>
          <h2>{data.achievements}</h2>
          <p>Achievements</p>
        </div>
      </div>

      {/* ROADMAP */}
      <div className="roadmap-card" id="dashboard-roadmap">
        <div className="roadmap-header">
          <h3>Your 3D Roadmap Preview</h3>
          <span className="link">Explore Full Roadmap →</span>
        </div>

        <div className="roadmap-content">
          <Map size={40} />
          <h4>Generate Your First Roadmap</h4>
          <p>
            Create an AI-powered career roadmap to visualize your learning path
            and track progress.
          </p>
          <button className="primary-btn">
            Generate Your First Roadmap
          </button>
        </div>
      </div>

      {/* 🔥 NEW SECTION: Weekly Progress + Recent Activity */}
      <DashboardProgressSection
        weeklyProgress={data.weeklyProgress}
        recentActivity={data.recentActivity}
      />

    </div>
  );
}
