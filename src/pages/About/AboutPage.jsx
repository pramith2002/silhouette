import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Sparkle, Shield, Cpu, RefreshCw, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import LightRays from '../../components/ui/LightRays/LightRays';

// Import team member images provided by the user
import sriHarshaImg from '../../assets/people/Glow-14-1024x683.jpg';
import swapnaaImg from '../../assets/people/Glow-18-1024x683.jpg';
import chethanImg from '../../assets/people/Glow-24-1024x683.jpg';
import dakshaImg from '../../assets/people/Glow-25.jpg';
import nireekshithImg from '../../assets/people/Glow-27-1024x683.jpg';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Sri Harsha",
    role: "Founder",
    bio: "30+ years across automobiles, FMCG, advertising, events, photography and filmmaking.",
    image: sriHarshaImg
  },
  {
    name: "Swapnaa Puujari",
    role: "Co-Founder",
    bio: "Brand builder, entrepreneur and creative strategist with experience launching and promoting over 100 brands.",
    image: swapnaaImg
  },
  {
    name: "Chethan Basavaraju",
    role: "Co-Founder & Photographer",
    bio: "Celebrity photographer with expertise in fashion, advertising, architecture and product photography.",
    image: chethanImg
  },
  {
    name: "Daksha Ganapathy",
    role: "Head of Business",
    bio: "Fashion management specialist leading business development and social growth initiatives.",
    image: dakshaImg
  },
  {
    name: "Nireekshith",
    role: "Creative Director – Films",
    bio: "Filmmaker specialising in direction, editing, colour and cinematic storytelling.",
    image: nireekshithImg
  }
];

const processSteps = [
  { step: "01", title: "INSIGHT", desc: "Understand" },
  { step: "02", title: "STRATEGY", desc: "Plan" },
  { step: "03", title: "CREATION", desc: "Design & Produce" },
  { step: "04", title: "COMMUNICATION", desc: "Distribute" },
  { step: "05", title: "IMPACT", desc: "Influence" }
];

const differentiators = [
  {
    num: "01",
    title: "Business First",
    desc: "Every creative decision begins with business objectives.",
    icon: <Shield className="w-6 h-6 text-primary" />
  },
  {
    num: "02",
    title: "Integrated Thinking",
    desc: "Consulting, production and communication under one roof.",
    icon: <Cpu className="w-6 h-6 text-primary" />
  },
  {
    num: "03",
    title: "Industry Experience",
    desc: "Decades of expertise across multiple sectors.",
    icon: <RefreshCw className="w-6 h-6 text-primary" />
  },
  {
    num: "04",
    title: "Execution Capability",
    desc: "From strategy to production to launch.",
    icon: <Zap className="w-6 h-6 text-primary" />
  }
];

const cities = ["MYSORE", "BANGALORE", "GOA", "CHENNAI", "HYDERABAD"];

