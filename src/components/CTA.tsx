import { ArrowRight, MessageCircle } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="bg-white py-12 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-900 to-brand-900 px-6 py-16 text-center lg:px-12 lg:py-24">
          {/* Background accents */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Take Your Business Online?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-300">
              Let's build a website that makes your business look professional, credible and
              ready for growth.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:contact@gdsolutions.in" className="btn-primary">
                Start My Website
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/919830908641"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-light"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to GD Solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
