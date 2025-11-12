"use client";

import Link from "next/link";
import {
  HomeIcon,
  ChartBarIcon,
  RectangleStackIcon,
  RocketLaunchIcon,
  BanknotesIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

export default function DashboardSidebar() {
  const links = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      href: "/dashboard/listings",
      label: "My Listings",
      icon: <RectangleStackIcon className="h-5 w-5" />,
    },
    {
      href: "/dashboard/products",
      label: "Products",
      icon: <ShoppingBagIcon className="h-5 w-5 text-pink-300" />, // 🛍 for products
    },
    {
      href: "/dashboard/services",
      label: "Services",
      icon: <WrenchScrewdriverIcon className="h-5 w-5" />, // 👈 clean & fitting for services
    },
    {
      href: "/dashboard/boosts",
      label: "Boosts",
      icon: <SparklesIcon className="h-5 w-5 text-yellow-300" />, // ✨ lively look
    },
    {
      href: "/dashboard/campaigns",
      label: "Campaigns",
      icon: <RocketLaunchIcon className="h-5 w-5" />,
    },
    {
      href: "/dashboard/add_fund",
      label: "Add Funds",
      icon: <BanknotesIcon className="h-5 w-5 text-green-300" />, // 💵 better icon for funds
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: <ChartBarIcon className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="w-64 bg-emerald-700 text-white flex flex-col min-h-screen py-6 px-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-10 text-center tracking-wide">
        Linkmart
      </h2>

      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-emerald-600 transition-all duration-150 font-medium"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto text-center text-sm text-emerald-200 pt-6 border-t border-emerald-600">
        © {new Date().getFullYear()} Linkmart
      </div>
    </aside>
  );
}