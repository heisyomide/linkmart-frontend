"use client";

import React, { useEffect, useState, useMemo, FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaPinterest,
  FaSpotify,
  FaLinkedin,
  FaGoogle,
  FaTelegramPlane,
  FaDiscord,
  FaSnapchatGhost,
  FaTwitch,
  FaGlobe,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";

/* ============================================================
   === TYPES ===
   ============================================================ */
type ProviderService = {
  service: string;
  type: any;
  _id: string;
  id: string;
  name: string;
  category: string;
  pricePerUnit: number;
  currency: string;
  min: number;
  max: number;
  platform: string;
};

/* ============================================================
   === ICON MAP ===
   ============================================================ */
const icons: Record<string, React.ReactNode> = {
  instagram: <FaInstagram />,
  facebook: <FaFacebook />,
  youtube: <FaYoutube />,
  tiktok: <FaTiktok />,
  x: <FaTwitter />,
  spotify: <FaSpotify />,
  linkedin: <FaLinkedin />,
  google: <FaGoogle />,
  telegram: <FaTelegramPlane />,
  discord: <FaDiscord />,
  snapchat: <FaSnapchatGhost />,
  twitch: <FaTwitch />,
  pinterest: <FaPinterest />,
  website_traffic: <FaGlobe />,
  reviews: <FaStar />,
  others: <FaShoppingCart />,
};

/* ============================================================
   === MAIN COMPONENT ===
   ============================================================ */
export default function BoostCreatePage() {
  const [platform, setPlatform] = useState<string>("instagram");
  const [services, setServices] = useState<ProviderService[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(100);
  const [channelUrl, setChannelUrl] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [noteAccepted, setNoteAccepted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedService = services.find((s) => s._id === selectedServiceId) || null;

  /* -------------------- Load Services -------------------- */
 async function loadServices(platformName: string) {
  setLoading(true);
  setMessage(null);

  try {
    const token = localStorage.getItem("token") ?? "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/boosts/services?platform=${encodeURIComponent(
        platformName
      )}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    if (!res.ok) throw new Error(`Failed to load services (${res.status})`);
    const result = await res.json();

    // Normalize all fetched services
    const allServices: ProviderService[] = (result.services || []).map((svc: any) => ({
      _id: String(svc.service),
      id: String(svc.service),
      name: svc.name || "Unnamed Service",
      category: svc.category || "Others",
      pricePerUnit: parseFloat(svc.rate) || 0,
      currency: "USD",
      min: svc.min || 0,
      max: svc.max || 0,
      platform: (svc.category || "").toLowerCase(), // <- use category text to detect platform
    }));

    // ✅ Platforms list
    const platforms = [
      "instagram",
      "facebook",
      "youtube",
      "tiktok",
      "x",
      "twitter",
      "spotify",
      "linkedin",
      "google",
      "telegram",
      "discord",
      "snapchat",
      "twitch",
      "pinterest",
      "website",
      "reviews",
    ];

    // ✅ Filter only relevant services for the selected platform
    const matched = allServices.filter((svc) => {
      const cat = svc.category.toLowerCase();
      const name = svc.name.toLowerCase();
      return (
        cat.includes(platformName.toLowerCase()) ||
        name.includes(platformName.toLowerCase()) ||
        svc.platform.includes(platformName.toLowerCase())
      );
    });

    // ✅ Fallback for others
    const others = allServices.filter(
      (svc) =>
        !platforms.some((p) => svc.category.toLowerCase().includes(p)) &&
        !matched.includes(svc)
    );

    const organized = [
      ...matched.map((s) => ({ ...s, platform: platformName })),
      ...others.map((s) => ({ ...s, platform: "others" })),
    ];

    setServices(organized);
    setSelectedServiceId(null);
  } catch (err: any) {
    console.error("Error loading services:", err);
    setServices([]);
    setMessage(err?.message ?? "Could not load services");
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadServices(platform);
  }, [platform]);

  /* -------------------- Submit -------------------- */
/* -------------------- Submit -------------------- */
async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
  event.preventDefault();
  setMessage(null);

  if (!selectedServiceId) {
    setMessage("❌ Please select a service before submitting.");
    return;
  }

  const selectedService = services.find((s) => s._id === selectedServiceId);
  if (!selectedService) {
    setMessage("❌ Invalid service selected.");
    return;
  }

  if (!noteAccepted) {
    setMessage("⚠ You must accept the disclaimer before continuing.");
    return;
  }

  if (!channelUrl.trim()) {
    setMessage("⚠ Please provide the profile or post URL.");
    return;
  }

  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("⚠ You must log in before submitting a boost.");
      return;
    }

    // compute total cost
    const totalCost =
      (selectedService.pricePerUnit || 0) * (quantity || 0);

    // normalize fields for backend
    const payload = {
      serviceId: selectedService.service || selectedService._id,
      platform: (platform || "").toLowerCase(),
      type: (selectedService.type || "followers").toLowerCase(),
      quantity,
      amount: totalCost,
      link: channelUrl.trim(),
    };

    console.log("Submitting boost payload:", payload);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boosts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || `Failed to submit boost (${res.status})`);
    }

    // ✅ Handle success
    setMessage(`✅ ${result.message || "Boost created successfully!"}`);

    // reset UI
    setSelectedServiceId(null);
    setQuantity(100);
    setChannelUrl("");
    setNoteAccepted(false);

    // optionally update balance
    if (result.newBalance !== undefined) {
      localStorage.setItem("balance", String(result.newBalance));
      // if you have a global balance state, refresh it here
    }

  } catch (err: any) {
    console.error("❌ Boost submission error:", err);
    setMessage(err.message || "Failed to submit boost.");
  } finally {
    setLoading(false);
  }
}
  /* -------------------- UI -------------------- */
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-5xl bg-white/6 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6"
      >
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Boost Your Socials</h1>
            <p className="text-sm text-gray-300">
              Choose a platform, pick a service, and submit your order — we’ll handle the rest.
            </p>
          </div>
          <Link href="/dashboard" className="text-emerald-300 hover:text-white">
            Back to dashboard
          </Link>
        </header>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <PlatformSelector platform={platform} setPlatform={setPlatform} icons={icons} />
            <ServiceSelector
              services={services}
              selectedServiceId={selectedServiceId}
              setSelectedServiceId={setSelectedServiceId}
              loading={loading}
              platform={platform}
            />
            <OrderFormDetails
              selectedService={selectedService}
              quantity={quantity}
              setQuantity={setQuantity}
              channelUrl={channelUrl}
              setChannelUrl={setChannelUrl}
              noteAccepted={noteAccepted}
              setNoteAccepted={setNoteAccepted}
              message={message}
            />
          </div>

          <OrderSummary selectedService={selectedService} quantity={quantity} total={total} loading={loading} />
        </form>
      </motion.div>
    </main>
  );
}

