import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { CameraModel } from './CameraModel';

/**
 * Responsive Canvas Overlay that is sticky within its parent container.
 * This prevents the 3D model from bleeding into other sections.
 */
export default function PhotographyCanvas({ visible }) {
  if (!visible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5, // Keep below elements with z-index: 10+ (like the toggle) but above background
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
        }}
      >
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          {/* Enhanced metallic/glass optimization lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={3.0}
            color="#ffffff"
          />
          <directionalLight
            position={[-5, -2, -5]}
            intensity={1.2}
            color="#b3d1ff"
          />
          <pointLight position={[0, 4, 3]} intensity={1.8} color="#ffe2b3" />

          {/* Environment map for high-quality reflections */}
          <Environment preset="studio" />

          <Suspense fallback={null}>
            <CameraModel />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
