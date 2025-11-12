"use client";

import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

interface Campaign {
  _id: string;
  user: string; // could be user name or id depending on backend
  platform: string;
  objective: string;
  budget: number;
  reach: number;
  clicks: number;
  status: "pending" | "running" | "completed" | "rejected";
  createdAt: string;
}

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/campaigns/pending", {
          headers: { Authorization: `Bearer ${token} `},
        });

        if (res.ok) {
          const data = await res.json();
          setCampaigns(data);
        } else {
          console.error("Failed to fetch campaigns");
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const updateStatus = async (
    id: string,
    status: "running" | "completed" | "rejected"
  ) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://https://linkmart-backend.onrender.com/api/admin/campaigns/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setCampaigns((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: updated.status } : c))
        );
      }
    } catch (err) {
      console.error("Error updating campaign status:", err);
    }
  };

  const statusColor = {
    pending: "text-yellow-600 bg-yellow-100",
    running: "text-blue-600 bg-blue-100",
    completed: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Placeholder */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-8">Linkmart Admin</h1>
        <nav className="space-y-4 text-gray-700">
          <a href="/admin" className="block hover:text-green-600">🏠 Dashboard</a>
          <a href="/admin/users" className="block hover:text-green-600">👥 Users</a>
          <a href="/admin/boosts" className="block hover:text-green-600">🚀 Boosts</a>
          <a href="/admin/campaigns" className="block text-green-600 font-semibold">📊 Campaigns</a>
          <a href="/admin/deposits" className="block hover:text-green-600">💳 Deposits</a>
          <a href="/admin/services" className="block hover:text-green-600">⚙ services</a>
          <a href="/admin/products" className="block text-green-600 font-semibold">🛍 Products</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Campaign Management</h2>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-500">Loading campaigns...</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">User</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Platform</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Objective</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Budget ($)</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Reach</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Clicks</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-700">{c.user}</td>
                    <td className="px-6 py-3 text-gray-700">{c.platform}</td>
                    <td className="px-6 py-3 text-gray-700">{c.objective}</td>
                    <td className="px-6 py-3 text-gray-700">${c.budget.toFixed(2)}</td>
                    <td className="px-6 py-3 text-gray-700">{c.reach.toLocaleString()}</td>
                    <td className="px-6 py-3 text-gray-700">{c.clicks}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[c.status]}`}
                      >
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      {c.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateStatus(c._id, "running")}
                            className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition"
                          >
                            <PlayIcon className="h-5 w-5" />
                            Start
                          </button>
                          <button
                            onClick={() => updateStatus(c._id, "rejected")}
                            className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition"
                          >
                            <XCircleIcon className="h-5 w-5" />
                            Reject
                          </button>
                        </div>
                      )}

                      {c.status === "running" && (
                        <button
                          onClick={() => updateStatus(c._id, "completed")}
                          className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200 transition"
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                          Complete
                        </button>
                      )}

                      {c.status === "completed" && (
                        <span className="text-gray-400 text-sm flex items-center gap-1 justify-end">
                          <ClockIcon className="h-5 w-5" /> Done
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}