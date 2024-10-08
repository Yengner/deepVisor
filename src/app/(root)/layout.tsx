import "@/css/satoshi.css";
import "@/css/style.css";

import React from "react";

import { redirect } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import ApiProvider from "@/components/QueryClientProvider";
import { Toaster } from "react-hot-toast";
// import { SessionProvider } from "@/hooks/useSession";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For some reason, session update was not working, so manually providing the user info
  // const session = await auth();

  // if (!session || !session.user?.id) {
  //   return redirect("/auth/signin");
  // }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: session.user.id,
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true,
  //     image: true,
  //   },
  // });

  // if (!user) {
  //   return redirect("/auth/signin");
  // }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="min-h-dvh dark:bg-boxdark-2 dark:text-bodydark">
          {/* <ApiProvider> */}
            {/* <SessionProvider session={{ user }}> */}
              <DefaultLayout>{children}</DefaultLayout>
            {/* </SessionProvider> */}
          {/* </ApiProvider> */}

          <Toaster />
        </div>
      </body>
    </html>
  );
}
