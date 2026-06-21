import { useRef } from 'react';
import LogoSvg from './LogoSvg';
import useLoaderAnimation from '../../../hooks/useLoaderAnimation';
import './loader.css';

export default function Loader({ websiteRef, onComplete, isDark }) {
  const loaderRef = useRef(null);
  const loaderBgRef = useRef(null);
  const svgRef = useRef(null);
  const triangleARef = useRef(null);
  const triangleBRef = useRef(null);
  const triangleCRef = useRef(null);
  const innerEyeRef = useRef(null);
  const outerEyeRef = useRef(null);
  const lensRef = useRef(null);
  const highlightsRef = useRef(null);

  useLoaderAnimation({
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
  });

  return (
    <>
      <div ref={loaderBgRef} className="loader-bg" />
      <div ref={loaderRef} className="loader-overlay-fg">
        <div className="loader-container">
          <LogoSvg
            svgRef={svgRef}
            triangleARef={triangleARef}
            triangleBRef={triangleBRef}
            triangleCRef={triangleCRef}
            innerEyeRef={innerEyeRef}
            outerEyeRef={outerEyeRef}
            lensRef={lensRef}
            highlightsRef={highlightsRef}
          />
        </div>
      </div>
    </>
  );
}
