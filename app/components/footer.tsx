"use client";

import Image from "next/image";
import Link from "next/link";
import HallLogo from "@/app/assets/hall-logo.svg";
import TsxLogo from "@/app/assets/tsx_logo.png";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0F121C] text-gray-400 text-sm">
      {/* Main Content */}
      <div className="mx-auto px-10 py-8 sm:py-12 flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8 lg:space-y-0">
        {/* Left Side: Logo, Tagline, Social Icons */}
        <div className="flex flex-col items-center lg:items-start space-y-6">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4">
            <Image
              src={HallLogo}
              alt="Hall of Football"
              className="h-6 sm:h-8 w-auto"
            />
            <Image src={TsxLogo} alt="TSX" className="h-8 sm:h-10 w-auto" />
          </div>
          <p className="text-xs sm:text-sm text-gray-400 text-center lg:text-left max-w-xs">
            Tracking the future of football—one player at a time
          </p>
          <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl text-gray-400">
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-white transition-all ease-in-out duration-300"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-white transition-all ease-in-out duration-300"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              aria-label="X / Twitter"
              className="hover:text-white transition-all ease-in-out duration-300"
            >
              <FaXTwitter />
            </Link>
            <Link
              href="https://www.linkedin.com/company/sports-xchange/"
              target="_blank"
              aria-label="LinkedIn"
              className="hover:text-white transition-all ease-in-out duration-300"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href="#"
              aria-label="YouTube"
              className="hover:text-white transition-all ease-in-out duration-300"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>

        {/* Center Nav */}
        <div className="flex flex-wrap justify-center mt-[50px] gap-3 sm:gap-4 text-xs sm:text-sm uppercase text-gray-500 font-normal">
          <Link
            href="/preps"
            className="hover:text-white transition-all ease-in-out duration-300"
          >
            Preps
          </Link>
          <Link
            href="/college"
            className="hover:text-white transition-all ease-in-out duration-300"
          >
            College
          </Link>
          <Link
            href="/nfl-draft"
            className="hover:text-white transition-all ease-in-out duration-300"
          >
            NFL Draft
          </Link>
          <Link
            href="/nfl"
            className="hover:text-white transition-all ease-in-out duration-300"
          >
            NFL
          </Link>
          <Link
            href="/hofs"
            className="hover:text-white transition-all ease-in-out duration-300"
          >
            Hall of Fame
          </Link>
          <Link
            href="/ratings"
            className="hover:text-white transition-all ease-in-out duration-300"
          >
            Ratings
          </Link>
          <Link
            href="/about"
            className="hover:text-white transition-all ease-in-out duration-300"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-white transition-all ease-in-out duration-300"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="mx-auto px-10 py-6 sm:py-8 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
        <p className="text-xs text-gray-400">
          ©2025 The Sports Xchange. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs text-gray-300">
          <Link
            href="/privacy-policy"
            className="hover:underline transition-all ease-in-out duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:underline transition-all ease-in-out duration-300"
          >
            Terms of Service
          </Link>
          <Link
            href="/cookie-settings"
            className="hover:underline transition-all ease-in-out duration-300"
          >
            Cookie Settings
          </Link>
        </div>
      </div>
    </footer>
  );
}
