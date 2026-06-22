"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { products, Product } from "@/lib/data";
import { useCart } from "@/components/providers/CartProvider";
import { useSession } from "next-auth/react";
import { 
  Star, Minus, Plus, ShoppingCart, Heart, Share2, 
  MapPin, CalendarDays, Truck, ShieldCheck, ChevronRight,
  Link as LinkIcon, Smartphone, CreditCard
} from "lucide-react";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews">("description");
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Find Product
  const product = products.find(p => p.id === params.id);

  // Track Recently Viewed Products
  useEffect(() => {
    if (product) {
      const viewedJSON = localStorage.getItem("recentlyViewed");
      let viewed: Product[] = viewedJSON ? JSON.parse(viewedJSON) : [];
      
      // Remove current if exists, then prepend
      viewed = viewed.filter(p => p.id !== product.id);
      viewed.unshift(product);
      
      // Keep only last 4
      if (viewed.length > 4) viewed = viewed.slice(0, 4);
      
      localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
      setRecentlyViewed(viewed.filter(p => p.id !== product.id)); // Don't show current product in recently viewed
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center pt-[88px]">
        <h1 className="text-4xl font-playfair font-bold text-maroon mb-4">Product Not Found</h1>
        <p className="text-dark-text/70 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link href="/products" className="bg-maroon text-ivory px-8 py-3 rounded-full hover:bg-mustard hover:text-dark-text font-bold transition-colors">
          Back to Products
        </Link>
      </div>
    );
  }

  // Related Products (Same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isWished = isInWishlist(product.id);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) setQuantity(prev => prev - 1);
    if (type === "increase" && quantity < 10) setQuantity(prev => prev + 1);
  };

  const handleBuyNow = () => {
    if (!session) {
      alert("Please login or sign up first to continue with your purchase.");
      router.push("/login?callbackUrl=/checkout");
      return;
    }
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} from Mithila Maati!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-ivory pt-[88px] pb-20">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-maroon/10 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-dark-text/60">
          <Link href="/products" className="hover:text-maroon">Traditional Food</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/products" className="hover:text-maroon">Mithilanchal Products</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-maroon font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          
          {/* Left: Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-[#fdfaf3] rounded-2xl overflow-hidden border border-maroon/20 group cursor-crosshair">
              {product.isBestseller && (
                <div className="absolute top-4 left-4 z-10 bg-mustard text-dark-text text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  Bestseller
                </div>
              )}
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain p-8 group-hover:scale-150 transition-transform duration-500 origin-center"
              />
            </div>
            {/* Thumbnails (Mocked to same image for now) */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className={`relative w-24 aspect-square bg-white rounded-xl border-2 flex-shrink-0 cursor-pointer overflow-hidden ${i === 0 ? 'border-maroon' : 'border-transparent hover:border-maroon/30'}`}>
                  <Image src={product.image} alt={`Thumbnail ${i}`} fill className="object-contain p-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-dark-text mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-mustard">
                <span className="mr-1">★★★★★</span>
                <span className="text-dark-text/60 text-sm ml-1 font-medium">(245 Reviews)</span>
              </div>
              <span className="text-maroon/30">|</span>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">In Stock</span>
            </div>

            <div className="mb-8 border-b border-maroon/10 pb-8">
              <div className="flex items-end space-x-3 mb-2">
                {product.originalPrice ? (
                  <>
                    <span className="text-xl text-dark-text/40 line-through mb-1">₹{product.originalPrice}</span>
                    <span className="text-xl text-dark-text/40 mb-1">→</span>
                    <span className="font-bold text-4xl text-maroon">₹{product.price}</span>
                    <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded mb-1 ml-2">
                      ({discountPercentage}% OFF)
                    </span>
                  </>
                ) : (
                  <span className="font-bold text-4xl text-maroon">₹{product.price}</span>
                )}
              </div>
              <p className="text-sm text-dark-text/60">Inclusive of all taxes</p>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col space-y-4 mb-8">
              <div className="flex items-center space-x-4 mb-2">
                <span className="font-medium text-dark-text">Quantity:</span>
                <div className="flex items-center border border-maroon/20 rounded-lg overflow-hidden bg-white">
                  <button onClick={() => handleQuantityChange("decrease")} className="px-4 py-2 hover:bg-ivory text-dark-text transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 font-bold text-lg min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange("increase")} className="px-4 py-2 hover:bg-ivory text-dark-text transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={() => {
                    if (!session) {
                      localStorage.setItem("pending_cart_item", JSON.stringify({ product, quantity }));
                      router.push("/login?callbackUrl=" + window.location.pathname);
                      return;
                    }
                    addToCart(product, quantity);
                    alert("Product added to cart successfully.");
                  }}
                  className="flex-1 bg-white border-2 border-maroon text-maroon font-bold py-4 rounded-xl hover:bg-maroon hover:text-white transition-all shadow-sm flex items-center justify-center space-x-2 text-lg"
                >
                  <ShoppingCart size={20} />
                  <span>Add To Cart</span>
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-maroon text-ivory font-bold py-4 rounded-xl hover:bg-mithila-red transition-all shadow-[0_4px_14px_0_rgba(139,30,63,0.39)] text-lg"
                >
                  Buy Now
                </button>
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-maroon/10">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => isWished ? removeFromWishlist(product.id) : addToWishlist(product)}
                    className="flex items-center space-x-2 text-dark-text/70 hover:text-maroon font-medium transition-colors"
                  >
                    <Heart size={20} fill={isWished ? "currentColor" : "none"} className={isWished ? "text-maroon" : ""} />
                    <span>{isWished ? "Saved to Wishlist" : "Add to Wishlist"}</span>
                  </button>
                </div>
                
                {/* Share Product */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-dark-text/70">Share:</span>
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors" title="WhatsApp">
                      <Smartphone size={16} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors" title="Facebook">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors" title="Instagram">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-200 transition-colors" title="X (Twitter)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </button>
                    <button onClick={handleShare} className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors" title="Copy Link">
                      <LinkIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-xl border border-maroon/10 p-5 space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-maroon shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-dark-text mb-1">Check Delivery Options</h4>
                  <div className="flex gap-2 mt-2">
                    <input type="text" placeholder="Enter Pincode" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-maroon" />
                    <button className="bg-mustard text-dark-text font-bold px-4 rounded-lg text-sm hover:bg-[#c49314]">Check</button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
                <div className="flex items-center space-x-3 text-sm text-dark-text/80">
                  <Truck className="text-gray-400 shrink-0" size={18} />
                  <span>Free Delivery on orders above ₹499</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-dark-text/80">
                  <CalendarDays className="text-gray-400 shrink-0" size={18} />
                  <span>Estimated Delivery by <strong>Tomorrow</strong></span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-dark-text/80">
                  <ShieldCheck className="text-gray-400 shrink-0" size={18} />
                  <span>100% Secure Payments</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="text-xs font-medium bg-ivory border border-gray-200 px-2 py-1 rounded">UPI</span>
                  <span className="text-xs font-medium bg-ivory border border-gray-200 px-2 py-1 rounded">Credit Card</span>
                  <span className="text-xs font-medium bg-ivory border border-gray-200 px-2 py-1 rounded">Debit Card</span>
                  <span className="text-xs font-medium bg-ivory border border-gray-200 px-2 py-1 rounded">Net Banking</span>
                  <span className="text-xs font-medium bg-ivory border border-gray-200 px-2 py-1 rounded">Wallet</span>
                  <span className="text-xs font-medium bg-ivory border border-gray-200 px-2 py-1 rounded text-green-700 border-green-200 bg-green-50">Cash On Delivery</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs Section (Description, Features, Reviews) */}
        <div className="mb-16">
          <div className="flex overflow-x-auto border-b border-maroon/10 scrollbar-hide">
            {(["description", "features", "reviews"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-bold text-lg whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? "text-maroon" : "text-dark-text/50 hover:text-dark-text"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-maroon rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-b-2xl border border-t-0 border-maroon/10 min-h-[300px]">
            {activeTab === "description" && (
              <div className="prose prose-maroon max-w-none">
                <p className="text-lg text-dark-text/80 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-lg text-dark-text/80 leading-relaxed mt-4">
                  Sourced directly from the ponds of Mithilanchal, our Makhana is hand-picked and processed using traditional methods to preserve its rich nutritional profile. It is a superfood packed with protein, calcium, and antioxidants, making it the perfect healthy snack for any time of the day.
                </p>
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-xl text-maroon mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3 text-dark-text/80"><div className="w-1.5 h-1.5 rounded-full bg-mustard"></div><span>100% Natural & Vegan</span></li>
                    <li className="flex items-center space-x-3 text-dark-text/80"><div className="w-1.5 h-1.5 rounded-full bg-mustard"></div><span>Rich in Antioxidants & Calcium</span></li>
                    <li className="flex items-center space-x-3 text-dark-text/80"><div className="w-1.5 h-1.5 rounded-full bg-mustard"></div><span>Gluten-Free Superfood</span></li>
                    <li className="flex items-center space-x-3 text-dark-text/80"><div className="w-1.5 h-1.5 rounded-full bg-mustard"></div><span>No Artificial Preservatives</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-maroon mb-4">Specifications</h3>
                  <table className="w-full text-sm text-left">
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <th className="py-3 font-medium text-dark-text/60 w-1/3">Brand</th>
                        <td className="py-3 text-dark-text font-bold">Mithila Maati</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="py-3 font-medium text-dark-text/60">Weight</th>
                        <td className="py-3 text-dark-text font-bold">{product.weight}</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="py-3 font-medium text-dark-text/60">Dimensions</th>
                        <td className="py-3 text-dark-text font-bold">15 x 10 x 5 cm</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="py-3 font-medium text-dark-text/60">Material</th>
                        <td className="py-3 text-dark-text font-bold">100% Organic Content</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="py-3 font-medium text-dark-text/60">Color</th>
                        <td className="py-3 text-dark-text font-bold">Natural White</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <th className="py-3 font-medium text-dark-text/60">Size</th>
                        <td className="py-3 text-dark-text font-bold">Standard Grade</td>
                      </tr>
                      <tr>
                        <th className="py-3 font-medium text-dark-text/60">Manufacturer</th>
                        <td className="py-3 text-dark-text font-bold">Mithila Maati Enterprises</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-ivory p-6 rounded-xl border border-gray-100">
                  <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                    <div className="text-5xl font-bold text-maroon mb-2">4.8</div>
                    <div className="flex text-mustard mb-1">
                      {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={20} fill="currentColor" />)}
                    </div>
                    <div className="text-sm text-dark-text/60">Based on 245 reviews</div>
                  </div>
                  <button className="bg-white border-2 border-maroon text-maroon font-bold px-6 py-3 rounded-lg hover:bg-maroon hover:text-white transition-colors">
                    Write a Review
                  </button>
                </div>
                
                {/* Mock Review */}
                <div className="space-y-6">
                  <div className="border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-dark-text">Rahul Sharma</h4>
                        <div className="flex text-mustard mt-1">
                          {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}
                        </div>
                      </div>
                      <span className="text-sm text-dark-text/40">2 days ago</span>
                    </div>
                    <p className="text-dark-text/80 text-sm mt-2">Absolutely love the crunch and freshness. The packaging is premium and the taste is exactly as described. Will definitely order again!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Frequently Bought Together */}
        {relatedProducts.length >= 2 && (
          <div className="mb-16 bg-white border border-maroon/10 p-8 rounded-2xl shadow-sm">
            <h2 className="font-playfair text-2xl font-bold text-maroon mb-6">Frequently Bought Together</h2>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              
              {/* Product Bundle Visual */}
              <div className="flex items-center gap-4 flex-wrap justify-center lg:justify-start">
                {/* Current Product */}
                <div className="w-32 h-32 relative bg-[#fdfaf3] rounded-xl border border-maroon/20 p-2 group cursor-pointer" onClick={() => router.push(`/products/${product.id}`)}>
                  <Image src={product.image} alt={product.name} fill className="object-contain p-4 group-hover:scale-110 transition-transform" />
                </div>
                <Plus className="text-maroon/30" size={24} />
                
                {/* Related 1 */}
                <div className="w-32 h-32 relative bg-white rounded-xl border border-gray-200 p-2 group cursor-pointer" onClick={() => router.push(`/products/${relatedProducts[0].id}`)}>
                  <Image src={relatedProducts[0].image} alt={relatedProducts[0].name} fill className="object-contain p-4 group-hover:scale-110 transition-transform" />
                </div>
                <Plus className="text-maroon/30" size={24} />

                {/* Related 2 */}
                <div className="w-32 h-32 relative bg-white rounded-xl border border-gray-200 p-2 group cursor-pointer" onClick={() => router.push(`/products/${relatedProducts[1].id}`)}>
                  <Image src={relatedProducts[1].image} alt={relatedProducts[1].name} fill className="object-contain p-4 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Bundle Action */}
              <div className="lg:ml-auto flex flex-col items-center lg:items-end text-center lg:text-right border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-8">
                <div className="text-dark-text/60 mb-1 font-medium">Total Price:</div>
                <div className="text-3xl font-bold text-maroon mb-4">
                  ₹{(product.price + relatedProducts[0].price + relatedProducts[1].price).toLocaleString()}
                </div>
                <button 
                  onClick={() => {
                    if (!session) {
                      alert("Please login first to add bundle to cart.");
                      router.push("/login?callbackUrl=" + window.location.pathname);
                      return;
                    }
                    addToCart(product, 1);
                    addToCart(relatedProducts[0], 1);
                    addToCart(relatedProducts[1], 1);
                    alert("Bundle added to cart!");
                  }}
                  className="bg-maroon hover:bg-mustard text-ivory hover:text-dark-text font-bold px-8 py-3 rounded-xl transition-all shadow-md whitespace-nowrap"
                >
                  Add All 3 To Cart
                </button>
              </div>
            </div>
            
            {/* Bundle List Details */}
            <div className="mt-6 space-y-2 text-sm text-dark-text/80">
              <div className="flex items-center gap-2"><span className="text-mustard">✔</span> <strong>This item:</strong> {product.name} (₹{product.price})</div>
              <div className="flex items-center gap-2"><span className="text-mustard">✔</span> {relatedProducts[0].name} (₹{relatedProducts[0].price})</div>
              <div className="flex items-center gap-2"><span className="text-mustard">✔</span> {relatedProducts[1].name} (₹{relatedProducts[1].price})</div>
            </div>
          </div>
        )}

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex justify-between items-end mb-8 border-b border-maroon/10 pb-4">
              <h2 className="font-playfair text-3xl font-bold text-maroon">You May Also Like</h2>
              <Link href="/products" className="text-sm font-bold text-dark-text hover:text-maroon flex items-center">
                View All <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-8 border-b border-maroon/10 pb-4">
              <h2 className="font-playfair text-3xl font-bold text-maroon">Recently Viewed</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewed.map(rp => (
                <ProductCard key={`recent-${rp.id}`} product={rp} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
