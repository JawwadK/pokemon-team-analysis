import React, { useState, useEffect } from "react";
import { ThemeName } from "@/utils/PokemonTheme";
import { cn } from "@/lib/utils";

interface SidePanelsProps {
  currentTheme: ThemeName;
}

const SidePanels: React.FC<SidePanelsProps> = ({ currentTheme }) => {
  // Add client-side only rendering to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client-side to avoid hydration errors
  if (!mounted) return null;
  // Get theme-based styles
  const getThemeStyles = () => {
    switch (currentTheme) {
      case "gold":
        return {
          mainGradient: "from-yellow-500 to-amber-400",
          panelBg: "bg-yellow-100 dark:bg-yellow-900/20",
          accentColor: "bg-yellow-400 dark:bg-yellow-600",
          borderColor: "border-yellow-300 dark:border-yellow-700",
        };
      case "ruby":
        return {
          mainGradient: "from-red-600 to-red-400",
          panelBg: "bg-red-100 dark:bg-red-900/20",
          accentColor: "bg-red-400 dark:bg-red-600",
          borderColor: "border-red-300 dark:border-red-700",
        };
      case "sapphire":
        return {
          mainGradient: "from-blue-700 to-blue-500",
          panelBg: "bg-blue-100 dark:bg-blue-900/20",
          accentColor: "bg-blue-400 dark:bg-blue-600",
          borderColor: "border-blue-300 dark:border-blue-700",
        };
      case "emerald":
        return {
          mainGradient: "from-emerald-600 to-emerald-400",
          panelBg: "bg-emerald-100 dark:bg-emerald-900/20",
          accentColor: "bg-emerald-400 dark:bg-emerald-600",
          borderColor: "border-emerald-300 dark:border-emerald-700",
        };
      case "diamond":
      case "pearl":
      case "platinum":
        return {
          mainGradient: "from-blue-500 to-indigo-500",
          panelBg: "bg-blue-50 dark:bg-blue-900/10",
          accentColor: "bg-blue-300 dark:bg-blue-600",
          borderColor: "border-blue-200 dark:border-blue-700",
        };
      case "black":
        return {
          mainGradient: "from-gray-900 to-gray-700",
          panelBg: "bg-gray-100 dark:bg-gray-800/30",
          accentColor: "bg-gray-400 dark:bg-gray-600",
          borderColor: "border-gray-300 dark:border-gray-700",
        };
      case "white":
        return {
          mainGradient: "from-gray-200 to-gray-100",
          panelBg: "bg-gray-50 dark:bg-gray-800/10",
          accentColor: "bg-gray-200 dark:bg-gray-600",
          borderColor: "border-gray-200 dark:border-gray-700",
        };
      // Default/fallback
      default:
        return {
          mainGradient: "from-blue-600 to-blue-400",
          panelBg: "bg-blue-50 dark:bg-blue-900/20",
          accentColor: "bg-blue-300 dark:bg-blue-600",
          borderColor: "border-blue-200 dark:border-blue-700",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] hidden md:block">
      {/* Left panel */}
      <div
        className={cn(
          "absolute top-0 left-0 h-full w-48 xl:w-64 transition-colors duration-500",
          styles.panelBg
        )}
      >
        {/* Decorative elements */}
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-1 bg-gradient-to-b",
            styles.mainGradient
          )}
        ></div>

        {/* Pokéball top half circle */}
        <div
          className={cn(
            "absolute top-1/4 right-8 w-24 h-12 rounded-t-full",
            styles.accentColor
          )}
        ></div>

        {/* Pokéball bottom half circle */}
        <div
          className={cn(
            "absolute top-1/4 mt-12 right-8 w-24 h-12 rounded-b-full bg-white dark:bg-gray-700",
            styles.borderColor
          )}
        ></div>

        {/* Pokéball center button */}
        <div
          className={cn(
            "absolute top-1/4 mt-10 right-8 ml-10 w-8 h-8 rounded-full border-4 z-10 bg-white dark:bg-gray-600",
            styles.borderColor
          )}
        ></div>

        {/* Horizontal lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`left-line-${i}`}
            className={cn(
              "absolute left-4 h-1 rounded-full opacity-30",
              styles.accentColor
            )}
            style={{
              width: `${60 + Math.random() * 20}px`,
              top: `${(i + 1) * 10}%`,
            }}
          ></div>
        ))}

        {/* Small dots */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`left-dot-${i}`}
            className={cn(
              "absolute rounded-full opacity-40",
              styles.accentColor
            )}
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              left: `${30 + Math.random() * 40}%`,
              top: `${5 + i * 6 + Math.random() * 2}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Right panel */}
      <div
        className={cn(
          "absolute top-0 right-0 h-full w-48 xl:w-64 transition-colors duration-500",
          styles.panelBg
        )}
      >
        {/* Decorative elements */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-1 bg-gradient-to-b",
            styles.mainGradient
          )}
        ></div>

        {/* Type badge shape */}
        <div
          className={cn(
            "absolute top-2/3 left-8 w-32 h-16 rounded-full opacity-60",
            styles.accentColor
          )}
        ></div>

        {/* Grid pattern */}
        <div className="absolute top-20 left-12 w-32 h-32 opacity-20">
          <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
              <div
                key={`grid-${i}`}
                className={cn("w-6 h-6 rounded", styles.accentColor)}
              ></div>
            ))}
          </div>
        </div>

        {/* Horizontal lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`right-line-${i}`}
            className={cn(
              "absolute right-4 h-1 rounded-full opacity-30",
              styles.accentColor
            )}
            style={{
              width: `${60 + Math.random() * 20}px`,
              top: `${(i + 1) * 10}%`,
            }}
          ></div>
        ))}

        {/* Small dots */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`right-dot-${i}`}
            className={cn(
              "absolute rounded-full opacity-40",
              styles.accentColor
            )}
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              right: `${30 + Math.random() * 40}%`,
              top: `${5 + i * 6 + Math.random() * 2}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SidePanels;
