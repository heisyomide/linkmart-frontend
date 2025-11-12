"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type FAQ = {
  question: string;
  answer: string;
};

type Category = {
  title: string;
  faqs: FAQ[];
};

const helpCategories: Category[] = [
  {
    title: "Getting Started",
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click the 'Register' button on the top right of the homepage, fill in your details, and verify your email. Once confirmed, you’ll have access to your Linkmart dashboard.",
      },
      {
        question: "Is Linkmart free to use?",
        answer:
          "Yes! You can start listing your products and services for free. Optional paid features like boosts or analytics tools are available for more visibility.",
      },
    ],
  },
  {
    title: "Listings & Selling",
    faqs: [
      {
        question: "How do I post a new listing?",
        answer:
          "Go to your dashboard and click 'Create Listing'. Add images, details, category, and your contact link. When you publish, Linkmart automatically shares it to your connected social media pages.",
      },
      {
        question: "Can I link my WhatsApp for orders?",
        answer:
          "Yes — you can add a WhatsApp link to any listing so customers can message you directly.",
      },
    ],
  },
  {
    title: "Payments & Boosts",
    faqs: [
      {
        question: "How do boosts work?",
        answer:
          "Boosts increase your listing’s visibility across our homepage, social feeds, and partner platforms. You can activate a boost under any listing.",
      },
      {
        question: "What payment methods are supported?",
        answer:
          "We currently accept Paystack, Stripe, and card payments (Visa, MasterCard, Verve). More options are coming soon.",
      },
    ],
  },
  {
    title: "Account & Security",
    faqs: [
      {
        question: "How do I reset my password?",
        answer:
          "On the login page, click 'Forgot password?' and follow the steps. You’ll receive an email link to reset it securely.",
      },
      {
        question: "Is my information safe on Linkmart?",
        answer:
          "Absolutely. We encrypt all sensitive information and follow standard data protection regulations to keep your account safe.",
      },
    ],
  },
];

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const filteredCategories = helpCategories.map((cat) => ({
    ...cat,
    faqs: cat.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-900 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Help Center</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about Linkmart listings, payments, and accounts.
          </p>
        </header>

        {/* ===== SEARCH BAR ===== */}
        <div className="relative mb-12 max-w-xl mx-auto">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* ===== FAQ CATEGORIES ===== */}
        <div className="space-y-12">
          {filteredCategories.map((category, catIndex) =>
            category.faqs.length > 0 ? (
              <section key={catIndex}>
                <h2 className="text-2xl font-semibold text-emerald-700 mb-6">{category.title}</h2>
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const id = `${catIndex}-${faqIndex}`;
                    const isOpen = openIndex === id;

                    return (
                      <motion.div
                        key={id}
                        className="border border-emerald-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : id)}
                          className="w-full text-left px-5 py-4 flex justify-between items-center"
                        >
                          <span className="font-medium text-gray-800">{faq.question}</span>
                          <ChevronDownIcon
                            className={`h-5 w-5 text-emerald-600 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-5 pb-4 text-gray-600 text-sm border-t border-emerald-50"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ) : null
          )}
        </div>

        {/* ===== CONTACT SUPPORT CTA ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-20 bg-emerald-600 text-white py-12 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
          <p className="text-emerald-100 mb-6">
            Can’t find what you’re looking for? Reach out to our support team.
          </p>
          <a
            href="/contact"
            className="bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </main>
  );
}