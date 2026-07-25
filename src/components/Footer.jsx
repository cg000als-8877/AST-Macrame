import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-soft-black text-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-12 mb-12">
          
          <div className="lg:col-span-1 mb-12 lg:mb-0 flex flex-col lg:items-start">
            <Link to="/" className="block mb-6">
              <img 
                src="/logo_white.png" 
                alt="AST Handmade Macramé Belts" 
                className="h-10 w-auto object-contain opacity-90"
              />
            </Link>
            <p className="font-sans font-light text-cream/60 text-xs leading-relaxed max-w-xs">
              Premium handmade macramé belt manufacturer based in Chattogram, Bangladesh. We craft for the world's most demanding boutique labels.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-8 lg:col-span-3">
            
            <div className="flex flex-col">
              <h4 className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 text-cream/40">Company</h4>
              <ul className="flex flex-col space-y-3">
                <li><Link to="/about" className="font-sans text-[13px] text-cream/80 hover:text-warm-sand transition-colors">Our Story</Link></li>
                <li><Link to="/manufacturing" className="font-sans text-[13px] text-cream/80 hover:text-warm-sand transition-colors">Manufacturing</Link></li>
                <li><Link to="/product" className="font-sans text-[13px] text-cream/80 hover:text-warm-sand transition-colors">Products</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col">
              <h4 className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 text-cream/40">Services</h4>
              <ul className="flex flex-col space-y-3">
                <li><Link to="/retail" className="font-sans text-[13px] text-cream/80 hover:text-warm-sand transition-colors">Retail</Link></li>
                <li><Link to="/sample-wholesale" className="font-sans text-[13px] text-cream/80 hover:text-warm-sand transition-colors">Order a Sample</Link></li>
                <li><Link to="/sample-wholesale" className="font-sans text-[13px] text-cream/80 hover:text-warm-sand transition-colors">Wholesale Inquiry</Link></li>
                <li><Link to="/manufacturing" className="font-sans text-[13px] text-cream/80 hover:text-warm-sand transition-colors">OEM & Private Label</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 lg:col-span-1 flex flex-col mt-2 lg:mt-0 pt-6 lg:pt-0 border-t border-cream/10 lg:border-none">
              <h4 className="font-sans text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 text-cream/40">Contact</h4>
              <ul className="flex gap-4">
                <li>
                  <a href="mailto:astmacrame@gmail.com" className="w-10 h-10 flex items-center justify-center rounded-full border border-cream/20 text-cream/80 hover:bg-cream/10 hover:text-white transition-all" aria-label="Mail">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-cream/20 text-cream/80 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all" aria-label="WhatsApp">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/share/191oCoXxWV/" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full border border-cream/20 text-cream/80 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all" aria-label="Facebook">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        
        <div className="pt-6 border-t border-cream/10 flex flex-col items-center">
          <p className="font-sans text-[10px] text-cream/40 tracking-widest uppercase">
            © {new Date().getFullYear()} AST Handmade Macramé Belts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
