"use client";

import { motion } from "framer-motion";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function WishlistPage() {
  // Mock Data
  const wishlistItems = [
    {
      id: 1,
      name: "Premium Phool Makhana",
      image: "/images/premium-makhana.png",
      price: 250,
      inStock: true
    },
    {
      id: 2,
      name: "Peri Peri Makhana",
      image: "/images/peri-peri-makhana.png",
      price: 120,
      inStock: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
        <h1 className="font-playfair text-2xl font-bold text-maroon mb-1">My Wishlist</h1>
        <p className="text-dark-text/70 text-sm">Save your favorite products for later.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="madhubani-card flex flex-col group overflow-hidden bg-white/80"
          >
            {/* Image */}
            <div className="relative w-full aspect-square bg-[#fdfaf3] overflow-hidden p-6 flex items-center justify-center border-b-[3px] border-double border-maroon">
              <button className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors shadow-sm">
                <Trash2 size={18} />
              </button>
              {!item.inStock && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-0 flex items-center justify-center">
                  <span className="bg-maroon text-ivory font-bold px-4 py-2 rounded uppercase tracking-widest text-sm shadow-md">Out of Stock</span>
                </div>
              )}
              <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-maroon/20">M</div>
                {/* Fallback styling placeholder for mock image */}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-playfair font-bold text-lg text-maroon line-clamp-1 mb-2">{item.name}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-xl text-dark-text">₹{item.price}</span>
              </div>
              
              <button 
                disabled={!item.inStock}
                className="w-full bg-mithila-red text-ivory font-bold py-2.5 rounded hover:bg-maroon transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-auto"
              >
                <ShoppingCart size={18} className="mr-2" />
                Move to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
