"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LegalPage() {
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
            Legal & Policy Center
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

        {/* ===== PRIVACY POLICY ===== */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            🔒 Privacy Policy
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            At <strong>Linkmart</strong>, your privacy is important to us. This
            Privacy Policy explains how we collect, use, and protect your
            personal information when you use our website or services.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                1. Information We Collect
              </h3>
              <p>
                We may collect personal data such as your name, email address,
                contact number, and payment details when you register, post a
                listing, or subscribe to premium services.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                2. How We Use Your Information
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>To create and manage your Linkmart account</li>
                <li>To process payments securely</li>
                <li>To improve user experience and platform performance</li>
                <li>To communicate updates and offers (only with your consent)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                3. Data Protection
              </h3>
              <p>
                We implement industry-standard encryption and security
                protocols to safeguard your information. Your personal data is
                never shared with third parties without your consent, except
                where required by law.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                4. Cookies
              </h3>
              <p>
                We use cookies to enhance your browsing experience and analyze
                traffic. You can control cookie preferences in your browser
                settings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                5. Contact Regarding Privacy
              </h3>
              <p>
                If you have questions about our privacy practices, please
                contact us at{" "}
                <Link
                  href="/contact"
                  className="text-emerald-600 underline hover:text-emerald-800"
                >
                  Contact Page
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ===== REFUND POLICY ===== */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            💰 Refund & Cancellation Policy
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Our refund and cancellation policy applies to all premium features,
            paid listings, or promotional upgrades purchased through{" "}
            <strong>Linkmart</strong>.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                1. Cancellations
              </h3>
              <p>
                Users can cancel any premium plan or boosted listing before the
                billing cycle renews. Once canceled, your account will remain
                active until the end of the current paid period.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                2. Refund Eligibility
              </h3>
              <p>
                Refunds are only provided under the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Duplicate payment made due to a system error</li>
                <li>Unauthorized payment or fraudulent transaction</li>
                <li>Service not delivered as described due to Linkmart error</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                3. Non-Refundable Cases
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  If your listing is removed due to violation of our terms
                </li>
                <li>Change of mind after successful purchase</li>
                <li>
                  Issues caused by third-party platforms (e.g., Instagram, X)
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                4. Refund Timeline
              </h3>
              <p>
                Approved refunds will be processed within 5–10 business days
                through the same payment method used for the transaction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                5. Contact for Refund Requests
              </h3>
              <p>
                For refund or cancellation requests, please reach out to our
                support team via the{" "}
                <Link
                  href="/help-center"
                  className="text-emerald-600 underline hover:text-emerald-800"
                >
                  Help Center
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ===== BACK TO HOME ===== */}
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