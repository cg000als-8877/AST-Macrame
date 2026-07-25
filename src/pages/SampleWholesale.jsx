import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InquiryModal from '../components/InquiryModal';

const SampleWholesale = () => {
  const [formType, setFormType] = useState('sample');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-cream min-h-screen pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <section className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-soft-black mb-4"
          >
            Partner With Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto"
          >
            Whether you are testing our quality or ready to place a bulk order for your next collection.
          </motion.p>
        </section>

        <div className="glass max-w-4xl mx-auto p-8 md:p-14 rounded-[2rem] shadow-sm border border-stone/20 mb-24">
          <h2 className="text-3xl font-serif text-soft-black mb-6 text-center">Sample & Bulk Manufacturing</h2>
          <p className="text-sm text-dark-charcoal/80 font-light mb-12 leading-relaxed text-center max-w-3xl mx-auto">
            We highly encourage ordering a physical sample to experience our premium cotton cord, buckle strength, and weaving consistency firsthand. For boutique labels and established brands, we provide end-to-end OEM and Private Label manufacturing tailored to your exact specifications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-12">
            <div className="flex justify-between items-center border-b border-stone/30 pb-3">
              <span className="text-sm font-medium text-soft-black">Base MOQ</span>
              <span className="text-sm text-dark-charcoal">100 pcs per design</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone/30 pb-3">
              <span className="text-sm font-medium text-soft-black">Sample Lead Time</span>
              <span className="text-sm text-dark-charcoal">5–7 Days</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone/30 pb-3">
              <span className="text-sm font-medium text-soft-black">Bulk Lead Time</span>
              <span className="text-sm text-dark-charcoal">25–35 Days</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone/30 pb-3">
              <span className="text-sm font-medium text-soft-black">Customization</span>
              <span className="text-sm text-dark-charcoal">Full OEM / Private Label</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone/30 pb-3">
              <span className="text-sm font-medium text-soft-black">Packaging</span>
              <span className="text-sm text-dark-charcoal">Custom Tags & Boxes</span>
            </div>
            <div className="flex justify-between items-center border-b border-stone/30 pb-3">
              <span className="text-sm font-medium text-soft-black">Sample Policy</span>
              <span className="text-sm text-dark-charcoal">Refunded on first bulk order</span>
            </div>
          </div>

          <div className="flex flex-col items-center mt-8">
            <Link 
              to="/product"
              className="inline-block text-center bg-soft-black text-cream px-10 md:px-14 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-dark-charcoal transition-colors shadow-sm hover:shadow-md w-full md:w-auto mb-12"
            >
              Order a Sample
            </Link>

            <div className="w-full border-t border-stone/20 pt-10 text-center">
              <h3 className="font-serif text-xl md:text-2xl text-soft-black mb-6">
                Already approved your sample? Let's start bulk production.
              </h3>
              <Link 
                to="/contact"
                className="inline-block text-center border border-soft-black text-soft-black px-10 md:px-14 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-soft-black hover:text-cream transition-colors shadow-sm w-full md:w-auto"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Inquiry Modal */}
        <InquiryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          formType={formType} 
        />

      </div>
    </div>
  );
};

export default SampleWholesale;

