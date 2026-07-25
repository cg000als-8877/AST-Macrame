import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Ruler, CheckCircle2, Sparkles, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import qcImage from '../assets/QC.jpg';

const Manufacturing = () => {
  const processSteps = [
    { title: "Inquiry", desc: "Share your design, volume, and customization requirements." },
    { title: "Quotation", desc: "Receive a detailed breakdown of costs, MOQ, and lead times." },
    { title: "Sample Development", desc: "We craft a prototype for your physical review and approval." },
    { title: "Sample Approval", desc: "You confirm the quality, size, and material." },
    { title: "Production", desc: "Our artisans begin meticulous hand-weaving of your order." },
    { title: "Quality Inspection", desc: "Individual check of every single belt for weaving, size, and finish." },
    { title: "Packaging", desc: "Applying custom hangtags, labels, and secure export packaging." },
    { title: "Shipment", desc: "Global delivery to your warehouse or distribution center." }
  ];

  const qaFeatures = [
    { name: "Weaving Quality", icon: <CheckCircle2 className="w-6 h-6" /> },
    { name: "Size Measurement", icon: <Ruler className="w-6 h-6" /> },
    { name: "Buckle Strength", icon: <ShieldCheck className="w-6 h-6" /> },
    { name: "Surface Finish", icon: <Sparkles className="w-6 h-6" /> },
    { name: "Final Packaging Inspection", icon: <PackageCheck className="w-6 h-6" /> }
  ];

  return (
    <div className="w-full bg-cream min-h-screen pb-16 md:pb-24">
      
      {/* Hero Section with Image Background */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center pt-28 md:pt-32 mb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/industrial.jpg" 
            alt="Artisan Workshop" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-soft-black/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-90"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center text-white pb-12 lg:pb-20 mt-12 md:mt-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            Manufacturing Capability
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl font-sans font-light max-w-2xl mx-auto text-white/90"
          >
            Every belt is handcrafted by our skilled team in Bangladesh, ensuring uncompromising quality control from cord to carton.
          </motion.p>
        </div>
      </section>

      {/* Stats / Capacity Grid (Overlapping the hero slightly on desktop) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 -mt-16 md:-mt-20 lg:-mt-28 relative z-20 mb-16 md:mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="glass bg-white/70 backdrop-blur-xl border border-white/40 p-4 md:p-8 rounded-xl text-center shadow-lg transition-transform hover:-translate-y-1">
            <h4 className="text-[10px] md:text-xs font-sans font-bold tracking-widest uppercase text-terracotta mb-2 md:mb-4">Current Capacity</h4>
            <p className="text-2xl md:text-4xl font-sans text-soft-black">200–300</p>
            <p className="text-[10px] md:text-sm font-sans text-dark-charcoal/70 mt-1 md:mt-2">Belts per month</p>
          </div>
          <div className="glass bg-white/70 backdrop-blur-xl border border-white/40 p-4 md:p-8 rounded-xl text-center shadow-lg transition-transform hover:-translate-y-1">
            <h4 className="text-[10px] md:text-xs font-sans font-bold tracking-widest uppercase text-terracotta mb-2 md:mb-4">Artisan Team</h4>
            <p className="text-2xl md:text-4xl font-sans text-soft-black">10</p>
            <p className="text-[10px] md:text-sm font-sans text-dark-charcoal/70 mt-1 md:mt-2">Skilled Weavers</p>
          </div>
          <div className="glass bg-white/70 backdrop-blur-xl border border-white/40 p-4 md:p-8 rounded-xl text-center shadow-lg transition-transform hover:-translate-y-1">
            <h4 className="text-[10px] md:text-xs font-sans font-bold tracking-widest uppercase text-terracotta mb-2 md:mb-4">Bulk Lead Time</h4>
            <p className="text-2xl md:text-4xl font-sans text-soft-black">25–35</p>
            <p className="text-[10px] md:text-sm font-sans text-dark-charcoal/70 mt-1 md:mt-2">Days for production</p>
          </div>
          <div className="glass bg-white/70 backdrop-blur-xl border border-white/40 p-4 md:p-8 rounded-xl text-center shadow-lg transition-transform hover:-translate-y-1">
            <h4 className="text-[10px] md:text-xs font-sans font-bold tracking-widest uppercase text-terracotta mb-2 md:mb-4">Base MOQ</h4>
            <p className="text-2xl md:text-4xl font-sans text-soft-black">100</p>
            <p className="text-[10px] md:text-sm font-sans text-dark-charcoal/70 mt-1 md:mt-2">Pieces per design</p>
          </div>
        </div>
      </section>

      {/* Production Process Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 md:mb-24">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-soft-black mb-4">The Order Process</h2>
          <div className="w-16 h-px bg-terracotta mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {processSteps.map((step, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              key={index} 
              className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-stone/10 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="text-terracotta font-serif text-2xl md:text-3xl font-medium mb-2 md:mb-4">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-sm md:text-xl text-soft-black mb-1 md:mb-3">{step.title}</h3>
              <p className="text-[10px] md:text-sm font-sans font-light text-dark-charcoal/80 leading-snug md:leading-relaxed mt-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quality Control */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-16 md:pb-0">
        <div className="bg-white border border-stone/20 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm flex flex-col p-6 md:p-12 lg:p-16">
          
          {/* Content & Image Row */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-6 md:mb-14">
            
            <div className="lg:w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl md:text-4xl font-serif text-soft-black mb-4 md:mb-6">Rigorous Quality Assurance</h2>
              <div className="w-12 h-px bg-terracotta mb-6 md:mb-8"></div>
              <p className="font-sans font-light text-dark-charcoal/80 mb-8 md:mb-12 leading-snug md:leading-relaxed text-sm md:text-lg">
                Every handmade belt is individually inspected before shipment. We do not batch-test; we physically review 100% of our output to ensure it meets international boutique standards.
              </p>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 md:gap-y-8 md:gap-x-6">
                {qaFeatures.map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 md:space-x-4">
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-cream flex items-center justify-center text-terracotta flex-shrink-0 border border-stone/20">
                      <div className="scale-75 md:scale-100">{item.icon}</div>
                    </div>
                    <span className="font-sans font-medium text-soft-black text-[10px] md:text-sm leading-tight">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative w-full flex items-center justify-center">
              <div className="w-full max-w-[500px] relative aspect-square bg-stone/10 overflow-hidden rounded-xl md:rounded-2xl shadow-sm border border-stone/20">
                <img 
                  src={qcImage} 
                  alt="Quality Control Inspection" 
                  className="absolute inset-0 w-full h-full object-cover object-center" 
                />
              </div>
            </div>
            
          </div>

          {/* Centered CTA */}
          <div className="flex flex-col items-center justify-center pt-5 md:pt-8 border-t border-stone/10 mt-auto">
            <Link 
              to="/sample-wholesale" 
              className="bg-soft-black text-cream px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-dark-charcoal transition-colors shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
            <p className="text-[10px] md:text-xs italic text-dark-charcoal/70 mt-3">
              Request Sample → Discuss bulk orders
            </p>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Manufacturing;

