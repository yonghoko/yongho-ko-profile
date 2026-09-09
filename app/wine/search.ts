import type { WineNote } from "../../data/wines";

export type SearchMode = "name" | "pairing";
export const foodShortcuts = ["소고기", "해산물", "치즈", "파스타", "닭고기"] as const;

const foodAliases: Record<string, string[]> = {
  소고기: ["소고기", "쇠고기", "비프", "소갈비"],
  해산물: ["해산물", "새우", "생선", "연어", "참치", "조개", "가리비", "굴", "랍스터", "오징어", "문어", "초밥"],
  닭고기: ["닭", "치킨"],
};

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, "");
}

export function matchesWine(wine: Pick<WineNote, "name" | "pairings">, query: string, mode: SearchMode) {
  const search = normalize(query);
  if (!search) return true;
  if (mode === "name") return normalize(wine.name).includes(search);
  const terms = foodAliases[query.trim()] ?? [query];
  return (wine.pairings ?? []).some(food => terms.some(term => normalize(food).includes(normalize(term))));
}
