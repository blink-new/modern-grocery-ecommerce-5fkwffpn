import { useState } from 'react';
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
  recommendedProducts: Product[];
}

export default function ProductPage({ product, onBack, onAddToCart, onProductClick, recommendedProducts }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Mock additional images for the product
  const productImages = [
    product.image,
    product.image, // In a real app, these would be different angles/views
    product.image,
    product.image
  ];

  // Mock size options for certain products
  const sizeOptions = product.category === 'produce' 
    ? ['Small', 'Medium', 'Large'] 
    : product.category === 'pantry' 
    ? ['250g', '500g', '1kg'] 
    : [];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)}>
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 mb-4">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {discountPercentage > 0 && (
                <Badge className="bg-red-500 hover:bg-red-600 text-white">
                  -{discountPercentage}% OFF
                </Badge>
              )}
              {product.tags?.map(tag => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-sm text-gray-500">{product.unit}</span>
              </div>
              {discountPercentage > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  You save ${((product.originalPrice || 0) - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Size Selection */}
            {sizeOptions.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            {product.inStock ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-medium text-lg min-w-[3rem] text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Badge variant="destructive" className="text-base px-4 py-2">
                  Out of Stock
                </Badge>
                <Button variant="outline" size="lg" className="w-full">
                  Notify When Available
                </Button>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">On orders $35+</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Quality Guarantee</p>
                <p className="text-xs text-gray-500">100% fresh</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description} This premium quality product is carefully selected to ensure 
                    the best taste and nutritional value. Perfect for everyday cooking and healthy meal preparation.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Key Features:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Premium quality and freshness guaranteed</li>
                      <li>Carefully sourced from trusted suppliers</li>
                      <li>Perfect for various cooking applications</li>
                      <li>Rich in essential nutrients</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nutrition" className="mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Nutritional Information</h3>
                  {product.nutritionalInfo ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{product.nutritionalInfo.calories}</div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{product.nutritionalInfo.protein}</div>
                        <div className="text-sm text-gray-600">Protein</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{product.nutritionalInfo.carbs}</div>
                        <div className="text-sm text-gray-600">Carbs</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{product.nutritionalInfo.fat}</div>
                        <div className="text-sm text-gray-600">Fat</div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">Nutritional information not available for this product.</p>
                  )}
                </div>
              </TabsContent>
              

            </Tabs>
          </CardContent>
        </Card>

        {/* Recommended Products */}
        <section>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map(recommendedProduct => (
              <ProductCard
                key={recommendedProduct.id}
                product={recommendedProduct}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}