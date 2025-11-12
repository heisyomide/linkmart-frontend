"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* ===== HEADER ===== */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-emerald-700 mb-3">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.header>

        {/* ===== BODY ===== */}
        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              1. Introduction
            </h2>
            <p>
              Welcome to <span className="font-semibold">Linkmart</span>. By
              accessing or using our website and services, you agree to be bound
              by these Terms & Conditions. Please read them carefully before
              proceeding.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              2. Use of Our Platform
            </h2>
            <p>
              You agree to use Linkmart solely for lawful purposes and in a way
              that does not infringe upon the rights of others or restrict their
              use and enjoyment of the platform. You are responsible for
              maintaining the confidentiality of your account credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              3. Account Responsibilities
            </h2>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>You must provide accurate, up-to-date information.</li>
              <li>
                You are responsible for all activities under your account.
              </li>
              <li>
                You must notify us immediately if you suspect unauthorized
                access.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              4. Listings and Content
            </h2>
            <p>
              Linkmart allows users to post business listings, promotions, and
              services. You agree that:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Your content must be accurate and lawful.</li>
              <li>
                You own or have the right to share all content you upload.
              </li>
              <li>
                Linkmart may remove or modify content that violates our policies
                or legal requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              5. Payments and Fees
            </h2>
            <p>
              Any payments made through Linkmart (e.g., for premium listings or
              promotions) are handled by secure third-party payment processors
              such as Paystack or Stripe. All fees are displayed before purchase
              and are non-refundable unless otherwise stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              6. Intellectual Property
            </h2>
            <p>
              All trademarks, graphics, and platform design elements are owned
              by Linkmart or its licensors. You may not copy, modify, or
              redistribute any part of the platform without written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              7. Limitation of Liability
            </h2>
            <p>
              Linkmart is not liable for any indirect, incidental, or
              consequential damages arising from your use of the platform. All
              services are provided “as is” without warranties of any kind,
              express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              8. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your access to
              Linkmart if you violate these terms or engage in activities that
              may harm the platform or its users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              9. Changes to These Terms
            </h2>
            <p>
              Linkmart may update these Terms & Conditions periodically. Any
              changes will take effect immediately upon posting on this page.
              Continued use of our platform means you accept the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              10. Contact Us
            </h2>
            <p>
              For any questions or concerns about these Terms, please reach out
              via our{" "}
              <Link
                href="/contact"
                className="text-emerald-600 underline hover:text-emerald-800"
              >
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>

        {/* ===== BACK BUTTON ===== */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}