import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  MessageCircle, 
  ArrowRight, 
  HelpCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us | Workshop Inquiries & WhatsApp Support - AST Macramé";
  }, []);

  const contactChannels = [
    {
      icon: MessageCircle,
      badge: "Fastest Response",
      title: "WhatsApp Direct",
      desc: "Instant customer support, sizing consultation, custom order questions, and retail order tracking.",
      actionText: "Chat on WhatsApp",
      actionHref: "https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20have%20an%20inquiry.",
      isExternal: true,
      highlight: true
    },
    {
      icon: Mail,
      badge: "Official & OEM",
      title: "Email Inquiries",
      desc: "Send tech packs, spec sheets, wholesale RFQs, and formal corporate business proposals.",
      actionText: "astmacrame@gmail.com",
      actionHref: "mailto:astmacrame@gmail.com",
      isExternal: false,
      highlight: false
    },
    {
      icon: MapPin,
      badge: "Artisan Hub",
      title: "Workshop Location",
      desc: "Our primary knotting workshop and production facility is located in Chattogram, Bangladesh.",
      actionText: "Chattogram, Bangladesh",
      actionHref: "#",
      isExternal: false,
      highlight: false
    },
    {
      icon: Clock,
      badge: "Bangladesh Time (GMT+6)",
      title: "Operating Hours",
      desc: "Sunday – Thursday: 9:00 AM – 6:00 PM. Weekend & holiday inquiries answered via WhatsApp standby.",
      actionText: "Sunday – Thursday: 9am - 6pm",
      actionHref: "#",
      isExternal: false,
      highlight: false
    }
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
              GET IN TOUCH WITH OUR WORKSHOP
            </span>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold uppercase tracking-tight text-soft-black mb-3 sm:mb-5 leading-tight">
              CONNECT WITH AST MACRAMÉ
            </h1>
            
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed">
              Whether you are looking for retail support, physical sample evaluation, custom OEM production, or export partnership, our team in Chattogram is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CHANNELS MATRIX */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 border-b border-stone/15 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-1.5 sm:mb-2">
              COMMUNICATION CHANNELS
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold uppercase text-soft-black tracking-tight">
              HOW CAN WE ASSIST YOU?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {contactChannels.map((channel, idx) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 ${
                    channel.highlight 
                      ? 'bg-[#FAF7F2] border-terracotta/40 shadow-sm hover:border-terracotta hover:shadow-md' 
                      : 'bg-[#FAF7F2] border-[#E8E0D2] hover:border-soft-black/40 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        channel.highlight ? 'bg-terracotta text-cream' : 'bg-soft-black text-cream'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[9.5px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded ${
                        channel.highlight 
                          ? 'bg-terracotta/15 text-terracotta font-bold' 
                          : 'bg-stone/10 text-dark-charcoal/80'
                      }`}>
                        {channel.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-serif font-semibold uppercase text-soft-black mb-2">
                      {channel.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed mb-6">
                      {channel.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone/20">
                    {channel.actionHref.startsWith('http') || channel.actionHref.startsWith('mailto') ? (
                      <a
                        href={channel.actionHref}
                        target={channel.isExternal ? "_blank" : undefined}
                        rel={channel.isExternal ? "noreferrer" : undefined}
                        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                          channel.highlight 
                            ? 'text-terracotta hover:text-soft-black' 
                            : 'text-soft-black hover:text-terracotta'
                        }`}
                      >
                        <span>{channel.actionText}</span>
                        {channel.isExternal ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-soft-black/80">
                        {channel.actionText}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. DIRECT LEADERSHIP CONTACTS */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 border-b border-stone/15 bg-cream">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-1.5 sm:mb-2">
              DIRECT DESKS
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold uppercase text-soft-black tracking-tight">
              TALK DIRECTLY TO OUR LEADERSHIP
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Founder Card */}
            <div className="bg-white border border-stone/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-soft-black/40 transition-all">
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
                  Oversees workshop operations, artisan development, and custom belt sample crafting. Contact for strategic partnerships and production feasibility.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone/15 flex items-center justify-between text-xs">
                <span className="text-dark-charcoal/60 font-light">Chattogram Workshop</span>
                <a 
                  href="mailto:astmacrame@gmail.com?subject=Direct%20Inquiry%20for%20Saifuddin%20Sony"
                  className="text-terracotta hover:text-soft-black font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                >
                  <span>Email Founder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Export Manager Card */}
            <div className="bg-white border border-stone/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:border-soft-black/40 transition-all">
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
                  Coordinates overseas sample orders, container FOB shipments, wholesale pricing tiers, and private-label packaging requirements.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone/15 flex items-center justify-between text-xs">
                <span className="text-dark-charcoal/60 font-light">WhatsApp Direct</span>
                <a 
                  href="https://wa.me/8801940689061?text=Hello%20Arfat,%20I%20have%20an%20export/wholesale%20inquiry."
                  target="_blank"
                  rel="noreferrer"
                  className="text-terracotta hover:text-soft-black font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                >
                  <span>Message on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FAQ & SAMPLE BANNER */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl sm:text-3xl font-serif font-semibold uppercase text-soft-black mb-3">
            HAVE QUESTIONS ABOUT SIZING, DISPATCH, OR MOQS?
          </h2>
          
          <p className="text-xs sm:text-base text-dark-charcoal/80 font-light mb-8 max-w-xl mx-auto leading-relaxed">
            Browse our Frequently Asked Questions for rapid answers on doorstep inspection, pin-anywhere sizing, worldwide courier transit times, and OEM specifications.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <Link
              to="/faq"
              className="w-full sm:w-auto bg-soft-black text-cream px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded hover:bg-dark-charcoal transition-all shadow-sm inline-flex items-center justify-center gap-2"
            >
              <span>Visit FAQ Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/sample-order"
              className="w-full sm:w-auto bg-white border border-stone/30 text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded hover:border-soft-black hover:bg-soft-black hover:text-cream transition-all shadow-2xs"
            >
              Order Sample Belts
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
