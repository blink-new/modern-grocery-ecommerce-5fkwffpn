import { X, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface SearchResultsProps {
  query: string;
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onProductClick: (product: Product) => void;
  onClearSearch: () => void;
}

export default function SearchResults({ 
  query, 
  products, 
  onAddToCart, 
  onProductClick,
  onClearSearch 
}: SearchResultsProps) {
  return (
    <div>
      {/* Search Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              Search results for "{query}"
            </h2>
          </div>
          <Badge variant="secondary">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </Badge>
        </div>
        <Button 
          variant="outline" 
          onClick={onClearSearch}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear Search
        </Button>
      </div>

      {/* Results */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            Try searching with different keywords or browse our categories.
          </p>
          <Button onClick={onClearSearch} variant="outline">
            Browse All Products
          </Button>
        </div>
      )}
    </div>
  );
}