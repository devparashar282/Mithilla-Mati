"use client";

import { motion } from "framer-motion";
import { User, Lock, Bell, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Settings updated successfully!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
        <h1 className="font-playfair text-2xl font-bold text-maroon mb-1">Account Settings</h1>
        <p className="text-dark-text/70 text-sm">Update your profile, security preferences, and notifications.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-2 shadow-sm flex flex-row md:flex-col gap-2 overflow-x-auto">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex items-center px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === "profile" ? "bg-maroon text-ivory font-medium" : "text-dark-text/70 hover:bg-maroon/5"}`}
            >
              <User size={18} className="mr-3" /> Profile Info
            </button>
            <button 
              onClick={() => setActiveTab("security")}
              className={`flex items-center px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === "security" ? "bg-maroon text-ivory font-medium" : "text-dark-text/70 hover:bg-maroon/5"}`}
            >
              <Lock size={18} className="mr-3" /> Security
            </button>
            <button 
              onClick={() => setActiveTab("notifications")}
              className={`flex items-center px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === "notifications" ? "bg-maroon text-ivory font-medium" : "text-dark-text/70 hover:bg-maroon/5"}`}
            >
              <Bell size={18} className="mr-3" /> Notifications
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-grow">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            {activeTab === "profile" && (
              <form onSubmit={handleSave} className="space-y-6">
                <h2 className="font-playfair text-xl font-bold text-maroon border-b border-maroon/10 pb-4 mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">Full Name</label>
                    <input type="text" defaultValue="Rahul Kumar" className="w-full px-4 py-3 bg-white/60 border border-white focus:border-maroon rounded-xl outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">Date of Birth</label>
                    <input type="date" defaultValue="1995-08-15" className="w-full px-4 py-3 bg-white/60 border border-white focus:border-maroon rounded-xl outline-none transition-all" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-dark-text mb-2">Email Address</label>
                    <div className="relative">
                      <input type="email" defaultValue="rahul@example.com" disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-dark-text/60 cursor-not-allowed" />
                      <div className="absolute inset-y-0 right-3 flex items-center text-green-500 font-medium text-xs">
                        <CheckCircle2 size={16} className="mr-1" /> Verified
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-dark-text mb-2">Mobile Number</label>
                    <div className="relative">
                      <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-3 bg-white/60 border border-white focus:border-maroon rounded-xl outline-none transition-all pr-24" />
                      <button type="button" className="absolute inset-y-1.5 right-1.5 px-3 bg-mustard/20 text-mustard font-medium text-xs rounded-lg border border-mustard/30">
                        Verify
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-maroon/10 text-right">
                  <button type="submit" disabled={isLoading} className="bg-maroon text-ivory px-8 py-3 rounded-xl font-bold hover:bg-mithila-red transition-colors shadow-md disabled:opacity-70">
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <form onSubmit={handleSave} className="space-y-6">
                <h2 className="font-playfair text-xl font-bold text-maroon border-b border-maroon/10 pb-4 mb-6">Change Password</h2>
                
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">Current Password</label>
                    <input type="password" required className="w-full px-4 py-3 bg-white/60 border border-white focus:border-maroon rounded-xl outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">New Password</label>
                    <input type="password" required className="w-full px-4 py-3 bg-white/60 border border-white focus:border-maroon rounded-xl outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">Confirm New Password</label>
                    <input type="password" required className="w-full px-4 py-3 bg-white/60 border border-white focus:border-maroon rounded-xl outline-none transition-all" />
                  </div>
                </div>

                <div className="pt-6 border-t border-maroon/10">
                  <button type="submit" disabled={isLoading} className="bg-maroon text-ivory px-8 py-3 rounded-xl font-bold hover:bg-mithila-red transition-colors shadow-md disabled:opacity-70">
                    {isLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            )}

            {activeTab === "notifications" && (
              <form onSubmit={handleSave} className="space-y-6">
                <h2 className="font-playfair text-xl font-bold text-maroon border-b border-maroon/10 pb-4 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-dark-text">Order Updates</h4>
                      <p className="text-sm text-dark-text/60">Receive SMS and Email updates about your order status.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-dark-text">Promotions & Offers</h4>
                      <p className="text-sm text-dark-text/60">Get notified about exclusive Mithila Maati discounts.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-dark-text">WhatsApp Alerts</h4>
                      <p className="text-sm text-dark-text/60">Receive tracking links directly on WhatsApp.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-maroon/10 text-right">
                  <button type="submit" disabled={isLoading} className="bg-maroon text-ivory px-8 py-3 rounded-xl font-bold hover:bg-mithila-red transition-colors shadow-md disabled:opacity-70">
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
