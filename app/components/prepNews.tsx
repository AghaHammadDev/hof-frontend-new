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
interface NewsSlide {
  id: number;
  image: string;
  title: string;
}

interface SidebarNews {
  id: number;
  image: string;
  title: string;
  timeAgo: string;
  number: string;
}

// Main Slides
const newsSlides: NewsSlide[][] = [
  [cfb1, cfb2, cfb3, cfb4, cfb5, cfb6],
  [cfb2, cfb3, cfb4, cfb5, cfb6, cfb1],
  [cfb3, cfb4, cfb5, cfb6, cfb1, cfb2],
  [cfb4, cfb5, cfb6, cfb1, cfb2, cfb3],
].map((set, i) =>
  set.map((image, j) => ({
    id: i * 6 + j + 1,
    image: image.src, // Use the src property of the StaticImageData object
    title: `Slide ${i + 1} - News ${j + 1}`,
  }))
);

// Sidebar News (30)
const sidebarNews: SidebarNews[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  image: cfb5.src,
  title: `Sidebar lorem ipsum dolor sit amet, consectetur  elit ${i + 1}`,
  timeAgo: `${i + 1} days ago`,
  number: `${i + 1}`,
}));

const PrepNews = () => {
  const [mainSlide, setMainSlide] = useState(0);
  const [sidebarPage, setSidebarPage] = useState(0);

  const handleMainPrev = () => {
    setMainSlide((prev) => (prev === 0 ? newsSlides.length - 1 : prev - 1));
  };

  const handleMainNext = () => {
    setMainSlide((prev) => (prev === newsSlides.length - 1 ? 0 : prev + 1));
  };

  const handleSidebarPrev = () => {
    setSidebarPage((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const handleSidebarNext = () => {
    setSidebarPage((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const currentSidebarNews = sidebarNews.slice(
    sidebarPage * 5,
    sidebarPage * 5 + 5
  );

  const renderNewsCard = (news: NewsSlide, height = 300) => (
    <div className="relative group cursor-pointer h-full w-full">
      <div className="relative overflow-hidden w-full h-full">
        <Image
          src={news.image}
          alt={news.title}
          width={600}
          height={height}
          className="w-full h-full object-cover aspect-[3/2] group-hover:scale-103 transition-transform ease-in-out duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-base leading-tight">
            {news.title}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FCFBFC] px-4 sm:px-6 lg:px-10 pt-4 pb-2 transition-all duration-500">
      <div className="bg-white shadow-gray-200 shadow rounded-md p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main News */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-black">Prep News</h1>
              <div className="flex items-center">
                <button onClick={handleMainPrev} className="p-1 ">
                  <IoIosArrowRoundBack className="w-8 h-8 text-black hover:text-[#1d48f2] transition-colors duration-300 ease-in-out " />
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
                <button onClick={handleMainNext} className="p-1 ">
                  <IoIosArrowRoundForward className="w-8 h-8 text-black hover:text-[#1d48f2] transition-colors duration-300 ease-in-out" />
                </button>
              </div>
            </div>

            {/* Responsive Grid */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={mainSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[300px] lg:auto-rows-[300px]"
              >
                <div className="lg:row-span-2">
                  {renderNewsCard(newsSlides[mainSlide][0], 600)}
                </div>
                <div className="sm:col-span-2 lg:col-start-2 lg:col-end-4 lg:row-span-1">
                  {renderNewsCard(newsSlides[mainSlide][1], 300)}
                </div>
                <div className="lg:col-start-4 lg:row-span-1">
                  {renderNewsCard(newsSlides[mainSlide][2], 300)}
                </div>
                <div className="lg:col-start-4 lg:row-start-2 lg:row-span-1">
                  {renderNewsCard(newsSlides[mainSlide][3], 300)}
                </div>
                <div className="lg:col-start-3 lg:row-start-2 lg:row-span-1">
                  {renderNewsCard(newsSlides[mainSlide][4], 300)}
                </div>
                <div className="lg:col-start-2 lg:row-start-2 lg:row-span-1">
                  {renderNewsCard(newsSlides[mainSlide][5], 300)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black">Prep Notes</h2>
              <div className="flex items-center">
                <button onClick={handleSidebarPrev} className="p-1">
                  <IoIosArrowRoundBack className="w-6 h-6 text-black hover:text-[#1d48f2]" />
                </button>
                <div className="flex space-x-2 mx-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      onClick={() => setSidebarPage(i)}
                      className={`w-2 h-4 rounded-full cursor-pointer ${
                        i === sidebarPage ? "bg-blue-800" : "bg-gray-300"
                      }`}
                    ></div>
                  ))}
                </div>
                <button onClick={handleSidebarNext} className="p-1">
                  <IoIosArrowRoundForward className="w-6 h-6 text-black hover:text-[#1d48f2]" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={sidebarPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 h-full"
              >
                {currentSidebarNews.map((news) => (
                  <motion.div
                    key={news.id}
                    className="flex items-center space-x-4 group cursor-pointer border-b border-gray-200 pb-4"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        width={20}
                        height={16}
                        src={news.image}
                        alt={news.title}
                        className="w-20 h-16 object-cover "
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {news.timeAgo}
                      </p>
                    </div>
                    <div className="flex-shrink-0 pr-1">
                      <span className="text-5xl font-bold text-gray-300 leading-none">
                        {news.number}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepNews;
