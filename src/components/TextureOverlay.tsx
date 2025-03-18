import React, { useState, useEffect } from "react";
import { ThemeName } from "@/utils/PokemonTheme";
import { useTheme } from "next-themes";

interface TextureOverlayProps {
  currentTheme: ThemeName;
}

const TextureOverlay: React.FC<TextureOverlayProps> = ({ currentTheme }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Use useEffect to handle client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render on client-side to avoid hydration errors
  if (!mounted) return null;

  // Get theme-specific color
  const getThemeColor = () => {
    switch (currentTheme) {
      case "gold":
        return isDark ? "rgba(234, 179, 8, 0.03)" : "rgba(234, 179, 8, 0.03)";
      case "ruby":
        return isDark ? "rgba(239, 68, 68, 0.03)" : "rgba(239, 68, 68, 0.03)";
      case "sapphire":
      case "diamond":
        return isDark ? "rgba(59, 130, 246, 0.03)" : "rgba(59, 130, 246, 0.03)";
      case "emerald":
        return isDark ? "rgba(16, 185, 129, 0.03)" : "rgba(16, 185, 129, 0.03)";
      case "black":
        return isDark ? "rgba(156, 163, 175, 0.03)" : "rgba(75, 85, 99, 0.03)";
      case "white":
        return isDark
          ? "rgba(156, 163, 175, 0.03)"
          : "rgba(229, 231, 235, 0.03)";
      default:
        return isDark ? "rgba(59, 130, 246, 0.03)" : "rgba(59, 130, 246, 0.03)";
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-2]">
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      ></div>

      {/* Diagonal grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(45deg, ${getThemeColor()} 25%, transparent 25%), 
                           linear-gradient(-45deg, ${getThemeColor()} 25%, transparent 25%), 
                           linear-gradient(45deg, transparent 75%, ${getThemeColor()} 75%), 
                           linear-gradient(-45deg, transparent 75%, ${getThemeColor()} 75%)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0",
        }}
      ></div>
    </div>
  );
};

export default TextureOverlay;
