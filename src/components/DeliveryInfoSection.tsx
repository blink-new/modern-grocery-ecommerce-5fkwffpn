import { Truck, Clock, Shield, Leaf } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function DeliveryInfoSection() {
  const features = [
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Fast Delivery",
      description: "Get your groceries delivered in 30-45 minutes",
      details: "Same-day delivery available"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Flexible Timing",
      description: "Choose your preferred delivery time slot",
      details: "7 days a week, 6AM - 11PM"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guaranteed or money back",
      details: "Fresh quality promise"
    },
    {
      icon: <Leaf className="h-8 w-8 text-emerald-600" />,
      title: "Eco-Friendly",
      description: "Sustainable packaging and carbon-neutral delivery",
      details: "Green delivery options"
    }
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FreshMart?</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're committed to providing the best grocery delivery experience with unmatched quality and service
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 mb-2">
                {feature.description}
              </p>
              <p className="text-sm text-gray-500">
                {feature.details}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery Areas */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-8">
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold text-gray-900 mb-2">Delivery Areas</h4>
          <p className="text-gray-600">We currently deliver to these areas with plans to expand soon</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
          {[
            'Manhattan',
            'Brooklyn',
            'Queens',
            'Bronx',
            'Staten Island',
            'Jersey City',
            'Hoboken',
            'Long Island',
            'Westchester',
            'Connecticut',
            'New Jersey',
            'Philadelphia'
          ].map((area) => (
            <div key={area} className="bg-white rounded-lg p-3 shadow-sm">
              <span className="text-sm font-medium text-gray-700">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}