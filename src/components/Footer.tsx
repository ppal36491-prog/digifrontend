import { Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "@tanstack/react-router";
import servicesData from "../lib/servicesData.json";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl glass-strong rounded-3xl p-8 sm:p-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Digi Mate Logo" className="h-15 w-auto" />
              <div className="leading-tight">
                <div className="font-display font-bold text-sm">Digi Mate</div>
                <div className="text-[10px] text-muted-foreground tracking-widest">TECH DIGITAL</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              Driving digital growth through innovation. CRM, websites, marketing — engineered for impact.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full glass flex items-center justify-center hover:gradient-primary transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Quick links</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/#about" },
            
                { label: "Contact", href: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {servicesData.services.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link to={`/service/${service.id}`} className="hover:text-foreground transition-colors">{service.title}</Link>
                </li>
              ))}
            </ul>
            <Link to="/#services" className="mt-3 text-xs text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1">
              See more →
            </Link>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Hello.digimatetechdigital@gmail.com</li>
              <li>+91 78773 22809</li>
              <li>Jaipur, Rajasthan, India</li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs rounded-full glass px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Accepting new projects
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {year} Digi Mate Tech Digital Pvt Ltd. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-foreground transition-colors">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
