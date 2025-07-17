import { useState } from 'react';
import { ArrowLeft, X, Copy, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Product } from '../types';

interface WishlistPageProps {
  onBack: () => void;
}

// Sample wishlist data based on the image
const wishlistItems = [
  {
    id: '1',
    name: 'Fresh Green Apple',
    weight: '500 g',
    price: 12.00,
    dateAdded: '15 July 2024',
    status: 'Instock',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=80&h=80&fit=crop'
  },
  {
    id: '2', 
    name: 'Fresh Tomato',
    weight: '500 g',
    price: 7.50,
    dateAdded: '12 July 2024',
    status: 'Instock',
    image: 'https://images.unsplash.com/photo-1546470427-e5ac89cd0b31?w=80&h=80&fit=crop'
  },
  {
    id: '3',
    name: 'Green Bell Peppers', 
    weight: '250 g',
    price: 8.00,
    dateAdded: '12 July 2024',
    status: 'Instock',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=80&h=80&fit=crop'
  },
  {
    id: '4',
    name: 'Pineapple',
    weight: '750 g', 
    price: 15.00,
    dateAdded: '11 July 2024',
    status: 'Instock',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=80&h=80&fit=crop'
  },
  {
    id: '5',
    name: 'Gold Bangles',
    weight: '500 g',
    price: 12.00,
    dateAdded: '11 July 2024', 
    status: 'Instock',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=80&h=80&fit=crop'
  }
];

const WishlistPage = ({ onBack }: WishlistPageProps) => {
  const [items, setItems] = useState(wishlistItems);
  const wishlistLink = "https://www.example.com";

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addToCart = (id: string) => {
    // Add to cart logic here
    console.log('Adding item to cart:', id);
  };

  const addAllToCart = () => {
    // Add all items to cart logic here
    console.log('Adding all items to cart');
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(wishlistLink);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <span>Home</span>
          <span>/</span>
          <span className="text-gray-900">Wishlist</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">💝</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Start adding items you love to your wishlist</p>
            <Button onClick={onBack}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            {/* Wishlist Table Header */}
            <div className="bg-amber-400 rounded-lg mb-6">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium text-gray-900">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Date Added</div>
                <div className="col-span-2 text-center">Stock Status</div>
                <div className="col-span-1 text-center">Action</div>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-12 gap-4 items-center px-6 py-4">
                      {/* Remove Button & Product */}
                      <div className="col-span-5 flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.weight}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <span className="font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                      </div>

                      {/* Date Added */}
                      <div className="col-span-2 text-center">
                        <span className="text-sm text-gray-600">{item.dateAdded}</span>
                      </div>

                      {/* Stock Status */}
                      <div className="col-span-2 text-center">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                          {item.status}
                        </Badge>
                      </div>

                      {/* Add to Cart Button */}
                      <div className="col-span-1 text-center">
                        <Button
                          size="sm"
                          onClick={() => addToCart(item.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Wishlist Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Wishlist link:</span>
                <div className="flex items-center space-x-2">
                  <code className="bg-gray-100 px-3 py-1 rounded text-sm">{wishlistLink}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyLink}
                    className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Link
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={clearWishlist}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Clear Wishlist
                </Button>
                <Button
                  onClick={addAllToCart}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Add All to Cart
                </Button>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                  <p className="text-sm text-gray-600">Free shipping for order above $50</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💳</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Flexible Payment</h3>
                  <p className="text-sm text-gray-600">Multiple secure payment options</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">24x7 Support</h3>
                  <p className="text-sm text-gray-600">We support online all days</p>
                </div>
              </div>
            </div>


          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;