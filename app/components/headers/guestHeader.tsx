"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/logo.png";
import TsxLogo from "@/app/assets/tsx_logo.png";
import HallLogo from "@/app/assets/hall-logo.svg";
import Navbar from "@/app/components/navbar";
import { FiSearch } from "react-icons/fi";

export default function GuestHeader() {
  return (
    <header className=" text-white">
      <div className="px-4 sm:px-10 py-4 sm:py-6">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center">
          <div className="flex justify-between items-center w-full">
            {/* Hamburger Icon Placeholder (Handled in Navbar) */}
            <div className="w-6 h-6"></div>
            {/* Sign Up / Sign In */}
            <div className="flex gap-2 flex-col md:flex-row items-center">
              <Link
                href="/signup"
                className="bg-gray-800 px-3 py-1 text-white rounded-md text-sm hover:bg-gray-700"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="bg-blue-700 px-3 py-1 text-white rounded-md text-sm hover:bg-blue-600"
              >
                Sign In
              </Link>
            </div>
          </div>
          {/* Logos */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <Link href="/">
              <Image src={Logo} alt="Logo" width={60} height={50} />
            </Link>
            <Link href="/">
              <Image src={HallLogo} alt="Hall Logo" width={200} height={50} />
            </Link>
            <Link href="/">
              <Image src={TsxLogo} alt="TSX Logo" width={80} height={30} />
            </Link>
            <div className="flex flex-col text-gray-400 font-normal leading-tight text-center">
              <p>Best of the Best</p>
              <p>From Cradle to Canton</p>
            </div>
          </div>
          {/* Search Bar */}
          <div className="relative w-full mt-4">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-10 py-2 bg-[#31282A] text-sm focus:outline-none w-full"
            />
            <FiSearch className="absolute right-3 top-2.5 text-white" />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image src={Logo} alt="Logo" width={60} height={50} />
              </Link>
              <Link href="/">
                <Image src={HallLogo} alt="Hall Logo" width={300} height={50} />
              </Link>
              <Link href="/">
                <Image src={TsxLogo} alt="TSX Logo" width={80} height={30} />
              </Link>
              <div className="flex flex-col text-gray-400 font-normal leading-tight ml-2">
                <p>Best of the Best</p>
                <p>From Cradle to Canton</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Link
                href="/signup"
                className="bg-gray-800 px-4 py-2 text-white rounded-md text-sm hover:bg-gray-700"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="bg-blue-700 px-4 py-2 text-white rounded-md text-sm hover:bg-blue-600"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
