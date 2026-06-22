"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Truck, Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Placeholder 3D Component for Makhana Seeds
function FloatingSeed({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        {/* Simulating a slightly bumpy texture for Makhana */}
        <meshStandardMaterial 
          color="#fdfbf7" 
          roughness={0.8} 
          metalness={0.1}
          bumpScale={0.02}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="sunset" />
      
      {/* Several floating makhana seeds */}
      <FloatingSeed position={[-3, 2, -2]} scale={1.2} />
      <FloatingSeed position={[4, 1, -5]} scale={0.8} />
      <FloatingSeed position={[-4, -2, -3]} scale={1.5} />
      <FloatingSeed position={[3, -3, -1]} scale={1} />
      <FloatingSeed position={[0, 4, -4]} scale={0.9} />
    </>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on text and image
      gsap.to(textRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(imageRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen pt-24 overflow-hidden bg-cream flex items-center">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Scene />
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div ref={textRef} className="space-y-8">
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight">
            From the Sacred Ponds of Mithila to Your Home
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed">
            Handpicked Premium Makhana crafted through generations of tradition. Experience the true taste of cultural heritage and luxury.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/shop" className="px-8 py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta/90 transition-all text-center shadow-lg shadow-terracotta/30 hover:-translate-y-1">
              Shop Now
            </Link>
            <Link href="/story" className="px-8 py-4 bg-transparent border-2 border-charcoal text-charcoal rounded-full font-medium hover:bg-charcoal hover:text-white transition-all text-center">
              Explore Mithila Story
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-charcoal">
              <ShieldCheck className="text-organic" size={24} />
              <span className="font-medium text-sm">COD Available</span>
            </div>
            <div className="flex items-center space-x-2 text-charcoal">
              <Truck className="text-organic" size={24} />
              <span className="font-medium text-sm">Free Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-charcoal">
              <Leaf className="text-organic" size={24} />
              <span className="font-medium text-sm">Organic Certified</span>
            </div>
          </div>
        </div>

        {/* Hero Image Container */}
        <div ref={imageRef} className="relative h-[600px] w-full hidden lg:block">
          <div className="absolute inset-0 glass-dark rounded-full scale-90 blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 rounded-full shadow-2xl relative overflow-hidden border-4 border-white/50 hover:scale-105 transition-transform duration-500">
               <Image 
                 src="/hero-makhana.png" 
                 alt="Premium Mithila Maati Makhana" 
                 fill 
                 className="object-cover"
                 priority
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
