"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/app/assets/logo.png";
import nfl from "@/app/assets/nfl.jpg";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (localStorage.getItem("user") === "admin") {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin" && password === "admin") {
      localStorage.setItem("user", "admin");
      window.dispatchEvent(new Event("loginChange"));
      router.push("/");
    } else {
      setError("Invalid credentials. Try 'admin' / 'admin'");
    }
  };

  const handleReset = () => {
    if (resetEmail) {
      alert(`Password reset link sent to: ${resetEmail}`);
      setModalOpen(false);
      setResetEmail("");
    }
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <section
      className="bg-gray-900 bg-cover bg-center bg-no-repeat relative p-10 flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${nfl.src})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex backdrop-blur-xl bg-white/10 text-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full border border-white/20"
        >
          {/* Left - Branding */}
          <div className="hidden md:flex flex-col items-center justify-center border-r border-white/20 w-1/2 p-10">
            <div className="w-20 h-20  flex items-center justify-center">
              <Image src={logo} alt="Logo" className="w-20 h-20 mb-4" />
            </div>
            <h2 className="text-3xl font-bold text-white cursor-default">
              Welcome Back!
            </h2>
            <p className="text-sm mt-2 text-center text-gray-200 cursor-default">
              Login to access the dashboard
            </p>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 cursor-default">
              Sign in
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex items-center justify-between text-sm">
                <span />
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-blue-300 hover:text-blue-400 hover:underline cursor-pointer transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer font-medium"
              >
                Sign In
              </button>
            </div>

            <p className="text-sm mt-6 text-gray-300 text-center">
              Don&apos;t have an account?
              <a
                href="/signup"
                className="ml-2 text-blue-300 hover:text-blue-400 hover:underline cursor-pointer transition-colors duration-200"
              >
                Create one
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Password Reset Modal - macOS Style */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={toggleModal}
            />

            {/* Modal Window - macOS style */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 50,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -30,
                filter: "blur(5px)",
              }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                },
              }}
              className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/20 shadow-2xl overflow-hidden"
            >
              {/* macOS-style title bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2"></div>
                </div>
                <h1 className="text-white font-medium text-xl text-center flex-1">
                  Forgot Your Password?
                </h1>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-sm text-gray-200 mb-6 text-center leading-relaxed">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="resetEmail"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="resetEmail"
                      placeholder="you@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 "
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-white/5 backdrop-blur-sm border-t border-white/10 flex justify-end space-x-3">
                <button
                  onClick={toggleModal}
                  className="px-6 py-2 text-white/70 hover:text-white transition-colors duration-200 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  disabled={!resetEmail}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-default transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform cursor-pointer"
                  style={{ transform: !resetEmail ? "none" : undefined }}
                >
                  Send Reset Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
