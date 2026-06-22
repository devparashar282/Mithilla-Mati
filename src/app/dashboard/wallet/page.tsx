"use client";

import { motion } from "framer-motion";
import { Wallet, Gift, ArrowUpRight, ArrowDownRight, PlusCircle } from "lucide-react";

export default function WalletPage() {
  const transactions = [
    { id: "TXN-123", date: "15 Jun, 2026", desc: "Refund for ORD-98765434", type: "credit", amount: "₹250" },
    { id: "TXN-124", date: "10 Jun, 2026", desc: "Paid for ORD-98765430", type: "debit", amount: "₹450" },
    { id: "TXN-125", date: "01 Jun, 2026", desc: "Cashback Earned", type: "credit", amount: "₹50" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
        <h1 className="font-playfair text-2xl font-bold text-maroon mb-1">Wallet & Rewards</h1>
        <p className="text-dark-text/70 text-sm">Manage your balances, points, and transaction history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-maroon to-mithila-red rounded-2xl p-6 text-ivory shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-ivory/80 uppercase tracking-wider text-sm">Current Balance</span>
              <Wallet size={24} className="text-mustard" />
            </div>
            <div className="text-4xl font-bold mb-8">₹1,250.00</div>
            <button className="w-full bg-white text-maroon font-bold py-3 rounded-xl hover:bg-mustard transition-colors flex items-center justify-center">
              <PlusCircle size={18} className="mr-2" /> Add Money to Wallet
            </button>
          </div>
        </motion.div>

        {/* Rewards Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-mustard to-[#c49314] rounded-2xl p-6 text-dark-text shadow-lg relative overflow-hidden"
        >
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/4 translate-x-1/4"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-dark-text/80 uppercase tracking-wider text-sm">Reward Points</span>
              <Gift size={24} className="text-maroon" />
            </div>
            <div className="text-4xl font-bold mb-2">450 <span className="text-xl font-medium">Pts</span></div>
            <p className="text-sm font-medium mb-6 opacity-80">1 Pts = ₹1.00</p>
            <div className="flex justify-between border-t border-dark-text/10 pt-4">
              <div>
                <span className="block text-xs opacity-70 uppercase">Earned</span>
                <span className="font-bold">1,200</span>
              </div>
              <div>
                <span className="block text-xs opacity-70 uppercase">Used</span>
                <span className="font-bold">750</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transaction History */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-sm">
        <h2 className="font-playfair text-xl font-bold text-maroon mb-6 border-b border-maroon/10 pb-4">Transaction History</h2>
        
        <div className="space-y-4">
          {transactions.map((txn, idx) => (
            <motion.div 
              key={txn.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className="flex justify-between items-center p-4 bg-white/40 border border-white/50 rounded-xl hover:bg-white/80 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {txn.type === 'credit' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-dark-text text-sm md:text-base">{txn.desc}</h4>
                  <span className="text-xs text-dark-text/50">{txn.date} | {txn.id}</span>
                </div>
              </div>
              <div className={`font-bold text-lg ${txn.type === 'credit' ? 'text-green-600' : 'text-dark-text'}`}>
                {txn.type === 'credit' ? '+' : '-'}{txn.amount}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
