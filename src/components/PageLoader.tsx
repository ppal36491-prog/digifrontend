import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export function PageLoader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-20 w-20 mx-auto"
            >
              <div className="absolute inset-0 rounded-3xl gradient-primary animate-pulse-glow" />
              <div className="absolute inset-1 rounded-[20px] bg-background flex items-center justify-center">
                <img 
                  src={logo}
                  alt="Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1.2 }}
              className="mt-8 h-[3px] mx-auto rounded-full gradient-primary"
            />
            <p className="mt-4 text-xs tracking-[0.3em] text-muted-foreground">DIGI MATE TECH</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
