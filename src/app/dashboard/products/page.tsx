"use client";

import { useEffect, useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import {
  ShoppingBagIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
      case "rejected":
        return (
          <span className={`${base} bg-red-100 text-red-700`}>
            <XCircleIcon className="h-4 w-4" /> Rejected
          </span>
        );
      case "running":
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>
            <ClockIcon className="h-4 w-4" /> Running
          </span>
        );
      case "completed":
        return (
          <span className={`${base} bg-emerald-100 text-emerald-700`}>
            <CheckCircleIcon className="h-4 w-4" /> Completed
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
            <ShoppingBagIcon className="h-8 w-8 text-emerald-600" />
            My Products
          </h1>

          <a
            href="/listings/create/product"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-md font-medium transition"
          >
            + Publish Product
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {loading ? (
            <p className="p-6 text-gray-600">Loading your products...</p>
          ) : products.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              <p>No products published yet.</p>
              <a
                href="/listings/create/product"
                className="text-emerald-600 hover:underline font-semibold"
              >
                Publish one now →
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Product</th>
                    <th className="px-6 py-3 font-semibold">Category</th>
                    <th className="px-6 py-3 font-semibold">Platforms</th>
                    <th className="px-6 py-3 font-semibold">Amount</th>
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3 flex items-center gap-3">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 rounded-md object-cover border"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-md" />
                        )}
                        <span className="font-semibold text-gray-800">
                          {product.title}
                        </span>
                      </td>

                      <td className="px-6 py-3 text-gray-700">
                        {product.category || "-"}
                      </td>

                      <td className="px-6 py-3 text-gray-700">
                        {product.platforms?.join(", ") || "-"}
                      </td>

                      <td className="px-6 py-3 text-gray-700 font-medium">
                        ${product.amount?.toFixed(2) || "0.00"}
                      </td>

                      <td className="px-6 py-3 text-gray-500 text-sm">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-3">{getStatusBadge(product.status)}</td>
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