// src/components/TeamSlots.tsx
import { useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { PokemonSelectDialog } from "./PokemonSelectDialog";

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

  const handleSlotClick = (index: number) => {
    setSelectedSlot(index);
    setDialogOpen(true);
  };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    if (selectedSlot !== null) {
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

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Your Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => {
              const pokemon = team[index];
              return (
                <div
                  key={index}
                  className={`border rounded-lg p-2 flex flex-col items-center justify-center h-40 relative ${
                    pokemon ? "bg-slate-50" : "border-dashed"
                  }`}
                >
                  {pokemon ? (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 text-gray-400 hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemovePokemon(index);
                        }}
                      >
                        <X size={16} />
                      </Button>
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="w-24 h-24"
                      />
                      <p className="text-sm font-medium capitalize">
                        {pokemon.name}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {pokemon.types.map((type) => (
                          <span
                            key={type.type.name}
                            className="px-2 py-0.5 rounded-full text-xs bg-slate-200"
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center text-gray-400 hover:text-gray-600 h-full w-full"
                      onClick={() => handleSlotClick(index)}
                    >
                      <PlusCircle size={32} />
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
