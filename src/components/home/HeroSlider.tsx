"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/slider 1.png",
    heading: "Pure Mithila Makhana",
    subheading: "Nutrient-rich fox nuts sourced directly from the ponds of Bihar.",
    cta1: "Shop Now",
    cta1Link: "/products",
    cta2: "Explore Products",
    cta2Link: "/products",
  },
  {
    id: 2,
    image: "/slider 2.png",
    heading: "Healthy Snacking Redefined",
    subheading: "Crunchy, nutritious and naturally delicious.",
    cta1: "Buy Now",
    cta1Link: "/products",
  },
  {
    id: 3,
    image: "/slider 3.png",
    heading: "Taste the Heritage of Mithila",
    subheading: "Tradition, Culture & Wellness in Every Bite.",
    cta1: "Discover Our Story",
    cta1Link: "/story",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] md:h-[80vh] md:min-h-[600px] overflow-hidden bg-maroon">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].heading}
            fill
            priority
            className="object-contain sm:object-cover"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="font-playfair text-5xl md:text-7xl font-bold text-ivory mb-6 drop-shadow-lg"
              >
                {slides[currentSlide].heading}
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-sans text-lg md:text-2xl text-ivory/90 mb-10 drop-shadow-md"
              >
                {slides[currentSlide].subheading}
              </motion.p>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href={slides[currentSlide].cta1Link} className="px-8 py-4 bg-mithila-red text-ivory rounded font-medium hover:bg-mustard hover:text-dark-text transition-colors shadow-lg">
                  {slides[currentSlide].cta1}
                </Link>
                {slides[currentSlide].cta2 && (
                  <Link href={slides[currentSlide].cta2Link} className="px-8 py-4 bg-transparent border-2 border-ivory text-ivory rounded font-medium hover:bg-ivory hover:text-maroon transition-colors shadow-lg">
                    {slides[currentSlide].cta2}
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-ivory/20 hover:bg-ivory/40 text-ivory backdrop-blur-sm transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-ivory/20 hover:bg-ivory/40 text-ivory backdrop-blur-sm transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-mustard scale-125" : "bg-ivory/50 hover:bg-ivory"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
