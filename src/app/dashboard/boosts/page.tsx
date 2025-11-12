"use client";
import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";

export default function BoostsPage() {
  const [boosts, setBoosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("token");

  const fetchBoosts = async () => {
    try {
      console.log("Fetching boosts...");

      const res = await fetch("http://https://linkmart-backend.onrender.com/api/boosts/my", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", res.status);

      const text = await res.text();
      console.log("Raw response text:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }

      console.log("Parsed data:", data);

      if (Array.isArray(data)) {
        setBoosts(data);
      } else if (data && Array.isArray(data.boosts)) {
        setBoosts(data.boosts);
      } else {
        console.warn("Unexpected data format:", data);
        setBoosts([]);
      }
    } catch (err) {
      console.error("Error fetching boosts:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBoosts();
}, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Boosts</h1>

        {loading ? (
          <p className="text-gray-600">Loading your boost campaigns...</p>
        ) : boosts.length === 0 ? (
          <p className="text-gray-600">No boost campaigns found.</p>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Platform</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Type</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Status</th>
                  <th className="py-3 px-6 text-sm font-semibold text-gray-700">Created</th>
                </tr>
              </thead>
              <tbody>
                {boosts.map((boost) => (
                  <tr
                    key={boost._id || boost.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6 text-gray-800">{boost.platform || "—"}</td>
                    <td className="py-4 px-6 text-gray-800">${boost.amount?.toFixed(2)}</td>
                    <td className="py-4 px-6 text-gray-800">{boost.type}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          boost.status === "running"
                            ? "bg-emerald-100 text-emerald-700"
                            : boost.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : boost.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {boost.status || "pending"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      {new Date(boost.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}