import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "FinTechFlow",
  description: "Your money, in flow.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: "#C8ACD6", fontSize: "16px" },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/wallet.svg" />
        </head>
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
