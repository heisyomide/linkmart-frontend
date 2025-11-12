"use client";

import { motion } from "framer-motion";
import {
  ShoppingBagIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import FeatureCard from "./FeatureCard";

export default function FeatureSection() {
  const features = [
    {
      icon: <ShoppingBagIcon className="h-10 w-10 text-emerald-600" />,
      title: "Unified Storefront",
      description:
        "Create one smart listing and Linkmart automatically syncs it across multiple platforms — no duplicate work, no missed opportunities.",
    },
    {
      icon: <UsersIcon className="h-10 w-10 text-emerald-600" />,
      title: "Direct Customer Connection",
      description:
        "Turn interest into conversations instantly with built‑in WhatsApp and Messenger links, so buyers can reach you without friction.",
    },
    {
      icon: <RocketLaunchIcon className="h-10 w-10 text-emerald-600" />,
      title: "Social Media Reach",
      description:
        "Expand your visibility by auto‑publishing to Instagram, Facebook, X, TikTok, and Pinterest — meeting customers where they already are.",
    },
    {
      icon: <ChartBarIcon className="h-10 w-10 text-emerald-600" />,
      title: "Smart Analytics",
      description:
        "Track clicks, reach, and conversions in real time. Understand what’s working and double down on your best‑performing campaigns.",
    },
    {
      icon: <CurrencyDollarIcon className="h-10 w-10 text-emerald-600" />,
      title: "Boosted Growth",
      description:
        "Run targeted boosts and ad campaigns directly from Linkmart to maximize exposure and grow your sales faster.",
    },
    {
      icon: <ShieldCheckIcon className="h-10 w-10 text-emerald-600" />,
      title: "Secure & Reliable",
      description:
        "Your business data and transactions are protected with enterprise‑grade security, so you can focus on selling with peace of mind.",
    },
  ];

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-12 py-20 bg-white border-t">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + index * 0.15 }}
          viewport={{ once: true }}
        >
          <FeatureCard
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        </motion.div>
      ))}
    </section>
  );
}