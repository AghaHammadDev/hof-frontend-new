"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HOFPage = () => {
  const [filterPos, setFilterPos] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data (35 entries to test pagination and filters)
  const mockData = [
    {
      rank: 1,
      name: "Tom Brady",
      pos: "QB",
      team: "Patriots/Bucs",
      rating: "100",
    },
    { rank: 2, name: "Jerry Rice", pos: "WR", team: "49ers", rating: "99.5" },
    {
      rank: 3,
      name: "Lawrence Taylor",
      pos: "LB",
      team: "Giants",
      rating: "99.2",
    },
    { rank: 4, name: "Jim Brown", pos: "RB", team: "Browns", rating: "99.0" },
    {
      rank: 5,
      name: "Reggie White",
      pos: "DE",
      team: "Eagles/Packers",
      rating: "98.8",
    },
    {
      rank: 6,
      name: "Joe Montana",
      pos: "QB",
      team: "49ers/Chiefs",
      rating: "98.5",
    },
    {
      rank: 7,
      name: "Walter Payton",
      pos: "RB",
      team: "Bears",
      rating: "98.3",
    },
    {
      rank: 8,
      name: "Deion Sanders",
      pos: "CB",
      team: "Falcons/Cowboys",
      rating: "98.0",
    },
    {
      rank: 9,
      name: "Barry Sanders",
      pos: "RB",
      team: "Lions",
      rating: "97.8",
    },
    {
      rank: 10,
      name: "Peyton Manning",
      pos: "QB",
      team: "Colts/Broncos",
      rating: "97.6",
    },
    {
      rank: 11,
      name: "Randy Moss",
      pos: "WR",
      team: "Vikings/Patriots",
      rating: "97.4",
    },
    { rank: 12, name: "Ray Lewis", pos: "LB", team: "Ravens", rating: "97.2" },
    { rank: 13, name: "Bruce Smith", pos: "DE", team: "Bills", rating: "97.0" },
    {
      rank: 14,
      name: "Emmitt Smith",
      pos: "RB",
      team: "Cowboys",
      rating: "96.8",
    },
    { rank: 15, name: "Ronnie Lott", pos: "S", team: "49ers", rating: "96.6" },
    {
      rank: 16,
      name: "Brett Favre",
      pos: "QB",
      team: "Packers",
      rating: "96.4",
    },
    { rank: 17, name: "Dick Butkus", pos: "LB", team: "Bears", rating: "96.2" },
    {
      rank: 18,
      name: "John Elway",
      pos: "QB",
      team: "Broncos",
      rating: "96.0",
    },
    {
      rank: 19,
      name: "Terrell Owens",
      pos: "WR",
      team: "49ers/Eagles",
      rating: "95.8",
    },
    {
      rank: 20,
      name: "Rod Woodson",
      pos: "CB",
      team: " PLEASE PROVIDE A VALID TEAM VALUE FOR player.team",
      rating: "95.6",
    },
    {
      rank: 21,
      name: "Dan Marino",
      pos: "QB",
      team: "Dolphins",
      rating: "95.4",
    },
    {
      rank: 22,
      name: "Anthony Munoz",
      pos: "OT",
      team: "Bengals",
      rating: "95.2",
    },
    {
      rank: 23,
      name: "Joe Greene",
      pos: "DT",
      team: "Steelers",
      rating: "95.0",
    },
    {
      rank: 24,
      name: "Johnny Unitas",
      pos: "QB",
      team: "Colts",
      rating: "94.8",
    },
    { rank: 25, name: "Deacon Jones", pos: "DE", team: "Rams", rating: "94.6" },
    {
      rank: 26,
      name: "Troy Aikman",
      pos: "QB",
      team: "Cowboys",
      rating: "94.4",
    },
    { rank: 27, name: "Steve Young", pos: "QB", team: "49ers", rating: "94.2" },
    {
      rank: 28,
      name: "Tony Gonzalez",
      pos: "TE",
      team: "Chiefs/Falcons",
      rating: "94.0",
    },
    {
      rank: 29,
      name: "Jack Lambert",
      pos: "LB",
      team: "Steelers",
      rating: "93.8",
    },
    {
      rank: 30,
      name: "LaDainian Tomlinson",
      pos: "RB",
      team: "Chargers",
      rating: "93.6",
    },
    {
      rank: 31,
      name: "Darrell Green",
      pos: "CB",
      team: "Redskins",
      rating: "93.4",
    },
    {
      rank: 32,
      name: "Junior Seau",
      pos: "LB",
      team: "Chargers",
      rating: "93.2",
    },
    {
      rank: 33,
      name: "Mike Singletary",
      pos: "LB",
      team: "Bears",
      rating: "93.0",
    },
    {
      rank: 34,
      name: "Eric Dickerson",
      pos: "RB",
      team: "Rams",
      rating: "92.8",
    },
    {
      rank: 35,
      name: "Charles Woodson",
      pos: "CB",
      team: "Raiders/Packers",
      rating: "92.6",
    },
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
          Hall of Fame Player Rankings
        </h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Explore legendary NFL Hall of Fame player rankings
        </p>
      </div>

      {/* Rankings Table Section */}
      <div className="max-w-6xl w-full">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Hall of Fame Top Prospects
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
                      key={`hof-${player.rank}`}
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

export default HOFPage;
