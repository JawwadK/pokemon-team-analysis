// src/components/AddToTeamButton.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pokemon } from "@/types/pokemon";
import { Pokeball } from "@/components/Pokeball";
import { ChevronRight } from "lucide-react";

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

  const buttonVariants = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    outline:
      "border border-green-500 bg-white hover:bg-green-50 text-green-600",
    ghost: "bg-transparent hover:bg-green-50 text-green-600",
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
      className={`relative overflow-hidden ${buttonVariants[variant]} ${className}`}
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
          Add to Team <ChevronRight className="ml-1 h-4 w-4" />
        </div>
      )}
    </Button>
  );
};
