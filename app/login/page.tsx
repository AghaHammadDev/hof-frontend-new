"use client";

import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import Nfl from "@/app/assets/nfl.jpg";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

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
    alert(`Password reset link sent to: ${resetEmail}`);
    setModalOpen(false);
    setResetEmail("");
  };

  return (
    <section
      className="bg-gray-900 bg-cover bg-center bg-no-repeat relative p-10 flex items-center justify-center"
      style={{ backgroundImage: `url(${Nfl.src})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div className="relative z-10 flex items-center justify-center ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex backdrop-blur-xl bg-white/10 dark:bg-white/10 text-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full border border-white/20"
        >
          {/* Left - Branding */}
          <div className="hidden md:flex flex-col items-center justify-center border-r border-white/20 w-1/2 p-10">
            <Image src={logo} alt="Logo" className="w-20 h-20 mb-4" />
            <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
            <p className="text-sm mt-2 text-center text-gray-200">
              Login to access the dashboard
            </p>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Sign in</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex items-center justify-between text-sm">
                <span />
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="text-blue-300 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm mt-4 text-gray-300 text-center">
              Don&apos;t have an account?
              <a
                href="/signup"
                className="ml-2 text-blue-300 hover:underline cursor-pointer"
              >
                Create one
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Password Reset Modal with smooth transition */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-bold text-gray-800">
                    Reset Password
                  </Dialog.Title>
                  <p className="text-sm text-gray-600 mt-1">
                    Enter your email to receive a reset link.
                  </p>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                    >
                      Send Link
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </section>
  );
}
