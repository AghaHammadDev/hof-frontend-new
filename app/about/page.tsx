"use client";

import React from "react";
import { motion } from "framer-motion";
import Nfl from "@/app/assets/nfl.jpg";

export default function About() {
  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center p-3 flex items-center justify-center "
      style={{ backgroundImage: `url(${Nfl.src})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-full bg-white/10 text-white p-10 md:p-14 rounded-xl shadow-2xl backdrop-blur-lg border border-white/20"
      >
        <h1 className="text-4xl font-bold mb-6 text-center ">
          About Hall of Football
        </h1>
        <p className="text-lg leading-relaxed text-gray-200 mb-4">
          Welcome to{" "}
          <span className="font-semibold text-white">Hall of Football</span> — a
          passionate community that tracks and celebrates football excellence,
          from high school beginnings to the legendary Pro Football Hall of
          Fame. But it's not just about the players — this is a launchpad for
          aspiring journalists, photographers, videographers, and football
          creatives of every kind.
        </p>

        <p className="text-lg leading-relaxed text-gray-200 mb-4">
          Built on the legacy of <strong>The Sports Xchange</strong> and
          <strong> NFLDraftScout.com</strong>, we've helped launch the careers
          of NFL insiders like Kevin Demoff (Rams), Jay Glazer (FOX), Dane
          Brugler (The Athletic), Chad Reuter (NFL.com), and Rob Rang (FOX, CFL
          Scout).
        </p>

        <p className="text-lg leading-relaxed text-gray-200 mb-4">
          Publisher <strong>Frank Cooney</strong>, who's covered football since
          1965 and was among the first to report on the NFL Draft in 1967,
          founded NFLDraftScout in 1987 — which now lives on as part of
          HallOfFootball.com. His resume includes launching NFL on FOX,
          developing Madden and NCAA video game rating systems, and shaping how
          football is covered across platforms.
        </p>

        <p className="text-2xl leading-relaxed underline text-gray-200 text-center mb-4">
          Our mission is twofold
        </p>
        <ul className="pl-6 text-gray-200 text-center space-y-2 mb-6">
          <li>
            To track the top football players from high school through
            retirement — and beyond.
          </li>
          <li>
            To provide dynamic, real-time player ratings at every level of the
            game.
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
