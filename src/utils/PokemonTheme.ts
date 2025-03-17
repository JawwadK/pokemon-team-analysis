// src/utils/PokemonTheme.ts
import { PokemonType } from "@/types/pokemon";

// Type color mapping based on official Pokémon type colors
export const TYPE_COLORS: Record<PokemonType, { bg: string; text: string; border: string; light: string }> = {
  normal: { 
    bg: "bg-[#A8A878]", 
    text: "text-white", 
    border: "border-[#8A8A59]",
    light: "bg-[#C6C6A7]" 
  },
  fire: { 
    bg: "bg-[#F08030]", 
    text: "text-white", 
    border: "border-[#dd6610]",
    light: "bg-[#F5AC78]" 
  },
  water: { 
    bg: "bg-[#6890F0]", 
    text: "text-white", 
    border: "border-[#386ceb]",
    light: "bg-[#9DB7F5]" 
  },
  electric: { 
    bg: "bg-[#F8D030]", 
    text: "text-gray-800", 
    border: "border-[#e2ba0c]",
    light: "bg-[#FAE078]" 
  },
  grass: { 
    bg: "bg-[#78C850]", 
    text: "text-white", 
    border: "border-[#5ca935]",
    light: "bg-[#A7DB8D]" 
  },
  ice: { 
    bg: "bg-[#98D8D8]", 
    text: "text-gray-800", 
    border: "border-[#67c7c7]",
    light: "bg-[#BCE6E6]" 
  },
  fighting: { 
    bg: "bg-[#C03028]", 
    text: "text-white", 
    border: "border-[#9d1f18]",
    light: "bg-[#D67873]" 
  },
  poison: { 
    bg: "bg-[#A040A0]", 
    text: "text-white", 
    border: "border-[#7e2b7e]",
    light: "bg-[#C183C1]" 
  },
  ground: { 
    bg: "bg-[#E0C068]", 
    text: "text-gray-800", 
    border: "border-[#d4af3a]",
    light: "bg-[#EBD69D]" 
  },
  flying: { 
    bg: "bg-[#A890F0]", 
    text: "text-white", 
    border: "border-[#8165eb]",
    light: "bg-[#C6B7F5]" 
  },
  psychic: { 
    bg: "bg-[#F85888]", 
    text: "text-white", 
    border: "border-[#f61c60]",
    light: "bg-[#FA92B2]" 
  },
  bug: { 
    bg: "bg-[#A8B820]", 
    text: "text-white", 
    border: "border-[#8a9a00]",
    light: "bg-[#C6D16E]" 
  },
  rock: { 
    bg: "bg-[#B8A038]", 
    text: "text-white", 
    border: "border-[#9e8a1f]",
    light: "bg-[#D1C682]" 
  },
  ghost: { 
    bg: "bg-[#705898]", 
    text: "text-white", 
    border: "border-[#554277]",
    light: "bg-[#A292BC]" 
  },
  dragon: { 
    bg: "bg-[#7038F8]", 
    text: "text-white", 
    border: "border-[#4c0cf6]",
    light: "bg-[#A27DFA]" 
  },
  dark: { 
    bg: "bg-[#705848]", 
    text: "text-white", 
    border: "border-[#513a2d]",
    light: "bg-[#A29288]" 
  },
  steel: { 
    bg: "bg-[#B8B8D0]", 
    text: "text-gray-800", 
    border: "border-[#9797c0]",
    light: "bg-[#D1D1E0]" 
  },
  fairy: { 
    bg: "bg-[#EE99AC]", 
    text: "text-white", 
    border: "border-[#e86a85]",
    light: "bg-[#F4BDC9]" 
  }
};

// Application themes based on popular Pokémon games
export const APP_THEMES = {
  default: {
    primary: "from-blue-600 to-blue-400",
    secondary: "bg-slate-50",
    accent: "bg-blue-500",
    headerText: "text-white",
    cardBg: "bg-white",
  },
  ruby: {
    primary: "from-red-600 to-red-400",
    secondary: "bg-slate-50",
    accent: "bg-red-500",
    headerText: "text-white",
    cardBg: "bg-white",
  },
  sapphire: {
    primary: "from-blue-700 to-blue-500",
    secondary: "bg-slate-50",
    accent: "bg-blue-600",
    headerText: "text-white",
    cardBg: "bg-white",
  },
  emerald: {
    primary: "from-emerald-600 to-emerald-400",
    secondary: "bg-slate-50",
    accent: "bg-emerald-500",
    headerText: "text-white",
    cardBg: "bg-white",
  },
  diamond: {
    primary: "from-blue-500 to-indigo-500",
    secondary: "bg-slate-50",
    accent: "bg-indigo-500",
    headerText: "text-white",
    cardBg: "bg-white",
  },
  pearl: {
    primary: "from-pink-500 to-purple-300",
    secondary: "bg-slate-50",
    accent: "bg-pink-400",
    headerText: "text-white",
    cardBg: "bg-white",
  },
  platinum: {
    primary: "from-gray-600 to-gray-400",
    secondary: "bg-slate-100",
    accent: "bg-gray-500",
    headerText: "text-white",
    cardBg: "bg-white",
  },
  gold: {
    primary: "from-yellow-500 to-amber-400",
    secondary: "bg-slate-50",
    accent: "bg-yellow-500",
    headerText: "text-gray-800",
    cardBg: "bg-white",
  },
  silver: {
    primary: "from-gray-400 to-gray-300",
    secondary: "bg-slate-100",
    accent: "bg-gray-400",
    headerText: "text-gray-800",
    cardBg: "bg-white",
  },
  black: {
    primary: "from-gray-900 to-gray-700",
    secondary: "bg-gray-100",
    accent: "bg-gray-800",
    headerText: "text-white",
    cardBg: "bg-white",
  },
  white: {
    primary: "from-gray-200 to-gray-100",
    secondary: "bg-gray-50",
    accent: "bg-gray-300",
    headerText: "text-gray-800",
    cardBg: "bg-white",
  },
};

export type ThemeName = keyof typeof APP_THEMES;