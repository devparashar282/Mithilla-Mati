"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, MapPin, CheckCircle2 } from "lucide-react";

export default function AddressBookPage() {
  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "Rahul Kumar",
      phone: "+91 9876543210",
      street: "123, Heritage Lane, Mithila Vihar",
      city: "Darbhanga",
      state: "Bihar",
      pincode: "846004",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "Rahul Kumar",
      phone: "+91 9876543210",
      street: "Tech Park, Building 4, Sector 5",
      city: "Patna",
      state: "Bihar",
      pincode: "800001",
      isDefault: false,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-maroon mb-1">Address Book</h1>
          <p className="text-dark-text/70 text-sm">Manage your shipping and billing addresses.</p>
        </div>
        <button className="flex items-center bg-maroon text-ivory px-4 py-2 rounded-xl font-medium hover:bg-mithila-red transition-colors shadow-sm">
          <Plus size={18} className="mr-2" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr, idx) => (
          <motion.div 
            key={addr.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative bg-white/80 backdrop-blur-xl border-2 rounded-2xl p-6 shadow-sm ${addr.isDefault ? 'border-mustard' : 'border-white hover:border-maroon/20'} transition-colors`}
          >
            {addr.isDefault && (
              <div className="absolute top-0 right-0 bg-mustard text-dark-text text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl flex items-center shadow-sm">
                <CheckCircle2 size={12} className="mr-1" /> Default
              </div>
            )}
            
            <div className="flex items-start mb-4">
              <div className="p-2 bg-maroon/5 text-maroon rounded-lg mr-3">
                <MapPin size={20} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-dark-text">{addr.name}</h3>
                  <span className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">{addr.type}</span>
                </div>
                <p className="text-sm text-dark-text/60 mt-1">{addr.phone}</p>
              </div>
            </div>

            <div className="text-sm text-dark-text/80 space-y-1 mb-6 border-l-2 border-maroon/10 pl-3">
              <p>{addr.street}</p>
              <p>{addr.city}, {addr.state}</p>
              <p className="font-medium">PIN: {addr.pincode}</p>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-maroon/5">
              <button className="flex-1 flex items-center justify-center py-2 text-sm font-medium text-maroon bg-maroon/5 hover:bg-maroon/10 rounded-lg transition-colors">
                <Edit2 size={16} className="mr-2" /> Edit
              </button>
              <button className="flex-1 flex items-center justify-center py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                <Trash2 size={16} className="mr-2" /> Delete
              </button>
            </div>
            
            {!addr.isDefault && (
              <button className="w-full mt-3 text-xs font-medium text-dark-text/50 hover:text-mustard uppercase tracking-wider transition-colors">
                Set as Default Address
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
