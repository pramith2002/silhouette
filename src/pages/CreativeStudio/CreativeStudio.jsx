import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from '../../components/ui/Masonry/Masonry';
import PhotographyCanvas from '../../components/visual-3d/PhotographyCanvas';
import textVideo from '../../assets/text-video.mp4';
import FlowingMenu from '../../components/ui/FlowingMenu/FlowingMenu';

// Photography flowing menu assets
import photoFashion from '../../assets/create/photo/Lifestyle-shots-16-683x1024.jpg';
import photoPortfolio from '../../assets/create/photo/Prajna-at-chettinadu-house-768x1024.jpg';
import photoAds from '../../assets/create/photo/Advertising-Photography-By-Silhouette-India-1-1024x683.jpg';
import photoProduct from '../../assets/create/photo/resources_1.jpg';
import photoFood from '../../assets/create/photo/Lifestyle-shots-20-683x1024.jpg';

// Videography flowing menu assets
import videoCorporate from '../../assets/create/video/Italasi-smm-10-1024x1024.jpg';
import videoAds from '../../assets/create/video/Advertising-Photography-By-Silhouette-India-3-1024x683.jpg';
import videoOther from '../../assets/create/video/Italasi-smm-168-1024x1024.jpg';

const photographyMenu = [
  { link: '#', text: 'Fashion', description: 'unleashing style and elegance through striking imagery', image: photoFashion },
  { link: '#', text: 'Model Portfolio', description: 'unveiling beauty', image: photoPortfolio },
  { link: '#', text: 'Advertisement Photography', description: 'crafting bold campaigns that drive engagement', image: photoAds },
  { link: '#', text: 'Product Photography', description: 'showcasing premium craftsmanship and design', image: photoProduct },
  { link: '#', text: 'Food Photography', description: 'celebrating flavor and culinary artistry', image: photoFood }
];

const videographyMenu = [
  { link: '#', text: 'Corporate Identity', description: 'cinematic brand storytelling and positioning', image: videoCorporate },
  { link: '#', text: 'Commercial Ads', description: 'high-impact marketing and promotional campaigns', image: videoAds },
  { link: '#', text: 'Brand Heritage', description: 'preserving brand legacy and human stories', image: videoOther }
];


