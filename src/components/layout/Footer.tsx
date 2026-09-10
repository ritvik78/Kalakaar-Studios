"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "../Input";
import Button from "../Button";
import { useCursor } from "../global/Providers";

export default function Footer() {
  const { setCursorType, setCursorText } = useCursor();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const handleLinkEnter = (text = "") => {
    setCursorType("hover");
    if (text) setCursorText(text);
  };

  const handleLinkLeave = () => {
    setCursorType("default");
    setCursorText("");
  };

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Youtube", href: "https://youtube.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ];

  return (
    <footer className="bg-brushed-metal border-t border-white/5 relative z-10 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            onMouseEnter={() => handleLinkEnter("FIZZ")}
            onMouseLeave={handleLinkLeave}
            className="font-display text-2xl font-bold tracking-widest text-white select-none"
          >
            BLACK<span className="text-brand-red-bright">HAT</span>
          </Link>
          <p className="text-sm text-brand-silver/60 leading-relaxed font-light">
            Elite talent booking & artist management platform. Delivering carbonated, high-energy entertainment experiences globally.
          </p>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => handleLinkEnter(soc.label.toUpperCase())}
                onMouseLeave={handleLinkLeave}
                className="text-xs uppercase tracking-widest font-bold text-brand-silver/55 hover:text-brand-red-bright transition-colors duration-300"
              >
                {soc.label[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-xs uppercase tracking-widest font-bold text-white border-l-2 border-brand-red-bright pl-3">
            Company
          </h4>
          <div className="flex flex-col gap-2">
            {["About Us", "Case Studies", "Why Choose Us", "Pricing Model", "FAQ Hub"].map((lnk) => (
              <Link
                key={lnk}
                href="#"
                onMouseEnter={() => handleLinkEnter("VIEW")}
                onMouseLeave={handleLinkLeave}
                className="text-sm text-brand-silver/60 hover:text-white transition-colors duration-300 w-fit"
              >
                {lnk}
              </Link>
            ))}
          </div>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-xs uppercase tracking-widest font-bold text-white border-l-2 border-brand-gold pl-3">
            Elite Categories
          </h4>
          <div className="flex flex-col gap-2">
            {["Live Musicians", "Electronic DJs", "Aerial Acrobats", "Corporate Hosts", "Mentalists"].map((lnk) => (
              <Link
                key={lnk}
                href="#"
                onMouseEnter={() => handleLinkEnter("DISCOVER")}
                onMouseLeave={handleLinkLeave}
                className="text-sm text-brand-silver/60 hover:text-white transition-colors duration-300 w-fit"
              >
                {lnk}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-xs uppercase tracking-widest font-bold text-white border-l-2 border-brand-red-bright pl-3">
            Newsletter
          </h4>
          <p className="text-sm text-brand-silver/60 leading-relaxed font-light">
            Stay carbonated. Subscribe for updates on premium talents and exclusive event templates.
          </p>
          {subscribed ? (
            <div className="p-4 rounded-lg bg-brand-red/10 border border-brand-red/30 text-brand-red-bright text-xs font-semibold tracking-wider uppercase text-center animate-pulse">
              🎉 Subscribed Successfully!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                glowColor="red"
                required
              />
              <Button type="submit" variant="red" size="sm" className="w-full mt-1">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-silver/40">
        <p>© {new Date().getFullYear()} Black Hat Talent. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
