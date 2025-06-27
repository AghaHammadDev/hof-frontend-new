"use client";

import Image from "next/image";
import { useState } from "react";
import Logo from "@/app/assets/logo.png";
import TsxLogo from "@/app/assets/tsx_logo.png";
import HallLogo from "@/app/assets/hall-logo.svg";
import UserPic from "@/app/assets/usericon.jpg";
import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

export default function LoggedInHeader() {
  const [openDropdown, setOpenDropdown] = useState<
    "none" | "notif" | "profile"
  >("none");

  const toggleDropdown = (type: "notif" | "profile") => {
    setOpenDropdown((prev) => (prev === type ? "none" : type));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="bg-black text-white">
      <div className="px-4 sm:px-10 py-4 sm:py-6">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center">
          <div className="flex justify-between items-center w-full">
            {/* Hamburger Icon Placeholder (Handled in Navbar) */}
            <div className="w-6 h-6"></div>
            {/* Notifications and Profile */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => toggleDropdown("notif")}>
                  <IoIosNotifications
                    size={20}
                    className="text-gray-500 cursor-pointer"
                  />
                </button>
                {openDropdown === "notif" && (
                  <div className="absolute right-0 top-8 bg-white text-black p-2 rounded shadow-md w-48 z-10">
                    <p>No new notifications</p>
                  </div>
                )}
              </div>
              <div className="relative">
                <button onClick={() => toggleDropdown("profile")}>
                  <Image
                    src={UserPic}
                    alt="Profile"
                    className="rounded-full border cursor-pointer"
                    width={35}
                    height={35}
                  />
                </button>
                {openDropdown === "profile" && (
                  <div className="absolute right-0 top-8 bg-white text-black p-2 rounded shadow-md w-48 z-10">
                    <ul className="space-y-2">
                      <li>
                        <a href="/settings" className="hover:underline">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="/profile" className="hover:underline">
                          Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-white hover:underline cursor-pointer"
              >
                Logout
              </button>
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
            <div className="flex items-center gap-4">
              <div className="relative w-100">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-8 pr-10 py-2 bg-[#31282A] text-sm focus:outline-none w-full"
                />
                <FiSearch className="absolute right-3 top-2.5 text-white cursor-pointer" />
              </div>
              <div className="relative">
                <button onClick={() => toggleDropdown("notif")}>
                  <IoIosNotifications
                    size={20}
                    className="text-gray-500 cursor-pointer"
                  />
                </button>
                {openDropdown === "notif" && (
                  <div className="absolute right-0 top-10 bg-white text-black p-2 rounded shadow-md w-48 z-10">
                    <p>No new notifications</p>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-2">
                <button onClick={() => toggleDropdown("profile")}>
                  <Image
                    src={UserPic}
                    alt="Profile"
                    className="rounded-full border cursor-pointer"
                    width={35}
                    height={35}
                  />
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm text-white hover:underline cursor-pointer"
                >
                  Logout
                </button>
                {openDropdown === "profile" && (
                  <div className="absolute right-0 top-10 bg-white text-black p-2 rounded shadow-md w-48 z-10">
                    <ul className="space-y-2">
                      <li>
                        <a href="/settings" className="hover:underline">
                          Settings
                        </a>
                      </li>
                      <li>
                        <a href="/profile" className="hover:underline">
                          Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
