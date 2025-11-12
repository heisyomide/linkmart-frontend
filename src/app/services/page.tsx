"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: "🛒",
    title: "Product & Service Listings",
    description:
      "Create and publish listings for your products, services, events, or music. Once approved, they go live on Linkmart and are automatically shared on social media to reach more buyers.",
  },
  {
    icon: "📈",
    title: "Boosting & Promotion",
    description:
      "Increase your visibility with our tailored boosting services. We help promote your listings through social media ads, influencer collaborations, and organic reach strategies.",
  },
  {
    icon: "📢",
    title: "Ads Management",
    description:
      "Let our experts manage your Facebook, Instagram, X, and Pinterest campaigns. We handle everything — from creative design to targeting and analytics.",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    description:
      "Track results easily: clicks, impressions, WhatsApp leads, and engagement data — all in one clean, visual dashboard that helps you grow smarter.",
  },
  {
    icon: "🤝",
    title: "Account Management",
    description:
      "Busy? Our account management team helps maintain your listings, updates, and customer messages, ensuring your business stays active 24/7.",
  },
  {
    icon: "⚙",
    title: "Custom Growth Solutions",
    description:
      "Need something unique? From influencer campaigns to creative content or brand partnerships — we craft growth packages tailored to your goals.",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-800">
      {/* Header Section */}
      <section className="w-full py-20 text-center bg-emerald-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-3"
        >
          Our Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl opacity-90"
        >
          Empowering Sellers and Creators to Grow and Earn 🚀
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white border border-emerald-100 rounded-2xl shadow-md p-8 hover:shadow-lg transition-all"
          >
            <div className="text-emerald-600 text-4xl mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
            <p className="text-gray-700 leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-12 bg-emerald-600 text-white"
      >
        <h2 className="text-3xl font-extrabold mb-4">
          Ready to Grow Your Brand with Linkmart?
        </h2>
        <a
          href="/register"
          className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-100 transition-all"
        >
          Get Started Now
        </a>
      </motion.section>
    </main>
  );
}