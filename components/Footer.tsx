"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Heart } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".footer-reveal",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <footer
      ref={containerRef}
      className="relative min-h-[70vh] w-full bg-[#fbfbfa] text-[#1a1820] flex flex-col items-center justify-between py-14 px-6 select-none overflow-hidden"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
        .footer-font-cinzel { font-family: 'Cinzel', serif; }
        .footer-font-lora { font-family: 'Lora', serif; }
      `}</style>

      <div />

      <div className="footer-reveal my-auto text-center flex flex-col items-center max-w-md">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center border border-purple-200 text-[#A00818] mb-5 shadow-sm">
          <Heart className="w-6 h-6 fill-[#A00818]/30 animate-pulse" />
        </div>

        <h3 className="footer-font-cinzel text-3xl sm:text-4xl font-extrabold tracking-wider text-[#1a1820] mb-3 uppercase">
          Hiruna & Thimasha
        </h3>

        <p className="footer-font-lora text-sm sm:text-base text-[#554d63] italic font-light">
          &ldquo;With love, forever and always.&rdquo;
        </p>
      </div>

      <div className="footer-reveal text-center text-xs text-[#554d63]/80 tracking-wider footer-font-lora">
        <p>
          © 2026 Hiruna & Thimasha Wedding. Developed with precision by{" "}
          <span className="text-[#A00818] font-semibold tracking-normal">Malinda Prabath</span>.
        </p>
      </div>
    </footer>
  );
}