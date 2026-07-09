import { personalInfo } from "../data";
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Core Client-Side Validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMessage("Please fulfill all the credential fields (Name, Email, Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid, structured email address.");
      return;
    }

    // Begin Simulated Submit Transmit Sequence
    setStatus("sending");
    
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1800); // Premium brief transmission sequence
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-white dark:bg-navy-900 border-t border-navy-100 dark:border-navy-950 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-50/10 dark:bg-brand-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-500 uppercase">
            09 / Communication Terminal
          </span>
          <h2 className="mt-2 font-sans text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white tracking-tight">
            Contact Me
          </h2>
          <div className="mt-4 w-12 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Contact Split Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-sans text-xl font-bold text-navy-800 dark:text-white tracking-tight">
              Let&rsquo;s Connect professionally
            </h3>
            <p className="font-sans text-sm sm:text-base text-navy-500 dark:text-navy-400 leading-relaxed text-justify">
              I am open to strategy consulting, operations excellence, supply chain coordination, or business analytics inquiries. Whether you represent an elite consulting partnership, a high-growth startup, or a corporate strategy division, let&rsquo;s discuss how my engineering background and business curriculum can deliver measurable outcomes.
            </p>

            {/* Contact Details Listing Cards */}
            <div className="space-y-4 pt-4">
              {/* Location Card */}
              <div className="p-4 rounded-xl border border-navy-100 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-950/30 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-navy-400 dark:text-navy-500">
                    Location Base
                  </span>
                  <span className="block font-sans text-sm font-semibold text-navy-800 dark:text-navy-200">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Email Card */}
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="block p-4 rounded-xl border border-navy-100 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-950/30 hover:border-brand-500 dark:hover:border-brand-500 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-navy-400 dark:text-navy-500">
                      Email Communication
                    </span>
                    <span className="block font-sans text-sm font-semibold text-navy-800 dark:text-navy-200 group-hover:text-brand-500 transition-colors">
                      {personalInfo.contact.email}
                    </span>
                  </div>
                </div>
              </a>

              {/* LinkedIn / Social Grid */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl border border-navy-100 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-950/30 hover:border-brand-500 dark:hover:border-brand-500 transition-all duration-300 flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-navy-400 dark:text-navy-500">
                      LinkedIn
                    </span>
                    <span className="block font-sans text-xs font-bold text-navy-800 dark:text-navy-200">
                      Connect
                    </span>
                  </div>
                </a>

                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl border border-navy-100 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-950/30 hover:border-navy-400 dark:hover:border-navy-600 transition-all duration-300 flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-300 flex items-center justify-center flex-shrink-0 group-hover:bg-navy-800 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-navy-950 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-navy-400 dark:text-navy-500">
                      GitHub
                    </span>
                    <span className="block font-sans text-xs font-bold text-navy-800 dark:text-navy-200">
                      Repository
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-2xl border border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 shadow-lg">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 mb-2">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="font-sans text-xl font-bold text-navy-900 dark:text-white">
                      Message Transmitted Successfully
                    </h4>
                    <p className="font-sans text-sm text-navy-500 dark:text-navy-400 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, Bhavesh. Your communication was securely received. I will review your inquiry and respond with a structured reply within 24 business hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 inline-flex items-center justify-center px-5 py-2 text-xs font-mono tracking-widest uppercase rounded bg-navy-100 hover:bg-navy-200 text-navy-800 dark:bg-navy-800 dark:hover:bg-navy-700 dark:text-navy-100 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    noValidate
                  >
                    <div className="space-y-1">
                      <h4 className="font-sans text-base font-bold text-navy-900 dark:text-white tracking-tight">
                        Send a Direct Message
                      </h4>
                      <p className="font-sans text-xs text-navy-400 dark:text-navy-500">
                        Inquiries are monitored continuously. Fulfill the fields below to initiate contact.
                      </p>
                    </div>

                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label htmlFor="form-name" className="block font-mono text-[10px] uppercase tracking-wider font-semibold text-navy-500 dark:text-navy-400">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        disabled={status === "sending"}
                        className="w-full px-4 py-2.5 rounded-lg border border-navy-200 bg-white text-navy-800 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:border-navy-800 dark:bg-navy-900 dark:text-navy-100 dark:placeholder-navy-600 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="form-email" className="block font-mono text-[10px] uppercase tracking-wider font-semibold text-navy-500 dark:text-navy-400">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@firm.com"
                        disabled={status === "sending"}
                        className="w-full px-4 py-2.5 rounded-lg border border-navy-200 bg-white text-navy-800 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:border-navy-800 dark:bg-navy-900 dark:text-navy-100 dark:placeholder-navy-600 transition-all duration-200"
                        required
                      />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="form-message" className="block font-mono text-[10px] uppercase tracking-wider font-semibold text-navy-500 dark:text-navy-400">
                        Detailed Message / Scope of Consulting
                      </label>
                      <textarea
                        id="form-message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your operational scenario or strategic opportunity..."
                        disabled={status === "sending"}
                        className="w-full px-4 py-2.5 rounded-lg border border-navy-200 bg-white text-navy-800 placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:border-navy-800 dark:bg-navy-900 dark:text-navy-100 dark:placeholder-navy-600 transition-all duration-200 resize-none"
                        required
                      />
                    </div>

                    {/* Validation Feedback Banner */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-700 dark:bg-rose-500/10 dark:border-rose-500/25 dark:text-rose-300 flex items-start space-x-2.5 text-xs"
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Submit Action Button */}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full inline-flex items-center justify-center px-5 py-3 rounded font-mono text-xs font-bold tracking-widest uppercase text-white bg-navy-900 hover:bg-brand-600 disabled:bg-navy-300 dark:bg-white dark:text-navy-950 dark:hover:bg-brand-50 dark:disabled:bg-navy-800 dark:disabled:text-navy-600 transition-all duration-200 cursor-pointer shadow-md"
                    >
                      {status === "sending" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white dark:border-navy-950 border-t-transparent rounded-full animate-spin mr-2" />
                          Transmitting Packets...
                        </>
                      ) : (
                        <>
                          Transmit Message <Send className="ml-2 w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
