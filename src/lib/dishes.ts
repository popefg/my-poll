export type DishId = "hummus" | "tabbouleh" | "kibbeh" | "fattoush" | "manakish";

export interface Dish {
  id: DishId;
  name: string;
  emoji: string;
  description: string;
}

export const DISHES: Dish[] = [
  {
    id: "hummus",
    name: "Hummus",
    emoji: "🧉",
    description: "Creamy chickpea and tahini dip",
  },
  {
    id: "tabbouleh",
    name: "Tabbouleh",
    emoji: "🌿",
    description: "Parsley, tomato, and bulgur salad",
  },
  {
    id: "kibbeh",
    name: "Kibbeh",
    emoji: "🥟",
    description: "Spiced meat and bulgur, fried or baked",
  },
  {
    id: "fattoush",
    name: "Fattoush",
    emoji: "🥗",
    description: "Crisp veggie salad with toasted pita",
  },
  {
    id: "manakish",
    name: "Manakish",
    emoji: "🫓",
    description: "Flatbread topped with za'atar or cheese",
  },
];

export const DISH_MAP: Record<DishId, Dish> = DISHES.reduce(
  (acc, dish) => ({ ...acc, [dish.id]: dish }),
  {} as Record<DishId, Dish>
);
