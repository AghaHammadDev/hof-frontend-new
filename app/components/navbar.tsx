"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

type MobileNavItemProps = NavItemProps & {
  isDropdown?: boolean;
};

type DropdownItem = {
  href: string;
  title: string;
};

const NavItem = ({ href, children, active = false, onClick }: NavItemProps) => (
  <Link
    href={href}
    className={`px-4 sm:py-2 text-white hover:bg-black ${
      active ? "bg-[#000000]" : ""
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const MobileNavItem = ({
  href,
  children,
  active = false,
  onClick,
  isDropdown = false,
}: MobileNavItemProps) => (
  <Link
    href={href}
    className={`block px-4 py-2 text-white hover:bg-[#000000] w-full ${
      active ? "bg-[#000000]" : ""
    } ${isDropdown ? "pl-8" : ""}`}
    onClick={onClick}
  >
    {children}
  </Link>
);

const Navbar = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(
    null
  );
  const pathname = usePathname();

  const desktopNavRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Close all dropdowns when pathname changes (page navigation)
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    // Close all dropdowns on initial load
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setMobileOpenDropdown(null);
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileDropdown = (menu: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("loginChange"));
    window.location.href = "/";
    closeSidebar();
  };

  const dropdownMenus: Record<string, DropdownItem[]> = {
    preps: [
      { href: "/preps", title: "Latest News & Notes" },
      { href: "/preps/teams", title: "Teams" },
      { href: "/preps/ratings", title: "Ratings" },
    ],
    college: [
      { href: "/college", title: "Latest News & Notes" },
      { href: "/college/teams", title: "Teams" },
      { href: "/college/ratings", title: "Ratings" },
    ],
    "NFL Draft": [
      { href: "/nfl-draft", title: "Latest News & Notes" },
      { href: "/nfl-draft/teams", title: "Teams" },
      { href: "/nfl-draft/ratings", title: "Ratings" },
    ],
    "Hall Of Fame": [
      { href: "/hof", title: "Latest News & Notes" },
      { href: "/hof/teams", title: "Teams" },
      { href: "/hof/ratings", title: "Ratings" },
    ],
  };

  const isActiveDropdown = (menu: string) =>
    dropdownMenus[menu].some((item) => pathname === item.href);

  return (
    <>
      {/* Hamburger Button */}
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
          />
          <div
            className={`rounded-2xl h-[3px] w-full duration-500 peer-checked:-rotate-45 ${
              scrolled ? "bg-gray-600" : "bg-white"
            }`}
          />
          <div
            className={`rounded-2xl h-[3px] w-1/2 duration-500 place-self-end peer-checked:rotate-[225deg] peer-checked:origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px] ${
              scrolled ? "bg-gray-600" : "bg-white"
            }`}
          />
        </label>
      </button>

      {/* Mobile Sidebar */}
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

            {/* Mobile Dropdowns */}
            {Object.keys(dropdownMenus).map((menu) => (
              <div className="mt-4" key={menu}>
                <button
                  className={`flex items-center justify-between w-full px-4 py-2 text-white hover:bg-[#000000] text-left ${
                    isActiveDropdown(menu) ? "bg-[#000000]" : ""
                  }`}
                  onClick={() => toggleMobileDropdown(menu)}
                >
                  <span>
                    {menu === "hallOfFame"
                      ? "Hall of Fame"
                      : menu.charAt(0).toUpperCase() + menu.slice(1)}
                  </span>
                  <span>{mobileOpenDropdown === menu ? "-" : "+"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileOpenDropdown === menu ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {dropdownMenus[menu].map((item) => (
                    <MobileNavItem
                      key={item.href}
                      href={item.href}
                      active={pathname === item.href}
                      onClick={closeSidebar}
                      isDropdown
                    >
                      {item.title}
                    </MobileNavItem>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-4">
              <NavItem href="/nfl" active={pathname === "/nfl"}>
                NFL
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

          {isLoggedIn && (
            <div className="mt-4 border-t border-gray-700 pt-4 flex flex-col">
              <Link
                href="/settings"
                className="block px-4 py-2 text-white hover:bg-[#000000]"
                onClick={closeSidebar}
              >
                Settings
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-2 text-white hover:bg-[#000000]"
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
      <nav
        className="bg-[#272526] text-white hidden lg:flex relative z-50"
        ref={desktopNavRef}
      >
        <div className="sm:px-10 py-2 flex items-center">
          <div className="flex items-center space-x-6">
            <NavItem href="/" active={pathname === "/"}>
              Home
            </NavItem>

            {/* Desktop Dropdowns */}
            {Object.entries(dropdownMenus).map(([menu, items]) => (
              <div className="relative group" key={menu}>
                <button
                  className={`px-4 sm:py-2 text-white hover:bg-black ${
                    isActiveDropdown(menu) ? "bg-[#000000]" : ""
                  }`}
                  onClick={() => toggleDropdown(menu)}
                >
                  {menu === "hallOfFame"
                    ? "Hall of Fame"
                    : menu.charAt(0).toUpperCase() + menu.slice(1)}
                </button>
                <div
                  className={`absolute left-0 mt-0 w-48 bg-[#272526] shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-50 ${
                    openDropdown === menu ? "max-h-40" : "max-h-0"
                  }`}
                >
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-2 py-2 text-white hover:bg-[#000000] ${
                        pathname === item.href ? "bg-[#000000]" : ""
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <NavItem href="/nfl" active={pathname === "/nfl"}>
              NFL
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
