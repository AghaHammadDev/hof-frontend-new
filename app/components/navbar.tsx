"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiPlus, FiMinus } from "react-icons/fi";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
};

const NavItem = ({ href, children, active = false }: NavItemProps) => (
  <Link
    href={href}
    className={`px-4 sm:py-2 text-white hover:bg-black ${
      active ? "bg-[#000000]" : ""
    }`}
  >
    {children}
  </Link>
);

const Navbar = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    setOpenDropdown(null); // Close dropdowns when toggling sidebar
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("loginChange"));
    window.location.href = "/";
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
          <span
            className={`bg-white h-0.5 w-full transform transition duration-300 ease-in-out ${
              isSidebarOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`bg-white h-0.5 w-full transition duration-300 ease-in-out ${
              isSidebarOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`bg-white h-0.5 w-full transform transition duration-300 ease-in-out ${
              isSidebarOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>
      </button>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#272526] text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
        ref={dropdownRef}
      >
        <div className="flex flex-col h-full p-4 mt-16">
          <div className="flex-1 flex flex-col">
            <NavItem href="/" active={pathname === "/"}>
              Home
            </NavItem>

            {/* Preps Subnav */}
            <div className="mt-2">
              <button
                onClick={() => toggleDropdown("preps")}
                className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-gray-700"
              >
                Preps
                {openDropdown === "preps" ? (
                  <FiMinus className="text-white" />
                ) : (
                  <FiPlus className="text-white" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openDropdown === "preps" ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="ml-4 flex flex-col">
                  <Link
                    href="/preps"
                    className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 ${
                      pathname === "/preps" ? "bg-gray-600" : ""
                    }`}
                  >
                    Latest News & Notes
                  </Link>
                  <Link
                    href="/prep/ratings"
                    className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 ${
                      pathname === "/prep/ratings" ? "bg-gray-600" : ""
                    }`}
                  >
                    Ratings
                  </Link>
                </div>
              </div>
            </div>

            {/* College Subnav */}
            <div className="mt-2">
              <button
                onClick={() => toggleDropdown("college")}
                className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-gray-700"
              >
                College
                {openDropdown === "college" ? (
                  <FiMinus className="text-white" />
                ) : (
                  <FiPlus className="text-white" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openDropdown === "college" ? "max-h-48" : "max-h-0"
                }`}
              >
                <div className="ml-4 flex flex-col">
                  <Link
                    href="/features"
                    className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 ${
                      pathname === "/features" ? "bg-gray-600" : ""
                    }`}
                  >
                    Latest News & Notes
                  </Link>
                  <Link
                    href="/cfb/teams"
                    className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 ${
                      pathname === "/cfb/teams" ? "bg-gray-600" : ""
                    }`}
                  >
                    Teams
                  </Link>
                  <Link
                    href="/nfl-draft/ratings"
                    className={`block px-4 py-2 text-sm text-white hover:bg-gray-700 ${
                      pathname === "/nfl-draft/ratings" ? "bg-gray-600" : ""
                    }`}
                  >
                    Ratings
                  </Link>
                </div>
              </div>
            </div>

            {/* Increased spacing after College */}
            <div className="mt-4">
              <NavItem href="/nfl-draft" active={pathname === "/nfl-draft"}>
                NFL Draft
              </NavItem>
            </div>
            <div className="mt-4">
              <NavItem href="/nfl" active={pathname === "/nfl"}>
                NFL
              </NavItem>
            </div>
            <div className="mt-4">
              <NavItem
                href="/hall-of-fame"
                active={pathname === "/hall-of-fame"}
              >
                Hall of Fame
              </NavItem>
            </div>
            <div className="mt-4">
              <NavItem href="/ratings" active={pathname === "/ratings"}>
                Ratings
              </NavItem>
            </div>
            <div className="mt-4">
              <NavItem href="/about" active={pathname === "/about"}>
                About
              </NavItem>
            </div>
            <div className="mt-4">
              <NavItem href="/contact" active={pathname === "/contact"}>
                Contact
              </NavItem>
            </div>
          </div>

          {/* Settings, Profile, Logout for Logged-in Users */}
          {isLoggedIn && (
            <div className="mt-4 border-t border-gray-700 pt-4 flex flex-col">
              <Link
                href="/settings"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Settings
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navbar */}
      <nav className="bg-[#272526] text-white hidden lg:flex">
        <div className="sm:px-10 py-2 flex items-center">
          <div className="flex items-center space-x-6">
            <NavItem href="/" active={pathname === "/"}>
              Home
            </NavItem>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("preps")}
                className={`px-4 py-2 text-white hover:bg-black ${
                  openDropdown === "preps" ? "bg-black" : ""
                }`}
              >
                Preps
              </button>
              {openDropdown === "preps" && (
                <div className="absolute z-40 w-48 bg-[#272526] rounded shadow">
                  <ul className="py-1 text-sm">
                    <li>
                      <Link
                        href="/preps"
                        className={`block px-4 py-2 text-white hover:bg-gray-700 ${
                          pathname === "/preps" ? "bg-gray-600" : ""
                        }`}
                      >
                        Latest News & Notes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/prep/ratings"
                        className={`block px-4 py-2 text-white hover:bg-gray-700 ${
                          pathname === "/prep/ratings" ? "bg-gray-600" : ""
                        }`}
                      >
                        Ratings
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => toggleDropdown("college")}
                className={`px-4 py-2 text-white hover:bg-black ${
                  openDropdown === "college" ? "bg-black" : ""
                }`}
              >
                College
              </button>
              {openDropdown === "college" && (
                <div className="absolute z-40 w-48 bg-[#272526] rounded shadow">
                  <ul className="py-1 text-sm">
                    <li>
                      <Link
                        href="/features"
                        className={`block px-4 py-2 text-white hover:bg-gray-700 ${
                          pathname === "/features" ? "bg-gray-600" : ""
                        }`}
                      >
                        Latest News & Notes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/cfb/teams"
                        className={`block px-4 py-2 text-white hover:bg-gray-700 ${
                          pathname === "/cfb/teams" ? "bg-gray-600" : ""
                        }`}
                      >
                        Teams
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/nfl-draft/ratings"
                        className={`block px-4 py-2 text-white hover:bg-gray-700 ${
                          pathname === "/nfl-draft/ratings" ? "bg-gray-600" : ""
                        }`}
                      >
                        Ratings
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <NavItem href="/nfl-draft" active={pathname === "/nfl-draft"}>
              NFL Draft
            </NavItem>
            <NavItem href="/nfl" active={pathname === "/nfl"}>
              NFL
            </NavItem>
            <NavItem href="/hall-of-fame" active={pathname === "/hall-of-fame"}>
              Hall of Fame
            </NavItem>
            <NavItem href="/ratings" active={pathname === "/ratings"}>
              Ratings
            </NavItem>
            <NavItem href="/about" active={pathname === "/about"}>
              About
            </NavItem>
            <NavItem href="/contact" active={pathname === "/contact"}>
              Contact
            </NavItem>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
