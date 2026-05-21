import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle, Linkedin, Instagram, Twitter, Facebook, Send } from "lucide-react";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // Initialize EmailJS (replace with your public key from emailjs.com)
  useEffect(() => {
    emailjs.init("LlCNp-M5R-oaTRBfy");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send email using EmailJS
      // Replace SERVICE_ID and TEMPLATE_ID with your actual IDs from emailjs.com
      const response = await emailjs.send(
        "service_0h3il5n", // Your EmailJS Service ID
        "template_xl5i4fd", // Your EmailJS Template ID
        {
          to_email: "hello@digimatetech.com", // Your receiving email
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }
      );

      if (response.status === 200) {
        setSent(true);
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      }
    } catch (err) {
      setError("Failed to send message. Please try again or contact us directly.");
      console.error("EmailJS error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          {/* <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-5">
            <span className="text-xs tracking-widest text-muted-foreground">07 — CONTACT</span>
          </div> */}
          <h2 className="font-display text-4xl sm:text-5xl font-bold">
            Let's <span className="gradient-text">build</span> something great
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us about your goals — we'll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-strong rounded-3xl p-6 sm:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field 
                label="Your Name" 
                type="text" 
                placeholder="Name, Surname"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Field 
                label="Email" 
                type="email" 
                placeholder="gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <Field 
              label="Phone" 
              type="tel" 
              placeholder="+91 6377xxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Field 
              label="Company" 
              type="text" 
              placeholder="pvt.ltd, llc, etc."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            <div>
              <label className="text-xs font-medium tracking-widest text-muted-foreground">PROJECT BRIEF</label>
              <textarea
                rows={5}
                placeholder="Tell us about your project, goals and timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all resize-none"
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-8 py-4 font-medium text-primary-foreground glow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : sent ? "Message sent ✓" : <>Send message <Send className="h-4 w-4" /></>}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            <InfoCard icon={Mail} label="Email us" value="Hello.digimatetechdigital@gmail.com" href="mailto:Hello.digimatetechdigital@gmail.com" />
            <InfoCard icon={Phone} label="Call us" value="+91 78773 22809" href="tel:+917877322809" />
            <InfoCard icon={MessageCircle} label="WhatsApp" value="Chat on WhatsApp" href="https://wa.me/+917877322809" highlight />
            <InfoCard icon={MapPin} label="Visit us" value="Jaipur, Rajasthan, India" />

            {/* Map */}
            <div className="glass rounded-3xl overflow-hidden h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.103654288769!2d75.70121177572726!3d26.900205276654674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4b411dd3f9b3%3A0x89421f97ac57ad0b!2sDigi-Mate%20Tech%20digital%20Pvt.%20Ltd.%20%2Cseo%20%2Csmm%20%2Cdigital%20marketing%20%2Cwebsite%20Development%20%26%20game%20development%20%2Cadvertising%20agency!5e0!3m2!1sen!2sin!4v1779270454102!5m2!1sen!2sin"
                title="Digi Mate Tech location"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {[Linkedin, Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-12 w-12 rounded-full glass hover:gradient-primary hover:scale-110 transition-all flex items-center justify-center group"
                >
                  <Icon className="h-5 w-5 group-hover:text-primary-foreground" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <motion.a
          href="https://wa.me/+917877322809"
          target="_blank"
          rel="noopener"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-14 w-14 rounded-full flex items-center justify-center shadow-card-premium"
          style={{ background: "linear-gradient(135deg, #25d366, #128c7e)" }}
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </motion.a>
        <motion.a
          href="tel:+917877322809"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center glow"
          aria-label="Call"
        >
          <Phone className="h-6 w-6 text-primary-foreground" />
        </motion.a>
      </div>
    </section>
  );
}

function Field({ label, type, placeholder, value, onChange, required }: { 
  label: string; 
  type: string; 
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium tracking-widest text-muted-foreground">{label.toUpperCase()}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-2 w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, href, highlight }: {
  icon: typeof Mail; label: string; value: string; href?: string; highlight?: boolean;
}) {
  const className = `glass rounded-2xl p-5 flex items-center gap-4 transition-all hover:glass-strong group ${
    href ? "cursor-pointer" : ""
  }`;
  const inner = (
    <>
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        highlight ? "gradient-primary" : "bg-white/5"
      }`}>
        <Icon className={`h-5 w-5 ${highlight ? "text-primary-foreground" : ""}`} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] tracking-widest text-muted-foreground">{label.toUpperCase()}</div>
        <div className="font-medium truncate group-hover:gradient-text transition-all">{value}</div>
      </div>
    </>
  );
  return href
    ? <a href={href} className={className}>{inner}</a>
    : <div className={className}>{inner}</div>;
}
