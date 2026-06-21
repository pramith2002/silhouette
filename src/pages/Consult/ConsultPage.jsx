import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import LightRays from '../../components/ui/LightRays/LightRays';
import ConsultServices from './ConsultServices';

export default function ConsultPage({ isDark }) {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const aboutRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutTextRef = useRef(null);

  // Entrance animations for the Hero and About sections
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0); // Reset scroll position when loading page
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

      // 2. About Section Animations
      gsap.fromTo(aboutTitleRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      gsap.fromTo(aboutTextRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="w-full bg-background min-h-screen text-primary">
      {/* 1. HERO SECTION */}
      <header
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-border-subtle bg-surface"
      >
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
          {/* Left Column: Headline and description */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
              Strategic Architecture
            </span>
            <h1
              ref={titleRef}
              className="font-display-xl text-[44px] leading-[1.1] md:text-[76px] md:leading-[1.05] lg:text-[88px] lg:leading-[1.02] xl:text-[96px] xl:leading-[0.98] text-primary font-black uppercase tracking-tighter mb-8 flex flex-col"
              style={{ opacity: 0 }}
            >
              <span>The Art Of</span>
              <span className="font-light italic text-secondary my-1">Precision</span>
              <span>Consulting.</span>
            </h1>
            <p
              ref={textRef}
              className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed mb-10"
              style={{ opacity: 0 }}
            >
              We decode complex market signals into cinematic brand narratives. SILHOUETTE INDIA exists at the intersection of business intelligence and high-production value.
            </p>
            <div
              ref={buttonsRef}
              className="flex flex-wrap gap-4 items-center"
              style={{ opacity: 0 }}
            >
              <button className="px-8 py-3.5 bg-primary text-on-primary rounded-full font-headline-md text-body-md font-bold hover:bg-inverse-surface hover:scale-95 transition-all duration-300 shadow-md cursor-pointer">
                Start Project
              </button>
              <button className="px-8 py-3.5 border border-primary text-primary bg-transparent rounded-full font-headline-md text-body-md font-bold hover:bg-surface-container transition-all duration-300 cursor-pointer">
                Our Thesis
              </button>
            </div>
          </div>

          {/* Right Column: Empty space for 3D asset */}
          <div
            ref={canvasContainerRef}
            className="lg:col-span-5 relative min-h-[300px] lg:min-h-0 flex items-center justify-center"
          >
            {/* 3D Asset container placeholder */}
          </div>
        </div>
      </header>

      {/* 2. ABOUT SECTION */}
      <section
        ref={aboutRef}
        id="about-consult"
        className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-b border-border-subtle"
      >
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-start text-left">
          {/* Left column title */}
          <div ref={aboutTitleRef} className="md:col-span-4 mb-8 md:mb-0" style={{ opacity: 0 }}>
            <h2 className="font-headline-md text-headline-md text-primary uppercase border-t border-primary pt-4 inline-block">
              Defining<br />The Paradigm
            </h2>
          </div>

          {/* Right column description */}
          <div className="md:col-span-8">
            <p
              ref={aboutTextRef}
              className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary leading-tight"
              style={{ opacity: 0 }}
            >
              Consulting is not about templates; it is about absolute precision. We audit, restructure, and amplify your brand identity across all media verticals. By blending business models with cinematic aesthetics, we make your message impossible to ignore.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SCROLL-BASED STACKING SERVICES ANIMATION */}
      <ConsultServices />

      {/* 4. DEFINE YOUR TRAJECTORY CALL TO ACTION */}
      <section className="py-28 px-margin-mobile md:px-margin-desktop bg-surface text-primary border-b border-border-subtle flex flex-col items-center justify-center text-center">
        <span className="font-label-caps text-[13px] tracking-widest text-secondary uppercase mb-6 block">
          Ready to commence?
        </span>
        <h2 className="font-headline-lg-mobile text-[48px] md:font-display-xl md:text-[80px] font-black tracking-tight text-primary uppercase leading-none mb-16 max-w-4xl">
          Define your<br className="hidden md:block" /> trajectory.
        </h2>
        <div className="flex flex-wrap gap-x-10 gap-y-6 justify-center items-center">
          <a
            href="/#contact"
            className="font-headline-md text-[18px] md:text-[22px] font-bold text-primary group flex items-center gap-2 border-b border-primary pb-1.5 hover:opacity-80 transition-all duration-300"
          >
            Consultation <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
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
