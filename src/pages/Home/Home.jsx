import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Partners from './components/Partners';
import Contact from './components/Contact';

export default function Home({ isDark }) {
  return (
    <>
      <Hero isDark={isDark} />
      <About />
      <Services />
      <Partners isDark={isDark} />
      <Contact />
    </>
  );
}
