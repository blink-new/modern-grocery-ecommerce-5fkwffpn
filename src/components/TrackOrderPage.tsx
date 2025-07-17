import { ArrowLeft, Package, CheckCircle, Truck, Clock, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface TrackOrderPageProps {
  onBack: () => void;
}

export default function TrackOrderPage({ onBack }: TrackOrderPageProps) {
  // Sample order data - in a real app, this would come from props or API
  const orderData = {
    orderId: '#SDGT1254FD',
    status: 'accepted',
    orderDate: '29 July 2024',
    orderTime: '11:00 PM',
    acceptedDate: '29 July 2024',
    acceptedTime: '11:15 PM',
    expectedInProgressDate: '30 July 2024',
    expectedOnWayDate: '30 July 2024',
    expectedDeliveryDate: '30 July 2024',
    products: [
      {
        id: 1,
        name: 'Fresh Oranges',
        weight: '500 g',
        quantity: 4,
        image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop&crop=center'
      },
      {
        id: 2,
        name: 'Red Onion',
        weight: '500 g',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100&h=100&fit=crop&crop=center'
      },
      {
        id: 3,
        name: 'Fresh Yellow Lemon',
        weight: '1 kg',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590502593747-42a4e2ca3aaf?w=100&h=100&fit=crop&crop=center'
      },
      {
        id: 4,
        name: 'Pomegranate',
        weight: '500 g',
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&h=100&fit=crop&crop=center'
      }
    ]
  };

  const orderSteps = [
    {
      id: 'placed',
      title: 'Order Placed',
      icon: Package,
      date: orderData.orderDate,
      time: orderData.orderTime,
      status: 'completed'
    },
    {
      id: 'accepted',
      title: 'Accepted',
      icon: CheckCircle,
      date: orderData.acceptedDate,
      time: orderData.acceptedTime,
      status: 'completed'
    },
    {
      id: 'progress',
      title: 'In Progress',
      icon: Clock,
      date: 'Expected',
      time: orderData.expectedInProgressDate,
      status: 'pending'
    },
    {
      id: 'onway',
      title: 'On the Way',
      icon: Truck,
      date: 'Expected',
      time: orderData.expectedOnWayDate,
      status: 'pending'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      icon: MapPin,
      date: 'Expected',
      time: orderData.expectedDeliveryDate,
      status: 'pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span className="text-gray-900">Track Your Order</span>
          </div>
        </div>

        {/* Order Status Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Status</h3>
              <p className="text-gray-600">Order ID: {orderData.orderId}</p>
            </div>

            {/* Progress Timeline */}
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200">
                <div 
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: '25%' }} // 2 out of 5 steps completed
                />
              </div>

              {/* Steps */}
              <div className="grid grid-cols-5 gap-4">
                {orderSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = step.status === 'completed';
                  const isCurrent = index === 1; // Currently on "Accepted" step
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center text-center">
                      {/* Icon */}
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-3 relative z-10
                        ${isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isCurrent 
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }
                      `}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      {/* Title */}
                      <h4 className={`
                        font-medium text-sm mb-1
                        ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}
                      `}>
                        {step.title}
                      </h4>
                      
                      {/* Date and Time */}
                      <div className="text-xs text-gray-500">
                        <div>{step.date}</div>
                        <div>{step.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Products</h3>
            
            <div className="space-y-4">
              {orderData.products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.weight} | {product.quantity} Qty.</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-3xl">📦</div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600">Free shipping for order above $50</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-3xl">💳</div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Flexible Payment</h4>
              <p className="text-sm text-gray-600">Multiple secure payment options</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-3xl">🕐</div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">24x7 Support</h4>
              <p className="text-sm text-gray-600">We support online all days</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}