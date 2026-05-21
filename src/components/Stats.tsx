import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 20000, suffix: "+", label: "Projects Delivered" },
  { value: 5000, suffix: "+", label: "Happy Clients" },
  { value: 93, suffix: "%", label: "Growth Rate" },
  { value: 2000, suffix: "+", label: "Services" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, to, { duration: 2.2, ease: "easeOut" });
    return ctrl.stop;
  }, [inView, count, to]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative glass rounded-2xl p-6 sm:p-8 text-center overflow-hidden hover:glass-strong transition-all"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 gradient-primary opacity-10" />
              </div>
              <div className="relative font-display text-4xl sm:text-5xl font-bold gradient-text">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="relative mt-2 text-xs sm:text-sm text-muted-foreground tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
