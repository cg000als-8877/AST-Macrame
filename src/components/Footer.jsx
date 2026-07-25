import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-soft-black text-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-12 mb-12 md:mb-16">
          
          <div className="lg:col-span-1 mb-12 lg:mb-0 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link to="/" className="block mb-6 md:mb-8">
              <img 
                src="/logo_white.png" 
                alt="AST Handmade Macramé Belts" 
                className="h-10 md:h-12 w-auto object-contain opacity-90"
              />
            </Link>
            <p className="font-sans font-light text-cream/70 text-xs md:text-sm leading-relaxed max-w-xs md:max-w-sm">
              Premium handmade macramé belt manufacturer based in Chattogram, Bangladesh. We craft for the world's most demanding boutique labels.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-8 lg:col-span-3 lg:grid-cols-3">
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h4 className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-5 md:mb-6 text-cream/40">Company</h4>
              <ul className="space-y-3 md:space-y-4">
                <li><Link to="/about" className="font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand transition-colors">Our Story</Link></li>
                <li><Link to="/manufacturing" className="font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand transition-colors">Manufacturing</Link></li>
                <li><Link to="/product" className="font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand transition-colors">Products</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <h4 className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-5 md:mb-6 text-cream/40">Services</h4>
              <ul className="space-y-3 md:space-y-4">
                <li><Link to="/sample-wholesale" className="font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand transition-colors">Order a Sample</Link></li>
                <li><Link to="/sample-wholesale" className="font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand transition-colors">Wholesale Inquiry</Link></li>
                <li><Link to="/manufacturing" className="font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand transition-colors">OEM & Private Label</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-4 lg:mt-0 pt-8 lg:pt-0 border-t border-cream/5 lg:border-none">
              <h4 className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-5 md:mb-6 text-cream/40">Contact</h4>
              <ul className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-0 lg:flex-col lg:space-y-4">
                <li>
                  <a href="mailto:astmacrame@gmail.com" className="inline-block px-4 py-1.5 lg:p-0 border border-cream/10 lg:border-none rounded-full font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand hover:border-warm-sand/50 transition-all">
                    Mail
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="inline-block px-4 py-1.5 lg:p-0 border border-cream/10 lg:border-none rounded-full font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand hover:border-warm-sand/50 transition-all">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/share/191oCoXxWV/" target="_blank" rel="noreferrer" className="inline-block px-4 py-1.5 lg:p-0 border border-cream/10 lg:border-none rounded-full font-sans text-[13px] md:text-sm text-cream/80 hover:text-warm-sand hover:border-warm-sand/50 transition-all">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        
        <div className="pt-8 border-t border-cream/10 flex flex-col items-center lg:flex-row lg:justify-between text-center lg:text-left">
          <p className="font-sans text-[11px] md:text-xs text-cream/40 tracking-wider">
            © {new Date().getFullYear()} AST Handmade Macramé Belts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
