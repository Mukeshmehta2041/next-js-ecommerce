import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import Providers from "@/components/providers";
import { NuqsAdapter } from 'nuqs/adapters/next/app'


const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${inter.className} bg-lightBackground`}>
          <Providers>
            <NuqsAdapter>
              {children}
            </NuqsAdapter>
          </Providers>
        </body>
      </html>
    </SessionProvider>

  );
}
