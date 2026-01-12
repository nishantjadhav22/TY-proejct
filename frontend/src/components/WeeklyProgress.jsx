import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const WeeklyProgress = ({ data = [] }) => {
  // Agar data empty hai, chart na dikhe ya "No data" dikhe
  if (!data.length) return <div className="weekly-progress-card"><h3 className="card-title">Weekly Progress</h3><p style={{ color: "#94a3b8" }}>No data yet</p></div>;

  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        data: data.map((d) => d.value),
        tension: 0.4,
        borderWidth: 3,
        borderColor: "#0ef",
        backgroundColor: "rgba(14,239,255,0.2)",
        pointRadius: 5,
        pointBackgroundColor: "#0ef",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: { ticks: { color: "#94a3b8" }, grid: { display: false } },
      y: { min: 0, max: 200, ticks: { stepSize: 50, color: "#94a3b8" }, grid: { color: "rgba(148,163,184,0.1)" } },
    },
  };

  return (
    <div className="weekly-progress-card">
      <h3 className="card-title">Weekly Progress</h3>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default WeeklyProgress;
