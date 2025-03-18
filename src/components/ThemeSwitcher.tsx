// src/components/ThemeSwitcher.tsx
import { useState } from "react";
import { APP_THEMES, ThemeName } from "@/utils/PokemonTheme";
import { Button } from "@/components/ui/button";
import { Pokeball } from "@/components/Pokeball";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

interface ThemeSwitcherProps {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

export const ThemeSwitcher = ({
  currentTheme,
  onThemeChange,
}: ThemeSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Map themes to appropriate Pokeball variants
  const themeToPokeball: Record<ThemeName, any> = {
    default: "normal",
    ruby: "normal",
    sapphire: "great",
    emerald: "normal",
    diamond: "premier",
    pearl: "premier",
    platinum: "premier",
    gold: "ultra",
    silver: "premier",
    black: "normal",
    white: "premier",
  };

  const getThemeLabel = (theme: ThemeName): string => {
    // Capitalize first letter and add spaces if needed
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 items-center bg-white/80 backdrop-blur-sm"
        >
          <Palette className="h-4 w-4" />
          <span>Theme</span>
          <Pokeball
            variant={themeToPokeball[currentTheme]}
            size="sm"
            className="ml-1"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(APP_THEMES) as ThemeName[]).map((theme) => (
          <DropdownMenuItem
            key={theme}
            className={`flex items-center gap-2 cursor-pointer ${
              theme === currentTheme ? "bg-slate-100" : ""
            }`}
            onClick={() => {
              onThemeChange(theme);
              setIsOpen(false);
            }}
          >
            <div
              className={`w-4 h-4 rounded-full bg-gradient-to-r ${APP_THEMES[theme].primary}`}
            ></div>
            <span>{getThemeLabel(theme)}</span>
            {theme === currentTheme && (
              <Pokeball
                variant={themeToPokeball[theme]}
                size="sm"
                className="ml-auto"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
