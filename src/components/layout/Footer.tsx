import Link from "next/link";
import { Camera, MessageCircle, Video, PhoneCall, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-indigo text-ivory pt-16 pb-8 relative overflow-hidden border-t-[8px] border-double border-mustard">
      {/* Decorative Madhubani Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30Z\' fill=\'none\' stroke=\'%23D4A017\' stroke-width=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'10\' fill=\'none\' stroke=\'%23E07A5F\' stroke-width=\'2\'/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-mustard mb-6">MITHILA MAATI</h3>
            <p className="text-cream/80 font-sans leading-relaxed mb-6">
              From the Heart of Mithila to Your Home. Authentic, premium Makhana celebrating traditional heritage.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/mithilamaati_makhana?igsh=ZHp4NW02eWNsazJo" target="_blank" rel="noopener noreferrer" className="text-ivory/80 hover:text-mustard transition-colors" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://x.com/Mithilamatti" target="_blank" rel="noopener noreferrer" className="text-ivory/80 hover:text-mustard transition-colors" title="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@mithila_maati?si=DftI_7sVqe4o8PsC" target="_blank" rel="noopener noreferrer" className="text-ivory/80 hover:text-mustard transition-colors" title="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <path d="m10 15 5-3-5-3z"/>
                </svg>
              </a>
              <a href="#" className="text-ivory/80 hover:text-mustard transition-colors" title="WhatsApp"><PhoneCall size={24} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-xl font-semibold text-mustard mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-ivory/80 hover:text-mustard transition-colors">Home</Link></li>
              <li><Link href="/story" className="text-ivory/80 hover:text-mustard transition-colors">Our Story</Link></li>
              <li><Link href="/products" className="text-ivory/80 hover:text-mustard transition-colors">Products</Link></li>
              <li><Link href="/contact" className="text-ivory/80 hover:text-mustard transition-colors">Contact Us</Link></li>
              <li><Link href="/support" className="text-ivory/80 hover:text-mustard transition-colors">Customer Support</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-playfair text-xl font-semibold text-mustard mb-6">Policies</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-ivory/80 hover:text-mustard transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="text-ivory/80 hover:text-mustard transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return" className="text-ivory/80 hover:text-mustard transition-colors">Return Policy</Link></li>
              <li><Link href="/privacy" className="text-ivory/80 hover:text-mustard transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-xl font-semibold text-mustard mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-mustard mt-1 flex-shrink-0" size={20} />
                <span className="text-ivory/80">Mithila Region, Bihar, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-mustard flex-shrink-0" size={20} />
                <span className="text-ivory/80">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-mustard flex-shrink-0" size={20} />
                <span className="text-ivory/80">support@mithilamaati.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-ivory/60 text-sm">
            &copy; {new Date().getFullYear()} MITHILA MAATI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
