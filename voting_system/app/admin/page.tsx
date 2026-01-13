"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

/* ================= MOCK DATA ================= */

// Pie chart – vote distribution
const pieData = {
  labels: ["Candidate A", "Candidate B"],
  datasets: [
    {
      data: [120, 80],
      backgroundColor: ["#6366F1", "#22C55E"],
      borderWidth: 1,
    },
  ],
};

// Line chart – votes over time
const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Votes",
      data: [30, 45, 60, 40, 25],
      borderColor: "#6366F1",
      backgroundColor: "rgba(99,102,241,0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

// Trend analysis
const trends = [
  { option: "Candidate A", votes: 120, change: "+12%" },
  { option: "Candidate B", votes: 80, change: "-5%" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Monitor voting analytics and trends</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Kpi title="Total Votes" value="200" />
        <Kpi title="Active Polls" value="1" />
        <Kpi title="Top Option" value="Candidate A" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PIE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Vote Distribution</h2>
          <Pie data={pieData} />
        </div>

        {/* LINE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Votes Over Time</h2>
          <Line data={lineData} />
        </div>
      </div>

      {/* TREND TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Trend Analysis (Daily / Weekly)</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="text-left py-2">Option</th>
              <th className="text-left py-2">Votes</th>
              <th className="text-left py-2">Trend</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((trend) => (
              <tr key={trend.option} className="border-b last:border-0">
                <td className="py-3 font-medium">{trend.option}</td>
                <td className="py-3">{trend.votes}</td>
                <td
                  className={`py-3 font-semibold ${
                    trend.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {trend.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= KPI CARD ================= */
function Kpi({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
