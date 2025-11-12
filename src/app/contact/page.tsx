"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  message: string;
  // honeypot (should remain empty)
  company?: string;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    message: "",
    company: "", // honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    // Basic client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ ok: false, message: "Please fill in your name, email and message." });
      return;
    }

    // Honeypot: if filled, treat as spam and silently return
    if (form.company && form.company.trim().length > 0) {
      setStatus({ ok: true, message: "Thanks — we'll be in touch." });
      setForm({ name: "", email: "", phone: "", whatsapp: "", message: "", company: "" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || ""}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone?.trim(),
          whatsapp: form.whatsapp?.trim(),
          message: form.message.trim(),
        }),
      });

      if (res.ok) {
        setStatus({ ok: true, message: "Message sent — we’ll get back to you shortly." });
        setForm({ name: "", email: "", phone: "", whatsapp: "", message: "", company: "" });
      } else {
        const data = await res.json().catch(() => null);
        setStatus({
          ok: false,
          message: data?.error || "Unable to send message. Please try again later.",
        });
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus({ ok: false, message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8"
          >
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
            <p className="text-sm text-gray-600 mb-6">
              Have a question, want a demo, or need help setting up your social integrations?
              Drop us a message and the Linkmart team will respond within one business day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot: hidden from users but bots might fill */}
              <div style={{ display: "none" }} aria-hidden>
                <label>
                  Company
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Firstname Middlename Lastname"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="+234 813 060 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp (optional)</label>
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="Tell us about your project, integration needs, or question..."
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center px-5 py-3 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: "", email: "", phone: "", whatsapp: "", message: "", company: "" });
                    setStatus(null);
                  }}
                  className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition"
                >
                  Reset
                </button>
              </div>

              {status && (
                <div
                  role="status"
                  className={`mt-3 text-sm ${status.ok ? "text-emerald-700" : "text-red-600"}`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </motion.div>

          {/* Right: Contact Info */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get in touch</h3>
              <p className="text-sm text-gray-600 mb-4">
                Email: <a href="mailto:hello@linkmart.app" className="text-emerald-600">hello@linkmart.app</a>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Phone: <a href="tel:+2348133781307" className="text-emerald-600">+2348133781307</a>
              </p>
              <p className="text-sm text-gray-600">
                Office: Lagos, Nigeria (remote-friendly)
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Business hours</h4>
              <p className="text-sm text-gray-600">Mon — Fri: 9:00 AM — 6:00 PM (WAT)</p>
              <p className="text-sm text-gray-600">Sat — Sun: By appointment</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-emerald-100 p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Follow</h4>
              <div className="flex gap-4">
                <a href="#" className="text-emerald-600 hover:underline text-sm">Facebook</a>
                <a href="#" className="text-emerald-600 hover:underline text-sm">Instagram</a>
                <a href="#" className="text-emerald-600 hover:underline text-sm">X</a>
                <a href="#" className="text-emerald-600 hover:underline text-sm">Pinterest</a>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}