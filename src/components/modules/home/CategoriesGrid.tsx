import Link from "next/link";

const CUISINE_EMOJI: Record<string, string> = {
  pizza: "🍕",
  burger: "🍔",
  sushi: "🍣",
  chinese: "🥡",
  indian: "🍛",
  italian: "🍝",
  mexican: "🌮",
  thai: "🍜",
  bbq: "🍖",
  seafood: "🦞",
  dessert: "🍰",
  desserts: "🍰",
  breakfast: "🍳",
  salad: "🥗",
  sandwich: "🥪",
  vegan: "🥦",
  vegetarian: "🥗",
  drinks: "🥤",
  coffee: "☕",
  noodles: "🍜",
  rice: "🍚",
};

function getCuisineEmoji(name: string): string {
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(CUISINE_EMOJI)) {
    if (key.includes(k)) return v;
  }
  return "🍽️";
}

type Category = {
  id: string;
  name: string;
  description: string;
  meals: { id: string }[];
};

type Props = {
  categories: Category[];
};

export function CategoriesGrid({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <p className="text-gray-500 text-sm">No cuisine categories available yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/cuisines/${cat.id}`}
          className="group flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-white hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center text-3xl transition-colors">
            {getCuisineEmoji(cat.name)}
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800 leading-tight">{cat.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{cat.meals.length} meals</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
