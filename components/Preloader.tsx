"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onFinished: () => void;
}

export default function Preloader({
  onFinished,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ----------------------------------------
         Initial states
      ---------------------------------------- */

      gsap.set(".preloader-monogram", {
        opacity: 0,
        scale: 0.7,
      });

      gsap.set(".preloader-ring", {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set(".preloader-kicker", {
        opacity: 0,
        y: 10,
      });

      gsap.set(".preloader-names", {
        opacity: 0,
        y: 18,
      });

      gsap.set(".preloader-date", {
        opacity: 0,
        y: 10,
      });

      gsap.set(".preloader-divider", {
        scaleX: 0,
        opacity: 0,
      });

      gsap.set(".preloader-progress", {
        scaleX: 0,
      });

      /* ----------------------------------------
         Main Timeline
      ---------------------------------------- */

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onFinished,
          });
        },
      });

      tl.to(".preloader-ring", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          ".preloader-monogram",
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.5)",
          },
          "-=0.45"
        )
        .to(
          ".preloader-kicker",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          ".preloader-names",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          ".preloader-divider",
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        .to(
          ".preloader-date",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          ".preloader-progress",
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power2.inOut",
          },
          "+=0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onFinished]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] bg-[#030206] flex items-center justify-center overflow-hidden select-none"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Onest:wght@100..900&display=swap');

        .preloader-cinzel {
          font-family: "Cinzel", serif;
        }

        .preloader-onest {
          font-family: "Onest", sans-serif;
        }

        /* ----------------------------------------
           Subtle background glow
        ---------------------------------------- */

        @keyframes subtleGlow {
          0%,
          100% {
            opacity: 0.18;
            transform: scale(1);
          }

          50% {
            opacity: 0.3;
            transform: scale(1.08);
          }
        }

        .preloader-glow {
          animation: subtleGlow 5s ease-in-out infinite;
        }

        /* ----------------------------------------
           Monogram breathing
        ---------------------------------------- */

        @keyframes monogramBreath {
          0%,
          100% {
            box-shadow:
              0 0 0 1px rgba(160, 8, 24, 0.3),
              0 0 25px rgba(160, 8, 24, 0.08);
          }

          50% {
            box-shadow:
              0 0 0 1px rgba(160, 8, 24, 0.55),
              0 0 45px rgba(160, 8, 24, 0.2);
          }
        }

        .preloader-monogram {
          animation: monogramBreath 3.5s ease-in-out infinite;
        }

        /* ----------------------------------------
           Rotating outer ring
        ---------------------------------------- */

        @keyframes rotateSlow {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .preloader-ring-rotate {
          animation: rotateSlow 18s linear infinite;
        }

        /* ----------------------------------------
           Small decorative dot
        ---------------------------------------- */

        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .preloader-dot {
          animation: dotPulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* =========================================
          BACKGROUND
      ========================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Very subtle red glow */}
        <div className="preloader-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-[#A00818]/20 blur-[120px]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65)_100%)]" />

      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <div className="relative z-10 flex flex-col items-center text-center">

        {/* =====================================
            MONOGRAM
        ====================================== */}

        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-8">

          {/* Rotating decorative ring */}
          <div className="preloader-ring preloader-ring-rotate absolute inset-0 rounded-full border border-[#A00818]/25 border-t-[#A00818]/80" />

          {/* Second static ring */}
          <div className="preloader-ring absolute inset-3 rounded-full border border-[#A00818]/20" />

          {/* Monogram circle */}
          <div className="preloader-monogram relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#080305] border border-[#A00818]/50 flex items-center justify-center">

            <div className="flex items-center">

              <span className="preloader-cinzel text-2xl sm:text-3xl font-semibold text-[#FFE4E6]">
                H
              </span>

              <span className="text-[#A00818] text-xs mx-1.5">
                ♥
              </span>

              <span className="preloader-cinzel text-2xl sm:text-3xl font-semibold text-[#FFE4E6]">
                T
              </span>

            </div>

          </div>

        </div>

        {/* =====================================
            KICKER
        ====================================== */}

        <span className="preloader-kicker preloader-onest text-[9px] sm:text-[10px] text-[#A00818] uppercase tracking-[0.55em] font-medium mb-4">
          The Beginning of Forever
        </span>

        {/* =====================================
            COUPLE NAMES
        ====================================== */}

        <h1 className="preloader-names preloader-cinzel text-3xl sm:text-5xl font-semibold tracking-[0.12em] text-white">
          Hiruna & Thimasha
        </h1>

        {/* =====================================
            DECORATIVE DIVIDER
        ====================================== */}

        <div className="preloader-divider flex items-center gap-3 w-52 sm:w-64 my-6">

          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#A00818]/60" />

          <span className="text-[#A00818] text-[9px]">
            ✦
          </span>

          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#A00818]/60" />

        </div>

        {/* =====================================
            DATE
        ====================================== */}

        <p className="preloader-date preloader-onest text-[10px] sm:text-xs text-white/55 uppercase tracking-[0.4em]">
          15 · November · 2026
        </p>

        {/* =====================================
            PROGRESS
        ====================================== */}

        <div className="relative w-44 sm:w-56 h-px bg-white/10 mt-8 overflow-hidden rounded-full">

          <div className="preloader-progress absolute inset-0 origin-left bg-gradient-to-r from-transparent via-[#A00818] to-[#FDA4AF]" />

        </div>

        {/* Small loading indicator */}
        <div className="flex items-center gap-1.5 mt-3">

          <span className="preloader-dot w-1 h-1 rounded-full bg-[#A00818]" />

          <span className="preloader-onest text-[8px] text-white/30 uppercase tracking-[0.3em]">
            Preparing your invitation
          </span>

          <span
            className="preloader-dot w-1 h-1 rounded-full bg-[#A00818]"
            style={{ animationDelay: "0.5s" }}
          />

        </div>

      </div>
    </div>
  );
}