import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Scale, 
  Globe2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
    <div className="w-full bg-white min-h-screen pt-20 sm:pt-22 md:pt-24 pb-16 md:pb-24 selection:bg-[#131E33] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-3">
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white">
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
                className="bg-[#F6F6F7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-soft-black text-white flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-soft-black">
                      {section.title}
                    </h2>
                  </div>
                  <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[#131E33] bg-[#131E33]/10 px-2.5 py-1 rounded self-start sm:self-center">
                    {section.badge}
                  </span>
                </div>

                <div className="text-sm sm:text-base text-dark-charcoal/85 font-normal leading-relaxed">
                  {section.content}
                </div>
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* 3. ASSISTANCE BANNER */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto bg-[#F6F6F7] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-[#131E33]/10 text-[#131E33] flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl sm:text-3xl font-serif font-semibold text-soft-black mb-3">
            Need Clarification on Our Terms?
          </h2>
          
          <p className="text-sm sm:text-base text-dark-charcoal/80 font-normal mb-8 max-w-xl mx-auto leading-relaxed">
            Our team is available to answer any questions regarding custom contract terms, sample agreements, or doorstep inspection rights.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-soft-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-xl hover:bg-[#131E33] transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Contact Workshop Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20have%20a%20question%20about%20your%20terms."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-xl hover:bg-stone-100 transition-all inline-flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Terms;
