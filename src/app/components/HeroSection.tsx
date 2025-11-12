"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-center text-center bg-gradient-to-b from-emerald-50 to-white overflow-hidden px-6">
      {/* Decorative BG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[url('/her0-pattern.jpg')] bg-cover bg-center"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Connect Your <span className="text-emerald-600">Business</span>  
          with Every <span className="text-emerald-600">Social Media</span>
        </h1>

        <p className="mt-5 text-lg text-gray-600 max-w-xl mx-auto">
          Manage ads, boost engagement, and sell products directly through 
          our connected APIs — all from one platform.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/listings"
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
          >
            Get Started <FaArrowRight className="text-sm" />
          </Link>

          <Link
            href="/about"
            className="px-6 py-3 border border-emerald-500 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all"
          >
            Learn More
          </Link>
        </div>
      </motion.div>

      {/* Hero Image / Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative mt-16 w-full max-w-5xl"
      >
        <Image
          src="/hero.png"
          alt="Platform Preview"
          width={500}
          height={800}
          className="rounded-2xl shadow-xl mx-auto"
        />
      </motion.div>
    </section>
  );
}