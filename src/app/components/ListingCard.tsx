"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";

interface ListingCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  sellerName?: string;
  whatsappLink: string;
  category?: string;
}

export default function ListingCard({
  title,
  description,
  price,
  imageUrl,
  sellerName,
  whatsappLink,
  category,
}: ListingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {category && (
            <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
              {category}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-emerald-600 font-bold text-lg">{price}</span>
          {sellerName && (
            <span className="text-xs text-gray-400">by {sellerName}</span>
          )}
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 bg-emerald-500 text-white font-medium py-2 rounded-md hover:bg-emerald-600 transition-all"
        >
          <FaWhatsapp className="text-lg" />
          Contact on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}