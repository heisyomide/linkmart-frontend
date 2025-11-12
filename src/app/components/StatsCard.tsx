import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;  // ✅ Allow both
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
      </div>
      <div className="text-emerald-600">{icon}</div>
    </div>
  );
}