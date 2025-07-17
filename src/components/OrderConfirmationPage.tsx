import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { CartItem } from '../types';

interface OrderConfirmationPageProps {
  orderDetails: {
    orderId: string;
    paymentMethod: string;
    transactionId: string;
    estimatedDeliveryDate: string;
    deliveryDetails: any;
    cart: CartItem[];
    subtotal: number;
    shipping: number;
    taxes: number;
    couponDiscount: number;
    total: number;
  };
  onBackToHome: () => void;
  onTrackOrder: () => void;
}

export default function OrderConfirmationPage({ orderDetails, onBackToHome, onTrackOrder }: OrderConfirmationPageProps) {
  const handleDownloadInvoice = () => {
    // In a real app, this would generate and download a PDF invoice
    alert('Invoice download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={onBackToHome}
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Completed</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span className="text-gray-900">Order Completed</span>
          </div>
        </div>

        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your order is completed!</h2>
          <p className="text-gray-600 mb-4">Thank you. Your Order has been received.</p>
          <Button 
            onClick={onTrackOrder}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
          >
            Track Your Order
          </Button>
        </div>

        {/* Order Summary Card */}
        <Card className="mb-8 bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Order ID</h4>
                <p className="text-gray-700">{orderDetails.orderId}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Payment Method</h4>
                <p className="text-gray-700">{orderDetails.paymentMethod}</p>
              </div>
              {orderDetails.transactionId && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Transaction ID</h4>
                  <p className="text-gray-700">{orderDetails.transactionId}</p>
                </div>
              )}
              <div className="flex items-center justify-between md:justify-start">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Estimated Delivery Date</h4>
                  <p className="text-gray-700">{orderDetails.estimatedDeliveryDate}</p>
                </div>
                {orderDetails.transactionId && (
                  <Button 
                    onClick={handleDownloadInvoice}
                    className="bg-amber-500 hover:bg-amber-600 text-white ml-4"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center font-medium">
                <span>Products</span>
                <span>Sub Total</span>
              </div>
              
              {orderDetails.cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">{item.product.unit}</p>
                    </div>
                  </div>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderDetails.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${orderDetails.taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-${orderDetails.couponDiscount.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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