import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit2, MapPin, CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  total: number;
  onBack: () => void;
  onConfirmOrder: (orderDetails: any) => void;
}

interface SavedAddress {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  country: string;
  streetAddress: string;
  city: string;
  phone: string;
  email: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'paypal' | 'card' | 'google-pay' | 'cash-on-delivery';
  label: string;
  icon: React.ReactNode;
  details?: string;
}

export default function CheckoutPage({ cart, total, onBack, onConfirmOrder }: CheckoutPageProps) {
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    streetAddress: '',
    city: '',
    phone: '',
    email: ''
  });

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paypal');
  
  // Card details state
  const [cardDetails, setCardDetails] = useState({
    holderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'paypal',
      type: 'paypal',
      label: 'PayPal',
      icon: <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">PP</div>
    },
    {
      id: 'card',
      type: 'card',
      label: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
      details: '**** **** **** 8047'
    },
    {
      id: 'google-pay',
      type: 'google-pay',
      label: 'Google Pay',
      icon: <div className="w-6 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">G</div>
    },
    {
      id: 'cash-on-delivery',
      type: 'cash-on-delivery',
      label: 'Cash On Delivery',
      icon: <DollarSign className="w-6 h-6 text-green-600" />
    }
  ];

  // Load saved addresses from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedAddresses');
    if (saved) {
      const addresses = JSON.parse(saved);
      setSavedAddresses(addresses);
      
      // Auto-fill with default address if available
      const defaultAddress = addresses.find((addr: SavedAddress) => addr.isDefault);
      if (defaultAddress) {
        setDeliveryDetails({
          firstName: defaultAddress.firstName,
          lastName: defaultAddress.lastName,
          company: defaultAddress.company || '',
          country: defaultAddress.country,
          streetAddress: defaultAddress.streetAddress,
          city: defaultAddress.city,
          phone: defaultAddress.phone,
          email: defaultAddress.email
        });
        setSelectedAddressId(defaultAddress.id);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setDeliveryDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCardInputChange = (field: string, value: string) => {
    setCardDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressSelect = (addressId: string) => {
    const address = savedAddresses.find(addr => addr.id === addressId);
    if (address) {
      setDeliveryDetails({
        firstName: address.firstName,
        lastName: address.lastName,
        company: address.company || '',
        country: address.country,
        streetAddress: address.streetAddress,
        city: address.city,
        phone: address.phone,
        email: address.email
      });
      setSelectedAddressId(addressId);
      setShowAddressForm(false);
    }
  };

  const handleSaveAddress = () => {
    const newAddress: SavedAddress = {
      id: Date.now().toString(),
      ...deliveryDetails,
      isDefault: savedAddresses.length === 0 // First address becomes default
    };

    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    setSelectedAddressId(newAddress.id);
    setShowAddressForm(false);
  };

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = total;
  const shipping = 0; // Free shipping
  const taxes = 0; // No taxes for demo
  const couponDiscount = 10; // Demo discount
  const finalTotal = subtotal + shipping + taxes - couponDiscount;

  const handleConfirmOrder = () => {
    const orderDetails = {
      orderId: `#SOD${Date.now().toString().slice(-6)}`,
      paymentMethod: selectedPaymentMethod === 'cash-on-delivery' ? 'Cash On Delivery' : 'PayPal',
      transactionId: selectedPaymentMethod === 'cash-on-delivery' ? null : `TR${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      deliveryDetails,
      cart,
      subtotal,
      shipping,
      taxes,
      couponDiscount,
      total: finalTotal
    };
    onConfirmOrder(orderDetails);
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
            Back to Cart
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span>Shopping Cart</span>
            <span>/</span>
            <span className="text-gray-900">Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment & Delivery */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Payment Method Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex items-center gap-3 flex-1">
                        {method.icon}
                        <div className="flex-1">
                          <Label htmlFor={method.id} className="font-medium cursor-pointer">
                            {method.label}
                          </Label>
                          {method.details && (
                            <p className="text-sm text-gray-600">{method.details}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {/* Add New Credit/Debit Card Form */}
                {selectedPaymentMethod === 'card' && (
                  <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Add New Credit/Debit Card</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardHolderName">Card Holder Name *</Label>
                        <Input
                          id="cardHolderName"
                          placeholder="Ex. John Doe"
                          value={cardDetails.holderName}
                          onChange={(e) => handleCardInputChange('holderName', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="4716 8627 1635 8047"
                          value={cardDetails.cardNumber}
                          onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="02/30"
                            value={cardDetails.expiryDate}
                            onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="000"
                            value={cardDetails.cvv}
                            onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="saveCard" 
                          checked={cardDetails.saveCard}
                          onCheckedChange={(checked) => handleCardInputChange('saveCard', checked.toString())}
                        />
                        <Label htmlFor="saveCard" className="text-sm">
                          Save card for future payments
                        </Label>
                      </div>

                      <Button className="bg-green-600 hover:bg-green-700">
                        Add Card
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Address Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Saved Addresses */}
                {savedAddresses.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">Saved Addresses</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddressForm(!showAddressForm)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add New Address
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedAddresses.map((address) => (
                        <Card 
                          key={address.id}
                          className={`cursor-pointer transition-all ${
                            selectedAddressId === address.id 
                              ? 'ring-2 ring-green-500 border-green-500' 
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => handleAddressSelect(address.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span className="font-medium text-sm">
                                  {address.firstName} {address.lastName}
                                </span>
                              </div>
                              {address.isDefault && (
                                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              {address.streetAddress}
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                              {address.city}, {address.country}
                            </p>
                            <span className="text-xs text-gray-500">{address.phone}</span>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Address Form */}
                {(showAddressForm || savedAddresses.length === 0) && (
                  <div className="space-y-4">
                    {savedAddresses.length > 0 && (
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">Add New Address</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddressForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Ex. John"
                          value={deliveryDetails.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Ex. Doe"
                          value={deliveryDetails.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="company">Company Name (Optional)</Label>
                      <Input
                        id="company"
                        placeholder="Enter Company Name"
                        value={deliveryDetails.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Select value={deliveryDetails.country} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="streetAddress">Street Address *</Label>
                      <Input
                        id="streetAddress"
                        placeholder="Enter Street Address"
                        value={deliveryDetails.streetAddress}
                        onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Enter City"
                        value={deliveryDetails.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        placeholder="Enter Phone Number"
                        value={deliveryDetails.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter Email Address"
                        value={deliveryDetails.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    {(showAddressForm || savedAddresses.length === 0) && (
                      <Button
                        onClick={handleSaveAddress}
                        className="w-full md:w-auto bg-green-600 hover:bg-green-700"
                        disabled={!deliveryDetails.firstName || !deliveryDetails.lastName || !deliveryDetails.streetAddress}
                      >
                        Save Address
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
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
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white" 
                  size="lg"
                  disabled={!deliveryDetails.firstName || !deliveryDetails.lastName || !deliveryDetails.streetAddress}
                  onClick={handleConfirmOrder}
                >
                  {selectedPaymentMethod === 'cash-on-delivery' ? 'Confirm Order' : 'Proceed to Payment'}
                </Button>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <div className="text-2xl">📦</div>
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
                    <div className="text-2xl">💳</div>
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
                    <div className="text-2xl">🕐</div>
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
      </div>
    </div>
  );
}