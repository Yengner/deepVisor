import React from "react";
import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

        <div className="bg-white grid min-h-screen w-screen dark:bg-boxdark-2 dark:text-bodydark md:place-items-center">
          {children}
          <Toaster />
        </div>

  );
}

export const metadata: Metadata = {
  title: "Deepvisor",
  description: "Login to Deepvisor",
};
