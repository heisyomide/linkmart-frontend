"use client";

import DashboardSidebar from "../../components/DashboardSidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Listing {
  _id: string;
  title: string;
  category: string;
  price: number;
  status: "pending" | "approved";
  clicks: number;
}

export default function MyListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("⚠ No auth token found. Redirect or show login prompt.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/listings/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error(`❌ Failed to fetch listings (${res.status}): ${errText}`);
          return;
        }

        const data = await res.json();
        console.log("✅ Listings fetched successfully:", data);
        setListings(data || []);
      } catch (err) {
        console.error("🚨 Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setListings((prev) => prev.filter((l) => l._id !== id));
        console.log("🗑 Listing deleted successfully.");
      } else {
        console.error("❌ Failed to delete listing.");
      }
    } catch (err) {
      console.error("🚨 Error deleting listing:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Listings</h1>
          <Link
            href="/listings/create"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + Create New Listing
          </Link>
        </div>

        {loading ? (
          <div className="text-gray-500 text-center py-20">Loading listings...</div>
        ) : listings.length === 0 ? (
          <div className="text-gray-500 text-center py-20">
            You haven’t created any listings yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">Title</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">Clicks</th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing) => (
                  <tr
                    key={listing._id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">{listing.title}</td>
                    <td className="px-6 py-4 text-gray-600">{listing.category}</td>
                    <td className="px-6 py-4 text-gray-600">
                      ₦{listing.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          listing.status === "approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{listing.clicks}</td>
                    <td className="px-6 py-4 flex justify-end gap-3">
                      <Link
                        href={`/listings/${listing._id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <EyeIcon className="h-5 w-5 text-gray-600" />
                      </Link>
                      <Link
                        href={`/listings/edit/${listing._id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-gray-600" />
                      </Link>
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
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