/* ============================================================
   === PLATFORM SELECTOR ===
   ============================================================ */
function PlatformSelector({
  platform,
  setPlatform,
  icons,
}: {
  platform: string;
  setPlatform: (p: string) => void;
  icons: Record<string, React.ReactNode>;
}) {
  const platforms = Object.keys(icons);
  return (
    <div className="bg-white/6 border border-white/10 rounded-xl p-4 grid grid-cols-3 gap-3">
      {platforms.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPlatform(p)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all w-full justify-start ${
            platform === p
              ? "bg-emerald-600 text-white shadow-lg"
              : "bg-white/6 text-gray-200 hover:bg-white/10"
          }`}
        >
          <span className="text-lg">{icons[p]}</span>
          <span className="capitalize text-sm">{p.replace("_", " ")}</span>
        </button>
      ))}
    </div>
  );
}

/* ============================================================
   === SERVICE SELECTOR (clean + filtered) ===
   ============================================================ */
function ServiceSelector({
  services,
  selectedServiceId,
  setSelectedServiceId,
  loading,
  platform,
}: {
  services: ProviderService[];
  selectedServiceId: string | null;
  setSelectedServiceId: (id: string) => void;
  loading: boolean;
  platform: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Group only services matching the current platform
  const grouped = useMemo(() => {
    const relevant = services.filter(
      (svc) => svc.platform === platform.toLowerCase()
    );

    return relevant.reduce((acc: Record<string, ProviderService[]>, svc) => {
      if (!acc[svc.category]) acc[svc.category] = [];
      acc[svc.category].push(svc);
      return acc;
    }, {});
  }, [services, platform]);

  const categories = Object.keys(grouped).length
    ? Object.keys(grouped).sort()
    : ["Others"];

  const filteredServices =
    selectedCategory && grouped[selectedCategory]
      ? grouped[selectedCategory].filter((svc) =>
          svc.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div className="bg-white/6 border border-white/10 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-gray-200 mb-3">
        Select Service for {platform.toUpperCase()}
      </h3>

      {loading && <p className="text-gray-300">Loading services...</p>}
      {!loading && services.length === 0 && (
        <p className="text-gray-400">No services found for {platform}.</p>
      )}

      {!loading && services.length > 0 && (
        <>
          <div className="mb-4">
            <label className="text-xs text-gray-300 block mb-2">Category</label>
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <>
              <input
                type="text"
                placeholder="Search service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full mb-3 rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                {filteredServices.map((svc) => (
                  <label
                    key={svc._id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                      selectedServiceId === svc._id
                        ? "bg-emerald-700/20 border border-emerald-500"
                        : "hover:bg-white/6"
                    }`}
                  >
                    <div>
                      <div className="font-medium text-gray-100">{svc.name}</div>
                      <div className="text-xs text-gray-400">
                        Min: {svc.min} • Max: {svc.max}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-100">
                        {svc.currency} {svc.pricePerUnit.toFixed(2)}/unit
                      </div>
                      <input
                        type="radio"
                        checked={selectedServiceId === svc._id}
                        onChange={() => setSelectedServiceId(svc._id)}
                      />
                    </div>
                  </label>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
/* ============================================================
   === ORDER DETAILS & SUMMARY ===
   ============================================================ */
function OrderFormDetails({
  selectedService,
  quantity,
  setQuantity,
  channelUrl,
  setChannelUrl,
  noteAccepted,
  setNoteAccepted,
  message,
}: any) {
  return (
    <>
      <div className="bg-white/6 border border-white/10 rounded-xl p-4 grid gap-4">
        <div>
          <label className="text-sm text-gray-200 block mb-2">Quantity</label>
          <input
            type="number"
            min={selectedService?.min ?? 1}
            max={selectedService?.max ?? 100000}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-200 block mb-2">Profile / Post URL</label>
          <input
            type="url"
            placeholder="https://..."
            value={channelUrl}
            onChange={(e) => setChannelUrl(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="bg-yellow-50/80 border border-yellow-100 rounded-xl p-3 text-sm text-gray-700">
        <label className="flex gap-2 items-start">
          <input
            type="checkbox"
            checked={noteAccepted}
            onChange={(e) => setNoteAccepted(e.target.checked)}
          />
          <div>
            I understand that <strong>official ads</strong> use platform ad systems and are
            recommended for long-term growth. <strong>3rd-party growth</strong> providers may use
            external networks and carry risk. I accept the risk.
          </div>
        </label>
      </div>

      {message && (
        <div
          className={`p-3 rounded ${
            message.startsWith("✅")
              ? "bg-emerald-800/40 text-emerald-200"
              : "bg-red-800/40 text-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </>
  );
}

function OrderSummary({ selectedService, quantity, total, loading }: any) {
  const subtotal = selectedService ? quantity * selectedService.pricePerUnit : 0;

  return (
    <aside className="bg-white/6 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
      <div>
        <h4 className="text-sm text-gray-300">Order summary</h4>
        <div className="mt-3">
          <div className="text-xs text-gray-400">Service</div>
          <div className="font-semibold text-white">{selectedService?.name ?? "—"}</div>
        </div>
        <div className="mt-3">
          <div className="text-xs text-gray-400">Quantity</div>
          <div className="font-semibold text-white">{quantity}</div>
        </div>
        <div className="mt-3">
          <div className="text-xs text-gray-400">Unit price</div>
          <div className="font-semibold text-white">
            {selectedService?.currency ?? "₦"}{" "}
            {selectedService?.pricePerUnit?.toFixed(2) ?? "0.00"}
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Estimated total</div>
          <div className="text-xl font-bold text-emerald-300">
            {selectedService?.currency ?? "₦"} {subtotal.toFixed(2)}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg ${
          loading
            ? "bg-emerald-400 text-white cursor-not-allowed"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        {loading ? "Processing..." : "Submit Boost"}
      </button>

      <Link href="/pricing" className="text-center text-sm text-gray-300 hover:text-white">
        View Pricing
      </Link>
    </aside>
  );
}