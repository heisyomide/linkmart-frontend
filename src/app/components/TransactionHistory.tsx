"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  _id: string;
  amount: number;
  reference: string;
  status: "pending" | "success" | "failed";
  createdAt: string;
}

export default function TransactionHistory() {
  const [history, setHistory] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setHistory([]);
        setLoading(false);
        return;
      }

      const res = await axios.get<Transaction[]>(
        "http://localhost:5000/api/paystack/history", // ✅ Correct Route
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = Array.isArray(res.data) ? res.data : []; // ✅ Ensure array

      setHistory(data);
    } catch (error) {
      console.error("❌ Failed to fetch transaction history:", error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading...</p>;
  }

  if (history.length === 0) {
    return <p className="text-gray-700 text-sm">No transaction history yet.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4 border border-gray-200">
      <h2 className="font-semibold text-lg mb-3 text-emerald-600">
        Wallet Transaction History
      </h2>

      <ul className="space-y-3 max-h-72 overflow-y-auto">
        {history.map((tx) => (
          <li
            key={tx._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-100"
          >
            <div>
              <p className="text-gray-800 font-medium">
                ₦{tx.amount?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{tx.reference}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                tx.status === "success"
                  ? "bg-green-100 text-green-700"
                  : tx.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {tx.status.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}