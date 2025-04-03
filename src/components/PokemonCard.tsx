// src/components/PokemonCard.tsx
import { useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import { TypeBadge } from "./TypeBadge";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
  animationDelay?: number;
}

export const PokemonCard = ({
  pokemon,
  onClick,
  animationDelay = 0,
}: PokemonCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);

    // Call the onClick handler after a small delay for animation
    if (onClick) {
      setTimeout(() => {
        onClick(pokemon);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Get best sprite for display
  const getBestSprite = () => {
    // Define a type for the extended sprites structure
    type ExtendedSprites = Pokemon["sprites"] & {
      other?: {
        "official-artwork"?: {
          front_default?: string;
        };
        home?: {
          front_default?: string;
        };
      };
    };

    // Cast to the extended type
    const sprites = pokemon.sprites as ExtendedSprites;

    // Now we can safely access the properties
    const officialArtwork = sprites?.other?.["official-artwork"]?.front_default;
    const homeArtwork = sprites?.other?.home?.front_default;

    return officialArtwork || homeArtwork || pokemon.sprites.front_default;
  };

  const sprite = getBestSprite();

  return (
    <Card
      className={cn(
        "cursor-pointer overflow-hidden transition-all duration-300 dark-mode-transition animate-pop-in",
        "hover:shadow-lg border-2 border-transparent",
        isHovering ? "border-blue-400 scale-105" : "",
        isAnimating ? "animate-jello" : "",
        "backdrop-blur-sm bg-white/90 dark:bg-gray-800/90"
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        animationDelay: `${animationDelay}ms`,
      }}
    >
      <CardContent className="p-4 relative">
        <div
          className={cn(
            "flex flex-col items-center",
            isHovering ? "transform transition-transform duration-300" : ""
          )}
        >
          <div
            className={cn(
              "w-24 h-24 relative transition-transform duration-300",
              isHovering ? "scale-110" : ""
            )}
          >
            <img
              src={sprite}
              alt={pokemon.name}
              className={cn(
                "w-full h-full object-contain transition-all duration-300",
                isHovering ? "animate-float" : ""
              )}
            />
          </div>

          <h3
            className={cn(
              "text-lg font-medium capitalize mt-2",
              "dark:text-white"
            )}
          >
            {pokemon.name}
          </h3>

          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <TypeBadge
                key={type.type.name}
                type={type.type.name}
                className={cn(
                  isHovering ? "animate-badge-pop" : "",
                  "transition-all duration-300"
                )}
              />
            ))}
          </div>

          <div
            className={cn(
              "absolute top-1 right-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-0.5",
              "dark:text-gray-300"
            )}
          >
            #{pokemon.id}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
