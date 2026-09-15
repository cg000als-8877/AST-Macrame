import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Scale, 
  Globe2, 
  MessageCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    document.title = "Terms & Conditions | Handmade Policies & Wholesale Terms - AST Macramé";
  }, []);

  const sections = [
    {
      icon: Sparkles,
      title: "Handmade Artisan Variations",
      badge: "Craftsmanship Standard",
      content: (
        <>
          <p className="mb-3">
            By purchasing from AST Macramé, the customer explicitly acknowledges that all our belts and accessories are <strong>100% handcrafted</strong>. 
          </p>
          <p>
            Minor variances in color shade, knot tension, slight length differences (±1-2 cm), and natural cotton fiber textures are authentic hallmarks of genuine macramé artistry and <strong>do not constitute a manufacturing defect</strong>. Each piece is unique.
          </p>
        </>
      )
    },
    {
      icon: ShieldCheck,
      title: "Order Acceptance & Service Terms",
      badge: "Verification & Security",
      content: (
        <>
          <p className="mb-3">
            We reserve the right to refuse service, hold unverified Cash on Delivery (COD) dispatches, or cancel orders at our discretion if fraudulent activity, delivery refusal history, or unreachable contact details are identified.
          </p>
          <p>
            Orders are confirmed once contact verification is completed via WhatsApp or phone call from our dispatch team.
          </p>
        </>
      )
    },
    {
      icon: FileText,
      title: "Intellectual Property & Media",
      badge: "Copyright Protection",
      content: (
        <>
          <p className="mb-3">
            All proprietary belt knotting patterns, original studio photography, lifestyle imagery, logos, brand typography, and written descriptions on this website belong exclusively to AST Macramé.
          </p>
          <p>
            Unauthorized commercial replication, re-hosting, scraping, or distribution of our media assets is strictly prohibited and subject to legal enforcement.
          </p>
        </>
      )
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      badge: "Legal Recourse",
      content: (
        <>
          <p className="mb-3">
            AST Macramé is not liable for indirect, incidental, or consequential damages resulting from product handling, wear and tear, incorrect washing, or transit delays caused by third-party couriers.
          </p>
          <p>
            Our maximum legal liability in any circumstance is strictly limited to the net purchase value of the individual item in question.
          </p>
        </>
      )
    },
    {
      icon: Globe2,
      title: "B2B Wholesale & OEM Contracts",
      badge: "Commercial Agreements",
      content: (
        <>
          <p className="mb-3">
            For international wholesale, export containers, and OEM private label contracts, formal digitally or physically signed Proforma Invoices (PI) and sales contracts supersede website retail terms.
          </p>
          <p>
            Production schedules, 50% deposit structures, custom lab dips, and quality tolerance standards are governed by the specific commercial agreement entered into between both parties.
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
              LEGAL &amp; WORKSHOP POLICIES
            </span>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold uppercase tracking-tight text-soft-black mb-3 sm:mb-5 leading-tight">
              TERMS &amp; CONDITIONS
            </h1>
            
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed">
              By purchasing an accessory, ordering physical evaluation samples, or entering into an export manufacturing contract, you agree to the following terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. TERMS CARDS LIST */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-stone/15">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {sections.map((section, idx) => {
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
                    <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold uppercase text-soft-black">
                      {section.title}
                    </h2>
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

      {/* 3. ASSISTANCE BANNER */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-cream">
        <div className="max-w-4xl mx-auto bg-white border border-stone/20 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl sm:text-3xl font-serif font-semibold uppercase text-soft-black mb-3">
            NEED CLARIFICATION ON OUR TERMS?
          </h2>
          
          <p className="text-xs sm:text-base text-dark-charcoal/80 font-light mb-8 max-w-xl mx-auto leading-relaxed">
            Our team is available to answer any questions regarding custom contract terms, sample agreements, or doorstep inspection rights.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-soft-black text-cream px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded hover:bg-dark-charcoal transition-all shadow-sm inline-flex items-center justify-center gap-2"
            >
              <span>Contact Workshop Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20have%20a%20question%20about%20your%20terms."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white border border-stone/30 text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded hover:border-soft-black hover:bg-soft-black hover:text-cream transition-all shadow-2xs inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Terms;
