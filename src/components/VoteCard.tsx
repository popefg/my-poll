import type { Dish } from "@/lib/dishes";

export function VoteCard({
  dish,
  onVote,
  disabled,
}: {
  dish: Dish;
  onVote: (id: Dish["id"]) => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onVote(dish.id)}
      className="group relative flex items-center gap-4 w-full rounded-2xl bg-white border-2 border-cedar-100 px-5 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-cedar-400 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cedar-50 text-3xl transition-transform group-hover:scale-110">
        {dish.emoji}
      </span>
      <span className="flex flex-col">
        <span className="text-lg font-bold text-cedar-900">{dish.name}</span>
        <span className="text-sm text-cedar-900/60">{dish.description}</span>
      </span>
      <span className="ml-auto text-cedar-300 transition-colors group-hover:text-cherry-500 text-xl">
        →
      </span>
    </button>
  );
}
