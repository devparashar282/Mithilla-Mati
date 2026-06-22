"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Riya Sharma",
    image: "/slide_village.png", // using placeholder image
    rating: 5,
    text: "The quality of Mithila Maati Makhana is unparalleled. It's so crunchy and fresh. You can literally taste the authenticity in every bite. Highly recommended for healthy snacking!",
  },
  {
    id: 2,
    name: "Amit Patel",
    image: "/slide_village.png", // using placeholder image
    rating: 5,
    text: "I have tried many brands, but the Peri Peri Makhana from Mithila Maati is by far the best. The packaging is premium and the taste is incredibly authentic. Love their story too.",
  },
  {
    id: 3,
    name: "Sneha Desai",
    image: "/slide_village.png", // using placeholder image
    rating: 4,
    text: "Absolutely love the traditional touch! The fact that it is sourced directly from Mithila farmers makes it so special. A perfect guilt-free snack for my evening tea.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold text-maroon mb-4">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-mustard mx-auto"></div>
        </div>

        <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-maroon/10">
          <Quote size={60} className="text-mustard/20 absolute top-6 left-6" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="flex mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={24} className="text-mustard fill-mustard" />
                ))}
              </div>
              
              <p className="font-playfair text-xl md:text-2xl text-dark-text italic leading-relaxed mb-8">
                "{testimonials[current].text}"
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-mustard">
                  <Image src={testimonials[current].image} alt={testimonials[current].name} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-maroon text-lg">{testimonials[current].name}</h4>
                  <p className="text-gray-500 text-sm">Verified Buyer</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center space-x-4 mt-8">
            <button onClick={prev} className="p-3 rounded-full bg-ivory hover:bg-mustard text-maroon hover:text-dark-text transition-colors shadow">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-3 rounded-full bg-ivory hover:bg-mustard text-maroon hover:text-dark-text transition-colors shadow">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
