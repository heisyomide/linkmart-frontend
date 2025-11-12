"use client";

import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

interface Deposit {
  _id: string;
  user: string; // populated user name or email
  method: string;
  amount: number;
  fee: number;
  total: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminDepositsPage() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDeposits = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/deposits", {
          headers: { Authorization: `Bearer ${token} `},
        });

        if (res.ok) {
          const data = await res.json();
          setDeposits(data);
        } else {
          console.error("Failed to fetch deposits");
        }
      } catch (err) {
        console.error("Error fetching deposits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://https://linkmart-backend.onrender.com/api/admin/deposits/${id}/status`,
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
        setDeposits((prev) =>
          prev.map((d) => (d._id === id ? { ...d, status: updated.status } : d))
        );
      }
    } catch (err) {
      console.error("Error updating deposit status:", err);
    }
  };

  const statusColor = {
    pending: "text-yellow-600 bg-yellow-100",
    approved: "text-green-600 bg-green-100",
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
          <a href="/admin/campaigns" className="block hover:text-green-600">📊 Campaigns</a>
          <a href="/admin/deposits" className="block text-green-600 font-semibold">💳 Deposits</a>
          <a href="/admin/services" className="block hover:text-green-600">⚙ services</a>
          <a href="/admin/products" className="block text-green-600 font-semibold">🛍 Products</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">User Deposits</h2>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-500">Loading deposits...</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">User</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Method</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Fee</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d) => (
                  <tr key={d._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-700">{d.user}</td>
                    <td className="px-6 py-3 text-gray-700">{d.method}</td>
                    <td className="px-6 py-3 text-gray-700">${d.amount.toFixed(2)}</td>
                    <td className="px-6 py-3 text-gray-700">${d.fee.toFixed(2)}</td>
                    <td className="px-6 py-3 text-gray-700 font-semibold">${d.total.toFixed(2)}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[d.status]}`}
                      >
                        {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      {d.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateStatus(d._id, "approved")}
                            className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200 transition"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(d._id, "rejected")}
                            className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition"
                          >
                            <XCircleIcon className="h-5 w-5" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm flex items-center gap-1 justify-end">
                          <ClockIcon className="h-5 w-5" /> Processed
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