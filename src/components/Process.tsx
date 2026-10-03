import { Search, PenTool, Palette, Code, Rocket, LifeBuoy, Cpu, Database, Globe, Braces } from 'lucide-react';

const STEPS = [
  { num: '01', icon: Search, title: 'Discover', desc: 'Understand your business, audience and goals.' },
  { num: '02', icon: PenTool, title: 'Plan', desc: 'Create the sitemap, content structure and visual direction.' },
  { num: '03', icon: Palette, title: 'Design', desc: 'Develop the visual interface and user experience.' },
  { num: '04', icon: Code, title: 'Build', desc: 'Develop the responsive website.' },
  { num: '05', icon: Rocket, title: 'Launch', desc: 'Test, optimize and publish.' },
  { num: '06', icon: LifeBuoy, title: 'Support', desc: 'Continue improving your digital presence.' },
];

export default function Process() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Our Process
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            How We Bring Your Website to Life
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            A clear, step-by-step process that keeps you informed at every stage.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Desktop process rail + animated IT data packet */}
          <div className="process-rail pointer-events-none absolute left-[8.333%] right-[8.333%] top-8 hidden h-px lg:block">
            <div className="process-rail-base" />
            <div className="process-rail-glow" />
            <div className="process-packet">
              <Cpu className="h-3.5 w-3.5" />
            </div>
            <div className="process-packet-trail" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {STEPS.map((step, i) => (
              <div key={step.num} className="reveal process-step relative">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="process-icon relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-100 bg-white shadow-lg shadow-ink-900/5 transition-all duration-300 hover:border-brand-300 hover:shadow-brand-600/10">
                    <step.icon className="h-6 w-6 text-brand-600" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-[10px] font-bold text-white">
                      {step.num}
                    </span>
                    <span className="process-ripple absolute inset-0 rounded-2xl" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-ink-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile data-flow indicator */}
          <div className="process-mobile-flow mx-auto mt-10 flex max-w-xs items-center justify-center gap-3 lg:hidden">
            <Database className="h-4 w-4 text-brand-500" />
            <span className="process-mobile-line relative h-px flex-1 bg-ink-200">
              <span className="process-mobile-packet" />
            </span>
            <Globe className="h-4 w-4 text-brand-500" />
            <Braces className="h-4 w-4 text-brand-500" />
          </div>
        </div>
      </div>
        <style>{`
          .process-rail-base {
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(148,163,184,.45) 8%, rgba(148,163,184,.45) 92%, transparent);
          }

          .process-rail-glow {
            position: absolute;
            left: 0;
            top: -1px;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, transparent, rgba(37,99,235,.9), rgba(56,189,248,.95), transparent);
            filter: blur(3px);
            transform: scaleX(.12);
            transform-origin: left;
            animation: processRailGlow 7s linear infinite;
          }

          .process-packet {
            position: absolute;
            top: 50%;
            left: 0;
            display: flex;
            width: 28px;
            height: 28px;
            align-items: center;
            justify-content: center;
            border-radius: 9px;
            color: white;
            background: linear-gradient(135deg, #2563eb, #06b6d4);
            box-shadow: 0 0 10px 3px rgba(37,99,235,.55), 0 0 28px 7px rgba(6,182,212,.28);
            transform: translate(-50%, -50%);
            animation: processPacketTravel 7s cubic-bezier(.55,0,.45,1) infinite;
          }

          .process-packet-trail {
            position: absolute;
            top: 0;
            left: 0;
            width: 90px;
            height: 2px;
            background: linear-gradient(90deg, rgba(37,99,235,0), rgba(37,99,235,.75));
            filter: blur(2px);
            transform: translateY(-50%);
            animation: processTrailTravel 7s cubic-bezier(.55,0,.45,1) infinite;
          }

          .process-icon {
            animation: processIconIdle 3s ease-in-out infinite;
          }

          .process-step:nth-child(2) .process-icon { animation-delay: .4s; }
          .process-step:nth-child(3) .process-icon { animation-delay: .8s; }
          .process-step:nth-child(4) .process-icon { animation-delay: 1.2s; }
          .process-step:nth-child(5) .process-icon { animation-delay: 1.6s; }
          .process-step:nth-child(6) .process-icon { animation-delay: 2s; }

          .process-ripple {
            border: 2px solid rgba(37,99,235,.5);
            opacity: 0;
            transform: scale(.75);
            animation: processRipple 7s ease-out infinite;
          }

          .process-step:nth-child(2) .process-ripple { animation-delay: 1.1s; }
          .process-step:nth-child(3) .process-ripple { animation-delay: 2.2s; }
          .process-step:nth-child(4) .process-ripple { animation-delay: 3.3s; }
          .process-step:nth-child(5) .process-ripple { animation-delay: 4.4s; }
          .process-step:nth-child(6) .process-ripple { animation-delay: 5.5s; }

          .process-mobile-flow {
            animation: processMobileFloat 3s ease-in-out infinite;
          }

          .process-mobile-line {
            overflow: hidden;
          }

          .process-mobile-packet {
            position: absolute;
            top: 50%;
            left: 0;
            width: 7px;
            height: 7px;
            border-radius: 999px;
            background: #06b6d4;
            box-shadow: 0 0 10px 3px rgba(6,182,212,.55);
            transform: translateY(-50%);
            animation: processMobilePacket 1.8s linear infinite;
          }

          @keyframes processPacketTravel {
            0% { left: 0%; opacity: 0; }
            5% { opacity: 1; }
            16.5% { left: 20%; }
            33% { left: 40%; }
            50% { left: 60%; }
            66.5% { left: 80%; }
            82% { left: 100%; }
            88%, 100% { left: 100%; opacity: 0; }
          }

          @keyframes processTrailTravel {
            0%, 4% { left: -70px; opacity: 0; }
            8% { opacity: 1; }
            82% { left: 100%; opacity: 1; }
            90%, 100% { left: 100%; opacity: 0; }
          }

          @keyframes processRailGlow {
            0%, 5% { transform: scaleX(.05); opacity: .2; }
            82% { transform: scaleX(1); opacity: 1; }
            90%, 100% { transform: scaleX(.05); opacity: 0; }
          }

          @keyframes processRipple {
            0%, 8% { opacity: 0; transform: scale(.7); }
            14% { opacity: .8; transform: scale(1); }
            25%, 100% { opacity: 0; transform: scale(1.55); }
          }

          @keyframes processIconIdle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }

          @keyframes processMobilePacket {
            from { left: 0%; }
            to { left: calc(100% - 7px); }
          }

          @keyframes processMobileFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }

          @media (prefers-reduced-motion: reduce) {
            .process-packet,
            .process-packet-trail,
            .process-rail-glow,
            .process-icon,
            .process-ripple,
            .process-mobile-flow,
            .process-mobile-packet {
              animation: none;
            }

            .process-packet { left: 50%; opacity: 1; }
            .process-rail-glow { transform: scaleX(1); opacity: .7; }
          }
        `}</style>

    </section>
  );
}
