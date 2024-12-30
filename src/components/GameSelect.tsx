// src/components/GameSelect.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GAMES = {
  "Red/Blue": {
    name: "Red/Blue",
    generation: 1,
    regionalDex: Array.from({ length: 151 }, (_, i) => i + 1),
    nationalDex: false,
    availablePokemon: Array.from({ length: 151 }, (_, i) => i + 1),
  },
};

interface GameSelectProps {
  selectedGame: string;
  onGameSelect: (game: string) => void;
}

export const GameSelect = ({ selectedGame, onGameSelect }: GameSelectProps) => {
  return (
    <Select value={selectedGame} onValueChange={onGameSelect}>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Select a game" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(GAMES).map((game) => (
          <SelectItem key={game} value={game}>
            {game}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
