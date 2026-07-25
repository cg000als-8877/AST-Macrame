import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Users } from 'lucide-react';

const Contact = () => {
  return (
    <div className="w-full bg-cream min-h-screen pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        
        <section className="text-center mb-10 md:mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif text-soft-black mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto"
          >
            We are always open to discussing new partnerships, customized production, and manufacturing inquiries.
          </motion.p>
        </section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white border border-stone/20 rounded-3xl shadow-sm p-6 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Key Contacts */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-terracotta shrink-0 border border-stone/10">
                <Users size={18} />
              </div>
              <div>
                <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta mb-2">Key Contacts</h3>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm md:text-base text-soft-black font-medium">Saifuddin Sony <span className="text-dark-charcoal/60 font-light text-xs md:text-sm ml-1">(Founder)</span></span>
                  <span className="text-sm md:text-base text-soft-black font-medium">Arfat Risve <span className="text-dark-charcoal/60 font-light text-xs md:text-sm ml-1">(Export Sales)</span></span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-terracotta shrink-0 border border-stone/10">
                <Mail size={18} />
              </div>
              <div>
                <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta mb-2">Email Us</h3>
                <a href="mailto:astmacrame@gmail.com" className="text-sm md:text-base text-soft-black hover:text-terracotta transition-colors">astmacrame@gmail.com</a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-terracotta shrink-0 border border-stone/10">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta mb-2">WhatsApp</h3>
                <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="text-sm md:text-base text-soft-black hover:text-terracotta transition-colors">+880 1940-689061</a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-terracotta shrink-0 border border-stone/10">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta mb-2">Workshop Location</h3>
                <span className="text-sm md:text-base text-soft-black">Chattogram, Bangladesh</span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4 md:col-span-2">
              <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center text-terracotta shrink-0 border border-stone/10">
                <Clock size={18} />
              </div>
              <div>
                <h3 className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-terracotta mb-2">Business Hours</h3>
                <span className="text-sm md:text-base text-soft-black">Sunday – Thursday: 9:00 AM – 6:00 PM (GMT+6)</span>
              </div>
            </div>

          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 md:mt-10 text-center bg-stone/5 border border-stone/10 rounded-2xl p-6 md:p-8"
        >
          <p className="text-sm md:text-base text-dark-charcoal/80 font-light leading-relaxed">
            Need a quick response? <a href="https://wa.me/8801940689061" target="_blank" rel="noreferrer" className="text-terracotta hover:text-dark-charcoal font-medium transition-colors">Contact us on WhatsApp</a> for fast assistance. For bulk orders, OEM/private label inquiries, or business discussions, please use email.
          </p>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Contact;
