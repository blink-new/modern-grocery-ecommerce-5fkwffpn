import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {/* Category Image */}
          <div className="aspect-square bg-gray-100">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className="font-semibold text-center text-sm sm:text-base mb-1">
              {category.name}
            </h3>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {category.productCount} items
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}