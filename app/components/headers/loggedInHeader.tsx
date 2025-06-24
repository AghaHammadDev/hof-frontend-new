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
    <header className="bg-cover bg-center text-white">
      <div className="px-4 sm:px-10 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-4 sm:mb-0">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={60} height={50} />
          </Link>
          <Link href="/">
            <Image
              src={HallLogo}
              alt="Hall Logo"
              width={200}
              className="sm:w-[300]"
              height={50}
            />
          </Link>
          <Link href="/">
            <Image src={TsxLogo} alt="TSX Logo" width={80} height={30} />
          </Link>
          <div className="hidden sm:flex flex-col text-gray-400 font-normal leading-tight ml-2">
            <p>Best of the Best</p>
            <p>From Cradle to Canton</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-10 py-2 bg-[#31282A] text-sm focus:outline-none w-full sm:w-64"
            />
            <FiSearch className="absolute right-3 top-2.5 text-white" />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button onClick={() => toggleDropdown("notif")}>
                <IoIosNotifications
                  size={20}
                  className="text-gray-500 cursor-pointer"
                />
              </button>
              {openDropdown === "notif" && (
                <div className="absolute right-0 top-8 sm:top-10 bg-white text-black p-2 rounded shadow-md w-48 z-10">
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
                <div className="absolute right-0 top-8 sm:top-10 bg-white text-black p-2 rounded shadow-md w-48 z-10">
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
              className="text-sm cursor-pointer hover:underline rounded-md px-2 sm:px-0"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
