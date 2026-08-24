import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    document.title = "About Us | Heritage & Ethical Artisan Mission - AST Macramé";
  }, []);
  return (
    <div className="w-full bg-cream min-h-screen pt-24 pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        {/* Story Header */}
        <section className="text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-soft-black mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed"
          >
            AST Handmade Macramé Belts was founded in January 2026 with a simple vision—to create premium handmade belts that combine traditional craftsmanship with modern fashion.
          </motion.p>
        </section>

        <div className="w-full h-px bg-stone/30 mb-24" />

        {/* Heritage & Workshop */}
        <section className="mb-24">
          <h2 className="text-2xl font-serif text-soft-black mb-6">Our Heritage in Chattogram</h2>
          <div className="prose prose-lg prose-stone max-w-none font-light text-dark-charcoal/80">
            <p className="mb-6">
              Our journey began in Chattogram, Bangladesh, a city with a rich history of textile and artisanal manufacturing. We assembled a small team of skilled artisans who share our dedication to perfection.
            </p>
            <p>
              In a world increasingly dominated by mass-produced, machine-made accessories, we chose a different path. We handcraft every single belt with patience, precision, and care. By focusing exclusively on macramé belts, we've mastered our niche, allowing us to deliver unparalleled quality to our global partners.
            </p>
          </div>
        </section>

        <div className="w-full h-px bg-stone/30 mb-24" />

        {/* Team */}
        <section className="mb-24">
          <h2 className="text-2xl font-serif text-soft-black mb-6">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-serif text-soft-black mb-1">Saifuddin Sony</h3>
              <p className="text-xs font-sans uppercase tracking-widest text-terracotta mb-4">Founder</p>
              <p className="text-sm font-light text-dark-charcoal/80 leading-relaxed">
                Driving the vision of AST to preserve handmade authenticity while meeting the exacting standards of modern fashion brands.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl shadow-sm">
              <h3 className="text-xl font-serif text-soft-black mb-1">Arfat Risve</h3>
              <p className="text-xs font-sans uppercase tracking-widest text-terracotta mb-4">Export Sales Manager</p>
              <p className="text-sm font-light text-dark-charcoal/80 leading-relaxed">
                Ensuring seamless communication, order fulfillment, and long-term business relationships with our international partners.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-stone/30 mb-24" />
        
        {/* Why Handmade Matters */}
        <section>
          <h2 className="text-2xl font-serif text-soft-black mb-6">Why Handmade Matters</h2>
          <p className="text-lg font-light text-dark-charcoal/80 leading-relaxed">
            As we continue to grow, our goal remains unchanged: to become a trusted manufacturing partner for boutique labels around the world while preserving the authenticity of handmade production. A handmade belt carries the subtle variations and human touch that no machine can replicate. It is not just an accessory; it is a piece of wearable craft.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;

