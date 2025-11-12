"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBagIcon, BriefcaseIcon, RocketLaunchIcon, MegaphoneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// 🧩 Example listing data (replace later with API data)
const listings = [
  {
    id: 1,
    type: "product",
    title: "Sneakers - Nike Air Zoom",
    description: "Top-quality Nike sneakers for comfort and performance.",
    price: "₦45,000",
    image: "/images/nike.jpg",
    link: "https://wa.me/2348012345678",
  },
  {
    id: 2,
    type: "service",
    title: "Professional Hair Styling",
    description: "Book a home hair styling session — Lagos only.",
    price: "₦10,000",
    image: "/images/hair.jpg",
    link: "https://wa.me/2348012345678",
  },
  {
    id: 3,
    type: "boost",
    title: "Instagram Followers Boost (1K)",
    description: "Get 1,000 real followers for your IG brand page.",
    price: "₦7,500",
    image: "/images/instagram.jpg",
    link: "https://wa.me/2348012345678",
  },
  {
    id: 4,
    type: "campaign",
    title: "Music Video Promotion",
    description: "Let’s run ads for your YouTube or TikTok video.",
    price: "₦25,000",
    image: "/images/music.jpg",
    link: "https://wa.me/2348012345678",
  },
];

const filterOptions = [
  { id: "all", label: "All" },
  { id: "product", label: "Products" },
  { id: "service", label: "Services" },
  { id: "boost", label: "Boosts" },
  { id: "campaign", label: "Campaigns" },
];

export default function ListingsPage() {
  const [filter, setFilter] = useState("all");

  const filteredListings =
    filter === "all" ? listings : listings.filter((item) => item.type === filter);

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6 sm:px-12">
      {/* HEADER */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold text-gray-800 mb-2"
        >
          Explore Listings
        </motion.h1>
        <p className="text-gray-600">Find products, services, boosts, and campaigns on Linkmart.</p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setFilter(option.id)}
            className={`px-5 py-2 rounded-full border font-medium transition-all ${
              filter === option.id
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* LISTINGS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all overflow-hidden"
          >
            <div className="h-56 bg-gray-100">
              <img
                src={listing.image}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{listing.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{listing.description}</p>
              <p className="font-semibold text-emerald-700 mb-4">{listing.price}</p>

              <a
                href={listing.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-all"
              >
                Contact Seller
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FLOATING BUTTON */}
      <Link
        href="/listings/create"
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold transition-all"
      >
        + Create Listing
      </Link>
    </main>
  );
}