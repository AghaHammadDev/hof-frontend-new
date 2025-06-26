// app/login/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import logo from "@/app/assets/logo.png";
import Image from "next/image";
import Nfl from "@/app/assets/nfl.jpg";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user") === "admin") {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin" && password === "admin") {
      localStorage.setItem("user", "admin");
      setTimeout(() => {
        router.push("/");
      }, 500);
      // redirect immediately
    } else {
      setError("Invalid credentials. Try 'admin' / 'admin'");
    }
  };

  return (
    <section
      className="bg-gray-200 text-black bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${Nfl.src})` }}
    >
      <div className="backdrop-blur-md flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="flex justify-center mb-6">
            <Image className="w-20 h-20" src={logo} alt="logo" />
          </h1>
          <div className="w-full bg-white rounded-lg shadow sm:max-w-md">
            <div className="p-6 space-y-4">
              <h1 className="text-xl font-bold text-gray-900">
                Sign in to your account
              </h1>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
