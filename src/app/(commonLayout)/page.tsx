import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Zap, TrendingUp } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import { CategoriesGrid } from '@/components/modules/home/CategoriesGrid';
import { RestaurantsGrid } from '@/components/modules/home/RestaurantsGrid';
import { getCategories, getAllProviders } from '@/services/public';

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

      {/* How It Works */}
      <section className="py-20 md:py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How It Works</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Getting your favorite food is as easy as 1, 2, 3
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  📍
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">1. Enter Your Location</h3>
                <p className="text-gray-600">
                  Tell us where you want your food delivered. We'll show you all available restaurants in your area.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  🛒
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">2. Browse & Order</h3>
                <p className="text-gray-600">
                  Explore menus, read reviews, and add your favorite items to your cart. Customize as you like!
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
            <Link href="/register">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about-us" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                <li><Link href="#" className="hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white">Facebook</Link></li>
                <li><Link href="#" className="hover:text-white">Twitter</Link></li>
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