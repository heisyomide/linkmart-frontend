"use client";

import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

interface Product {
  _id: string;
  user: string; // populated user email or name
  title: string;
  price: number;
  category: string;
  platform: string;
  whatsapp: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/products", {
          headers: { Authorization: `Bearer ${token} `},
        });

        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://https://linkmart-backend.onrender.com/api/admin/products/${id}/status`,
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
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: updated.status } : p))
        );
      }
    } catch (err) {
      console.error("Error updating product status:", err);
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
          <a href="/admin/deposits" className="block hover:text-green-600">💳 Deposits</a>
          <a href="/admin/services" className="block hover:text-green-600">⚙ Services</a>
          <a href="/admin/products" className="block text-green-600 font-semibold">🛍 Products</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">User Product Listings</h2>

        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-500">Loading products...</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">User</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Platform</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">WhatsApp</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-700">{p.user}</td>
                    <td className="px-6 py-3 text-gray-700 font-semibold">{p.title}</td>
                    <td className="px-6 py-3 text-gray-700">{p.category}</td>
                    <td className="px-6 py-3 text-gray-700">{p.platform}</td>
                    <td className="px-6 py-3 text-gray-700">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-3 text-gray-700">{p.whatsapp}</td>
                    <td className="px-6 py-3 text-gray-700">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[p.status]}`}
                      >
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      {p.status === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateStatus(p._id, "approved")}
                            className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-md hover:bg-green-200 transition"
                          >
                            <CheckCircleIcon className="h-5 w-5" />
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(p._id, "rejected")}
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