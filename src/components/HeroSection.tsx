import { MapPin, Clock, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 mb-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-accent rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-primary rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            {/* Delivery Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              <Badge variant="secondary" className="bg-white/80 text-primary">
                <MapPin className="h-3 w-3 mr-1" />
                Delivering to 10001
              </Badge>
              <Badge variant="secondary" className="bg-white/80 text-primary">
                <Clock className="h-3 w-3 mr-1" />
                30-45 min delivery
              </Badge>
              <Badge variant="secondary" className="bg-white/80 text-primary">
                <Truck className="h-3 w-3 mr-1" />
                Free delivery over $35
              </Badge>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Fresh Groceries
              <span className="text-primary block">Delivered Fast</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Shop from our wide selection of fresh produce, quality meats, dairy products, and pantry essentials. 
              Same-day delivery available in your area.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                Start Shopping Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                View Weekly Deals
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop"
                alt="Fresh groceries"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-xs font-medium">Fresh Quality</p>
                  <p className="text-xs text-gray-500">Guaranteed</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 hidden md:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-medium">Fast Delivery</p>
                  <p className="text-xs text-gray-500">30-45 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}