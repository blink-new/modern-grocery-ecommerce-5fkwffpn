import { ArrowLeft, User, MapPin, CreditCard, Package, Settings, Heart, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface MyAccountPageProps {
  onBack: () => void;
}

export default function MyAccountPage({ onBack }: MyAccountPageProps) {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    memberSince: "January 2023",
    totalOrders: 24,
    totalSpent: 1247.50
  };

  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 89.50,
      items: 8
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      status: "Delivered",
      total: 156.25,
      items: 12
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "Delivered", 
      total: 73.80,
      items: 6
    }
  ];

  const menuItems = [
    {
      icon: Package,
      title: "Order History",
      description: "View all your past orders",
      action: () => console.log("Order History")
    },
    {
      icon: MapPin,
      title: "Delivery Addresses",
      description: "Manage your delivery locations",
      action: () => console.log("Addresses")
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage cards and payment options",
      action: () => console.log("Payment")
    },
    {
      icon: Heart,
      title: "Favorites",
      description: "Your saved products",
      action: () => console.log("Favorites")
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your preferences",
      action: () => console.log("Notifications")
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Update your profile information",
      action: () => console.log("Settings")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">My Account</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  <p className="text-sm text-gray-500 mb-4">{user.phone}</p>
                  
                  <Badge variant="secondary" className="mb-4">
                    Member since {user.memberSince}
                  </Badge>
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {user.totalOrders}
                      </div>
                      <div className="text-sm text-gray-600">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        ${user.totalSpent.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-600">Spent</div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="h-auto p-4 justify-start"
                      onClick={item.action}
                    >
                      <item.icon className="h-5 w-5 mr-3 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={order.id}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            Order {order.id}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString()} • {order.items} items
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            ${order.total.toFixed(2)}
                          </div>
                          <Badge 
                            variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      {index < recentOrders.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}