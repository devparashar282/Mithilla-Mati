"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Smartphone, User, MapPin, Building, Globe, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    gender: "",
    dob: "",
    acceptTerms: false,
    subscribePromo: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, password: val });
    
    // Simple password strength calculation
    let strength = 0;
    if (val.length > 5) strength++;
    if (val.length > 8) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;
    setPasswordStrength(Math.min(strength, 4));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
          gender: formData.gender,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed");
        setIsLoading(false);
        return;
      }

      // Sign in automatically after successful signup
      const result = await signIn("credentials", {
        redirect: false,
        identifier: formData.email,
        password: formData.password,
      });

      // If auto-login fails, redirect to login page. Success message is already shown.
      if (result?.error) {
        alert("Account created successfully, but automatic login failed. Please login manually.");
        window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
      } else {
        alert("Account Created Successfully.");
        window.location.href = callbackUrl;
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during signup.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory py-12 relative flex items-center justify-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30Z\' fill=\'none\' stroke=\'%238B1E3F\' stroke-width=\'1\'/%3E%3C/svg%3E')]"></div>
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-mustard rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="fixed top-40 -left-40 w-96 h-96 bg-mithila-red rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-3xl w-full px-4 relative z-10">
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
            <h1 className="font-playfair text-3xl font-bold text-maroon mb-2">Create Account</h1>
            <p className="text-dark-text/70 text-sm">Join us and enjoy a seamless shopping experience.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Information */}
            <div>
              <h3 className="font-playfair text-xl text-maroon mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-maroon/10 text-maroon flex items-center justify-center text-xs mr-2">1</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User size={18} className="text-dark-text/40" /></div>
                  <input type="text" required placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail size={18} className="text-dark-text/40" /></div>
                  <input type="email" required placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Smartphone size={18} className="text-dark-text/40" /></div>
                  <input type="tel" required placeholder="Mobile Number" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                </div>
                <div className="relative">
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all text-dark-text/70 appearance-none">
                    <option value="" disabled>Gender (Optional)</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="font-playfair text-xl text-maroon mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-maroon/10 text-maroon flex items-center justify-center text-xs mr-2">2</span>
                Account Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative md:col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><User size={18} className="text-dark-text/40" /></div>
                  <input type="text" placeholder="Username (Optional)" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                </div>
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock size={18} className="text-dark-text/40" /></div>
                    <input type={showPassword ? "text" : "password"} required placeholder="Password" value={formData.password} onChange={handlePasswordChange} className="w-full pl-10 pr-12 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-text/40 hover:text-maroon transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  {formData.password.length > 0 && (
                    <div className="flex space-x-1 px-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div key={level} className={`h-1.5 flex-1 rounded-full ${level <= passwordStrength ? (passwordStrength < 2 ? 'bg-red-400' : passwordStrength < 4 ? 'bg-mustard' : 'bg-green-500') : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock size={18} className="text-dark-text/40" /></div>
                  <input type={showConfirmPassword ? "text" : "password"} required placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full pl-10 pr-12 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-dark-text/40 hover:text-maroon transition-colors">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h3 className="font-playfair text-xl text-maroon mb-4 flex items-center">
                <span className="w-6 h-6 rounded-full bg-maroon/10 text-maroon flex items-center justify-center text-xs mr-2">3</span>
                Address Information
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Globe size={18} className="text-dark-text/40" /></div>
                  <input type="text" required placeholder="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                </div>
                <div className="relative col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin size={18} className="text-dark-text/40" /></div>
                  <input type="text" required placeholder="State" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                </div>
                <div className="relative col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Building size={18} className="text-dark-text/40" /></div>
                  <input type="text" required placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                </div>
                <div className="relative col-span-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><MapPin size={18} className="text-dark-text/40" /></div>
                  <input type="text" required placeholder="PIN Code" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30" />
                </div>
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-3 bg-white/30 p-4 rounded-xl border border-white/50">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" required checked={formData.acceptTerms} onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})} className="mt-1 rounded border-gray-300 text-maroon focus:ring-maroon bg-white/60 w-4 h-4" />
                <span className="text-sm text-dark-text/80">I accept the <Link href="/terms" className="text-mustard hover:text-maroon font-medium underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-mustard hover:text-maroon font-medium underline">Privacy Policy</Link>.</span>
              </label>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input type="checkbox" checked={formData.subscribePromo} onChange={(e) => setFormData({...formData, subscribePromo: e.target.checked})} className="mt-1 rounded border-gray-300 text-maroon focus:ring-maroon bg-white/60 w-4 h-4" />
                <span className="text-sm text-dark-text/80">Subscribe to promotional emails and exclusive Mithila Maati offers.</span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading || formData.password !== formData.confirmPassword}
              className="w-full bg-maroon text-ivory py-4 rounded-xl font-bold hover:bg-mithila-red transition-all shadow-[0_4px_14px_0_rgba(139,30,63,0.39)] flex justify-center items-center group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-ivory border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <CheckCircle className="ml-2 group-hover:scale-110 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social Sign Up */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-text/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#FFF8E7] text-dark-text/50">Or sign up with</span>
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
            Already have an account?{" "}
            <Link href="/login" className="text-mustard hover:text-maroon font-bold transition-colors">
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
