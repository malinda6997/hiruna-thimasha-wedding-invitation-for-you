"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock, Sparkles, Utensils, Music, Heart } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WeddingTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".timeline-reveal",
        { opacity: 0, y: 35, filter: "blur(6px)" },
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

      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, y: 50, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".timeline-list", start: "top 82%" },
        }
      );

      // Animate the connecting line drawing downward as items reveal
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ".timeline-list", start: "top 82%" },
        }
      );
    },
    { scope: containerRef }
  );

  const events = [
    { time: "10:30 AM", title: "Arrival of Guests", description: "Welcoming all our beloved family and friends to the venue.", icon: <Sparkles className="w-4 h-4 text-[#7e22ce]" /> },
    { time: "11:45 AM", title: "Blessings & Photography", description: "Capturing precious moments and receiving warm wishes from guests.", icon: <Clock className="w-4 h-4 text-[#7e22ce]" /> },
    { time: "12:30 PM", title: "Wedding Reception & Lunch", description: "Celebrating together with a grand feast, music, and joy.", icon: <Utensils className="w-4 h-4 text-[#7e22ce]" /> },
    { time: "04:00 PM", title: "Going Away", description: "Bidding farewell as we embark on our journey together.", icon: <Music className="w-4 h-4 text-[#7e22ce]" /> },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#fbfbfa] text-[#1a1820] py-16 px-5 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
        .time-font-cinzel { font-family: 'Cinzel', serif; }
        .time-font-lora { font-family: 'Lora', serif; }
      `}</style>

      <div className="text-center max-w-sm mx-auto mb-10 relative z-10">
        <span className="timeline-reveal time-font-lora text-[11px] text-[#7e22ce] tracking-[0.25em] uppercase font-semibold mb-2 block">
          SPECIAL MOMENTS
        </span>
        <h2 className="timeline-reveal time-font-cinzel text-2xl sm:text-3xl font-extrabold tracking-wide text-[#1a1820] mb-2">
          Wedding Timeline
        </h2>
        <p className="timeline-reveal time-font-lora italic text-xs text-[#554d63]">
          A glimpse into the auspicious schedule of our celebration.
        </p>
      </div>

      <div className="timeline-list relative z-10 w-full max-w-md mx-auto flex flex-col gap-4 pl-4 sm:pl-6">
        <div className="timeline-line absolute left-[27px] sm:left-[31px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-purple-300 via-purple-200 to-transparent" />

        {events.map((ev, index) => (
          <div key={index} className="timeline-item relative flex items-start gap-4 w-full group">
            <div className="relative z-10 flex-shrink-0 mt-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border-2 border-purple-200 shadow-md shadow-purple-950/5 flex items-center justify-center group-active:border-[#7e22ce] group-active:scale-110 transition-all duration-300">
                {ev.icon}
              </div>
            </div>

            <div className="flex-1 bg-white p-4 sm:p-5 rounded-2xl border border-purple-100/80 shadow-lg shadow-purple-950/5 group-active:border-purple-300 group-active:shadow-[0_10px_25px_rgba(126,34,206,0.1)] transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <span className="inline-block text-[11px] font-bold tracking-wider text-[#7e22ce] uppercase time-font-cinzel bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                  {ev.time}
                </span>
              </div>
              <h3 className="time-font-cinzel text-base sm:text-lg font-bold text-[#1a1820] mb-1">{ev.title}</h3>
              <p className="time-font-lora text-xs sm:text-sm text-[#554d63] leading-relaxed font-light">{ev.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}