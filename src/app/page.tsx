"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      {/* Only the homepage will have navbar */}
      <Navbar />
      <div className="mt-24"></div>

      {/* Hero Section */}
      <HeroSection />


      {/* Feature Section */}
      <FeatureSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}