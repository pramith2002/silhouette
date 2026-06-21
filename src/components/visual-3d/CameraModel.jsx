import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Preload the asset
useGLTF.preload('/camera.glb');

export function CameraModel() {
  const modelRef = useRef();
  const { scene } = useGLTF('/camera.glb');
  const { size } = useThree();
  const clock = useRef(0);

  // Idle float animation
  useFrame((state, delta) => {
    if (!modelRef.current) return;
    clock.current += delta;
    
    // Only float when near the top (hero section)
    const scrollProgress = ScrollTrigger.getAll().find(
      t => t.vars?.trigger === '.photo-about-section'
    )?.progress ?? 0;

    if (scrollProgress < 0.05) {
      modelRef.current.position.y += Math.sin(clock.current * 0.8) * 0.0008;
    }
  });

  useEffect(() => {
    if (!modelRef.current) return;

    // Responsive coordinates and scale
    const isMobile = size.width < 768;
    const isTablet = size.width < 1024;

    // Model has a massive internal bounding scale, so we use small values (e.g. ~0.04)
    const startX = isMobile ? 0 : isTablet ? 0.8 : 1.25;
    const startY = isMobile ? 0.6 : 0;
    const startScale = isMobile ? 0.035 : isTablet ? 0.045 : 0.052;

    const endX = isMobile ? 0 : isTablet ? -0.8 : -1.25;
    const endY = isMobile ? -0.6 : -0.60;
    const endScale = isMobile ? 0.025 : isTablet ? 0.032 : 0.050;

    // Set initial state
    gsap.set(modelRef.current.position, { x: startX, y: startY, z: 0 });
    gsap.set(modelRef.current.scale, { x: startScale, y: startScale, z: startScale });
    gsap.set(modelRef.current.rotation, { x: 0.1, y: -0.4, z: 0 });

    const triggerEl = document.querySelector('.photo-about-section');
    if (!triggerEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top bottom',
        end: 'top top',
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    // Animate camera to the left column (placeholder position) as we scroll down to About
    tl.to(modelRef.current.position, {
      x: endX,
      y: endY,
      z: 0,
      ease: 'power2.inOut',
    }, 0)
    .to(modelRef.current.scale, {
      x: endScale, y: endScale, z: endScale,
      ease: 'power2.inOut',
    }, 0)
    .to(modelRef.current.rotation, {
      x: 0.25,
      y: Math.PI * 2, // Spin cleanly
      z: -0.1,
      ease: 'power1.inOut',
    }, 0);

    return () => {
      // Clean up our specific trigger
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars?.trigger === '.photo-about-section') t.kill();
      });
    };
  }, [size.width]);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      dispose={null}
    />
  );
}
