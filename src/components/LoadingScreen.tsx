import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); // Elegant short delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-navy-950"
        >
          <div className="text-center px-6">
            {/* Elegant Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-6 flex justify-center"
            >
              <div className="w-14 h-14 rounded-full border-2 border-navy-900 dark:border-white flex items-center justify-center font-mono font-bold text-lg text-navy-900 dark:text-white tracking-widest">
                BK
              </div>
            </motion.div>

            {/* Main Name Text */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="font-sans text-2xl md:text-3xl font-bold tracking-wider text-navy-900 dark:text-white uppercase"
            >
              Bhawesh Kalauni
            </motion.h1>

            {/* Current Position / Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-2 text-xs font-mono tracking-widest text-navy-500 dark:text-navy-400 uppercase"
            >
              Future Strategy Consultant • NEOMA Business School
            </motion.div>

            {/* Subtle consulting-style progress bar */}
            <div className="mt-8 w-48 h-[2px] bg-navy-100 dark:bg-navy-800 mx-auto rounded-full overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut", repeat: 0 }}
                className="absolute top-0 bottom-0 w-1/2 bg-brand-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
