import React from 'react';
import { motion } from 'framer-motion';

const Refund = () => {
  return (
    <div className="w-full bg-cream min-h-screen pt-24 pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <section className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif text-soft-black mb-6"
          >
            Refund & Return Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Please read our strict refund and return policies carefully before making a purchase.
          </motion.p>
        </section>

        <div className="w-full h-px bg-stone/30 mb-16" />

        <section className="mb-16">
          <div className="prose prose-lg prose-stone max-w-none font-light text-dark-charcoal/80">
            <h2 className="text-2xl font-serif text-soft-black mb-4">Strict No "Change of Mind" Returns</h2>
            <p className="mb-6">
              Because our macramé belts are premium, handmade-to-order items crafted with significant time and effort, <strong>we do not accept returns, exchanges, or issue refunds for "change of mind" or incorrect sizing ordered by the customer.</strong> Please ensure you carefully review your order details before submission.
            </p>

            <h2 className="text-2xl font-serif text-soft-black mb-4">Defective or Incorrect Items</h2>
            <p className="mb-6">
              In the highly unlikely event that you receive a defective or incorrect item, you must contact us within <strong>24 hours</strong> of the delivery timestamp. After 24 hours, no claims will be considered.
            </p>

            <h2 className="text-2xl font-serif text-soft-black mb-4 text-terracotta">Mandatory Unboxing Video</h2>
            <p className="mb-6">
              To claim a defect, damage during transit, or a missing item, <strong>a continuous, unedited unboxing video is absolutely mandatory.</strong> The video must clearly show the sealed package being opened and the issue being identified. Without this video, no claim will be entertained under any circumstances.
            </p>

            <h2 className="text-2xl font-serif text-soft-black mb-4">Wholesale & OEM Orders</h2>
            <p className="mb-6">
              Custom manufacturing, B2B, and wholesale orders are strictly non-refundable and non-cancellable once the 50% advance payment has been made and production has commenced. Any issues with wholesale orders must be communicated within 3 days of receiving the cargo, subject to the same mandatory video evidence.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Refund;
