"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import cfb1 from "@/app/assets/cfb1.png";
import cfb2 from "../assets/cfb2.png";
import cfb3 from "../assets/cfb3.png";
import cfb4 from "../assets/cfb4.png";
import cfb5 from "../assets/cfb5.png";
import cfb6 from "../assets/cfb6.png";

const tabs = [
  "Popular Today",
  "Popular This Week",
  "News of the Month",
  "Editor's Choice",
];

const tabContent = [
  [cfb1, cfb2, cfb3, cfb4],
  [cfb2, cfb3, cfb4, cfb5],
  [cfb3, cfb4, cfb5, cfb6],
  [cfb4, cfb5, cfb6, cfb1],
].map((set, i) =>
  set.map((image, j) => ({
    id: i * 4 + j + 1,
    image,
    title: `${tabs[i]} Article ${j + 1}`,
    url: `/nfl/article/${i * 4 + j + 1}`,
  }))
);

const nflSidebarNews = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `NFL Sidebar News ${i + 1}`,
  timeAgo: `${i + 1}h ago`,
  url: `/nfl/sidebar-news/${i + 1}`,
}));

const NFLFeatures = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderFeatureCard = (news: any, height = 150) => (
    <a
      href={news.url}
      key={news.id}
      className="relative group cursor-pointer block h-full w-full"
    >
      <div className="relative overflow-hidden w-full h-full">
        <Image
          src={news.image}
          alt={news.title}
          width={600}
          height={height}
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-base leading-tight">
            {news.title}
          </h3>
        </div>
      </div>
    </a>
  );

  return (
    <div className="bg-[#FCFBFC] px-4 sm:px-6 lg:px-10 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 bg-white shadow-sm p-4 sm:p-6 rounded-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold text-black mb-4 sm:mb-0">
              NFL Feature Articles
            </h1>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`text-md px-4 py-2 transition-all ease-in-out duration-200 cursor-pointer rounded-full ${
                    activeTab === i
                      ? "text-black font-extrabold"
                      : "text-gray-700 font-light hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Animated Tab Content */}
          <div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[150px] lg:auto-rows-[300px]"
          >
            <div className="lg:col-span-1 lg:row-span-2">
              {renderFeatureCard(tabContent[activeTab][0], 300)}
            </div>
            <div className="lg:col-span-2 lg:row-span-2">
              {renderFeatureCard(tabContent[activeTab][1], 300)}
            </div>
            <div className="lg:col-span-1 lg:row-span-1">
              {renderFeatureCard(tabContent[activeTab][2], 150)}
            </div>
            <div className="lg:col-span-1 lg:row-span-1">
              {renderFeatureCard(tabContent[activeTab][3], 150)}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-white shadow-sm p-6 rounded-md">
          <h2 className="text-lg font-bold text-black mb-6">NFL Notes</h2>
          <div className="divide-y divide-gray-200">
            {nflSidebarNews.map((news) => (
              <a key={news.id} href={news.url} className="block py-4 group">
                <h4 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {news.title}
                </h4>
                <p className="text-sm text-gray-500">{news.timeAgo}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFLFeatures;
