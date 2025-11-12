"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

type Platform = "tiktok" | "instagram" | "facebook" | "youtube" | "x" | "whatsapp";

const ALL_PLATFORMS: Platform[] = ["tiktok", "instagram", "facebook", "youtube", "x", "whatsapp"];

const GOALS = [
  { key: "engagement", label: "Engagement" },
  { key: "awareness", label: "Awareness" },
  { key: "traffic", label: "Traffic" },
  { key: "leads", label: "Leads" },
  { key: "sales", label: "Sales" },
  { key: "app_promotion", label: "App Promotion" },
];

export default function CreateCampaignPage() {
  const [platform, setPlatform] = useState<Platform>("tiktok");
  const [goal, setGoal] = useState("engagement");
  const [budget, setBudget] = useState<number>(50);
  const [mediaUrl, setMediaUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [appUrl, setAppUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => setMessage(null), [platform, goal, budget]);

  const estimated = useMemo(() => Math.max(0, Number(budget || 0)), [budget]);
  const isTikTok = platform === "tiktok";
  const isManual = ["instagram", "facebook", "x"].includes(platform);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token") ?? "";
      const payload = {
        platform,
        goal,
        budgetUSD: Number(budget),
        mediaUrl,
        caption,
        destinationUrl,
        appUrl,
      };

      const res = await fetch(`${API_BASE}/api/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token} `} : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create campaign");

      setMessage({
        type: "ok",
        text: isTikTok
          ? "✅ Campaign created and auto-launched via TikTok API."
          : "✅ Campaign created successfully and pending admin approval.",
      });

      setBudget(50);
      setCaption("");
      setMediaUrl("");
      setDestinationUrl("");
      setAppUrl("");
    } catch (err: any) {
      setMessage({ type: "err", text: err?.message || "Unexpected error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-gray-950 text-white py-12 px-4">
      {/* Emerald glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(16,185,129,0.25),transparent_70%)] opacity-60" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-emerald-100">Launch New Campaign</h1>
            <p className="text-sm text-emerald-300 mt-1">
              Create, review, and deploy campaigns across your preferred platforms.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg text-white font-medium shadow-md shadow-emerald-500/30"
          >
            Dashboard
          </Link>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT PANEL */}
          <section className="lg:col-span-2 space-y-6 bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-lg">
            {/* Platform Selector */}
            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Platform</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_PLATFORMS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlatform(p)}
                    className={`px-3 py-2 rounded-lg border text-xs font-semibold capitalize transition ${
                      platform === p
                        ? "bg-emerald-600 border-emerald-400 text-white shadow-emerald-500/30"
                        : "bg-white/10 border-white/20 text-emerald-100 hover:bg-white/20"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selector */}
            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Campaign Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-emerald-50"
              >
                {GOALS.map((g) => (
                  <option key={g.key} value={g.key}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Budget (USD)</label>
              <input
                type="number"
                min={1}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-emerald-50 outline-none"
              />
            </div>

            {/* Media URL */}
            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Media URL</label>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://tiktok.com/video/..."
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-emerald-50"
              />
            </div>

            {/* Caption */}
            <div>
              <label className="block text-sm font-semibold text-emerald-200 mb-2">Ad Caption / Text</label>
              <textarea
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-emerald-50 outline-none"
              />
            </div>

            {/* Additional Inputs */}
            {goal === "app_promotion" && (
              <div>
                <label className="block text-sm font-semibold text-emerald-200 mb-2">
                  App Store / Play Store URL
                </label>
                <input
                  type="url"
                  value={appUrl}
                  onChange={(e) => setAppUrl(e.target.value)}
                  placeholder="https://play.google.com/..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-emerald-50"
                />
              </div>
            )}

            {goal === "traffic" && (
              <div>
                <label className="block text-sm font-semibold text-emerald-200 mb-2">
                  Destination URL
                </label>
                <input
                  type="url"
                  value={destinationUrl}
                  onChange={(e) => setDestinationUrl(e.target.value)}
                  placeholder="https://your-website.com/landing-page"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-emerald-50"
                />
              </div>
            )}

            {/* Info Box */}
            <div
              className={`p-3 rounded border text-sm ${
                isTikTok
                  ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-100"
                  : isManual
                  ? "bg-yellow-500/10 border-yellow-400/30 text-yellow-100"
                  : "bg-white/10 border-white/20 text-emerald-200"
              }`}
            >
              {isTikTok
                ? "TikTok campaigns are launched automatically via API."
                : isManual
                ? "Instagram, Facebook, and X campaigns are manually processed by the admin team."
                : "Other platforms follow available Linkmart integrations."}
            </div>
          </section>

          {/* RIGHT PANEL */}
          <aside className="space-y-6">
            {/* Summary Card */}
            <div className="bg-gradient-to-br from-emerald-600/30 to-emerald-800/20 backdrop-blur-xl p-6 rounded-xl border border-emerald-400/20 shadow-lg shadow-emerald-600/20">
              <p className="text-xs uppercase tracking-wider text-emerald-200 mb-1">
                Campaign Summary
              </p>
              <h2 className="text-3xl font-bold text-white mb-2">${estimated.toLocaleString()}</h2>
              <p className="text-sm text-emerald-200 mb-4">
                Platform: <span className="font-semibold capitalize text-emerald-100">{platform}</span>
                <br />
                Goal: <span className="font-semibold text-emerald-100 capitalize">{goal.replace("_", " ")}</span>
              </p>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-lg font-semibold text-white transition ${
                  loading
                    ? "bg-emerald-500/60 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/30"
                }`}
              >
                {loading ? "Submitting..." : "Launch Campaign"}
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-3 rounded text-sm ${
                  message.type === "ok"
                    ? "bg-emerald-500/20 text-emerald-100 border border-emerald-400/30"
                    : "bg-red-500/20 text-red-100 border border-red-400/30"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </aside>
        </form>
      </div>
    </main>
  );
}