"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CreateServicePage() {
  const [serviceTitle, setServiceTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("creative");
  const [whatsapp, setWhatsapp] = useState("");
  const [location, setLocation] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const ALL_PLATFORMS = [
    "Tiktok",
    "Instagram",
    "Facebook",
    "Youtube",
    "X",
    "Whatsapp",
  ];

  const togglePlatform = (p: string) => {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages([...images, ...Array.from(e.target.files)]);
  };

  // Handle Service Submission
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!platforms.length) {
    alert("⚠ Please select at least one platform");
    return;
  }

  setLoading(true);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in before creating a service listing.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", serviceTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("whatsapp", whatsapp);
    formData.append("location", location);
    formData.append("priceRange", priceRange);
    formData.append("platforms", JSON.stringify(platforms));

    // Each platform costs $10
    formData.append("amount", (platforms.length * 10).toString());

    images.forEach((file) => formData.append("images", file));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/services/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // include token
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("✅ Service listing created successfully!");
      setServiceTitle("");
      setDescription("");
      setCategory("creative");
      setWhatsapp("");
      setLocation("");
      setPlatforms([]);
      setImages([]);
      setPriceRange("");
    } else {
      alert(`❌ ${data.message || "Failed to create service"}`);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-gray-950 text-white py-12 px-4 relative overflow-hidden">
      {/* Emerald glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_70%)] opacity-60" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT PANEL */}
        <section className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-100 mb-1">
              Create Your Service Listing
            </h1>
            <p className="text-emerald-300 text-sm">
              Showcase your work and reach clients worldwide.
            </p>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Select Platforms
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize border transition ${
                    platforms.includes(p)
                      ? "bg-emerald-600 border-emerald-400 text-white shadow-emerald-400/30"
                      : "bg-white/10 border-white/20 text-emerald-100 hover:bg-white/20"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Service Title */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Service Title
            </label>
            <input
              type="text"
              value={serviceTitle}
              onChange={(e) => setServiceTitle(e.target.value)}
              placeholder="e.g., Professional Barber"
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your service and what makes it stand out..."
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-400"
            />
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Price Range (in USD)
            </label>
            <input
              type="text"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              placeholder="$50 - $200"
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-400"
            >
              <option value="creative">Creative & Design</option>
              <option value="tech">Technology</option>
              <option value="home">Home & Repair</option>
              <option value="beauty">Beauty & Wellness</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              WhatsApp Number
            </label>
            <input
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+234 812 345 6789"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Lagos, Nigeria"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Upload Logo / Sample Image
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="text-sm text-emerald-100"
            />
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {images.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="rounded-lg border border-white/20 h-28 w-full object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT SUMMARY PANEL */}
        <aside className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg p-6 space-y-4 h-fit">
          <p className="text-sm text-emerald-300">Order Summary</p>
          <div className="space-y-2 text-sm text-emerald-100">
            <p>
              <span className="font-medium">Platforms:</span>{" "}
              {platforms.length ? platforms.join(", ") : "None selected"}
            </p>
            <p>
              <span className="font-medium">Base price:</span> $10 per platform
            </p>
            <p>
              <span className="font-medium">Estimated total:</span>{" "}
              ${(platforms.length * 10).toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-emerald-500/60 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-500/30"
            }`}
          >
            {loading ? "Publishing..." : "Publish Service"}
          </button>
        </aside>
      </div>
    </main>
  );
}