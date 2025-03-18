// src/components/Pokeball.tsx
import React from "react";

interface PokeballProps {
  variant?: "normal" | "great" | "ultra" | "master" | "premier";
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  spinning?: boolean;
  onClick?: () => void;
}

export const Pokeball: React.FC<PokeballProps> = ({
  variant = "normal",
  className = "",
  size = "md",
  spinning = false,
  onClick,
}) => {
  // Color configurations for different Pokeball types
  const colors = {
    normal: {
      top: "fill-red-500",
      bottom: "fill-white",
      button: "fill-white stroke-gray-400",
      outline: "stroke-gray-800",
    },
    great: {
      top: "fill-blue-500",
      bottom: "fill-white",
      button: "fill-white stroke-gray-400",
      outline: "stroke-gray-800",
    },
    ultra: {
      top: "fill-yellow-500",
      bottom: "fill-white",
      button: "fill-white stroke-gray-400",
      outline: "stroke-gray-800",
    },
    master: {
      top: "fill-purple-600",
      bottom: "fill-white",
      button: "fill-white stroke-gray-400",
      outline: "stroke-gray-800",
    },
    premier: {
      top: "fill-white",
      bottom: "fill-white",
      button: "fill-red-500 stroke-red-700",
      outline: "stroke-gray-800",
    },
  };

  // Size configurations
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  // Animation class for spinning
  const spinClass = spinning ? "animate-spin" : "";

  return (
    <svg
      className={`${sizes[size]} ${spinClass} ${className} ${
        onClick
          ? "cursor-pointer transform hover:scale-110 transition-transform"
          : ""
      }`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      {/* Outline */}
      <circle
        cx="50"
        cy="50"
        r="48"
        strokeWidth="4"
        fill="none"
        className={colors[variant].outline}
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
      <line x1="2" y1="50" x2="98" y2="50" stroke="black" strokeWidth="4" />

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
    </svg>
  );
};
