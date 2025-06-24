"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/logo.png";
import TsxLogo from "@/app/assets/tsx_logo.png";
import HallLogo from "@/app/assets/hall-logo.svg";

export default function GuestHeader() {
  return (
    <header className="bg-cover bg-center">
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
              className="sm:w-[300px]"
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
        <div className="flex gap-4 sm:gap-2 items-center">
          <Link
            href="/signup"
            className="bg-gray-800 px-3 py-1 sm:px-4 sm:py-2 text-white rounded-md text-sm hover:bg-gray-700"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="bg-blue-700 px-3 py-1 sm:px-4 sm:py-2 text-white rounded-md text-sm hover:bg-blue-600"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
