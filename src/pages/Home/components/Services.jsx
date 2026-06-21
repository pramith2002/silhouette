import { useEffect, useRef } from 'react';
import { LineChart, Palette, Globe } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExpandingCards } from '../../../components/ui/expanding-cards';

// Import local assets
import consultImg from '../../../assets/home_page/consult.webp';
import createImg from '../../../assets/home_page/create.webp';
import communicateImg from '../../../assets/home_page/communicate.webp';

gsap.registerPlugin(ScrollTrigger);

const servicePillers = [
  {
    id: "consult",
    title: "CONSULT",
    description: "Business Intelligence\nBrand Architecture\nMarket Positioning",
    imgSrc: consultImg,
    icon: <LineChart size={32} className="text-white" />,
    linkHref: "/consult"
  },
  {
    id: "create",
    title: "CREATE",
    description: "Photography\nFilms\nCampaign Production",
    imgSrc: createImg,
    icon: <Palette size={32} className="text-white" />,
    linkHref: "/creative-studio"
  },
  {
    id: "communicate",
    title: "COMMUNICATE",
    description: "Advertising\nMedia\nDigital Presence",
    imgSrc: communicateImg,
    icon: <Globe size={32} className="text-white" />,
    linkHref: "/communicate"
  }
];

export default function Services() {
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the header text
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Animate the expanding cards container
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-background">
      <div className="max-w-container-max mx-auto flex flex-col items-center justify-center space-y-16">
        <div ref={headerRef} className="text-center space-y-4" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">
              Our Services
            </span>
            <span className="w-8 h-[1px] bg-primary"></span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary uppercase">
            Core Pillars
          </h2>
        </div>
        <div ref={cardsRef} className="w-full flex justify-center" style={{ opacity: 0 }}>
          <ExpandingCards items={servicePillers} defaultActiveIndex={0} />
        </div>
      </div>
    </section>
  );
}
