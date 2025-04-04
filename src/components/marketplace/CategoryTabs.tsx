
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp } from "lucide-react";
import ProductCard from "./ProductCard";
import { AffiliateProduct } from "@/types/marketplace";

interface CategoryTabsProps {
  categories: { value: string; label: string }[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  featuredProducts: AffiliateProduct[];
  regularProducts: AffiliateProduct[];
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  featuredProducts,
  regularProducts,
}) => {
  return (
    <Tabs defaultValue="all" className="mb-12" onValueChange={setSelectedCategory} value={selectedCategory}>
      <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
        {categories.map((category) => (
          <TabsTrigger key={category.value} value={category.value}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={selectedCategory}>
        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <ThumbsUp className="mr-2 h-5 w-5" />
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
          </h2>
          {regularProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
              <p className="text-gray-500">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CategoryTabs;
