"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Calendar, CalendarPlus,Heart, } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CountdownSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetDate = new Date("2026-11-15T10:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsUrgent(difference < 1000 * 60 * 60 * 24);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsUrgent(false);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Hiruna & Thimasha Wedding");
    const details = encodeURIComponent("Join us for the wedding celebration of Hiruna & Thimasha at Kavindu Grand Banquet Hall, Weralugama, Kuliyapitiya.");
    const location = encodeURIComponent("Kavindu Grand Banquet Hall, Weralugama, Kuliyapitiya");
    const dates = "20261115T050000Z/20261115T110000Z";
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(calendarUrl, "_blank");
  };

  useGSAP(
    () => {
      gsap.fromTo(
        ".count-reveal",
        { opacity: 0, y: 40, filter: "blur(6px)" },
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
        ".countdown-card",
        { opacity: 0, y: 60, scale: 0.85, rotationX: 20 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".countdown-cards-container", start: "top 80%" },
        }
      );
    },
    { scope: containerRef }
  );

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75vh] w-full bg-[#fbfbfa] text-[#1a1820] py-20 px-4 flex flex-col items-center justify-center overflow-hidden select-none [perspective:1200px]"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');
        .count-font-cinzel { font-family: 'Cinzel', serif; }
        .count-font-lora { font-family: 'Lora', serif; }

        @keyframes continuous-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-continuous-bounce { animation: continuous-bounce 2s ease-in-out infinite; }

        @keyframes urgentPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(126, 34, 206, 0.25); }
          50% { box-shadow: 0 0 0 8px rgba(126, 34, 206, 0); }
        }
        .urgent-pulse { animation: urgentPulse 1.8s ease-out infinite; }
      `}</style>

      <div className="text-center max-w-xl mx-auto mb-10 relative z-10">
        <div className="invite-reveal inline-flex items-center justify-center lg:justify-start gap-2 mb-2">

            <Heart className="w-3.5 h-3.5 text-[#A00818] fill-[#A00818]/30" />

            <span className="invite-font-lora text-xs text-[#A00818] tracking-[0.3em] uppercase font-semibold">
              COUNTING DOWN TO FOREVER
            </span>

            <Heart className="w-3.5 h-3.5 text-[#A00818] fill-[#A00818]/30" />

          </div>

        <h2 className="invite-reveal invite-font-cinzel text-3xl sm:text-4xl font-extrabold tracking-wide text-[#1a1820] mb-3">
            Our Wedding{" "}
            <span className="text-[#A00818] italic font-serif">
              Day
            </span>
          </h2>

        {/* <h2 className="count-reveal count-font-cinzel text-3xl sm:text-5xl font-extrabold tracking-wider text-[#1a1820] my-2">
          Our Wedding Day
        </h2> */}

        <p className="count-reveal count-font-lora italic text-sm sm:text-lg text-[#554d63] mt-1">
          November 15, 2026 • 10:30 AM
        </p>
      </div>

      <div className="countdown-cards-container relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-3xl mx-auto px-2 mb-10">
        {[
          { value: timeLeft.days, label: "DAYS" },
          { value: timeLeft.hours, label: "HOURS" },
          { value: timeLeft.minutes, label: "MINUTES" },
          { value: timeLeft.seconds, label: "SECONDS" },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`countdown-card flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl bg-white border border-purple-100 shadow-xl shadow-purple-950/5 active:border-purple-300 active:-translate-y-1 transition-all duration-300 ${
              isUrgent ? "urgent-pulse border-purple-300" : ""
            }`}
          >
            <span className={`count-font-cinzel text-4xl sm:text-6xl font-black tracking-wider ${i === 3 ? "text-[#A00818]" : "text-[#1a1820]"}`}>
              {formatNumber(item.value)}
            </span>
            <span className="count-font-lora text-[10px] sm:text-xs text-[#A00818] tracking-[0.2em] uppercase font-semibold mt-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="count-reveal relative z-10 flex justify-center">
        <button
          onClick={handleAddToCalendar}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#A00818] text-white active:bg-[#6b21a8] transition-all duration-300 shadow-xl shadow-purple-950/25 animate-continuous-bounce count-font-cinzel text-xs sm:text-sm font-bold tracking-widest uppercase cursor-pointer"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Add to Calendar</span>
        </button>
      </div>
    </section>
  );
}