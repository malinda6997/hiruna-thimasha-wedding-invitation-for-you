"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles,Heart, } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EngagementGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const photos = [
    { src: "/assets/p1.jpg", title: "Engagement Moment I" },
    { src: "/assets/p2.jpg", title: "Engagement Moment II" },
    { src: "/assets/p3.jpg", title: "Engagement Moment III" },
    { src: "/assets/p4.jpg", title: "Engagement Moment IV" },
    { src: "/assets/p5.jpg", title: "Engagement Moment V" },
    { src: "/assets/p6.jpg", title: "Engagement Moment VI" },
    { src: "/assets/p7.jpg", title: "Engagement Moment VII" },
    { src: "/assets/p8.jpg", title: "Engagement Moment VIII" },
  ];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () =>
        track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + track.scrollWidth,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(
              self.progress * (photos.length - 1)
            );

            setActiveIndex(idx);
          },
        },
      });

      const handleResize = () => ScrollTrigger.refresh();

      window.addEventListener("resize", handleResize);

      return () => {
        tween.kill();
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#fbfbfa] text-[#1a1820] overflow-hidden flex flex-col justify-center select-none pt-20"
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Lora:ital,wght@0,400..700;1,400..700&display=swap');

        .gal-font-cinzel {
          font-family: 'Cinzel', serif;
        }

        .gal-font-lora {
          font-family: 'Lora', serif;
        }
      `}</style>

      {/* SECTION HEADER */}
      <div className="absolute top-6 left-6 sm:left-12 z-30 flex flex-col pointer-events-none mb-6">

        <div className="invite-reveal inline-flex items-center justify-center lg:justify-start gap-2 mb-2">

            <Heart className="w-3.5 h-3.5 text-[#A00818] fill-[#A00818]/30" />

            <span className="invite-font-lora text-xs text-[#A00818] tracking-[0.3em] uppercase font-semibold">
              ENGAGEMET GALLERY
            </span>

            <Heart className="w-3.5 h-3.5 text-[#A00818] fill-[#A00818]/30" />

          </div>
        <h2 className="invite-reveal invite-font-cinzel text-3xl sm:text-4xl font-extrabold tracking-wide text-[#1a1820] mb-3">
            Our Precious{" "}
            <span className="text-[#A00818] italic font-serif">
              Story
            </span>
          </h2>

      </div>

      {/* PROGRESS DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">

        {photos.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-5 bg-[#A00818]"
                : "w-1.5 bg-[#F3C1C7]"
            }`}
          />
        ))}

      </div>

      {/* HORIZONTAL IMAGE TRACK */}
      <div
        ref={trackRef}
        className="flex items-center w-max h-full pt-16"
      >

        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center p-4 sm:p-12 overflow-hidden"
          >

            <div className="relative w-full h-full max-w-5xl max-h-[78vh] rounded-3xl overflow-hidden shadow-2xl bg-white border border-[#A00818]/15 flex items-center justify-center mt-12 sm:mt-16">

              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />

              {/* RED IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D0008]/85 via-[#5C0712]/20 to-transparent flex flex-col justify-end p-8 sm:p-12">

                <span className="gal-font-cinzel text-xs sm:text-sm font-bold text-[#FDA4AF] uppercase tracking-[0.3em] mb-2">
                  Memory 0{index + 1} / 08
                </span>

                <h3 className="gal-font-cinzel text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
                  {photo.title}
                </h3>

              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}