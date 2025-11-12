"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";

interface Campaign {
  _id: string;
  title: string;
  objective: string;
  budget: number;
  duration: string;
  status: "Active" | "Paused" | "Completed";
  reach: number;
  clicks: number;
}

function StatusBadge({ status }: { status: Campaign["status"] }) {
  const statusStyles: Record<Campaign["status"], string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Paused: "bg-yellow-100 text-yellow-700",
    Completed: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition-all text-sm">
      <td className="py-3 px-4 font-medium text-gray-800">{campaign.title}</td>
      <td className="py-3 px-4 text-gray-700">{campaign.objective}</td>
      <td className="py-3 px-4 text-gray-700">₦{campaign.budget.toLocaleString()}</td>
      <td className="py-3 px-4 text-gray-700">{campaign.duration}</td>
      <td className="py-3 px-4 text-gray-700">{campaign.reach}</td>
      <td className="py-3 px-4 text-gray-700">{campaign.clicks}</td>
      <td className="py-3 px-4">
        <StatusBadge status={campaign.status} />
      </td>
      <td className="py-3 px-4 text-right">
        <Link
          href={`/dashboard/campaign/${campaign._id}`}
          className="text-emerald-600 hover:underline font-semibold text-sm"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default function CampaignDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/campaigns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCampaigns(data);
        }
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">My Campaigns</h1>

            <Link
              href="/listings/create/campaign"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              + New Campaign
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500 text-center">Loading campaigns...</p>
          ) : campaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-emerald-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Title</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Objective</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Budget (₦)</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Duration</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Reach</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Clicks</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Status</th>
                    <th className="py-3 px-4 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <CampaignRow key={c._id} campaign={c} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-6">
              You haven’t created any campaigns yet.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}