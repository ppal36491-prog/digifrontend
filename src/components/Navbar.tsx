import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import logo from "../assets/logo.png";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
        <div className={`flex items-center justify-between rounded-full px-5 py-3 transition-all ${
          scrolled ? "glass-strong shadow-card-premium" : "bg-transparent"
        }`}>
          <a href="/#home" className="flex items-center gap-2 group">
            <img src={logo} alt="Digi Mate Logo" className="h-25 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-sm">Digi Mate</span>
              <span className="text-[10px] text-muted-foreground tracking-widest">TECH DIGITAL</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                {l.label}
                <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 gradient-primary transition-all duration-300 group-hover:w-1/2" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full glass hover:scale-110 transition-transform"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center rounded-full gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:scale-105 transition-transform glow"
            >
              Get a Quote
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden h-10 w-10 flex items-center justify-center rounded-full glass"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-2"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl hover:bg-white/5 text-sm"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 text-center rounded-xl gradient-primary px-4 py-3 text-sm font-medium"
              >
                Get a Quote
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
