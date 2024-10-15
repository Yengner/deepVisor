import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Toaster } from "react-hot-toast";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="min-h-dvh dark:bg-boxdark-2 dark:text-bodydark">

              <DefaultLayout>{children}</DefaultLayout>


          <Toaster />
        </div>
      </body>
    </html>
  );
}
