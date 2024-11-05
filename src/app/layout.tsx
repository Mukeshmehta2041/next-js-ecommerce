import "./globals.css";
import { Inter, Almarai } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const almarai = Almarai({
  subsets: ["latin", "arabic"], weight: [
    "300",
    "400",
    "700",
    "800"
  ]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${almarai.className}`}>
        {children}
      </body>
    </html>
  );
}
