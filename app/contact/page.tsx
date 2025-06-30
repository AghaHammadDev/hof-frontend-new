"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import Nfl from "@/app/assets/nfl.jpg";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      className="min-h-screen bg-gray-900 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${Nfl.src})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex backdrop-blur-xl bg-white/10 text-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full border border-white/20"
        >
          {/* Left - Logo & Text */}
          <div className="hidden md:flex flex-col items-center justify-center border-r border-white/20 w-1/2 p-10 cursor-default">
            <Image src={logo} alt="Logo" className="w-20 h-20 mb-4" />
            <h2 className="text-3xl font-bold text-white text-center cursor-default">
              Let&apos;s Get in Touch
            </h2>
            <p className="text-sm mt-2 text-center text-gray-200">
              Have questions, ideas, or just want to say hi?
              <br />
              Drop us a message!
            </p>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 cursor-default">
              Contact Us
            </h2>
            {submitted ? (
              <p className="text-green-400 text-sm mb-4">
                ✅ Message sent! We&apos;ll be in touch soon.
              </p>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </form>

            {/* Email Info & Socials */}
            <div className="mt-6 text-center text-sm text-gray-300">
              Or email us directly at{" "}
              <a
                href="mailto:info@HallofFootball.com"
                className="underline text-blue-300 hover:text-blue-500 transition-colors duration-300"
              >
                info@HallofFootball.com
              </a>
              <div className="flex justify-center gap-4 mt-4 text-xl ">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  className="hover:text-gray-500 transition-colors duration-300"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
