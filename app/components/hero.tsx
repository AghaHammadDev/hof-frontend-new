"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import heroImage from "@/app/assets/logo.png";

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
  >("college_ratings");

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
      school: "Bellefontaine",
      position: "QB",
    },
    { id: "5", name: "Dakorien Moore", school: "Duncanville", position: "WR" },
    { id: "6", name: "Devin Sanchez", school: "North Shore", position: "CB" },
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
    <section className="bg-black py-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12">
        {/* Sidebar Ratings */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:col-span-3"
        >
          <div className="p-6 flex flex-col gap-3">
            <p className="text-md font-normal text-[#98B0FF]">Latest Ratings</p>
            {/* Tabs */}
            <ul
              className="text-sm font-medium text-center text-gray-300 shadow flex divide-gray-600 overflow-clip"
              role="tablist"
            >
              {tabs.map((tab) => (
                <li key={tab.id} className="w-full focus-within:z-10">
                  <button
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`inline-block w-full p-4 border-rhover:border-gray-600 focus:outline-none hover:cursor-pointer ${
                      activeTab === tab.id
                        ? "text-white bg-[#272526] "
                        : "text-gray-500 hover:text-white hover:bg-gray-600"
                    } transition-colors duration-150`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="flex flex-col gap-4">
              {activeTab === "prep_ratings" &&
                prepPlayers.map((p) => (
                  <Link
                    key={p.id}
                    href={`/prep/bio/${p.id}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="inline-flex w-10 h-10 items-center justify-center rounded-full group-hover:bg-gray-500  transition-all duration-300">
                      <span className="font-light text-xl group-hover:text-black text-gray-500">
                        {p.id}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-200 group-hover:text-white font-medium">
                        {p.name}
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-300 text-sm">
                        {p.school}, {p.position}
                      </div>
                    </div>
                  </Link>
                ))}

              {activeTab === "college_ratings" &&
                (cfbLoading ? (
                  <div className="text-gray-400 italic">Loading…</div>
                ) : (
                  cfbPlayers.map((p) => (
                    <Link
                      key={p.id}
                      href={`/cfb/bio/${p.id}`}
                      className="group flex items-center gap-3 hover:bg-gray-700 transition rounded hover:ring-8 hover:ring-gray-700"
                    >
                      <div className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 group-hover:bg-gray-600">
                        <span className="font-bold text-gray-300">{p.id}</span>
                      </div>
                      <div>
                        <div className="text-gray-200 group-hover:text-white font-medium">
                          {p.name}
                        </div>
                        <div className="text-gray-400 group-hover:text-gray-300 text-sm">
                          {p.team}, {p.position}
                        </div>
                      </div>
                    </Link>
                  ))
                ))}

              {activeTab === "nfl_ratings" &&
                (nflLoading ? (
                  <div className="text-gray-400 italic">Loading…</div>
                ) : (
                  nflPlayers.map((p) => (
                    <Link
                      key={p.id}
                      href={`/nfl/bio/${p.id}`}
                      className="group flex items-center gap-3 hover:bg-gray-700 transition rounded hover:ring-8 hover:ring-gray-700"
                    >
                      <div className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-gray-700 group-hover:bg-gray-600">
                        <span className="font-bold text-gray-300">{p.id}</span>
                      </div>
                      <div>
                        <div className="text-gray-200 group-hover:text-white font-medium">
                          {p.name}
                        </div>
                        <div className="text-gray-400 group-hover:text-gray-300 text-sm">
                          {p.team}, {p.position}, {p.rating}
                        </div>
                      </div>
                    </Link>
                  ))
                ))}

              {activeTab === "hof_ratings" && (
                <div>
                  <div className="font-bold text-gray-200 mb-2">
                    HOF Ratings by Position
                  </div>
                  <Link
                    href="/hof/ratings"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    See All →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Center Story Image */}
        <div className="md:col-span-6 w-[500px] ">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative overflow-hidden shadow-lg"
          >
            <Link href={featuredStory.url}>
              <div
                className="h-[500px]  bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage.src})` }}
              >
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 py-4">
                  <h2 className="text-xl font-bold text-white">
                    {featuredStory.title}
                  </h2>
                  <p className="text-sm text-blue-400 mt-1">
                    Continue reading →
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Right-Side Article Links */}
        <div className="md:col-span-3">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-gray-800 rounded-lg p-6 flex flex-col gap-4"
          >
            {featuredArticles.map((a) => (
              <Link key={a.id} href={a.url} className="group">
                <div className="flex justify-between items-center text-gray-200 group-hover:text-white font-medium">
                  <span>{a.title}</span>
                  <span className="text-blue-400">→</span>
                </div>
                <div className="text-sm text-gray-400 mt-1">2h ago</div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RatingsFeatureSection;
