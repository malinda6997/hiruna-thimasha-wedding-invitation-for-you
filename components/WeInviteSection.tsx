"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  Download,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WeInviteSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const petalsContainerRef = useRef<HTMLDivElement>(null);

  const [displayedText, setDisplayedText] = useState("");

  const fullText =
    "Together with our families, we joyfully invite you to celebrate our wedding day. Your presence, love, and blessings mean the world to us as we begin this new chapter together.";

  const [isTypingStarted, setIsTypingStarted] = useState(false);

  useEffect(() => {
    const container = petalsContainerRef.current;
    if (!container) return;

    const petalCount = 12;
    const petals: HTMLDivElement[] = [];
    const tweens: gsap.core.Tween[] = [];

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement("div");

      petal.className =
        "absolute pointer-events-none rounded-full bg-[#A00818]/40 blur-[0.5px]";

      const size = Math.random() * 8 + 6;
      const startX = Math.random() * container.offsetWidth;
      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 5;

      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.4}px`;
      petal.style.left = `${startX}px`;
      petal.style.top = `-20px`;
      petal.style.borderRadius = "60% 40% 60% 40%";

      container.appendChild(petal);
      petals.push(petal);

      tweens.push(
        gsap.to(petal, {
          y: container.offsetHeight + 40,
          x: `+=${(Math.random() - 0.5) * 80}`,
          rotation: Math.random() * 360,
          duration: duration,
          repeat: -1,
          delay: delay,
          ease: "none",
        })
      );
    }

    return () => {
      tweens.forEach((t) => t.kill());
      petals.forEach((p) => p.remove());
    };
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".invite-reveal",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            onEnter: () => setIsTypingStarted(true),
          },
        }
      );
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (!isTypingStarted) return;

    let i = 0;
    setDisplayedText("");

    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isTypingStarted]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#fbfbfa] text-[#1a1820] py-20 px-6 sm:px-12 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');

        .invite-font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .invite-font-lora {
          font-family: 'Lora', serif;
        }

        @keyframes continuous-bounce {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        .animate-continuous-bounce {
          animation: continuous-bounce 2.4s ease-in-out infinite;
        }

        .cursor-blink-invite::after {
          content: "|";
          animation: blink 1s infinite;
          color: #A00818;
          font-weight: bold;
          margin-left: 2px;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0;
          }
        }

        @keyframes rotateBorder {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        .animated-border-card {
          position: relative;
          border-radius: 1.5rem;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #fff1f2 100%
          );
          overflow: hidden;
        }

        .animated-border-card::before {
          content: '';
          position: absolute;
          inset: -50%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 60deg,
            #A00818 150deg,
            #B91C2C 200deg,
            transparent 260deg,
            transparent 360deg
          );
          animation: rotateBorder 5s linear infinite;
          z-index: 0;
        }

        .animated-border-card-inner {
          position: relative;
          background: linear-gradient(
            to bottom right,
            #ffffff,
            #fff7f7
          );
          border-radius: calc(1.5rem - 2px);
          z-index: 1;
          margin: 2px;
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

        {/* INVITATION IMAGE */}
        <div
          ref={imageRef}
          className="lg:col-span-5 flex justify-center relative"
        >
          <div
            ref={petalsContainerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-20 rounded-2xl"
          />

          <div className="w-full max-w-xs sm:max-w-sm h-[380px] sm:h-[480px] flex items-center justify-center relative z-10">
            <img
              src="/assets/invite-couple.png"
              alt="Hiruna and Thimasha Invitation"
              className="w-full h-full object-contain object-center drop-shadow-xl"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div
          ref={contentRef}
          className="lg:col-span-7 flex flex-col text-center lg:text-left"
        >

          {/* LABEL */}
          <div className="invite-reveal inline-flex items-center justify-center lg:justify-start gap-2 mb-2">

            <Heart className="w-3.5 h-3.5 text-[#A00818] fill-[#A00818]/30" />

            <span className="invite-font-lora text-xs text-[#A00818] tracking-[0.3em] uppercase font-semibold">
              WITH GREAT JOY
            </span>

            <Heart className="w-3.5 h-3.5 text-[#A00818] fill-[#A00818]/30" />

          </div>

          {/* TITLE */}
          <h2 className="invite-reveal invite-font-cinzel text-2xl sm:text-4xl font-extrabold tracking-wide text-[#1a1820] mb-3">
            We Invite{" "}
            <span className="text-[#A00818] italic font-serif">
              You
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="invite-reveal invite-font-lora text-xs sm:text-sm text-[#554d63] leading-relaxed font-light mb-6 max-w-xl min-h-[4rem]">
            <span
              className={
                displayedText.length < fullText.length
                  ? "cursor-blink-invite"
                  : ""
              }
            >
              {displayedText}
            </span>
          </p>

          {/* EVENT DETAILS CARD */}
          <div className="invite-reveal animated-border-card shadow-xl shadow-[#7F000C]/15 max-w-xl mb-6">

            <div className="animated-border-card-inner p-6 flex flex-col gap-4">

              {/* DATE */}
              <div className="flex items-center gap-4 relative z-10">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A00818] to-[#7F000C] flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-[#7F000C]/20">
                  <Calendar className="w-5 h-5" />
                </div>

                <div className="text-left">

                  <h4 className="invite-font-cinzel text-xs font-extrabold text-[#A00818] uppercase tracking-[0.2em] mb-0.5">
                    Date
                  </h4>

                  <p className="invite-font-lora text-sm sm:text-base font-bold text-[#1a1820]">
                    Sunday, November 15, 2026
                  </p>

                </div>
              </div>

              <div className="w-full h-[1px] bg-[#F3C1C7]" />

              {/* TIME */}
              <div className="flex items-center gap-4 relative z-10">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A00818] to-[#7F000C] flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-[#7F000C]/20">
                  <Clock className="w-5 h-5" />
                </div>

                <div className="text-left">

                  <h4 className="invite-font-cinzel text-xs font-extrabold text-[#A00818] uppercase tracking-[0.2em] mb-0.5">
                    Time
                  </h4>

                  <p className="invite-font-lora text-sm sm:text-base font-bold text-[#1a1820]">
                    Auspicious Time: 10:30 AM onwards
                  </p>

                </div>
              </div>

              <div className="w-full h-[1px] bg-[#F3C1C7]" />

              {/* LOCATION */}
              <div className="flex items-center gap-4 relative z-10">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#A00818] to-[#7F000C] flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-[#7F000C]/20">
                  <MapPin className="w-5 h-5" />
                </div>

                <div className="text-left">

                  <h4 className="invite-font-cinzel text-xs font-extrabold text-[#A00818] uppercase tracking-[0.2em] mb-0.5">
                    Location / Venue
                  </h4>

                  <p className="invite-font-lora text-sm sm:text-base font-bold text-[#1a1820] leading-snug">
                    Kavindu Grand Banquet Hall, Weralugama, Kuliyapitiya
                  </p>

                </div>
              </div>

            </div>
          </div>

          {/* DOWNLOAD BUTTON */}
          <div className="invite-reveal flex justify-center lg:justify-start">

            <a
              href="/assets/invite-couple.png"
              download="Hiruna_Thimasha_Wedding_Invitation.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 rounded-full bg-[#A00818] text-white active:bg-[#7F000C] transition-all duration-300 shadow-xl shadow-[#7F000C]/30 animate-continuous-bounce font-sans text-sm sm:text-base font-bold tracking-widest uppercase"
            >
              <Download className="w-4 h-4" />
              Download Invitation
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}