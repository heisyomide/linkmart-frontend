"use client";

import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";

// -------------------------
// Types
// -------------------------
export interface Boost {
  _id: string;
  user: string;
  platform: string;
  service: string;
  quantity: number;
  price?: number;   // optional (for frontend safety)
  amount?: number;  // backend currently uses this
  total?: number;
  status: "pending" | "active" | "completed" | "rejected";
  createdAt: string;
}

// -------------------------
// Helper for typed fetching
// -------------------------
async function jsonFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Fetch failed: ${res.status} ${message}`);
  }
  return res.json() as Promise<T>;
}

// -------------------------
// Main Admin Boosts Page
// -------------------------
export default function AdminBoostsPage() {
  const [boosts, setBoosts] = useState<Boost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all boosts on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchBoosts = async () => {
      try {
        const data = await jsonFetch<Boost[]>("http://localhost:5000/api/admin/boosts", {
          headers: { Authorization: `Bearer ${token} `},
        });

        // Ensure price + total fields exist for rendering
        const formatted = data.map((b) => ({
          ...b,
          price: b.price ?? (b.amount && b.quantity ? b.amount / b.quantity : 0),
          total: b.total ?? b.amount ?? 0,
        }));

        setBoosts(formatted);
      } catch (err) {
        console.error("Error fetching boosts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoosts();
  }, []);

  // Update boost status
  const updateStatus = async (
    id: string,
    status: "active" | "completed" | "rejected"
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const updated = await jsonFetch<{ status: Boost["status"] }>(
        `http://https://linkmart-backend.onrender.com/api/admin/boosts/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      setBoosts((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: updated.status } : b))
      );
    } catch (err) {
      console.error("Error updating boost status:", err);
    }
  };

  // Status badge styles
  const statusColor = {
    pending: "text-yellow-600 bg-yellow-100",
    active: "text-blue-600 bg-blue-100",
    completed: "text-green-600 bg-green-100",
    rejected: "text-red-600 bg-red-100",
  } as const;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-8">Linkmart Admin</h1>
        <nav className="space-y-4 text-gray-700">
          <a href="/admin" className="block hover:text-green-600">🏠 Dashboard</a>
          <a href="/admin/users" className="block hover:text-green-600">👥 Users</a>
          <a href="/admin/boosts" className="block text-green-600 font-semibold">🚀 Boosts</a>
          <a href="/admin/campaigns" className="block hover:text-green-600">📊 Campaigns</a>
          <a href="/admin/deposits" className="block hover:text-green-600">💳 Deposits</a>
          <a href="/admin/services" className="block hover:text-green-600">⚙ services</a>
          <a href="/admin/products" className="block text-green-600 font-semibold">🛍 Products</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Boost Management</h2>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-500">Loading boosts...</p>
          ) : boosts.length === 0 ? (
            <p className="p-6 text-gray-500">No boosts found.</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">User</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Platform</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Service</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {boosts.map((b) => (
                  <tr key={b._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-gray-700">{b.user}</td>
                    <td className="px-6 py-3 text-gray-700 capitalize">{b.platform}</td>
                    <td className="px-6 py-3 text-gray-700">{b.service || "-"}</td>
                    <td className="px-6 py-3 text-gray-700">{b.quantity}</td>
                    <td className="px-6 py-3 text-gray-700">
                      ${Number(b.price ?? b.amount ?? 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-gray-700 font-semibold">
                      ${Number(b.total ?? b.amount ?? 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[b.status]}`}
                      >
                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-right">
                      {b.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateStatus(b._id, "active")}
                            className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition"
                          >
                            <RocketLaunchIcon className="h-5 w-5" /> Activate
                          </button>
                          <button
                            onClick={() => updateStatus(b._id, "rejected")}
                            className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition"
                          >
                            <XCircleIcon className="h-5 w-5" /> Reject
                          </button>
                        </div>
                      )}

                      {b.status === "active" && (
                        <button
                          onClick={() => updateStatus(b._id, "completed")}
                          className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200 transition"
                        >
                          <CheckCircleIcon className="h-5 w-5" /> Mark Complete
                        </button>
                      )}

                      {b.status === "completed" && (
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