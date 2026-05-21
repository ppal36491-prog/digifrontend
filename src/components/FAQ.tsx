import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "What services does Digi Mate Tech offer?", a: "End-to-end digital growth: websites, CRM software, SEO, performance ads, social, WhatsApp, email marketing and mobile apps." },
  { q: "How long does a typical project take?", a: "Websites ship in 3–6 weeks. CRMs and apps range 8–16 weeks depending on scope. Marketing engagements are ongoing month-to-month." },
  { q: "Do you work with startups and enterprises?", a: "Yes. We tailor engagements from early-stage MVPs all the way to enterprise transformations with dedicated pods." },
  { q: "How do you measure success?", a: "Every engagement defines clear KPIs — traffic, leads, CAC, LTV, MRR. We report transparently with weekly dashboards." },
  { q: "Can you take over an existing project?", a: "Absolutely. We routinely audit and rescue projects — codebases, ad accounts, CRMs and SEO setups." },
  { q: "Where are you based?", a: "We're headquartered in India and serve clients globally with a fully remote, distributed team." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-5">
            <span className="text-xs tracking-widest text-muted-foreground">06 — FAQ</span>
          </div> */}
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Frequently <span className="gradient-text">asked</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-display text-base sm:text-lg font-medium">{f.q}</span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 h-9 w-9 rounded-full gradient-primary flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 text-primary-foreground" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 sm:px-6 pb-6 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
