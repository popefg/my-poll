import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Cedar Bites — Vote for Lebanon's Best Dish",
  description:
    "Cast your vote for your favorite Lebanese dish and watch the results roll in live.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} font-display antialiased`}>
        {children}
      </body>
    </html>
  );
}
