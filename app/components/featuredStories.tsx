"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import img1 from "@/app/assets/cfb1.png";
import img2 from "@/app/assets/cfb2.png";
import img3 from "@/app/assets/cfb3.png";
import img4 from "@/app/assets/cfb4.png";
import img5 from "@/app/assets/cfb5.png";

const images = [
  { src: img1, title: "TNF: 49ers hanging by thread", link: "/stories/1" },
  {
    src: img2,
    title: "Top 10 performances of NFL Week 14",
    link: "/stories/2",
  },
  { src: img3, title: "Is Heisman next award for Hunter?", link: "/stories/3" },
  {
    src: img4,
    title: "CFB: AP Top 25, Precursor to Playoffs",
    link: "/stories/4",
  },
  { src: img5, title: "TNF: Chargers Broncos collide", link: "/stories/5" },
  { src: img1, title: "Story 6", link: "/stories/6" },
  { src: img2, title: "Story 7", link: "/stories/7" },
  { src: img3, title: "Story 8", link: "/stories/8" },
  { src: img4, title: "Story 9", link: "/stories/9" },
  { src: img5, title: "Story 10", link: "/stories/10" },
  { src: img1, title: "Story 11", link: "/stories/11" },
  { src: img2, title: "Story 12", link: "/stories/12" },
  { src: img3, title: "Story 13", link: "/stories/13" },
  { src: img4, title: "Story 14", link: "/stories/14" },
  { src: img5, title: "Story 15", link: "/stories/15" },
];

