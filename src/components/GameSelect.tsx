// src/components/GameSelect.tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GAME_DATA } from "@/data/games";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameSelectProps {
  selectedGame: string;
  onGameSelect: (game: string) => void;
}

export const GameSelect = ({ selectedGame, onGameSelect }: GameSelectProps) => {
  // Group games by generation
  const gamesByGeneration = Object.entries(GAME_DATA).reduce(
    (acc, [key, game]) => {
      const gen = game.generation;
      if (!acc[gen]) acc[gen] = [];
      acc[gen].push(key);
      return acc;
    },
    {} as Record<number, string[]>
  );

  // Get stats about the selected game
  const selectedGameData = selectedGame ? GAME_DATA[selectedGame] : null;

  return (
    <Card
      className={cn(
        !selectedGame
          ? "border-2 border-blue-400 shadow-md dark:border-blue-500"
          : "",
        "dark:bg-gray-800 dark:border-gray-700 animate-pop-in"
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl dark:text-white">
          Select a Pokémon Game
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Choose the game to build a team for. This will determine which Pokémon
          are available.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-grow">
            <Select value={selectedGame} onValueChange={onGameSelect}>
              <SelectTrigger
                className={cn(
                  "w-full",
                  !selectedGame
                    ? "animate-pulse bg-blue-50 dark:bg-blue-900/30"
                    : "",
                  "dark:bg-gray-700 dark:text-white dark:border-gray-600"
                )}
              >
                <SelectValue
                  placeholder="Select a game"
                  className="dark:text-gray-300"
                />
                <ChevronDown className="h-4 w-4 opacity-50" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                {Object.entries(gamesByGeneration)
                  .sort(([genA], [genB]) => parseInt(genA) - parseInt(genB))
                  .map(([generation, games]) => (
                    <SelectGroup key={generation}>
                      <SelectLabel className="dark:text-gray-300">
                        Generation {generation}
                      </SelectLabel>
                      {games.map((game) => (
                        <SelectItem
                          key={game}
                          value={game}
                          className="dark:text-white dark:focus:bg-gray-700 dark:data-[state=checked]:text-white"
                        >
                          {game}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {selectedGameData && (
            <div className="flex-shrink-0 bg-slate-50 dark:bg-gray-700 p-3 rounded-md">
              <div className="flex items-center mb-2">
                <Info className="h-4 w-4 mr-2 text-blue-500 dark:text-blue-400" />
                <h3 className="font-medium dark:text-white">Game Info</h3>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-gray-600 dark:text-gray-300">
                  Generation:
                </span>
                <span className="font-medium dark:text-white">
                  {selectedGameData.generation}
                </span>

                <span className="text-gray-600 dark:text-gray-300">
                  Pokémon Available:
                </span>
                <span className="font-medium dark:text-white">
                  {selectedGameData.availablePokemon.length}
                </span>

                <span className="text-gray-600 dark:text-gray-300">
                  National Dex:
                </span>
                <span className="font-medium dark:text-white">
                  {selectedGameData.nationalDex ? "Yes" : "No"}
                </span>

                <span className="text-gray-600 dark:text-gray-300">
                  Regional Dex Size:
                </span>
                <span className="font-medium dark:text-white">
                  {selectedGameData.regionalDex.length}
                </span>
              </div>
            </div>
          )}
        </div>

        {!selectedGame && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 animate-pulse">
            <p className="font-medium">
              Please select a game to begin building your team
            </p>
            <p className="text-sm mt-1">
              The available Pokémon will be loaded based on your game selection
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
