import { motion } from "framer-motion";
import { Lightbulb, Target, Code2, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "Planning", desc: "We map your goals, audience and competition into a clear blueprint." },
  { icon: Target, title: "Strategy", desc: "A custom growth strategy across product, brand and channels." },
  { icon: Code2, title: "Development", desc: "Pixel-perfect builds with engineering excellence under the hood." },
  { icon: Rocket, title: "Marketing", desc: "Launch campaigns engineered to convert and compound." },
  { icon: TrendingUp, title: "Growth", desc: "Optimize, automate and scale with weekly reporting." },
];

export function Timeline() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          {/* <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-5">
            <span className="text-xs tracking-widest text-muted-foreground">03 — PROCESS</span>
          </div> */}
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Why choose <span className="gradient-text">Digi Mate</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A proven 5-step engine that turns vision into measurable growth.
          </p>
        </motion.div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: left ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center gap-6 ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center glow"
                    >
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </motion.div>
                  </div>

                  {/* Card */}
                  <div className={`ml-28 md:ml-0 md:w-[calc(50%-3rem)] ${left ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="glass rounded-2xl p-6 hover:glass-strong transition-all">
                      <div className="text-xs tracking-widest text-muted-foreground">
                        STEP {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="font-display text-2xl font-semibold mt-1">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
