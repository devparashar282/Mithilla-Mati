"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Smartphone, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [callbackUrl, setCallbackUrl] = useState("/dashboard");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setCallbackUrl(searchParams.get("callbackUrl") || "/dashboard");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: formData.identifier,
        password: formData.password,
      });

      if (result?.error) {
        alert(result.error);
        setIsLoading(false);
      } else {
        window.location.href = callbackUrl;
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory py-12 relative flex items-center justify-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30Z\' fill=\'none\' stroke=\'%238B1E3F\' stroke-width=\'1\'/%3E%3C/svg%3E')]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-mustard rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-mithila-red rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
        >
          {/* Header */}
          <div className="text-center mb-8 flex flex-col items-center">
            <Link href="/" className="mb-6 inline-block">
              <Image 
                src="/logo.png" 
                alt="Mithila Maati Logo" 
                width={80} 
                height={80} 
                className="object-contain"
                priority
              />
            </Link>
            <h1 className="font-playfair text-3xl font-bold text-maroon mb-2">Welcome Back</h1>
            <p className="text-dark-text/70 text-sm">Login to continue your shopping experience.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Identifier Field */}
            <div>
              <label className="block text-sm font-medium text-dark-text mb-1">Email / Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {formData.identifier.includes("@") ? (
                    <Mail size={18} className="text-dark-text/40" />
                  ) : (
                    <Smartphone size={18} className="text-dark-text/40" />
                  )}
                </div>
                <input 
                  type="text" 
                  required
                  value={formData.identifier}
                  onChange={(e) => setFormData({...formData, identifier: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30"
                  placeholder="Enter email or mobile"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="animate-fade-in-up">
              <label className="block text-sm font-medium text-dark-text mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-dark-text/40" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-text/40 hover:text-maroon transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-maroon focus:ring-maroon bg-white/60" 
                  />
                  <span className="text-sm text-dark-text/70">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-maroon hover:text-mithila-red font-medium transition-colors">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* reCAPTCHA Mock */}
            <div className="flex items-center space-x-3 p-3 bg-white/40 border border-white/50 rounded-xl">
              <input type="checkbox" required className="rounded-sm border-gray-300 w-5 h-5 text-green-600 focus:ring-green-500" />
              <span className="text-sm text-dark-text/70 flex-1">I'm not a robot</span>
              <ShieldCheck className="text-blue-500 opacity-50" size={24} />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-maroon text-ivory py-3.5 rounded-xl font-bold hover:bg-mithila-red transition-all shadow-[0_4px_14px_0_rgba(139,30,63,0.39)] flex justify-center items-center group disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-ivory border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Login Securely
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-text/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#FFF8E7] text-dark-text/50">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center py-2.5 px-4 border border-white bg-white/50 rounded-xl hover:bg-white transition-colors shadow-sm">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-dark-text">Google</span>
              </button>
              <button className="flex items-center justify-center py-2.5 px-4 border border-white bg-white/50 rounded-xl hover:bg-white transition-colors shadow-sm">
                <svg className="w-5 h-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium text-dark-text">Facebook</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-dark-text/70">
            Don't have an account?{" "}
            <Link href="/signup" className="text-mustard hover:text-maroon font-bold transition-colors">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
