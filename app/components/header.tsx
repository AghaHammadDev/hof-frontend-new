"use client";

import { useState, useEffect } from "react";
import GuestHeader from "@/app/components/headers/guestHeader";
import LoggedInHeader from "@/app/components/headers/loggedInHeader";

export default function Header() {
  // Initialize isLoggedIn based on localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" && localStorage.getItem("user") === "admin"
  );

  // Monitor localStorage changes
  useEffect(() => {
    // Update isLoggedIn when localStorage changes
    const updateLoginState = () => {
      setIsLoggedIn(localStorage.getItem("user") === "admin");
    };

    // Handle custom loginChange event (same-tab updates)
    const handleLoginChange = () => {
      updateLoginState();
    };

    // Handle storage event (cross-tab updates)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        updateLoginState();
      }
    };

    // Initial check
    updateLoginState();

    // Add event listeners
    window.addEventListener("loginChange", handleLoginChange);
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("loginChange", handleLoginChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return isLoggedIn ? <LoggedInHeader /> : <GuestHeader />;
}
