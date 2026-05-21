import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Ananya Sharma", role: "Founder, Northwave", body: "Digi Mate transformed our online presence — 4x organic traffic in 6 months and a CRM that finally closes loops.", hue: 265 },
  { name: "Rohan Mehta", role: "CMO, Pulse Health", body: "Their team operates like an in-house growth squad. Roadmaps are sharp, execution is faster than anyone we've worked with.", hue: 220 },
  { name: "Priya Iyer", role: "CEO, Orbit Studio", body: "The website they built feels like an Apple product. Conversions doubled in week one, no joke.", hue: 310 },
  { name: "Vikram Singh", role: "Director, Vertex Realty", body: "Their Google Ads strategy cut our CPL by 60%. Highest-performing agency we've partnered with — period.", hue: 25 },
  { name: "Saanvi Kapoor", role: "Head of Marketing, Lumen", body: "The CRM they built is a beast. We automated 80% of our workflows and our reps now actually love it.", hue: 145 },
  { name: "Aarav Patel", role: "Founder, Nimbus SaaS", body: "Brand, product, marketing — they connected every dot. Our MRR is up 3.2x year over year.", hue: 290 },
];

export function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          {/* <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-5">
            <span className="text-xs tracking-widest text-muted-foreground">05 — LOVE</span>
          </div> */}
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Words from <span className="gradient-text">founders</span>
          </h2>
        </motion.div>
      </div>

      {/* Sliding row */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-5 w-max"
        >
          {row.map((t, i) => (
            <div
              key={i}
              className="glass-strong rounded-3xl p-7 w-[360px] sm:w-[420px] flex-shrink-0"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed">"{t.body}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center font-semibold text-white"
                  style={{ background: `linear-gradient(135deg, oklch(0.7 0.22 ${t.hue}), oklch(0.6 0.24 ${t.hue + 30}))` }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