const photographyWorks = [
  {
    id: '1',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLvPUrSovpb7nJJbCwPSquhvIeq01okVP-aiMtP-xyAgiibW5r6WfMzcCF30EKf5NwHzD3VqTWmihSlVY1mspfOWm80LlPQCPUHhtcZTXxpfqoy_vU7GzwYjaMaxsxZuZ88x0wLvOijnohSuETsrgrA8ow5P4r9HOXiyh6RBJgxWSANCn7amDq71PuUkvwNEMmi1qlyjLHyHFTdSOHOrUUJTId63ViEv619I8BlDDbOm5mUzvz9QfWoxXk12',
    height: 600,
  },
  {
    id: '2',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLubykJMpti72qzFKPfSgec6vaAzhRMqjkC6VUo0mvgelQXE2_N1aScktm8QGwshbX6N1BB67N80UaByE4xuA8TsSr3z3iUU4Bu178As_Vg8jsHu4kEvDll1eK8x27pqPdvG0-Z90nF07WtxY7KGj5xbVh3_NF2M1snOO8lBmezbOGSNNkdibylfKV3QdrofsIEAsp8F8jkFiIS2Dip_eJFBR5MWfqNnOowms_o5EwTR2u5MYNaBxb8XN9kO',
    height: 400,
  },
  {
    id: '3',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLtteXFYWp1BBLWoDnkZq9Cjc_e7ntDS69MnHXYfEodETf5xJxNKrGA25RP5zzw60osyQhNBOk3wuMcXH-z6R0VwJMbAvz0-Akqzdh7HtpgaZp440r2Wo4-0lII-ogVbmOimJ6VS4P-tXaC2g9XlrPBLGrCxirQesHacY1Qr0e2gD8yu5QXz7hXeWNBiQK3EJECIu0b0NNlp2nD4fBW56LDOY_UcvUnvfiR9X3rlplRxZ3gmrhv6jE64oyI',
    height: 700,
  },
  {
    id: '4',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLvPUrSovpb7nJJbCwPSquhvIeq01okVP-aiMtP-xyAgiibW5r6WfMzcCF30EKf5NwHzD3VqTWmihSlVY1mspfOWm80LlPQCPUHhtcZTXxpfqoy_vU7GzwYjaMaxsxZuZ88x0wLvOijnohSuETsrgrA8ow5P4r9HOXiyh6RBJgxWSANCn7amDq71PuUkvwNEMmi1qlyjLHyHFTdSOHOrUUJTId63ViEv619I8BlDDbOm5mUzvz9QfWoxXk12',
    height: 500,
  },
  {
    id: '5',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLubykJMpti72qzFKPfSgec6vaAzhRMqjkC6VUo0mvgelQXE2_N1aScktm8QGwshbX6N1BB67N80UaByE4xuA8TsSr3z3iUU4Bu178As_Vg8jsHu4kEvDll1eK8x27pqPdvG0-Z90nF07WtxY7KGj5xbVh3_NF2M1snOO8lBmezbOGSNNkdibylfKV3QdrofsIEAsp8F8jkFiIS2Dip_eJFBR5MWfqNnOowms_o5EwTR2u5MYNaBxb8XN9kO',
    height: 800,
  },
  {
    id: '6',
    img: 'https://lh3.googleusercontent.com/aida/AP1WRLtteXFYWp1BBLWoDnkZq9Cjc_e7ntDS69MnHXYfEodETf5xJxNKrGA25RP5zzw60osyQhNBOk3wuMcXH-z6R0VwJMbAvz0-Akqzdh7HtpgaZp440r2Wo4-0lII-ogVbmOimJ6VS4P-tXaC2g9XlrPBLGrCxirQesHacY1Qr0e2gD8yu5QXz7hXeWNBiQK3EJECIu0b0NNlp2nD4fBW56LDOY_UcvUnvfiR9X3rlplRxZ3gmrhv6jE64oyI',
    height: 450,
  }
];

