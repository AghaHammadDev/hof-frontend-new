"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import cfb1 from "@/app/assets/cfb1.png";
import cfb2 from "../assets/cfb2.png";
import cfb3 from "../assets/cfb3.png";
import cfb4 from "../assets/cfb4.png";
import cfb5 from "../assets/cfb5.png";
import cfb6 from "../assets/cfb6.png";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

// Type definitions
interface NewsItem {
  id: number;
  image: string;
  title: string;
  description: string;
  timeAgo: string;
}

interface SidebarNewsItem {
  id: number;
  title: string;
  timeAgo: string;
}

// Main Slides (2 slides, each with 8 news items)
const newsSlides: NewsItem[][] = [
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    image: [cfb1, cfb2, cfb3, cfb4, cfb5, cfb6][i % 6].src,
    title: `Story ${i + 1}`,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    timeAgo: `${i + 1} hours ago`,
  })),
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 9,
    image: [cfb6, cfb5, cfb4, cfb3, cfb2, cfb1][i % 6].src,
    title: `Story ${i + 9}`,
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timeAgo: `${i + 1} hours ago`,
  })),
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 17,
    image: [cfb2, cfb3, cfb4, cfb5, cfb6, cfb1][i % 6].src,
    title: `Story ${i + 17}`,
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    timeAgo: `${i + 1} hours ago`,
  })),
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 25,
    image: [cfb3, cfb4, cfb5, cfb6, cfb1, cfb2][i % 6].src,
    title: `lorem ipsum dolor sit amet consectetur elit lorem lorem ${i + 25}`,
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    timeAgo: `${i + 1} hours ago`,
  })),
];

// Sidebar Notes (20 items, no image or number)
const sidebarNotes: SidebarNewsItem[] = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  title: `Note ${
    i + 1
  }: Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  timeAgo: `${i + 1} days ago`,
}));

const HOFStories = () => {
  const [mainSlide, setMainSlide] = useState(0);

  const handleMainPrev = () => {
    setMainSlide((prev) => (prev === 0 ? newsSlides.length - 1 : prev - 1));
  };

  const handleMainNext = () => {
    setMainSlide((prev) => (prev === newsSlides.length - 1 ? 0 : prev + 1));
  };

  const renderNewsCard = (news: NewsItem) => (
    <div className="relative group cursor-pointer w-full border-b border-gray-200 pb-4">
      <div className="relative overflow-hidden w-full h-72">
        <Image
          src={news.image}
          alt={news.title}
          width={300}
          height={192}
          className="w-full h-full object-cover aspect-[3/2] group-hover:scale-103 transition-transform ease-in-out duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      </div>
      <div className="flex items-start justify-between mt-2">
        <h3 className="text-gray-900 font-semibold text-md sm:text-[20px] leading-tight line-clamp-2 flex-1">
          {news.title}
        </h3>
        <IoIosArrowRoundForward className="w-6 h-6 sm:w-12 sm:h-12 text-gray-500 group-hover:text-blue-600 transition-colors ml-2" />
      </div>
      <p className="text-[13px] text-gray-600 mt-1 line-clamp-3">
        {news.description}
      </p>
      <p className="text-xs text-gray-400 mt-1">{news.timeAgo}</p>
    </div>
  );

  return (
    <div className="bg-[#FCFBFC] px-4 sm:px-6 lg:px-10 pt-4 pb-2 transition-all duration-500">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Main News Section */}
        <div className="flex-1 bg-white shadow-gray-200 shadow rounded-md p-4 sm:p-6 my-10">
          <div className="flex items-center justify-between mb-6 ">
            <h1 className="text-xl sm:text-2xl font-bold text-black">
              HOF Stories
            </h1>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={mainSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 auto-rows-min"
            >
              {newsSlides[mainSlide].map((news) => (
                <div key={news.id}>{renderNewsCard(news)}</div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center">
            <button onClick={handleMainPrev} className="p-1">
              <IoIosArrowRoundBack className="w-8 h-8 text-black hover:text-[#1d48f2] transition-colors duration-300 ease-in-out" />
            </button>
            <div className="flex space-x-2 mx-2">
              {newsSlides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setMainSlide(i)}
                  className={`w-2 h-4 rounded-full cursor-pointer transition-all ${
                    i === mainSlide ? "bg-blue-800" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
            <button onClick={handleMainNext} className="p-1">
              <IoIosArrowRoundForward className="w-8 h-8 text-black hover:text-[#1d48f2] transition-colors duration-300 ease-in-out" />
            </button>
          </div>
        </div>

        {/* Sidebar Notes */}
        <div className="w-full lg:w-80 bg-white shadow-gray-200 shadow rounded-md p-4 sm:p-6 my-10">
          <h2 className="text-lg font-semibold text-black mb-6">HOF Notes</h2>
          <div className="space-y-5">
            {sidebarNotes.map((note) => (
              <div
                key={note.id}
                className="group cursor-pointer border-b border-gray-200 pb-4"
              >
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-3">
                  {note.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{note.timeAgo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOFStories;