export default function FeaturedStories() {
  const [page, setPage] = useState(0); // Desktop pagination
  const [currentIndex, setCurrentIndex] = useState(0); // Mobile/tablet index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Desktop constants (original)
  const totalDots = 4;
  const maxPage = totalDots - 1;
  const offset = (images.length - 5) / maxPage;

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        // mobile
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        // tablet
        setVisibleCount(3);
      } else {
        // desktop
        setVisibleCount(5);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && visibleCount < 5) {
      // Only autoplay on mobile/tablet
      autoPlayRef.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          const maxIndex = images.length - visibleCount;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [currentIndex, isAutoPlaying, visibleCount]);

  // Desktop navigation (original functions)
  const handleDotClick = (i: number) => setPage(i);
  const prev = () => setPage((prev) => Math.max(0, prev - 1));
  const next = () => setPage((prev) => Math.min(maxPage, prev + 1));

  // Desktop hover effects (unchanged)
  const handleMouseEnter = (index: number) => {
    if (visibleCount === 5) {
      // Only on desktop
      setHoveredIndex(index);
      const t = setTimeout(() => setActiveIndex(index), 300);
      setTimer(t);
    }
  };

  const handleMouseLeave = () => {
    if (visibleCount === 5) {
      // Only on desktop
      setHoveredIndex(null);
      setActiveIndex(null);
      if (timer) clearTimeout(timer);
    }
  };

  // Touch/drag handlers for mobile/tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    if (visibleCount === 5) return; // Disable on desktop

    setIsAutoPlaying(false);
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPos(touch.clientX);
    setCurrentTranslate(prevTranslate);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || visibleCount === 5) return;

    const touch = e.touches[0];
    const currentPosition = touch.clientX;
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || visibleCount === 5) return;

    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    const threshold = 50;

    if (movedBy < -threshold && currentIndex < images.length - visibleCount) {
      setCurrentIndex((prev) => prev + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    setCurrentTranslate(0);
    setPrevTranslate(0);
    setTimeout(() => setIsAutoPlaying(true), 5000); // Resume autoplay after 5 seconds
  };

  // Mouse drag handlers for desktop drag (optional)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (visibleCount === 5) return;

    setIsAutoPlaying(false);
    setIsDragging(true);
    setStartPos(e.clientX);
    setCurrentTranslate(prevTranslate);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || visibleCount === 5) return;

    const currentPosition = e.clientX;
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleMouseUp = () => {
    if (!isDragging || visibleCount === 5) return;

    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;
    const threshold = 50;

    if (movedBy < -threshold && currentIndex < images.length - visibleCount) {
      setCurrentIndex((prev) => prev + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    setCurrentTranslate(0);
    setPrevTranslate(0);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Calculate transform for different screen sizes
  const getTransform = () => {
    if (visibleCount === 5) {
      // Desktop: use original pagination logic (unchanged)
      return `translateX(-${(offset * page * 100) / images.length}%)`;
    } else {
      // Mobile/Tablet: simple slide
      const baseTransform =
        -(currentIndex * (100 / images.length)) * visibleCount;
      const dragOffset = isDragging
        ? (currentTranslate / (containerRef.current?.offsetWidth || 1)) * 100
        : 0;
      return `translateX(${baseTransform + dragOffset}%)`;
    }
  };

  return (
    <div className="bg-[#FCFBFC] px-4 sm:px-6 lg:px-10 pb-2">
      <div className="bg-white shadow-sm p-4 sm:p-6 rounded-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-black">Featured Stories</h1>
          {/* Navigation only shows on desktop - original functionality */}
          {visibleCount === 5 && (
            <div className="flex items-center">
              <button onClick={prev} className="p-1" disabled={page === 0}>
                <IoIosArrowRoundBack className="w-6 h-6 text-black hover:text-blue-600" />
              </button>
              <div className="flex space-x-2 mx-2">
                {[...Array(totalDots)].map((_, i) => (
                  <div
                    key={i}
                    onClick={() => handleDotClick(i)}
                    className={`w-2 h-4 rounded-full cursor-pointer ${
                      i === page ? "bg-blue-800" : "bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
              <button
                onClick={next}
                className="p-1"
                disabled={page === maxPage}
              >
                <IoIosArrowRoundForward className="w-6 h-6 text-black hover:text-blue-600" />
              </button>
            </div>
          )}
        </div>

        <div
          className="overflow-hidden"
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
            handleMouseLeave();
          }}
        >
          <div
            className={`flex transition-transform duration-500 ease-in-out ${
              isDragging ? "duration-0" : ""
            }`}
            style={{
              transform: getTransform(),
              width: `${(images.length * 100) / visibleCount}%`,
            }}
          >
            {images.map((item, i) => {
              const isFirst =
                visibleCount === 5 ? i === Math.round(page * offset) : false;
              const isLast =
                visibleCount === 5
                  ? i === Math.round(page * offset) + 5 - 1
                  : false;
              const isDimmed =
                visibleCount === 5 && activeIndex !== null && activeIndex !== i;
              const isZoomed = visibleCount === 5 && activeIndex === i;

              return (
                <Link
                  key={i}
                  href={item.link}
                  className={`relative aspect-[3/4] transition-all duration-300 ${
                    visibleCount === 1
                      ? "w-full"
                      : visibleCount === 3
                      ? "w-[33.333%]"
                      : "w-[20%]"
                  } ${
                    visibleCount === 5 && isFirst
                      ? "pl-4 sm:pl-0"
                      : visibleCount === 5 && isLast
                      ? "pr-4 sm:pr-0"
                      : ""
                  } ${isDimmed ? "opacity-50" : "opacity-100"} ${
                    isZoomed ? "scale-105 z-10" : ""
                  } ${visibleCount < 5 ? "px-1" : ""}`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover rounded-md transition-transform duration-300"
                    draggable={false}
                  />
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 transition-all duration-300 ${
                      isZoomed
                        ? "text-xl font-bold"
                        : visibleCount === 1
                        ? "text-lg font-semibold"
                        : visibleCount === 3
                        ? "text-base font-medium"
                        : "text-sm"
                    } text-white`}
                  >
                    {item.title}
                    <p
                      className={`${
                        isZoomed
                          ? "text-sm font-semibold"
                          : visibleCount === 1
                          ? "text-sm font-medium"
                          : visibleCount === 3
                          ? "text-xs font-normal"
                          : "text-xs font-light"
                      } text-gray-200 transition-all duration-300`}
                    >
                      James Hicks, Hall of Football
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dots indicator for mobile/tablet */}
      </div>
    </div>
  );
}
