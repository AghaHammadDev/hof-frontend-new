"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import draftData from "../../assets/draftData.json";
import user from "../../assets/usericon.jpg";

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

export default function DraftTable() {
  const [selectedPosition, setSelectedPosition] = useState("All Positions");
  const [currentPage, setCurrentPage] = useState(0);

  const filteredData: Player[] = draftData.filter(
    (player) =>
      selectedPosition === "All Positions" ||
      player.position === selectedPosition
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(e.target.value);
    setCurrentPage(0);
  };

  const handleResetFilters = () => {
    setSelectedPosition("All Positions");
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handlePageClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-4 bg-white text-gray-900">
      {/* Header with title and dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">2026 DRAFT</h1>
          <span className="text-xs sm:text-sm text-gray-500">
            Rankings by NFL Draft Scout
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={handleResetFilters}
            className="border border-gray-300 text-blue-700 hover:bg-gray-100 hover:text-blue-800 hover:border-blue-800 px-3 py-2 text-xs sm:text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            Reset Filters
          </button>
          <select
            value={selectedPosition}
            onChange={handlePositionChange}
            className="border border-gray-300 text-blue-700 cursor-pointer px-3 py-2 text-xs sm:text-sm"
          >
            {positionOptions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-xs sm:text-sm">
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
            {paginatedData.map((player) => (
              <tr key={player.rank} className="hover:bg-gray-50">
                <td className="border border-gray-300 text-white bg-black px-2 sm:px-4 py-2 font-semibold">
                  {player.rank}
                </td>
                <td className="border border-gray-200 px-2 sm:px-4 py-2 flex items-center gap-2">
                  <Image
                    src={user}
                    alt={player.player}
                    width={32}
                    height={32}
                    className="object-cover w-8 h-8 sm:w-10 sm:h-10 rounded"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-xs sm:text-sm">
                      {player.player}
                    </span>
                    <span className="text-gray-500 text-xs">
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="block sm:hidden space-y-4">
        {paginatedData.map((player) => (
          <div
            key={player.rank}
            className="border border-gray-300 rounded-md p-4 bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Image
                src={user}
                alt={player.player}
                width={48}
                height={48}
                className="object-cover w-12 h-12 rounded"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium text-sm">{player.player}</span>
                    <p className="text-xs text-gray-500">{player.state}</p>
                  </div>
                  <span className="text-white bg-black px-2 py-1 rounded text-xs font-semibold">
                    #{player.rank}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <div>
                    <span className="text-gray-500">Position: </span>
                    {player.position}
                  </div>
                  <div>
                    <span className="text-gray-500">Pos. Rank: </span>
                    {player.posRank}
                  </div>
                  <div>
                    <span className="text-gray-500">Height: </span>
                    {player.height}
                  </div>
                  <div>
                    <span className="text-gray-500">Weight: </span>
                    {player.weight}
                  </div>
                  <div>
                    <span className="text-gray-500">Class: </span>
                    {player.class}
                  </div>
                  <div>
                    <span className="text-gray-500">40 Time: </span>
                    {player.forty}
                  </div>
                  <div>
                    <span className="text-gray-500">Proj. Round: </span>
                    {player.projRound}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
        <div className="flex items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`p-1 ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <IoIosArrowRoundBack className="w-8 h-8 text-black hover:text-blue-700 transition-colors duration-300" />
          </button>
          <div className="flex space-x-2 mx-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageClick(i)}
                className={`w-2 h-4 rounded-full cursor-pointer transition-all ${
                  i === currentPage ? "bg-blue-700" : "bg-gray-300"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            className={`p-1 ${
              currentPage === totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <IoIosArrowRoundForward className="w-8 h-8 text-black hover:text-blue-700 transition-colors duration-300" />
          </button>
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          Showing{" "}
          {filteredData.length > 0 ? currentPage * ITEMS_PER_PAGE + 1 : 0}-
          {Math.min((currentPage + 1) * ITEMS_PER_PAGE, filteredData.length)} of{" "}
          {filteredData.length} players
        </div>
      </div>
    </div>
  );
}
