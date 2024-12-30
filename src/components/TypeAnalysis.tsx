// src/components/TypeAnalysis.tsx
import { Pokemon, PokemonType } from "@/types/pokemon";
import { TYPE_CHART, TypeEffectiveness } from "@/data/typeChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TypeAnalysisProps {
  team: Pokemon[];
}

export const TypeAnalysis = ({ team }: TypeAnalysisProps) => {
  const calculateTeamDefenses = (): TypeEffectiveness => {
    const defaultEffectiveness = Object.keys(TYPE_CHART).reduce(
      (acc, type) => ({
        ...acc,
        [type]: 1,
      }),
      {} as TypeEffectiveness
    );

    if (team.length === 0) return defaultEffectiveness;

    // Calculate effectiveness multiplier for each attacking type against each team member
    return team.reduce((teamEffectiveness, pokemon) => {
      const pokemonEffectiveness = { ...defaultEffectiveness };

      pokemon.types.forEach((typeInfo) => {
        const defenderType = typeInfo.type.name as PokemonType;

        Object.entries(TYPE_CHART).forEach(([attackType, effectiveness]) => {
          const multiplier = effectiveness[defenderType] || 1;
          pokemonEffectiveness[attackType as PokemonType] *= multiplier;
        });
      });

      // Combine with team effectiveness
      return Object.entries(pokemonEffectiveness).reduce(
        (acc, [type, value]) => ({
          ...acc,
          [type]: Math.min(value, teamEffectiveness[type as PokemonType] || 1),
        }),
        {} as TypeEffectiveness
      );
    }, defaultEffectiveness);
  };

  const defenses = calculateTeamDefenses();

  const getEffectivenessClass = (value: number): string => {
    if (value >= 2) return "text-red-500 font-bold";
    if (value === 0) return "text-green-600 font-bold";
    if (value < 1) return "text-green-500";
    return "text-gray-600";
  };

  const getEffectivenessLabel = (value: number): string => {
    if (value >= 2) return "Weak";
    if (value === 0) return "Immune";
    if (value < 1) return "Resistant";
    return "Neutral";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Type Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {team.length === 0 ? (
          <p className="text-gray-500">
            Add Pokémon to your team to see type analysis
          </p>
        ) : (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Effectiveness</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(defenses)
                  .sort(([, a], [, b]) => b - a) // Sort by effectiveness
                  .map(([type, effectiveness]) => (
                    <TableRow key={type}>
                      <TableCell className="capitalize font-medium">
                        {type}
                      </TableCell>
                      <TableCell
                        className={getEffectivenessClass(effectiveness)}
                      >
                        {effectiveness}x
                      </TableCell>
                      <TableCell
                        className={getEffectivenessClass(effectiveness)}
                      >
                        {getEffectivenessLabel(effectiveness)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="p-2 rounded bg-red-50 border border-red-200">
                <h4 className="font-semibold text-red-700">Weaknesses</h4>
                <p className="text-sm text-red-600">
                  {Object.entries(defenses)
                    .filter(([, value]) => value >= 2)
                    .map(([type]) => type)
                    .join(", ") || "None"}
                </p>
              </div>

              <div className="p-2 rounded bg-green-50 border border-green-200">
                <h4 className="font-semibold text-green-700">Resistances</h4>
                <p className="text-sm text-green-600">
                  {Object.entries(defenses)
                    .filter(([, value]) => value < 1 && value > 0)
                    .map(([type]) => type)
                    .join(", ") || "None"}
                </p>
              </div>

              <div className="p-2 rounded bg-green-50 border border-green-200">
                <h4 className="font-semibold text-green-700">Immunities</h4>
                <p className="text-sm text-green-600">
                  {Object.entries(defenses)
                    .filter(([, value]) => value === 0)
                    .map(([type]) => type)
                    .join(", ") || "None"}
                </p>
              </div>

              <div className="p-2 rounded bg-gray-50 border border-gray-200">
                <h4 className="font-semibold text-gray-700">Coverage Needed</h4>
                <p className="text-sm text-gray-600">
                  {Object.entries(defenses)
                    .filter(([, value]) => value >= 2)
                    .map(([type]) => type)
                    .join(", ") || "Good coverage!"}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
