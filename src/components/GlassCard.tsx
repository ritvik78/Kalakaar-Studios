"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useCursor } from "./global/Providers";

interface Drip {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "red" | "gold" | "default";
  hoverZoom?: boolean;
  condensation?: boolean;
  cursorText?: string;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  glowColor = "default",
  hoverZoom = true,
  condensation = true,
  cursorText = "",
  onClick,
}: GlassCardProps) {
  const { setCursorType, setCursorText } = useCursor();
  const [drips, setDrips] = useState<Drip[]>([]);

  // Generate random condensation drops
  useEffect(() => {
    if (!condensation) return;

    const generateDrips = () => {
      const newDrips = Array.from({ length: 4 }).map((_, i) => ({
        id: Date.now() + i + Math.random(),
        x: Math.random() * 90 + 5, // percentage across width
        delay: Math.random() * 8, // seconds delay
        duration: Math.random() * 4 + 3, // seconds speed
      }));
      setDrips(newDrips);
    };

    generateDrips();
    const interval = setInterval(generateDrips, 12000); // re-trigger drips regularly

    return () => clearInterval(interval);
  }, [condensation]);

  const handleMouseEnter = () => {
    if (glowColor === "gold") {
      setCursorType("gold");
      if (cursorText) setCursorText(cursorText);
    } else if (glowColor === "red") {
      setCursorType("red");
      if (cursorText) setCursorText(cursorText);
    } else {
      setCursorType("hover");
      if (cursorText) setCursorText(cursorText);
    }
  };

  const handleMouseLeave = () => {
    setCursorType("default");
    setCursorText("");
  };

  const borderStyles = {
    default: "border-white/10 hover:border-white/20 hover:shadow-glass",
    red: "border-brand-red/20 hover:border-brand-red/50 hover:shadow-red-glow",
    gold: "border-brand-gold/20 hover:border-brand-gold/50 hover:shadow-gold-glow",
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={hoverZoom ? { y: -6, scale: 1.01 } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-2xl glass-panel overflow-hidden transition-all duration-500",
        borderStyles[glowColor],
        onClick ? "cursor-pointer" : "",
        className
      )}
    >
      {/* Condensation Drips */}
      {condensation && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
          {drips.map((drip) => (
            <motion.div
              key={drip.id}
              className="absolute w-[1.5px] rounded-full bg-gradient-to-b from-white/30 to-transparent"
              style={{
                left: `${drip.x}%`,
                top: "-10px",
                height: "20px",
              }}
              initial={{ y: 0, opacity: 0, scaleY: 1 }}
              animate={{
                y: [0, 50, 150, 300],
                opacity: [0, 1, 0.8, 0],
                scaleY: [1, 1.5, 1.2, 0],
              }}
              transition={{
                delay: drip.delay,
                duration: drip.duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 2,
              }}
            />
          ))}
          {/* Static tiny mist beads */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-30" />
        </div>
      )}

      {/* Light Sheen Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full rotate-[25deg] group-hover:animate-sheen pointer-events-none z-10" />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
