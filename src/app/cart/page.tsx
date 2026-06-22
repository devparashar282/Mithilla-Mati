"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/components/providers/CartProvider";
import { Minus, Plus, Trash2, ArrowRight, Tag, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, cartTotal } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);

  // Calculations
  const subtotal = cartTotal;
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const shipping = subtotal > 499 || subtotal === 0 ? 0 : 50;
  const grandTotal = subtotal + gst + shipping - discount;

  const handleApplyCoupon = () => {
    if (!couponCode) return;
    
    if (couponCode.toUpperCase() === "WELCOME10") {
      const discountAmt = Math.round(subtotal * 0.1); // 10% discount
      setDiscount(discountAmt);
      setAppliedCoupon("WELCOME10");
      setCouponCode("");
      alert("Coupon applied successfully!");
    } else {
      alert("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const handleQuantityChange = (product: any, type: "increase" | "decrease") => {
    if (type === "decrease") {
      if (product.quantity > 1) {
        addToCart(product, -1);
      } else {
        removeFromCart(product.id);
      }
    } else {
      addToCart(product, 1);
    }
  };

  const handleProceedToCheckout = () => {
    if (!session) {
      router.push("/login?callbackUrl=/checkout");
      return;
    }
    // We will pass the discount to checkout through local storage or state
    // But since CartProvider doesn't hold discount, let's just use localStorage for checkout params
    localStorage.setItem("checkout_params", JSON.stringify({ discount, coupon: appliedCoupon }));
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-ivory pt-[88px] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-maroon/10 rounded-full flex items-center justify-center mb-6 text-maroon">
          <ShoppingBag size={48} />
        </div>
        <h1 className="font-playfair text-3xl font-bold text-dark-text mb-2">Your Cart is Empty</h1>
        <p className="text-dark-text/60 mb-8 max-w-md text-center">Looks like you haven't added anything to your cart yet. Explore our authentic Mithila products.</p>
        <Link href="/products" className="bg-maroon text-ivory px-8 py-3 rounded-xl font-bold hover:bg-mithila-red transition-all shadow-md">
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-[88px] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-maroon mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-maroon/10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start relative">
                
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 relative bg-[#fdfaf3] rounded-xl border border-maroon/20 flex-shrink-0 cursor-pointer" onClick={() => router.push(`/products/${item.id}`)}>
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                </div>

                {/* Details */}
                <div className="flex-grow flex flex-col justify-between h-full w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-dark-text cursor-pointer hover:text-maroon" onClick={() => router.push(`/products/${item.id}`)}>{item.name}</h3>
                      <p className="text-sm text-dark-text/60 mb-1">Variant: {item.weight}</p>
                      <p className="font-bold text-maroon text-lg">₹{item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      title="Remove Item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-4 sm:mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-ivory">
                      <button onClick={() => handleQuantityChange(item, "decrease")} className="px-3 py-1 hover:bg-gray-200 text-dark-text transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="px-4 font-bold text-sm min-w-[2.5rem] text-center bg-white">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item, "increase")} className="px-3 py-1 hover:bg-gray-200 text-dark-text transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-dark-text/60 mr-2">Total:</span>
                      <span className="font-bold text-xl text-dark-text">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-maroon/10 p-6 sticky top-[100px]">
              <h2 className="font-bold text-xl text-dark-text mb-6">Order Summary</h2>

              {/* Coupon Section */}
              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={18} className="text-mustard" />
                  <span className="font-medium text-sm text-dark-text/80">Have a Coupon?</span>
                </div>
                {appliedCoupon ? (
                  <div className="flex justify-between items-center bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                    <span className="font-bold text-green-700 text-sm">{appliedCoupon} Applied</span>
                    <button onClick={handleRemoveCoupon} className="text-xs text-red-500 font-bold hover:underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code (e.g. WELCOME10)" 
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-maroon uppercase" 
                    />
                    <button onClick={handleApplyCoupon} className="bg-dark-text text-white font-bold px-4 rounded-lg text-sm hover:bg-black transition-colors">Apply</button>
                  </div>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-text/70">Subtotal ({cart.length} items)</span>
                  <span className="font-bold text-dark-text">₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-bold">- ₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-dark-text/70">Estimated GST (5%)</span>
                  <span className="font-bold text-dark-text">₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-text/70">Shipping Charges</span>
                  {shipping === 0 ? (
                    <span className="font-bold text-green-600">FREE</span>
                  ) : (
                    <span className="font-bold text-dark-text">₹{shipping}</span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg text-dark-text">Grand Total</span>
                  <span className="font-bold text-3xl text-maroon">₹{grandTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-right text-dark-text/50 mt-1">Inclusive of all taxes</p>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="w-full bg-maroon hover:bg-mustard text-ivory hover:text-dark-text font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-lg group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-dark-text/50">
                <span>Secure Checkout powered by Mithila Maati</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