export default function AboutPage({ isDark }) {
  const pageRef = useRef(null);
  
  // Ref anchors for GSAP scroll triggers
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroTextRef = useRef(null);

  const introSectionRef = useRef(null);
  const introLeftRef = useRef(null);
  const introRightRef = useRef(null);

  const cccSectionRef = useRef(null);
  const cccTitleRef = useRef(null);
  const cccConnectorRef = useRef(null);

  const philosophySectionRef = useRef(null);
  
  const legacySectionRef = useRef(null);
  const legacyNumberRef = useRef(null);
  const legacyTextRef = useRef(null);

  const diffSectionRef = useRef(null);
  const presenceSectionRef = useRef(null);

  // Carousel slider state
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const mobileScrollRef = useRef(null);

  // Auto-change slider every 4 seconds unless paused by hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % teamMembers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Synchronize mobile scroll container with activeSlide
  useEffect(() => {
    if (mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const card = container.querySelector('.snap-center');
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 16; // gap-4 is 16px
        container.scrollTo({
          left: activeSlide * (cardWidth + gap),
          behavior: 'smooth'
        });
      }
    }
  }, [activeSlide]);

  useEffect(() => {
    // Scroll to top on mount
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal
      const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      heroTl.fromTo(heroTitleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, delay: 0.3 }
      );
      heroTl.fromTo(heroTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.9'
      );

      // 2. Who We Are Entrance
      gsap.fromTo(introLeftRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: introSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
      
      gsap.fromTo(introRightRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: introSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 3. Consult -> Create -> Communicate Connective Animations
      gsap.fromTo('.ccc-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.25,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cccSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Connective line scale-Y animation
      gsap.fromTo('.ccc-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          duration: 1.2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: cccSectionRef.current,
            start: 'top 65%',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );

      // 4. Philosophy Steps
      gsap.fromTo('.philo-node',
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: philosophySectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 5. Legacy Section (30+ counter & paragraph)
      const legacyTl = gsap.timeline({
        scrollTrigger: {
          trigger: legacySectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
      legacyTl.fromTo(legacyNumberRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: 'power4.out' }
      );
      legacyTl.fromTo(legacyTextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );

      // 6. Why Silhouette differentiators
      gsap.fromTo('.diff-card',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: diffSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 7. Presence: sequentially reveal cities
      gsap.fromTo('.presence-city',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: presenceSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Team Carousel Slider handlers for desktop drag
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && activeSlide < teamMembers.length - 1) {
      setActiveSlide(prev => prev + 1);
    } else if (info.offset.x > swipeThreshold && activeSlide > 0) {
      setActiveSlide(prev => prev - 1);
    }
  };

  const nextSlide = () => {
    if (activeSlide < teamMembers.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const prevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  return (
    <div ref={pageRef} className="w-full bg-background min-h-screen text-primary overflow-x-hidden">
      
      {/* SECTION 01: HERO */}
      <header
        ref={heroRef}
        className="relative h-[85vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-border-subtle bg-surface-container-lowest"
      >
        {/* Cinematic zoom background overlay image */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden bg-black">
          <motion.img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Silhouette Cinematic Hub"
            className="w-full h-full object-cover grayscale brightness-[0.25]"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 12, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        {isDark && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={0.6}
              lightSpread={0.5}
              rayLength={1.2}
              followMouse={true}
              mouseInfluence={0.03}
              noiseAmount={0.01}
              distortion={0.02}
              className="w-full h-full opacity-30"
            />
          </div>
        )}

        <div className="z-10 w-full max-w-container-max mx-auto text-left mt-24">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
            ABOUT SILHOUETTE
          </span>
          <h1
            ref={heroTitleRef}
            className="font-display-xl text-[44px] leading-[1.05] md:text-[76px] lg:text-[88px] xl:text-[96px] text-white font-black uppercase tracking-tighter mb-8 max-w-5xl flex flex-col"
            style={{ opacity: 0 }}
          >
            <span>THE ART OF</span>
            <span className="font-light italic text-neutral-400 my-1">BUILDING</span>
            <span>INFLUENCE.</span>
          </h1>
          <p
            ref={heroTextRef}
            className="font-body-lg text-body-lg text-neutral-300 max-w-2xl leading-relaxed"
            style={{ opacity: 0 }}
          >
            Silhouette India was founded on a simple belief: powerful brands are built when strategic thinking, creative execution, and meaningful communication work together.
          </p>
        </div>
      </header>

      {/* SECTION 02: WHO WE ARE */}
      <section
        ref={introSectionRef}
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start text-left">
          {/* Left Column Statements */}
          <div ref={introLeftRef} className="lg:col-span-6 space-y-4">
            <h2 className="font-headline-lg-mobile text-[32px] md:font-headline-lg md:text-[48px] font-black text-primary uppercase leading-tight select-none">
              We are not a traditional <span className="text-secondary font-light italic">consultancy.</span>
            </h2>
            <h2 className="font-headline-lg-mobile text-[32px] md:font-headline-lg md:text-[48px] font-black text-primary uppercase leading-tight select-none">
              We are not a traditional <span className="text-secondary font-light italic">production house.</span>
            </h2>
            <h2 className="font-headline-lg-mobile text-[32px] md:font-headline-lg md:text-[48px] font-black text-primary uppercase leading-tight select-none">
              We are not a traditional <span className="text-secondary font-light italic">agency.</span>
            </h2>
          </div>

          {/* Right Column Statement Paragraph */}
          <div ref={introRightRef} className="lg:col-span-6 mt-8 lg:mt-0 flex flex-col justify-center h-full">
            <div className="border-l-2 border-primary pl-6 py-2">
              <p className="font-headline-lg-mobile text-[22px] md:font-headline-lg md:text-[28px] text-secondary leading-relaxed font-light">
                Silhouette India operates at the intersection of business intelligence, visual storytelling, and strategic communication. We help brands move from ideas to execution and from visibility to influence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: CONSULT → CREATE → COMMUNICATE FLOW */}
      <section
        ref={cccSectionRef}
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-b border-border-subtle relative"
      >
        <div className="max-w-container-max mx-auto text-left relative z-10">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block text-center lg:text-left">
            Operational Flow
          </span>
          <h2
            ref={cccTitleRef}
            className="font-headline-lg text-[36px] md:text-[48px] uppercase font-black text-primary mb-20 text-center lg:text-left"
          >
            Progression Model
          </h2>

          {/* Connected Pathway container */}
          <div className="relative flex flex-col items-center lg:items-stretch lg:flex-row justify-between gap-12 lg:gap-8 mt-12">
            
            {/* Horizontal Line Connector (Desktop only) */}
            <div className="hidden lg:block absolute top-[52px] left-[15%] right-[15%] h-[2px] bg-border-subtle z-0">
              <div className="ccc-line w-full h-full bg-primary/45 scale-x-0 origin-left" />
            </div>

            {/* CONSULT CARD */}
            <div className="ccc-card w-full max-w-sm lg:max-w-none flex-1 bg-background border border-border-subtle rounded-2xl p-8 shadow-sm flex flex-col items-center text-center relative z-10 hover:border-primary/45 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-display-xl font-bold flex items-center justify-center mb-6">
                01
              </div>
              <h3 className="font-headline-md text-[22px] font-black uppercase text-primary mb-4 tracking-wider">
                CONSULT
              </h3>
              <div className="w-8 h-[2px] bg-secondary/30 mb-6" />
              <ul className="space-y-3 font-body-lg text-secondary">
                <li className="font-medium text-primary">Strategic Intelligence</li>
                <li>Market Understanding</li>
                <li>Brand Direction</li>
              </ul>
            </div>

            {/* Connective Line (Mobile only) */}
            <div className="lg:hidden flex flex-col items-center gap-1.5 z-10">
              <div className="w-[2px] h-12 bg-border-subtle" />
              <div className="text-secondary font-bold text-sm">↓</div>
              <div className="w-[2px] h-12 bg-border-subtle" />
            </div>

            {/* CREATE CARD */}
            <div className="ccc-card w-full max-w-sm lg:max-w-none flex-1 bg-background border border-border-subtle rounded-2xl p-8 shadow-sm flex flex-col items-center text-center relative z-10 hover:border-primary/45 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-display-xl font-bold flex items-center justify-center mb-6">
                02
              </div>
              <h3 className="font-headline-md text-[22px] font-black uppercase text-primary mb-4 tracking-wider">
                CREATE
              </h3>
              <div className="w-8 h-[2px] bg-secondary/30 mb-6" />
              <ul className="space-y-3 font-body-lg text-secondary">
                <li>Photography</li>
                <li className="font-medium text-primary">Films</li>
                <li>Creative Production</li>
              </ul>
            </div>

            {/* Connective Line (Mobile only) */}
            <div className="lg:hidden flex flex-col items-center gap-1.5 z-10">
              <div className="w-[2px] h-12 bg-border-subtle" />
              <div className="text-secondary font-bold text-sm">↓</div>
              <div className="w-[2px] h-12 bg-border-subtle" />
            </div>

            {/* COMMUNICATE CARD */}
            <div className="ccc-card w-full max-w-sm lg:max-w-none flex-1 bg-background border border-border-subtle rounded-2xl p-8 shadow-sm flex flex-col items-center text-center relative z-10 hover:border-primary/45 transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-display-xl font-bold flex items-center justify-center mb-6">
                03
              </div>
              <h3 className="font-headline-md text-[22px] font-black uppercase text-primary mb-4 tracking-wider">
                COMMUNICATE
              </h3>
              <div className="w-8 h-[2px] bg-secondary/30 mb-6" />
              <ul className="space-y-3 font-body-lg text-secondary">
                <li>Visibility</li>
                <li>Engagement</li>
                <li className="font-medium text-primary">Influence</li>
              </ul>
            </div>

          </div>

          {/* Central message */}
          <div className="mt-16 text-center">
            <p className="font-headline-lg-mobile text-[24px] md:font-headline-lg md:text-[36px] font-black text-primary uppercase tracking-tight">
              We move brands <span className="font-light italic text-secondary">from insight to impact.</span>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 04: OUR PHILOSOPHY */}
      <section
        ref={philosophySectionRef}
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start mb-20">
            {/* Left Header */}
            <div className="lg:col-span-5">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
                PHILOSOPHY
              </span>
              <h2 className="font-display-xl text-[44px] md:text-[56px] font-black text-primary uppercase leading-[1.05] tracking-tighter">
                FROM INSIGHT<br />TO IMPACT.
              </h2>
            </div>
            {/* Right details */}
            <div className="lg:col-span-7 mt-6 lg:mt-12">
              <p className="font-body-lg text-body-lg text-secondary leading-relaxed max-w-2xl">
                Every successful brand begins with understanding. Every compelling story requires execution. Every meaningful result depends on communication.
              </p>
              <p className="font-body-lg text-body-lg text-secondary leading-relaxed max-w-2xl mt-4">
                Our philosophy is built around connecting these three disciplines into one seamless process.
              </p>
            </div>
          </div>

          {/* Interactive timeline map progression */}
          <div className="relative py-12 px-6 bg-surface-container rounded-3xl border border-border-subtle mt-12">
            <div className="absolute top-[50px] left-8 right-8 h-[2px] bg-border-subtle/50 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-4 relative z-10">
              {processSteps.map((step, idx) => (
                <div key={idx} className="philo-node flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                  {/* Top Bullet indicator */}
                  <div className="w-7 h-7 rounded-full border border-primary bg-background flex items-center justify-center font-label-caps text-[11px] font-black text-primary">
                    {step.step}
                  </div>
                  
                  {/* Step parameters */}
                  <div>
                    <h3 className="font-headline-md text-body-md font-bold tracking-widest text-primary uppercase">
                      {step.title}
                    </h3>
                    <p className="font-body-md text-sm text-secondary mt-1">
                      {step.desc}
                    </p>
                  </div>
                  
                  {/* Connecting indicator on mobile */}
                  {idx < processSteps.length - 1 && (
                    <div className="md:hidden text-secondary/45 font-bold">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05: LEGACY & EXPERIENCE */}
      <section
        ref={legacySectionRef}
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface border-b border-border-subtle flex items-center"
      >
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center text-left">
          
          {/* Big Number Left */}
          <div className="lg:col-span-5 flex justify-start lg:justify-center">
            <div
              ref={legacyNumberRef}
              className="text-[120px] md:text-[180px] lg:text-[220px] font-black tracking-tighter text-primary leading-none flex items-baseline select-none"
              style={{ opacity: 0 }}
            >
              <span>30</span>
              <span className="text-secondary font-light font-sans">+</span>
            </div>
          </div>

          {/* Text Description Right */}
          <div ref={legacyTextRef} className="lg:col-span-7 space-y-6" style={{ opacity: 0 }}>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary block">
              LEGACY & EXPERIENCE
            </span>
            <h2 className="font-headline-lg-mobile text-[36px] md:font-headline-lg md:text-[48px] font-black text-primary uppercase leading-tight">
              EXPERIENCE THAT SHAPES PERSPECTIVE
            </h2>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed max-w-2xl">
              For more than three decades, Silhouette India has worked across industries including hospitality, real estate, fashion, jewellery, automobiles, FMCG, education and emerging businesses.
            </p>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed max-w-2xl font-semibold text-primary">
              This diverse experience allows us to understand not only how brands look, but how they grow.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 06: THE TEAM */}
      <section
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
                THE MINDSHARE
              </span>
              <h2 className="font-headline-lg text-[36px] md:text-[48px] uppercase font-black text-primary">
                THE TEAM
              </h2>
            </div>
            
            {/* Desktop Navigation buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={prevSlide}
                disabled={activeSlide === 0}
                className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-surface-container text-primary transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                aria-label="Previous profile"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                disabled={activeSlide === teamMembers.length - 1}
                className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-surface-container text-primary transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                aria-label="Next profile"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* DESKTOP CAROUSEL VIEW (Adjacent Cards Partially Visible, Center card focused) */}
          <div 
            className="hidden md:block relative h-[560px] w-full overflow-hidden select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: -1000, right: 1000 }}
              onDragEnd={handleDragEnd}
              className="flex items-center absolute cursor-grab active:cursor-grabbing h-full"
              style={{
                left: "50%",
                // Calculate dynamic horizontal offset to anchor the active card perfectly center
                x: `calc(-220px - ${activeSlide * 480}px)` 
              }}
              animate={{ x: `calc(-220px - ${activeSlide * 480}px)` }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.95 }}
            >
              {teamMembers.map((member, index) => {
                const isActive = index === activeSlide;
                return (
                  <motion.div
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className="w-[440px] h-[500px] mx-[20px] rounded-3xl overflow-hidden border border-border-subtle bg-surface-container-low flex flex-col justify-end p-8 relative flex-shrink-0 origin-center cursor-pointer"
                    animate={{
                      scale: isActive ? 1.04 : 0.93,
                      opacity: isActive ? 1.0 : 0.45,
                    }}
                    transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Background portrait */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <motion.img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale brightness-[0.35]"
                        animate={{
                          scale: isActive ? 1.06 : 1.0
                        }}
                        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>

                    {/* Details overlay */}
                    <div className="relative z-10 text-white space-y-2">
                      <span className="font-label-caps text-xs text-white/50 uppercase tracking-widest block">
                        {member.role}
                      </span>
                      <h3 className="font-headline-md text-2xl font-black uppercase text-white">
                        {member.name}
                      </h3>
                      <p className="font-body-md text-sm text-white/80 leading-relaxed font-light pt-2 border-t border-white/10">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* MOBILE CAROUSEL VIEW (Swipe carousel: one profile per screen) */}
          <div 
            className="md:hidden w-full overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div 
              ref={mobileScrollRef}
              className="flex gap-4 snap-x snap-mandatory overflow-x-auto pb-6 scroll-smooth select-none scrollbar-none" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="snap-center w-full flex-shrink-0 bg-surface-container-low border border-border-subtle rounded-2xl p-6 relative aspect-[3/4] flex flex-col justify-end overflow-hidden"
                >
                  {/* Portrait */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale brightness-[0.35]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  </div>
                  {/* Description */}
                  <div className="relative z-10 text-white space-y-2">
                    <span className="font-label-caps text-[11px] text-white/50 uppercase tracking-wider block">
                      {member.role}
                    </span>
                    <h3 className="font-headline-md text-xl font-bold uppercase text-white">
                      {member.name}
                    </h3>
                    <p className="font-body-md text-xs text-white/70 leading-relaxed pt-2 border-t border-white/10">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07: WHY SILHOUETTE */}
      <section
        ref={diffSectionRef}
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto text-left">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
            DIFFERENTIATORS
          </span>
          <h2 className="font-headline-lg text-[36px] md:text-[48px] uppercase font-black text-primary mb-20">
            WHAT MAKES US DIFFERENT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, index) => (
              <div
                key={index}
                className="diff-card bg-background border border-border-subtle rounded-2xl p-8 flex flex-col hover:border-primary/45 transition-colors duration-300 shadow-sm"
                style={{ opacity: 0 }}
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center mb-6">
                  {diff.icon}
                </div>
                <span className="font-label-caps text-xs text-secondary font-black mb-1">
                  {diff.num}
                </span>
                <h3 className="font-headline-md text-lg font-black uppercase text-primary mb-3">
                  {diff.title}
                </h3>
                <p className="font-body-md text-sm text-secondary leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 08: OUR PRESENCE */}
      <section
        ref={presenceSectionRef}
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto text-left">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
            OUR PRESENCE
          </span>
          <h2 className="font-headline-lg text-[36px] md:text-[48px] uppercase font-black text-primary mb-16">
            WHERE WE OPERATE
          </h2>

          {/* Large typography display for operational hubs */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            {cities.map((city, index) => (
              <div
                key={index}
                className="presence-city border-b border-border-subtle/40 pb-4 md:pb-6 last:border-b-0 flex items-baseline justify-between group cursor-default"
                style={{ opacity: 0 }}
              >
                <span className="font-display-xl text-[48px] md:text-[80px] lg:text-[100px] leading-none font-black text-transparent hover:text-primary transition-all duration-500 uppercase select-none"
                  style={{ WebkitTextStroke: "1px var(--color-primary)" }}
                >
                  {city}
                </span>
                <span className="font-label-caps text-xs text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest hidden md:block">
                  OPERATIONAL HUB // 0{index + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-border-subtle pt-8">
            <p className="font-headline-lg-mobile text-[18px] md:font-headline-lg md:text-[22px] font-semibold text-secondary">
              Serving clients across India and international markets.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 09: INITIATE DIALOGUE CTA */}
      <section className="py-28 px-margin-mobile md:px-margin-desktop bg-surface text-primary border-b border-border-subtle flex flex-col items-center justify-center text-center">
        <span className="font-label-caps text-[13px] tracking-widest text-secondary uppercase mb-6 block">
          Ready to commence?
        </span>
        <h2 className="font-headline-lg-mobile text-[48px] md:font-display-xl md:text-[80px] font-black tracking-tight text-primary uppercase leading-none mb-4 max-w-4xl">
          INITIATE DIALOGUE
        </h2>
        <p className="font-body-lg text-body-lg text-secondary max-w-xl leading-relaxed mb-16">
          The strongest brands are built through clarity, creativity, and communication.
        </p>

        <div className="flex justify-center items-center">
          <a
            href="/#contact"
            className="font-headline-md text-[18px] md:text-[22px] font-bold text-primary group flex items-center gap-2 border-b border-primary pb-1.5 hover:opacity-80 transition-all duration-300"
          >
            Start a Conversation <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </section>

    </div>
  );
}
