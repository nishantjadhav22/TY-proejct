import React from "react";
import WeeklyProgress from "./WeeklyProgress";
import RecentActivity from "./RecentActivity";
import "../styles/dashboardProgress.css";

const DashboardProgress = ({
  weeklyProgress = [],
  recentActivity = [],
  sectionId = "dashboard-progress",
  weeklySectionId = "dashboard-weekly-progress",
  activitySectionId = "dashboard-activity",
}) => {
  return (
    <div className="dashboard-progress-section" id={sectionId}>
      <WeeklyProgress data={weeklyProgress} sectionId={weeklySectionId} />
      <RecentActivity
        activities={recentActivity}
        sectionId={activitySectionId}
      />
    </div>
  );
};

export default DashboardProgress;
