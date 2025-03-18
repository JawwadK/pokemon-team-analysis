// src/components/TypeBadge.tsx
import { PokemonType } from "@/types/pokemon";
import { TYPE_COLORS } from "@/utils/PokemonTheme";

interface TypeBadgeProps {
  type: PokemonType;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const TypeBadge = ({
  type,
  size = "md",
  className = "",
}: TypeBadgeProps) => {
  const typeData = TYPE_COLORS[type];

  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs rounded",
    md: "px-2 py-1 text-sm rounded-md",
    lg: "px-3 py-1.5 text-base rounded-lg",
  };

  return (
    <span
      className={`inline-flex items-center ${typeData.bg} ${typeData.text} font-medium ${sizeClasses[size]} ${className} capitalize transition-transform hover:scale-105`}
    >
      {type}
    </span>
  );
};
