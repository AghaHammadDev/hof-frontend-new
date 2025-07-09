"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import draftData from "@/app/assets/hofData.json";

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

interface DraftTableProps {
  data?: Player[];
  onResetFilters?: () => void;
  hideColumns?: string[];
  selectedPosition?: string;
  setSelectedPosition?: React.Dispatch<React.SetStateAction<string>>;
  currentPage?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
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
    <div className="mb-4 sm:mb-6 text-center justify-center">
      <h2 className="text-sm sm:text-lg font-semibold mb-2">
        RANKING LISTS BY POSITION:
      </h2>
      <motion.div
        className="flex flex-wrap gap-1 sm:gap-2 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {positionOptions.map((pos) => (
          <motion.button
            key={pos}
            variants={buttonVariants}
            onClick={() => onPositionChange(pos)}
            className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded transition-colors duration-200 ${
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

interface PlayerTableProps {
  paginatedData: Player[];
  currentPage: number;
  selectedPosition: string;
  hideColumns?: string[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({
  paginatedData,

  hideColumns = [],
}) => {
  const columns = [
    { key: "rank", label: "Rank", className: "bg-blue-700 text-white" },
    {
      key: "player",
      label: "Player",
      headerPadding: "px-2",
      cellPadding: "px-0 py-0",
    },
    { key: "position", label: "Pos." },
    { key: "posRank", label: "Pos. Rank" },
    { key: "height", label: "Ht" },
    { key: "weight", label: "Wt" },
    { key: "class", label: "Class" },
    { key: "forty", label: "40" },
    { key: "projRound", label: "Proj. Round" },
  ];

  const visibleColumns = columns.filter(
    (column) => !hideColumns.includes(column.key)
  );

  const mobileColumns = [
    { key: "rank", label: "Rank", className: "bg-blue-700 text-white" },
    {
      key: "player",
      label: "Player Info",
      headerPadding: "px-2",
      cellPadding: "px-0 py-0",
    },
    { key: "height", label: "Ht." },
    { key: "weight", label: "Wt." },
    { key: "forty", label: "40" },
    { key: "projRound", label: "Round" },
  ].filter((column) => !hideColumns.includes(column.key));

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-xs sm:text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className={`border border-gray-300 ${
                    column.headerPadding || "px-2 sm:px-4"
                  } py-2 text-left ${column.className || ""}`}
                >
                  {column.label}
                </th>
              ))}
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
                  {visibleColumns.map((column) => (
                    <td
                      key={column.key}
                      className={`border border-gray-300 ${
                        column.cellPadding || "px-2 sm:px-4 py-2"
                      } ${
                        column.key === "rank"
                          ? `bg-black text-white text-center align-middle ${
                              isTopPlayer
                                ? "text-4xl font-extrabold"
                                : "text-2xl"
                            }`
                          : ""
                      }`}
                    >
                      {column.key === "player" ? (
                        <div className="flex items-center gap-2">
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
                        </div>
                      ) : (
                        player[column.key as keyof Player]
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div className="block sm:hidden overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-xs">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {mobileColumns.map((column) => (
                <th
                  key={column.key}
                  className={`border border-gray-300 ${
                    column.headerPadding || "px-2"
                  } py-1 text-left ${column.className || ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedData.map((player) => {
              const isTopPlayer = player.rank === 1;

              return (
                <tr key={player.rank} className="hover:bg-gray-50">
                  {mobileColumns.map((column) => (
                    <td
                      key={column.key}
                      className={`border border-gray-300 ${
                        column.cellPadding || "px-2 py-1"
                      } ${
                        column.key === "rank"
                          ? `text-white bg-black text-center ${
                              isTopPlayer ? "text-2xl" : "text-base"
                            }`
                          : "text-xs"
                      }`}
                    >
                      {column.key === "player" ? (
                        <div className="flex items-center gap-2">
                          <Image
                            src={player.img}
                            alt={player.player}
                            width={isTopPlayer ? 48 : 32}
                            height={isTopPlayer ? 48 : 32}
                            className={`object-cover ${
                              isTopPlayer ? "w-12 h-12" : "w-8 h-8"
                            }`}
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
                              {[
                                player.state,
                                !hideColumns.includes("class")
                                  ? player.class
                                  : null,
                                player.position,
                                `#${player.posRank}`,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </div>
                        </div>
                      ) : (
                        player[column.key as keyof Player]
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

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
      className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 sm:gap-4"
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
          <IoIosArrowRoundBack className="w-6 h-6 sm:w-8 sm:h-8 text-black hover:text-blue-700 transition-colors duration-300" />
        </button>
        <div className="flex space-x-1 sm:space-x-2 mx-1 sm:mx-2">
          {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
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
          <IoIosArrowRoundForward className="w-6 h-6 sm:w-8 sm:h-8 text-black hover:text-blue-700 transition-colors duration-300" />
        </button>
      </div>
      <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
        Showing {filteredDataLength > 0 ? currentPage * ITEMS_PER_PAGE + 1 : 0}-
        {Math.min((currentPage + 1) * ITEMS_PER_PAGE, filteredDataLength)} of{" "}
        {filteredDataLength} players
      </div>
    </motion.div>
  );
};

export default function DraftTable({
  data = draftData,
  onResetFilters,
  hideColumns = [],
  selectedPosition: controlledPosition,
  setSelectedPosition,
  currentPage: controlledPage,
  setCurrentPage,
}: DraftTableProps) {
  const [internalPosition, setInternalPosition] = useState("All Positions");
  const [internalPage, setInternalPage] = useState(0);
  const [, setDirection] = useState(0);

  const selectedPosition = controlledPosition ?? internalPosition;
  const currentPage = controlledPage ?? internalPage;

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
    if (setSelectedPosition) {
      setSelectedPosition(position);
    } else {
      setInternalPosition(position);
    }
    if (setCurrentPage) {
      setCurrentPage(0);
    } else {
      setInternalPage(0);
    }
  };

  const handlePrevPage = () => {
    const newPage = Math.max(currentPage - 1, 0);
    if (setCurrentPage) {
      setCurrentPage(newPage);
    } else {
      setInternalPage(newPage);
    }
    setDirection(-1);
  };

  const handleNextPage = () => {
    const newPage = Math.min(currentPage + 1, totalPages - 1);
    if (setCurrentPage) {
      setCurrentPage(newPage);
    } else {
      setInternalPage(newPage);
    }
    setDirection(1);
  };

  const handlePageClick = (pageIndex: number) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    if (setCurrentPage) {
      setCurrentPage(pageIndex);
    } else {
      setInternalPage(pageIndex);
    }
  };

  const handleResetFilters = () => {
    if (onResetFilters) {
      onResetFilters();
    } else {
      setInternalPosition("All Positions");
      setInternalPage(0);
    }
  };

  return (
    <div className="w-full py-2 sm:py-4 bg-white text-gray-900">
      <PositionFilters
        selectedPosition={selectedPosition}
        onPositionChange={handlePositionButtonClick}
      />

      <PlayerTable
        paginatedData={paginatedData}
        currentPage={currentPage}
        selectedPosition={selectedPosition}
        hideColumns={hideColumns}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        filteredDataLength={filteredData.length}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageClick={handlePageClick}
      />

      {onResetFilters && (
        <motion.button
          onClick={handleResetFilters}
          className="mt-2 sm:mt-4 border border-gray-300 text-blue-700 hover:bg-gray-100 hover:text-blue-800 hover:border-blue-800 px-2 sm:px-3 py-1 text-xs sm:text-sm transition-colors duration-200 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Reset all filters"
        >
          Reset Filters
        </motion.button>
      )}
    </div>
  );
}
