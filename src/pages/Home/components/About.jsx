import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const chipsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the left column title
      gsap.fromTo(titleRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Animate the right column content and chips
      gsap.fromTo([textRef.current, chipsRef.current?.children],
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-b border-border-subtle"
    >
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-start text-left">
        {/* Left column title */}
        <div ref={titleRef} className="md:col-span-4 mb-8 md:mb-0" style={{ opacity: 0 }}>
          <h2 className="font-headline-md text-headline-md text-primary uppercase border-t border-primary pt-4 inline-block">
            We Are<br />Silhouette India
          </h2>
        </div>

        {/* Right column description */}
        <div className="md:col-span-8">
          <p 
            ref={textRef} 
            className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary"
            style={{ opacity: 0 }}
          >
            An authoritative consultancy designed for the modern enterprise. We strip away the unnecessary, focusing entirely on the quality of strategic insights and high-production-value execution. Our approach is minimalist, bold, and definitive.
          </p>

          {/* Capability Chips */}
          <div 
            ref={chipsRef}
            className="mt-12 flex gap-4 flex-wrap"
          >
            <span className="inline-block px-4 py-2 border border-primary font-label-caps text-label-caps uppercase tracking-widest text-primary bg-transparent" style={{ opacity: 0 }}>
              Business Intelligence
            </span>
            <span className="inline-block px-4 py-2 border border-primary font-label-caps text-label-caps uppercase tracking-widest text-primary bg-transparent" style={{ opacity: 0 }}>
              Media Production
            </span>
            <span className="inline-block px-4 py-2 border border-primary font-label-caps text-label-caps uppercase tracking-widest text-primary bg-transparent" style={{ opacity: 0 }}>
              Strategic Design
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
