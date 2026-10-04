import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MessageCircle } from 'lucide-react';
import Splash from '@/components/Splash';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import Carousel from '@/components/Carousel';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Process from '@/components/Process';
import Portfolio from '@/components/Portfolio';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';


function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918282899565"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with GD Solutions on WhatsApp at +91 82828 99565"
      className="group fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-full bg-[#25D366] p-3 text-white shadow-[0_10px_35px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_14px_45px_rgba(37,211,102,0.5)] sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-50 blur-xl animate-pulse" />

      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
        <span className="absolute inset-0 rounded-full border border-white/30 animate-ping motion-reduce:animate-none" />
        <MessageCircle className="h-6 w-6 fill-current" />
      </span>

      <span className="hidden pr-2 text-left sm:block">
        <span className="block text-xs font-medium text-white/80">Chat with us</span>
        <span className="block text-sm font-bold tracking-wide">+91 82828 99565</span>
      </span>

      <span className="absolute -top-2 right-1 h-3 w-3 rounded-full border-2 border-white bg-white shadow-sm" />
    </a>
  );
}

function MainSite() {
  useScrollReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustSection />
        <Carousel />
        <Services />
        <WhyChooseUs />
        <Process />
        <Portfolio />
        <Testimonials />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

function App() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <Splash onEnter={() => setEntered(true)} />;
  }

  return <MainSite />;
}

export default App;
