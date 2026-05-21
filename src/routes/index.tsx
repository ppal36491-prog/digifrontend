import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { Timeline } from "@/components/Timeline";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { BackToTop } from "@/components/BackToTop";
import { PageLoader } from "@/components/PageLoader";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PageLoader />
      <ScrollProgress />
      <CursorGlow />
      <ParticlesBackground />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Timeline />
          <Portfolio />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}
