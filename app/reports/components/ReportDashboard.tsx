"use client";
import { ReportData } from "../types";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

interface Props {
  data: ReportData[];
}

export default function ReportDashboard({ data }: Props) {
  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
