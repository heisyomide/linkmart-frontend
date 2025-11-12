"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sellerName: string;
  whatsapp: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://linkmart-backend.onrender.com";

export default function ListingDetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`${API_BASE}/listings/${id}`);
        if (!res.ok) throw new Error("Failed to fetch listing");
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen text-gray-600">
        Loading listing details...
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="flex justify-center items-center h-screen text-gray-600">
        Listing not found 😔
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-80 sm:h-[400px]"
        >
          <Image
            src={listing.image || "/placeholder.jpg"}
            alt={listing.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* DETAILS */}
        <div className="p-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-3"
          >
            {listing.title}
          </motion.h1>

          <p className="text-gray-500 text-sm mb-6">
            Category: <span className="font-medium text-emerald-600">{listing.category}</span>
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">{listing.description}</p>

          <div className="flex items-center justify-between mb-8">
            <p className="text-2xl font-bold text-emerald-700">
              ₦{listing.price.toLocaleString()}
            </p>
            <Link
              href={`https://wa.me/${listing.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Contact Seller on WhatsApp
            </Link>
          </div>

          <div className="text-gray-500 text-sm">
            Posted by <span className="font-medium text-gray-700">{listing.sellerName}</span>
          </div>
        </div>
      </div>
    </main>
  );
}