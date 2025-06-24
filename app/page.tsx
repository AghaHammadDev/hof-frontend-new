import React from "react";
import Navbar from "./components/navbar";
import HeroComponent from "./components/hero";
import CFBNewsSlider from "./components/cfbNews";
export default function page() {
  return (
    <div>
      <Navbar />
      <HeroComponent />
      <CFBNewsSlider />
    </div>
  );
}
