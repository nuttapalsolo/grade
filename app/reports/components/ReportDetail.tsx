"use client";
import { ReportItem } from "../types";
import jsPDF from "jspdf";

interface Props {
  report: ReportItem;
  onBack: () => void;
}

export default function ReportDetail({ report, onBack }: Props) {
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
      <h2 className="text-xl font-semibold mb-4">{report.name}</h2>
      <p>
        <strong>Date:</strong> {report.date}
      </p>
      <p>
        <strong>Teacher:</strong> {report.teacher}
      </p>
      <p>
        <strong>Summary:</strong> {report.summary}
      </p>
      <ul className="list-disc pl-6 mt-3">
        <li>Math: 85%</li>
        <li>English: 90%</li>
        <li>Science: 78%</li>
      </ul>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => downloadPDF(report)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Download PDF
        </button>
        <button
          onClick={onBack}
          className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}
