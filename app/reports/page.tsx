"use client";

import { useState } from "react";
import ReportDashboard from "./components/ReportDashboard";
import ReportList from "./components/ReportList";
import ReportDetail from "./components/ReportDetail";
import { ReportItem, ReportData } from "./types";

export default function ReportsPage() {
  const [view, setView] = useState<"dashboard" | "list" | "single">("dashboard");
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  const data: ReportData[] = [
    { name: "Math", score: 85 },
    { name: "English", score: 90 },
    { name: "Science", score: 78 },
  ];

  const reports: ReportItem[] = [
    {
      id: 1,
      name: "Term 1 Summary",
      date: "2025-11-01",
      teacher: "Mr. Tack",
      summary: "Students performed well overall, with an average improvement of 10%.",
    },
    {
      id: 2,
      name: "Attendance Report",
      date: "2025-11-05",
      teacher: "Mr. Tack",
      summary: "Attendance rate improved by 5% compared to the previous term.",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Reports</h1>

      {/* Mode Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        {["dashboard", "list", "single"].map((mode) => (
          <button
            key={mode}
            onClick={() => setView(mode as "dashboard" | "list" | "single")}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              view === mode ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {mode === "dashboard"
              ? "Dashboard View"
              : mode === "list"
              ? "List View"
              : "Single Report"}
          </button>
        ))}
      </div>

      {/* Render View */}
      {view === "dashboard" && <ReportDashboard data={data} />}
      {view === "list" && (
        <ReportList
          reports={reports}
          onSelectReport={(r) => {
            setSelectedReport(r);
            setView("single");
          }}
        />
      )}
      {view === "single" && selectedReport && (
        <ReportDetail report={selectedReport} onBack={() => setView("list")} />
      )}
    </div>
  );
}
