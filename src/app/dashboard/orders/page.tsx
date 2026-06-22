"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Circle, XCircle, ArrowRight } from "lucide-react";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const trackingSteps = [
  "Placed", 
  "Confirmed", 
  "Processing", 
  "Packed", 
  "Shipped", 
  "Out For Delivery", 
  "Delivered"
];

export default function MyOrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  if (loading || status === "loading") {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] flex justify-between items-center">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-maroon mb-1">My Orders</h1>
          <p className="text-dark-text/70 text-sm">Track, return, or buy items again.</p>
        </div>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-10 text-center shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
            <h3 className="text-xl font-bold text-dark-text mb-2">No orders found</h3>
            <p className="text-dark-text/70 mb-6">Looks like you haven't placed any orders yet.</p>
            <Link href="/products" className="inline-flex bg-maroon hover:bg-mustard text-ivory hover:text-dark-text font-bold py-3 px-8 rounded-xl transition-all shadow-md">
              Start Shopping
            </Link>
          </div>
        ) : (
        orders.map((order: any, idx: number) => (
          <motion.div 
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-maroon/10 pb-4 mb-6">
              <div className="flex space-x-6 text-sm mb-4 md:mb-0">
                <div>
                  <span className="text-dark-text/50 uppercase tracking-wider block text-xs">Order Placed</span>
                  <span className="font-medium text-dark-text">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-dark-text/50 uppercase tracking-wider block text-xs">Total</span>
                  <span className="font-medium text-dark-text">₹{order.amount}</span>
                </div>
                <div>
                  <span className="text-dark-text/50 uppercase tracking-wider block text-xs">Order ID</span>
                  <span className="font-medium text-dark-text">{order.orderId}</span>
                </div>
              </div>
              <Link 
                href={`/dashboard/orders/${order.orderId}`}
                className="text-mustard hover:text-maroon font-bold text-sm flex items-center transition-colors"
              >
                View Details <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Product Info */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="relative w-24 h-24 bg-[#fdfaf3] rounded-xl border border-maroon/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {order.productImage ? (
                  <Image src={order.productImage} alt={order.productName} fill className="object-contain p-2" />
                ) : (
                  <span className="font-bold text-maroon/40 text-2xl">M</span>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-playfair font-bold text-lg text-maroon mb-1">{order.productName}</h3>
                <p className="text-sm text-dark-text/70 mb-2">Variant: {order.variant} | Qty: {order.quantity}</p>
                <div className="flex items-center space-x-3 text-xs">
                  <span className={`px-2 py-1 rounded border ${order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                    Payment: {order.paymentStatus}
                  </span>
                  <span className="text-dark-text/60 font-medium">{order.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div>
              <h4 className="font-medium text-dark-text mb-4 text-sm uppercase tracking-wider">Tracking Status</h4>
              {order.isCancelled ? (
                <div className="flex items-center text-red-500">
                  <XCircle className="mr-2" />
                  <span className="font-bold">Order Cancelled</span>
                </div>
              ) : (
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full hidden md:block"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 rounded-full hidden md:block transition-all duration-1000" 
                    style={{ width: `${(order.currentStep / (trackingSteps.length - 1)) * 100}%` }}
                  ></div>

                  <div className="flex flex-col md:flex-row justify-between relative z-10 gap-4 md:gap-0">
                    {trackingSteps.map((step, stepIdx) => {
                      const isCompleted = stepIdx <= order.currentStep;
                      const isActive = stepIdx === order.currentStep;
                      return (
                        <div key={step} className="flex md:flex-col items-center group">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                            isCompleted ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-300 text-gray-300"
                          } ${isActive ? "ring-4 ring-green-100 scale-110" : ""}`}>
                            {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={10} className="fill-current" />}
                          </div>
                          <span className={`ml-4 md:ml-0 md:mt-2 text-xs font-medium md:text-center w-24 ${
                            isActive ? "text-maroon font-bold" : (isCompleted ? "text-dark-text" : "text-gray-400")
                          }`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )))}
      </div>
    </div>
  );
}
