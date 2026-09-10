"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "./Providers";

export default function Cursor() {
  const { cursorType, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for lag-behind ring effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  // Determine size and color states based on cursorType
  let cursorSize = 10;
  let ringSize = 40;
  let ringColor = "border-brand-red-glow";
  let ringBg = "bg-transparent";
  let dotBg = "bg-brand-red";

  if (cursorType === "hover") {
    cursorSize = 6;
    ringSize = 60;
    ringColor = "border-brand-red-glow";
    ringBg = "bg-brand-red/10";
  } else if (cursorType === "gold") {
    cursorSize = 6;
    ringSize = 70;
    ringColor = "border-brand-gold";
    ringBg = "bg-brand-gold/10";
    dotBg = "bg-brand-gold";
  } else if (cursorType === "red") {
    cursorSize = 6;
    ringSize = 70;
    ringColor = "border-brand-red";
    ringBg = "bg-brand-red/10";
    dotBg = "bg-brand-red";
  } else if (cursorType === "text") {
    cursorSize = 0;
    ringSize = 90;
    ringColor = "border-brand-gold";
    ringBg = "bg-brand-gold/20";
    dotBg = "bg-transparent";
  } else if (cursorType === "click") {
    cursorSize = 15;
    ringSize = 25;
    ringColor = "border-brand-red-bright";
    ringBg = "bg-brand-red-bright/30";
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Outer Ring */}
      <motion.div
        className={`absolute rounded-full border-2 ${ringColor} ${ringBg} flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden`}
        style={{
          left: cursorX,
          top: cursorY,
          width: ringSize,
          height: ringSize,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorType === "text" && cursorText && (
          <span className="text-[10px] font-display font-bold tracking-widest text-brand-gold text-center px-1">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none ${dotBg}`}
        style={{
          left: mouseX,
          top: mouseY,
          width: cursorSize,
          height: cursorSize,
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
      />
    </div>
  );
}
