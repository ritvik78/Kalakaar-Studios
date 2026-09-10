"use client";

import React, { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wobbleSpeed: number;
  wobbleRange: number;
  wobbleOffset: number;
}

export default function BubbleParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let bubbles: Bubble[] = [];
    const maxBubbles = 60;

    // Handle canvas resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Helper to generate a single bubble
    const createBubble = (startY = false): Bubble => {
      const radius = Math.random() * 5 + 2; // size 2px to 7px
      return {
        x: Math.random() * canvas.width,
        y: startY ? Math.random() * canvas.height : canvas.height + 20,
        radius,
        speedY: -(Math.random() * 1.5 + 0.5), // upwards
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.4 + 0.1, // transparent
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleRange: Math.random() * 15 + 5,
        wobbleOffset: Math.random() * Math.PI * 2,
      };
    };

    // Initialize bubbles across screen
    for (let i = 0; i < maxBubbles; i++) {
      bubbles.push(createBubble(true));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble, idx) => {
        // Move upward
        bubble.y += bubble.speedY;

        // Apply wobble/drift (sine wave)
        bubble.wobbleOffset += bubble.wobbleSpeed;
        const drift = Math.sin(bubble.wobbleOffset) * bubble.speedX;
        bubble.x += drift;

        // Mouse avoidance physics
        if (mouseRef.current.active) {
          const dx = bubble.x - mouseRef.current.x;
          const dy = bubble.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const force = (120 - distance) / 120; // 0 to 1
            const angle = Math.atan2(dy, dx);
            // Push away
            bubble.x += Math.cos(angle) * force * 5;
            bubble.y += Math.sin(angle) * force * 5;

            // Make it slightly more visible on interaction
            bubble.opacity = Math.min(bubble.opacity + 0.05, 0.7);
          }
        }

        // Draw bubble (circle outline for bubbly fizzy look)
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Subtle bubble highlight/sheen dot inside
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 1.5})`;
        ctx.fill();

        // Respawn if bubble goes off top or sides
        if (
          bubble.y < -20 ||
          bubble.x < -20 ||
          bubble.x > canvas.width + 20
        ) {
          bubbles[idx] = createBubble(false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
    />
  );
}
