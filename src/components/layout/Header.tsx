"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import Button from "../Button";
import { useCursor } from "../global/Providers";
import { cn } from "@/utils/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursorType, setCursorText } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoEnter = () => {
    setCursorType("red");
    setCursorText("FIZZ");
  };

  const handleLogoLeave = () => {
    setCursorType("default");
    setCursorText("");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 py-6",
          scrolled
            ? "bg-brand-black/75 backdrop-blur-md border-b border-white/5 py-4 shadow-glass"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
            className="font-display text-lg md:text-xl font-bold tracking-widest text-white flex items-center select-none"
          >
            BLACK<span className="text-brand-red-bright text-shadow-red ml-1">HAT</span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <Link href="/book" className="hidden lg:block">
              <Button variant="gold" size="sm" glow={false}>
                Book Now
              </Button>
            </Link>

            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              onMouseEnter={() => setCursorType("hover")}
              onMouseLeave={() => setCursorType("default")}
              className="p-2 border border-white/10 rounded-lg hover:border-brand-red text-white transition-all duration-300 md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
