"use client";

import { JSX, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function VerifyDepositContent() {
  const params = useSearchParams();
  const status = params.get("status");

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">
      {status === "success" ? (
        <div className="text-green-600 text-xl font-semibold">
          ✅ Payment Successful! Your wallet has been updated.
        </div>
      ) : (
        <div className="text-red-600 text-xl font-semibold">
          ❌ Payment Failed. Please try again.
        </div>
      )}
    </div>
  );
}

export default function VerifyDeposit(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyDepositContent />
    </Suspense>
  );
}