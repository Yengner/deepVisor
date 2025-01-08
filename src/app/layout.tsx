// src/app/layout.tsx
import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "DeepVisor - Empower Your Business with Advanced Ad Insights",
  description: "Helping businesses grow with advanced ad tools and insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-200 relative h-screen">
        {children}
      </body>
    </html>
  );
};
