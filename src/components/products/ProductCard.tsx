"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { ShoppingCart, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const router = useRouter();
  const { data: session } = useSession();

  const handleBuyNow = () => {
    if (!session) {
      alert("Please login or sign up first to continue with your purchase.");
      router.push("/login?callbackUrl=/checkout");
      return;
    }

    addToCart(product, 1);
    router.push("/checkout");
  };

  const isWished = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="madhubani-card flex flex-col group overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-[#fdfaf3] overflow-hidden p-6 flex items-center justify-center border-b-[3px] border-double border-maroon">
        {product.isBestseller && (
          <div className="absolute top-4 left-4 z-10 bg-mustard text-dark-text text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Bestseller
          </div>
        )}
        <button 
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur p-2 rounded-full text-maroon hover:bg-maroon hover:text-white transition-colors shadow-sm"
        >
          <Heart size={20} fill={isWished ? "currentColor" : "none"} />
        </button>
        <Link href={`/products/${product.id}`} className="relative w-full h-full transition-transform duration-500 group-hover:scale-110 block">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-contain drop-shadow-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`} className="hover:underline">
            <h3 className="font-playfair font-bold text-xl text-maroon line-clamp-1">{product.name}</h3>
          </Link>
        </div>
        <p className="text-dark-text/70 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex justify-between items-end mt-auto pt-4 border-t border-maroon/5 mb-4">
          <div>
            <span className="text-xs text-dark-text/50 block mb-1">Net Wt. {product.weight}</span>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-2xl text-dark-text">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-dark-text/40 line-through">₹{product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-3 w-full">
          <button 
            onClick={() => {
              if (!session) {
                localStorage.setItem("pending_cart_item", JSON.stringify({ product, quantity: 1 }));
                router.push("/login?callbackUrl=" + window.location.pathname);
                return;
              }
              addToCart(product, 1);
              alert("Product added to cart successfully.");
            }}
            className="flex-1 bg-white border-[3px] border-double border-maroon text-maroon font-bold py-2.5 hover:bg-maroon hover:text-white transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-terracotta text-ivory font-bold py-2.5 border-[3px] border-double border-maroon hover:bg-maroon hover:text-mustard transition-colors shadow-md"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
