
import React from "react";
import { ExternalLink, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AffiliateProduct } from "@/types/marketplace";

interface ProductCardProps {
  product: AffiliateProduct;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured }) => {
  return (
    <Card 
      className={`overflow-hidden ${featured 
        ? "border-2 border-purple-200 hover:border-purple-400 transition-all" 
        : "hover:shadow-lg transition-shadow"}`}
    >
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.discount && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {product.discount}
          </Badge>
        )}
        {featured && (
          <Badge className="absolute top-2 left-2 bg-purple-500">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className={`${featured ? "text-xl" : "text-lg"} font-bold`}>{product.name}</h3>
        </div>
        <p className={`text-gray-500 ${featured ? "" : "text-sm"} mb-4`}>{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className={featured ? "bg-purple-50 text-purple-700" : "text-xs"}
            >
              {featured && <Tag className="mr-1 h-3 w-3" />}
              {tag}
            </Badge>
          ))}
        </div>
        <a 
          href={product.affiliateUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <Button 
            variant={featured ? "default" : "outline"} 
            className={`w-full ${featured 
              ? "bg-purple-600 hover:bg-purple-700" 
              : "border-purple-300 text-purple-700 hover:bg-purple-50"}`}
          >
            {featured ? "Get Special Deal" : "View Details"}
            {featured ? <ExternalLink className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
