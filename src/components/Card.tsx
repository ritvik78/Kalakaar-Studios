"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useCursor } from "./global/Providers";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "metal" | "carbon" | "glass" | "simple";
  glow?: "red" | "gold" | "none";
  hoverEffect?: "scale" | "lift" | "glow" | "none";
  cursorText?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  variant = "glass",
  glow = "none",
  hoverEffect = "lift",
  cursorText = "",
  onClick,
}: CardProps) {
  const { setCursorType, setCursorText } = useCursor();

  const handleMouseEnter = () => {
    if (glow === "gold") {
      setCursorType("gold");
    } else if (glow === "red") {
      setCursorType("red");
    } else {
      setCursorType("hover");
    }
    if (cursorText) {
      setCursorText(cursorText);
    }
  };

  const handleMouseLeave = () => {
    setCursorType("default");
    setCursorText("");
  };

  const bgStyles = {
    metal: "bg-brushed-metal border border-brand-silver/10 text-brand-silver-bright",
    carbon: "bg-carbon-fiber border border-brand-lightGray text-white",
    glass: "glass-panel text-white",
    simple: "bg-brand-gray border border-brand-lightGray text-white",
  };

  const glowStyles = {
    none: "",
    red: "hover:shadow-red-glow hover:border-brand-red/40",
    gold: "hover:shadow-gold-glow hover:border-brand-gold/40",
  };

  const hoverAnimations = {
    none: {},
    scale: { scale: 1.03 },
    lift: { y: -8, transition: { duration: 0.3, ease: "easeOut" } },
    glow: { boxShadow: glow === "gold" ? "0 0 25px rgba(212,175,55,0.3)" : "0 0 25px rgba(229,9,20,0.3)" }
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={hoverAnimations[hoverEffect]}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative rounded-xl overflow-hidden p-6 transition-all duration-300",
        bgStyles[variant],
        glowStyles[glow],
        onClick ? "cursor-pointer" : "",
        className
      )}
    >
      {/* Light sheen overlay */}
      {variant !== "simple" && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full rotate-[25deg] hover:animate-sheen pointer-events-none" />
      )}
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
}
