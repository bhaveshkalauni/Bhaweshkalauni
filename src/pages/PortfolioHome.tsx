import React from "react";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import About from "../components/About";
import Timeline from "../components/Timeline";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function PortfolioHome() {
  return (
    <div
      id="portfolio-root"
      className="min-h-screen bg-[#F3F2F0] text-[#111214] font-sans selection:bg-[#20A0B5] selection:text-[#111214]"
    >
      <LoadingScreen />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
