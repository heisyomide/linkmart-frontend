"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ShoppingBagIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";

const createOptions = [
  {
    id: "product",
    title: "Sell a Product",
    desc: "List a physical or digital product with price, photos, and WhatsApp link.",
    icon: <ShoppingBagIcon className="h-10 w-10 text-emerald-600" />,
    link: "/listings/create/product",
  },
  {
    id: "service",
    title: "Offer a Service",
    desc: "Promote your business or freelance service and attract new clients.",
    icon: <BriefcaseIcon className="h-10 w-10 text-emerald-600" />,
    link: "/listings/create/service",
  },
  {
    id: "boost",
    title: "Social Media Boost",
    desc: "Grow your reach with paid boosts for followers, likes, or engagement.",
    icon: <RocketLaunchIcon className="h-10 w-10 text-emerald-600" />,
    link: "/listings/create/boost",
  },
  {
    id: "campaign",
    title: "Run Ad Campaign",
    desc: "Launch a targeted ad campaign across Facebook, Instagram, or TikTok.",
    icon: <MegaphoneIcon className="h-10 w-10 text-emerald-600" />,
    link: "/listings/create/campaign",
  },
];

export default function CreateListingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-3"
        >
          Create a Listing
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the type of listing you want to create. Linkmart will handle distribution across social media.
        </p>
      </div>

      {/* OPTIONS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {createOptions.map((option, i) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-8 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all flex flex-col items-center text-center"
          >
            <div className="mb-4">{option.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{option.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{option.desc}</p>
            <Link
              href={option.link}
              className="mt-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
            >
              Continue →
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}