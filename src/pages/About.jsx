import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Users, 
  Globe2, 
  ShieldCheck, 
  Award, 
  Layers, 
  Clock, 
  MapPin, 
  MessageCircle, 
  ArrowRight,
  CheckCircle2,
  Heart
} from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = "About Us | Heritage & Ethical Artisan Mission - AST Macramé";
  }, []);

  const craftPillars = [
    {
      icon: Sparkles,
      title: "100% Handcrafted Precision",
      desc: "Every diamond pattern is individually braided by skilled artisans under standardized tension. No machine can replicate the natural pin-anywhere micro-flexibility of genuine macramé.",
      tag: "Pure Craftsmanship"
    },
    {
      icon: Heart,
      title: "Ethical Fair-Wage Workshop",
      desc: "Our Chattogram workshop fosters dignified working conditions, transparent wages, and continuous artisan skill training, honoring Bangladesh's deep textile legacy.",
      tag: "Social Responsibility"
    },
    {
      icon: Globe2,
      title: "Export & OEM Ready",
      desc: "From indie boutique collections to multi-thousand piece private label runs, we deliver standardized QC, custom Pantone dyeing, and express worldwide freight.",
      tag: "Global Standard"
    }
  ];

  const highlights = [
    { label: "Founded", value: "January 2026" },
    { label: "Workshop Location", value: "Chattogram, Bangladesh" },
    { label: "Primary Material", value: "100% Combed Natural Cotton" },
    { label: "Hardware Standard", value: "Cast Anti-Rust Zinc Alloy" },
    { label: "MOQ for Wholesale", value: "Starting at 100 pcs" },
    { label: "Worldwide Sampling", value: "Express Door-to-Door Dispatch" }
  ];

  return (
    <div className="w-full bg-cream min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 selection:bg-terracotta selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 border-b border-stone/15">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              OUR STORY &amp; ARTISAN PURPOSE
            </span>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold uppercase tracking-tight text-soft-black mb-3 sm:mb-5 leading-tight">
              HANDMADE HERITAGE, MODERN ACCESSORY CRAFT
            </h1>
            
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed">
              Founded in Chattogram, Bangladesh, AST is a dedicated artisanal workshop creating premium macramé belts that fuse traditional textile knotting with contemporary fashion elegance.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 2. THREE CORE PILLARS MATRIX */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 border-b border-stone/15 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-1.5 sm:mb-2">
              WHY WE EXIST
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold uppercase text-soft-black tracking-tight">
              THE THREE PILLARS OF AST
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {craftPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-soft-black/40 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-soft-black text-cream flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[9.5px] font-semibold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-serif font-semibold uppercase text-soft-black mb-2.5">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. STORY & HERITAGE DETAIL */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 border-b border-stone/15 bg-cream">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
                CHATTOGRAM, BANGLADESH
              </span>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold uppercase text-soft-black tracking-tight mb-4 sm:mb-6 leading-tight">
                MASTERING A SINGLE CRAFT TO PERFECTION
              </h2>

              <div className="space-y-4 text-xs sm:text-sm md:text-base text-dark-charcoal/85 font-light leading-relaxed">
                <p>
                  In a world dominated by fast-fashion synthetic belts that peel, crack, and end up in landfills within months, AST chose a deliberate, patient alternative.
                </p>
                <p>
                  By focusing exclusively on 100% natural cotton macramé accessories, our artisans have mastered tension balance, knot uniformity, and edge finishing. The result is a belt that breathes with the wearer, moves without stiffness, and withstands daily wear year after year.
                </p>
                <p>
                  Today, we proudly serve retail customers across Bangladesh with risk-free Cash on Delivery, and partner with boutique apparel labels internationally for low-MOQ private label production.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="bg-soft-black text-cream px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] rounded hover:bg-dark-charcoal transition-all shadow-sm inline-flex items-center gap-2"
                >
                  <span>Explore Belts</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/sample-wholesale"
                  className="bg-white border border-stone/30 text-soft-black px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] rounded hover:border-soft-black hover:bg-soft-black hover:text-cream transition-all shadow-2xs"
                >
                  Wholesale &amp; Private Label
                </Link>
              </div>
            </div>

            {/* Right Column: Workshop Stats Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-stone/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-3 pb-4 mb-5 border-b border-stone/15">
                  <div className="w-10 h-10 rounded-xl bg-terracotta text-cream flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-base text-soft-black uppercase">
                      Workshop Standards
                    </h3>
                    <span className="text-[11px] text-dark-charcoal/60 font-medium">Factsheet &amp; Credentials</span>
                  </div>
                </div>

                <div className="divide-y divide-stone/15">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
                      <span className="text-dark-charcoal/70 font-light">{item.label}</span>
                      <span className="font-semibold text-soft-black text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. LEADERSHIP & TEAM */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 border-b border-stone/15 bg-white">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-1.5 sm:mb-2">
              THE WORKSHOP TEAM
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold uppercase text-soft-black tracking-tight">
              LEADERSHIP &amp; EXPORT MANAGERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Saifuddin Sony */}
            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-soft-black/40 transition-all">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-soft-black text-cream flex items-center justify-center font-serif text-lg font-semibold shrink-0">
                    SS
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-soft-black">Saifuddin Sony</h3>
                    <span className="text-xs font-semibold uppercase tracking-widest text-terracotta block mt-0.5">Founder &amp; Production Lead</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-light text-dark-charcoal/80 leading-relaxed">
                  Directing the artisanal production line, standardizing weave tension tolerances, and driving the long-term vision to preserve authentic handmade craftsmanship.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone/20 flex items-center justify-between text-xs">
                <span className="text-dark-charcoal/60 font-light">Based in Chattogram</span>
                <a 
                  href="mailto:astmacrame@gmail.com?subject=Inquiry%20for%20Saifuddin%20Sony"
                  className="text-terracotta hover:text-soft-black font-semibold uppercase tracking-wider transition-colors"
                >
                  Contact Founder &rarr;
                </a>
              </div>
            </div>

            {/* Arfat Risve */}
            <div className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-soft-black/40 transition-all">
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-full bg-terracotta text-cream flex items-center justify-center font-serif text-lg font-semibold shrink-0">
                    AR
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-soft-black">Arfat Risve</h3>
                    <span className="text-xs font-semibold uppercase tracking-widest text-terracotta block mt-0.5">Export Sales Manager</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-light text-dark-charcoal/80 leading-relaxed">
                  Leading international client communication, sample development coordination, FOB export logistics, and OEM private label contracts for overseas buyers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone/20 flex items-center justify-between text-xs">
                <span className="text-dark-charcoal/60 font-light">International Inquiries</span>
                <a 
                  href="https://wa.me/8801940689061?text=Hello%20Arfat,%20I%20would%20like%20to%20discuss%20an%20export%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="text-terracotta hover:text-soft-black font-semibold uppercase tracking-wider transition-colors"
                >
                  Chat on WhatsApp &rarr;
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. FINAL PARTNERSHIP CTA BANNER */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#131E33] text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-warm-sand mb-2 sm:mb-3 block">
            READY TO COLLABORATE?
          </span>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-semibold uppercase text-cream tracking-tight mb-3 sm:mb-4">
            DISCOVER THE AST MACRAMÉ STANDARD
          </h2>
          
          <p className="text-xs sm:text-base md:text-lg text-cream/80 font-light mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed">
            Order physical sample belts for your design studio review or explore our retail collection today.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <Link 
              to="/sample-order" 
              className="w-full sm:w-auto bg-cream text-soft-black px-8 sm:px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded hover:bg-warm-sand transition-all shadow-md text-center"
            >
              Order Sample Belts
            </Link>
            
            <a 
              href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20am%20interested%20in%20collaborating."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-transparent border border-cream/40 text-cream px-8 sm:px-9 py-4 text-xs font-bold uppercase tracking-[0.2em] rounded hover:border-cream hover:bg-cream hover:text-soft-black transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;


