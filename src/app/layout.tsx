import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageTransition } from "@/components/site/PageTransition";
import { AwwwardsBadge } from "@/components/site/AwwwardsBadge";

export const metadata: Metadata = {
  title: "Senawa | Architecture & Interior Design Studio in Jakarta",
  description:
    "Architecture made for how people actually live. An architecture, interior, and furniture design studio in the Greater Jakarta area.",
  metadataBase: new URL("https://senawastudio.com"),
  openGraph: {
    title: "Senawa | Architecture & Interior Design Studio in Jakarta",
    description:
      "Architecture made for how people actually live. An architecture, interior, and furniture design studio in the Greater Jakarta area.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <PageTransition />
        <Nav />
        <div id="main-content" tabIndex={-1}>
          {children}
          <Footer />
        </div>
        <AwwwardsBadge />
      </body>
    </html>
  );
}
