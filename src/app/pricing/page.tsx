"use client";

import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();

  const plans = [
    {
      name: "Basic Boost",
      price: 10,
      features: [
        "Up to 5,000 reach",
        "1 active campaign",
        "Standard speed delivery",
        "Basic analytics",
      ],
      color: "border-green-400",
    },
    {
      name: "Standard Boost",
      price: 25,
      features: [
        "Up to 25,000 reach",
        "3 active campaigns",
        "Priority delivery",
        "Advanced analytics",
        "Email support",
      ],
      color: "border-green-500",
    },
    {
      name: "Premium Boost",
      price: 50,
      features: [
        "Up to 100,000 reach",
        "Unlimited campaigns",
        "Ultra-fast delivery",
        "Full analytics suite",
        "24/7 priority support",
      ],
      color: "border-green-600",
    },
  ];

  const handleSelect = (plan: string) => {
    // You can pass the plan name or price to the create boost page
    router.push(`/dashboard/boost?plan=${encodeURIComponent(plan)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-3">Boost Pricing Plans</h1>
        <p className="text-gray-600 mb-10">
          Choose the right plan for your campaign reach and growth.  
          You can always upgrade later as your audience expands.
        </p>

        {/* Pricing Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl border ${plan.color} shadow-sm hover:shadow-md transition-all duration-300 p-8 flex flex-col justify-between`}
            >
              <div>
                <h2 className="text-xl font-semibold text-green-700 mb-3">{plan.name}</h2>
                <p className="text-3xl font-bold text-gray-800 mb-6">
                  ${plan.price}
                  <span className="text-sm font-normal text-gray-500">/campaign</span>
                </p>

                <ul className="text-gray-600 text-sm space-y-2 mb-8">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelect(plan.name)}
                className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
              >
                Select Plan
              </button>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={() => router.push("/listings/create/boost")}
            className="text-green-600 hover:underline font-medium"
          >
            ← Back to Boost Setup
          </button>
        </div>
      </div>
    </div>
  );
}