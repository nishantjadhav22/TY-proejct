import React from "react";
import {
  Lightbulb,
  ClipboardCheck,
  TrendingUp,
  Activity
} from "lucide-react";

const iconMap = {
  recommendation: {
    icon: Lightbulb,
    color: "#22d3ee" // cyan
  },
  quiz: {
    icon: ClipboardCheck,
    color: "#a78bfa" // purple
  },
  progress: {
    icon: TrendingUp,
    color: "#34d399" // green
  },
  default: {
    icon: Activity,
    color: "#64748b"
  }
};

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>Recent Activity</h3>
        <span className="view-all">View All</span>
      </div>

      <div className="activity-list">
        {activities.map((item, index) => {
          const config = iconMap[item.type] || iconMap.default;
          const Icon = config.icon;

          return (
            <div key={index} className="activity-item">
              <div
                className="activity-icon"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <Icon size={18} color={config.color} />
              </div>

              <div className="activity-content">
                <p className="activity-text">{item.message}</p>
                <span className="activity-date">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

              <span className={`activity-badge ${item.type}`}>
                {item.type}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
