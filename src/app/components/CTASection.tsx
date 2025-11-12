"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-400 text-white">
      {/* Background Blur Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-300 opacity-20 blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-teal-300 opacity-20 blur-[100px]" />
      </div>

      {/* CTA Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Ready to Integrate Your Business with Every Social Platform?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg text-emerald-50 mb-10"
        >
          Start selling, boosting, and advertising your business across Facebook, Instagram, X, and more — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/auth/register"
            className="bg-white text-emerald-600 font-semibold px-8 py-3 rounded-md hover:bg-emerald-50 transition-all"
          >
            Get Started
          </Link>

          <Link
            href="/services"
            className="border border-white/70 text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-emerald-600 transition-all"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}