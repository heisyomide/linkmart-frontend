"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import {
  WrenchScrewdriverIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const getStatusBadge = (status: string) => {
    const base =
      "px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1";

    switch (status) {
      case "approved":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            <CheckCircleIcon className="h-4 w-4" /> Approved
          </span>
        );
      case "pending":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            <ClockIcon className="h-4 w-4" /> Pending
          </span>
        );
      case "running":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>
            <PlayCircleIcon className="h-4 w-4" /> Running
          </span>
        );
      case "completed":
        return (
          <span className={`${base} bg-emerald-100 text-emerald-700`}>
            <CheckCircleIcon className="h-4 w-4" /> Completed
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            <XCircleIcon className="h-4 w-4" /> Rejected
          </span>
        );
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-600`}>Unknown</span>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
            <WrenchScrewdriverIcon className="h-8 w-8 text-emerald-600" />
            My Services
          </h1>

          <a
            href="/dashboard/services/new"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-md font-medium transition"
          >
            + Add Service
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {loading ? (
            <p className="p-6 text-gray-600">Loading your services...</p>
          ) : services.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <p>No services yet.</p>
              <a
                href="/dashboard/services/new"
                className="text-emerald-600 hover:underline font-semibold"
              >
                Add one now →
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Platform</th>
                    <th className="px-6 py-3 font-semibold">Category</th>
                    <th className="px-6 py-3 font-semibold">Link</th>
                    <th className="px-6 py-3 font-semibold">Amount</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Created</th>
                  </tr>
                </thead>

                <tbody>
                  {services.map((service) => (
                    <tr
                      key={service._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3 text-gray-800 font-medium">
                        {service.platform}
                      </td>

                      <td className="px-6 py-3 text-gray-700">
                        {service.category || "-"}
                      </td>

                      <td className="px-6 py-3 text-gray-700">
                        <a
                          href={service.link}
                          target="_blank"
                          className="text-emerald-600 hover:underline"
                        >
                          View Link
                        </a>
                      </td>

                      <td className="px-6 py-3 text-gray-800 font-semibold">
                        ${service.amount?.toFixed(2) || "0.00"}
                      </td>

                      <td className="px-6 py-3">{getStatusBadge(service.status)}</td>

                      <td className="px-6 py-3 text-sm text-gray-500">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}