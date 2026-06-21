import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest border-t border-border-subtle"
    >
      <div 
        ref={contentRef}
        className="max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-display-xl md:text-display-xl text-primary uppercase mb-8" style={{ opacity: 0 }}>
          Initiate Dialogue
        </h2>
        <p className="font-body-lg text-body-lg text-secondary mb-12 max-w-xl" style={{ opacity: 0 }}>
          Partner with Silhouette India to redefine your strategic trajectory and visual identity.
        </p>
        <a 
          className="inline-flex items-center justify-center px-12 py-5 bg-primary text-on-primary rounded-full font-headline-md text-[16px] md:text-headline-md hover:bg-inverse-surface hover:scale-95 transition-all duration-300 cursor-pointer" 
          href="mailto:contact@silhouetteindia.com"
          style={{ opacity: 0 }}
        >
          Contact Our Partners
        </a>
      </div>
    </section>
  );
}
