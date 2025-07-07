"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero from "@/app/assets/nfl.jpg";

interface AnimatedInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  required = true,
}) => {
  return (
    <div className="relative mt-1 group">
      <input
        id={id}
        type={type}
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

const Signup: React.FC = () => {
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
      className="relative bg-no-repeat bg-cover bg-center flex items-center justify-center p-4 sm:p-7 min-h-screen"
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
        className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/20 shadow-2xl p-6 md:p-8 lg:p-12"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center cursor-default">
          Create your account
        </h1>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4 sm:space-y-6">
            <AnimatedInput
              id="firstName"
              label="First Name"
              placeholder="John"
            />

            <AnimatedInput id="lastName" label="Last Name" placeholder="Doe" />

            <AnimatedInput
              id="username"
              label="Username"
              placeholder="johndoe"
            />

            <AnimatedInput
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <AnimatedInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
            />

            <AnimatedInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
            />

            <div className="flex items-start space-x-3 pt-2">
              <label className="cursor-pointer duration-300 relative overflow-hidden w-5 h-5 flex justify-center items-center border border-white/30 rounded-md bg-white/10 before:absolute before:w-8 before:h-8 before:content-[''] before:right-0 before:rounded-full before:blur-sm after:absolute after:z-10 after:w-4 after:h-4 after:content-[''] after:left-1 after:bottom-1 after:rounded-full after:blur-sm">
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
                  className="underline hover:text-blue-400 cursor-pointer transition-colors duration-200"
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
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                },
              }}
              className="relative z-10 w-full max-w-3xl bg-white/10 backdrop-blur-xl text-white rounded-xl border border-white/20 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-sm border-b border-white/10">
                <h1 className="text-white font-medium text-xl sm:text-2xl md:text-3xl text-center flex-1 cursor-default">
                  Terms and Conditions
                </h1>
              </div>

              {/* Content with hidden scrollbar */}
              <div
                className="p-4 sm:p-6 md:p-8 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto text-white"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="space-y-4 sm:space-y-6 text-sm leading-relaxed">
                  <p className="text-gray-200">
                    Welcome to our platform. By creating an account, you agree
                    to be bound by these Terms of Service.
                  </p>

                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300">
                      1. User Responsibilities
                    </h4>
                    <p className="text-gray-200">
                      You are responsible for maintaining the confidentiality of
                      your account and password and for restricting access to
                      your computer or device.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300">
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
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300">
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
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300">
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
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300">
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
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300">
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
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300">
                      7. Governing Law
                    </h4>
                    <p className="text-gray-200">
                      These Terms shall be interpreted and governed by the laws
                      of the jurisdiction in which we operate, without regard to
                      its conflict of law provisions.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-blue-300">
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
              <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-white/5 backdrop-blur-sm border-t border-white/10 flex justify-center">
                <button
                  onClick={toggleTerms}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl cursor-pointer"
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
};

export default Signup;
