import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
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
            Terms & Conditions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed"
          >
            By using our website and placing an order, you agree to the following terms.
          </motion.p>
        </section>

        <div className="w-full h-px bg-stone/30 mb-16" />

        <section className="mb-16">
          <div className="prose prose-lg prose-stone max-w-none font-light text-dark-charcoal/80">
            <h2 className="text-2xl font-serif text-soft-black mb-4">Handmade Variations</h2>
            <p className="mb-6">
              By purchasing from AST Macrame, the customer explicitly acknowledges that all our items are 100% handmade. Minor variations in color, knot tension, slight sizing differences, and minor imperfections are natural characteristics of handmade macramé and <strong>do not constitute a defect.</strong> Each piece is unique.
            </p>

            <h2 className="text-2xl font-serif text-soft-black mb-4">Right to Refuse Service</h2>
            <p className="mb-6">
              We reserve the absolute right to refuse service, cancel orders, or terminate accounts at our sole discretion, particularly if fraudulent activity, abuse, or violation of these terms is suspected.
            </p>

            <h2 className="text-2xl font-serif text-soft-black mb-4">Intellectual Property</h2>
            <p className="mb-6">
              All designs, images, text, and brand assets on this website belong exclusively to AST Macrame. Unauthorized use, replication, or distribution of our designs or media is strictly prohibited and protected by copyright laws.
            </p>

            <h2 className="text-2xl font-serif text-soft-black mb-4">Limitation of Liability</h2>
            <p className="mb-6">
              AST Macrame is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products. Our maximum liability in any circumstance is strictly limited to the purchase price of the product in question.
            </p>
            
            <h2 className="text-2xl font-serif text-soft-black mb-4">Wholesale Contracts</h2>
            <p className="mb-6">
              For B2B wholesale and OEM contracts, any specific physical or digital agreements signed between AST Macrame and the client will supersede these general terms in the event of a conflict.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;
