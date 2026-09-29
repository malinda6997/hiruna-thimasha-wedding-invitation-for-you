"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface WelcomeScreenProps {
  onFinished: () => void;
}

export default function WelcomeScreen({
  onFinished,
}: WelcomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".welcome-card", {
        opacity: 0,
        scale: 0.96,
        y: 25,
      });

      gsap.set(".welcome-top-decoration", {
        opacity: 0,
        y: -15,
      });

      gsap.set(".welcome-eyebrow", {
        opacity: 0,
        y: 12,
      });

      gsap.set(".welcome-names", {
        opacity: 0,
        y: 20,
      });

      gsap.set(".welcome-message", {
        opacity: 0,
        y: 15,
      });

      gsap.set(".welcome-date", {
        opacity: 0,
        y: 10,
      });

      gsap.set(".welcome-bottom-decoration", {
        opacity: 0,
        scaleX: 0,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.02,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: onFinished,
          });
        },
      });

      tl.to(".welcome-card", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          ".welcome-top-decoration",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.55"
        )
        .to(
          ".welcome-eyebrow",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.35"
        )
        .to(
          ".welcome-names",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          ".welcome-message",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .to(
          ".welcome-date",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          ".welcome-bottom-decoration",
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.25"
        )
        .to(".welcome-card", {
          opacity: 1,
          duration: 1.2,
        })
        .to(".welcome-card", {
          opacity: 0,
          y: -15,
          scale: 0.98,
          duration: 0.55,
          ease: "power2.in",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onFinished]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[998] bg-[#030206] flex items-center justify-center p-5 sm:p-8 select-none overflow-hidden"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');

        .welcome-font-cinzel {
          font-family: "Cinzel", serif;
        }

        .welcome-font-lora {
          font-family: "Lora", serif;
        }

        /* ----------------------------------------
           Ambient glow
        ---------------------------------------- */

        @keyframes welcomeAmbient {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }

          50% {
            opacity: 0.34;
            transform: scale(1.08);
          }
        }

        .welcome-ambient {
          animation: welcomeAmbient 5s ease-in-out infinite;
        }

        /* ----------------------------------------
           Soft floating light
        ---------------------------------------- */

        @keyframes softFloat {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.25;
          }

          50% {
            transform: translateY(-15px);
            opacity: 0.6;
          }
        }

        .welcome-light {
          animation: softFloat 4s ease-in-out infinite;
        }

        /* ----------------------------------------
           Heart pulse
        ---------------------------------------- */

        @keyframes heartPulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.12);
          }
        }

        .welcome-heart {
          animation: heartPulse 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* =========================================
          BACKGROUND
      ========================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Central red glow */}
        <div className="welcome-ambient absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[560px] h-[360px] sm:h-[560px] rounded-full bg-[#A00818]/20 blur-[130px]" />

        {/* Bottom red atmosphere */}
        <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[300px] rounded-full bg-[#7F000C]/15 blur-[120px]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]" />

      </div>

      {/* =========================================
          SMALL FLOATING LIGHTS
      ========================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <span
          className="welcome-light absolute left-[14%] top-[28%] w-1 h-1 rounded-full bg-[#FDA4AF]"
        />

        <span
          className="welcome-light absolute right-[16%] top-[35%] w-1.5 h-1.5 rounded-full bg-[#A00818]"
          style={{ animationDelay: "1s" }}
        />

        <span
          className="welcome-light absolute left-[22%] bottom-[25%] w-1 h-1 rounded-full bg-[#FFE4E6]"
          style={{ animationDelay: "2s" }}
        />

        <span
          className="welcome-light absolute right-[23%] bottom-[22%] w-1 h-1 rounded-full bg-[#FDA4AF]"
          style={{ animationDelay: "1.5s" }}
        />

      </div>

      {/* =========================================
          INVITATION CARD
      ========================================== */}

      <div className="welcome-card relative z-10 w-full max-w-md">

        {/* Outer border */}
        <div className="relative rounded-[2rem] p-[1px] bg-gradient-to-b from-[#A00818]/70 via-[#A00818]/20 to-transparent">

          {/* Card */}
          <div className="relative rounded-[2rem] bg-[#080305]/90 backdrop-blur-xl px-7 py-10 sm:px-12 sm:py-14 text-center overflow-hidden">

            {/* Inner border */}
            <div className="absolute inset-3 rounded-[1.5rem] border border-[#A00818]/15 pointer-events-none" />

            {/* =====================================
                TOP DECORATION
            ====================================== */}

            <div className="welcome-top-decoration relative flex items-center justify-center gap-3 mb-7">

              <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#A00818]/60" />

              <div className="welcome-heart text-[#A00818] text-lg">
                ♥
              </div>

              <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#A00818]/60" />

            </div>

            {/* =====================================
                EYEBROW
            ====================================== */}

            <span className="welcome-eyebrow welcome-font-lora block text-[9px] sm:text-[10px] text-[#FDA4AF] uppercase tracking-[0.45em] font-semibold">
              You Are Invited
            </span>

            {/* =====================================
                WELCOME
            ====================================== */}

            <h1 className="welcome-names welcome-font-cinzel mt-5 text-4xl sm:text-5xl font-bold tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFE4E6] to-[#FDA4AF]">
              Welcome
            </h1>

            {/* =====================================
                COUPLE NAMES
            ====================================== */}

            <div className="welcome-message mt-5">

              <p className="welcome-font-lora text-xs sm:text-sm text-white/55 tracking-wide">
                To the wedding celebration of
              </p>

              <h2 className="welcome-font-cinzel mt-3 text-xl sm:text-2xl text-white font-semibold tracking-[0.08em]">
                Hiruna
                <span className="text-[#A00818] mx-2">&</span>
                Thimasha
              </h2>

            </div>

            {/* =====================================
                MESSAGE
            ====================================== */}

            <p className="welcome-message welcome-font-lora mt-5 text-xs sm:text-sm text-[#FFE4E6]/70 leading-relaxed max-w-xs mx-auto">
              With love in our hearts and joy in our souls,
              we welcome you to share this beautiful beginning
              with us.
            </p>

            {/* =====================================
                DATE
            ====================================== */}

            <div className="welcome-date mt-7">

              <div className="flex items-center justify-center gap-3">

                <span className="w-5 h-px bg-[#A00818]/50" />

                <span className="welcome-font-lora text-[9px] sm:text-[10px] text-[#FDA4AF] uppercase tracking-[0.35em]">
                  15 November 2026
                </span>

                <span className="w-5 h-px bg-[#A00818]/50" />

              </div>

            </div>

            {/* =====================================
                BOTTOM DECORATION
            ====================================== */}

            <div className="welcome-bottom-decoration flex items-center justify-center gap-2 mt-8">

              <span className="w-1 h-1 rounded-full bg-[#A00818]" />

              <span className="w-10 h-px bg-gradient-to-r from-transparent via-[#A00818] to-transparent" />

              <span className="text-[#A00818] text-[8px]">
                ✦
              </span>

              <span className="w-10 h-px bg-gradient-to-r from-transparent via-[#A00818] to-transparent" />

              <span className="w-1 h-1 rounded-full bg-[#A00818]" />

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}