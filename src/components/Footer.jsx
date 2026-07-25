import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-soft-black text-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-6">
              <img 
                src="/logo_white.png" 
                alt="AST Handmade Macramé Belts" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="font-sans font-light text-cream/70 text-sm leading-relaxed max-w-sm">
              Premium handmade macramé belt manufacturer based in Chattogram, Bangladesh. We craft for the world's most demanding boutique labels.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-cream/50">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="font-sans text-sm hover:text-warm-sand transition-colors">Our Story</Link></li>
              <li><Link to="/manufacturing" className="font-sans text-sm hover:text-warm-sand transition-colors">Manufacturing</Link></li>
              <li><Link to="/product" className="font-sans text-sm hover:text-warm-sand transition-colors">Products</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-cream/50">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/sample-wholesale" className="font-sans text-sm hover:text-warm-sand transition-colors">Order a Sample</Link></li>
              <li><Link to="/sample-wholesale" className="font-sans text-sm hover:text-warm-sand transition-colors">Wholesale Inquiry</Link></li>
              <li><Link to="/manufacturing" className="font-sans text-sm hover:text-warm-sand transition-colors">OEM & Private Label</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans text-xs font-bold tracking-widest uppercase mb-6 text-cream/50">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:astmacrame@gmail.com" className="font-sans text-sm hover:text-warm-sand transition-colors">
                  Mail
                </a>
              </li>
              <li>
                <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="font-sans text-sm hover:text-warm-sand transition-colors">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/191oCoXxWV/" target="_blank" rel="noreferrer" className="font-sans text-sm hover:text-warm-sand transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center">
          <p className="font-sans text-xs text-cream/50">
            © {new Date().getFullYear()} AST Handmade Macramé Belts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
