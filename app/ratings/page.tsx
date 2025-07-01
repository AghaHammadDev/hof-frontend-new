"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const RatingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const tabs = [
    {
      label: "Preps",
      data: [
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
        {
          rank: 3,
          name: "Caleb Downs",
          pos: "S",
          team: "Alabama",
          rating: "97.9",
        },
        {
          rank: 4,
          name: "Arch Manning",
          pos: "QB",
          team: "Texas",
          rating: "97.5",
        },
        {
          rank: 5,
          name: "Dante Moore",
          pos: "QB",
          team: "UCLA",
          rating: "96.8",
        },
      ],
    },
    {
      label: "CFB",
      data: [
        {
          rank: 1,
          name: "Caleb Williams",
          pos: "QB",
          team: "USC",
          rating: "98.7",
        },
        { rank: 2, name: "Drake Maye", pos: "QB", team: "UNC", rating: "97.3" },
        {
          rank: 3,
          name: "Marvin Harrison Jr.",
          pos: "WR",
          team: "Ohio State",
          rating: "96.5",
        },
        {
          rank: 4,
          name: "Brock Bowers",
          pos: "TE",
          team: "Georgia",
          rating: "96.1",
        },
        {
          rank: 5,
          name: "Joe Alt",
          pos: "OT",
          team: "Notre Dame",
          rating: "95.8",
        },
      ],
    },
    {
      label: "NFL",
      data: [
        {
          rank: 1,
          name: "Patrick Mahomes",
          pos: "QB",
          team: "Chiefs",
          rating: "99.9",
        },
        {
          rank: 2,
          name: "Justin Jefferson",
          pos: "WR",
          team: "Vikings",
          rating: "98.5",
        },
        {
          rank: 3,
          name: "Aaron Donald",
          pos: "DT",
          team: "Rams",
          rating: "98.2",
        },
        {
          rank: 4,
          name: "Travis Kelce",
          pos: "TE",
          team: "Chiefs",
          rating: "97.8",
        },
        {
          rank: 5,
          name: "Nick Bosa",
          pos: "DE",
          team: "49ers",
          rating: "97.5",
        },
      ],
    },
    {
      label: "Hall of Fame",
      data: [
        {
          rank: 1,
          name: "Tom Brady",
          pos: "QB",
          team: "Patriots/Bucs",
          rating: "100",
        },
        {
          rank: 2,
          name: "Jerry Rice",
          pos: "WR",
          team: "49ers",
          rating: "99.5",
        },
        {
          rank: 3,
          name: "Lawrence Taylor",
          pos: "LB",
          team: "Giants",
          rating: "99.2",
        },
        {
          rank: 4,
          name: "Jim Brown",
          pos: "RB",
          team: "Browns",
          rating: "99.0",
        },
        {
          rank: 5,
          name: "Reggie White",
          pos: "DE",
          team: "Eagles/Packers",
          rating: "98.8",
        },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered, tabs.length]);

  return (
    <div className="min-h-screen bg-[#0F121C] px-6 py-12 text-white flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Player Ratings
        </h1>
        <p className="text-gray-300">
          Explore elite prospect rankings across every level
        </p>
      </div>

      {/* Glass Cards Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {tabs.map(({ label }) => (
          <Link
            key={label}
            href={`/ratings/${label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div
              className={`rounded-2xl p-6 bg-white/10 backdrop-blur-md hover:scale-[1.02] hover:bg-white/20 transition cursor-pointer shadow-lg border border-white/20`}
            >
              <h2 className="text-xl font-semibold text-white mb-1">{label}</h2>
              <p className="text-gray-300 text-sm">View top talent rankings</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-16 w-full max-w-6xl" />

      {/* Preview Section with Carousel */}
      <div className="max-w-6xl w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Top 5 Preview</h2>
          <p className="text-sm text-gray-400">
            Sample rankings from our scouting network
          </p>
        </div>

        {/* Tab Indicators */}
        <div className="flex gap-2 mb-4">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeTab === index ? "w-8 bg-blue-500" : "w-4 bg-white/20"
              }`}
              aria-label={`Show ${tab.label} rankings`}
            />
          ))}
        </div>

        {/* Animated Content */}
        <div
          className="relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl shadow border border-white/10 cursor-default"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {tabs[activeTab].label} Rankings
                </h3>
              </div>
              <table className="min-w-full text-sm text-white">
                <thead className="text-left border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Rank</th>
                    <th className="px-6 py-4 font-semibold">Player</th>
                    <th className="px-6 py-4 font-semibold">Pos</th>
                    <th className="px-6 py-4 font-semibold">Team</th>
                    <th className="px-6 py-4 font-semibold">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {tabs[activeTab].data.map((player) => (
                    <tr
                      key={`${tabs[activeTab].label}-${player.rank}`}
                      className="border-b border-white/10 hover:bg-white/10 transition"
                    >
                      <td className="px-6 py-4 font-bold">{player.rank}</td>
                      <td className="px-6 py-4">{player.name}</td>
                      <td className="px-6 py-4">{player.pos}</td>
                      <td className="px-6 py-4">{player.team}</td>
                      <td className="px-6 py-4 font-semibold">
                        {player.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RatingsPage;
