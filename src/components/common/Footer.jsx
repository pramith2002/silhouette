import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full py-section-gap px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter bg-black text-white border-t border-white/10 text-left">
      {/* Brand & Copyright */}
      <div className="md:col-span-5 flex flex-col justify-between mb-12 md:mb-0">
        <Link 
          className="font-headline-lg text-headline-lg font-black text-white tracking-tighter uppercase mb-6 hover:opacity-90 transition-opacity cursor-pointer"
          to="/"
        >
          SILHOUETTE INDIA
        </Link>
        <p className="font-label-caps text-label-caps text-white/50 mt-auto">
          © 2026 SILHOUETTE INDIA. STRATEGIC PRECISION.
        </p>
      </div>

      {/* Links Grid */}
      <div className="md:col-span-7 grid grid-cols-2 gap-8 md:flex md:justify-end md:gap-16">
        <div className="flex flex-col gap-4">
          <Link 
            className="font-label-caps text-label-caps text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" 
            to="/#consult"
          >
            Services
          </Link>
          <Link 
            className="font-label-caps text-label-caps text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" 
            to="/#partners"
          >
            Case Studies
          </Link>
          <Link 
            className="font-label-caps text-label-caps text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" 
            to="/#about"
          >
            Insights
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <Link 
            className="font-label-caps text-label-caps text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" 
            to="/"
          >
            Privacy
          </Link>
          <a 
            className="font-label-caps text-label-caps text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" 
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a 
            className="font-label-caps text-label-caps text-white/60 hover:text-white transition-colors duration-200 cursor-pointer" 
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
