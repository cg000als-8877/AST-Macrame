import React from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed"
          >
            How we collect, use, and protect your data.
          </motion.p>
        </section>

        <div className="w-full h-px bg-stone/30 mb-16" />

        <section className="mb-16">
          <div className="prose prose-lg prose-stone max-w-none font-light text-dark-charcoal/80">
            <h2 className="text-2xl font-serif text-soft-black mb-4">Data Collection</h2>
            <p className="mb-6">
              When you place an order or interact with our website, we collect personal information such as your name, phone number, email address, and delivery address. This information is collected strictly for the purpose of order fulfillment, shipping, and customer service.
            </p>

            <h2 className="text-2xl font-serif text-soft-black mb-4">Data Protection</h2>
            <p className="mb-6">
              Your privacy is extremely important to us. <strong>We will never sell, rent, or trade your personal information to third parties.</strong> Your data is securely stored and only shared with essential service providers, such as courier companies, strictly to facilitate the delivery of your order.
            </p>

            <h2 className="text-2xl font-serif text-soft-black mb-4">Communication</h2>
            <p className="mb-6">
              By placing an order or submitting an inquiry, you agree to receive order updates, shipping notifications, and customer support communications via phone, WhatsApp, or email. We will not spam you with unsolicited marketing messages.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
