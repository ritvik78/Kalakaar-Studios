"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { navLinks, NavLink } from "./Navigation";
import { cn } from "@/utils/cn";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const containerVariants = {
    closed: {
      x: "100%",
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
        ease: [0.7, 0, 0.84, 0],
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: [0.16, 1, 0.3, 1],
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 30 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-[80]"
          />

          {/* Sliding Panel */}
          <motion.div
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[380px] bg-carbon-fiber bg-brand-black border-l border-white/10 z-[90] p-8 flex flex-col justify-between"
          >
            {/* Header row */}
            <div className="flex justify-between items-center">
              <span className="font-display text-lg tracking-widest text-white font-bold">
                BLACK<span className="text-brand-red">HAT</span>
              </span>
              <button
                onClick={onClose}
                className="p-2 border border-white/10 rounded-full hover:border-brand-red hover:bg-brand-red/10 text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-6 my-auto">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "font-display text-2xl uppercase tracking-widest font-bold block transition-all duration-300 py-2",
                      link.isPremium
                        ? "text-brand-gold hover:text-brand-gold-glow drop-shadow-gold"
                        : "text-white hover:text-brand-red"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer metadata */}
            <motion.div variants={itemVariants} className="border-t border-white/10 pt-6 flex flex-col gap-3">
              <p className="text-xs font-semibold text-brand-silver/50 tracking-wider">
                © {new Date().getFullYear()} BLACK HAT TALENT
              </p>
              <p className="text-[10px] text-brand-silver/30 uppercase tracking-widest">
                Elite Artist Management & Bookings
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
