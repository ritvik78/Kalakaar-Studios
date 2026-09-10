import type { Metadata } from "next";
import "@/app/globals.css";
import Providers from "@/components/global/Providers";
import Cursor from "@/components/global/Cursor";
import ScrollProgress from "@/components/global/ScrollProgress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/global/PageTransition";
import BubbleParticles from "@/components/BubbleParticles";

export const metadata: Metadata = {
  title: "Black Hat Talent | Elite Artist Booking & Entertainment Management",
  description:
    "Discover world-class talents, musicians, DJs, acrobats, and performers for high-energy corporate and private events. Premium talent solutions.",
  metadataBase: new URL("https://blackhattalent.com"),
  openGraph: {
    title: "Black Hat Talent | Elite Artist Booking",
    description: "Elite artist booking and management.",
    images: "/og-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-brand-red/35 selection:text-white">
        <Providers>
          {/* Scroll progress bar */}
          <ScrollProgress />

          {/* Floating Bubble/Fizz Particles Background */}
          <BubbleParticles />

          {/* Glowing Custom Cursor */}
          <Cursor />

          {/* Shared Header Navigation */}
          <Header />

          {/* Main Content Transitions */}
          <main className="relative min-h-screen pt-24 z-10 overflow-hidden">
            <PageTransition>{children}</PageTransition>
          </main>

          {/* Shared Brushed Metal Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
