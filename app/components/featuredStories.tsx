"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import img1 from "@/app/assets/cfb1.png";
import img2 from "@/app/assets/cfb2.png";
import img3 from "@/app/assets/cfb3.png";
import img4 from "@/app/assets/cfb4.png";
import img5 from "@/app/assets/cfb5.png";

const images = [
  { src: img1, title: "TNF: 49ers hanging by thread" },
  { src: img2, title: "Top 10 performances of NFL Week 14" },
  { src: img3, title: "Is Heisman next award for Hunter?" },
  { src: img4, title: "CFB: AP Top 25, Precursor to Playoffs" },
  { src: img5, title: "TNF: Chargers Broncos collide" },
  { src: img1, title: "Story 6" },
  { src: img2, title: "Story 7" },
  { src: img3, title: "Story 8" },
  { src: img4, title: "Story 9" },
  { src: img5, title: "Story 10" },
  { src: img1, title: "Story 11" },
  { src: img2, title: "Story 12" },
  { src: img3, title: "Story 13" },
  { src: img4, title: "Story 14" },
  { src: img5, title: "Story 15" },
];

const visibleCount = 5;
const totalDots = 4;

export default function FeaturedStories() {
  const [page, setPage] = useState(0);

  const maxPage = totalDots - 1;
  const offset = (images.length - visibleCount) / maxPage; // amount to shift per dot

  const handleDotClick = (i: number) => setPage(i);
  const prev = () => setPage((prev) => Math.max(0, prev - 1));
  const next = () => setPage((prev) => Math.min(maxPage, prev + 1));

  return (
    <div className="bg-[#FCFBFC] px-4 sm:px-6 lg:px-10 pb-2">
      <div className="bg-white shadow-sm p-4 sm:p-6 rounded-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-black">Featured Stories</h1>
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
            <button onClick={next} className="p-1" disabled={page === maxPage}>
              <IoIosArrowRoundForward className="w-6 h-6 text-black hover:text-blue-600" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${
                (offset * page * 100) / images.length
              }%)`,
              width: `${(images.length * 100) / visibleCount}%`,
            }}
          >
            {images.map((item, i) => {
              const isFirst = i === Math.round(page * offset);
              const isLast = i === Math.round(page * offset) + visibleCount - 1;

              return (
                <div
                  key={i}
                  className={`relative aspect-[3/4] w-[20%] ${
                    isFirst ? "pl-4" : isLast ? "pr-4" : ""
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover rounded-md"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white text-sm font-medium">
                    {item.title}
                    <p className="text-xs font-light text-gray-200">
                      James Hicks, Hall of Football
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
