import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkle, Target, Send, Layers, MessageSquare, Award } from 'lucide-react';
import LightRays from '../../components/ui/LightRays/LightRays';

gsap.registerPlugin(ScrollTrigger);

const capabilitiesData = [
  {
    num: "01",
    title: "BRAND NARRATIVE",
    subItems: ["Messaging", "Positioning", "Story Development"],
    description: "Building memorable stories that define perception and create emotional relevance.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop",
    icon: <MessageSquare className="w-6 h-6 text-white" />
  },
  {
    num: "02",
    title: "PUBLIC RELATIONS",
    subItems: ["Media Outreach", "Industry Authority", "Reputation Building"],
    description: "Securing key placements and building thought leadership that cultivates industry credibility.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    icon: <Award className="w-6 h-6 text-white" />
  },
  {
    num: "03",
    title: "DIGITAL PRESENCE",
    subItems: ["Content Systems", "Social Platforms", "Audience Growth"],
    description: "Designing content systems and social platforms that translate raw attention into lasting loyalty.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    icon: <Layers className="w-6 h-6 text-white" />
  },
  {
    num: "04",
    title: "EXPERIENTIAL ACTIVATIONS",
    subItems: ["Events", "Launches", "Brand Experiences"],
    description: "Orchestrating bespoke physical events and installations that foster deep audience affinity.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    icon: <Target className="w-6 h-6 text-white" />
  },
  {
    num: "05",
    title: "DISTRIBUTION STRATEGY",
    subItems: ["Channel Selection", "Audience Mapping", "Campaign Amplification"],
    description: "Deploying campaigns and selecting channels to ensure the message reaches the right target.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    icon: <Send className="w-6 h-6 text-white" />
  }
];

const timelineSteps = [
  {
    step: "01",
    title: "INSIGHT",
    description: "Auditing current brand assets, analyzing market gaps, and defining direct channels to key demographics."
  },
  {
    step: "02",
    title: "POSITIONING",
    description: "Formulating a distinct brand voice and framing your narrative parameters against competitors."
  },
  {
    step: "03",
    title: "CONTENT",
    description: "Developing high-fidelity messaging pillars, key releases, and cinematic visual assets."
  },
  {
    step: "04",
    title: "DISTRIBUTION",
    description: "Deploying communication networks, scheduling PR pipelines, and activating social engines."
  },
  {
    step: "05",
    title: "ENGAGEMENT",
    description: "Measuring audience resonance, fostering conversations, and cultivating brand affinity."
  },
  {
    step: "06",
    title: "IMPACT",
    description: "Elevating overall brand authority, establishing visibility, and solidifying market dominance."
  }
];

const outcomesData = [
  {
    title: "VISIBILITY",
    description: "Ensuring brands are seen by the right audience."
  },
  {
    title: "AUTHORITY",
    description: "Building trust and category leadership."
  },
  {
    title: "ENGAGEMENT",
    description: "Creating meaningful audience interaction."
  },
  {
    title: "CONVERSION",
    description: "Transforming attention into action."
  },
  {
    title: "REPUTATION",
    description: "Strengthening long-term brand perception."
  }
];

