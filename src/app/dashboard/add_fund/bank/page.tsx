"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BankDepositPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const bankAccounts = [
    {
      bank: "Zenith Bank",
      name: "Linkmart Technologies",
      number: "1234567890",
    },
    {
      bank: "Access Bank",
      name: "Linkmart Technologies",
      number: "0987654321",
    },
  ];

  const copyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-emerald-100 px-4">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-emerald-600 mb-6 text-center">
          🏦 Bank Transfer
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Transfer funds to any of the bank accounts below. After payment, click{" "}
          <strong>“I’ve Made Payment”</strong> to notify our team for
          confirmation.
        </p>

        <div className="space-y-6">
          {bankAccounts.map((acct, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              transition={{ type: "spring", stiffness: 200 }}
              className="border border-gray-200 rounded-lg p-6 bg-gray-50 cursor-default"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {acct.bank}
              </h2>
              <p className="text-gray-600 text-sm">{acct.name}</p>

              <div className="flex items-center justify-between mt-3">
                <p className="font-mono text-lg font-medium text-emerald-700">
                  {acct.number}
                </p>
                <button
                  onClick={() => copyText(acct.number, acct.bank)}
                  className="text-sm text-emerald-600 hover:text-emerald-700 transition"
                >
                  {copied === acct.bank ? "✅ Copied!" : "Copy"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition"
        >
          I’ve Made Payment
        </motion.button>
      </motion.section>
    </div>
  );
}