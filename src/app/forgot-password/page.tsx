"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Smartphone, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({ 
    identifier: "", 
    otp: "", 
    newPassword: "", 
    confirmPassword: "" 
  });

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Password Reset Successfully!");
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ivory py-12 relative flex items-center justify-center overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30Z\' fill=\'none\' stroke=\'%238B1E3F\' stroke-width=\'1\'/%3E%3C/svg%3E')]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mustard rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-maroon rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] min-h-[450px] flex flex-col"
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
            <h1 className="font-playfair text-3xl font-bold text-maroon mb-2">Reset Password</h1>
            <p className="text-dark-text/70 text-sm">
              {step === 1 && "Enter your email or mobile to receive an OTP."}
              {step === 2 && "Enter the 6-digit OTP sent to your device."}
              {step === 3 && "Create a new strong password."}
            </p>
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOTP} 
                  className="space-y-5"
                >
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

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-maroon text-ivory py-3.5 rounded-xl font-bold hover:bg-mithila-red transition-all shadow-[0_4px_14px_0_rgba(139,30,63,0.39)] flex justify-center items-center group disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-ivory border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerifyOTP} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-1">Enter OTP</label>
                    <input 
                      type="text" 
                      required
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value})}
                      className="w-full px-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30 tracking-[0.5em] text-center text-2xl font-bold"
                      placeholder="------"
                      maxLength={6}
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading || formData.otp.length < 6}
                    className="w-full bg-mustard text-dark-text py-3.5 rounded-xl font-bold hover:bg-[#c49314] transition-all shadow-[0_4px_14px_0_rgba(212,160,23,0.39)] flex justify-center items-center group disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-dark-text border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Verify OTP
                        <ShieldCheck className="ml-2 group-hover:scale-110 transition-transform" size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {step === 3 && (
                <motion.form 
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleResetPassword} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-1">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-dark-text/40" />
                      </div>
                      <input 
                        type="password" 
                        required
                        value={formData.newPassword}
                        onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-1">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={18} className="text-dark-text/40" />
                      </div>
                      <input 
                        type="password" 
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-white/60 border border-white focus:border-maroon focus:ring-1 focus:ring-maroon rounded-xl outline-none transition-all placeholder:text-dark-text/30"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading || formData.newPassword !== formData.confirmPassword}
                    className="w-full bg-maroon text-ivory py-3.5 rounded-xl font-bold hover:bg-mithila-red transition-all shadow-[0_4px_14px_0_rgba(139,30,63,0.39)] flex justify-center items-center group disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-ivory border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Submit New Password
                        <CheckCircle className="ml-2 group-hover:scale-110 transition-transform" size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 text-center text-sm text-dark-text/70 border-t border-dark-text/10 pt-4">
            Remember your password?{" "}
            <Link href="/login" className="text-mustard hover:text-maroon font-bold transition-colors">
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
