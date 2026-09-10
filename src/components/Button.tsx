"use client";

import React, { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useCursor } from "./global/Providers";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "metal" | "gold" | "red" | "glass";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  canPop?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "red",
  size = "md",
  glow = true,
  canPop = true,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}: ButtonProps) {
  const { setCursorType, setCursorText } = useCursor();
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    if (variant === "gold") {
      setCursorType("gold");
      setCursorText("ELITE");
    } else if (variant === "red") {
      setCursorType("red");
      setCursorText("POW");
    } else {
      setCursorType("hover");
    }
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>) => {
    setCursorType("default");
    setCursorText("");
    onMouseLeave?.(e);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (canPop) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Spawn 8-12 rising fizz bubbles
      const newBubbles = Array.from({ length: 10 }).map((_, i) => ({
        id: Date.now() + i,
        x: clickX + (Math.random() - 0.5) * 40,
        y: clickY + (Math.random() - 0.5) * 20,
        size: Math.random() * 8 + 4,
      }));

      setBubbles((prev) => [...prev, ...newBubbles]);

      // Cleanup bubbles after animation
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => !newBubbles.includes(b)));
      }, 800);
    }

    setCursorType("click");
    setTimeout(() => {
      setCursorType(variant === "gold" ? "gold" : variant === "red" ? "red" : "hover");
    }, 150);

    onClick?.(e);
  };

  const variantStyles = {
    metal: "bg-brushed-metal border border-brand-silver/20 text-brand-silver-bright hover:border-brand-silver/50",
    gold: "bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-pale border border-brand-gold/40 text-black font-semibold hover:shadow-gold-glow hover:border-brand-gold-glow",
    red: "bg-gradient-to-r from-brand-red-dark via-brand-red to-brand-red-bright border border-brand-red/40 text-white font-semibold hover:shadow-red-glow hover:border-brand-red-glow",
    glass: "glass-panel border border-white/10 text-white hover:bg-white/10 hover:border-white/20",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-md tracking-wider font-medium",
    md: "px-6 py-3 text-base rounded-lg tracking-widest font-semibold uppercase",
    lg: "px-8 py-4 text-lg rounded-xl tracking-widest font-bold uppercase",
  };

  const glowStyles = glow && variant === "red"
    ? "shadow-[0_0_15px_rgba(229,9,20,0.3)] hover:shadow-[0_0_25px_rgba(229,9,20,0.6)]"
    : glow && variant === "gold"
    ? "shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
    : "";

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden font-display transition-all duration-300 select-none flex items-center justify-center gap-2",
        variantStyles[variant],
        sizeStyles[size],
        glowStyles,
        className
      )}
      {...props}
    >
      {/* Light Reflection Sheen Overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full rotate-[25deg] animate-sheen pointer-events-none" />

      {/* Button Content */}
      <span className="relative z-10">{children}</span>

      {/* Fizz/Bubble Pop Particles */}
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.span
            key={bubble.id}
            initial={{ opacity: 0.8, scale: 0.5, y: bubble.y, x: bubble.x }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: bubble.y - 60 - Math.random() * 40,
              x: bubble.x + (Math.random() - 0.5) * 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
              "absolute rounded-full border pointer-events-none z-20",
              variant === "gold"
                ? "border-brand-gold/60 bg-brand-gold-glow/20"
                : "border-brand-red/60 bg-brand-red-glow/20"
            )}
            style={{
              width: bubble.size,
              height: bubble.size,
            }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}
