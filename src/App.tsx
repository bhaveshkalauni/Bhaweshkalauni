import React from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div
      id="portfolio-root"
      className="min-h-screen bg-[#F3F2F0] text-[#111214] font-sans selection:bg-[#20A0B5] selection:text-[#111214]"
    >
      {/* 1. Fast, minimal editorial entrance screen */}
      <LoadingScreen />

      {/* 2. Sleek Karol Binkowski inspired navbar */}
      <Navbar />

      {/* 3. Core Editorial Body */}
      <main id="main-content">
        
        {/* Hero: Large Bold Typography & Signature Spec Box */}
        <Hero />

        {/* 01: Selected Projects & Deep Methodology Case Studies */}
        <Projects />

        {/* 02: Functional Capabilities & Analytical Matrix */}
        <Skills />

        {/* 03: Background Trajectory (Engineering -> Management -> SCM) */}
        <About />

        {/* 04: Track Record & Timeline (Experience & Academic Foundation) */}
        <Timeline />

        {/* 05: Minimal Direct Contact & Consultation Dispatch */}
        <Contact />

      </main>

      {/* 4. Colophon / Signature Footer */}
      <Footer />
    </div>
  );
}
