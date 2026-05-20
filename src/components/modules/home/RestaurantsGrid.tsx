import Link from "next/link";
import Image from "next/image";

function isValidImageUrl(src: string | undefined | null): boolean {
  if (!src) return false;
  return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/");
}

type Meal = {
  id: string;
  image: string;
  name: string;
};

type Provider = {
  id: string;
  restaurantName: string;
  address: string;
  phone: string;
  meals: Meal[];
};

type Props = {
  providers: Provider[];
};

export function RestaurantsGrid({ providers }: Props) {
  if (providers.length === 0) {
    return (
      <p className="text-gray-500 text-sm">No restaurants available yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => {
        const rawImage = provider.meals?.find((m) => m.image)?.image ?? null;
        const coverImage = isValidImageUrl(rawImage) ? rawImage : null;

        return (
          <Link
            key={provider.id}
            href={`/restaurants/${provider.id}`}
            className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:shadow-gray-100 hover:border-orange-200 transition-all"
          >
            {/* Cover image */}
            <div className="h-40 bg-gradient-to-br from-orange-100 to-amber-50 relative flex items-center justify-center overflow-hidden">
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt={provider.restaurantName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <span className="text-6xl">🏪</span>
              )}
            </div>

            {/* Info */}
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-orange-600 transition-colors">
                {provider.restaurantName}
              </h3>
              <p className="text-sm text-gray-500 truncate">{provider.address}</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs bg-orange-50 text-orange-600 font-medium px-2.5 py-1 rounded-full">
                  {provider.meals?.length ?? 0} items
                </span>
                <span className="text-xs text-gray-400">View menu →</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
