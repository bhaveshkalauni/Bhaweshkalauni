import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import CareerInterests from "./components/CareerInterests";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div id="portfolio-app-root" className="min-h-screen bg-white text-navy-800 dark:bg-navy-950 dark:text-navy-150 transition-colors duration-300">
      {/* 1. Introductory Luxury Loading Animation */}
      <LoadingScreen />

      {/* 2. Fixed Sticky Navigation Header */}
      <Navbar />

      {/* 3. Main Body Container with Sections */}
      <main id="main-content-layout">
        
        {/* Section 0: Hero Greeting */}
        <Hero />

        {/* Section 1: Professional Narrative */}
        <About />

        {/* Section 2: Education Pathway */}
        <Education />

        {/* Section 3: Professional Experience Cards */}
        <Experience />

        {/* Section 4: Skills Matrix Grid */}
        <Skills />

        {/* Section 5: Strategic Project Cases */}
        <Projects />

        {/* Section 6: Key Achievements & Stat Cards */}
        <Achievements />

        {/* Section 7: Future Career Interests */}
        <CareerInterests />

        {/* Section 8: Resume Sheet Simulator */}
        <Resume />

        {/* Section 9: Communication Form Terminal */}
        <Contact />

      </main>

      {/* 4. Elegant Footer with social links and back-to-top */}
      <Footer />
    </div>
  );
}
