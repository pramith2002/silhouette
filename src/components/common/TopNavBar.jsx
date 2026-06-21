import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const MotionLink = motion.create(Link);

function NavLink({ to, label, isHovered, onHoverStart, onHoverEnd, isDark }) {
  const scaleValue = useMotionValue(1.0);
  const springConfig = { mass: 0.1, stiffness: 150, damping: 15 };
  const scale = useSpring(scaleValue, springConfig);

  useEffect(() => {
    scaleValue.set(isHovered ? 1.12 : 1.0);
  }, [isHovered, scaleValue]);

  const isCreativeStudio = label === "Creative Studio";

  return (
    <MotionLink
      style={{ scale, display: "inline-flex", originY: 0.5 }}
      className={`relative py-2 rounded-full font-body-md font-medium transition-colors duration-300 cursor-pointer select-none ${
        isHovered
          ? isDark
            ? "text-black"
            : "text-white"
          : "text-secondary hover:text-primary"
      } ${
        isCreativeStudio
          ? "text-[13px] leading-none text-center flex flex-col justify-center items-center h-11 px-2.5 lg:px-4 xl:px-4"
          : "text-body-md flex items-center h-11 px-2.5 lg:px-4 xl:px-4"
      }`}
      to={to}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId="hoverPill"
            className={`absolute inset-0 rounded-full z-[-1] shadow-sm ${
              isDark ? "bg-white" : "bg-black"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10 flex flex-col items-center justify-center leading-[1.1]">
        {isCreativeStudio ? (
          <>
            <span>Creative</span>
            <span className="mt-0.5">Studio</span>
          </>
        ) : (
          label
        )}
      </span>
    </MotionLink>
  );
}

export default function TopNavBar({ isDark, toggleTheme, showLoader = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navLinks = [
    { label: "Consult", href: "/consult" },
    { label: "Create", href: "/creative-studio" },
    { label: "Communicate", href: "/communicate" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      {/* Floating Pill NavBar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none mt-6 px-4 lg:px-8 xl:px-margin-desktop">
        <div className="pointer-events-auto bg-surface-container-lowest/60 backdrop-blur-xl rounded-full border border-primary w-full max-w-5xl xl:max-w-6xl pl-4 pr-4 lg:pl-6 lg:pr-6 xl:pl-8 xl:pr-8 py-3 flex items-center justify-between gap-2 lg:gap-4 xl:gap-6 shadow-lg transition-all duration-300">
          {/* Brand Logo */}
          <Link
            className="font-headline-md text-[18px] md:text-headline-md font-black tracking-tighter text-primary uppercase flex-shrink-0 cursor-pointer flex items-center gap-2"
            to="/"
          >
            <div
              id="nav-logo-target"
              className="w-8 h-8 flex-shrink-0 relative"
            >
              <div
                id="nav-logo-actual"
                className={`w-full h-full transition-opacity duration-300 ${showLoader ? "opacity-0" : "opacity-100"}`}
              >
                <svg
                  viewBox="0 0 976 976"
                  fill="none"
                  className="w-full h-full"
                >
                  <path
                    d="M402.39 152.064L860.253 630.839L355.682 816.084L402.39 152.064Z"
                    fill="#8E8E8E"
                    opacity="0.6"
                  />
                  <path
                    d="M453.677 138.728L821.446 689.736L292.372 784.549L453.677 138.728Z"
                    fill="#6B6B6B"
                    opacity="0.6"
                  />
                  <path
                    d="M506.5 134.5L773 741L235.5 742.5L506.5 134.5Z"
                    fill="#393939"
                  />
                  <path
                    d="M494.5 244.5C622.754 214.347 694.997 212.664 824 216.5L728 277.5C728 277.5 663.5 276.5 637.5 277C611.5 277.5 593.007 275.902 553 279.5C503.362 283.575 473.468 289.691 414 312L402.5 317.5C388.391 323.857 380.889 328.135 368.5 337.5L357 347.5L346.5 358C321.909 385.659 310.973 405.514 292.5 442.5C297.538 397.996 301.908 375.075 313.5 339C364.806 290.749 403.846 269.713 494.5 244.5Z"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <path
                    d="M152.5 796.5L229 742C315.754 748.84 365.258 744.971 448 741.5C516.208 729.698 543.82 726.761 584.5 703C625.18 679.239 637.335 657.393 645.5 642C653.665 626.607 660.287 602.403 659.5 600.5L661 578C667.909 602.618 670.209 616.663 666 643C657.898 676.944 649.363 692.344 625 711.5C568.271 750.968 512.54 769.855 400 786.5C303.137 799.257 248.95 800.515 152.5 796.5Z"
                    fill="currentColor"
                    opacity="0.8"
                  />
                  <path
                    d="M145.5 646.5C102.899 669.402 77.4148 678.341 30 689.5C73.5338 701.454 98.0682 708.19 142 714C142 714 233.5 724.5 234.5 724.5C235.5 724.5 308 725.5 308 725.5C387.379 727.085 385.452 724.536 415.5 723L498 711.5C546.887 696.252 566.879 686.449 593.5 666C607.956 651.853 615.184 642.333 626.5 622.5L635.5 594.5L640.5 558.5L636 572L629.5 588.5L622 600L614 610L609 616L604.5 620.5L595 629L584.5 637L579.5 640.5L565 648.5L546 657L542 658.5L527 663.5L511 667.5L474 674.5L403.5 680C320.32 680.087 274.755 675.908 195.5 660.5L283.5 500.5C284.713 502.915 331.296 416.575 328 424.5C324.704 432.425 326.041 441.217 325.5 450.5C332.484 434.807 336.263 427.345 342.5 419C347.572 410.106 365.864 392.761 382.5 382C417.014 362.937 409 368.5 428.5 360C451.848 352.511 464.761 349.024 487.5 344L505 341L550.5 336.5H557C606.932 334.614 624.012 336.037 650 338.5L655.5 339C655.5 339 694.354 343.344 719 347.5C751.371 352.959 801 365.5 801 365.5L844 357.5L874.282 349.917L913.5 338L947 325C760.5 291.5 647.212 281.168 540 296.5L524.5 298.5L510 300L500 302.5L486.5 306L469.5 311L444.5 318L431.5 324L412 333L394.5 343C394.5 343 383.5 349 378 352.5C372.5 356 365 362.5 365 362.5L351.5 373.5L343 382L331 396L327 401L287 452.5L224 539L145.5 646.5Z"
                    fill="currentColor"
                  />
                  <ellipse
                    opacity="0.6"
                    cx="487.5"
                    cy="502"
                    rx="135.5"
                    ry="134"
                    fill="currentColor"
                  />
                  <circle cx="497.5" cy="514.5" r="5.5" fill="currentColor" />
                  <circle cx="456" cy="473" r="9" fill="currentColor" />
                </svg>
              </div>
            </div>
            <span>SILHOUETTE INDIA</span>
          </Link>

          {/* Desktop Links */}
          <div
            className="flex items-center gap-0"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, index) => (
              <NavLink
                key={link.label}
                to={link.href}
                label={link.label}
                isHovered={hoveredIndex === index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => {}}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Actions Column (Theme Toggle + CTA) */}
          <div className="flex items-center gap-2 xl:gap-3 mr-1 lg:mr-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-container transition-colors duration-300 cursor-pointer text-primary focus:outline-none"
              aria-label="Toggle dark/light mode"
            >
              {isDark ? (
                <Sun size={20} className="stroke-[2px]" />
              ) : (
                <Moon size={20} className="stroke-[2px]" />
              )}
            </button>

            {/* Desktop CTA */}
            <Link
              className="inline-flex items-center justify-center px-6 py-2 bg-primary text-on-primary rounded-full font-headline-md text-[14px] hover:bg-inverse-surface hover:scale-95 transition-all duration-300 whitespace-nowrap cursor-pointer"
              to="/#contact"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
