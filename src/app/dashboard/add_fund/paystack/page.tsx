"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface PaystackInitResponse {
  link: string;
  reference: string;
}

export default function AddFundPage() {
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDeposit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || Number(amount) < 100) {
      setError("Minimum deposit is ₦100");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to continue.");
        setLoading(false);
        return;
      }

      const payload = { amount: Number(amount) * 100 };

      const res = await axios.post<PaystackInitResponse>(
        "http://localhost:5000/api/paystack/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data && typeof res.data.link === "string") {
        setSuccess(true);
        window.location.href = res.data.link;
      } else {
        setError("Invalid Paystack response.");
      }
    } catch (err: any) {
      console.error("Deposit error:", err);
      setError(err.response?.data?.message || "Payment initialization failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("status");
    if (status === "success") {
      localStorage.setItem("refreshWallet", "true");
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-emerald-100"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-700">
          💳 Add Funds
        </h1>

        <form onSubmit={handleDeposit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Amount (NGN)
            </label>
            <input
              type="number"
              min={100}
              placeholder="₦100 minimum"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 bg-red-50 border border-red-200 text-sm p-2 rounded"
            >
              {error}
            </motion.p>
          )}

          {success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 bg-green-50 border border-green-200 text-sm p-2 rounded"
            >
              Redirecting to Paystack...
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Processing..." : "Proceed to Paystack"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}