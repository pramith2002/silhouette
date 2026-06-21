import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

export default function useLoaderAnimation({
  svgRef,
  triangleARef,
  triangleBRef,
  triangleCRef,
  innerEyeRef,
  outerEyeRef,
  lensRef,
  highlightsRef,
  loaderRef,
  loaderBgRef,
  websiteRef,
  onComplete,
  isDark
}) {
  useLayoutEffect(() => {
    const websiteNode = websiteRef.current || document.querySelector('.min-h-screen.bg-background');
    if (!websiteNode) return;
    // Check if prefers reduced motion is enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Skip animation, show website immediately and enable scrolling
      gsap.set(websiteNode, { opacity: 1, clipPath: 'none' });
      if (window.lenis) {
        window.lenis.start();
      }
      if (onComplete) {
        onComplete();
      }
      return;
    }

    // Calculate target FLIP coordinates for Logo flight
    const targetEl = document.querySelector('#nav-logo-target');
    const svgEl = svgRef.current;
    let targetX = 0;
    let targetY = 0;
    let targetScale = 0.05;

    if (targetEl && svgEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const svgRect = svgEl.getBoundingClientRect();

      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      const svgCenterX = svgRect.left + svgRect.width / 2;
      const svgCenterY = svgRect.top + svgRect.height / 2;

      targetX = targetCenterX - svgCenterX;
      targetY = targetCenterY - svgCenterY;
      targetScale = targetRect.width / svgRect.width;
    }

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(websiteNode, {
        opacity: 0,
        scale: 0.95,
        zIndex: 9980,
        willChange: 'transform, opacity'
      });

      gsap.set([loaderRef.current, loaderBgRef.current], {
        opacity: 1,
        willChange: 'opacity'
      });

      // Target elements
      const triangleA = triangleARef.current;
      const triangleB = triangleBRef.current;
      const triangleC = triangleCRef.current;
      const innerEye = innerEyeRef.current;
      const outerEye = outerEyeRef.current; // Group <g> containing two paths
      const lens = lensRef.current;
      const highlights = highlightsRef.current;
      const loader = loaderRef.current;
      const website = websiteRef.current;

      // Ensure transform origins are set center for SVGs
      const svgElements = [triangleA, triangleB, triangleC, innerEye, outerEye, lens, highlights];
      svgElements.forEach(el => {
        if (el) {
          gsap.set(el, { transformOrigin: '50% 50%' });
        }
      });

      // Prepare drawing path for inner eye
      if (innerEye) {
        const innerLength = innerEye.getTotalLength();
        gsap.set(innerEye, {
          strokeDasharray: innerLength,
          strokeDashoffset: innerLength,
          fillOpacity: 0,
          stroke: '#ffffff'
        });
      }

      // Prepare drawing paths for outer eye group
      const outerPaths = outerEye ? outerEye.querySelectorAll('path') : [];
      outerPaths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
          fillOpacity: 0,
          stroke: '#ffffff'
        });
      });

      // Initially hide elements for animation sequence
      gsap.set([triangleA, triangleB, triangleC, lens, highlights], { opacity: 0 });
      gsap.set(triangleA, { scale: 0.85 });

      // Create Master Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Phase 14: Cleanup
          if (window.lenis) {
            window.lenis.start();
          }
          if (onComplete) {
            onComplete();
          }
        }
      });

      // --- PHASE 1: Triangle A ---
      // Start: 0.0s, opacity: 0 -> 1, scale: 0.85 -> 1, Duration: 0.4s, Ease: power2.out
      tl.to(triangleA, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      }, 0.0);

      // --- PHASE 2: Triangle B ---
      // Start: 0.2s, rotation: -18deg -> 0deg, x: -20px -> 0px, opacity: 0 -> 1, Duration: 0.5s, Ease: power3.out
      tl.fromTo(triangleB, 
        { opacity: 0, rotation: -18, x: -20 },
        { opacity: 1, rotation: 0, x: 0, duration: 0.5, ease: 'power3.out' },
        0.2
      );

      // --- PHASE 3: Triangle C ---
      // Start: 0.35s, rotation: 18deg -> 0deg, x: 20px -> 0px, opacity: 0 -> 1, Duration: 0.5s, Ease: power3.out
      tl.fromTo(triangleC,
        { opacity: 0, rotation: 18, x: 20 },
        { opacity: 1, rotation: 0, x: 0, duration: 0.5, ease: 'power3.out' },
        0.35
      );

      // --- PHASE 4: Inner Eye Stroke ---
      // Start: 0.6s, strokeDashoffset: length -> 0, Duration: 0.6s, Ease: none
      if (innerEye) {
        tl.to(innerEye, {
          strokeDashoffset: 0,
          duration: 0.6,
          ease: 'none'
        }, 0.6);

        // Fade in the white fill color as the outline draws
        tl.to(innerEye, {
          fillOpacity: 1,
          duration: 0.5,
          ease: 'power1.out'
        }, 0.8);
      }

      // --- PHASE 5: Outer Eye Stroke ---
      // Start: 0.8s, strokeDashoffset: length -> 0, Duration: 0.7s, Ease: none
      outerPaths.forEach((path) => {
        tl.to(path, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: 'none'
        }, 0.8);

        // Fade in the light grey fill color as the outline draws
        tl.to(path, {
          fillOpacity: 1,
          duration: 0.5,
          ease: 'power1.out'
        }, 1.0);
      });

      // --- PHASE 6: Lens Fade In ---
      // Start: 1.1s, opacity: 0 -> 1, scale: 0.95 -> 1, Duration: 0.3s, Ease: power2.out
      tl.to(lens, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 1.1);

      // --- PHASE 7: Highlights Fade In ---
      // Start: 1.25s, opacity: 0 -> 1, Duration: 0.2s, Ease: power1.out
      tl.to(highlights, {
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out'
      }, 1.25);

      // --- PHASE 8: Autofocus Effect ---
      // Start: 1.5s, Target: lens group, scale: 1 -> 1.08 -> 1, rotation: 0 -> 6deg -> 0, Duration: 0.4s, Ease: power2.inOut
      tl.to(lens, {
        keyframes: [
          { scale: 1.08, rotation: 6, duration: 0.2, ease: 'power2.inOut' },
          { scale: 1, rotation: 0, duration: 0.2, ease: 'power2.inOut' }
        ]
      }, 1.5);

      // --- PHASE 10: Entire Logo Flight to Navbar ---
      // Start: 2.1s, Target: Entire SVG elements, translates and scales to target coordinates
      if (svgEl) {
        gsap.set(svgEl, { transformOrigin: 'center center' });
        tl.to(svgEl, {
          x: targetX,
          y: targetY,
          scale: targetScale,
          duration: 1.0,
          ease: 'power3.inOut'
        }, 2.1);

        // If Light Mode, morph the white strokes and light fills to dark color
        if (!isDark) {
          const darkColor = '#1A1A1A'; // Target dark color for light mode navbar
          if (innerEye) {
            tl.to(innerEye, { stroke: darkColor, fill: darkColor, duration: 1.0, ease: 'power3.inOut' }, 2.1);
          }
          if (outerPaths.length) {
            tl.to(outerPaths, { stroke: darkColor, fill: darkColor, duration: 1.0, ease: 'power3.inOut' }, 2.1);
          }
        }
      }

      // --- PHASE 11: Website Reveal & Scale Zoom ---
      // Pop website container in front of loader-bg (9990) but behind loader-fg (9999)
      tl.set(website, { zIndex: 9995 }, 2.1);

      // Website container zoom-in to normal scale
      tl.to(website, {
        scale: 1,
        opacity: 1,
        duration: 1.0,
        ease: 'power3.inOut'
      }, 2.1);

      // --- PHASE 12: Loader Exit & Transition Handover ---
      // Start: 2.1s, Targets: Loader BG, opacity: 1 -> 0, Duration: 1.0s
      tl.to(loaderBgRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: 'power3.inOut'
      }, 2.1);



      // Hide the loader overlay foreground at completion
      tl.to(loader, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
      }, 3.0);
    });

    return () => {
      ctx.revert();
      // Ensure the website container is visible and interactive after unmount and GSAP revert
      if (websiteNode) {
        websiteNode.style.opacity = '1';
        websiteNode.style.transform = 'none';
        websiteNode.style.zIndex = 'auto';
      }
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [
    svgRef,
    triangleARef,
    triangleBRef,
    triangleCRef,
    innerEyeRef,
    outerEyeRef,
    lensRef,
    highlightsRef,
    loaderRef,
    loaderBgRef,
    websiteRef,
    onComplete,
    isDark
  ]);
}
