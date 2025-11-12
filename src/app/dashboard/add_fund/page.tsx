"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AddFundPage() {
  const router = useRouter();

  const paymentMethods = [
    {
      name: "Paystack",
      icon: "💳",
      description: "Deposit instantly with your debit card via Paystack",
      route: "/dashboard/add_fund/paystack",
    },
    {
      name: "Bank Transfer",
      icon: "🏦",
      description: "Send money directly to our bank account",
      route: "/dashboard/add_fund/bank",
    },
    {
      name: "USDT (Crypto)",
      icon: "🪙",
      description: "Deposit using your USDT wallet (TRC20/BEP20)",
      route: "/dashboard/add_fund/usdt",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-emerald-100 px-4">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white p-10 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-600">
          💰 Add Funds
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Choose your preferred payment method to continue.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paymentMethods.map((method, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => router.push(method.route)}
              className="cursor-pointer bg-gradient-to-b from-white to-emerald-50 border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <div className="text-5xl mb-3">{method.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800">
                {method.name}
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}