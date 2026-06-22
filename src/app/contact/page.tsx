"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  PhoneCall, Mail, MapPin, MessageCircle, Clock, 
  Package, RefreshCcw, CreditCard, Info, 
  ChevronDown, ChevronUp, Send, MessageSquare
} from "lucide-react";
import Link from "next/link";

const faqs = [
  { q: "How can I track my order?", a: "You can track your order in the 'My Orders' section of your Dashboard. Once your order ships, we'll also send you an email with a tracking link." },
  { q: "How do I return a product?", a: "To return a product, navigate to the Order Details page in your Dashboard and click 'Return Product'. Note that returns must be initiated within 7 days of delivery." },
  { q: "When will I receive my refund?", a: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method." },
  { q: "What payment methods are accepted?", a: "We accept all major Credit/Debit cards, UPI, Net Banking, and Wallets. Cash on Delivery (COD) is also available in select pin codes." },
  { q: "How can I contact customer support?", a: "You can reach us via the Contact Form below, email us at support@mithilamaati.com, or use the live chat widget for instant assistance." },
];

export default function ContactUsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Your message has been sent successfully. We will get back to you shortly!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-maroon/5 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ rotate: -360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-mustard/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* 1. HERO SECTION */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-playfair text-4xl md:text-6xl font-bold text-maroon drop-shadow-sm"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-dark-text/70 leading-relaxed"
          >
            We are here to help you with your orders, payments, returns, refunds, and any other queries.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <button className="px-8 py-3.5 bg-maroon text-ivory rounded-xl font-bold hover:bg-mithila-red transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Start a Conversation
            </button>
            <button className="px-8 py-3.5 bg-white border-2 border-maroon text-maroon rounded-xl font-bold hover:bg-maroon hover:text-white transition-all shadow-md">
              Contact Support
            </button>
          </motion.div>
        </section>

        {/* 2. CONTACT INFORMATION & COMPANY DETAILS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Support Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] madhubani-card"
          >
            <h3 className="font-playfair text-2xl font-bold text-maroon mb-6 flex items-center">
              <PhoneCall className="mr-3 text-mustard" /> Customer Support
            </h3>
            <div className="space-y-4 text-dark-text/80">
              <p className="flex items-center"><PhoneCall size={18} className="mr-3 opacity-60" /> +91 1800-123-4567</p>
              <p className="flex items-center"><MessageCircle size={18} className="mr-3 text-green-600" /> +91 98765 43210 (WhatsApp)</p>
              <p className="flex items-center"><Mail size={18} className="mr-3 opacity-60" /> support@mithilamaati.com</p>
            </div>
          </motion.div>

          {/* Working Hours & Response Time */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] madhubani-card"
          >
            <h3 className="font-playfair text-2xl font-bold text-maroon mb-6 flex items-center">
              <Clock className="mr-3 text-mustard" /> Operating Hours
            </h3>
            <div className="space-y-4 text-dark-text/80">
              <div>
                <p className="font-bold text-dark-text">Working Hours</p>
                <p>Monday to Saturday: 9:00 AM to 7:00 PM</p>
              </div>
              <div className="pt-2 border-t border-maroon/10">
                <p className="font-bold text-dark-text">Response Time</p>
                <p>Email: Within 24 Hours</p>
                <p>WhatsApp: Within 2 Hours</p>
              </div>
            </div>
          </motion.div>

          {/* Company Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] madhubani-card md:col-span-2 lg:col-span-1"
          >
            <h3 className="font-playfair text-2xl font-bold text-maroon mb-6 flex items-center">
              <MapPin className="mr-3 text-mustard" /> Headquarters
            </h3>
            <div className="space-y-4 text-dark-text/80">
              <p className="font-bold text-dark-text">Mithila Maati Organics Pvt. Ltd.</p>
              <p>123 Heritage Lane, Mithila Vihar</p>
              <p>Darbhanga, Bihar, India - 846004</p>
              <div className="pt-2 border-t border-maroon/10">
                <p className="font-medium">GSTIN: 10AABCM1234N1Z5</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. CUSTOMER SUPPORT OPTIONS (CARDS) */}
        <section>
          <div className="text-center mb-10">
            <h2 className="font-playfair text-3xl font-bold text-maroon mb-4">How Can We Help?</h2>
            <p className="text-dark-text/70">Select the category that best describes your issue.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, title: "Order Support", desc: "Track orders, delivery issues, and updates." },
              { icon: RefreshCcw, title: "Returns & Refunds", desc: "Request returns, replacements, and refund help." },
              { icon: CreditCard, title: "Payment Support", desc: "Resolve payment failures and transaction issues." },
              { icon: Info, title: "Product Support", desc: "Ask product-related questions before purchase." },
            ].map((option, idx) => {
              const Icon = option.icon;
              return (
                <motion.div 
                  key={option.title}
                  initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="bg-white border-2 border-transparent hover:border-maroon/20 rounded-2xl p-6 text-center transition-all cursor-pointer group shadow-sm hover:shadow-xl"
                >
                  <div className="w-16 h-16 mx-auto bg-maroon/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-maroon transition-colors">
                    <Icon size={28} className="text-maroon group-hover:text-mustard transition-colors" />
                  </div>
                  <h4 className="font-bold text-lg text-dark-text mb-2">{option.title}</h4>
                  <p className="text-sm text-dark-text/60">{option.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* 4. CONTACT FORM & MAP SPLIT */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_0_rgba(31,38,135,0.08)]"
          >
            <h2 className="font-playfair text-3xl font-bold text-maroon mb-2">Send us a Message</h2>
            <p className="text-dark-text/70 mb-8">Fill out the form below and we will get back to you within 24 hours.</p>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Full Name *</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-maroon rounded-xl outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Mobile Number *</label>
                  <input type="tel" required className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-maroon rounded-xl outline-none transition-all" placeholder="+91 98765 43210" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Email Address *</label>
                  <input type="email" required className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-maroon rounded-xl outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">Order ID (Optional)</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-maroon rounded-xl outline-none transition-all" placeholder="ORD-123456" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">Category *</label>
                <div className="relative">
                  <select required className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-maroon rounded-xl outline-none transition-all appearance-none cursor-pointer">
                    <option value="">Select a category</option>
                    <option value="order">Order Related Query</option>
                    <option value="product">Product Information</option>
                    <option value="return">Return & Refund</option>
                    <option value="shipping">Shipping Issue</option>
                    <option value="payment">Payment Issue</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">Subject *</label>
                <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-maroon rounded-xl outline-none transition-all" placeholder="Brief subject of your query" />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-text mb-2">Message *</label>
                <textarea required rows={5} className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-maroon rounded-xl outline-none transition-all resize-none" placeholder="Explain your query in detail..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center justify-center py-4 bg-maroon text-ivory rounded-xl font-bold hover:bg-mithila-red transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : <><Send size={18} className="mr-2" /> Submit Request</>}
              </button>
            </form>
          </motion.div>

          {/* Map & Socials */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="w-full h-[400px] bg-white border border-white/50 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.08)] p-2"
            >
              {/* Mock Google Map iframe */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114674.39801825026!2d85.82390885233157!3d26.155823193238686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edb7a4db7b8763%3A0xcb13e155bc812040!2sDarbhanga%2C%20Bihar!5e0!3m2!1sen!2sin!4v1718501234567!5m2!1sen!2sin" 
                className="w-full h-full rounded-2xl border-0 grayscale hover:grayscale-0 transition-all duration-500" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-maroon text-ivory rounded-3xl p-8 shadow-xl flex items-center justify-between"
            >
              <h3 className="font-playfair font-bold text-xl">Follow Us On</h3>
              <div className="flex space-x-4">
                <Link href="#" className="w-10 h-10 rounded-full bg-ivory/10 hover:bg-mustard hover:text-maroon flex items-center justify-center transition-colors" title="Facebook">
                  <svg xmlns="http://www.0000.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-ivory/10 hover:bg-mustard hover:text-maroon flex items-center justify-center transition-colors" title="Instagram">
                  <svg xmlns="http://www.0000.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-ivory/10 hover:bg-mustard hover:text-maroon flex items-center justify-center transition-colors" title="LinkedIn">
                  <svg xmlns="http://www.0000.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-ivory/10 hover:bg-mustard hover:text-maroon flex items-center justify-center transition-colors" title="Twitter / X">
                  <svg xmlns="http://www.0000.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-ivory/10 hover:bg-mustard hover:text-maroon flex items-center justify-center transition-colors" title="YouTube">
                  <svg xmlns="http://www.0000.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </Link>
              </div>
            </motion.div>
          </div>

        </section>

        {/* 5. FAQ SECTION */}
        <section className="max-w-4xl mx-auto pb-12">
          <div className="text-center mb-10">
            <h2 className="font-playfair text-3xl font-bold text-maroon mb-4">Frequently Asked Questions</h2>
            <p className="text-dark-text/70">Find quick answers to common queries.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === idx ? 'shadow-md border-maroon/20' : 'shadow-sm'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between font-bold text-maroon text-left"
                >
                  {faq.q}
                  {openFaq === idx ? <ChevronUp size={20} className="text-mustard" /> : <ChevronDown size={20} />}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-5 text-dark-text/70 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 6. NEWSLETTER SECTION */}
        <section>
          <div className="bg-gradient-to-r from-maroon to-mithila-red rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between text-ivory relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
              <h2 className="font-playfair text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-ivory/80 text-lg">Subscribe to our newsletter for the latest product launches, offers, and cultural stories from Mithila.</p>
            </div>
            
            <div className="md:w-1/2 w-full max-w-md relative z-10">
              <form className="flex bg-white p-1 rounded-xl shadow-lg">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow px-4 outline-none text-dark-text bg-transparent"
                  required
                />
                <button className="bg-mustard text-dark-text px-6 py-3 rounded-lg font-bold hover:bg-[#c49314] transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>

      {/* 7. FLOATING LIVE CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden w-80 mb-4 border border-gray-200 flex flex-col"
            >
              <div className="bg-maroon p-4 text-ivory flex justify-between items-center">
                <div>
                  <h4 className="font-bold font-playfair">Mithila Support</h4>
                  <p className="text-xs text-ivory/70">Typically replies in a few minutes</p>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="opacity-70 hover:opacity-100">
                  <ChevronDown size={20} />
                </button>
              </div>
              <div className="p-4 flex-grow bg-gray-50 h-64 overflow-y-auto">
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm text-sm text-dark-text shadow-sm mb-4 inline-block max-w-[85%] border border-gray-100">
                  Namaste! 🙏 How can we help you today?
                </div>
              </div>
              <div className="p-3 bg-white border-t border-gray-100 flex items-center">
                <input type="text" placeholder="Type a message..." className="flex-grow text-sm outline-none px-2" />
                <button className="text-mustard p-2 hover:bg-mustard/10 rounded-full transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 ${isChatOpen ? 'bg-white text-maroon' : 'bg-maroon text-mustard'}`}
        >
          {isChatOpen ? <MessageSquare size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>

    </div>
  );
}
