"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Search, Menu, X, User, ChevronDown, LogOut, LayoutDashboard, ShoppingBag, Wallet, Settings, MapPin as MapPinIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount, wishlistCount } = useCart();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b-[6px] border-double border-maroon ${
        isScrolled ? "bg-[#FFF8E7] shadow-lg py-2" : "bg-[#FFF8E7]/95 py-4"
      }`}
    >
      {/* Intricate Madhubani pattern border */}
      <div className="absolute bottom-0 left-0 w-full h-2 opacity-60 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'10\' viewBox=\'0 0 40 10\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 10L10 0L20 10L30 0L40 10\' fill=\'none\' stroke=\'%23D4A017\' stroke-width=\'2\'/%3E%3Cpath d=\'M5 10L15 0L25 10L35 0\' fill=\'none\' stroke=\'%23E07A5F\' stroke-width=\'1\'/%3E%3C/svg%3E')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Mithila Maati Logo" 
              width={70} 
              height={70} 
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-dark-text hover:text-mithila-red font-sans font-medium transition-colors">
              Home
            </Link>
            <Link href="/story" className="text-dark-text hover:text-mithila-red font-sans font-medium transition-colors">
              Our Story
            </Link>
            <Link href="/products" className="text-dark-text hover:text-mithila-red font-sans font-medium transition-colors">
              Products
            </Link>
            <Link href="/contact" className="text-dark-text hover:text-mithila-red font-sans font-medium transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-dark-text hover:text-mithila-red transition-colors">
              <Search size={22} />
            </button>
            <div className="flex items-center space-x-2 relative">
              {status === "loading" ? (
                <div className="w-6 h-6 border-2 border-maroon border-t-transparent rounded-full animate-spin"></div>
              ) : session?.user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-dark-text hover:text-maroon transition-colors bg-white/50 px-3 py-1.5 rounded-full border border-gray-200"
                  >
                    <div className="w-7 h-7 bg-maroon text-ivory rounded-full flex items-center justify-center font-bold text-sm">
                      {session.user.name?.charAt(0).toUpperCase() || <User size={14} />}
                    </div>
                    <span className="text-sm font-medium hidden lg:block">Welcome, {session.user.name?.split(' ')[0]}</span>
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                          <p className="font-bold text-dark-text">{session.user.name}</p>
                          <p className="text-xs text-dark-text/60 truncate">{session.user.email}</p>
                        </div>
                        <div className="py-2">
                          <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-dark-text hover:bg-maroon/5 hover:text-maroon transition-colors">
                            <LayoutDashboard size={16} className="mr-3" /> Dashboard
                          </Link>
                          <Link href="/dashboard/orders" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-dark-text hover:bg-maroon/5 hover:text-maroon transition-colors">
                            <ShoppingBag size={16} className="mr-3" /> My Orders
                          </Link>
                          <Link href="/wishlist" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-dark-text hover:bg-maroon/5 hover:text-maroon transition-colors">
                            <Heart size={16} className="mr-3" /> Wishlist
                          </Link>
                          <Link href="/dashboard/wallet" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-dark-text hover:bg-maroon/5 hover:text-maroon transition-colors">
                            <Wallet size={16} className="mr-3" /> Wallet & Rewards
                          </Link>
                          <Link href="/dashboard/address" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-dark-text hover:bg-maroon/5 hover:text-maroon transition-colors">
                            <MapPinIcon size={16} className="mr-3" /> Address Book
                          </Link>
                          <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-dark-text hover:bg-maroon/5 hover:text-maroon transition-colors">
                            <Settings size={16} className="mr-3" /> Account Settings
                          </Link>
                        </div>
                        <div className="border-t border-gray-100 p-2">
                          <button 
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                          >
                            <LogOut size={16} className="mr-3" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-dark-text hover:text-mithila-red text-sm font-medium transition-colors">
                    Login
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/signup" className="text-dark-text hover:text-mithila-red text-sm font-medium transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            <Link href="/wishlist" className="relative text-dark-text hover:text-mithila-red transition-colors">
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-mithila-red text-ivory text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative text-dark-text hover:text-mithila-red transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-mustard text-dark-text text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart" className="relative text-dark-text">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-mustard text-dark-text text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-dark-text focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-mustard/20 bg-ivory overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <Link href="/" className="text-lg font-medium text-dark-text hover:text-mithila-red">Home</Link>
              <Link href="/story" className="text-lg font-medium text-dark-text hover:text-mithila-red">Our Story</Link>
              <Link href="/products" className="text-lg font-medium text-dark-text hover:text-mithila-red">Products</Link>
              <Link href="/contact" className="text-lg font-medium text-dark-text hover:text-mithila-red">Contact Us</Link>
              <hr className="border-gray-200" />
              <div className="flex flex-col space-y-4 pt-4">
                {status === "authenticated" ? (
                  <>
                    <div className="flex items-center space-x-3 p-3 bg-maroon/5 rounded-xl mb-2">
                       <div className="w-10 h-10 bg-maroon text-ivory rounded-full flex items-center justify-center font-bold">
                        {session.user?.name?.charAt(0).toUpperCase() || <User size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-dark-text text-sm">Welcome, {session.user?.name}</p>
                        <p className="text-xs text-dark-text/60">{session.user?.email}</p>
                      </div>
                    </div>
                    <Link href="/dashboard" className="flex items-center text-dark-text">
                      <LayoutDashboard size={20} className="mr-3 text-maroon" /> Dashboard
                    </Link>
                    <Link href="/dashboard/orders" className="flex items-center text-dark-text">
                      <ShoppingBag size={20} className="mr-3 text-maroon" /> My Orders
                    </Link>
                    <button onClick={() => signOut()} className="flex items-center text-red-600 font-medium">
                      <LogOut size={20} className="mr-3" /> Logout
                    </button>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <Link href="/login" className="font-medium text-maroon py-2 px-6 border border-maroon rounded-full">Login</Link>
                    <Link href="/signup" className="font-medium bg-maroon text-ivory py-2 px-6 rounded-full">Sign Up</Link>
                  </div>
                )}
                
                <Link href="/wishlist" className="flex items-center space-x-2 text-dark-text pt-4 border-t border-gray-100">
                  <Heart size={20} />
                  <span>Wishlist</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
