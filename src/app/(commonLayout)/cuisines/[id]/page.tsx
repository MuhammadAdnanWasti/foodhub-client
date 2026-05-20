import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getAllProviders } from "@/services/public";
import { RestaurantsGrid } from "@/components/modules/home/RestaurantsGrid";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CuisinePage({ params }: Props) {
  const { id } = await params;

  const [categories, providers] = await Promise.all([
    getCategories(),
    getAllProviders(),
  ]);

  const category = categories.find((c: any) => c.id === id);
  if (!category) notFound();

  const matching = providers.filter((p: any) =>
    p.meals?.some((m: any) => m.categoryId === id)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-50 to-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <Link
            href="/#cuisines"
            className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 hover:underline mb-4"
          >
            ← Back to home
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-4xl">
              🍽️
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              {category.description && (
                <p className="text-gray-600 mt-1">{category.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {matching.length > 0
              ? `${matching.length} restaurant${matching.length > 1 ? "s" : ""} serving ${category.name}`
              : `Restaurants serving ${category.name}`}
          </h2>
        </div>

        {matching.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center gap-3">
            <span className="text-5xl">🔍</span>
            <p className="text-gray-600 font-medium">No restaurants for this cuisine yet</p>
            <p className="text-gray-400 text-sm">Check back soon or browse other cuisines</p>
            <Link
              href="/#cuisines"
              className="mt-4 text-sm font-medium text-orange-500 hover:underline"
            >
              Browse all cuisines
            </Link>
          </div>
        ) : (
          <RestaurantsGrid providers={matching} />
        )}
      </div>
    </div>
  );
}
