// src/components/TeamSlots.tsx
import { useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, X, Sparkles } from "lucide-react";
import { PokemonSelectDialog } from "./PokemonSelectDialog";
import { TypeBadge } from "./TypeBadge";
import { cn } from "@/lib/utils";

interface TeamSlotsProps {
  team: (Pokemon | null)[];
  availablePokemon: Pokemon[];
  onAddPokemon: (pokemon: Pokemon, slot: number) => void;
  onRemovePokemon: (slot: number) => void;
}

export const TeamSlots = ({
  team,
  availablePokemon,
  onAddPokemon,
  onRemovePokemon,
}: TeamSlotsProps) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [animatingSlot, setAnimatingSlot] = useState<number | null>(null);

  const handleSlotClick = (index: number) => {
    setSelectedSlot(index);
    setDialogOpen(true);
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    if (selectedSlot !== null) {
      setAnimatingSlot(selectedSlot);

      // Reset animation state after animation completes
      setTimeout(() => {
        setAnimatingSlot(null);
      }, 1000);

      onAddPokemon(pokemon, selectedSlot);
      setDialogOpen(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedSlot(null);
    }
  };

  // Get best sprite for display
const getBestSprite = (pokemon: Pokemon) => {
  // Using a more specific type assertion instead of 'any'
  interface ExtendedSprites {
    front_default: string;
    back_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
      home?: {
        front_default: string;
      };
    };
  }

  const sprites = pokemon.sprites as ExtendedSprites;
  const officialArtwork = sprites?.other?.["official-artwork"]?.front_default;
  const homeArtwork = sprites?.other?.home?.front_default;
  return officialArtwork || homeArtwork || pokemon.sprites.front_default;
};

  return (
    <>
      <Card className="animate-pop-in overflow-hidden shadow-md dark:bg-gray-800 dark-mode-transition">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center dark:text-white">
            Your Team
            {team.some((slot) => slot !== null) && (
              <Sparkles className="ml-2 h-5 w-5 text-yellow-400 animate-pulse" />
            )}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger-children">
            {Array.from({ length: 6 }).map((_, index) => {
              const pokemon = team[index];
              const isAnimating = animatingSlot === index;

              return (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg p-2 flex flex-col items-center justify-center h-40 relative transition-all",
                    pokemon
                      ? "bg-slate-50 dark:bg-gray-700"
                      : "border-dashed dark:border-gray-600",
                    isAnimating ? "animate-pop-in" : "",
                    pokemon ? "shadow-md" : "",
                    "dark-mode-transition"
                  )}
                >
                  {pokemon ? (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 text-gray-400 hover:text-red-500 z-10"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemovePokemon(index);
                        }}
                      >
                        <X size={16} />
                      </Button>
                      <div
                        className={cn(
                          "w-24 h-24 transition-all duration-300",
                          isAnimating ? "animate-jello" : "hover:animate-float"
                        )}
                      >
                        <img
                          src={getBestSprite(pokemon)}
                          alt={pokemon.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium capitalize dark:text-white">
                        {pokemon.name}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {pokemon.types.map((type) => (
                          <TypeBadge
                            key={type.type.name}
                            type={type.type.name}
                            size="sm"
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center text-gray-400 hover:text-gray-600 h-full w-full dark:hover:text-gray-300 dark:text-gray-500"
                      onClick={() => handleSlotClick(index)}
                    >
                      <PlusCircle size={32} className="animate-pulse" />
                      <span className="mt-2 text-sm">Add Pokémon</span>
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <PokemonSelectDialog
        open={dialogOpen}
        onOpenChange={handleDialogChange}
        availablePokemon={availablePokemon}
        onSelect={handleSelectPokemon}
        selectedSlot={selectedSlot}
      />
    </>
  );
};
