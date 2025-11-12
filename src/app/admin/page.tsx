"use client";

import {
  ChartBarIcon,
  UsersIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
      try {
        const res = await fetch("https://linkmart-backend.onrender.com/api/admin/stats", {
          headers: { Authorization: `Bearer ${token} `},
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          console.error("Failed to fetch admin stats");
        }
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p className="p-10">Loading admin dashboard...</p>;
  }

  if (!stats) {
    return <p className="p-10 text-red-600">Failed to load admin stats</p>;
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <UsersIcon className="h-8 w-8 text-green-600" />,
      link: "/admin/users",
    },
    {
      title: "Total Deposits",
      value: `$${stats.totalEarnings}`,
      icon: <CurrencyDollarIcon className="h-8 w-8 text-green-600" />,
      link: "/admin/deposits",
    },
    {
      title: "Active Boosts",
      value: stats.totalBoosts,
      icon: <RocketLaunchIcon className="h-8 w-8 text-green-600" />,
      link: "/admin/boosts",
    },
    {
      title: "Active Campaigns",
      value: stats.activeCampaigns,
      icon: <ChartBarIcon className="h-8 w-8 text-green-600" />,
      link: "/admin/campaigns",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-green-600">Linkmart Admin</h1>
        </div>

        <nav className="flex-1 p-6 space-y-4 text-gray-700">
          <button onClick={() => router.push("/admin")} className="block text-left w-full hover:text-green-600">🏠 Dashboard</button>
          <button onClick={() => router.push("/admin/users")} className="block text-left w-full hover:text-green-600">👥 Users</button>
          <button onClick={() => router.push("/admin/boosts")} className="block text-left w-full hover:text-green-600">🚀 Boosts</button>
          <button onClick={() => router.push("/admin/campaigns")} className="block text-left w-full hover:text-green-600">📊 Campaigns</button>
          <button onClick={() => router.push("/admin/deposits")} className="block text-left w-full hover:text-green-600">💳 Deposits</button>
          <button onClick={() => router.push("/admin/services")} className="block text-left w-full hover:text-green-600">🧩 Services</button>
          <button onClick={() => router.push("/admin/settings")} className="block text-left w-full hover:text-green-600">⚙ Settings</button>
           <button onClick={() => router.push("/admin/products")} className="block text-left w-full hover:text-green-600">⚙ Products</button>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((stat, i) => (
            <div
              key={i}
              onClick={() => router.push(stat.link)}
              className="cursor-pointer bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                {stat.icon}
                <span className="text-sm text-gray-400">View</span>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Recent Actions */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Actions</h3>
          <div className="space-y-3">
            {stats.recentActions?.map((a: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
                <div>
                  <p className="font-medium text-gray-700">{a.type}</p>
                  <p className="text-sm text-gray-500">{a.user} — {a.date}</p>
                </div>
                <p className="text-green-600 font-semibold">{a.amount}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}