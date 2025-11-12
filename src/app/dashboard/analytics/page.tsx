"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    clicks: 0,
    reach: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const result = await res.json();
          setData(result.chartData || []);
          setStats({
            clicks: result.clicks,
            reach: result.reach,
            conversionRate: result.conversionRate,
          });
        }
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Analytics</h1>

        {loading ? (
          <p className="text-gray-600">Loading analytics...</p>
        ) : (
          <>
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm mb-12">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">
                Engagement Overview
              </h2>

             <ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />

    {/* X Axis with date labels */}
    <XAxis
      dataKey="date"
      label={{ value: "Date", position: "insideBottomRight", offset: -5 }}
      tick={{ fontSize: 12 }}
    />

    {/* Y Axis with number labels */}
    <YAxis
      label={{ value: "Count", angle: -90, position: "insideLeft" }}
      tick={{ fontSize: 12 }}
    />

    <Tooltip
      formatter={(value: number, name: string) => [value, name]}
      labelFormatter={(label: string) => `Date: ${label}`}
    />

    <Line
      type="monotone"
      dataKey="clicks"
      stroke="#10b981"
      strokeWidth={3}
      name="Clicks"
    />
    <Line
      type="monotone"
      dataKey="reach"
      stroke="#3b82f6"
      strokeWidth={3}
      name="Reach"
    />
  </LineChart>
</ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Total Clicks</h3>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats.clicks}
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Total Reach</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.reach}
                </p>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.conversionRate}%
                </p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}