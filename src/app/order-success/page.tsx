"use client";

import { useEffect } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, MapPin, Truck, Package } from "lucide-react";

export default function OrderSuccessPage() {
  const { lastOrder } = useCart();
  const router = useRouter();

  // If no recent order, redirect to home
  useEffect(() => {
    if (!lastOrder) {
      router.push("/");
    }
  }, [lastOrder, router]);

  if (!lastOrder) return null;

  return (
    <main className="flex min-h-screen flex-col bg-ivory">

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex-grow">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="text-green-600 w-12 h-12" />
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-maroon mb-4">Order Confirmed!</h1>
          <p className="text-lg text-dark-text/70 max-w-xl mx-auto">
            Thank you for shopping with Mithila Maati. Your order <span className="font-bold text-dark-text">#{lastOrder.orderId}</span> has been successfully placed.
          </p>
          <p className="text-md text-green-600 font-bold mt-2">
            Estimated Delivery Date: {new Date(Date.now() + 86400000 * 2).toLocaleDateString()}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-maroon/10 overflow-hidden mb-12">
          
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-bold text-dark-text mb-6">Items Ordered</h2>
            <div className="space-y-6">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="flex space-x-6 items-center">
                  <div className="relative w-20 h-20 bg-white rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg text-maroon">{item.name}</h4>
                    <p className="text-sm text-dark-text/60">Quantity: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-xl text-dark-text">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-end pt-6 mt-6 border-t border-gray-200">
              <span className="font-bold text-lg text-dark-text">Total Amount (COD)</span>
              <span className="font-bold text-3xl text-maroon">₹{lastOrder.total}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Delivery Info */}
            <div>
              <h3 className="font-bold text-dark-text mb-4 flex items-center text-lg">
                <MapPin className="mr-2 text-mustard" size={20} />
                Delivery Address
              </h3>
              <div className="bg-ivory/50 p-4 rounded-xl border border-gray-100 h-full">
                <p className="font-bold text-dark-text mb-1">{lastOrder.shippingInfo.fullName}</p>
                <p className="text-dark-text/80 mb-1">{lastOrder.shippingInfo.address}</p>
                <p className="text-dark-text/80 mb-2">{lastOrder.shippingInfo.city}, {lastOrder.shippingInfo.state} - {lastOrder.shippingInfo.pincode}</p>
                <p className="text-dark-text/80 font-medium">Phone: {lastOrder.shippingInfo.mobile}</p>
              </div>
            </div>

            {/* Tracking Info */}
            <div>
              <h3 className="font-bold text-dark-text mb-4 flex items-center text-lg">
                <Package className="mr-2 text-mustard" size={20} />
                Order Status
              </h3>
              <div className="bg-ivory/50 p-4 rounded-xl border border-gray-100 h-full flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-dark-text">Order Placed</p>
                    <p className="text-xs text-dark-text/60">We have received your order.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-dark-text">
                    <Truck size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-dark-text">Processing</p>
                    <p className="text-xs text-dark-text/60">Preparing your authentic Makhana.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center flex justify-center space-x-4">
          <Link href="/products" className="inline-flex bg-ivory text-maroon border-2 border-maroon hover:bg-maroon hover:text-ivory font-bold py-4 px-10 rounded-xl transition-all shadow-md text-lg">
            Continue Shopping
          </Link>
          <Link href="/dashboard/orders" className="inline-flex bg-maroon hover:bg-mustard text-ivory hover:text-dark-text font-bold py-4 px-10 rounded-xl transition-all shadow-md text-lg">
            Track Order
          </Link>
        </div>

      </section>

    </main>
  );
}
