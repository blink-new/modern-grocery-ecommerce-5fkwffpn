import { Percent, Clock, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function PromoBanner() {
  const promos = [
    {
      id: 1,
      title: "50% OFF",
      subtitle: "Fresh Produce",
      description: "Get 50% off on all fresh fruits and vegetables",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      icon: <Percent className="h-6 w-6" />,
      cta: "Shop Produce"
    },
    {
      id: 2,
      title: "Free Delivery",
      subtitle: "Orders $35+",
      description: "Free same-day delivery on orders over $35",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: <Gift className="h-6 w-6" />,
      cta: "Order Now"
    },
    {
      id: 3,
      title: "Limited Time",
      subtitle: "Flash Sale",
      description: "Up to 30% off on pantry essentials",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
      icon: <Clock className="h-6 w-6" />,
      cta: "Shop Sale"
    }
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promos.map((promo) => (
          <div
            key={promo.id}
            className={`${promo.bgColor} rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer transition-transform hover:scale-105`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 rounded-full p-2">
                  {promo.icon}
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Limited
                </Badge>
              </div>

              <h3 className="text-2xl font-bold mb-1">{promo.title}</h3>
              <p className="text-lg font-medium mb-2 opacity-90">{promo.subtitle}</p>
              <p className="text-sm opacity-80 mb-4">{promo.description}</p>

              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white text-gray-900 hover:bg-white/90 group-hover:translate-x-1 transition-transform"
              >
                {promo.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}