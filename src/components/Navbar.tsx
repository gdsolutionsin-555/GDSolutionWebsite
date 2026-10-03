import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px mx-auto max-w-7xl">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo */}
          <a href="#home" className="group flex items-center gap-2.5" aria-label="GD Solutions home">
            <img
              src="/gd-logo.png"
              alt="GD Solutions"
              className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span
              className={`text-base font-extrabold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-ink-900' : 'text-white'
              }`}
            >
              GD SOLUTIONS
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`group relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    scrolled ? 'text-ink-600 hover:text-ink-900' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-600 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a href="#contact" className="btn-primary">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden ${
              scrolled ? 'text-ink-800 hover:bg-ink-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white lg:hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="container-px mx-auto max-w-7xl space-y-1 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 text-ink-300" />
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
