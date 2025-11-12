"use client";

import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

interface User {
  _id: string;
  name: string;
  email: string;
  balance: number;
  campaigns: number;
  boosts: number;
  status: "active" | "suspended";
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token} `},
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const token = localStorage.getItem("token");
    const newStatus = currentStatus === "active" ? "suspended" : "active";

    try {
      const res = await fetch(
        `http://https://linkmart-backend.onrender.com/api/admin/users/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, status: updated.status } : u))
        );
      }
    } catch (err) {
      console.error("Error updating user status:", err);
    }
  };

  const statusColor = {
    active: "text-green-600 bg-green-100",
    suspended: "text-red-600 bg-red-100",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-8">Linkmart Admin</h1>
        <nav className="space-y-4 text-gray-700">
          <a href="/admin" className="block hover:text-green-600">
            🏠 Dashboard
          </a>
          <a href="/admin/users" className="block text-green-600 font-semibold">
            👥 Users
          </a>
          <a href="/admin/boosts" className="block hover:text-green-600">
            🚀 Boosts
          </a>
          <a href="/admin/campaigns" className="block hover:text-green-600">
            📊 Campaigns
          </a>
          <a href="/admin/deposits" className="block hover:text-green-600">
            💳 Deposits
          </a>
          <a href="/admin/settings" className="block hover:text-green-600">
            ⚙ Settings
          </a>
          <a href="/admin/products" className="block text-green-600 font-semibold">🛍 Products</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">User Management</h2>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-500">Loading users...</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Campaigns
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Boosts
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 flex items-center gap-2 text-gray-700">
                      <UserCircleIcon className="h-6 w-6 text-green-500" />
                      {u.name}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{u.email}</td>
                    <td className="px-6 py-3 text-gray-700">
                      ${u.balance?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{u.campaigns || 0}</td>
                    <td className="px-6 py-3 text-gray-700">{u.boosts || 0}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[u.status]}`}
                      >
                        {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right flex justify-end gap-2">
                      <button
                        onClick={() => alert(`Viewing ${u.name}'s profile`)}
                        className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition"
                      >
                        <EyeIcon className="h-5 w-5" />
                        View
                      </button>
                      <button
                        onClick={() => toggleStatus(u._id, u.status)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
                          u.status === "active"
                            ? "bg-red-100 text-red-600 hover:bg-red-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                      >
                        {u.status === "active" ? (
                          <>
                            <XCircleIcon className="h-5 w-5" /> Suspend
                          </>
                        ) : (
                          <>
                            <CheckCircleIcon className="h-5 w-5" /> Activate
                          </>
                        )}
                      </button>
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