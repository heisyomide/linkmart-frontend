"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setDropdown((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ✅ LOGO */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-emerald-700 tracking-tight hover:text-emerald-800 transition-colors"
        >
          Linkmart
        </Link>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-gray-700 font-medium">
          <NavLink href="/" label="Home" />
          <NavLink href="/listings" label="Listings" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/about" label="About" />

          {/* ✅ Auth / Profile Area */}
          {!user ? (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="border border-emerald-600 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800"
              >
                <UserCircleIcon className="h-8 w-8" />
                <span className="font-medium">{user.name}</span>
              </button>

              {/* ✅ Profile Dropdown */}
              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-white border border-emerald-100 rounded-lg shadow-md w-48 overflow-hidden"
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-2 hover:bg-emerald-50 text-gray-700"
                    >
                      My Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setDropdown(false)}
                      className="block px-4 py-2 hover:bg-emerald-50 text-gray-700"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none text-emerald-700"
        >
          {isOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-emerald-100 flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium shadow-sm"
          >
            <MobileLink href="/" label="Home" onClick={() => setIsOpen(false)} />
            <MobileLink href="/listings" label="Listings" onClick={() => setIsOpen(false)} />
            <MobileLink href="/services" label="Services" onClick={() => setIsOpen(false)} />
            <MobileLink href="/about" label="About" onClick={() => setIsOpen(false)} />

            {!user ? (
              <div className="flex flex-col w-3/4 gap-3 mt-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center border border-emerald-600 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex flex-col w-3/4 gap-3 mt-2">
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-center border border-emerald-600 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-center text-red-600 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* Helper Links */
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hover:text-emerald-600 transition-colors duration-150"
    >
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="hover:text-emerald-600 transition-colors"
    >
      {label}
    </Link>
  );
}