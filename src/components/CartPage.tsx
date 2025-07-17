import { useState } from 'react';
import { ArrowLeft, Plus, Minus, X, Truck, CreditCard, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  total: number;
  onBack: () => void;
  onCheckout: () => void;
}

export default function CartPage({ cart, onUpdateQuantity, onRemoveItem, total, onBack, onCheckout }: CartPageProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = total;
  const shipping = 0; // Free shipping
  const taxes = 0; // No taxes for demo
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const finalTotal = subtotal + shipping + taxes - couponDiscount;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon({ code: couponCode, discount: 10 });
      setCouponCode('');
    }
  };

  const handleClearCart = () => {
    cart.forEach(item => onRemoveItem(item.product.id));
  };

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
            Back to Shopping
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span>Shopping Cart</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-4xl">🛒</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some fresh groceries to get started!</p>
            <Button onClick={onBack} className="bg-primary hover:bg-primary/90">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-0">
                  {/* Table Header */}
                  <div className="bg-amber-400 px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 font-medium text-gray-900">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-center">Subtotal</div>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="divide-y">
                    {cart.map((item) => (
                      <div key={item.product.id} className="px-6 py-6">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          {/* Remove Button & Product */}
                          <div className="col-span-6 flex items-center gap-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-400 hover:text-red-500"
                              onClick={() => onRemoveItem(item.product.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                              <p className="text-sm text-gray-600">{item.product.unit}</p>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="col-span-2 text-center">
                            <span className="font-medium">${item.product.price.toFixed(2)}</span>
                          </div>

                          {/* Quantity */}
                          <div className="col-span-2 flex items-center justify-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium min-w-[2rem] text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Subtotal */}
                          <div className="col-span-2 text-center">
                            <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Section */}
                  <div className="px-6 py-4 border-t bg-gray-50">
                    <div className="flex items-center gap-4">
                      <Input
                        placeholder="Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button 
                        onClick={handleApplyCoupon}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Apply Coupon
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleClearCart}
                        className="ml-auto"
                      >
                        Clear Shopping Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Items</span>
                      <span>{itemCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sub Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span className="text-green-600">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxes</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Coupon Discount</span>
                        <span>-${couponDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white mb-4" 
                    size="lg"
                    onClick={onCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Truck className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Free Shipping</h4>
                      <p className="text-xs text-gray-600">Free shipping for order above $50</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Flexible Payment</h4>
                      <p className="text-xs text-gray-600">Multiple secure payment options</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">24x7 Support</h4>
                      <p className="text-xs text-gray-600">We support online all days</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}