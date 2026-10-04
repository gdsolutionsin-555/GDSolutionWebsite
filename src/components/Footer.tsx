import { useEffect, useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Instagram, Facebook, Linkedin, ArrowRight } from 'lucide-react';

const NAV_LINKS = ['Home', 'Services', 'Portfolio', 'About', 'Contact'];
const SERVICE_LINKS = [
  'Website Design and Development',
  'Hosting & Business Email',
  'AI Automation & Voice Bots',
  'CCTV Installation & AMC',
  'IT Infrastructure Projects',
  'IT Support and AMC',
  'SEO and Digital Marketing',
];

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="site-footer"
      className={`bg-ink-950 pt-16 pb-8 text-ink-400 transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/gd-logo.png"
                alt="GD Solutions"
                className="h-11 w-11 object-contain transition-transform duration-500 hover:rotate-3 hover:scale-105"
              />
              <span className="text-base font-extrabold tracking-tight text-white">
                GD SOLUTIONS
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm font-semibold tracking-wide leading-relaxed">
              Innovate | Automate | Secure
            </p>
            <div className="mt-6 flex gap-3">
              {[
                {
                  icon: Instagram,
                  label: 'Instagram',
                  href: 'https://www.instagram.com/business.gdsolutions/?hl=en',
                },
                { icon: Facebook, label: 'Facebook', href: '#' },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/gd-solutions038/home/?viewAsMember=true',
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href !== '#' ? '_blank' : undefined}
                  rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-ink-400 transition-all duration-300 hover:border-brand-400/40 hover:bg-brand-600 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="group inline-flex items-center gap-1 text-sm text-ink-400 transition-colors hover:text-brand-400"
                  >
                    {l}
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICE_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href="#services"
                    className="text-sm text-ink-400 transition-colors hover:text-brand-400"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-brand-500" />
                <a href="mailto:contact@gdsolutions.in" className="hover:text-brand-400">
                  contact@gdsolutions.in
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <div className="space-y-1">
                  <a href="tel:+919007502045" className="block transition-colors hover:text-brand-400">
                    +91 90075 02045
                  </a>
                  <a href="tel:+918282899565" className="block transition-colors hover:text-brand-400">
                    +91 82828 99565
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <a
                  href="https://wa.me/918282899565"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with GD Solutions on WhatsApp"
                  className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/15 text-brand-500 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-600/30">
                    <MessageCircle className="h-4 w-4 animate-pulse" />
                  </span>
                  <span className="transition-colors group-hover:text-brand-400">WhatsApp: +91 82828 99565</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <span className="leading-relaxed">RDB Boulevard, 5th Floor, Block EP and GP, Salt Lake, Sector 5, Kolkata - 700091</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink-500 transition-opacity duration-700 delay-500">© 2026 GD Solutions. All rights reserved.</p>
          <a
            href="https://wa.me/918282899565"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-semibold text-brand-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500 hover:text-white hover:shadow-lg hover:shadow-brand-500/20"
          >
            <MessageCircle className="h-3.5 w-3.5 animate-pulse" />
            WhatsApp us
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
