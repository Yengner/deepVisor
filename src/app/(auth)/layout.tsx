import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="grid min-h-screen w-screen dark:bg-boxdark-2 dark:text-bodydark md:place-items-center">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Deepvisor",
  description: "Login to Deepvisor",
};
