"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Heart } from "lucide-react";
import RosePetals from "@/components/RosePetals";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CoupleHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // Slow color shifting text gradient
      gsap.to(".hero-title-main", {
        backgroundPosition: "-200% center",
        duration: 18,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      });

      // Subtle parallax drift on the hero photo as the user scrolls away —
      // cheap on mobile GPUs and makes the exit feel intentional.
      gsap.to(bgRef.current, {
        yPercent: 15,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.1 }
      )
        .fromTo(
          ".hero-title-main",
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-datetime-text",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-quote",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-scroll-btn",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-end pb-12 sm:pb-16 p-4 sm:p-6 text-center overflow-hidden select-none bg-[#030206]"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');

        .hero-font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .hero-font-lora {
          font-family: 'Lora', serif;
        }

        .animated-text-gradient {
          background-image: linear-gradient(
            120deg,
            #ffffff 0%,
            #e9d5ff 25%,
            #c084fc 50%,
            #d8b4fe 75%,
            #ffffff 100%
          );
          background-size: 300% 100%;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* HERO ONLY ROSE PETALS */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <RosePetals />
      </div>

      {/* 1. BACKGROUND PHOTO (with parallax) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgRef}
          src="/assets/p6.jpg"
          alt="Hiruna and Thimasha Wedding"
          className="w-full h-full object-cover object-[center_35%] sm:object-center brightness-[0.72] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 via-60% to-[#030206]" />
      </div>

      {/* 2. PURPLE AMBIENT MESH */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] sm:w-[800px] h-[250px] sm:h-[450px] rounded-full bg-gradient-to-t from-[#581c87]/80 via-[#3b0764]/50 to-transparent blur-[60px] md:blur-[140px] pointer-events-none z-1" />

      {/* 3. HERO CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-2">
        <div className="hero-badge flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/40 bg-purple-950/70 backdrop-blur-md mb-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          <Heart className="w-3.5 h-3.5 text-purple-300 fill-purple-300/40" />
          <span className="hero-font-lora text-xs sm:text-sm text-purple-100 tracking-wider uppercase font-semibold">
            Wedding Invitation
          </span>
          <Heart className="w-3.5 h-3.5 text-purple-300 fill-purple-300/40" />
        </div>

        <h1 className="hero-title-main hero-font-cinzel animated-text-gradient text-4xl sm:text-7xl md:text-8xl font-black tracking-widest drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)] my-2">
          HIRUNA & THIMASHA
        </h1>

        <div className="hero-datetime-text hero-font-lora flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 my-2 text-sm sm:text-lg text-white font-bold tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          <span>November 15, 2026</span>
          <span className="text-purple-300">•</span>
          <span>10:30 AM – 04:00 PM</span>
        </div>

        <p className="hero-quote hero-font-lora italic text-lg sm:text-2xl text-purple-100 font-medium tracking-wide max-w-2xl my-2 leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          The beautiful beginning of two hearts bound together...
        </p>

        <div className="hero-scroll-btn mt-6 sm:mt-8">
          <button
            aria-label="Scroll to our story"
            onClick={() => {
              const nextSection = document.getElementById("chapter-story");
              nextSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-1.5 text-purple-100 active:text-white transition-colors duration-300 group cursor-pointer"
          >
            <span className="hero-font-lora text-xs sm:text-sm tracking-wider uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Discover Our Story
            </span>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-purple-400/50 bg-black/50 flex items-center justify-center group-active:border-purple-300 group-active:bg-purple-600/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce text-purple-200" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}