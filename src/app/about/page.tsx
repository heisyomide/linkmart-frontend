export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-800">
      {/* Header Section */}
      <section className="w-full py-20 text-center bg-emerald-600 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">About Linkmart</h1>
        <p className="text-lg md:text-xl opacity-90">
          Connecting Sellers, Creators, and Services with the World 🌍
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        {/* Mission */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Linkmart was built to empower individuals and businesses to reach more
            customers by connecting their listings directly to social media and
            messaging platforms. Whether you’re selling products, promoting music,
            or offering professional services, Linkmart gives you the tools to
            grow fast — no complex setup required.
          </p>
        </div>

        {/* Vision */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To be the most trusted growth platform for African entrepreneurs and
            creators — simplifying how they list, market, and sell online. We
            envision a digital space where every business, big or small, can
            thrive with equal opportunity.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">What Makes Linkmart Different</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>✅ Easy listing creation — no coding or setup needed.</li>
            <li>📢 Automatic promotion across major social media platforms.</li>
            <li>💬 Direct buyer communication through WhatsApp.</li>
            <li>📈 Extra services like ads management and analytics.</li>
            <li>💳 Simple payments for listings, boosts, and more.</li>
          </ul>
        </div>

        {/* Team / Founder */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-emerald-700 mb-4">The Team</h2>
          <p className="text-gray-700 leading-relaxed">
            Linkmart is powered by a small but passionate team of developers,
            designers, and marketers who believe in digital empowerment. Our goal
            is to simplify online business for everyone — from local sellers to
            music artists and professionals.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-10">
          <a
            href="/register"
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all"
          >
            Join Linkmart Today
          </a>
        </div>
      </section>
    </main>
  );
}