"use client";
import GuestHeader from "./headers/guestHeader";
import LoggedInHeader from "./headers/loggedInHeader";

export default function Header() {
  // Simulate login state; replace with actual auth logic or context
  const isLoggedIn =
    typeof window !== "undefined" && localStorage.getItem("user") === "admin";
  return isLoggedIn ? <LoggedInHeader /> : <GuestHeader />;
}
