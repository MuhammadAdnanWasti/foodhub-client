import Image from "next/image";

function isValidImageUrl(src: string | undefined | null): boolean {
  if (!src) return false;
  return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/");
}

type Category = {
  id: string;
  name: string;
};

type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
};

type Props = {
  meals: Meal[];
};

export function RestaurantMenu({ meals }: Props) {
  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center gap-3">
        <span className="text-5xl">🍽️</span>
        <p className="text-gray-600 font-medium">No menu items yet</p>
        <p className="text-gray-400 text-sm">Check back soon!</p>
      </div>
    );
  }

  // Group meals by category
  const grouped = meals.reduce<Record<string, Meal[]>>((acc, meal) => {
    const key = meal.category?.name ?? "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(meal);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([categoryName, items]) => (
        <div key={categoryName}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
            {categoryName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((meal) => (
              <div
                key={meal.id}
                className="rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-md hover:border-orange-100 transition-all"
              >
                {/* Meal image */}
                <div className="h-44 bg-gradient-to-br from-orange-50 to-amber-50 relative flex items-center justify-center overflow-hidden">
                  {isValidImageUrl(meal.image) ? (
                    <Image
                      src={meal.image}
                      alt={meal.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <span className="text-5xl">🍽️</span>
                  )}
                </div>

                {/* Meal info */}
                <div className="p-4 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 leading-tight">{meal.name}</h4>
                    <span className="shrink-0 text-sm font-bold text-orange-500">
                      ${meal.price.toFixed(2)}
                    </span>
                  </div>
                  {meal.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{meal.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
