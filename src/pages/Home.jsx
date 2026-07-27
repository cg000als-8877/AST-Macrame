import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import mobileHeroImage from '../assets/mobile_hero.jpg';
import hgBlack from '../assets/homepage-gallery/Black.jpg';
import hgNavy from '../assets/homepage-gallery/Navy.jpg';
import hgBrown from '../assets/homepage-gallery/Brown.jpg';
import hgMaroon from '../assets/homepage-gallery/Maroon.jpg';
import hgKhaki from '../assets/homepage-gallery/Khaki.jpg';

const FeaturedProductSection = () => {
  const scrollRef = useRef(null);
  const belts = [
    { id: 1, colorName: 'Black', hex: '#1a1a1a', img: hgBlack, desc: 'A versatile, bold shade for effortless styling.' },
    { id: 2, colorName: 'Navy', hex: '#1c2841', img: hgNavy, desc: 'Deep, elegant, and timeless everyday wear.' },
    { id: 3, colorName: 'Brown', hex: '#8b4513', img: hgBrown, desc: 'Warm and richly textured for rustic looks.' },
    { id: 4, colorName: 'Maroon', hex: '#5c222e', img: hgMaroon, desc: 'Sophisticated and striking with any outfit.' },
    { id: 5, colorName: 'Khaki', hex: '#d4c7b1', img: hgKhaki, desc: 'Classic, natural, and beautifully refined.' },
  ];

  // Auto-slide logic for mobile every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        // Check if we reached the end (with a small 10px buffer)
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        
        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll by roughly one item width (80vw)
          const scrollAmount = window.innerWidth * 0.8; 
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-soft-black mb-4">AST Handmade Macramé Belt</h2>
        <p className="text-sm md:text-base text-dark-charcoal/70 font-light max-w-2xl mx-auto">
          Explore our premium handmade macramé belts, available in five distinct colorways. Custom colors can also be requested for bulk wholesale orders.
        </p>
      </div>

      {/* Full width container */}
      <div className="w-full px-4 lg:px-4">
        <div 
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-5 gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-4 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {belts.map((belt) => (
            <div key={belt.id} className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-0 flex flex-col items-center text-center snap-center">
              {/* 3:4 Frame with rounded corners */}
              <div className="w-full relative aspect-[3/4] bg-stone/10 overflow-hidden mb-6 rounded-none shadow-sm">
                <img 
                  src={belt.img}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={`Macrame Belt in ${belt.colorName}`}
                />
              </div>

              {/* Details */}
              <div className="flex items-start gap-3 text-left mb-4 w-full px-2">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-none shadow-sm border border-stone/20 shrink-0 mt-[2px]" style={{ backgroundColor: belt.hex }} />
                <div className="flex flex-col">
                  <h3 className="text-base md:text-lg font-serif text-soft-black mb-1 leading-none">{belt.colorName}</h3>
                  <p className="text-xs md:text-sm text-dark-charcoal/70 font-light leading-relaxed">
                    {belt.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centralized Button */}
      <div className="flex justify-center mt-6 lg:mt-12">
        <Link 
          to="/product"
          className="bg-soft-black text-cream px-10 py-4 md:py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-dark-charcoal transition-colors inline-block text-center"
        >
          See Details
        </Link>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-soft-black">
        {/* Image layer in flow to dictate height */}
        <div className="w-full aspect-[2/3] md:aspect-[21/9] md:h-auto overflow-hidden bg-stone/20">
          {/* Desktop Image */}
          <img 
            src="/hero.jpg" 
            alt="Handmade Macramé Belts Desktop" 
            className="hidden md:block w-full h-full object-cover object-center scale-[1.05] translate-y-[-2%]"
          />
          {/* Mobile Image */}
          <img 
            src={mobileHeroImage} 
            alt="Handmade Macramé Belts Mobile" 
            className="block md:hidden w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-soft-black/40 pointer-events-none" />
        
        {/* Hero Text */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end items-center md:items-start text-center md:text-left px-6 md:px-12 lg:px-20 pb-12 md:pb-16 lg:pb-24 pt-32">
          <div className="max-w-4xl md:max-w-2xl w-full">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl text-cream font-serif leading-tight mb-3 md:mb-4"
            >
              Crafted for <br className="hidden md:block"/>
              the Extraordinary.
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-sm md:text-base lg:text-lg text-cream/90 font-light mb-8 md:mb-10 max-w-[95%] md:max-w-xl mx-auto md:mx-0"
            >
              Premium handmade macramé belts engineered for boutique labels, private brands, and independent designers worldwide.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start items-center md:items-start w-full"
            >
              <Link 
                to="/product" 
                className="bg-cream text-soft-black px-8 py-3.5 md:px-8 md:py-3.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-warm-sand transition-colors inline-block"
              >
                Explore Products
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Intro */}
      <section className="py-16 md:py-24 bg-cream text-soft-black px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-dark-charcoal">
            Traditional Craftsmanship.<br/>Modern Manufacturing.
          </h2>
          <p className="text-sm md:text-lg text-dark-charcoal/80 font-light leading-relaxed max-w-3xl mx-auto">
            Based in Chattogram, Bangladesh, our artisan workshop specializes exclusively in high-quality cotton macramé belts. Rather than relying on mass production, every belt is meticulously handwoven by skilled artisans, ensuring consistency, durability, and a premium tactile finish.
          </p>
        </div>
      </section>

      {/* Featured Product Slideshow */}
      <FeaturedProductSection />

      {/* Features Grid */}
      <section className="py-12 md:py-20 bg-cotton-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full">
            
            {/* Bento Card 1: Premium Materials */}
            <div className="group relative rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[3/2]">
              <img src="/premium_materials_bento.jpg" alt="Premium Materials" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 md:opacity-75 md:group-hover:opacity-95 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 md:gap-4 transform transition-transform duration-500 md:group-hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-none bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">Premium Materials</h3>
                </div>
                
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-2 pb-2">
                      We source only high-quality cotton macramé cord and rust-resistant, durable metal buckles for every piece.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bento Card 2: OEM & Private Label */}
            <div className="group relative rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[3/2]">
              <img src="/oem_private_label_bento.jpg" alt="OEM & Private Label" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 md:opacity-75 md:group-hover:opacity-95 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 md:gap-4 transform transition-transform duration-500 md:group-hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-none bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">OEM &<br/>Private Label</h3>
                </div>
                
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-2 pb-2">
                      Complete customization including custom tags, packaging, bespoke colors, and specific size requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bento Card 3: Quality Assured */}
            <div className="group relative rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 w-full aspect-[3/2]">
              <img src="/quality_assured_bento.jpg" alt="Quality Assured" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-85 md:opacity-75 md:group-hover:opacity-95 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end">
                <div className="flex items-center gap-3 md:gap-4 transform transition-transform duration-500 md:group-hover:-translate-y-2">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-none bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white leading-tight">Quality Assured</h3>
                </div>
                
                <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  <div className="overflow-hidden">
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-2 pb-2">
                      Every belt undergoes rigorous individual inspection covering weaving quality, size accuracy, and buckle strength.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-16 md:py-24 overflow-hidden bg-cream">
        <div className="text-center px-6 mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 md:mb-6 text-soft-black">
            Who We Work With
          </h2>
          <p className="text-sm md:text-base text-dark-charcoal/70 max-w-2xl mx-auto font-light">
            We are proud to be the trusted manufacturing partner for a diverse range of visionary brands across the globe.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4 auto-rows-[90px] sm:auto-rows-[110px] lg:auto-rows-[130px]">
            {[
              { title: "Boutique Fashion Brands", desc: "Elevate your curated collections with artisanal macramé accessories.", span: "col-span-2 row-span-1 lg:col-span-2 lg:row-span-2", img: "/boutique_bento.jpg" },
              { title: "Private Label Brands", desc: "Seamlessly integrate our high-quality belts into your unique product lineup.", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", img: "/private_label_bento.jpg" },
              { title: "Shopify Stores", desc: "Expand your online catalog with unique products that drive sales.", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1", img: "/shopify_bento.jpg" },
              { title: "E-commerce Businesses", desc: "Reliable wholesale supply of consistent, premium handmade goods.", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1", img: "/ecommerce_bento.jpg" },
              { title: "Fashion Startups", desc: "Flexible minimum order quantities to help launch your accessory line.", span: "col-span-2 row-span-1 lg:col-span-2 lg:row-span-1", img: "/startups_bento.jpg" },
              { title: "Gift Brands", desc: "Beautifully crafted pieces that make perfect, memorable gifts.", span: "col-span-1 row-span-1 lg:col-span-1 lg:row-span-2", img: "/gift_brands_bento.jpg" },
              { title: "Lifestyle Brands", desc: "Authentic, sustainable handmade accessories that resonate with your audience.", span: "col-span-1 row-span-2 lg:col-span-1 lg:row-span-2", img: "/lifestyle_brands_bento.jpg" },
              { title: "Accessory Retailers", desc: "Diversify your retail offerings with our highly sought-after macramé belts.", span: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1", img: "/accessory_retailers_bento.jpg" }
            ].map((partner, idx) => (
              <div 
                key={idx}
                className={`group relative rounded-none shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center overflow-hidden cursor-default ${partner.span}`}
              >
                <img src={partner.img} alt={partner.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-soft-black/95 via-soft-black/70 to-soft-black/50 opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-2 md:px-4 mt-1 md:mt-2">
                  <div className="transform transition-transform duration-500 md:group-hover:-translate-y-1">
                    <h3 className="font-sans text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.15em] uppercase text-white font-semibold text-center drop-shadow-md">
                      {partner.title}
                    </h3>
                  </div>
                  
                  <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100 w-full">
                    <div className="overflow-hidden flex flex-col justify-start">
                      <p className="text-white/95 text-[9px] md:text-[11px] leading-snug md:leading-relaxed text-center mt-1 md:mt-2 drop-shadow">
                        {partner.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-stone/20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-soft-black">
            Ready to partner with us?
          </h2>
          <p className="text-sm md:text-lg text-dark-charcoal/80 mb-12 max-w-2xl mx-auto">
            Whether you need a single sample to review our quality or a wholesale quotation for your next collection, we are here to assist you.
          </p>
          <div className="flex flex-col items-center justify-center gap-[1px]">
            <Link 
              to="/sample-wholesale" 
              className="bg-soft-black text-cream px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-none hover:bg-dark-charcoal transition-colors"
            >
              Get Started
            </Link>
            <p className="text-[10px] md:text-xs italic text-dark-charcoal/70 mt-1">
              Request Sample → Discuss bulk orders
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

