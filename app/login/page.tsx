"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/app/assets/logo.png";
import nfl from "@/app/assets/nfl.jpg";
import Image from "next/image";

interface AnimatedInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}) => {
  return (
    <div className="relative mt-1 group">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full p-4 text-white bg-white/20 rounded-md border border-white/30 focus:outline-none focus:border-blue-500 peer placeholder-transparent"
      />
      <label
        htmlFor={id}
        className="absolute left-2 text-gray-300 pointer-events-none transform transition-all duration-300 
                   peer-focus:-translate-y-6 peer-focus:scale-95 peer-focus:text-blue-400 
                   peer-[&:not(:placeholder-shown)]:-translate-y-6 
                   peer-[&:not(:placeholder-shown)]:scale-75 
                   peer-[&:not(:placeholder-shown)]:text-blue-400
                   top-4 peer-focus:top-1 peer-[&:not(:placeholder-shown)]:top-1"
      >
        {label}
      </label>
    </div>
  );
};

const Login: React.FC = () => {
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
      className="bg-gray-900 bg-cover bg-center bg-no-repeat relative p-4 sm:p-6 md:p-10 flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${nfl.src})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div className="relative z-10 flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex backdrop-blur-xl bg-white/10 text-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full border border-white/20"
        >
          {/* Left - Branding */}
          <div className="hidden md:flex flex-col items-center justify-center border-r border-white/20 w-1/2 p-6 lg:p-10">
            <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                className="w-full h-full mb-3 lg:mb-4"
              />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white cursor-default">
              Welcome Back!
            </h2>
            <p className="text-xs lg:text-sm mt-1 lg:mt-2 text-center text-gray-200 cursor-default">
              Login to access the dashboard
            </p>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 cursor-default">
              Sign in
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <AnimatedInput
                id="email"
                label="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin"
              />

              <AnimatedInput
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer font-medium"
              >
                Sign In
              </button>
            </form>

            <p className="text-xs sm:text-sm mt-4 sm:mt-6 text-gray-300 text-center">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-blue-300 hover:text-blue-400 hover:underline cursor-pointer transition-colors duration-200"
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

            {/* Modal Window  */}
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
                <h1 className="text-white font-medium text-lg sm:text-xl text-center flex-1">
                  Forgot Your Password?
                </h1>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <p className="text-xs sm:text-sm text-gray-200 mb-4 sm:mb-6 text-center leading-relaxed">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </p>

                <div className="space-y-4">
                  <AnimatedInput
                    id="resetEmail"
                    label="Email Address"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 sm:px-8 py-4 sm:py-6 bg-white/5 backdrop-blur-sm border-t border-white/10 flex justify-end space-x-3">
                <button
                  onClick={toggleModal}
                  className="px-4 sm:px-6 py-2 text-white/70 hover:text-red-700 transition-colors duration-200 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  disabled={!resetEmail}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl cursor-pointer"
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
};

export default Login;
