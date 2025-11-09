"use client";
import { useState } from "react";
import { ReportItem } from "../types";
import jsPDF from "jspdf";

interface Props {
  reports: ReportItem[];
  onSelectReport: (report: ReportItem) => void;
}

export default function ReportList({ reports, onSelectReport }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadPDF = (report: ReportItem) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Report Summary", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${report.name}`, 20, 35);
    doc.text(`Date: ${report.date}`, 20, 45);
    doc.text(`Teacher: ${report.teacher}`, 20, 55);
    doc.text("Summary:", 20, 70);
    doc.text(report.summary, 20, 80, { maxWidth: 160 });
    doc.save(`${report.name}.pdf`);
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Report List</h2>
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 w-60 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">#</th>
            <th className="py-2">Report Name</th>
            <th className="py-2">Date</th>
            <th className="py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length > 0 ? (
            filteredReports.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{r.id}</td>
                <td className="py-2">{r.name}</td>
                <td className="py-2">{r.date}</td>
                <td className="py-2 text-center space-x-3">
                  <button
                    onClick={() => onSelectReport(r)}
                    className="text-blue-600 underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => downloadPDF(r)}
                    className="text-green-600 underline"
                  >
                    PDF
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No reports found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
