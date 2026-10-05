"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Text, Button, Heading } from "@radix-ui/themes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll progress when landing page mounts to ensure camera starts at correct position
    if (typeof window !== 'undefined') {
      (window as any).landingCameraProgress = 0;
      console.log('🔄 Landing page mounted - reset landingCameraProgress to 0');
    }

    // Enable scrolling on body when landing page is mounted
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';

    gsap.registerPlugin(ScrollTrigger);

    // Animate title flying off
    gsap.to(titleRef.current, {
      y: -200,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Button stays in place - no animation

    // Camera animation - move backwards
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // Restore original overflow when component unmounts
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen z-[9999]"
      style={{
        background: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 100%)',
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* Hero Section - Full Screen */}
      <div ref={heroRef} className="relative w-full h-screen flex flex-col items-center justify-center z-20">
        {/* Text Content - Center */}
        <div ref={titleRef} className="z-30 flex flex-col items-center justify-center text-center px-8 mb-16">
          <Heading
            size="9"
            weight="bold"
            style={{
              color: 'white',
              letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
            }}
          >
            VibeTrade
          </Heading>

          <Text
            size="5"
            className="max-w-2xl"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '1rem',
            }}
          >
            Your AI Trading Companion
          </Text>

          <Button
            ref={buttonRef}
            onClick={onEnter}
            size="4"
            style={{
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
              backgroundColor: '#be185d',
              color: 'white',
            }}
          >
            Enter Dashboard
          </Button>
        </div>

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
          <div
            className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,87,181,0.3) 0%, transparent 50%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,12,130,0.25) 0%, transparent 50%)',
              filter: 'blur(100px)',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(250,122,180,0.2) 0%, transparent 60%)',
              filter: 'blur(120px)',
            }}
          />
        </div>
      </div>

      {/* System Architecture Section */}
      <div className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-6xl font-bold mb-12 text-center"
            style={{
              color: '#831843',
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontStyle: 'italic',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            System Architecture
          </motion.h2>
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg border-2"
            style={{ borderColor: '#fce7f3' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src="/architecture.jpg"
              alt="VibeTrade system architecture diagram"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>

    </div>
  );
}

