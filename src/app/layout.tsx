import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "Linkmart — Sell Smarter, Reach Wider",
  description:
    "List your products once, and Linkmart publishes them across major social media platforms automatically.",
  icons: {
    icon: "/vercel.png", // your tab icon
  },
  openGraph: {
    title: "Linkmart — Sell Smarter, Reach Wider",
    description:
      "List your products once, and Linkmart publishes them across major social media platforms automatically.",
    url: "https://linkmart.com", // replace with your real domain
    siteName: "Linkmart",
    images: [
      {
        url: "/vercel.png", // 👈 your company preview image
        width: 1200,
        height: 630,
        alt: "Linkmart Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkmart — Sell Smarter, Reach Wider",
    description:
      "List your products once, and Linkmart publishes them across major social media platforms automatically.",
    images: ["/vercel.png"], // 👈 same image
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        <AuthProvider>
          <main className="flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}