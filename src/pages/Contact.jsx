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
  ExternalLink,
  ShoppingBag,
  Package,
  Factory,
  ChevronRight
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
    <div className="w-full bg-cream min-h-screen pt-16 sm:pt-22 md:pt-24 pb-16 md:pb-24 selection:bg-terracotta selection:text-white">
      
      {/* ========================================================
          MOBILE VIEW (Dedicated High-Conversion Contact Hub)
          ======================================================== */}
      <div className="md:hidden px-4 pt-3 pb-8 space-y-5">
        
        {/* Mobile Hero Header */}
        <div className="text-center pt-1 pb-1">
          <h1 className="text-2xl font-serif font-semibold text-soft-black tracking-tight leading-tight mb-2">
            Connect with Our Studio
          </h1>
          
          <p className="text-xs text-dark-charcoal/75 font-light leading-relaxed max-w-sm mx-auto">
            Direct communication with our master knotting workshop in Chattogram. Real people, zero automated bot loops.
          </p>

          {/* Quick Trust Highlights */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] font-semibold text-dark-charcoal/75 flex-wrap">
            <span className="flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full shadow-2xs">
              ⚡ Replies in ~15 mins
            </span>
            <span className="flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full shadow-2xs">
              ✓ Direct Factory Pricing
            </span>
            <span className="flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-full shadow-2xs">
              📦 Fast Sample Dispatch
            </span>
          </div>
        </div>

        {/* PRIMARY 1-TAP CONTACT CARDS (Instant Clicks) */}
        <div className="space-y-2.5">
          {/* 1. Main WhatsApp Hero Button */}
          <a
            href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noreferrer"
            className="w-full relative overflow-hidden flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-soft-black to-[#252525] text-cream shadow-md active:scale-[0.99] transition-transform group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cream">
                    Chat on WhatsApp
                  </span>
                  <span className="bg-[#25D366]/20 text-[#25D366] text-[8.5px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                    Fastest
                  </span>
                </div>
                <p className="text-[10.5px] text-cream/70 font-light mt-0.5 truncate">
                  Instant sizing advice, order tracking &amp; wholesale quotes
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-cream/70 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
          </a>

          {/* 2. Direct Call & Email Side by Side */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:+8801940689061"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white shadow-2xs active:bg-cream transition-colors text-left"
            >
              <Phone className="w-4 h-4 text-terracotta shrink-0 ml-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-soft-black block leading-none">
                  Call
                </span>
                <span className="text-[9.5px] font-medium text-dark-charcoal/75 block mt-1 tracking-tight whitespace-nowrap">
                  01940-689061
                </span>
              </div>
            </a>

            <a
              href="mailto:astmacrame@gmail.com?subject=Inquiry%20from%20Website"
              className="flex items-center gap-2 p-2.5 rounded-xl bg-white shadow-2xs active:bg-cream transition-colors text-left"
            >
              <Mail className="w-4 h-4 text-terracotta shrink-0 ml-0.5" />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-soft-black block leading-none">
                  Email
                </span>
                <span className="text-[9px] font-medium text-dark-charcoal/75 block mt-1 tracking-tight whitespace-nowrap">
                  astmacrame@gmail.com
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* QUICK ROUTE SELECTION (How Can We Help?) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta">
              Select Your Inquiry Type
            </span>
            <span className="text-[9px] font-semibold text-dark-charcoal/50 uppercase">
              1-Tap Route
            </span>
          </div>

          <div className="space-y-2">
            {/* Option 1: Retail Order */}
            <a
              href="https://wa.me/8801940689061?text=Hi%20AST%20Macrame,%20I%20have%20a%20question%20about%20a%20retail%20order."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-cream/50 hover:bg-cream transition-all text-left group"
            >
              <div className="min-w-0 pr-2">
                <span className="text-xs font-semibold text-soft-black tracking-normal block truncate">
                  Retail &amp; COD Inquiries
                </span>
                <span className="text-[10.5px] text-dark-charcoal/65 block truncate mt-0.5">
                  Order tracking, sizing advice &amp; doorstep delivery
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-soft-black group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* Option 2: Sample Order */}
            <Link
              to="/sample-order"
              className="flex items-center justify-between p-3 rounded-xl bg-cream/50 hover:bg-cream transition-all text-left group"
            >
              <div className="min-w-0 pr-2">
                <span className="text-xs font-semibold text-soft-black tracking-normal block truncate">
                  Physical Master Samples
                </span>
                <span className="text-[10.5px] text-dark-charcoal/65 block truncate mt-0.5">
                  Test knot density &amp; finish before bulk run
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-soft-black group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

            {/* Option 3: Wholesale & OEM */}
            <a
              href="https://wa.me/8801940689061?text=Hi%20AST%20Macrame,%20I%20would%20like%20to%20request%20a%20wholesale%20manufacturing%20quote."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-cream/50 hover:bg-cream transition-all text-left group"
            >
              <div className="min-w-0 pr-2">
                <span className="text-xs font-semibold text-soft-black tracking-normal block truncate">
                  Wholesale &amp; OEM Sourcing
                </span>
                <span className="text-[10.5px] text-dark-charcoal/65 block truncate mt-0.5">
                  100 pcs base MOQ, private labelling &amp; packaging
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-soft-black group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* Option 4: Custom Design / Reference Photo */}
            <a
              href="https://wa.me/8801940689061?text=Hi%20AST%20Macrame,%20I%20have%20a%20reference%20photo%20/%20custom%20design%20to%20share."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-xl bg-cream/50 hover:bg-cream transition-all text-left group"
            >
              <div className="min-w-0 pr-2">
                <span className="text-xs font-semibold text-soft-black tracking-normal block truncate">
                  Custom Sketch or Photo Idea
                </span>
                <span className="text-[10.5px] text-dark-charcoal/65 block truncate mt-0.5">
                  Send photo/link, we outline feasibility &amp; cost
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-soft-black group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>
          </div>
        </div>

        {/* DIRECT WORKSHOP LEADERSHIP (Compact 1-Tap Desks) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta">
              Direct Workshop Desks
            </span>
            <span className="text-[9px] font-semibold text-dark-charcoal/50 uppercase">
              Leadership
            </span>
          </div>

          {/* Saifuddin Sony */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-soft-black text-cream flex items-center justify-center font-serif text-xs font-bold shrink-0">
                SS
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-soft-black block truncate">Saifuddin Sony</span>
                <span className="text-[9.5px] font-semibold text-terracotta uppercase tracking-wider block">Founder &amp; Workshop Head</span>
              </div>
            </div>
            <a
              href="mailto:astmacrame@gmail.com?subject=Direct%20Inquiry%20for%20Saifuddin%20Sony"
              className="px-2.5 py-1.5 rounded-lg bg-white text-soft-black text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-2xs hover:bg-cream"
            >
              <Mail className="w-3 h-3 text-terracotta" />
              <span>Email</span>
            </a>
          </div>

          {/* Arfat Risve */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-cream/50">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-terracotta text-cream flex items-center justify-center font-serif text-xs font-bold shrink-0">
                AR
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-soft-black block truncate">Arfat Risve</span>
                <span className="text-[9.5px] font-semibold text-terracotta uppercase tracking-wider block">Export Sales Manager</span>
              </div>
            </div>
            <a
              href="https://wa.me/8801940689061?text=Hello%20Arfat,%20I%20have%20an%20export/wholesale%20inquiry."
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-2xs"
            >
              <MessageCircle className="w-3 h-3 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* WORKSHOP LOCATION & HOURS (Compact Card) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm text-left">
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-soft-black uppercase text-[10px] block">Workshop Hub</span>
                <span className="text-dark-charcoal/75 leading-tight block mt-0.5">Chattogram, Bangladesh</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-soft-black uppercase text-[10px] block">Hours (GMT+6)</span>
                <span className="text-dark-charcoal/75 leading-tight block mt-0.5">Sun–Thu: 9am – 6pm</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ QUICK JUMP */}
        <div className="p-4 rounded-2xl bg-white text-center shadow-2xs">
          <p className="text-xs text-dark-charcoal/80 mb-2">
            Looking for quick answers regarding delivery fees, COD, or sizing?
          </p>
          <Link
            to="/faq"
            className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-terracotta hover:text-soft-black"
          >
            <span>Read Frequently Asked Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* ========================================================
          DESKTOP VIEW (Preserved exactly as is for PC)
          ======================================================== */}
      <div className="hidden md:block">
        {/* 1. HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-2 sm:mb-3">
              GET IN TOUCH WITH OUR WORKSHOP
            </span>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-soft-black mb-3 sm:mb-5 leading-tight">
              Connect with AST Macramé
            </h1>
            
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed">
              Whether you are looking for retail support, physical sample evaluation, custom OEM production, or export partnership, our team in Chattogram is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CHANNELS MATRIX */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-1.5 sm:mb-2">
              COMMUNICATION CHANNELS
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold text-soft-black tracking-tight">
              How Can We Assist You?
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
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs transition-all duration-300 ${
                    channel.highlight 
                      ? 'bg-[#FAF2EE] hover:shadow-md' 
                      : 'bg-[#FAF7F2] hover:bg-white hover:shadow-md'
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

                    <h3 className="text-lg sm:text-xl font-serif font-semibold text-soft-black mb-2">
                      {channel.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-dark-charcoal/80 font-light leading-relaxed mb-6">
                      {channel.desc}
                    </p>
                  </div>

                  <div className="pt-4">
                    {channel.actionHref.startsWith('http') || channel.actionHref.startsWith('mailto') ? (
                      <a
                        href={channel.actionHref}
                        target={channel.isExternal ? "_blank" : undefined}
                        rel={channel.isExternal ? "noreferrer" : undefined}
                        className={`inline-flex items-center gap-2 text-xs font-medium tracking-normal transition-colors ${
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-cream">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-1.5 sm:mb-2">
              DIRECT DESKS
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold text-soft-black tracking-tight">
              Talk Directly to Our Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Founder Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
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

              <div className="mt-6 pt-3 flex items-center justify-between text-xs">
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
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
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

              <div className="mt-6 pt-3 flex items-center justify-between text-xs">
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
        <div className="max-w-4xl mx-auto bg-[#FAF7F2] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl sm:text-3xl font-serif font-semibold text-soft-black mb-3">
            Have Questions About Sizing, Dispatch, or MOQs?
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
              className="w-full sm:w-auto bg-[#EAE4DC] text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-xl hover:bg-[#E0D8CD] transition-all shadow-2xs"
            >
              Order Sample Belts
            </Link>
          </div>
        </div>
      </section>
      </div>

    </div>
  );
};

export default Contact;
