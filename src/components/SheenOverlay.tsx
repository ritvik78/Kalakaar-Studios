"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface SheenOverlayProps {
  className?: string;
  trigger?: "hover" | "always";
}

export default function SheenOverlay({ className, trigger = "hover" }: SheenOverlayProps) {
  const isAlways = trigger === "always";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden rounded-[inherit]">
      <motion.div
        className={cn(
          "absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12",
          className
        )}
        initial={{ x: "-100%" }}
        animate={
          isAlways
            ? {
                x: ["-100%", "100%"],
              }
            : {}
        }
        whileHover={
          !isAlways
            ? {
                x: ["-100%", "100%"],
              }
            : {}
        }
        transition={
          isAlways
            ? {
                duration: 3.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2,
              }
            : {
                duration: 1.2,
                ease: "easeOut",
              }
        }
      />
    </div>
  );
}
