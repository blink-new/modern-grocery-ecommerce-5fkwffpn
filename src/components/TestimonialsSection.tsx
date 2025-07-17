import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      comment: "FreshMart has completely changed how I shop for groceries. The quality is amazing and delivery is always on time!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c5e8e1?w=100&h=100&fit=crop&crop=face",
      initials: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, CA",
      rating: 5,
      comment: "Love the fresh produce selection. Everything arrives perfectly ripe and the packaging is eco-friendly.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      initials: "MC"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Chicago, IL",
      rating: 5,
      comment: "The convenience is unmatched. I can get fresh groceries delivered in under an hour. Highly recommend!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      initials: "ER"
    }
  ];

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust FreshMart for their grocery needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="h-12 w-12 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">50K+</div>
          <div className="text-sm text-gray-600">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
          <div className="text-sm text-gray-600">On-Time Delivery</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">24/7</div>
          <div className="text-sm text-gray-600">Customer Support</div>
        </div>
      </div>
    </section>
  );
}