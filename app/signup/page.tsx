"use client";

import React from "react";
import Nfl from "@/app/assets/nfl.jpg";
import { motion } from "framer-motion";

export default function Signup() {
  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center flex items-center justify-center p-7"
      style={{ backgroundImage: `url(${Nfl.src})` }}
    >
      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/20 shadow-2xl p-8 md:p-12"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Create your account
        </h1>

        <form className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                className="w-full mt-1 p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                className="w-full mt-1 p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="johndoe"
                className="w-full mt-1 p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full mt-1 p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full mt-1 p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                className="w-full mt-1 p-3 rounded-md bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-white">
                I accept the{" "}
                <a
                  href="/tnc"
                  className="underline hover:text-blue-400 cursor-pointer"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold text-white transition duration-300 cursor-pointer"
            >
              Create Account
            </button>

            <p className="text-sm text-center text-gray-300">
              Already have an account?{" "}
              <a
                href="/login"
                className="underline text-blue-400 hover:text-blue-600 cursor-pointer"
              >
                Sign in
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
