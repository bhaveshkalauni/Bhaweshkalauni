import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

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
            transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-12 bg-[#F3F2F0] text-[#111214] border-8 border-[#111214]"
        >
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#3F454A] uppercase">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#20A0B5] inline-block"></span>
              <span className="font-bold text-[#111214]">BHAWESH KALAUNI</span>
            </div>
            <span>INDEX / 2026</span>
          </div>

          <div className="max-w-4xl space-y-3">
            <div className="text-xs font-mono tracking-widest text-[#3F454A] uppercase">
              PORTFOLIO //
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-none">
              SUPPLY CHAIN &amp; <span className="bg-[#20A0B5] text-[#111214] px-2">OPERATIONS</span>
            </h1>
          </div>

          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#3F454A]">
            <span>ROUEN, FRANCE</span>
            <span className="font-bold text-[#111214] animate-pulse">INITIALIZING SYSTEM...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
