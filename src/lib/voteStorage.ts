import type { DishId } from "./dishes";

const STORAGE_KEY = "cedar-bites-vote";

export interface StoredVote {
  dish: DishId;
  votedAt: string;
}

export function getStoredVote(): StoredVote | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredVote;
  } catch {
    return null;
  }
}

export function saveVote(dish: DishId) {
  if (typeof window === "undefined") return;
  const vote: StoredVote = { dish, votedAt: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(vote));
}
