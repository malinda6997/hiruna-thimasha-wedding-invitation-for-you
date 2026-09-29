"use client";

import React, {useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LocationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".loc-reveal",
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#fbfbfa] text-[#1a1820] py-8 sm:py-12 px-6 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');

        .loc-font-cinzel {
          font-family: 'Cinzel', serif;
        }
        .loc-font-lora {
          font-family: 'Lora', serif;
        }
      `}</style>

      {/* SINGLE UNIFIED COMPACT CARD CONTAINER */}
      <div className="loc-reveal w-full max-w-md mx-auto bg-white p-5 sm:p-6 rounded-2xl border border-purple-100 shadow-xl shadow-purple-950/10 flex flex-col items-center text-center relative z-10">
        
        {/* ICON BADGE */}
        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-200 mb-2.5 shadow-inner">
          <MapPin className="w-5 h-5 text-[#A00818]" />
        </div>

        <span className="loc-font-lora text-[11px] text-[#A00818] tracking-[0.25em] uppercase font-semibold mb-1">
          VENUE & DIRECTIONS
        </span>

        <h3 className="loc-font-cinzel text-lg sm:text-xl font-bold text-[#1a1820] mb-1.5">
          Kavindu Grand Banquet Hall
        </h3>

        <p className="loc-font-lora text-xs sm:text-sm text-[#554d63] mb-4 font-light leading-relaxed max-w-sm">
          Weralugama, Kuliyapitiya, Sri Lanka. Join us to celebrate our special day with joy and blessings.
        </p>

        {/* EMBEDDED GOOGLE MAP VIEW */}
        <div className="w-full h-[240px] sm:h-[300px] rounded-xl overflow-hidden border border-purple-100/80 shadow-inner bg-purple-50/50 p-1">
          <div className="w-full h-full rounded-lg overflow-hidden relative">
            <iframe
              title="Kavindu Grand Banquet Hall Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.218557342628!2d80.03818777476295!3d7.477797792518464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3217b1d9c2233%3A0x6b8764a8cb01980a!2sKuliyapitiya!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[15%] contrast-[105%]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}