"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface GlowingBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderGlowColor?: string;
}

export const GlowingBorderCard: React.FC<GlowingBorderCardProps> = ({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.15)",
  borderGlowColor = "rgba(59, 130, 246, 0.5)",
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-2xl p-[1px] overflow-hidden transition-all duration-300 group hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:z-20",
        className
      )}
      {...props}
    >
      {/* Outer Border Glowing Highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, ${borderGlowColor}, transparent 70%)`,
        }}
      />

      {/* Fallback subtle border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08] pointer-events-none" />

      {/* Inner Card Background with subtle spotlight */}
      <div className="relative h-full w-full rounded-[15px] bg-[#0c1427]/90 backdrop-blur-xl p-6 sm:p-8 overflow-hidden z-10 transition-colors duration-300 group-hover:bg-[#0e1830]/95">
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.8 : 0,
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 60%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