export default function CommunicatePage({ isDark }) {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  const strategicSectionRef = useRef(null);
  const strategicTitleRef = useRef(null);
  const strategicTextRef = useRef(null);

  const capabilitiesRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineHeaderRef = useRef(null);

  const outcomesRef = useRef(null);
  const outcomesHeaderRef = useRef(null);

  const [activeCapIndex, setActiveCapIndex] = useState(0);

  useEffect(() => {
    // Scroll to top on load
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
      // 1. Hero Animations
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.2 }
      );
      tl.fromTo(textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      );
      tl.fromTo(buttonsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      // 2. Strategic Statement Animations
      gsap.fromTo(strategicTitleRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: strategicSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo(strategicTextRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: strategicSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. Capabilities Showcase Animation
      gsap.fromTo(capabilitiesRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: capabilitiesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 4. Timeline Header & Steps Animation
      gsap.fromTo(timelineHeaderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.timeline-node-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.timeline-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 5. Outcomes Header & Staggered Column Animation
      gsap.fromTo(outcomesHeaderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: outcomesRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      gsap.fromTo('.outcome-col',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1, // corresponds to 0ms, 100ms, 200ms, 300ms, 400ms reveals
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.outcomes-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full bg-background min-h-screen text-primary overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-border-subtle bg-surface">
        {isDark && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.8}
              lightSpread={0.5}
              rayLength={1.3}
              followMouse={true}
              mouseInfluence={0.05}
              noiseAmount={0.01}
              distortion={0.02}
              className="w-full h-full opacity-40"
            />
          </div>
        )}

        <div className="z-10 w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-24">
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block animate-pulse">
              Communication Architecture
            </span>
            <h1
              ref={titleRef}
              className="font-display-xl text-[44px] leading-[1.1] md:text-[76px] md:leading-[1.05] lg:text-[88px] lg:leading-[1.02] xl:text-[96px] xl:leading-[0.98] text-primary font-black uppercase tracking-tighter mb-8 flex flex-col"
              style={{ opacity: 0 }}
            >
              <span>The Art Of</span>
              <span className="font-light italic text-secondary my-1">Influence.</span>
            </h1>
            <p
              ref={textRef}
              className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed mb-10"
              style={{ opacity: 0 }}
            >
              Every brand has a story. Few know how to tell it. We design communication systems that transform strategy into visibility, credibility, and market impact.
            </p>
            <div
              ref={buttonsRef}
              className="flex flex-wrap gap-4 items-center"
              style={{ opacity: 0 }}
            >
              <a
                href="#about-communicate"
                className="px-8 py-3.5 bg-primary text-on-primary rounded-full font-headline-md text-body-md font-bold hover:bg-inverse-surface hover:scale-95 transition-all duration-300 shadow-md cursor-pointer inline-flex items-center"
              >
                Our Intent
              </a>
              <a
                href="#capabilities"
                className="px-8 py-3.5 border border-primary text-primary bg-transparent rounded-full font-headline-md text-body-md font-bold hover:bg-surface-container transition-all duration-300 cursor-pointer inline-flex items-center"
              >
                Explore Capabilities
              </a>
            </div>
          </div>
          
          {/* Subtle Abstract Floating Graphic Column (Right) */}
          <div className="lg:col-span-4 relative min-h-[250px] lg:min-h-0 hidden lg:flex items-center justify-center">
            <div className="relative w-72 h-72 rounded-full border border-primary/10 flex items-center justify-center animate-pulse duration-[6s]">
              <div className="w-56 h-56 rounded-full border border-primary/20 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-primary/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center">
                    <Sparkle className="w-8 h-8 text-primary animate-spin" style={{ animationDuration: '20s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. STRATEGIC STATEMENT SECTION */}
      <section
        ref={strategicSectionRef}
        id="about-communicate"
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-start text-left">
          <div ref={strategicTitleRef} className="md:col-span-4 mb-8 md:mb-0" style={{ opacity: 0 }}>
            <h2 className="font-headline-md text-headline-md text-primary uppercase border-t border-primary pt-4 inline-block">
              Communicate<br />With Intention
            </h2>
          </div>

          <div className="md:col-span-8">
            <p
              ref={strategicTextRef}
              className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary leading-tight font-medium"
              style={{ opacity: 0 }}
            >
              Communication is not content production. It is the deliberate shaping of perception across every audience touchpoint.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES SHOWCASE SECTION */}
      <section
        ref={capabilitiesRef}
        id="capabilities"
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background border-b border-border-subtle"
        style={{ opacity: 0 }}
      >
        <div className="max-w-container-max mx-auto text-left">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
            Capabilities
          </span>
          <h2 className="font-headline-lg text-headline-lg uppercase text-primary mb-16">
            Our Architecture
          </h2>

          {/* DESKTOP LAYOUT (Original split style with outlines and sparkles) */}
          <div className="hidden lg:grid grid-cols-12 gap-gutter items-stretch">
            
            {/* Left Column: Vertical tabs */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-3 pr-0 lg:pr-8">
              {capabilitiesData.map((cap, index) => {
                const isActive = index === activeCapIndex;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveCapIndex(index)}
                    onMouseEnter={() => setActiveCapIndex(index)}
                    className="group flex items-center text-left w-full focus:outline-none transition-all duration-300 cursor-pointer py-4 border-b border-border-subtle last:border-b-0"
                  >
                    {/* Active Indicator Icon */}
                    <div className="w-8 flex-shrink-0 flex items-center justify-start">
                      <div
                        className={`transition-all duration-300 ${
                          isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                        }`}
                      >
                        <Sparkle className="w-5 h-5 fill-primary text-primary" />
                      </div>
                    </div>
                    
                    {/* Outlined / Solid typography */}
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[11px] tracking-widest text-secondary mb-1">
                        {cap.num}
                      </span>
                      <span
                        className={`font-headline-md text-[24px] xl:text-[28px] leading-tight uppercase transition-all duration-300 select-none ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-transparent font-medium group-hover:text-primary/40"
                        }`}
                        style={{
                          WebkitTextStroke: isActive ? "none" : "1px var(--color-primary)",
                          opacity: isActive ? 1 : 0.3,
                        }}
                      >
                        {cap.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Displaying selected capability info */}
            <div className="lg:col-span-7 flex items-center mt-8 lg:mt-0">
              <div className="w-full relative min-h-[480px] rounded-3xl overflow-hidden border border-border-subtle bg-surface-container flex flex-col justify-end">
                <AnimatePresence mode="wait">
                  {capabilitiesData.map((cap, index) => {
                    if (index !== activeCapIndex) return null;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 w-full h-full flex flex-col justify-end p-8 md:p-12 text-white"
                      >
                        {/* Image background with Grayscale Overlay */}
                        <div className="absolute inset-0 z-0">
                          <img
                            src={cap.image}
                            alt={cap.title}
                            className="w-full h-full object-cover grayscale brightness-[0.25] transition-transform duration-[8s] scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                              {cap.icon}
                            </div>
                            <div>
                              <span className="font-label-caps text-[12px] tracking-widest text-white/50 block">
                                Capability // {cap.num}
                              </span>
                              <h3 className="font-headline-md text-headline-md uppercase font-bold text-white leading-none mt-1">
                                {cap.title}
                              </h3>
                            </div>
                          </div>

                          <p className="font-body-lg text-body-lg text-white/80 leading-relaxed max-w-xl">
                            {cap.description}
                          </p>

                          {/* Sub-Items tag grid */}
                          <div className="flex flex-wrap gap-2.5 pt-2">
                            {cap.subItems.map((item, itemIdx) => (
                              <span
                                key={itemIdx}
                                className="font-label-caps text-[11px] border border-white/25 bg-white/5 px-4 py-2 rounded-full uppercase tracking-wider text-white hover:bg-white/10 transition-colors duration-300"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* MOBILE LAYOUT (Vertical Stack Accordion) */}
          <div className="lg:hidden flex flex-col gap-2">
            {capabilitiesData.map((cap, index) => {
              const isOpen = index === activeCapIndex;
              return (
                <div 
                  key={index} 
                  className="border-b border-border-subtle last:border-b-0 py-3"
                >
                  <button
                    onClick={() => setActiveCapIndex(isOpen ? null : index)}
                    className="w-full py-4 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-label-caps text-xs text-secondary font-black">{cap.num}</span>
                      <span className={`font-headline-md text-lg uppercase font-bold tracking-tight text-primary transition-colors duration-300`}>
                        {cap.title}
                      </span>
                    </div>
                    <span className="text-xl font-bold font-mono text-secondary pr-2">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2 pb-6 space-y-4 pr-2">
                      {/* Image scales slightly on open */}
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
                        <motion.img
                          animate={{ scale: isOpen ? 1.05 : 1.0 }}
                          transition={{ duration: 0.4 }}
                          src={cap.image}
                          alt={cap.title}
                          className="w-full h-full object-cover grayscale opacity-30"
                        />
                      </div>
                      
                      <p className="font-body-md text-secondary leading-relaxed">
                        {cap.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-1">
                        {cap.subItems.map((sub, sIdx) => (
                          <span 
                            key={sIdx} 
                            className="font-label-caps text-[10px] border border-primary/20 bg-surface px-3 py-1.5 rounded-full uppercase tracking-wider text-primary"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. HORIZONTAL PROCESS TIMELINE SECTION */}
      <section
        ref={timelineRef}
        id="process"
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto text-left">
          <div ref={timelineHeaderRef} className="space-y-4 mb-16" style={{ opacity: 0 }}>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block">
              Operational Flow
            </span>
            <h2 className="font-headline-lg text-headline-lg uppercase text-primary">
              Horizontal Process Timeline
            </h2>
          </div>

          {/* Desktop Timeline Flow */}
          <div className="hidden lg:block relative py-12 timeline-grid">
            {/* central timeline line */}
            <div className="absolute top-[88px] left-0 right-0 h-[2px] bg-border-subtle z-0" />
            
            <div className="grid grid-cols-6 gap-6 relative z-10">
              {timelineSteps.map((step, index) => (
                <div
                  key={index}
                  className="timeline-node-item flex flex-col items-center text-center group cursor-default animate-fade"
                >
                  {/* Step Number Badge */}
                  <span className="font-headline-md text-sm font-black text-secondary mb-4 block group-hover:text-primary transition-colors duration-300">
                    {step.step}
                  </span>

                  {/* Bullet Node on Timeline Line */}
                  <div className="w-6 h-6 rounded-full border-2 border-border-subtle bg-background flex items-center justify-center mb-6 group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                    <div className="w-2.5 h-2.5 rounded-full bg-border-subtle group-hover:bg-primary transition-colors duration-300" />
                  </div>

                  {/* Step Title */}
                  <h3 className="font-headline-md text-body-md font-black tracking-widest text-primary uppercase mb-3">
                    {step.title}
                  </h3>

                  {/* Divider arrow on all but last node */}
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute top-[78px] right-[-12px] transform translate-x-1/2 z-20 text-border-subtle group-hover:text-primary/40 transition-colors duration-300" aria-hidden="true">
                      →
                    </div>
                  )}

                  {/* Step Description */}
                  <p className="font-body-md text-[13px] text-secondary leading-relaxed max-w-[170px] mx-auto group-hover:text-primary transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Vertical Timeline Fallback */}
          <div className="lg:hidden flex flex-col gap-8 timeline-grid pl-4 border-l border-border-subtle relative ml-2">
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className="timeline-node-item relative flex flex-col gap-2 pl-6"
              >
                {/* Visual node marker */}
                <div className="absolute left-[-25px] top-1.5 w-4 h-4 rounded-full border border-primary bg-background flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                
                <div className="flex items-baseline gap-2">
                  <span className="font-label-caps text-xs text-secondary font-black">
                    {step.step}
                  </span>
                  <h3 className="font-headline-md text-[18px] font-black tracking-widest text-primary uppercase">
                    {step.title}
                  </h3>
                </div>

                <p className="font-body-md text-body-md text-secondary leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. OUTCOMES SECTION (New) */}
      <section
        ref={outcomesRef}
        id="outcomes"
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto text-center">
          <div ref={outcomesHeaderRef} className="space-y-4 mb-20" style={{ opacity: 0 }}>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block">
              Why Communication Matters
            </span>
            <h2 className="font-display-xl text-[44px] md:text-[56px] lg:text-[64px] font-black uppercase text-primary tracking-tighter">
              OUTCOMES
            </h2>
          </div>

          {/* Desktop/Tablet 5-Column Grid */}
          <div className="hidden md:grid grid-cols-5 gap-6 outcomes-grid items-stretch">
            {outcomesData.map((outcome, index) => (
              <div
                key={index}
                className="outcome-col flex flex-col p-6 rounded-2xl border border-border-subtle bg-surface-container-low text-left group cursor-default hover:bg-surface-container transition-all duration-500"
                style={{ opacity: 0 }}
              >
                {/* Grow effect on title hover */}
                <h3 className="font-headline-md text-[20px] lg:text-[24px] font-black tracking-tight text-primary uppercase transition-transform duration-300 group-hover:scale-105 origin-left select-none">
                  {outcome.title}
                </h3>
                
                {/* Subtle expanding underline */}
                <div className="h-[2px] bg-primary w-0 group-hover:w-full transition-all duration-500 mt-2 mb-4" />
                
                {/* Description fades brighter on hover */}
                <p className="font-body-md text-[14px] text-secondary leading-relaxed opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Stacking Layout Fallback */}
          <div className="md:hidden flex flex-col gap-6 outcomes-grid items-stretch text-left">
            {outcomesData.map((outcome, index) => (
              <div
                key={index}
                className="outcome-col flex flex-col p-6 rounded-xl border border-border-subtle bg-surface-container-low group cursor-default hover:bg-surface-container transition-all duration-500"
                style={{ opacity: 0 }}
              >
                <h3 className="font-headline-md text-[20px] font-black tracking-tight text-primary uppercase transition-transform duration-300 group-hover:scale-105 origin-left">
                  {outcome.title}
                </h3>
                <div className="h-[2px] bg-primary w-0 group-hover:w-full transition-all duration-500 mt-1 mb-3" />
                <p className="font-body-md text-sm text-secondary leading-relaxed opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. INITIATE DIALOGUE CTA SECTION */}
      <section className="py-28 px-margin-mobile md:px-margin-desktop bg-surface text-primary border-b border-border-subtle flex flex-col items-center justify-center text-center">
        <span className="font-label-caps text-[13px] tracking-widest text-secondary uppercase mb-6 block">
          Ready to commence?
        </span>
        <h2 className="font-headline-lg-mobile text-[48px] md:font-display-xl md:text-[80px] font-black tracking-tight text-primary uppercase leading-none mb-4 max-w-4xl">
          INITIATE DIALOGUE
        </h2>
        <p className="font-body-lg text-body-lg text-secondary max-w-xl leading-relaxed mb-16">
          Transform strategic thinking into meaningful market presence.
        </p>

        <div className="flex flex-wrap gap-x-10 gap-y-6 justify-center items-center">
          <a
            href="/#contact"
            className="font-headline-md text-[18px] md:text-[22px] font-bold text-primary group flex items-center gap-2 border-b border-primary pb-1.5 hover:opacity-80 transition-all duration-300"
          >
            Start a Conversation <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
          <a
            href="mailto:contact@silhouetteindia.com"
            className="font-headline-md text-[18px] md:text-[22px] font-bold text-primary group flex items-center gap-2 border-b border-primary pb-1.5 hover:opacity-80 transition-all duration-300"
          >
            Media Inquiry <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </section>
    </div>
  );
}
