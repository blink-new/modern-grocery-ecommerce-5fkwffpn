import { useState } from 'react';
import { ShoppingCart, Search, Menu, User, Heart } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
import { Card, CardContent } from './components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { products, categories, featuredProducts } from './data/products';
import { CartItem, Product } from './types';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import CartSidebar from './components/CartSidebar';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import SearchResults from './components/SearchResults';
import HeroSection from './components/HeroSection';
import PromoBanner from './components/PromoBanner';
import ProductPage from './components/ProductPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import TrackOrderPage from './components/TrackOrderPage';
import DeliveryInfoSection from './components/DeliveryInfoSection';
import Footer from './components/Footer';
import AccountSettingsPage from './components/AccountSettingsPage';
import WishlistPage from './components/WishlistPage';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showCheckoutPage, setShowCheckoutPage] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity`);
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart`);
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast.success('Item removed from cart');
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const handleShowCartPage = () => {
    setShowCartPage(true);
    setIsCartOpen(false);
    setSelectedProduct(null);
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const handleBackFromCart = () => {
    setShowCartPage(false);
  };

  const handleShowCheckout = () => {
    setShowCheckoutPage(true);
    setShowCartPage(false);
    setIsCartOpen(false);
    setSelectedProduct(null);
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const handleBackFromCheckout = () => {
    setShowCheckoutPage(false);
    setShowCartPage(true);
  };

  const handleConfirmOrder = (details: any) => {
    setOrderDetails(details);
    setShowOrderConfirmation(true);
    setShowCheckoutPage(false);
    setCart([]); // Clear cart after order confirmation
    toast.success('Order confirmed successfully!');
  };

  const handleBackToHome = () => {
    setShowOrderConfirmation(false);
    setShowTrackOrder(false);
    setOrderDetails(null);
    setSelectedProduct(null);
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const handleShowTrackOrder = () => {
    setShowTrackOrder(true);
    setShowOrderConfirmation(false);
    setSelectedProduct(null);
    setSearchQuery('');
    setSelectedCategory(null);
  };

  const handleBackFromTrackOrder = () => {
    setShowTrackOrder(false);
  };

  const handleShowMyAccount = () => {
    setShowMyAccount(true);
    setSelectedProduct(null);
    setSearchQuery('');
    setSelectedCategory(null);
    setShowCartPage(false);
    setShowCheckoutPage(false);
    setShowOrderConfirmation(false);
    setShowTrackOrder(false);
    setShowWishlist(false);
  };

  const handleBackFromMyAccount = () => {
    setShowMyAccount(false);
  };

  const handleShowWishlist = () => {
    setShowWishlist(true);
    setSelectedProduct(null);
    setSearchQuery('');
    setSelectedCategory(null);
    setShowCartPage(false);
    setShowCheckoutPage(false);
    setShowOrderConfirmation(false);
    setShowTrackOrder(false);
    setShowMyAccount(false);
  };

  const handleBackFromWishlist = () => {
    setShowWishlist(false);
  };

  // Generate recommended products based on the selected product
  const getRecommendedProducts = (currentProduct: Product) => {
    // Get products from the same category
    const sameCategory = products.filter(p => 
      p.category === currentProduct.category && p.id !== currentProduct.id
    );
    
    // Get highly rated products from other categories
    const otherHighRated = products.filter(p => 
      p.category !== currentProduct.category && p.rating >= 4.5
    );
    
    // Combine and shuffle, then take first 4
    const recommended = [...sameCategory, ...otherHighRated]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    return recommended;
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const showSearchResults = searchQuery.length > 0;
  const showCategoryFilter = selectedCategory !== null;
  const showProductPage = selectedProduct !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="py-6">
                    <h2 className="text-lg font-semibold mb-4">Menu</h2>
                    <div className="space-y-2 mb-6">
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          handleShowWishlist();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Heart className="h-4 w-4 mr-3" />
                        Wishlist
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          handleShowMyAccount();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <User className="h-4 w-4 mr-3" />
                        My Account
                      </Button>
                    </div>
                    
                    <h2 className="text-lg font-semibold mb-4">Categories</h2>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🛒</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">FreshMart</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search for fresh groceries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex"
                onClick={handleShowWishlist}
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex"
                onClick={handleShowMyAccount}
              >
                <User className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={showProductPage || showCartPage || showCheckoutPage || showOrderConfirmation || showTrackOrder || showMyAccount || showWishlist ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"}>
        {showWishlist ? (
          <WishlistPage
            onBack={handleBackFromWishlist}
          />
        ) : showMyAccount ? (
          <AccountSettingsPage
            onBack={handleBackFromMyAccount}
          />
        ) : showTrackOrder ? (
          <TrackOrderPage
            onBack={handleBackFromTrackOrder}
          />
        ) : showOrderConfirmation ? (
          <OrderConfirmationPage
            orderDetails={orderDetails}
            onBackToHome={handleBackToHome}
            onTrackOrder={handleShowTrackOrder}
          />
        ) : showCheckoutPage ? (
          <CheckoutPage
            cart={cart}
            total={cartTotal}
            onBack={handleBackFromCheckout}
            onConfirmOrder={handleConfirmOrder}
          />
        ) : showCartPage ? (
          <CartPage
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            total={cartTotal}
            onBack={handleBackFromCart}
            onCheckout={handleShowCheckout}
          />
        ) : showProductPage ? (
          <ProductPage
            product={selectedProduct}
            onBack={handleBackToProducts}
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
            recommendedProducts={getRecommendedProducts(selectedProduct)}
          />
        ) : showSearchResults ? (
          <SearchResults 
            query={searchQuery}
            products={filteredProducts}
            onAddToCart={addToCart}
            onProductClick={handleProductClick}
            onClearSearch={() => setSearchQuery('')}
          />
        ) : showCategoryFilter ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <Badge variant="secondary">
                  {filteredProducts.length} products
                </Badge>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
              >
                View All Categories
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onProductClick={handleProductClick}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <HeroSection />

            {/* Promotional Banners */}
            <PromoBanner />

            {/* Categories */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map(category => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => setSelectedCategory(category.id)}
                  />
                ))}
              </div>
            </section>

            {/* Featured Products */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Featured Products</h3>
                <Button variant="outline">View All</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>
            </section>

            {/* Delivery Information */}
            <DeliveryInfoSection />
          </>
        )}
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        total={cartTotal}
        onViewCart={handleShowCartPage}
        onCheckout={handleShowCheckout}
      />

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#16a34a',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;