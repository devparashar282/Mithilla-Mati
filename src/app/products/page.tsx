"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/products/ProductCard";
import { products, Category } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories: (Category | "All")[] = ["All", "Raw", "Roasted", "Sweet"];

  const filteredAndSortedProducts = useMemo(() => {
    // Filter
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      // featured: bestsellers first, then by id
      if (sortBy === "featured") {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [activeCategory, sortBy]);

  return (
    <main className="flex min-h-screen flex-col bg-ivory pt-[88px]">

      {/* Hero Banner */}
      <section className="bg-maroon py-16 md:py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4A017\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="relative z-10">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-mustard mb-4 drop-shadow-md">
            Our Premium Collection
          </h1>
          <p className="font-sans text-lg md:text-xl text-ivory/90 max-w-2xl mx-auto drop-shadow">
            Discover the authentic taste of Mithila. Hand-harvested, perfectly roasted, and crafted for your health.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-grow">
        
        {/* Controls (Filter & Sort) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-maroon/10 gap-6">
          
          {/* Categories (Desktop) */}
          <div className="hidden md:flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-maroon text-ivory shadow-md" 
                    : "bg-white text-dark-text/70 border border-maroon/20 hover:border-maroon hover:text-maroon"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden w-full flex items-center justify-center space-x-2 bg-white border border-maroon/20 py-3 rounded-xl text-maroon font-medium"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={20} />
            <span>Filter by Category ({activeCategory})</span>
          </button>

          {/* Categories (Mobile) */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden w-full overflow-hidden flex flex-wrap gap-2"
              >
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setIsFilterOpen(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === category 
                        ? "bg-maroon text-ivory shadow-md" 
                        : "bg-white text-dark-text/70 border border-maroon/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sorting */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end relative group">
            <span className="text-dark-text/60 font-medium whitespace-nowrap">Sort by:</span>
            <div className="relative w-full md:w-48">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full appearance-none bg-white border border-maroon/20 text-maroon font-medium rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-mustard/50 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-maroon pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-dark-text/50 font-playfair mb-4">No products found in this category.</p>
            <button 
              onClick={() => setActiveCategory("All")}
              className="text-maroon font-medium hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </section>

    </main>
  );
}
