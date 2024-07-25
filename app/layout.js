import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "FinTechFlow",
  description: "Your money, in flow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/wallet.svg" />
      </head>
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
