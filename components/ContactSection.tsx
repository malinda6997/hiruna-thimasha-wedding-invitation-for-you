"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Phone, Sparkles, Heart } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 15, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
        }
      );
    },
    { scope: containerRef }
  );

  const contacts = [
    { name: "HIRUNA", phone: "077 610 2900", tel: "tel:+94776102900" }
    
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#fbfbfa] text-[#1a1820] py-14 px-6 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
        .contact-font-cinzel { font-family: 'Cinzel', serif; }
        .contact-font-lora { font-family: 'Lora', serif; }
      `}</style>

      <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
        <div className="contact-reveal inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-200 bg-purple-50 mb-3 shadow-sm">
          <Sparkles className="w-3 h-3 text-[#7e22ce]" />
          <span className="contact-font-lora text-[11px] text-[#7e22ce] tracking-[0.25em] uppercase font-semibold">
            FOREVER TOGETHER
          </span>
          <Sparkles className="w-3 h-3 text-[#7e22ce]" />
        </div>

        <h2 className="contact-reveal contact-font-cinzel text-2xl sm:text-3xl font-extrabold tracking-wide text-[#1a1820] mb-2 uppercase">
          Hiruna & Thimasha
        </h2>

        <p className="contact-reveal contact-font-lora italic text-xs sm:text-sm text-[#554d63] mb-6">
          Thank you for being part of our special beginning.
        </p>

        <div className="contact-reveal w-full flex flex-col gap-3.5 mb-8">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.tel}
              className="group flex items-center gap-3.5 p-3 rounded-xl bg-white border border-purple-100 shadow-md shadow-purple-950/5 active:border-purple-300 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center border border-purple-200 text-[#7e22ce] group-active:bg-[#7e22ce] group-active:text-white transition-colors flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <span className="contact-font-cinzel text-[11px] font-bold text-[#7e22ce] tracking-wider uppercase block">
                  {contact.name}
                </span>
                <span className="contact-font-lora text-xs sm:text-sm font-semibold text-[#1a1820] block">
                  {contact.phone}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="contact-reveal w-full text-center text-[11px] text-[#554d63] tracking-wider contact-font-lora pt-4 border-t border-purple-100/60">
          <p className="mb-1">© 2026 Hiruna & Thimasha. All Rights Reserved.</p>
          <p className="flex items-center justify-center gap-1.5">
            Developed with <Heart className="w-3 h-3 text-[#7e22ce] fill-[#7e22ce]" /> by{" "}
            <span className="text-[#7e22ce] font-bold tracking-normal font-sans uppercase">Malinda Prabath</span>
          </p>
        </div>
      </div>
    </section>
  );
}