import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Partners({ isDark }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header scroll reveal
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Grid items staggered reveal
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const logoUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBgP2VLwLmT5m3GMxM0531tCHqvAyQFVSOp9gs_h0LPJO6Sv1xk0a_Zut02lGCmH1FE-75I5EIbVG1owoclF1NK2v3OU6r4YuzRVh2ZBTGhlNHAPTx8sBhuCQ3880NbfAZe9dEKNLK2cHWMpu5ti56fuGycQnpuCvfNrKZEuWddX-z-0_nqikm5p_wzNkEs6KC0-3SYKYVWHBRhv0Wuei2T725EZN35_DRhTYjO9RPdkM9bmuaA2WImY--zkYZUWkRrX3Ydru2kwLc';

  const partners = [
    { name: 'Chintamanis', delayClass: 'float-anim-delay-1' },
    { name: 'TNS Jewellers', delayClass: 'float-anim-delay-2' },
    { name: 'Kalpana VJ', delayClass: 'float-anim-delay-3' },
    { name: 'Kirtilals', delayClass: 'float-anim-delay-4' },
    { name: 'Glow by Kirtilals', delayClass: '' }
  ];

  return (
    <section 
      id="partners"
      ref={sectionRef}
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-primary border-t border-on-primary/20 overflow-hidden"
    >
      <div className="max-w-container-max mx-auto text-center">
        {/* Title */}
        <h2 
          ref={headerRef}
          className="font-headline-lg-mobile text-headline-lg-mobile md:font-display-xl md:text-display-xl text-on-primary uppercase mb-16"
          style={{ opacity: 0 }}
        >
          Strategic Partners
        </h2>

        {/* Logos Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center justify-center"
        >
          {partners.map((partner) => (
            <div key={partner.name} className="flex justify-center" style={{ opacity: 0 }}>
              <div className={`float-anim ${partner.delayClass} w-full max-w-[140px] md:max-w-full`}>
                <img 
                  alt={`${partner.name} Logo`} 
                  className={`w-full h-24 object-contain filter grayscale opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer ${
                    !isDark ? 'invert' : ''
                  }`} 
                  src={logoUrl}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
