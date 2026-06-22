"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Heart, 
  Wallet, 
  MapPin, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const sidebarLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { name: "Wallet & Rewards", href: "/dashboard/wallet", icon: Wallet },
  { name: "Address Book", href: "/dashboard/address", icon: MapPin },
  { name: "Account Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redirect to login if not authenticated
  if (status === "unauthenticated") {
    if (typeof window !== "undefined") {
      router.push("/login?callbackUrl=/dashboard");
    }
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const sidebarContent = (
    <div className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-4 sticky top-28">
      {/* User Profile Summary */}
      <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-maroon/10">
        <div className="w-12 h-12 rounded-full bg-mustard text-dark-text flex items-center justify-center font-bold text-xl shadow-inner">
          {session?.user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <div className="overflow-hidden">
          <h3 className="font-playfair font-bold text-maroon leading-tight truncate">{session?.user?.name || "User"}</h3>
          <p className="text-xs text-dark-text/60 truncate">{session?.user?.email}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-maroon text-ivory font-medium shadow-md translate-x-1" 
                  : "text-dark-text/70 hover:bg-maroon/5 hover:text-maroon"
              }`}
            >
              <Icon size={20} className={isActive ? "text-mustard" : ""} />
              <span>{link.name}</span>
            </Link>
          );
        })}
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-mithila-red hover:bg-mithila-red/10 font-medium mt-8"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-12">
      {/* Decorative Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30Z\' fill=\'none\' stroke=\'%238B1E3F\' stroke-width=\'1\'/%3E%3C/svg%3E')] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center bg-white/60 backdrop-blur-md border border-white/50 p-4 rounded-xl shadow-sm mb-6">
          <h2 className="font-playfair font-bold text-xl text-maroon">My Account</h2>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-maroon">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Mobile Sidebar */}
          <div className="md:hidden">
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.aside 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex-shrink-0 overflow-hidden"
                >
                  {sidebarContent}
                </motion.aside>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            {sidebarContent}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
          
        </div>
      </div>
    </div>
  );
}
