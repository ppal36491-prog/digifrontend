import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Globe, Database, Search, Megaphone, Share2, MessageCircle,
  MousePointerClick, Mail, Smartphone, TrendingUp, Users, Code, Heart, Play
} from "lucide-react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import servicesData from "../lib/servicesData.json";

type Service = { icon: LucideIcon; title: string; desc: string; hue: number; id: string };

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Database,
  Search,
  Megaphone,
  Share2,
  MessageCircle,
  MousePointerClick,
  Mail,
  Smartphone,
  TrendingUp,
  Users,
  Code,
  Heart,
  Play,
};

const services: Service[] = servicesData.services.map((service: any) => ({
  icon: iconMap[service.icon] || Globe,
  title: service.title,
  desc: service.shortDesc,
  hue: service.hue,
  id: service.id,
}));

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const Icon = s.icon;

  return (
    <Link to={`/service/${s.id}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: i * 0.05 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: "preserve-3d" }}
        className="group relative glass rounded-3xl p-7 cursor-pointer overflow-hidden"
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `radial-gradient(400px circle at var(--x,50%) var(--y,50%), oklch(0.7 0.25 ${s.hue} / 0.25), transparent 40%)` }}
        />

        <div style={{ transform: "translateZ(40px)" }} className="relative">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
            style={{
              background: `linear-gradient(135deg, oklch(0.7 0.22 ${s.hue}), oklch(0.6 0.24 ${s.hue + 30}))`,
              boxShadow: `0 10px 40px -10px oklch(0.7 0.22 ${s.hue} / 0.7)`,
            }}
          >
            <Icon className="h-7 w-7 text-white" />
          </motion.div>

          <h3 className="font-display text-xl font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

          <div className="mt-5 inline-flex items-center text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
            Learn more
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>

        {/* corner shine */}
        <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-5">
            <span className="text-xs tracking-widest text-muted-foreground">02 — SERVICES</span>
          </div> */}
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Everything you need to <span className="gradient-text">scale</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            A full-stack growth engine — from code, to copy, to clicks.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
