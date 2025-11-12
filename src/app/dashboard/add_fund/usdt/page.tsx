"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function USDTDepositPage() {
  const [copied, setCopied] = useState(false);

  const usdtAddress = "TXXX123ABC456XYZ789TRC20"; // Replace with your real address

  const copyAddress = () => {
    navigator.clipboard.writeText(usdtAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">
          💰 Deposit with USDT
        </h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Send your <strong>TRC20 USDT</strong> to the wallet address below.  
          <span className="block mt-1 text-sm text-red-500 font-medium">
            ⚠ Send only TRC20 USDT to avoid loss of funds.
          </span>
        </p>

        <div className="flex justify-center mb-6">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
            <Image
              src="/usdt-qr.png"
              alt="USDT QR Code"
              width={180}
              height={180}
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-5 text-left">
          <p className="font-mono text-sm text-gray-800 break-all">
            {usdtAddress}
          </p>
          <button
            onClick={copyAddress}
            className="text-emerald-600 text-sm mt-2 hover:underline"
          >
            {copied ? "✅ Copied!" : "📋 Copy Address"}
          </button>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition duration-200">
          I’ve Sent USDT
        </button>
      </motion.div>
    </section>
  );
}