import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LightRays from '../../../components/ui/LightRays/LightRays';

export default function Hero({ isDark }) {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(logoRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.2, delay: 0.2 }
      );
      
      tl.fromTo(titleRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      );

      tl.fromTo(textRef.current, 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );
    }, heroRef);

    return () => ctx.revert(); // Cleanup GSAP animations
  }, []);

  // Placeholder logo URL from original code
  const logoUrl = 'https://lh3.googleusercontent.com/aida/AP1WRLv5iuvUc81ZNlqMnr7NXIPcVFU2tFyin_WXWTs8cLBvuJrWktWXjugNwDjUWykFF06mXwJWsZmjd7T2C_PJ-R1fYPNGqh8vjWjkLaBUMfHUCEdngzyxQGsq9DZ5cxeK8y0VENY0wfQE9xTJxxU9nYI_mwwZMJxYJNUKVQPED11RttqNS_NZ0PAyPrll5dUjroVP87dXtrII85UaTAD06segGZh6CAFMvisjXw-qK0vV-WpZcjEOnzEzTakD';

  return (
    <header 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop overflow-hidden border-b border-border-subtle bg-surface"
    >
      {isDark && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.0}
            lightSpread={0.6}
            rayLength={1.5}
            followMouse={true}
            mouseInfluence={0.06}
            noiseAmount={0.01}
            distortion={0.02}
            className="w-full h-full opacity-60"
          />
        </div>
      )}
      <div className="z-10 flex flex-col items-center text-center w-full max-w-container-max mx-auto mt-20">
        {/* Brand Logo - Inverts color in Dark Mode */}
        <img 
          ref={logoRef}
          alt="Silhouette India Brand Logo" 
          className={`w-24 h-24 mb-12 object-contain transition-all duration-300 ${isDark ? 'invert' : ''}`} 
          src={logoUrl}
          style={{ opacity: 0 }}
        />

        {/* Display Title */}
        <h1 
          ref={titleRef}
          className="font-headline-lg-mobile text-headline-lg-mobile md:font-display-xl md:text-display-xl text-primary tracking-tight uppercase leading-none max-w-5xl"
          style={{ opacity: 0 }}
        >
          Consult <span className="text-surface-dim mx-2 font-light">|</span> Create <span className="text-surface-dim mx-2 font-light">|</span> Communicate
        </h1>

        {/* Description Text */}
        <p 
          ref={textRef}
          className="mt-8 font-body-lg text-body-lg text-secondary max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          Strategic precision meets cinematic execution. We operate at the intersection of business intelligence and high-end media production, delivering uncompromising results.
        </p>
      </div>
    </header>
  );
}
