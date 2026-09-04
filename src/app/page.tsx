"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { DISHES, type DishId } from "@/lib/dishes";
import { getStoredVote, saveVote } from "@/lib/voteStorage";
import { Header } from "@/components/Header";
import { VotingScreen } from "@/components/VotingScreen";
import { ResultsScreen, type DishTally } from "@/components/ResultsScreen";

type Screen = "loading" | "vote" | "results";

function emptyTallies(): DishTally[] {
  return DISHES.map((d) => ({ dish: d.id, count: 0 }));
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [tallies, setTallies] = useState<DishTally[]>(emptyTallies());
  const [error, setError] = useState<string | null>(null);

  const fetchTallies = useCallback(async () => {
    const { data, error: fetchError } = await supabase.from("votes").select("dish");
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    const counts = new Map<DishId, number>(DISHES.map((d) => [d.id, 0]));
    for (const row of data ?? []) {
      const dish = row.dish as DishId;
      counts.set(dish, (counts.get(dish) ?? 0) + 1);
    }
    setTallies(DISHES.map((d) => ({ dish: d.id, count: counts.get(d.id) ?? 0 })));
  }, []);

  useEffect(() => {
    const stored = getStoredVote();
    setScreen(stored ? "results" : "vote");
    fetchTallies();

    const channel = supabase
      .channel("votes-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "votes" },
        () => {
          fetchTallies();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTallies]);

  async function handleVote(dish: DishId) {
    setError(null);
    const { error: insertError } = await supabase.from("votes").insert({ dish });
    if (insertError) {
      setError(insertError.message);
      return;
    }
    saveVote(dish);
    setScreen("results");
    fetchTallies();
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 px-4 pb-12">
        {error && (
          <p className="max-w-md mx-auto mb-4 rounded-lg bg-cherry-50 border border-cherry-200 text-cherry-700 text-sm px-3 py-2 text-center">
            {error}
          </p>
        )}
        {screen === "loading" && (
          <div className="flex justify-center pt-16">
            <span className="text-cedar-700 text-sm">Loading…</span>
          </div>
        )}
        {screen === "vote" && <VotingScreen onVote={handleVote} />}
        {screen === "results" && <ResultsScreen tallies={tallies} />}
      </div>
    </main>
  );
}
