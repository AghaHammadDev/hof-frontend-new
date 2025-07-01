"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero from "@/app/assets/nfl.jpg";

export default function Signup() {
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const handleTermsCheckbox = () => {
    setTermsAccepted(!termsAccepted);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showTerms) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showTerms]);

  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center flex items-center justify-center p-7 min-h-screen"
      style={{
        backgroundImage: `url(${hero.src})`,
      }}
    >
      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/20 shadow-2xl p-8 md:p-12"
      >
        <h1 className="text-3xl font-bold mb-8 text-center cursor-default">
          Create your account
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
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

            <div className="flex items-start space-x-3">
              <label className="cursor-pointer duration-300 relative overflow-hidden w-5 h-5 flex justify-center items-center border border-white/30 rounded-md bg-white/10 before:absolute before:w-8 before:h-8 before:content[''] before:right-0 before:rounded-full before:blur-sm after:absolute after:z-10 after:w-4 after:h-4 after:content[''] after:left-1 after:bottom-1 after:rounded-full after:blur-sm">
                <input
                  type="checkbox"
                  id="terms"
                  className="peer hidden"
                  checked={termsAccepted}
                  onChange={handleTermsCheckbox}
                  required
                />
                <div className="w-4 h-4 rounded-sm opacity-0 peer-checked:opacity-100 bg-gradient-to-tr bg-blue-500 scale-0 transition-all z-20 duration-300 peer-checked:transition-all peer-checked:scale-100 peer-checked:duration-300"></div>
              </label>
              <label htmlFor="terms" className="text-sm text-white flex-1">
                I accept the{" "}
                <button
                  type="button"
                  onClick={toggleTerms}
                  className="underline hover:text-blue-400 cursor-pointer transition-colors duration-200 "
                >
                  Terms and Conditions
                </button>
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
                className="underline text-blue-400 hover:text-blue-600 cursor-pointer transition-colors duration-200"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={toggleTerms}
            />

            {/* Popup Window - macOS style */}
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
                ease: [0.16, 1, 0.3, 1], // macOS easing curve
                scale: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                },
              }}
              className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/20 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center space-x-3"></div>
                <h1 className="text-white font-medium text-3xl text-center flex-1 cursor-default?">
                  Terms and Conditions
                </h1>
              </div>

              {/* Content with hidden scrollbar */}
              <div
                className="p-8 max-h-[70vh] overflow-y-auto text-white"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style jsx>{`
                  .content-scroll::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                <div className="space-y-6 text-sm leading-relaxed">
                  <p className="text-gray-200">
                    Welcome to our platform. By creating an account, you agree
                    to be bound by these Terms of Service.
                  </p>

                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-300">
                      1. User Responsibilities
                    </h4>
                    <p className="text-gray-200">
                      You are responsible for maintaining the confidentiality of
                      your account and password and for restricting access to
                      your computer or device.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-300">
                      2. Content
                    </h4>
                    <p className="text-gray-200">
                      You retain all rights to any content you submit, post or
                      display on or through the service. However, by submitting
                      content, you grant us a worldwide, non-exclusive,
                      royalty-free license to use, reproduce, modify, adapt,
                      publish, translate, distribute, and display such content.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-300">
                      3. Privacy
                    </h4>
                    <p className="text-gray-200">
                      Your privacy is important to us. Please review our Privacy
                      Policy, which explains how we collect, use and disclose
                      information. We may collect personal information such as
                      your name, email address, and usage data to provide and
                      improve our service.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-300">
                      4. Modifications
                    </h4>
                    <p className="text-gray-200">
                      We reserve the right to modify these terms at any time.
                      We&apos;ll notify you of any changes by posting the new
                      Terms on this page. Your continued use of the service
                      after any modifications constitutes your acceptance of the
                      new Terms.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-300">
                      5. Termination
                    </h4>
                    <p className="text-gray-200">
                      We may terminate or suspend your account immediately,
                      without prior notice or liability, for any reason
                      whatsoever, including without limitation if you breach
                      these Terms. Upon termination, your right to use the
                      service will immediately cease.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-300">
                      6. Limitation of Liability
                    </h4>
                    <p className="text-gray-200">
                      In no event shall we be liable for any indirect,
                      incidental, special, consequential or punitive damages,
                      including without limitation, loss of profits, data, use,
                      goodwill, or other intangible losses, resulting from your
                      access to or use of or inability to access or use the
                      service.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-300">
                      7. Governing Law
                    </h4>
                    <p className="text-gray-200">
                      These Terms shall be interpreted and governed by the laws
                      of the jurisdiction in which we operate, without regard to
                      its conflict of law provisions.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-3 text-blue-300">
                      8. Contact Information
                    </h4>
                    <p className="text-gray-200">
                      If you have any questions about these Terms, please
                      contact us at support@example.com or through our website
                      contact form.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 bg-white/5 backdrop-blur-sm border-t border-white/10 flex justify-center ">
                <button
                  onClick={toggleTerms}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform  cursor-pointer"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
