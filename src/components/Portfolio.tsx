import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  { title: "HRPAYX", category: "Payroll · HR Solutions", hue: 220, tag: "HR Tech", url: "https://hrpayx.com/", image: "/src/assets/HRPAYXLOGO.JPG" },
  { title: "MailPrimeX", category: "Email · Bulk Solutions", hue: 25, tag: "Marketing", url: "https://mailprimex.com/", image: "/src/assets/mailprimex.png" },
  { title: "eleinventory", category: "Inventory · Management", hue: 145, tag: "Inventory", url: "https://eleinventory.com/", image: "/src/assets/eleinventory.png" },
  { title: "TrackVoro", category: "Analytics · Tracking", hue: 265, tag: "Analytics", url: "https://trackvoro.com/", image: "/src/assets/trackvoro.png" },
  { title: "CrystonaCRM", category: "CRM · Management", hue: 220, tag: "CRM", url: "https://crystonacrm.com/", image: "/src/assets/crystona.png" },
];

export function Portfolio() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            {/* <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-5">
              <span className="text-xs tracking-widest text-muted-foreground">04 — SOFTWARES</span>
            </div> */}
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              OUR <span className="gradient-text">SOFTWARE</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            From CRM systems to marketing automation, explore our suite of custom-built software solutions designed to drive growth and efficiency for your business.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.url || "#"}
              target={p.url ? "_blank" : undefined}
              rel={p.url ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{ y: -8 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
              style={p.image ? { 
                backgroundImage: `url(${p.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              } : {}}
            >
              {/* overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

              {/* content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] tracking-widest text-white/90 font-semibold">
                    {p.tag.toUpperCase()}
                  </span>
                  <div className="h-9 w-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div>
                  <div className="text-xs text-white/95 tracking-wide font-medium">{p.category}</div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white mt-1 drop-shadow-lg">
                    {p.title}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
