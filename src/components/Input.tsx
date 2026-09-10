"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  glowColor?: "red" | "gold";
  error?: string;
}

export default function Input({
  label,
  glowColor = "red",
  error,
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const glowStyles = {
    red: "focus:border-brand-red focus:shadow-red-glow",
    gold: "focus:border-brand-gold focus:shadow-gold-glow",
  };

  const lineColors = {
    red: "bg-brand-red-bright",
    gold: "bg-brand-gold",
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-xs font-display font-semibold uppercase tracking-widest text-brand-silver/80">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full px-4 py-3 bg-brand-black/80 border border-white/10 rounded-lg text-white font-sans placeholder-white/30 outline-none transition-all duration-300 backdrop-blur-md",
            glowStyles[glowColor],
            error ? "border-brand-red-bright" : "",
            className
          )}
          {...props}
        />
        {/* Animated accent focus line under input */}
        <span
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 transition-all duration-500",
            lineColors[glowColor],
            isFocused ? "w-full" : "w-0"
          )}
        />
      </div>
      {error && (
        <span className="text-xs font-semibold text-brand-red-bright tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}

// Add a textarea variant too
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  glowColor?: "red" | "gold";
  error?: string;
}

export function Textarea({
  label,
  glowColor = "red",
  error,
  className,
  ...props
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const glowStyles = {
    red: "focus:border-brand-red focus:shadow-red-glow",
    gold: "focus:border-brand-gold focus:shadow-gold-glow",
  };

  const lineColors = {
    red: "bg-brand-red-bright",
    gold: "bg-brand-gold",
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-xs font-display font-semibold uppercase tracking-widest text-brand-silver/80">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full min-h-[120px] px-4 py-3 bg-brand-black/80 border border-white/10 rounded-lg text-white font-sans placeholder-white/30 outline-none transition-all duration-300 backdrop-blur-md resize-y",
            glowStyles[glowColor],
            error ? "border-brand-red-bright" : "",
            className
          )}
          {...props}
        />
        <span
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 transition-all duration-500",
            lineColors[glowColor],
            isFocused ? "w-full" : "w-0"
          )}
        />
      </div>
      {error && (
        <span className="text-xs font-semibold text-brand-red-bright tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}
