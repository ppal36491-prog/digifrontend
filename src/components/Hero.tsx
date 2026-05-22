import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { ArrowRight, Sparkles, Play, WandSparkles, LucideWandSparkles, Code2Icon, CodeSquareIcon, Code2 } from "lucide-react";
import { HeroScene } from "./HeroScene";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-1, 1], [8, -8]);
  const rotateY = useTransform(mx, [-1, 1], [-8, 8]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex items-center overflow-hidden gradient-hero pt-28 pb-12"
    >
      {/* Floating orbs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-[400px] w-[400px] rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl animate-float" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-6"
          >
            <CodeSquareIcon className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium tracking-wide">Digital Growth Studio · Est. 2024</span>
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Driving{" "}
            <span className="gradient-text animate-gradient">Digital Growth</span>
            {" "}Through Innovation
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            We build digital experiences, CRM systems, websites, marketing solutions,
            and business growth strategies engineered for measurable impact.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center sm:justify-start gap-2 rounded-full gradient-primary px-6 sm:px-7 py-3 sm:py-4 font-medium text-primary-foreground glow w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full glass px-7 py-4 font-medium hover:bg-white/10 transition-colors"
            >
              <Play className="h-4 w-4" />
              Explore Services
            </motion.a>
          </div>

          {/* trust row */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 justify-center lg:justify-start text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {[265, 290, 220, 310].map((h, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-background"
                  style={{ background: `oklch(0.7 0.2 ${h})` }}
                />
              ))}
            </div>
            <span>Trusted by <span className="text-foreground font-semibold">250+ brands</span> worldwide</span>
          </div>
        </motion.div>

        {/* Right - 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="relative hidden lg:block h-[420px] sm:h-[500px] lg:h-[600px] w-full"
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <HeroScene />
          </div>

          {/* Floating UI cards - Hidden on mobile */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-8 glass-strong rounded-2xl p-4 shadow-card-premium hidden lg:block"
          >
            <div className="text-[10px] text-muted-foreground">Revenue</div>
            <div className="font-display font-bold text-2xl gradient-text">+182%</div>
            <div className="mt-2 flex items-end gap-1">
              {[30, 50, 40, 70, 60, 90, 100].map((h, i) => (
                <div key={i} className="w-1.5 rounded-full gradient-primary" style={{ height: `${h * 0.3}px` }} />
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-0 bottom-8 glass-strong rounded-2xl p-4 shadow-card-premium hidden lg:block"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-muted-foreground">CAMPAIGN LIVE</span>
            </div>
            <div className="mt-2 font-display font-semibold text-sm">12.4K conversions</div>
            <div className="mt-1 text-[10px] text-muted-foreground">Last 30 days</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-6 top-4 glass-strong rounded-full h-12 w-12 flex items-center justify-center hidden lg:flex"
          >
            <Code2 className="h-5 w-5 text-accent" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground tracking-widest"
      >
        SCROLL TO EXPLORE
      </motion.div>
    </section>
  );
}
