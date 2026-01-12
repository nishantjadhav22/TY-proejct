import React from "react";

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>Recent Activity</h3>
        <span className="view-all">View All</span>
      </div>

      <div className="activity-list">
        {activities.map((item, index) => (
          <div key={index} className="activity-item">
            <div className="activity-dot" />
            <div className="activity-content">
              <p className="activity-text">{item.message}</p>
              <span className="activity-date">{new Date(item.createdAt).toLocaleDateString()}</span>
            </div>
            <span className={`activity-badge ${item.type}`}>{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
