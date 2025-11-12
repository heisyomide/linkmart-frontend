"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaPinterestP } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Linkmart</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The unified platform for selling, advertising, and growing your business across social media — all from one dashboard.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-400 transition">About Us</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition">Services</Link></li>
              <li><Link href="/listings" className="hover:text-emerald-400 transition">Listings</Link></li>
              <li><Link href="/register" className="hover:text-emerald-400 transition">Get Started</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-emerald-400 transition">Contact Us</Link></li>
              <li><Link href="/help" className="hover:text-emerald-400 transition">Help Center</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-emerald-400 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-emerald-400 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-emerald-400 transition"><FaXTwitter /></a>
              <a href="#" className="hover:text-emerald-400 transition"><FaPinterestP /></a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="text-white font-semibold">Linkmart</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}