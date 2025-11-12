"use client";

import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

interface Service {
  _id: string;
  title: string;
  category: string;
  priceRange: string;
  location: string;
  whatsapp: string;
  platforms: string[];
  status: "pending" | "approved" | "completed";
  createdAt: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/services", {
          headers: { Authorization: `Bearer ${token} `},
        });

        if (res.ok) {
          const data = await res.json();
          setServices(data);
        } else {
          console.error("Failed to fetch services");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const updateStatus = async (
    id: string,
    status: "approved" | "completed" | "rejected"
  ) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://https://linkmart-backend.onrender.com/api/admin/services/${id}/status`,
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
        setServices((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status: updated.status } : s))
        );
      }
    } catch (err) {
      console.error("Error updating service status:", err);
    }
  };

  const statusColor = {
    pending: "text-yellow-600 bg-yellow-100",
    approved: "text-blue-600 bg-blue-100",
    completed: "text-green-600 bg-green-100",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-8">Linkmart Admin</h1>
        <nav className="space-y-4 text-gray-700">
          <a href="/admin" className="block hover:text-green-600">🏠 Dashboard</a>
          <a href="/admin/users" className="block hover:text-green-600">👥 Users</a>
          <a href="/admin/boosts" className="block hover:text-green-600">🚀 Boosts</a>
          <a href="/admin/campaigns" className="block hover:text-green-600">📊 Campaigns</a>
          <a href="/admin/deposits" className="block hover:text-green-600">💳 Deposits</a>
          <a href="/admin/products" className="block text-green-600 font-semibold">🛍 Products</a>
          <a
            href="/admin/services"
            className="block text-green-600 font-semibold"
          >
            ⚙ Services
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          User Services
        </h2>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-500">Loading services...</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Title
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Category
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Price Range
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Platforms
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    WhatsApp
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Location
                  </th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                    Date
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
                {services.map((s) => (
                  <tr key={s._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-700">{s.title}</td>
                    <td className="px-6 py-3 text-gray-700 capitalize">{s.category}</td>
                    <td className="px-6 py-3 text-gray-700">${s.priceRange}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {s.platforms?.join(", ") || "N/A"}
                    </td>
                    <td className="px-6 py-3 text-gray-700">{s.whatsapp}</td>
                    <td className="px-6 py-3 text-gray-700">{s.location}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          statusColor[s.status]
                        }`}
                      >
                        {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-right">
                      {s.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateStatus(s._id, "approved")}
                            className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-md hover:bg-blue-200 transition"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(s._id, "rejected")}
                            className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-md hover:bg-red-200 transition"
                          >
                            <XCircleIcon className="h-5 w-5" />
                            Reject
                          </button>
                        </div>
                      ) : s.status === "approved" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateStatus(s._id, "completed")}
                            className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200 transition"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                            Mark Done
                          </button>
                        </div>
                      ) : (
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