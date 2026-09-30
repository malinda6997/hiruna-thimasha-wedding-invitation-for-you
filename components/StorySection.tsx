"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Heart } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const paragraphs = [
    "“Our journey of love, laughter, and endless memories leads us to this forever moment.”",
    "“From the very first glance, our hearts knew they belonged to one another for eternity.”",
    "“Side by side, hand in hand, we are ready to write our most beautiful chapter yet.”",
    "“Every single moment spent together feels like a dream come true wrapped in pure joy.”",
    "“Today, surrounded by our loved ones, we promise to cherish and love each other forever.”",
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".story-reveal",
        { opacity: 0, y: 35, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            onEnter: () => setIsTypingStarted(true),
          },
        }
      );

      // Gentle idle breathing on the portrait
      gsap.to(".story-photo-img", {
        scale: 1.06,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (!isTypingStarted) return;

    const currentFullText = paragraphs[currentTextIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(
            currentFullText.substring(
              0,
              displayedText.length + 1
            )
          );
        }, 40);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(
            currentFullText.substring(
              0,
              displayedText.length - 1
            )
          );
        }, 20);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex(
          (prev) => (prev + 1) % paragraphs.length
        );
      }
    }

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    currentTextIndex,
    isTypingStarted,
    paragraphs,
  ]);

  return (
    <section
      id="chapter-story"
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#fbfbfa] text-[#1a1820] py-20 px-6 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');

        .story-font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .story-font-lora {
          font-family: 'Lora', serif;
        }

        @keyframes colorShiftShadow {
          0% {
            box-shadow: 0 20px 40px -10px rgba(160, 8, 24, 0.4);
          }

          33% {
            box-shadow: 0 20px 40px -10px rgba(185, 28, 44, 0.6);
          }

          66% {
            box-shadow: 0 20px 40px -10px rgba(127, 0, 12, 0.5);
          }

          100% {
            box-shadow: 0 20px 40px -10px rgba(160, 8, 24, 0.4);
          }
        }

        .animated-red-shadow {
          animation: colorShiftShadow 6s ease-in-out infinite;
        }

        .cursor-blink::after {
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
      `}</style>

      <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">

        {/* COUPLE PHOTO */}
        <div className="story-reveal relative w-[280px] sm:w-[340px] h-[360px] sm:h-[420px] rounded-t-[180px] rounded-b-3xl overflow-hidden border-4 border-[#A00818] bg-[#FFF1F2] mb-8 p-1 animated-red-shadow">

          <div className="w-full h-full rounded-t-[170px] rounded-b-2xl overflow-hidden relative">

            <img
              src="/assets/p5.jpg"
              alt="Hiruna and Thimasha"
              className="story-photo-img w-full h-full object-cover object-center"
            />

          </div>
        </div>

        {/* THE COUPLE LABEL */}
        <div className="story-reveal inline-flex items-center gap-2 mb-2">

          <Heart className="w-3.5 h-3.5 text-[#A00818] fill-[#A00818]/30" />

          <span className="story-font-lora text-xs text-[#A00818] tracking-[0.3em] uppercase font-semibold">
            THE COUPLE
          </span>

          <Heart className="w-3.5 h-3.5 text-[#A00818] fill-[#A00818]/30" />

        </div>

        {/* COUPLE NAME */}
        <h2 className="story-reveal story-font-cinzel text-3xl sm:text-4xl font-extrabold tracking-wider text-[#1a1820] mb-4 uppercase">
          Hiruna & Thimasha
        </h2>

        {/* TYPING STORY */}
        <p className="story-reveal story-font-lora italic text-sm sm:text-base text-[#554d63] leading-relaxed font-light max-w-sm min-h-[5rem]">
          <span className="cursor-blink">
            {displayedText}
          </span>
        </p>

      </div>
    </section>
  );
}