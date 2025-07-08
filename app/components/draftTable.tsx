"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import draftData from "@/app/assets/hofData.json";

// Type definition for player data
interface Player {
  rank: number;
  player: string;
  state: string;
  position: string;
  posRank: number;
  height: string;
  weight: number;
  class: string;
  forty: number;
  projRound: number;
  img: string;
}

const positionOptions = [
  "All Positions",
  "QB",
  "RB",
  "WR",
  "TE",
  "OT",
  "OG",
  "C",
  "DT",
  "DE",
  "OLB",
  "ILB",
  "CB",
  "S",
  "K",
  "P",
];

const ITEMS_PER_PAGE = 10;

// Position Filters Component
interface PositionFiltersProps {
  selectedPosition: string;
  onPositionChange: (position: string) => void;
}

const PositionFilters: React.FC<PositionFiltersProps> = ({
  selectedPosition,
  onPositionChange,
}) => {
  const buttonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <div className="mb-6 text-center justify-center">
      <h2 className="text-lg font-semibold mb-2">RANKING LISTS BY POSITION:</h2>
      <motion.div
        className="flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {positionOptions.map((pos) => (
          <motion.button
            key={pos}
            variants={buttonVariants}
            onClick={() => onPositionChange(pos)}
            className={`px-3 py-1 text-xs sm:text-sm rounded transition-colors duration-200 ${
              selectedPosition === pos
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            aria-label={`Filter by ${pos}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {pos}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

// Player Table Component
interface PlayerTableProps {
  paginatedData: Player[];
  currentPage: number;
  selectedPosition: string;
}

const PlayerTable: React.FC<PlayerTableProps> = ({
  paginatedData,
  currentPage,
  selectedPosition,
}) => {
  return (
    <>
      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table
          key={`${currentPage}-${selectedPosition}`}
          className="min-w-full border border-gray-300 text-xs sm:text-sm"
        >
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 bg-blue-700 text-white px-2 sm:px-4 py-2 text-left">
                Rank
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                Player
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                Pos.
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                Pos. Rank
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                Ht
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                Wt
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                Class
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                40
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                Proj. Round
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedData.map((player) => {
              const isTopPlayer = player.rank === 1;

              return (
                <tr
                  key={player.rank}
                  className={`hover:bg-gray-50 ${
                    isTopPlayer ? "bg-white" : ""
                  }`}
                >
                  <td
                    className={`border border-gray-300 bg-black text-white px-2 sm:px-4 py-2 font-semibold text-center align-middle ${
                      isTopPlayer ? "text-4xl font-extrabold" : "text-2xl"
                    }`}
                  >
                    {player.rank}
                  </td>
                  <td className="border border-gray-200 flex items-center gap-2 ">
                    <Image
                      src={player.img}
                      alt={player.player}
                      width={isTopPlayer ? 64 : 32}
                      height={isTopPlayer ? 64 : 32}
                      className={`object-cover ${
                        isTopPlayer
                          ? "w-16 h-16 sm:w-24 sm:h-24"
                          : "w-8 h-8 sm:w-16 sm:h-16"
                      }`}
                    />
                    <div className="flex flex-col">
                      <span
                        className={`font-medium ${
                          isTopPlayer
                            ? "text-base sm:text-lg"
                            : "text-xs sm:text-sm"
                        }`}
                      >
                        {player.player}
                      </span>
                      <span
                        className={`text-gray-500 ${
                          isTopPlayer ? "text-sm sm:text-base" : "text-xs"
                        }`}
                      >
                        {player.state}
                      </span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {player.position}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {player.posRank}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {player.height}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {player.weight}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {player.class}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {player.forty}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {player.projRound}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Compact table for mobile */}
      <div className="block sm:hidden overflow-x-auto">
        <table
          key={`${currentPage}-${selectedPosition}`}
          className="min-w-full border border-gray-300 text-xs"
        >
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border border-gray-300 bg-blue-700 text-white px-2 py-1 text-left">
                Rank
              </th>
              <th className="border border-gray-300 px-2 py-1 text-left">
                Player Info
              </th>
              <th className="border border-gray-300 px-2 py-1 text-left">
                Ht.
              </th>
              <th className="border border-gray-300 px-2 py-1 text-left">
                Wt.
              </th>
              <th className="border border-gray-300 px-2 py-1 text-left">40</th>
              <th className="border border-gray-300 px-2 py-1 text-left">
                Round
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedData.map((player) => {
              const isTopPlayer = player.rank === 1;

              return (
                <tr key={player.rank} className="hover:bg-gray-50">
                  <td
                    className={`border border-gray-300 text-white bg-black px-2 py-1 font-semibold text-center ${
                      isTopPlayer ? "text-2xl" : "text-base"
                    }`}
                  >
                    {player.rank}
                  </td>
                  <td className="border border-gray-300 ">
                    <div className="flex items-center gap-2">
                      <Image
                        src={player.img}
                        alt={player.player}
                        width={isTopPlayer ? 48 : 32}
                        height={isTopPlayer ? 48 : 32}
                        className={`object-cover ${
                          isTopPlayer ? "w-12 h-12" : "w-8 h-8"
                        } `}
                      />
                      <div className="flex flex-col">
                        <span
                          className={`font-medium ${
                            isTopPlayer ? "text-sm" : "text-xs"
                          }`}
                        >
                          {player.player}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {player.state}, {player.class}, {player.position}, #
                          {player.posRank}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-xs">
                    {player.height}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-xs">
                    {player.weight}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-xs">
                    {player.forty}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-xs">
                    {player.projRound}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Pagination Controls Component
interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  filteredDataLength: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageClick: (pageIndex: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  filteredDataLength,
  onPrevPage,
  onNextPage,
  onPageClick,
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4"
    >
      <div className="flex items-center">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 0}
          className={`p-1 ${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Previous page"
        >
          <IoIosArrowRoundBack className="w-8 h-8 text-black hover:text-blue-700 transition-colors duration-300" />
        </button>
        <div className="flex space-x-2 mx-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => onPageClick(i)}
              className={`w-2 h-4 rounded-full cursor-pointer transition-all ${
                i === currentPage ? "bg-blue-700" : "bg-gray-300"
              }`}
              aria-label={`Go to page ${i + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages - 1}
          className={`p-1 ${
            currentPage === totalPages - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          aria-label="Next page"
        >
          <IoIosArrowRoundForward className="w-8 h-8 text-black hover:text-blue-700 transition-colors duration-300" />
        </button>
      </div>
      <div className="text-xs sm:text-sm text-gray-500">
        Showing {filteredDataLength > 0 ? currentPage * ITEMS_PER_PAGE + 1 : 0}-
        {Math.min((currentPage + 1) * ITEMS_PER_PAGE, filteredDataLength)} of{" "}
        {filteredDataLength} players
      </div>
    </motion.div>
  );
};

// Main DraftTable Component
interface DraftTableProps {
  data?: Player[]; // Optional for future API integration
  onResetFilters?: () => void; // Callback for external reset control
}

export default function DraftTable({ data = draftData }: DraftTableProps) {
  const [selectedPosition, setSelectedPosition] = useState("All Positions");
  const [currentPage, setCurrentPage] = useState(0);
  const [, setDirection] = useState(0);

  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData: Player[] = useMemo(
    () =>
      data.filter(
        (player) =>
          selectedPosition === "All Positions" ||
          player.position === selectedPosition
      ),
    [selectedPosition, data]
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePositionButtonClick = (position: string) => {
    setSelectedPosition(position);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
    setDirection(-1);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    setDirection(1);
  };

  const handlePageClick = (pageIndex: number) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  return (
    <div className="w-full py-4 bg-white text-gray-900">
      <PositionFilters
        selectedPosition={selectedPosition}
        onPositionChange={handlePositionButtonClick}
      />

      <PlayerTable
        paginatedData={paginatedData}
        currentPage={currentPage}
        selectedPosition={selectedPosition}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        filteredDataLength={filteredData.length}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageClick={handlePageClick}
      />
    </div>
  );
}
