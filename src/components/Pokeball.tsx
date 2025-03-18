// src/components/Pokeball.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface PokeballProps {
  variant?: "normal" | "great" | "ultra" | "master" | "premier";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  spinning?: boolean;
  onClick?: () => void;
  animated?: boolean;
  float?: boolean;
}

export const Pokeball: React.FC<PokeballProps> = ({
  variant = "normal",
  className = "",
  size = "md",
  spinning = false,
  onClick,
  animated = false,
  float = false,
}) => {
  // Color configurations for different Pokeball types
  const colors = {
    normal: {
      top: "fill-red-500",
      bottom: "fill-white",
      button: "fill-white stroke-gray-400",
      outline: "stroke-gray-800 dark:stroke-gray-200",
    },
    great: {
      top: "fill-blue-500",
      bottom: "fill-white",
      button: "fill-white stroke-gray-400",
      outline: "stroke-gray-800 dark:stroke-gray-200",
    },
    ultra: {
      top: "fill-yellow-500",
      bottom: "fill-white",
      button: "fill-white stroke-gray-400",
      outline: "stroke-gray-800 dark:stroke-gray-200",
    },
    master: {
      top: "fill-purple-600",
      bottom: "fill-white",
      button: "fill-white stroke-gray-400",
      outline: "stroke-gray-800 dark:stroke-gray-200",
    },
    premier: {
      top: "fill-white",
      bottom: "fill-white",
      button: "fill-red-500 stroke-red-700",
      outline: "stroke-gray-800 dark:stroke-gray-200",
    },
  };

  // Size configurations
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  // Animation classes
  const spinClass = spinning ? "animate-spin" : "";
  const animationClass = animated ? "animate-bounce-custom" : "";
  const floatClass = float ? "animate-float" : "";

  return (
    <svg
      className={cn(
        sizes[size],
        spinClass,
        animationClass,
        floatClass,
        onClick
          ? "cursor-pointer transform hover:scale-110 transition-transform"
          : "",
        "shadow-sm",
        className
      )}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      {/* Shadow effect */}
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
      </filter>

      {/* Outer glow for animated or floating pokeballs */}
      {(animated || float) && (
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#4d9fff" floodOpacity="0.3" result="glow" />
          <feComposite in="glow" in2="blur" operator="in" result="softGlow" />
          <feComposite in="SourceGraphic" in2="softGlow" operator="over" />
        </filter>
      )}

      {/* Outline with shadow */}
      <circle
        cx="50"
        cy="50"
        r="48"
        strokeWidth="4"
        fill="none"
        className={colors[variant].outline}
        filter={animated || float ? "url(#glow)" : "url(#shadow)"}
      />

      {/* Top half */}
      <path
        d="M2,50 A48,48 0 0,1 98,50 H2"
        className={colors[variant].top}
        strokeWidth="0"
      />

      {/* Bottom half */}
      <path
        d="M2,50 A48,48 0 0,0 98,50 H2"
        className={colors[variant].bottom}
        strokeWidth="0"
      />

      {/* Middle line */}
      <line
        x1="2"
        y1="50"
        x2="98"
        y2="50"
        stroke="black"
        strokeWidth="4"
        className="dark:stroke-gray-700"
      />

      {/* Center button */}
      <circle
        cx="50"
        cy="50"
        r="12"
        className={colors[variant].button}
        strokeWidth="4"
      />

      {/* Center button inner */}
      <circle
        cx="50"
        cy="50"
        r="6"
        className={`${colors[variant].button} ${
          variant === "premier" ? "fill-red-500" : "fill-white"
        }`}
      />

      {/* Shine effect */}
      <path
        d="M70,30 A25,25 0 0,0 60,20 25,25 0 0,0 70,30 Z"
        fill="white"
        fillOpacity="0.3"
        transform="rotate(15, 50, 50)"
      />
    </svg>
  );
};
