import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/** Original single-page portfolio (home route). */
export default function PortfolioHome() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.hash]);

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
