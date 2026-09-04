"use client";

import { useState } from "react";
import { DISHES, type DishId } from "@/lib/dishes";
import { VoteCard } from "./VoteCard";

export function VotingScreen({
  onVote,
}: {
  onVote: (dish: DishId) => Promise<void> | void;
}) {
  const [submitting, setSubmitting] = useState(false);

  async function handleVote(dish: DishId) {
    if (submitting) return;
    setSubmitting(true);
    try {
      await onVote(dish);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto animate-pop-in">
      <div className="flex flex-col gap-3">
        {DISHES.map((dish) => (
          <VoteCard key={dish.id} dish={dish} onVote={handleVote} disabled={submitting} />
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-cedar-900/50 px-4">
        One vote per browser, tracked locally — this is a fun poll, not a secure
        ballot, so it isn&apos;t foolproof.
      </p>
    </div>
  );
}
