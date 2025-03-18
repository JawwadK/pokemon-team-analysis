// src/components/TypeBadge.tsx
import { PokemonType } from "@/types/pokemon";
import { TYPE_COLORS } from "@/utils/PokemonTheme";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: PokemonType;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export const TypeBadge = ({
  type,
  size = "md",
  className = "",
  onClick,
}: TypeBadgeProps) => {
  const typeData = TYPE_COLORS[type];

  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs rounded",
    md: "px-2 py-1 text-sm rounded-md",
    lg: "px-3 py-1.5 text-base rounded-lg",
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center font-medium capitalize type-badge",
        typeData.bg,
        typeData.text,
        sizeClasses[size],
        "transition-all duration-300",
        onClick ? "cursor-pointer hover:scale-110 active:scale-95" : "",
        "shadow-sm dark:shadow-gray-900/20",
        className
      )}
    >
      {type}
    </span>
  );
};
