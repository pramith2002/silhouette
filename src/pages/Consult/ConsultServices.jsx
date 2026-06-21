import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkle } from "lucide-react";

// Register ScrollTrigger (just in case, though registered in App.jsx)
gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    num: "01",
    title: "Business, Brand & Media Consultants",
    description: "Formulating high-level strategic intelligence that defines market leaders. We shape the architecture of your brand, align your operational values, and position you for unmatched scale.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    num: "02",
    title: "Photography",
    description: "Capturing the essence of brand narratives through high-production-value still imagery. From fashion and editorial shoots to corporate profiles and architectural portfolios, executed with precision.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop"
  },
  {
    num: "03",
    title: "Films",
    description: "Cinematic production that engages, inspires, and converts. From commercial brand videos to documentaries and creative shorts, our films represent the pinnacle of visual storytelling.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop"
  },
  {
    num: "04",
    title: "Advertising & Marketing",
    description: "Precision campaigns engineered for brand growth. We combine creative insights with rigorous targeting strategies to scale your message and build sustainable customer acquisition.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  },
  {
    num: "05",
    title: "Events & Activations",
    description: "Immersive physical and digital experiences that build deep audience affinity. We design and execute product launches, gallery activations, and high-impact media events.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ConsultServices() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Add refs to cards array dynamically
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Check window width for responsive fallback
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // If not desktop, we do simple fade animations per section instead of pinning
    if (!isDesktop) {
      cardsRef.current = []; // Clear refs
      const ctxMobile = gsap.context(() => {
        const items = gsap.utils.toArray(".mobile-item");
        items.forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        });
      }, containerRef);

      return () => ctxMobile.revert();
    }

    const ctx = gsap.context(() => {
      const cards = cardsRef.current;
      if (cards.length === 0) return;

      const totalItems = servicesData.length;

      // Pin the section and animate cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          id: "services-trigger",
          start: "top top",
          end: `+=${totalItems * 800}`, // Scroll distance
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Map scroll progress to active index with smooth threshold zones
            const p = self.progress;
            const total = servicesData.length;
            const step = 1 / (total - 1);
            let index = 0;
            for (let i = 0; i < total; i++) {
              const threshold = (i - 0.5) * step;
              if (p >= threshold) {
                index = i;
              }
            }
            setActiveIndex(index);
          }
        }
      });

      // Initially set starting properties for stacking cards (all except card 0 are hidden below)
      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, { yPercent: 120, scale: 1 });
        }
      });

      // Add step animations to the timeline
      for (let i = 1; i < totalItems; i++) {
        tl.to(
          cards[i - 1],
          {
            scale: 0.9,
            opacity: 0.4,
            duration: 1,
            ease: "none"
          },
          `step-${i}`
        ).fromTo(
          cards[i],
          { yPercent: 120, scale: 1 },
          {
            yPercent: 0,
            scale: 1,
            duration: 1,
            ease: "none"
          },
          `step-${i}`
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      cardsRef.current = []; // Reset refs on unmount/re-layout
    };
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background text-primary overflow-hidden border-b border-border-subtle"
    >
      {isDesktop ? (
        /* DESKTOP VIEW: Pinned side-by-side card stacking layout */
        <div className="min-h-screen w-full flex items-center py-16 px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-12 gap-gutter w-full items-stretch">
            
            {/* Left Column: Title and Navigation list */}
            <div className="col-span-5 flex flex-col justify-center pr-8">
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
                Our Capabilities
              </span>
              
              <div className="space-y-4">
                {servicesData.map((service, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        // Handle clicking to scroll to target progress if wanted
                        const trigger = ScrollTrigger.getById("services-trigger");
                        if (trigger) {
                          const targetScroll = trigger.start + (index / (servicesData.length - 1)) * (trigger.end - trigger.start);
                          if (window.lenis) {
                            window.lenis.scrollTo(targetScroll);
                          } else {
                            window.scrollTo({ top: targetScroll, behavior: "smooth" });
                          }
                        }
                      }}
                      className="group flex items-center text-left w-full focus:outline-none transition-all duration-300 cursor-pointer"
                    >
                      {/* Active Indicator Symbol */}
                      <div className="w-8 flex-shrink-0 flex items-center justify-start">
                        <div
                          className={`transition-all duration-300 ${
                            isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
                          }`}
                        >
                          <Sparkle className="w-5 h-5 fill-primary text-primary" />
                        </div>
                      </div>
                      
                      {/* Outlined / Solid text effect */}
                      <span
                        className={`font-headline-md text-[36px] xl:text-[44px] leading-tight uppercase transition-all duration-300 select-none ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-transparent font-medium hover:opacity-80"
                        }`}
                        style={{
                          WebkitTextStroke: isActive ? "none" : "1px var(--color-primary)",
                          opacity: isActive ? 1 : 0.25,
                        }}
                      >
                        {service.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Middle Column: Active Service Descriptions */}
            <div className="col-span-3 flex flex-col justify-center px-4 relative min-h-[300px]">
              <div className="w-full relative">
                {servicesData.map((service, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={index}
                      className={`transition-all duration-500 absolute inset-0 flex flex-col justify-center transition-all ${
                        isActive
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <span className="font-headline-md text-[56px] text-surface-dim font-black mb-4">
                        {service.num}
                      </span>
                      <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Stacked Card Images */}
            <div className="col-span-4 flex items-center justify-center pl-8">
              <div 
                ref={cardsContainerRef}
                className="relative w-full aspect-[4/5] max-w-[400px] h-[500px]"
              >
                {servicesData.map((service, index) => {
                  return (
                    <div
                      key={index}
                      ref={addToRefs}
                      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-border-subtle shadow-2xl bg-surface-container"
                      style={{
                        zIndex: index + 10,
                      }}
                    >
                      <div className="relative w-full h-full group/card">
                        {/* Image background */}
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                        
                        {/* Title overlay inside card for rich aesthetic */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end text-white z-20">
                          <div>
                            <span className="font-label-caps text-[12px] tracking-widest text-white/60 block mb-1 uppercase">
                              Capabilities
                            </span>
                            <h3 className="font-headline-md text-headline-md uppercase font-bold text-white max-w-[200px] leading-tight">
                              {service.title.split(",")[0]}
                            </h3>
                          </div>
                          <span className="font-headline-md text-[28px] font-black text-white/40">
                            {service.num}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      ) : (
        /* MOBILE / TABLET VIEW: Simple vertical fade-in list of capabilities */
        <div className="py-20 px-margin-mobile flex flex-col gap-16">
          <div className="text-center">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-2 block">
              Our Capabilities
            </span>
            <h2 className="font-headline-md text-headline-md uppercase text-primary">
              Consulting Services
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="mobile-item flex flex-col gap-6 p-6 rounded-3xl border border-border-subtle bg-surface-container-low"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-border-subtle">
                    <span className="font-headline-md text-body-md font-bold text-primary">
                      {service.num}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="font-headline-md text-[24px] uppercase font-bold text-primary">
                    {service.title}
                  </h3>
                  <p className="font-body-md text-body-md text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
