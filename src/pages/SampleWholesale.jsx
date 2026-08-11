import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InquiryModal from '../components/InquiryModal';
import wholesaleHeroImage from '../assets/wholesale_hero.jpg';

const SampleWholesale = () => {
  const [formType, setFormType] = useState('sample');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-cream min-h-screen pb-16 md:pb-24">
      
      {/* Split Hero Section */}
      <section className="relative w-full min-h-[70vh] pt-24 md:pt-32 pb-12 flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-6 lg:px-12 gap-12">
        
        {/* Left: Text & Stats */}
        <div className="flex-1 w-full flex flex-col justify-center items-start text-left mt-8 lg:mt-0 z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-xs font-bold tracking-widest uppercase text-terracotta mb-4">Sample & Wholesale</h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-soft-black mb-6 leading-tight">
              Partner With Us
            </h1>
            <p className="text-base md:text-lg text-dark-charcoal/80 font-light max-w-lg mb-10 leading-relaxed">
              Whether you are testing our quality or ready to place a bulk order for your next collection, we provide end-to-end OEM and Private Label manufacturing tailored to your specifications.
            </p>
          </motion.div>

          {/* Minimalist Stats Data Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-row flex-wrap gap-y-6 gap-x-8 lg:gap-x-12 border-t border-stone/20 pt-8 w-full max-w-lg"
          >
            <div>
              <p className="text-2xl font-serif text-soft-black">100</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-dark-charcoal/60 mt-1">Base MOQ</p>
            </div>
            <div className="w-px h-10 bg-stone/20 hidden md:block"></div>
            <div>
              <p className="text-2xl font-serif text-soft-black">5–7</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-dark-charcoal/60 mt-1">Sample Days</p>
            </div>
            <div className="w-px h-10 bg-stone/20 hidden md:block"></div>
            <div>
              <p className="text-2xl font-serif text-soft-black">25–35</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-dark-charcoal/60 mt-1">Bulk Days</p>
            </div>
          </motion.div>
        </div>
        
        {/* Right: New Image Hero */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full h-[500px] lg:h-[600px] relative"
        >
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl border border-stone/10">
            <img 
              src={wholesaleHeroImage} 
              alt="Premium Wholesale Macrame Display" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Split Content Layout */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 mb-20 md:mb-32 mt-12 md:mt-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Descriptive Text */}
          <div className="flex-1 lg:sticky lg:top-32">
            <h2 className="text-3xl md:text-5xl font-serif text-soft-black mb-6">Manufacturing Excellence</h2>
            <div className="w-16 h-px bg-terracotta mb-8"></div>
            <p className="text-sm md:text-base text-dark-charcoal/80 font-light mb-6 leading-relaxed">
              We highly encourage ordering a physical sample to experience our premium cotton cord, buckle strength, and weaving consistency firsthand. 
            </p>
            <Link 
              to="/product"
              className="inline-flex items-center justify-center bg-soft-black text-cream px-8 py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-dark-charcoal transition-colors shadow-sm hover:shadow-md w-full sm:w-auto mt-6"
            >
              Order a Sample
            </Link>
          </div>

          {/* Right Side: Key Details & Policies */}
          <div className="flex-1 w-full bg-white/40 border border-stone/20 rounded-3xl p-8 md:p-12 shadow-sm">
            <div className="space-y-8">
              
              <div>
                <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta mb-2">Customization</h4>
                <p className="text-soft-black text-lg md:text-xl font-serif">Full OEM / Private Label</p>
                <p className="text-sm text-dark-charcoal/70 mt-1 md:mt-2 leading-relaxed">We can adjust colors, patterns, and dimensions to suit your brand's unique needs.</p>
              </div>
              
              <div className="w-full h-px bg-stone/20"></div>

              <div>
                <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta mb-2">Packaging</h4>
                <p className="text-soft-black text-lg md:text-xl font-serif">Custom Tags & Boxes</p>
                <p className="text-sm text-dark-charcoal/70 mt-1 md:mt-2 leading-relaxed">Your products arrive retail-ready with your custom branding and premium unboxing experience.</p>
              </div>

              <div className="w-full h-px bg-stone/20"></div>

              <div>
                <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta mb-2">Sample Policy</h4>
                <p className="text-soft-black text-lg md:text-xl font-serif">Refunded on first bulk order</p>
                <p className="text-sm text-dark-charcoal/70 mt-1 md:mt-2 leading-relaxed">The cost of your sample (excluding shipping) will be fully credited towards your first production run.</p>
              </div>
              
            </div>
          </div>
          
        </div>
      </section>

      {/* Start Bulk Production Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 text-center mb-16 border-t border-stone/20 pt-16 md:pt-24">
        <h3 className="font-serif text-3xl md:text-5xl text-soft-black mb-6">
          Ready to scale?
        </h3>
        <p className="text-sm md:text-base text-dark-charcoal/80 font-light mb-10 max-w-2xl mx-auto">
          If you have already approved your sample or have your tech packs ready, let's start the conversation for your bulk production run.
        </p>
        <Link 
          to="/contact"
          className="inline-flex items-center justify-center border border-soft-black text-soft-black px-10 py-5 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-soft-black hover:text-cream transition-colors shadow-sm w-full sm:w-auto"
        >
          Get Started
        </Link>
      </section>

      {/* Inquiry Modal */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        formType={formType} 
      />

    </div>
  );
};

export default SampleWholesale;
