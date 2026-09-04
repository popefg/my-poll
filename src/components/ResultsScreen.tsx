"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DISH_MAP, type DishId } from "@/lib/dishes";

export interface DishTally {
  dish: DishId;
  count: number;
}

export function ResultsScreen({ tallies }: { tallies: DishTally[] }) {
  const total = tallies.reduce((sum, t) => sum + t.count, 0);
  const sorted = [...tallies].sort((a, b) => b.count - a.count);
  const leaderCount = sorted[0]?.count ?? 0;

  return (
    <div className="w-full max-w-md mx-auto animate-pop-in">
      <div className="flex items-baseline justify-between mb-4 px-1">
        <h2 className="text-lg font-bold text-cedar-900">Live Results</h2>
        <span className="text-sm font-semibold text-cedar-700">
          {total} vote{total === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {sorted.map((tally, index) => {
            const dish = DISH_MAP[tally.dish];
            const pct = total === 0 ? 0 : Math.round((tally.count / total) * 100);
            const isLeader = total > 0 && tally.count === leaderCount && tally.count > 0;

            return (
              <motion.div
                key={tally.dish}
                layout
                layoutId={tally.dish}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`relative overflow-hidden rounded-2xl border-2 bg-white px-4 py-3 shadow-sm ${
                  isLeader ? "border-cherry-400 shadow-cherry-200/60" : "border-cedar-100"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{dish.emoji}</span>
                  <span className="font-bold text-cedar-900 flex items-center gap-1">
                    {dish.name}
                    {isLeader && (
                      <span
                        className="ml-1 inline-block animate-crown-float"
                        aria-label="Current leader"
                        title="Current leader"
                      >
                        👑
                      </span>
                    )}
                  </span>
                  <span className="ml-auto text-sm font-semibold text-cedar-700">
                    {pct}%
                  </span>
                  <span className="text-xs text-cedar-900/50">
                    ({tally.count})
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-cedar-50 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      isLeader
                        ? "bg-gradient-to-r from-cherry-500 to-cherry-400"
                        : "bg-gradient-to-r from-cedar-600 to-cedar-400"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>

                {index === 0 && total > 0 && (
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold uppercase tracking-wide bg-cherry-500 text-white px-2 py-0.5 rounded-full shadow">
                    Leading
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="mt-6 text-center text-xs text-cedar-900/50 px-4">
        Results update live for everyone watching — no refresh needed.
      </p>
    </div>
  );
}
