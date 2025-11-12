"use client";

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function CreateProductPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("electronics");
  const [whatsapp, setWhatsapp] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const ALL_PLATFORMS = ["tiktok", "instagram", "facebook", "youtube", "x", "whatsapp"];

  const togglePlatform = (p: string) => {
    setPlatforms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://linkmart-backend.onrender.com";

  // 🟢 If your backend route requires authentication (authMiddleware)
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in before creating a product.");
    setLoading(false);
    return;
  }

  try {
    // Optional: upload images to Cloudinary later — for now, just demo preview URLs
    const imageUrls = images.map((file) => URL.createObjectURL(file));

    // 🚀 Send data to your live backend
    const response = await axios.post(
      `${API_BASE}/products`,
      {
        title,
        description: desc,
        price,
        category,
        whatsapp,
        platforms,
        images: imageUrls,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("✅ Product created successfully!");
    console.log("Server response:", response.data);

    // Reset form
    setTitle("");
    setDesc("");
    setPrice("");
    setWhatsapp("");
    setPlatforms([]);
    setImages([]);
  } catch (err: any) {
    console.error(err);
    toast.error(err.response?.data?.message || "❌ Failed to create product.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-gray-950 text-white py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.2),transparent_70%)] opacity-60" />
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT FORM */}
        <section className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-emerald-100 mb-1">
              List a Product
            </h1>
            <p className="text-emerald-300 text-sm">
              List your physical or digital product and publish it across platforms.
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

          {/* Product Title */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Product Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Smartwatch Pro Max"
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe your product and its key features..."
              required
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., 50"
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
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Living</option>
              <option value="beauty">Beauty</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* WhatsApp Contact */}
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

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-emerald-200 mb-2">
              Upload Product Images
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
          <p className="text-sm text-emerald-300">Product Summary</p>
          <div className="space-y-2 text-sm text-emerald-100">
            <p>
              <span className="font-medium">Platforms:</span>{" "}
              {platforms.length ? platforms.join(", ") : "None selected"}
            </p>
            <p>
              <span className="font-medium">Base Price:</span> ${price || "0"}
            </p>
            <p>
              <span className="font-medium">Estimated Reach:</span>{" "}
              {platforms.length * 1000}+ views
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
            {loading ? "Publishing..." : "Publish Product"}
          </button>
        </aside>
      </div>
    </main>
  );
}