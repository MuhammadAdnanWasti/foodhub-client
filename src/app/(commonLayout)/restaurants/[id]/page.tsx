import Link from "next/link";
import { notFound } from "next/navigation";
import { getProviderById } from "@/services/public";
import { RestaurantMenu } from "@/components/modules/home/RestaurantMenu";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RestaurantPage({ params }: Props) {
  const { id } = await params;
  const provider = await getProviderById(id);

  if (!provider) notFound();

  const mealCount = provider.meals?.length ?? 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Restaurant header */}
      <div className="bg-gradient-to-br from-orange-50 to-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <Link
            href="/#restaurants"
            className="inline-flex items-center gap-1 text-sm text-orange-500 hover:text-orange-600 hover:underline mb-4"
          >
            ← Back to restaurants
          </Link>

          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center text-5xl shrink-0">
              🏪
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">{provider.restaurantName}</h1>
              <p className="text-gray-600 flex items-center gap-1.5">
                <span>📍</span>
                {provider.address}
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-1.5">
                <span>📞</span>
                {provider.phone}
              </p>
              <div className="pt-1">
                <span className="text-xs bg-orange-100 text-orange-700 font-medium px-2.5 py-1 rounded-full">
                  {mealCount} item{mealCount !== 1 ? "s" : ""} on the menu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Menu</h2>
        <RestaurantMenu meals={provider.meals ?? []} />
      </div>
    </div>
  );
}
