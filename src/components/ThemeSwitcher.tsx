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
  // Map themes to appropriate Pokeball variants
  const themeToPokeball: Record<
    ThemeName,
    "normal" | "great" | "ultra" | "master" | "premier"
  > = {
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
          className="flex gap-2 items-center bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 dark:text-white dark:border-gray-700"
        >
          <Palette className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">Theme</span>
          <Pokeball
            variant={themeToPokeball[currentTheme]}
            size="sm"
            className="ml-1"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 dark:bg-gray-800 dark:border-gray-700"
      >
        <DropdownMenuLabel className="dark:text-white">
          Select Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
        {(Object.keys(APP_THEMES) as ThemeName[]).map((theme) => (
          <DropdownMenuItem
            key={theme}
            className={`flex items-center gap-2 cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700 ${
              theme === currentTheme ? "bg-slate-100 dark:bg-gray-700" : ""
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
