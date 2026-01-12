import React from "react";
import WeeklyProgress from "./WeeklyProgress";
import RecentActivity from "./RecentActivity";
import "../styles/dashboardProgress.css";

const DashboardProgress = ({ weeklyProgress = [], recentActivity = [] }) => {
  return (
    <div className="dashboard-progress-section">
      <WeeklyProgress data={weeklyProgress} />
      <RecentActivity activities={recentActivity} />
    </div>
  );
};

export default DashboardProgress;
