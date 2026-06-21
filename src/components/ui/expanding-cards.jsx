import * as React from "react";
import { cn } from "../../lib/utils"; 

export const ExpandingCards = React.forwardRef(({ className, items, defaultActiveIndex = 0, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState(defaultActiveIndex);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null) return {};
    
    if (isDesktop) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "5fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items.length, isDesktop]);

  const handleInteraction = (index) => {
    setActiveIndex(index);
  };

  return (
    <ul
      className={cn(
        "w-full max-w-6xl gap-4",
        "grid",
        "h-[650px] md:h-[550px]",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(isDesktop 
          ? { gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr' }
        )
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg transition-all duration-300",
            "md:min-w-[80px]",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleInteraction(index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 scale-105 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

          <article
            className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-8"
          >
            {/* Vertically oriented title when card is collapsed on desktop */}
            <h3 className="hidden origin-left rotate-270 text-base font-bold uppercase tracking-widest text-white/70 opacity-100 transition-all duration-500 ease-out md:block group-data-[active=true]:opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              {item.title}
            </h3>

            <div className="text-white opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100 w-fit">
              {item.icon}
            </div>

            <h3 className="text-2xl font-bold uppercase tracking-wider text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100">
              {item.title}
            </h3>

            <p className="w-full max-w-sm text-sm md:text-base text-white/80 opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100 whitespace-pre-line leading-relaxed font-light">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
