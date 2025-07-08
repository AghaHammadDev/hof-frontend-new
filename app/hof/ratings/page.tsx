"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import DraftTable from "../../components/draftTable";
import hofData from "@/app/assets/hofData.json";

export default function HOFRatingsPage() {
  const [, setSelectedPosition] = useState("All Positions");
  const [, setCurrentPage] = useState(0);

  const handleResetFilters = () => {
    setSelectedPosition("All Positions");
    setCurrentPage(0);
  };

  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Hall of Fame Ratings
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Player rankings for Hall of Fame consideration, curated by NFL
              Scouts
            </p>
          </div>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            onClick={handleResetFilters}
            className="border border-gray-300 text-blue-700 hover:bg-gray-100 hover:text-blue-800 hover:border-blue-800 px-3 py-2 text-xs sm:text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
            aria-label="Reset all filters"
          >
            Reset Filters
          </motion.button>
        </motion.div>
        <DraftTable data={hofData} onResetFilters={handleResetFilters} />
      </div>
    </div>
  );
}
