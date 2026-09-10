"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCursor } from "../global/Providers";
import { cn } from "@/utils/cn";

export interface NavLink {
  label: string;
  href: string;
  isPremium?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Talent Categories", href: "/categories" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog Hub", href: "/blog" },
  { label: "Book Artist", href: "/book", isPremium: true },
];

export default function Navigation() {
  const pathname = usePathname();
  const { setCursorType, setCursorText } = useCursor();

  const handleLinkEnter = (link: NavLink) => {
    if (link.isPremium) {
      setCursorType("gold");
      setCursorText("ELITE");
    } else {
      setCursorType("hover");
      setCursorText("");
    }
  };

  const handleLinkLeave = () => {
    setCursorType("default");
    setCursorText("");
  };

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => handleLinkEnter(link)}
            onMouseLeave={handleLinkLeave}
            className={cn(
              "font-display text-xs uppercase tracking-widest font-semibold transition-all duration-300 relative py-1",
              link.isPremium
                ? "text-brand-gold hover:text-brand-gold-glow border border-brand-gold/30 rounded-full px-4 py-1.5 bg-brand-gold/5 hover:bg-brand-gold/15 hover:shadow-gold-glow"
                : isActive
                ? "text-brand-red-bright"
                : "text-brand-silver/70 hover:text-white"
            )}
          >
            {!link.isPremium && (
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[2px] bg-brand-red-bright transition-all duration-300",
                  isActive ? "w-full" : "w-0 hover:w-full"
                )}
              />
            )}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
