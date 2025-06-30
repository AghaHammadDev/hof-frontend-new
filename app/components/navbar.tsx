"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
};

type MobileNavItemProps = NavItemProps & {
  onClick?: () => void;
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

const MobileNavItem = ({
  href,
  children,
  active = false,
  onClick,
}: MobileNavItemProps) => (
  <Link
    href={href}
    className={`block px-4 py-2 text-white hover:bg-[#000000] w-full ${
      active ? "bg-[#000000]" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Navbar = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("loginChange"));
    window.location.href = "/";
    closeSidebar();
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <button
        className={`lg:hidden fixed top-4 left-4 z-50 ${
          scrolled ? "text-black" : "text-white"
        }`}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <label className="flex flex-col gap-1.5 w-8 cursor-pointer">
          <input
            type="checkbox"
            className="peer hidden"
            checked={isSidebarOpen}
            onChange={toggleSidebar}
          />
          <div
            className={`rounded-2xl h-[3px] w-1/2 duration-500 peer-checked:rotate-[225deg] peer-checked:origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px] ${
              scrolled ? "bg-gray-600" : "bg-white"
            }`}
          ></div>
          <div
            className={`rounded-2xl h-[3px] w-full duration-500 peer-checked:-rotate-45 ${
              scrolled ? "bg-gray-600" : "bg-white"
            }`}
          ></div>
          <div
            className={`rounded-2xl h-[3px] w-1/2 duration-500 place-self-end peer-checked:rotate-[225deg] peer-checked:origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px] ${
              scrolled ? "bg-gray-600" : "bg-white"
            }`}
          ></div>
        </label>
      </button>
      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#272526] text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col h-full p-4 mt-16">
          <div className="flex-1 flex flex-col">
            <MobileNavItem
              href="/"
              active={pathname === "/"}
              onClick={closeSidebar}
            >
              Home
            </MobileNavItem>
            <div className="mt-4">
              <MobileNavItem
                href="/preps"
                active={pathname === "/preps"}
                onClick={closeSidebar}
              >
                Preps
              </MobileNavItem>
            </div>
            <div className="mt-4">
              <MobileNavItem
                href="/features"
                active={pathname === "/features"}
                onClick={closeSidebar}
              >
                College
              </MobileNavItem>
            </div>
            <div className="mt-4">
              <MobileNavItem
                href="/nfl-draft"
                active={pathname === "/nfl-draft"}
                onClick={closeSidebar}
              >
                NFL Draft
              </MobileNavItem>
            </div>
            <div className="mt-4">
              <MobileNavItem
                href="/nfl"
                active={pathname === "/nfl"}
                onClick={closeSidebar}
              >
                NFL
              </MobileNavItem>
            </div>
            <div className="mt-4">
              <MobileNavItem
                href="/hall-of-fame"
                active={pathname === "/hall-of-fame"}
                onClick={closeSidebar}
              >
                Hall of Fame
              </MobileNavItem>
            </div>
            <div className="mt-4">
              <MobileNavItem
                href="/ratings"
                active={pathname === "/ratings"}
                onClick={closeSidebar}
              >
                Ratings
              </MobileNavItem>
            </div>
            <div className="mt-4">
              <MobileNavItem
                href="/about"
                active={pathname === "/about"}
                onClick={closeSidebar}
              >
                About
              </MobileNavItem>
            </div>
            <div className="mt-4">
              <MobileNavItem
                href="/contact"
                active={pathname === "/contact"}
                onClick={closeSidebar}
              >
                Contact
              </MobileNavItem>
            </div>
          </div>

          {/* Settings, Profile, Logout for Logged-in Users */}
          {isLoggedIn && (
            <div className="mt-4 border-t border-gray-700 pt-4 flex flex-col">
              <Link
                href="/settings"
                className="block px-4 py-2 text-white hover:bg-[#000000] w-full"
                onClick={closeSidebar}
              >
                Settings
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-white hover:bg-[#000000] w-full"
                onClick={closeSidebar}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-white hover:bg-[#000000]"
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
            <NavItem href="/preps" active={pathname === "/preps"}>
              Preps
            </NavItem>
            <NavItem href="/features" active={pathname === "/features"}>
              College
            </NavItem>
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