export default function CreativeStudio() {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'photo'
  const videoRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = () => {
      if (videoRef.current) {
        if (mediaQuery.matches) {
          videoRef.current.removeAttribute('autoplay');
          videoRef.current.pause();
        } else if (activeTab === 'video') {
          videoRef.current.setAttribute('autoplay', 'true');
          videoRef.current.play().catch(() => {});
        }
      }
    };

    handleMotionPreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionPreference);
    } else {
      mediaQuery.addListener(handleMotionPreference);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionPreference);
      } else {
        mediaQuery.removeListener(handleMotionPreference);
      }
    };
  }, [activeTab]);

  return (
    <>
    <div className="bg-background transition-colors duration-400 relative">
      {/* Floating Toggle Controls */}
      <div className="fixed top-32 left-1/2 transform -translate-x-1/2 z-30 bg-surface-container-high/80 backdrop-blur-md border border-border-subtle rounded-full p-1 flex gap-1 shadow-2xl transition-all duration-300">
        <button
          onClick={() => setActiveTab('video')}
          className={`relative px-6 py-2 rounded-full font-label-caps text-label-caps transition-colors duration-300 cursor-pointer select-none ${
            activeTab === 'video'
              ? 'text-on-primary font-bold'
              : 'text-secondary hover:text-primary'
          }`}
        >
          {activeTab === 'video' && (
            <motion.div
              layoutId="activeTabPill"
              className="absolute inset-0 bg-primary rounded-full z-0 shadow-sm"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">Videography</span>
        </button>
        <button
          onClick={() => setActiveTab('photo')}
          className={`relative px-6 py-2 rounded-full font-label-caps text-label-caps transition-colors duration-300 cursor-pointer select-none ${
            activeTab === 'photo'
              ? 'text-on-primary font-bold'
              : 'text-secondary hover:text-primary'
          }`}
        >
          {activeTab === 'photo' && (
            <motion.div
              layoutId="activeTabPill"
              className="absolute inset-0 bg-primary rounded-full z-0 shadow-sm"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">Photography</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'photo' ? (
          <motion.div
            key="photo-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Wrapper to limit 3D canvas sticky bounds */}
            <div className="relative w-full">
              {/* Sticky 3D canvas container overlay limited to this relative wrapper */}
              <PhotographyCanvas visible={true} />

              {/* Hero Section */}
              <header className="min-h-screen flex items-center justify-center px-margin-mobile md:px-margin-desktop pt-24 pb-20 relative bg-surface border-b border-border-subtle transition-colors duration-400">
                <h1 className="sr-only">Creative Studio - Photography</h1>
                
                <div className="z-10 w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-24">
                  {/* Left Column: Headline and description */}
                  <div className="lg:col-span-7 flex flex-col justify-center text-left">
                    <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-6 block">
                      Creative Studio
                    </span>
                    <h1 className="font-display-xl text-[44px] leading-[1.1] md:text-[76px] md:leading-[1.05] lg:text-[88px] lg:leading-[1.02] xl:text-[96px] xl:leading-[0.98] text-primary font-black uppercase tracking-tighter mb-8 flex flex-col">
                      <span>THE ART OF</span>
                      <span className="font-light italic text-secondary my-1">VISUAL</span>
                      <span>PERCEPTION.</span>
                    </h1>
                    <p className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed mb-10">
                      We decode complex visual signals into cinematic still narratives. SILHOUETTE INDIA exists at the intersection of luxury brand aesthetics and high-precision execution.
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="px-8 py-3.5 bg-primary text-on-primary rounded-full font-headline-md text-body-md font-bold hover:bg-inverse-surface hover:scale-95 transition-all duration-300 shadow-md cursor-pointer">
                        Start Project
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Empty space reserved for 3D canvas */}
                  <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-0 flex items-center justify-center" aria-hidden="true" />
                </div>
              </header>

              {/* Service Section (About Section) */}
              <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-primary photo-about-section relative z-20" id="service-section">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center transition-all duration-500" id="content-photo">
                  <div className="md:col-span-6 order-2 md:order-1 mt-12 md:mt-0 flex justify-center items-center">
                    {/* Clean camera placeholder container where the 3D model will land */}
                    <div className="w-full aspect-square max-w-[480px] border border-primary/10 rounded-2xl photo-camera-placeholder" aria-hidden="true" />
                  </div>
                  <div className="md:col-span-6 order-1 md:order-2 md:pl-12 text-left">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-[1px] bg-primary"></span>
                      <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">02 / Photo</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg md:text-headline-lg-mobile mb-6">
                      About Silhouette India Photography
                    </h2>
                    <p className="font-body-lg text-body-lg text-secondary mb-8">
                      Still imagery engineered for the architectural brand. We strip away the unnecessary, focusing purely on form, contrast, and brutalist beauty. Our editorial and commercial photography captures the essence of luxury and precision, creating enduring visual assets that define market leadership.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <span className="font-label-caps text-label-caps border border-primary px-4 py-2 uppercase tracking-widest text-primary">Editorial</span>
                      <span className="font-label-caps text-label-caps border border-primary px-4 py-2 uppercase tracking-widest text-primary">Commercial</span>
                      <span className="font-label-caps text-label-caps border border-primary px-4 py-2 uppercase tracking-widest text-primary">Product</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Flowing Menu Section */}
            <section className="pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-20">
              <div className="mb-12 text-left">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-3 block">
                  Our Focus
                </span>
                <h3 className="font-headline-md text-headline-md uppercase text-primary">
                  Photography Categories
                </h3>
              </div>
              <div className="border-t border-border-subtle">
                <FlowingMenu items={photographyMenu} />
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="video-layout"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Hero Section */}
            <header className="min-h-screen flex items-center justify-center px-margin-mobile md:px-margin-desktop pt-24 pb-20 relative bg-surface border-b border-border-subtle transition-colors duration-400">
              <h1 className="sr-only">Creative Studio - Videography</h1>
              
              <div className="w-full flex flex-col items-center justify-center text-center mt-12">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-8 block">
                  Creative Studio
                </span>
                
                <svg 
                  viewBox="0 0 1000 420" 
                  className="w-full max-w-5xl select-none mx-auto mb-8" 
                  style={{ height: 'auto' }}
                >
                  <defs>
                    <clipPath id="text-clip">
                      <text 
                        x="50%" 
                        y="110" 
                        textAnchor="middle" 
                        fontSize="96" 
                        fontFamily="Montserrat, sans-serif" 
                        letterSpacing="-0.03em"
                        style={{ fontWeight: 900 }}
                      >
                        THE ART OF
                      </text>
                      <text 
                        x="50%" 
                        y="230" 
                        textAnchor="middle" 
                        fontSize="96" 
                        fontFamily="Montserrat, sans-serif" 
                        letterSpacing="-0.03em"
                        style={{ fontWeight: 300, fontStyle: 'italic' }}
                      >
                        VISUAL
                      </text>
                      <text 
                        x="50%" 
                        y="350" 
                        textAnchor="middle" 
                        fontSize="96" 
                        fontFamily="Montserrat, sans-serif" 
                        letterSpacing="-0.03em"
                        style={{ fontWeight: 900 }}
                      >
                        INFLUENCE.
                      </text>
                    </clipPath>
                  </defs>
                  
                  <foreignObject x="0" y="0" width="1000" height="420" clipPath="url(#text-clip)">
                    <video
                      ref={videoRef}
                      src={textVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </foreignObject>
                </svg>
                
                <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed mt-4">
                  Strategic films. Meaningful narratives. Lasting impressions.
                </p>
              </div>
            </header>

            {/* Service Section */}
            <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-primary" id="service-section">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center transition-all duration-500" id="content-video">
                <div className="md:col-span-5 text-left">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-[1px] bg-primary"></span>
                    <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary">01 / Video</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg md:text-headline-lg-mobile mb-6">
                    About Silhouette India Videography
                  </h2>
                  <p className="font-body-lg text-body-lg text-secondary mb-8">
                    We craft cinematic narratives that command attention. Our high-end production pipelines are designed for impact, merging strategic intent with uncompromising visual quality. From concept to post-production, we engineer motion that drives measurable engagement and elevates brand perception.
                  </p>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between font-label-caps text-label-caps mb-2 text-primary">
                        <span>Engagement</span>
                        <span>+84%</span>
                      </div>
                      <div className="w-full bg-primary/10 h-1 rounded-full">
                        <div className="bg-primary h-1 rounded-full transition-all duration-1000" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-caps text-label-caps mb-2 text-primary">
                        <span>Retention</span>
                        <span>+62%</span>
                      </div>
                      <div className="w-full bg-primary/10 h-1 rounded-full">
                        <div className="bg-primary h-1 rounded-full transition-all duration-1000" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between font-label-caps text-label-caps mb-2 text-primary">
                        <span>Production Value</span>
                        <span>Elite</span>
                      </div>
                      <div className="w-full bg-primary/10 h-1 rounded-full">
                        <div className="bg-primary h-1 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7 mt-12 md:mt-0 relative aspect-video overflow-hidden border border-primary/30">
                  <img 
                    alt="Videography Production" 
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700" 
                    src="https://lh3.googleusercontent.com/aida/AP1WRLtteXFYWp1BBLWoDnkZq9Cjc_e7ntDS69MnHXYfEodETf5xJxNKrGA25RP5zzw60osyQhNBOk3wuMcXH-z6R0VwJMbAvz0-Akqzdh7HtpgaZp440r2Wo4-0lII-ogVbmOimJ6VS4P-tXaC2g9XlrPBLGrCxirQesHacY1Qr0e2gD8yu5QXz7hXeWNBiQK3EJECIu0b0NNlp2nD4fBW56LDOY_UcvUnvfiR9X3rlplRxZ3gmrhv6jE64oyI"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-6 left-6 font-label-caps text-label-caps border border-primary px-3 py-1 bg-background text-primary">
                    ON SET // 2024
                  </div>
                </div>
              </div>
            </section>

            {/* Flowing Menu Section */}
            <section className="pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-20">
              <div className="mb-12 text-left">
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-secondary mb-3 block">
                  Our Focus
                </span>
                <h3 className="font-headline-md text-headline-md uppercase text-primary">
                  Videography Categories
                </h3>
              </div>
              <div className="border-t border-border-subtle">
                <FlowingMenu items={videographyMenu} />
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Works Grid */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-primary text-on-primary border-t border-primary transition-colors duration-400">
        <div className="max-w-container-max mx-auto">
          <h3 className="font-headline-md text-headline-md mb-12 uppercase border-b border-on-primary/20 pb-4 flex justify-between items-end">
            <span>Selected Works</span>
            <span className="font-label-caps text-label-caps text-on-primary/60">
              {activeTab === 'video' ? 'Videography' : 'Photography'}
            </span>
          </h3>

          {activeTab === 'video' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="grid-video">
              <div className="aspect-[4/5] relative overflow-hidden group border border-on-primary/20">
                <img 
                  alt="Work 1" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLtteXFYWp1BBLWoDnkZq9Cjc_e7ntDS69MnHXYfEodETf5xJxNKrGA25RP5zzw60osyQhNBOk3wuMcXH-z6R0VwJMbAvz0-Akqzdh7HtpgaZp440r2Wo4-0lII-ogVbmOimJ6VS4P-tXaC2g9XlrPBLGrCxirQesHacY1Qr0e2gD8yu5QXz7hXeWNBiQK3EJECIu0b0NNlp2nD4fBW56LDOY_UcvUnvfiR9X3rlplRxZ3gmrhv6jE64oyI"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-left">
                  <div className="font-label-caps text-label-caps mb-1 text-white/70">Campaign</div>
                  <div className="font-headline-md text-headline-md">Corporate Identity</div>
                </div>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden group border border-on-primary/20">
                <img 
                  alt="Work 2" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLubykJMpti72qzFKPfSgec6vaAzhRMqjkC6VUo0mvgelQXE2_N1aScktm8QGwshbX6N1BB67N80UaByE4xuA8TsSr3z3iUU4Bu178As_Vg8jsHu4kEvDll1eK8x27pqPdvG0-Z90nF07WtxY7KGj5xbVh3_NF2M1snOO8lBmezbOGSNNkdibylfKV3QdrofsIEAsp8F8jkFiIS2Dip_eJFBR5MWfqNnOowms_o5EwTR2u5MYNaBxb8XN9kO"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-left">
                  <div className="font-label-caps text-label-caps mb-1 text-white/70">Commercial</div>
                  <div className="font-headline-md text-headline-md">Automotive Launch</div>
                </div>
              </div>
              <div className="aspect-[4/5] relative overflow-hidden group border border-on-primary/20 md:col-span-2 lg:col-span-1">
                <img 
                  alt="Work 3" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                  src="https://lh3.googleusercontent.com/aida/AP1WRLvPUrSovpb7nJJbCwPSquhvIeq01okVP-aiMtP-xyAgiibW5r6WfMzcCF30EKf5NwHzD3VqTWmihSlVY1mspfOWm80LlPQCPUHhtcZTXxpfqoy_vU7GzwYjaMaxsxZuZ88x0wLvOijnohSuETsrgrA8ow5P4r9HOXiyh6RBJgxWSANCn7amDq71PuUkvwNEMmi1qlyjLHyHFTdSOHOrUUJTId63ViEv619I8BlDDbOm5mUzvz9QfWoxXk12"
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-left">
                  <div className="font-label-caps text-label-caps mb-1 text-white/70">Documentary</div>
                  <div className="font-headline-md text-headline-md">Brand Heritage</div>
                </div>
              </div>
            </div>
          ) : (
            <Masonry
              items={photographyWorks}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.95}
              blurToFocus={true}
              colorShiftOnHover={true}
            />
          )}
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="py-24 border-y border-primary/10 overflow-hidden bg-muted-gray transition-colors duration-400">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-8">
          <h4 className="font-label-caps text-label-caps text-secondary uppercase tracking-widest text-center">
            Trusted By
          </h4>
        </div>
        <div className="marquee-container py-8">
          <div className="marquee-content flex gap-32 items-center text-4xl md:text-6xl font-headline-lg font-bold text-primary/30 uppercase tracking-tighter">
            <span>Chintamanis</span><span>TNS Jewellers</span><span>Kalpana</span><span>Kirtilals</span><span>Glow</span>
            <span>Chintamanis</span><span>TNS Jewellers</span><span>Kalpana</span><span>Kirtilals</span><span>Glow</span>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
