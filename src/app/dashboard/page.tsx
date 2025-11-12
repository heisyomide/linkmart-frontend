"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import StatsCard from "../components/StatsCard";
import TransactionHistory from "../components/TransactionHistory";
import {
  ShoppingBagIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  EyeIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";

interface UserStats {
  balance: number;
  totalListings: number;
  totalClicks: number;
  activeCampaigns: number;
  totalReach: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/users/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return console.error("Failed to fetch stats");

      const data = await res.json();

      setStats({
        balance: data.balance || 0,
        totalListings: data.totalListings || 0,
        totalClicks: data.totalClicks || 0,
        activeCampaigns: data.totalCampaigns || 0,
        totalReach: data.totalReach || 0,
      });
    } catch (err) {
      console.error("🚨 Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ✅ Wallet balance refresh after successful deposit
  useEffect(() => {
    const shouldRefresh = localStorage.getItem("refreshWallet");
    if (shouldRefresh) {
      fetchStats();
      localStorage.removeItem("refreshWallet");
    }
  }, []);

  const formattedStats = [
    {
      title: "Current Balance",
      value: loading ? "₦•••" :`₦${stats?.balance.toLocaleString()}`,
      icon: <BanknotesIcon className="h-8 w-8" />,
    },
    {
      title: "Total Listings",
      value: loading ? "•••" : stats?.totalListings || 0,
      icon: <ShoppingBagIcon className="h-8 w-8" />,
    },
    {
      title: "Total Clicks",
      value: loading ? "•••" : stats?.totalClicks.toLocaleString() || 0,
      icon: <EyeIcon className="h-8 w-8" />,
    },
    {
      title: "Active Campaigns",
      value: loading ? "•••" : stats?.activeCampaigns || 0,
      icon: <RocketLaunchIcon className="h-8 w-8" />,
    },
    {
      title: "Total Reach",
      value: loading ? "•••" : `${stats?.totalReach.toLocaleString() || 0}+`,
      icon: <ChartBarIcon className="h-8 w-8" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {formattedStats.map((s, i) => (
            <StatsCard key={i} title={s.title} value={s.value} icon={s.icon} />
          ))}
        </div>

        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <TransactionHistory />
        </section>
      </main>
    </div>
  );
}