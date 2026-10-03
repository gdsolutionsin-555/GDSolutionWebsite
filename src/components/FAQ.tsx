import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is included in your starter website?',
    a: 'It includes a professional website, mobile responsive design, SSL certificate, contact form, basic SEO setup, WhatsApp integration and ongoing maintenance support.',
  },
  {
    q: 'Can you automate repetitive tasks in my business with AI?',
    a: 'Yes. We build AI-powered automation for workflows like lead follow-ups, customer support replies, data entry, reporting and internal approvals, so your team spends less time on repetitive work.',
  },
  {
    q: 'What kind of AI automation do you build?',
    a: 'We work on chatbots and WhatsApp assistants, AI-assisted document and data processing, automated scheduling and notifications, and custom AI integrations with tools like your CRM, ticketing or attendance systems.',
  },
  {
    q: 'How does AI automation help reduce costs?',
    a: 'By automating routine, repetitive work, your team can focus on higher-value tasks instead of manual data entry or follow-ups, which typically reduces the staff hours and errors tied to those processes.',
  },
  {
    q: 'Will my website work on mobile?',
    a: 'Absolutely. Every website we build is mobile-first and fully responsive, meaning it looks and works great on phones, tablets and desktops.',
  },
  {
    q: 'How long does it take to build a website?',
    a: 'A typical starter website can be built and launched within 5 to 10 business days, depending on how quickly content and approvals are provided. More complex projects may take longer.',
  },
  {
    q: 'Can I request custom features?',
    a: 'Yes. We can add custom features like booking systems, payment gateways, user accounts and more. Custom features are scoped based on your requirements.',
  },
  {
    q: 'Do you provide website maintenance?',
    a: 'Yes, ongoing maintenance and support are included with your website. We help you keep your website updated, secure and running smoothly.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Yes, we offer website redesign services. We can take your existing website and give it a modern, professional look while improving performance and usability.',
  },
  {
    q: 'Do you provide SEO?',
    a: 'Yes, basic SEO setup is included with every website. For advanced SEO and digital marketing services, we offer dedicated services tailored to your goals.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-ink-50/50 py-20 lg:py-28">
      <div className="container-px mx-auto max-w-3xl">
        <div className="reveal text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Everything you need to know about getting your website built with GD Solutions.
          </p>
        </div>

        <div className="reveal mt-12 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                  isOpen ? 'border-brand-200' : 'border-ink-100'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-ink-900">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-500'
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink-500">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
