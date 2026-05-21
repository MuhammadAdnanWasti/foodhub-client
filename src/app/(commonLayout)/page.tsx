import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Zap, TrendingUp, Star, Flame } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import { CategoriesGrid } from '@/components/modules/home/CategoriesGrid';
import { RestaurantsGrid } from '@/components/modules/home/RestaurantsGrid';
import { getCategories, getAllProviders } from '@/services/public';

type ProviderMeal = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  reviews: { rating: number }[];
  provider: { id: string; restaurantName: string };
};

function isValidUrl(src: string | undefined | null) {
  return src && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/'));
}

function PopularPicksSection({ providers }: { providers: { id: string; restaurantName: string; meals: ProviderMeal[] }[] }) {
  // Flatten all meals, attach restaurant name, compute avg rating, take top 8
  const allMeals: (ProviderMeal & { avgRating: number; restaurantName: string; providerId: string })[] = [];

  for (const p of providers) {
    for (const m of p.meals ?? []) {
      const reviews = m.reviews ?? [];
      const avgRating = reviews.length
        ? reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / reviews.length
        : 0;
      allMeals.push({ ...m, avgRating, restaurantName: p.restaurantName, providerId: p.id });
    }
  }

  // Sort by avgRating desc, then take top 8 (fall back to first 8 if no reviews)
  const picks = [...allMeals]
    .sort((a, b) => b.avgRating - a.avgRating || b.price - a.price)
    .slice(0, 8);

  if (picks.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="size-5 text-orange-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">Trending Now</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Popular Picks</h2>
            <p className="text-gray-600 mt-1">Highest-rated dishes loved by our customers</p>
          </div>
          <Link href="/#restaurants">
            <Button variant="outline" className="hidden sm:flex items-center gap-2 border-orange-200 text-orange-600 hover:bg-orange-50">
              View all restaurants →
            </Button>
          </Link>
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {picks.map((meal) => (
            <Link
              key={meal.id}
              href={`/restaurants/${meal.providerId}`}
              className="snap-start shrink-0 w-52 rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-orange-100 transition-all group"
            >
              {/* Image */}
              <div className="h-36 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden flex items-center justify-center">
                {isValidUrl(meal.image) ? (
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="208px"
                  />
                ) : (
                  <span className="text-4xl">🍽️</span>
                )}
                {/* Rating badge */}
                {meal.avgRating > 0 && (
                  <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 shadow-sm">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-800">{meal.avgRating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 space-y-1">
                <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {meal.name}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-1">{meal.restaurantName}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-bold text-orange-500">${meal.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-2 py-0.5">Order →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-4 text-center sm:hidden">
          <Link href="/#restaurants">
            <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
              View all restaurants →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const [categories, providers] = await Promise.all([
    getCategories(),
    getAllProviders(),
  ]);
  return (
    <div className="min-h-screen bg-white">
     

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Favorite Food, <span className="text-orange-500">Delivered Fast</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Browse thousands of restaurants and get your favorite meals delivered to your doorstep in 30-45 minutes. Quality food, unbeatable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#cuisines">
                  <Button className="bg-orange-500 hover:bg-orange-600 px-8 py-6 text-lg w-full sm:w-auto">
                    Browse Food
                  </Button>
                </a>
                <Link href="/about-us">
                  <Button variant="outline" className="px-8 py-6 text-lg w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold text-orange-500">50K+</div>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">2K+</div>
                  <p className="text-gray-600">Restaurants</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">4.8★</div>
                  <p className="text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🍕</div>
                <p className="text-2xl font-bold text-orange-600">Fresh & Delicious</p>
                <p className="text-gray-600 mt-2">Order from best restaurants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisines */}
      <section id="cuisines" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Cuisine</h2>
            <p className="text-gray-600 mt-1">Pick a cuisine to find all restaurants offering it</p>
          </div>
          <CategoriesGrid categories={categories} />
        </div>
      </section>

      {/* Restaurants */}
      <section id="restaurants" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Restaurants</h2>
            <p className="text-gray-600 mt-1">Discover top restaurants delivering near you</p>
          </div>
          <RestaurantsGrid providers={providers} />
        </div>
      </section>

      {/* Popular Picks */}
      <PopularPicksSection providers={providers} />

      {/* How It Works */}
      <section className="py-20 md:py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Getting your favorite food is as easy as 1, 2, 3
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
           

            {/* Step 2 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  🛒
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">1. Browse & Order</h3>
                <p className="text-gray-600">
                  Explore menus, read reviews, and add your favorite items to your cart. Customize as you like!
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  📍
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">2. Enter Your Location</h3>
                <p className="text-gray-600">
                  Tell us where you want your food delivered. We&apos;ll show you all available restaurants in your area.
                </p>
              </CardContent>
            </Card>
            {/* Step 3 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  🚚
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">3. Track & Enjoy</h3>
                <p className="text-gray-600">
                  Track your order in real-time and get it delivered hot and fresh to your door. Enjoy!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Why Choose Us?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                  <Zap size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Lightning Fast Delivery</h3>
                <p className="text-gray-600 mt-2">
                  Average delivery time of 30-45 minutes. We work with local restaurants to ensure your food arrives hot and fresh.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                  <Search size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Huge Restaurant Selection</h3>
                <p className="text-gray-600 mt-2">
                  Choose from thousands of restaurants offering everything from street food to fine dining. Something for everyone.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                  <MapPin size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Real-Time Tracking</h3>
                <p className="text-gray-600 mt-2">
                  Know exactly where your delivery is at all times. Live updates keep you informed every step of the way.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                  <TrendingUp size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Best Prices & Deals</h3>
                <p className="text-gray-600 mt-2">
                  Enjoy competitive pricing with regular discounts and exclusive offers for our loyal customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Satisfy Your Hunger?</h2>
          <p className="text-lg text-orange-100 mb-8">
            Join thousands of happy customers and get started today. Your favorite food is just a few clicks away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <Link href="/about-us">
              <Button variant="outline" className="border-white text-orange-600 hover:bg-orange-700 px-8 py-6 text-lg w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
                <li><Link href="/#cuisine" className="hover:text-white">Restaurants</Link></li>
               
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/login" className="hover:text-white">Login</Link></li>
                <li><Link href="/register" className="hover:text-white">Register</Link></li>
                
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">Facebook</Link></li>
                
                <li><Link href="#" className="hover:text-white">Instagram</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2024 CodeRabbit Food. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}