"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import heroImage from "@/app/assets/hero.png";
import { IoIosArrowRoundForward } from "react-icons/io";

const inchesToFeetInches = (heightCode: number) => {
  const feet = Math.floor(heightCode / 100);
  const inches = heightCode % 100;
  return `${feet}'${inches}"`;
};

type NFLBackendPlayer = {
  height: number;
  name: string;
  offense: number;
  position: string;
  team_name: string;
  weight: number;
};

type NFLPlayerCard = {
  id: string;
  name: string;
  team: string;
  position: string;
  rating: string;
  height: string;
};

type CFBPlayerCard = {
  id: string;
  name: string;
  team: string;
  position: number;
  height: string;
};

const RatingsFeatureSection = () => {
  const [activeTab, setActiveTab] = useState<
    "prep_ratings" | "college_ratings" | "nfl_ratings" | "hof_ratings"
  >("prep_ratings");

  const [nflPlayers, setNflPlayers] = useState<NFLPlayerCard[]>([]);
  const [nflLoading, setNflLoading] = useState(true);

  const [cfbPlayers, setCfbPlayers] = useState<CFBPlayerCard[]>([]);
  const [cfbLoading, setCfbLoading] = useState(true);

  useEffect(() => {
    const fetchNFL = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL +
            "/pff/ratings?metric=offense&count=10",
          { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error(await res.text());
        const data = (await res.json()) as { players: NFLBackendPlayer[] };

        const mapped: NFLPlayerCard[] = data.players.map((p, idx) => ({
          id: String(idx + 1),
          name: p.name,
          team: p.team_name,
          position: p.position,
          rating: p.offense.toFixed(1),
          height: inchesToFeetInches(p.height),
          weight: String(p.weight),
        }));

        setNflPlayers(mapped);
      } catch (err) {
        console.error("Failed to fetch NFL ratings:", err);
      } finally {
        setNflLoading(false);
      }
    };
    fetchNFL();
  }, []);

  useEffect(() => {
    const fetchCFB = async () => {
      try {
        setCfbLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/players/top`,
          { next: { revalidate: 60 } }
        );
        if (!res.ok) throw new Error(await res.text());

        const response = await res.json();
        const playersData = response.results || [];

        const mapped: CFBPlayerCard[] = playersData
          .slice(0, 10)
          .map((p: CFBPlayerCard, idx: number) => ({
            id: String(idx + 1),
            name: p.name,
            team: p.team,
            position: p.position,
          }));

        setCfbPlayers(mapped);
      } catch (err) {
        console.error("Failed to fetch CFB stats:", err);
        setCfbPlayers([]);
      } finally {
        setCfbLoading(false);
      }
    };

    if (activeTab === "college_ratings") {
      fetchCFB();
    }
  }, [activeTab]);

  const prepPlayers = [
    {
      id: "1",
      name: "Bryce Underwood",
      school: "Belleville HS",
      position: "QB",
    },
    { id: "2", name: "Keelon Russell", school: "Duncanville", position: "QB" },
    {
      id: "3",
      name: "Elijah Griffin",
      school: "Savannah Christian",
      position: "DL",
    },
    {
      id: "4",
      name: "Tavien St. Clair",
      school: " Bellefontaine",
      position: "QB",
    },
    { id: "5", name: "Dakorien Moore", school: "Duncanville", position: "WR" },
    { id: "6", name: "Devin Sanchez", school: "North Shore", position: "CB" },
    { id: "7", name: "Jordan Marshall", school: "Oak Park", position: "RB" },
    { id: "8", name: "Jaden Davis", school: "Providence Day", position: "QB" },
    { id: "9", name: "Kobe Black", school: "Waco Connally", position: "CB" },
    { id: "10", name: "Kendrick Law", school: "John Ehret", position: "WR" },
  ];
  const hofPlayers = [
    {
      id: "1",
      name: "Bryce Underwood",
      school: "Belleville HS",
      position: "QB",
    },
    { id: "2", name: "Keelon Russell", school: "Duncanville", position: "QB" },
    {
      id: "3",
      name: "Elijah Griffin",
      school: "Savannah Christian",
      position: "DL",
    },
    {
      id: "4",
      name: "Tavien St. Clair",
      school: " Bellefontaine",
      position: "QB",
    },
    { id: "5", name: "Dakorien Moore", school: "Duncanville", position: "WR" },
    { id: "6", name: "Devin Sanchez", school: "North Shore", position: "CB" },
    { id: "7", name: "Jordan Marshall", school: "Oak Park", position: "RB" },
    { id: "8", name: "Jaden Davis", school: "Providence Day", position: "QB" },
    { id: "9", name: "Kobe Black", school: "Waco Connally", position: "CB" },
    { id: "10", name: "Kendrick Law", school: "John Ehret", position: "WR" },
  ];

  const featuredStory = {
    title: "NFL's Hidden Gems: Under-the-Radar Prospects Turning Heads",
    url: "/feature/nfl-hidden-gems",
  };

  const featuredArticles = [
    { id: "1", title: "Top 2025 Draft Prospects", url: "/feature/2025-draft" },
    { id: "2", title: "Ricky Watters: HOF Case", url: "/hof/watters" },
    { id: "3", title: "Best HS Games This Week", url: "/prep/streaming" },
    { id: "4", title: "2025 Prospects Rankings", url: "/feature/rankings" },
    { id: "5", title: "Alex Watters : HOF Case", url: "/hof/alex" },
  ];

  const tabs = [
    { id: "prep_ratings", label: "Prep" },
    { id: "college_ratings", label: "CFB" },
    { id: "nfl_ratings", label: "NFL" },
    { id: "hof_ratings", label: "HOF" },
  ];

  return (
    <section className="bg-black py-4 sm:py-6">
      <div className=" px-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-4">
        {/* Sidebar Ratings */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:col-span-3"
        >
          <div className="py-2 sm:py-3 flex flex-col gap-3">
            <p className="text-sm sm:text-md font-normal text-[#98B0FF]">
              Latest Ratings
            </p>
            {/* Tabs */}
            <ul
              className="text-xs sm:text-sm font-medium text-center text-gray-300 shadow flex flex-row divide-gray-600 overflow-clip"
              role="tablist"
            >
              {tabs.map((tab) => (
                <li key={tab.id} className="w-full focus-within:z-10">
                  <button
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`inline-flex items-center justify-between w-full p-3 sm:p-4 hover:border-gray-600 focus:outline-none hover:cursor-pointer ${
                      activeTab === tab.id
                        ? "text-white bg-[#272526]"
                        : "text-gray-500 hover:text-white hover:bg-gray-600"
                    } transition-colors duration-150`}
                  >
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {activeTab === "prep_ratings" &&
                prepPlayers.map((p) => (
                  <Link
                    key={p.id}
                    href={`/prep/bio/${p.id}`}
                    className="group flex items-center gap-3 relative"
                  >
                    <div className="inline-flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full group-hover:bg-gray-500 transition-all duration-300">
                      <span className="font-light text-lg sm:text-xl group-hover:text-black text-gray-500">
                        {p.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-200 group-hover:text-white font-medium text-sm sm:text-base">
                        {p.name}
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-300 text-xs sm:text-sm">
                        {p.school}, {p.position}
                      </div>
                    </div>
                    <IoIosArrowRoundForward className="absolute right-0 text-3xl sm:text-4xl text-gray-500 group-hover:text-white" />
                  </Link>
                ))}

              {activeTab === "college_ratings" &&
                (cfbLoading ? (
                  <div className="text-gray-400 italic text-sm">Loading…</div>
                ) : (
                  cfbPlayers.map((p) => (
                    <Link
                      key={p.id}
                      href={`/cfb/bio/${p.id}`}
                      className="group flex items-center gap-3 relative"
                    >
                      <div className="inline-flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full group-hover:bg-gray-500 transition-all duration-300">
                        <span className="font-light text-lg sm:text-xl group-hover:text-black text-gray-500">
                          {p.id}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-200 group-hover:text-white font-medium text-sm sm:text-base">
                          {p.name}
                        </div>
                        <div className="text-gray-400 group-hover:text-gray-300 text-xs sm:text-sm">
                          {p.team}, {p.position}
                        </div>
                      </div>
                      <IoIosArrowRoundForward className="absolute right-0 text-3xl sm:text-4xl text-gray-500 group-hover:text-white" />
                    </Link>
                  ))
                ))}

              {activeTab === "nfl_ratings" &&
                (nflLoading ? (
                  <div className="text-gray-400 italic text-sm">Loading…</div>
                ) : (
                  nflPlayers.map((p) => (
                    <Link
                      key={p.id}
                      href={`/nfl/bio/${p.id}`}
                      className="group flex items-center gap-3 relative"
                    >
                      <div className="inline-flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full group-hover:bg-gray-500 transition-all duration-300">
                        <span className="font-light text-lg sm:text-xl group-hover:text-black text-gray-500">
                          {p.id}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-200 group-hover:text-white font-medium text-sm sm:text-base">
                          {p.name}
                        </div>
                        <div className="text-gray-400 group-hover:text-gray-300 text-xs sm:text-sm">
                          {p.team}, {p.position}, {p.rating}
                        </div>
                      </div>
                      <IoIosArrowRoundForward className="absolute right-0 text-3xl sm:text-4xl text-gray-500 group-hover:text-white" />
                    </Link>
                  ))
                ))}

              {activeTab === "hof_ratings" &&
                hofPlayers.map((p) => (
                  <Link
                    key={p.id}
                    href={`/hof/bio/${p.id}`}
                    className="group flex items-center gap-3 relative"
                  >
                    <div className="inline-flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full group-hover:bg-gray-500 transition-all duration-300">
                      <span className="font-light text-lg sm:text-xl group-hover:text-black text-gray-500">
                        {p.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-200 group-hover:text-white font-medium text-sm sm:text-base">
                        {p.name}
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-300 text-xs sm:text-sm">
                        {p.school}, {p.position}
                      </div>
                    </div>
                    <IoIosArrowRoundForward className="absolute right-0 text-3xl sm:text-4xl text-gray-500 group-hover:text-white" />
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Center Story Image */}
        <div className="md:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden shadow-lg"
          >
            <Link href={featuredStory.url}>
              <div
                className="h-[220px] sm:h-[340px] md:h-[440px] lg:h-[520px] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage.src})` }}
              >
                <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 sm:mb-5">
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white">
                    {featuredStory.title}
                  </h2>
                </div>
              </div>
            </Link>
            <button
              className="flex text-sm sm:text-base md:text-lg text-white mt-2 sm:mt-3 md:mt-4 cursor-pointer items-center justify-start hover:text-gray-500 transition-colors duration-300 py-2 sm:py-3 pl-3 sm:pl-4"
              onClick={() => (window.location.href = featuredStory.url)}
            >
              Continue reading
              <IoIosArrowRoundForward className="text-xl sm:text-2xl md:text-3xl ml-2" />
            </button>
          </motion.div>
        </div>

        {/* Right-Side Article Links */}
        <div className="md:col-span-3">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="rounded-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-4"
          >
            <p className="text-sm sm:text-md font-normal text-[#98B0FF] ml-2">
              Popular News
            </p>

            {featuredArticles.map((a) => (
              <Link
                key={a.id}
                href={a.url}
                className="group m-2 border-b border-gray-700 pb-2 sm:pb-3 transition-colors duration-300"
              >
                <div className="flex justify-between items-center text-gray-200 group-hover:text-gray-400 font-medium transition-colors duration-300">
                  <span className="text-sm sm:text-lg md:text-xl">
                    {a.title}
                  </span>
                  <IoIosArrowRoundForward className="text-3xl sm:text-4xl md:text-5xl" />
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                  2h ago
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(RatingsFeatureSection);
