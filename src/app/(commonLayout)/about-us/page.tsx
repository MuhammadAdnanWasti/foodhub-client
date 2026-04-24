import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Truck, Clock, Users, Award, Heart } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
    
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-orange-500 font-bold text-3xl">
              🍽️
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">CodeRabbit Food</h1>
          <p className="text-xl text-center text-orange-100 max-w-2xl mx-auto">
            Delivering delicious meals to your doorstep, one order at a time. Experience the future of food delivery.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded in 2024, CodeRabbit Food started with a simple mission: to connect hungry customers with their favorite local restaurants. We believe that good food should be accessible to everyone, anytime, anywhere.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our team of passionate food enthusiasts and tech experts work tirelessly to bring you the best food delivery experience. From small local eateries to premium restaurants, we partner with the finest establishments in your area.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we serve thousands of happy customers across multiple cities, and our mission remains the same: to be your go-to food delivery platform for quality, speed, and reliability.
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-2xl font-bold text-orange-600">Food Delivery</p>
                <p className="text-gray-600 mt-2">Reimagined</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">Why Choose CodeRabbit Food?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We've built our platform on the pillars of quality, speed, and customer satisfaction
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Fast Delivery */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-xl">Fast Delivery</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Average delivery time of 30-45 minutes. We prioritize speed without compromising food quality.
                </p>
              </CardContent>
            </Card>

            {/* Card 2: Wide Selection */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Star className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-xl">Wide Selection</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Explore thousands of restaurants and dishes. From local favorites to premium dining experiences.
                </p>
              </CardContent>
            </Card>

            {/* Card 3: Reliable Service */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-xl">Real-Time Tracking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track your order in real-time. Know exactly where your food is at every moment.
                </p>
              </CardContent>
            </Card>

            {/* Card 4: Affordable Prices */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-xl">Best Prices</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Competitive pricing with regular discounts and promotions. Great food doesn't have to be expensive.
                </p>
              </CardContent>
            </Card>

            {/* Card 5: Expert Support */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-xl">24/7 Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our dedicated support team is available round the clock to help you with any issues.
                </p>
              </CardContent>
            </Card>

            {/* Card 6: Quality Assured */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-xl">Quality Assured</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We carefully select and verify all our restaurant partners to ensure the highest quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">By The Numbers</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">50K+</div>
              <p className="text-gray-600 font-semibold">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">2K+</div>
              <p className="text-gray-600 font-semibold">Restaurants</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">100K+</div>
              <p className="text-gray-600 font-semibold">Orders Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">4.8/5</div>
              <p className="text-gray-600 font-semibold">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                💡
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our platform to provide the best user experience possible.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                🤝
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Partnership</h3>
              <p className="text-gray-600">
                We work closely with restaurants and delivery partners to create a thriving ecosystem.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                ❤️
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Customer First</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. Everything we do is for your benefit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg text-orange-100 mb-8">
            Join thousands of happy customers and discover amazing food from your favorite restaurants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-white text-white hover:bg-orange-700 px-8 py-6 text-lg">
                Sign In
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
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
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