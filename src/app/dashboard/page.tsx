"use client";

import { motion } from "framer-motion";
import { Package, Truck, XCircle, Gift, Wallet, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function DashboardOverview() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/user/dashboard");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchDashboardData();
    } else if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  }, [status]);

  if (loading || status === "loading") {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div></div>;
  }

  if (!data) return <div>Error loading data.</div>;

  const stats = [
    { name: "Total Orders", value: data.stats.totalOrders.toString(), icon: Package, color: "text-indigo" },
    { name: "Delivered", value: data.stats.deliveredOrders.toString(), icon: Truck, color: "text-green-600" },
    { name: "Cancelled", value: data.stats.cancelledOrders.toString(), icon: XCircle, color: "text-red-500" },
    { name: "Reward Points", value: data.stats.rewardPoints.toString(), icon: Gift, color: "text-mustard" },
    { name: "Wallet Balance", value: `₹${data.stats.walletBalance}`, icon: Wallet, color: "text-terracotta" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-maroon mb-2">Hello, {data.user.fullName}!</h1>
        <p className="text-dark-text/70">Welcome to your dashboard. Manage your orders, wallet, and account settings here.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform"
            >
              <div className={`p-3 rounded-full bg-white shadow-sm mb-3 ${stat.color}`}>
                <Icon size={24} />
              </div>
              <h3 className="text-2xl font-bold text-dark-text mb-1">{stat.value}</h3>
              <p className="text-xs text-dark-text/60 font-medium uppercase tracking-wider">{stat.name}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
        <div className="flex justify-between items-center mb-6 border-b border-maroon/10 pb-4">
          <h2 className="font-playfair text-xl font-bold text-maroon">Recent Orders</h2>
          <Link href="/dashboard/orders" className="text-sm text-mithila-red hover:text-maroon font-medium flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {data.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-dark-text/60">No recent orders found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs text-dark-text/50 uppercase tracking-wider border-b border-maroon/10">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon/5">
                {data.recentOrders.map((order: any) => (
                  <tr key={order._id} className="hover:bg-white/40 transition-colors">
                    <td className="py-4 text-sm font-medium text-dark-text">{order.orderId}</td>
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 relative bg-[#fdfaf3] rounded-lg border border-maroon/10 overflow-hidden flex items-center justify-center text-xs text-maroon font-bold bg-mustard/20">
                          M
                        </div>
                        <span className="text-sm text-dark-text/80 font-medium">{order.productName}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-dark-text/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 text-sm font-bold text-dark-text">₹{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.currentStep === 6 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {order.currentStep === 6 ? "Delivered" : "Processing"}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link href={`/dashboard/orders/${order.orderId}`} className="text-sm text-mustard hover:text-maroon font-medium transition-colors">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
