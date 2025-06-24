"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
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

  return (
    <nav className="bg-[#272526] text-white">
      <div className="mx-auto sm:px-10 py-2 flex justify-between items-center">
        {/* Desktop View */}
        <div className="hidden lg:flex items-center space-x-6">
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

        {/* Mobile View */}
        <div className="lg:hidden flex items-center w-full">
          <div className="flex-1 overflow-x-auto scrollbar-hide" ref={navRef}>
            <div className="flex space-x-6 sm:py-2 min-w-max" ref={dropdownRef}>
              <NavItem href="/" active={pathname === "/"}>
                Home
              </NavItem>

              {/* Mobile Preps Dropdown */}
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
                  <div className="absolute left-full top-0 flex space-x-2 bg-[#272526] rounded shadow px-2 py-1 z-50">
                    <Link
                      href="/preps"
                      className={`italic text-white px-3 py-2 text-sm rounded hover:bg-gray-700 ${
                        pathname === "/preps" ? "bg-gray-600" : ""
                      }`}
                    >
                      Notes
                    </Link>
                    <Link
                      href="/prep/ratings"
                      className={`italic text-white px-3 py-2 text-sm rounded hover:bg-gray-700 ${
                        pathname === "/prep/ratings" ? "bg-gray-600" : ""
                      }`}
                    >
                      Ratings
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile College Dropdown */}
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
                  <div className="absolute left-full top-0 flex space-x-2 bg-[#272526] rounded shadow px-2 py-1 z-50">
                    <Link
                      href="/features"
                      className={`italic text-white px-3 py-2 text-sm rounded hover:bg-gray-700 ${
                        pathname === "/features" ? "bg-gray-600" : ""
                      }`}
                    >
                      Notes
                    </Link>
                    <Link
                      href="/cfb/teams"
                      className={`italic text-white px-3 py-2 text-sm rounded hover:bg-gray-700 ${
                        pathname === "/cfb/teams" ? "bg-gray-600" : ""
                      }`}
                    >
                      Teams
                    </Link>
                    <Link
                      href="/nfl-draft/ratings"
                      className={`italic text-white px-3 py-2 text-sm rounded hover:bg-gray-700 ${
                        pathname === "/nfl-draft/ratings" ? "bg-gray-600" : ""
                      }`}
                    >
                      Ratings
                    </Link>
                  </div>
                )}
              </div>

              <NavItem href="/nfl-draft" active={pathname === "/nfl-draft"}>
                NFL Draft
              </NavItem>
              <NavItem href="/nfl" active={pathname === "/nfl"}>
                NFL
              </NavItem>
              <NavItem
                href="/hall-of-fame"
                active={pathname === "/hall-of-fame"}
              >
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
