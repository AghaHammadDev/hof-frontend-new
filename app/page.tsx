import React from "react";
import HeroComponent from "./components/hero";
import CFBNewsSlider from "./components/cfbNews";
import NFLNewsSlider from "./components/nflNews";
import FeaturedStories from "./components/featuredStories";
import PrepNews from "./components/prepNews";
import HofStories from "./components/hofStories";
export default function page() {
  return (
    <div>
      <HeroComponent />
      <CFBNewsSlider />
      <NFLNewsSlider />
      <FeaturedStories />
      <PrepNews />
      <HofStories />
    </div>
  );
}
