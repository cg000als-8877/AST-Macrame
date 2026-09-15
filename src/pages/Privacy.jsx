import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Database, 
  ShieldCheck, 
  Truck, 
  MessageSquare, 
  Lock, 
  Mail, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | Data Protection & Customer Trust - AST Macramé";
  }, []);

  const privacySections = [
    {
      icon: Database,
      badge: "Information We Hold",
      title: "Data We Collect",
      content: (
        <>
          <p className="mb-3">
            When you place an order for retail belts, evaluate physical samples, or submit a custom wholesale RFQ, we collect necessary contact information including your <strong>name, phone number, shipping address, and optional email address</strong>.
          </p>
          <p>
            We do not collect, process, or store sensitive credit card numbers or banking passwords on our platform.
          </p>
        </>
      )
    },
    {
      icon: ShieldCheck,
      badge: "Our Commitment",
      title: "Zero-Data Selling Guarantee",
      content: (
        <>
          <p className="mb-3">
            Your privacy is non-negotiable. <strong>We will never sell, rent, license, or trade your personal information or purchasing history to third-party advertisers, data aggregators, or marketing brokers.</strong>
          </p>
          <p>
            Your records exist solely inside our protected workshop order management infrastructure.
          </p>
        </>
      )
    },
    {
      icon: Truck,
      badge: "Operational Need",
      title: "Courier & Logistics Partners",
      content: (
        <>
          <p className="mb-3">
            To ensure rapid doorstep delivery across Bangladesh and worldwide air freight, your name, contact phone number, and physical destination address are shared strictly with our contracted courier partners (e.g. Steadfast, Paperfly, DHL, FedEx).
          </p>
          <p>
            These logistical partners are legally restricted from using your data for any purpose other than route dispatch and package handover.
          </p>
        </>
      )
    },
    {
      icon: MessageSquare,
      badge: "Direct Contact",
      title: "Customer Communications",
      content: (
        <>
          <p className="mb-3">
            When you submit an order, you will receive transactional messages regarding order verification, tracking numbers, and delivery schedules via phone call, WhatsApp, or email.
          </p>
          <p>
            We will not flood your inbox or phone with unrequested marketing spam. You can request deletion or correction of your contact details at any time.
          </p>
        </>
      )
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
              DATA SECURITY &amp; TRUST
            </span>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold uppercase tracking-tight text-soft-black mb-3 sm:mb-5 leading-tight">
              PRIVACY &amp; DATA POLICY
            </h1>
            
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed">
              We respect your privacy and manage customer order records with the highest ethical and logistical security standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. PRIVACY CARDS LIST */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-stone/15">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-terracotta block mb-1.5 sm:mb-2">
              HOW WE SAFEGUARD YOUR INFORMATION
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold uppercase text-soft-black tracking-tight">
              TRANSPARENT DATA PRINCIPLES
            </h2>
          </div>

          {privacySections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#FAF7F2] border border-[#E8E0D2] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-soft-black/40 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-stone/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-soft-black text-cream flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold uppercase text-soft-black">
                      {section.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded self-start sm:self-center">
                    {section.badge}
                  </span>
                </div>

                <div className="text-xs sm:text-sm md:text-base text-dark-charcoal/85 font-light leading-relaxed">
                  {section.content}
                </div>
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* 3. PRIVACY DESK CONTACT BANNER */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-cream">
        <div className="max-w-4xl mx-auto bg-white border border-stone/20 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl sm:text-3xl font-serif font-semibold uppercase text-soft-black mb-3">
            HAVE A PRIVACY OR DATA REMOVAL REQUEST?
          </h2>
          
          <p className="text-xs sm:text-base text-dark-charcoal/80 font-light mb-8 max-w-xl mx-auto leading-relaxed">
            If you wish to update your contact record or request complete deletion of past customer logs, please email our data administrator.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <a
              href="mailto:astmacrame@gmail.com?subject=Privacy%20and%20Data%20Request"
              className="w-full sm:w-auto bg-soft-black text-cream px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded hover:bg-dark-charcoal transition-all shadow-sm inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Data Desk</span>
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-white border border-stone/30 text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded hover:border-soft-black hover:bg-soft-black hover:text-cream transition-all shadow-2xs inline-flex items-center justify-center gap-2"
            >
              <span>General Inquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Privacy;
