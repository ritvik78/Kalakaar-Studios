"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Zap, Layers, RefreshCw, Eye } from "lucide-react";
import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";
import Card from "@/components/Card";
import Input, { Textarea } from "@/components/Input";
import SheenOverlay from "@/components/SheenOverlay";
import { useCursor } from "@/components/global/Providers";

export default function Home() {
  const { setCursorType, setCursorText } = useCursor();
  const [fizzActive, setFizzActive] = useState(true);

  return (
    <div className="w-full relative z-10 flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 md:px-12 max-w-5xl mx-auto w-full pt-12">
        {/* Glow backdrop bubble */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none z-0" />
        
        {/* Elite Tag */}
        <div 
          onMouseEnter={() => { setCursorType("gold"); setCursorText("ELITE"); }}
          onMouseLeave={() => { setCursorType("default"); setCursorText(""); }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-md mb-6 relative group overflow-hidden z-10 cursor-pointer shadow-gold-glow"
        >
          <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-gold-pale">
            Elite Artist Booking Network
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent -translate-x-full rotate-[25deg] group-hover:animate-sheen" />
        </div>

        {/* Metallic Headline */}
        <h1 className="font-display text-4xl md:text-7xl font-bold uppercase tracking-wider leading-[1.1] mb-6 text-shadow-red z-10 relative">
          Unleash <span className="text-red-gradient font-extrabold">Disruptive</span> <br />
          Entertainment
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-xl text-brand-silver/70 font-light max-w-2xl mx-auto mb-10 leading-relaxed z-10">
          Step into a premium, carbonated world of elite musicians, DJs, acts, and acrobatics. Custom-fizzed event templates engineered for maximum crowd impact.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center z-10">
          <Button variant="red" size="lg" glow={true}>
            Explore Talents
          </Button>
          <Button variant="gold" size="lg" glow={true}>
            Book Booking Wizard
          </Button>
        </div>
      </section>

      {/* Lab Showcase - Core Foundation & Design System */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col gap-12">
        <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
          <h2 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-wide text-metallic">
            Foundation Showcase
          </h2>
          <p className="text-sm text-brand-silver/50 max-w-xl font-light">
            Interactive playground displaying the custom design tokens, buttons with fizz engines, glasscards with sliding condensation droplets, and texture cards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Glassmorphism & Condensation */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xs uppercase tracking-widest font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red-bright animate-ping" />
              Glassmorphism & Drips
            </h3>

            {/* Red Glow GlassCard */}
            <GlassCard 
              glowColor="red" 
              cursorText="SWEAT" 
              className="p-6 h-[220px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-brand-red-bright">
                    Crimson Core
                  </span>
                  <Zap className="w-5 h-5 text-brand-red" />
                </div>
                <h4 className="text-lg font-bold font-display uppercase tracking-wide text-white">
                  Condensation Drip Card
                </h4>
                <p className="text-xs text-brand-silver/60 mt-2 font-light leading-relaxed">
                  Notice the tiny bead droplets sliding down. Simulates a cold, carbonated beverage can, providing depth and premium realism.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-red-bright/70 self-end">
                Hover to sweat
              </span>
            </GlassCard>

            {/* Gold Glow GlassCard */}
            <GlassCard 
              glowColor="gold" 
              cursorText="PREMIUM" 
              className="p-6 h-[220px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-brand-gold">
                    Gold Elite
                  </span>
                  <Layers className="w-5 h-5 text-brand-gold" />
                </div>
                <h4 className="text-lg font-bold font-display uppercase tracking-wide text-white">
                  Gold Glossy Frame
                </h4>
                <p className="text-xs text-brand-silver/60 mt-2 font-light leading-relaxed">
                  A high-end variant styled for elite artists. Features micro-border gold glows and cursor transformations.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold/70 self-end">
                Hover to shine
              </span>
            </GlassCard>
          </div>

          {/* Column 2: Brushed Metal & Carbon Textures */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xs uppercase tracking-widest font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              Heavy Textures
            </h3>

            {/* Brushed Metal Card */}
            <Card 
              variant="metal" 
              glow="red" 
              cursorText="METAL"
              className="h-[220px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-brand-silver">
                    Brushed Chrome
                  </span>
                  <Calendar className="w-5 h-5 text-brand-silver" />
                </div>
                <h4 className="text-lg font-bold font-display uppercase tracking-wide text-white">
                  Industrial Metal
                </h4>
                <p className="text-xs text-brand-silver/60 mt-2 font-light leading-relaxed">
                  Styled after real brushed metal panels. Excellent for marquees, partner sections, and dark industrial dividers.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-silver/50 self-end">
                Metallic Sweep
              </span>
            </Card>

            {/* Carbon Fiber Card */}
            <Card 
              variant="carbon" 
              glow="gold" 
              cursorText="FIBER"
              className="h-[220px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-brand-gold">
                    Carbon Grid
                  </span>
                  <RefreshCw className="w-5 h-5 text-brand-gold" />
                </div>
                <h4 className="text-lg font-bold font-display uppercase tracking-wide text-white">
                  Carbon Fiber weave
                </h4>
                <p className="text-xs text-brand-silver/60 mt-2 font-light leading-relaxed">
                  High-performance dark carbon fiber grid styling. Engineered for premium, sports, and energetic contrast elements.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold/70 self-end">
                Gold highlight
              </span>
            </Card>
          </div>

          {/* Column 3: Click-to-Fizz Engine */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xs uppercase tracking-widest font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-silver-bright" />
              Interactive Lab
            </h3>

            <div className="glass-panel rounded-xl p-6 flex flex-col justify-between h-[465px] border border-white/10 relative overflow-hidden">
              <SheenOverlay trigger="always" />
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-brand-silver/60 block mb-2">
                    Action Playground
                  </span>
                  <h4 className="text-lg font-bold font-display uppercase tracking-wide text-white">
                    Test the Fizz Engine
                  </h4>
                  <p className="text-xs text-brand-silver/60 mt-2 font-light leading-relaxed">
                    Click the buttons below. The engine calculates your mouse click coordinate and spits out floating bubbles that float and pop dynamically.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Button variant="red" size="md" canPop={true}>
                    Click for Fizz Pop
                  </Button>
                  <Button variant="gold" size="md" canPop={true}>
                    Elite Gold Pop
                  </Button>
                  <Button variant="glass" size="md" canPop={true}>
                    Glass Pop
                  </Button>
                </div>
              </div>

              {/* Cursor test zone */}
              <div 
                onMouseEnter={() => { setCursorType("text"); setCursorText("PLAY"); }}
                onMouseLeave={() => { setCursorType("default"); setCursorText(""); }}
                className="mt-6 p-4 border border-dashed border-white/15 rounded-lg text-center cursor-pointer bg-white/5 hover:bg-white/10 hover:border-brand-gold transition-all duration-300"
              >
                <Eye className="w-5 h-5 text-brand-silver mx-auto mb-2" />
                <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-brand-silver/85">
                  Hover to test Custom Text Cursor
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sample Newsletter Submittals */}
        <div className="glass-panel border border-white/10 p-8 rounded-2xl mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-display font-bold uppercase tracking-wider text-white">
                Contact Booking Engine
              </h3>
              <p className="text-xs text-brand-silver/60 mt-2 font-light leading-relaxed max-w-md">
                Try out our responsive premium forms. Focus lines slide dynamically from the center when clicking inside the fields.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Input type="text" placeholder="Your Name" glowColor="gold" />
              <Input type="email" placeholder="Your Email" glowColor="red" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
