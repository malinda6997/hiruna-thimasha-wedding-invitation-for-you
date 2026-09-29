"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Heart, ArrowUp } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });

        tl.fromTo(
          ".footer-line",
          {
            scaleX: 0,
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
          }
        )
          .fromTo(
            ".footer-monogram",
            {
              opacity: 0,
              scale: 0.7,
              y: 20,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "back.out(1.5)",
            },
            "-=0.6"
          )
          .fromTo(
            ".footer-label",
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.45"
          )
          .fromTo(
            ".footer-names",
            {
              opacity: 0,
              y: 35,
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.35"
          )
          .fromTo(
            ".footer-message",
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.5"
          )
          .fromTo(
            ".footer-date",
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .fromTo(
            ".footer-bottom",
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            "-=0.3"
          );

        // Monogram breathing
        gsap.to(".footer-monogram-inner", {
          scale: 1.06,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Ambient glow
        gsap.to(".footer-glow", {
          scale: 1.12,
          opacity: 0.34,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Background text movement
        gsap.to(".footer-background-word", {
          x: 40,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, containerRef);

      return () => ctx.revert();
    },
    { scope: containerRef }
  );

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={containerRef}
      className="
        relative
        min-h-[85vh]
        w-full
        overflow-hidden
        bg-[#030206]
        text-white
        flex
        flex-col
        justify-between
        px-6
        py-10
        sm:px-10
        sm:py-12
        select-none
      "
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap");

        .footer-font-cinzel {
          font-family: "Cinzel", serif;
        }

        .footer-font-lora {
          font-family: "Lora", serif;
        }

        @keyframes footerHeart {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.08);
          }
        }

        .footer-heart {
          animation: footerHeart 2.8s ease-in-out infinite;
        }

        @keyframes footerFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        .footer-floating {
          animation: footerFloat 5s ease-in-out infinite;
        }
      `}</style>

      {/* ==================================================
          BACKGROUND ATMOSPHERE
      ================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main red glow */}
        <div
          className="
            footer-glow
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[420px]
            sm:w-[650px]
            h-[420px]
            sm:h-[650px]
            rounded-full
            bg-[#A00818]/20
            blur-[150px]
            opacity-20
          "
        />

        {/* Top glow */}
        <div
          className="
            absolute
            left-1/2
            top-[-250px]
            -translate-x-1/2
            w-[700px]
            h-[400px]
            rounded-full
            bg-[#7F000C]/20
            blur-[140px]
          "
        />

        {/* Bottom glow */}
        <div
          className="
            absolute
            left-1/2
            bottom-[-300px]
            -translate-x-1/2
            w-[800px]
            h-[400px]
            rounded-full
            bg-[#A00818]/10
            blur-[150px]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.75)_100%)]
          "
        />

        {/* Huge background typography */}
        <div
          className="
            footer-background-word
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            whitespace-nowrap
            footer-font-cinzel
            text-[18vw]
            sm:text-[15vw]
            font-bold
            tracking-[0.15em]
            text-white/[0.018]
          "
        >
          FOREVER
        </div>

        {/* Subtle vertical lines */}
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-white/[0.035]" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-white/[0.035]" />
      </div>

      {/* ==================================================
          TOP NAVIGATION / BACK TO TOP
      ================================================== */}

      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="footer-bottom">
          <span
            className="
              footer-font-lora
              text-[9px]
              uppercase
              tracking-[0.35em]
              text-white/30
            "
          >
            H & T
          </span>
        </div>

        <button
          onClick={handleBackToTop}
          aria-label="Back to top"
          className="
            footer-bottom
            group
            flex
            items-center
            gap-2
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-white/40
            hover:text-[#FDA4AF]
            transition-colors
            duration-300
          "
        >
          <span>Back to top</span>

          <span
            className="
              w-8
              h-8
              rounded-full
              border
              border-white/10
              group-hover:border-[#A00818]/60
              flex
              items-center
              justify-center
              transition-all
              duration-300
            "
          >
            <ArrowUp
              className="
                w-3.5
                h-3.5
                group-hover:-translate-y-0.5
                transition-transform
              "
            />
          </span>
        </button>
      </div>

      {/* ==================================================
          MAIN CLOSING CONTENT
      ================================================== */}

      <div className="relative z-10 flex flex-col items-center text-center flex-1 justify-center py-16">
        {/* Top line */}
        <div className="footer-line w-24 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#A00818] to-transparent mb-10 origin-center" />

        {/* ==================================================
            MONOGRAM
        ================================================== */}

        <div className="footer-monogram relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-9">
          {/* Outer circle */}
          <div className="absolute inset-0 rounded-full border border-[#A00818]/30" />

          {/* Rotating decorative circle */}
          <div className="absolute inset-2 rounded-full border border-dashed border-[#A00818]/20" />

          {/* Inner circle */}
          <div className="absolute inset-4 rounded-full border border-[#A00818]/30 bg-[#080305]/70 backdrop-blur-sm" />

          {/* Monogram */}
          <div className="footer-monogram-inner footer-floating relative z-10 flex items-center">
            <span
              className="
                footer-font-cinzel
                text-3xl
                sm:text-4xl
                font-semibold
                text-white
              "
            >
              H
            </span>

            <Heart
              className="
                footer-heart
                w-4
                h-4
                sm:w-5
                sm:h-5
                mx-2
                text-[#A00818]
                fill-[#A00818]/20
              "
              strokeWidth={1.4}
            />

            <span
              className="
                footer-font-cinzel
                text-3xl
                sm:text-4xl
                font-semibold
                text-white
              "
            >
              T
            </span>
          </div>
        </div>

        {/* ==================================================
            LABEL
        ================================================== */}

        <span
          className="
            footer-label
            footer-font-lora
            text-[9px]
            sm:text-[10px]
            uppercase
            tracking-[0.55em]
            text-[#FDA4AF]
            font-medium
            mb-6
          "
        >
          The Beginning of Forever
        </span>

        {/* ==================================================
            NAMES
        ================================================== */}

        <h2
          className="
            footer-names
            footer-font-cinzel
            text-4xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            font-medium
            tracking-[0.06em]
            leading-[1.1]
            text-transparent
            bg-clip-text
            bg-gradient-to-b
            from-white
            via-[#FFE4E6]
            to-[#FDA4AF]
          "
        >
          Hiruna
          <span className="text-[#A00818] mx-2 sm:mx-4">&</span>
          Thimasha
        </h2>

        {/* ==================================================
            DECORATIVE DIVIDER
        ================================================== */}

        <div className="footer-message flex items-center justify-center gap-3 mt-8 mb-7">
          <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#A00818]/50" />

          <span className="text-[#A00818] text-[8px]">
            ✦
          </span>

          <span className="text-[#A00818]/80 text-[6px]">
            ◆
          </span>

          <span className="text-[#A00818] text-[8px]">
            ✦
          </span>

          <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#A00818]/50" />
        </div>

        {/* ==================================================
            MESSAGE
        ================================================== */}

        <p
          className="
            footer-message
            footer-font-lora
            text-sm
            sm:text-base
            md:text-lg
            text-white/50
            italic
            font-light
            tracking-wide
          "
        >
          With love, forever and always.
        </p>

        {/* ==================================================
            DATE
        ================================================== */}

        <div className="footer-date flex items-center justify-center gap-4 mt-8">
          <span className="w-8 sm:w-12 h-px bg-[#A00818]/30" />

          <span
            className="
              footer-font-lora
              text-[9px]
              sm:text-[10px]
              uppercase
              tracking-[0.45em]
              text-[#FDA4AF]
            "
          >
            15 · November · 2026
          </span>

          <span className="w-8 sm:w-12 h-px bg-[#A00818]/30" />
        </div>
      </div>

      {/* ==================================================
          BOTTOM FOOTER
      ================================================== */}

      <div className="relative z-10 w-full">
        {/* Divider */}
        <div className="footer-bottom w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        <div className="footer-bottom flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright */}
          <p
            className="
              footer-font-lora
              text-[9px]
              sm:text-[10px]
              text-white/30
              tracking-wide
            "
          >
            © 2026 Hiruna &amp; Thimasha Wedding
          </p>

          {/* Developer */}
          <p
            className="
              footer-font-lora
              text-[9px]
              sm:text-[10px]
              text-white/30
              tracking-wide
            "
          >
            Crafted with{" "}
            <span className="text-[#A00818]">♥</span>{" "}
            by{" "}
            <span className="text-[#FDA4AF] font-medium">
              Malinda Prabath
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}