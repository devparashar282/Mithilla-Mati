"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, RotateCcw, Star, CreditCard, Truck, User } from "lucide-react";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  // Mock Data
  const order = {
    id: params.id || "ORD-98765432",
    date: "15 Jun, 2026",
    product: "Premium Phool Makhana",
    variant: "250g Pack",
    qty: 2,
    price: 250,
    discount: 50,
    amount: 450,
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    transactionId: "TXN-0987654321",
    customerName: "Rahul Kumar",
    mobile: "+91 9876543210",
    address: "123, Heritage Lane, Mithila Vihar",
    city: "Darbhanga",
    state: "Bihar",
    pincode: "846004",
    courier: "Delhivery",
    trackingNo: "DEL123456789",
    estDelivery: "18 Jun, 2026",
    status: "Delivered",
    productImage: "/assets/images/products/makhana-main.jpg",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-2">
        <Link href="/dashboard/orders" className="p-2 bg-white/60 hover:bg-white rounded-full transition-colors text-maroon">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-playfair text-2xl font-bold text-maroon">Order Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Product & Actions */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-center border-b border-maroon/10 pb-4 mb-6">
              <div>
                <span className="text-dark-text/50 text-xs uppercase tracking-wider block">Order ID</span>
                <span className="font-bold text-maroon">{order.id}</span>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
                  {order.status}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-32 h-32 bg-[#fdfaf3] rounded-xl border border-maroon/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {order.productImage ? (
                  <Image src={order.productImage} alt={order.product} fill className="object-contain p-2" />
                ) : (
                  <span className="font-bold text-maroon/40 text-4xl">M</span>
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-playfair font-bold text-xl text-maroon mb-2">{order.product}</h3>
                <p className="text-sm text-dark-text/70 mb-1">Variant: {order.variant}</p>
                <p className="text-sm text-dark-text/70 mb-4">Quantity: {order.qty}</p>
                
                <div className="flex justify-between items-end border-t border-maroon/5 pt-4">
                  <div className="space-y-1">
                    <div className="text-sm text-dark-text/60">Unit Price: ₹{order.price}</div>
                    <div className="text-sm text-green-600">Discount: -₹{order.discount}</div>
                  </div>
                  <div className="text-2xl font-bold text-dark-text">Total: ₹{order.amount}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="flex-1 flex items-center justify-center py-3 bg-white border-2 border-maroon text-maroon font-bold rounded-xl hover:bg-maroon hover:text-ivory transition-colors">
              <Download size={18} className="mr-2" /> Download Invoice
            </button>
            <button className="flex-1 flex items-center justify-center py-3 bg-mustard text-dark-text font-bold rounded-xl hover:bg-[#c49314] transition-colors shadow-sm">
              <RotateCcw size={18} className="mr-2" /> Reorder Product
            </button>
            <button className="flex-1 flex items-center justify-center py-3 bg-mithila-red text-ivory font-bold rounded-xl hover:bg-maroon transition-colors shadow-sm">
              <Star size={18} className="mr-2" /> Rate & Review
            </button>
          </motion.div>
        </div>

        {/* Right Column: Details */}
        <div className="space-y-6">
          
          {/* Shipping */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-playfair font-bold text-maroon mb-4 flex items-center">
              <User size={18} className="mr-2 text-mustard" /> Shipping Details
            </h3>
            <div className="space-y-2 text-sm text-dark-text/80">
              <p className="font-bold text-dark-text">{order.customerName}</p>
              <p>{order.mobile}</p>
              <p className="pt-2">{order.address}</p>
              <p>{order.city}, {order.state} - {order.pincode}</p>
            </div>
          </motion.div>

          {/* Payment */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-playfair font-bold text-maroon mb-4 flex items-center">
              <CreditCard size={18} className="mr-2 text-mustard" /> Payment Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-dark-text/60">Method:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-text/60">Status:</span>
                <span className="font-medium text-green-600">{order.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-text/60">Transaction ID:</span>
                <span className="font-medium text-xs">{order.transactionId}</span>
              </div>
            </div>
          </motion.div>

          {/* Tracking */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="font-playfair font-bold text-maroon mb-4 flex items-center">
              <Truck size={18} className="mr-2 text-mustard" /> Tracking Info
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-dark-text/60">Partner:</span>
                <span className="font-medium">{order.courier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-text/60">Tracking No:</span>
                <span className="font-medium text-mithila-red">{order.trackingNo}</span>
              </div>
              <div className="flex justify-between border-t border-maroon/10 pt-2 mt-2">
                <span className="text-dark-text/60">Est. Delivery:</span>
                <span className="font-bold text-maroon">{order.estDelivery}</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
