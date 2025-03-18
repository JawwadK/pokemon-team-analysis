// src/components/AddToTeamButton.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pokemon } from "@/types/pokemon";
import { Pokeball } from "@/components/Pokeball";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToTeamButtonProps {
  pokemon: Pokemon;
  onAdd: (pokemon: Pokemon) => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
}

export const AddToTeamButton = ({
  pokemon,
  onAdd,
  className = "",
  variant = "primary",
}: AddToTeamButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const buttonVariants = {
    primary:
      "bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-800",
    outline:
      "border border-green-500 bg-white hover:bg-green-50 text-green-600 dark:bg-gray-800 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/30",
    ghost:
      "bg-transparent hover:bg-green-50 text-green-600 dark:text-green-400 dark:hover:bg-green-900/30",
  };

  const handleClick = () => {
    setIsAnimating(true);

    // Wait for animation to complete before actually adding
    setTimeout(() => {
      onAdd(pokemon);
      setIsAnimating(false);
    }, 800);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isAnimating}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        buttonVariants[variant],
        isHovering && !isAnimating ? "scale-105" : "",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isAnimating ? (
        <div className="flex items-center">
          <span className="opacity-0">Add to Team</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce-and-fade">
              <Pokeball spinning variant="normal" className="mx-auto" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          {isHovering && (
            <Sparkles className="mr-1 h-3 w-3 text-yellow-300 animate-pulse" />
          )}
          Add to Team
          <ChevronRight
            className={cn(
              "ml-1 h-4 w-4 transition-transform duration-300",
              isHovering ? "translate-x-1" : ""
            )}
          />
        </div>
      )}
    </Button>
  );
};
