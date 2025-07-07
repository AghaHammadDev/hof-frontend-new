"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import Nfl from "@/app/assets/nfl.jpg";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface AnimatedInputProps {
  id: string;
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = true,
  textarea = false,
}) => {
  return (
    <div className="relative mt-1 group">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={4}
          className="w-full p-4 text-white bg-white/20 border border-white/30 rounded-md focus:outline-none focus:border-blue-500 peer placeholder-transparent resize-none"
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full p-4 text-white bg-white/20 border border-white/30 rounded-md focus:outline-none focus:border-blue-500 peer placeholder-transparent"
        />
      )}
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

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex backdrop-blur-xl bg-white/10 text-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full border border-white/20"
        >
          {/* Left - Logo & Text */}
          <div className="hidden md:flex flex-col items-center justify-center border-r border-white/20 w-1/2 p-6 lg:p-10 cursor-default">
            <Image
              src={logo}
              alt="Logo"
              className="w-16 h-16 lg:w-20 lg:h-20 mb-3 lg:mb-4"
            />
            <h2 className="text-2xl lg:text-3xl font-bold text-white text-center">
              Let&apos;s Get in Touch
            </h2>
            <p className="text-xs lg:text-sm mt-1 lg:mt-2 text-center text-gray-200">
              Have questions, ideas, or just want to say hi?
              <br />
              Drop us a message!
            </p>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 cursor-default">
              Contact Us
            </h2>
            {submitted ? (
              <p className="text-green-400 text-sm mb-4">
                ✅ Message sent! We&apos;ll be in touch soon.
              </p>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <AnimatedInput
                id="name"
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
              />

              <AnimatedInput
                id="email"
                label="Your Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />

              <AnimatedInput
                id="message"
                label="Your Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                textarea
              />

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer font-medium"
              >
                Send Message
              </button>
            </form>

            {/* Email Info & Socials */}
            <div className="mt-6 text-center text-xs sm:text-sm text-gray-300">
              Or email us directly at{" "}
              <a
                href="mailto:info@HallofFootball.com"
                className="underline text-blue-300 hover:text-blue-500 transition-colors duration-300"
              >
                info@HallofFootball.com
              </a>
              <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 text-lg sm:text-xl">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors duration-300"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-500 transition-colors duration-300"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
