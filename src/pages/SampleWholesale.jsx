import React, { useState } from 'react';
import { motion } from 'framer-motion';
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          
          {/* Sample Column */}
          <div className="glass p-8 md:p-12 rounded-2xl shadow-sm h-full flex flex-col">
            <h2 className="text-3xl font-serif text-soft-black mb-6">Sample Orders</h2>
            <p className="text-sm text-dark-charcoal/80 font-light mb-8 leading-relaxed">
              We highly encourage ordering a physical sample to experience our premium cotton cord, buckle strength, and weaving consistency firsthand before committing to a bulk order.
            </p>
            
            <ul className="space-y-4 font-light text-dark-charcoal mb-10 flex-grow">
              <li className="flex justify-between border-b border-stone/30 pb-2">
                <span className="text-sm font-medium">Lead Time</span>
                <span className="text-sm">5–7 Days</span>
              </li>
              <li className="flex justify-between border-b border-stone/30 pb-2">
                <span className="text-sm font-medium">Payment</span>
                <span className="text-sm">Upfront for Sample</span>
              </li>
              <li className="flex justify-between border-b border-stone/30 pb-2">
                <span className="text-sm font-medium">Shipping</span>
                <span className="text-sm">Global DHL / FedEx</span>
              </li>
              <li className="flex justify-between border-b border-stone/30 pb-2">
                <span className="text-sm font-medium">Refund Policy</span>
                <span className="text-sm">Deducted from first bulk order</span>
              </li>
            </ul>

            <button 
              onClick={() => {
                setFormType('sample');
                setIsModalOpen(true);
              }}
              className="w-full bg-soft-black text-cream px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-dark-charcoal transition-colors"
            >
              Order a Sample
            </button>
          </div>

          {/* Wholesale Column */}
          <div className="bg-stone/10 border border-stone/20 p-8 md:p-12 rounded-2xl h-full flex flex-col">
            <h2 className="text-3xl font-serif text-soft-black mb-6">Wholesale & Bulk</h2>
            <p className="text-sm text-dark-charcoal/80 font-light mb-8 leading-relaxed">
              Designed for boutique labels and established brands. We provide end-to-end OEM and Private Label manufacturing tailored to your exact specifications.
            </p>
            
            <ul className="space-y-4 font-light text-dark-charcoal mb-10 flex-grow">
              <li className="flex justify-between border-b border-stone/30 pb-2">
                <span className="text-sm font-medium">Base MOQ</span>
                <span className="text-sm">100 pcs per design</span>
              </li>
              <li className="flex justify-between border-b border-stone/30 pb-2">
                <span className="text-sm font-medium">Lead Time</span>
                <span className="text-sm">25–35 Days</span>
              </li>
              <li className="flex justify-between border-b border-stone/30 pb-2">
                <span className="text-sm font-medium">Customization</span>
                <span className="text-sm">Full OEM / Private Label</span>
              </li>
              <li className="flex justify-between border-b border-stone/30 pb-2">
                <span className="text-sm font-medium">Packaging</span>
                <span className="text-sm">Custom Tags & Boxes Available</span>
              </li>
            </ul>

            <button 
              onClick={() => {
                setFormType('wholesale');
                setIsModalOpen(true);
              }}
              className="w-full border border-soft-black text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-soft-black hover:text-cream transition-colors"
            >
              Request Quotation
            </button>
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

