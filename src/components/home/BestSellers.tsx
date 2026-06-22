import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Eye } from "lucide-react";

const products = [
  { id: "plain-prasadam", name: "Plain Prasadam (Raw)", price: "₹199", oldPrice: "₹249", weight: "100g", image: "/Plain Prasadam.png", tag: "Best Seller" },
  { id: "feirly-peri-peri", name: "Feirly Peri Peri", price: "₹279", oldPrice: "₹329", weight: "100g", image: "/Feirly Peri Peri.png", tag: "Spicy" },
  { id: "himalayan-pink-salt", name: "Himalayan Pink Salt", price: "₹249", oldPrice: "₹299", weight: "100g", image: "/Himalyan Pink salt.png", tag: "" },
  { id: "white-chedaar", name: "White Cheddar", price: "₹279", oldPrice: "₹329", weight: "100g", image: "/White Chedaar.png", tag: "New" },
];

export default function BestSellers() {
  return (
    <section className="py-24 bg-[#FFFaf0] relative border-y-8 border-double border-mustard">
      {/* Decorative SVG Corner Background */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 L100 0 L0 100 Z\' fill=\'%238B1E3F\'/%3E%3C/svg%3E')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-4 tracking-wide">
              Best Selling <span className="text-terracotta">Products</span>
            </h2>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1 bg-mustard"></div>
              <div className="w-3 h-3 bg-maroon rounded-full"></div>
              <div className="w-16 h-1 bg-mustard"></div>
            </div>
          </div>
          <Link href="/products" className="hidden sm:block text-maroon font-bold hover:text-terracotta transition-colors border-b-2 border-dashed border-terracotta pb-1">
            View All Products &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow relative">
              {product.tag && (
                <div className="absolute top-4 left-4 z-10 bg-mustard text-dark-text text-xs font-bold px-3 py-1 rounded-full">
                  {product.tag}
                </div>
              )}
              <Link href={`/products/${product.id}`} className="relative h-64 w-full bg-ivory flex items-center justify-center overflow-hidden block">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
                />
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="bg-white p-3 rounded-full text-maroon hover:bg-mustard hover:text-dark-text transition-colors">
                    <Heart size={20} />
                  </button>
                  <button className="bg-white p-3 rounded-full text-maroon hover:bg-mustard hover:text-dark-text transition-colors">
                    <Eye size={20} />
                  </button>
                </div>
              </Link>
              
              <div className="p-5 text-center">
                <p className="text-gray-500 text-sm mb-1">{product.weight}</p>
                <Link href={`/products/${product.id}`} className="hover:underline">
                  <h3 className="font-playfair font-semibold text-lg text-dark-text mb-2 line-clamp-1">{product.name}</h3>
                </Link>
                <div className="flex justify-center items-center gap-2 mb-4">
                  <span className="font-bold text-mithila-red text-xl">{product.price}</span>
                  <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
                </div>
                
                <button className="w-full py-3 border border-mithila-red text-mithila-red font-medium rounded hover:bg-mithila-red hover:text-ivory transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
