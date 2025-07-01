"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PrepsPage = () => {
  const [filterPos, setFilterPos] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data (35 entries to test pagination and filters)
  const mockData = [
    {
      rank: 1,
      name: "Dylan Raiola",
      pos: "QB",
      team: "Georgia",
      rating: "99.1",
    },
    {
      rank: 2,
      name: "Jadyn Davis",
      pos: "QB",
      team: "Michigan",
      rating: "98.4",
    },
    { rank: 3, name: "Caleb Downs", pos: "S", team: "Alabama", rating: "97.9" },
    { rank: 4, name: "Arch Manning", pos: "QB", team: "Texas", rating: "97.5" },
    { rank: 5, name: "Dante Moore", pos: "QB", team: "UCLA", rating: "96.8" },
    {
      rank: 6,
      name: "Evan Stewart",
      pos: "WR",
      team: "Texas A&M",
      rating: "96.3",
    },
    {
      rank: 7,
      name: "Walter Nolen",
      pos: "DT",
      team: "Texas A&M",
      rating: "95.9",
    },
    {
      rank: 8,
      name: "Nyck Harbor",
      pos: "ATH",
      team: "South Carolina",
      rating: "95.5",
    },
    {
      rank: 9,
      name: "Francis Mauigoa",
      pos: "OT",
      team: "Miami",
      rating: "95.2",
    },
    {
      rank: 10,
      name: "Zachariah Branch",
      pos: "WR",
      team: "USC",
      rating: "94.8",
    },
    { rank: 11, name: "Makai Lemon", pos: "WR", team: "USC", rating: "94.5" },
    {
      rank: 12,
      name: "Kadyn Proctor",
      pos: "OT",
      team: "Alabama",
      rating: "94.2",
    },
    {
      rank: 13,
      name: "Jalen Hale",
      pos: "WR",
      team: "Alabama",
      rating: "93.9",
    },
    {
      rank: 14,
      name: "Jaheim Bell",
      pos: "TE",
      team: "Florida State",
      rating: "93.6",
    },
    { rank: 15, name: "Duce Robinson", pos: "TE", team: "USC", rating: "93.3" },
    {
      rank: 16,
      name: "Malaki Starks",
      pos: "S",
      team: "Georgia",
      rating: "93.0",
    },
    {
      rank: 17,
      name: "Samson Okunlola",
      pos: "OT",
      team: "Miami",
      rating: "92.8",
    },
    {
      rank: 18,
      name: "David Hicks",
      pos: "DT",
      team: "Texas A&M",
      rating: "92.5",
    },
    {
      rank: 19,
      name: "Kelby Collins",
      pos: "DE",
      team: "Florida",
      rating: "92.2",
    },
    {
      rank: 20,
      name: "Tony Mitchell",
      pos: "CB",
      team: "Alabama",
      rating: "92.0",
    },
    {
      rank: 21,
      name: "Diontae Johnson",
      pos: "WR",
      team: "Alabama",
      rating: "91.8",
    },
    {
      rank: 22,
      name: "Kendall Milton",
      pos: "RB",
      team: "Georgia",
      rating: "91.5",
    },
    {
      rank: 23,
      name: "J.T. Tuimoloau",
      pos: "DE",
      team: "Ohio State",
      rating: "91.3",
    },
    {
      rank: 24,
      name: "Rome Odunze",
      pos: "WR",
      team: "Washington",
      rating: "91.0",
    },
    {
      rank: 25,
      name: "Dallas Turner",
      pos: "LB",
      team: "Alabama",
      rating: "90.8",
    },
    {
      rank: 26,
      name: "Bryce Young",
      pos: "QB",
      team: "Alabama",
      rating: "90.5",
    },
    {
      rank: 27,
      name: "Jalen Hurts",
      pos: "QB",
      team: "Philadelphia",
      rating: "90.2",
    },
    {
      rank: 28,
      name: "Brock Purdy",
      pos: "QB",
      team: "Seattle",
      rating: "90.0",
    },
    {
      rank: 29,
      name: "Jordan Addison",
      pos: "WR",
      team: "Minnesota",
      rating: "89.8",
    },
    {
      rank: 30,
      name: "Bijan Robinson",
      pos: "RB",
      team: "Atlanta",
      rating: "89.5",
    },
    {
      rank: 31,
      name: "Will Anderson Jr.",
      pos: "LB",
      team: "Houston",
      rating: "89.3",
    },
    {
      rank: 32,
      name: "C.J. Stroud",
      pos: "QB",
      team: "Houston",
      rating: "89.0",
    },
    {
      rank: 33,
      name: "Jaxon Smith-Njigba",
      pos: "WR",
      team: "Seattle",
      rating: "88.8",
    },
    {
      rank: 34,
      name: "Tyler Van Dyke",
      pos: "QB",
      team: "Kansas City",
      rating: "88.5",
    },
    { rank: 35, name: "Tye", pos: "QB", team: "Kansas City", rating: "88.5" },
  ];

  // Extract unique positions for filter
  const positions = ["All", ...new Set(mockData.map((player) => player.pos))];

  // Filter and paginate data
  const filteredData =
    filterPos === "All"
      ? mockData
      : mockData.filter((player) => player.pos === filterPos);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterPos]);

  // Animation variants for dropdown and buttons
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)" },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-[#0F121C] px-4 sm:px-6 py-12 text-white flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
          Preps Player Rankings
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Explore elite high school prospect rankings
        </p>
      </div>

      {/* Rankings Table Section */}
      <div className="max-w-6xl w-full">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Preps Top Prospects
            </h2>
            <p className="text-sm text-gray-400">
              Sample rankings from our scouting network
            </p>
          </div>
          {/* Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <motion.div
              className="relative"
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 12px rgba(255, 255, 255, 0.2)",
              }}
              transition={{ duration: 0.2 }}
            >
              <select
                value={filterPos}
                onChange={(e) => setFilterPos(e.target.value)}
                className="appearance-none rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white/30 text-sm sm:text-base cursor-pointer transition-all duration-300"
              >
                {positions.map((pos) => (
                  <option
                    key={pos}
                    value={pos}
                    className="bg-[#0F121C] hover:bg-white/20 transition"
                  >
                    {pos}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </motion.div>
            <motion.button
              onClick={() => setFilterPos("All")}
              className="rounded-lg bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-white hover:bg-white/20 text-sm sm:text-base cursor-pointer"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Reset Filters
            </motion.button>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl shadow border border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={filterPos + currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <table className="min-w-full text-sm text-white">
                <thead className="text-left border-b border-white/10">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 font-semibold">Rank</th>
                    <th className="px-4 sm:px-6 py-4 font-semibold">Player</th>
                    <th className="px-4 sm:px-6 py-4 font-semibold">Pos</th>
                    <th className="px-4 sm:px-6 py-4 font-semibold">Team</th>
                    <th className="px-4 sm:px-6 py-4 font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((player) => (
                    <tr
                      key={`preps-${player.rank}`}
                      className="border-b border-white/10 hover:bg-white/10 transition"
                    >
                      <td className="px-4 sm:px-6 py-4 font-bold">
                        {player.rank}
                      </td>
                      <td className="px-4 sm:px-6 py-4">{player.name}</td>
                      <td className="px-4 sm:px-6 py-4">{player.pos}</td>
                      <td className="px-4 sm:px-6 py-4">{player.team}</td>
                      <td className="px-4 sm:px-6 py-4 font-semibold">
                        {player.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                currentPage === page
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
              } transition-all duration-300`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {page}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrepsPage;
