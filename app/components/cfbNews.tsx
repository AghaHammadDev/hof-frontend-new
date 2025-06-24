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

// Main Slides
const newsSlides = [
  [cfb1, cfb2, cfb3, cfb4, cfb5, cfb6],
  [cfb2, cfb3, cfb4, cfb5, cfb6, cfb1],
  [cfb3, cfb4, cfb5, cfb6, cfb1, cfb2],
].map((set, i) =>
  set.map((image, j) => ({
    id: i * 6 + j + 1,
    image,
    title: `Slide ${i + 1} - News ${j + 1}`,
  }))
);

// Sidebar News (15)
const sidebarNews = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  image: cfb3.src,
  title: `Sidebar News Title ${i + 1}`,
  timeAgo: `${i + 1} days ago`,
  number: `${i + 1}`,
}));

const CFBNews = () => {
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

  const renderNewsCard = (news: any, height: number = 260) => (
    <div className="relative group cursor-pointer h-full w-full">
      <div className="relative overflow-hidden w-full h-full">
        <Image
          src={news.image}
          alt={news.title}
          width={600}
          height={height}
          className="w-full object-cover h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-lg leading-tight">
            {news.title}
          </h3>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row bg-white px-4 sm:px-6 lg:px-10 py-8 pb-12 transition-all duration-500">
      {/* Main News */}
      <div className="flex-1 p-4 lg:pr-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-black">CFB News</h1>
          <div className="flex items-center">
            <button
              onClick={handleMainPrev}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <IoIosArrowRoundBack className="w-8 h-8 text-black" />
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
            <button
              onClick={handleMainNext}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <IoIosArrowRoundForward className="w-8 h-8 text-black" />
            </button>
          </div>
        </div>

        {/* Grid Layout Restored */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mainSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="custom-grid parent gap-4"
          >
            <div className="div1">
              {renderNewsCard(newsSlides[mainSlide][0], 400)}
            </div>
            <div className="div2">
              {renderNewsCard(newsSlides[mainSlide][1])}
            </div>
            <div className="div3">
              {renderNewsCard(newsSlides[mainSlide][2])}
            </div>
            <div className="div4">
              {renderNewsCard(newsSlides[mainSlide][3])}
            </div>
            <div className="div5">
              {renderNewsCard(newsSlides[mainSlide][4])}
            </div>
            <div className="div6">
              {renderNewsCard(newsSlides[mainSlide][5])}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-80 bg-gray-50 p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-black">CFB News & Notes</h2>
          <div className="flex items-center">
            <button
              onClick={handleSidebarPrev}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <IoIosArrowRoundBack className="w-8 h-8 text-black" />
            </button>
            <div className="flex space-x-2 mx-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  onClick={() => setSidebarPage(i)}
                  className={`w-2 h-4 rounded-full cursor-pointer transition-all ${
                    i === sidebarPage ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
            <button
              onClick={handleSidebarNext}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <IoIosArrowRoundForward className="w-8 h-8 text-black" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {currentSidebarNews.map((news) => (
            <div
              key={news.id}
              className="flex items-start space-x-3 group cursor-pointer"
            >
              <div className="flex-shrink-0">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-16 h-12 object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {news.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{news.timeAgo}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-gray-300">
                  {news.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CFBNews;
