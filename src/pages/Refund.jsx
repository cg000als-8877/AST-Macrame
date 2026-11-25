import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Video, 
  Briefcase, 
  Mail,
  ArrowRight,
  ShieldCheck
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

const Refund = () => {
  useEffect(() => {
    document.title = "Refund & Return Policy | Inspection & Assurance - AST Macramé";
  }, []);

  const policies = [
    {
      icon: CheckCircle2,
      badge: "Retail Assurance",
      title: "Doorstep Inspection (COD)",
      content: (
        <>
          <p className="mb-3">
            For all retail orders within Bangladesh sent via Cash on Delivery, you have the full right to <strong>open and inspect the package in the presence of the delivery rider</strong> before making payment.
          </p>
          <p>
            If you notice transit damage or an incorrect model at the moment of delivery, you may refuse acceptance immediately with zero penalty.
          </p>
        </>
      )
    },
    {
      icon: AlertTriangle,
      badge: "Handmade Policy",
      title: "Strict No 'Change of Mind' Returns",
      content: (
        <>
          <p className="mb-3">
            Because our macramé accessories are artisanal, handmade-to-order items requiring intensive manual knotting, <strong>we do not accept returns, exchanges, or refunds for change of mind or personal color preference after delivery acceptance.</strong>
          </p>
          <p>
            Our belts feature a prong-anywhere pin design without rigid punched holes, accommodating waist fluctuations seamlessly.
          </p>
        </>
      )
    },
    {
      icon: Clock,
      badge: "Prompt Claim",
      title: "24-Hour Defect Reporting Window",
      content: (
        <>
          <p className="mb-3">
            In the rare event that a manufacturing defect slipped past our two-stage quality check, or an incorrect variant was received, you must contact our team within <strong>24 hours</strong> of the delivery timestamp.
          </p>
          <p>
            Claims submitted after 24 hours of package delivery cannot be accepted under our workshop warranty.
          </p>
        </>
      )
    },
    {
      icon: Briefcase,
      badge: "B2B Terms",
      title: "Wholesale & OEM Custom Orders",
      content: (
        <>
          <p className="mb-3">
            Custom export manufacturing, bespoke color-matched runs, and wholesale orders are strictly non-refundable and non-cancellable once the 50% advance production deposit has been received and raw materials have been committed.
          </p>
          <p>
            Any cargo discrepancies must be officially reported within <strong>3 business days</strong> of freight receipt with comprehensive pallet inspection logs and unboxing records.
          </p>
        </>
      )
    }
  ];

  const videoSteps = [
    "Start recording before cutting any tape or breaking the outer courier seal.",
    "Ensure the courier shipping label with tracking ID is clearly legible in the frame.",
    "Keep the recording continuous — no cuts, pauses, fast-forwards, or editing transitions.",
    "Clearly show the belt unwrapped, showing the knot weave pattern and alloy buckle."
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
              TRANSPARENCY &amp; ASSURANCE
            </span>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold uppercase tracking-tight text-soft-black mb-3 sm:mb-5 leading-tight">
              REFUND &amp; RETURN POLICY
            </h1>
            
            <p className="text-xs sm:text-base md:text-lg text-dark-charcoal/80 font-light max-w-2xl mx-auto leading-relaxed">
              We stand behind the artisan quality of our handcrafted macramé belts. Review our inspection standards, defect protocol, and return rules below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. UNBOXING VIDEO WARNING CARD (MANDATORY REQUIREMENT) */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#F6F6F7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#131E33] text-white flex items-center justify-center shrink-0">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-serif font-semibold text-soft-black">
                    Mandatory Unboxing Video Protocol
                  </h2>
                  <span className="text-xs text-[#131E33] font-semibold uppercase tracking-wider block">Required for all defect &amp; transit damage claims</span>
                </div>
              </div>
              <span className="text-[10.5px] font-bold uppercase tracking-widest text-white bg-[#131E33] px-3 py-1 rounded self-start sm:self-center">
                Essential Rule
              </span>
            </div>

            <p className="text-sm sm:text-base text-dark-charcoal/85 font-normal leading-relaxed mb-6">
              To guarantee total transparency and prevent disputed claims, <strong>a single, unedited unboxing video is mandatory</strong> for any refund, replacement, or missing-item claim. Without this video, no claim can be approved.
            </p>

            <div className="bg-white rounded-xl p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-serif font-semibold text-soft-black mb-3.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#131E33]" />
                <span>Unboxing Recording Checklist:</span>
              </h3>
              
              <ul className="space-y-2.5">
                {videoSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-dark-charcoal/80 font-light">
                    <span className="w-5 h-5 rounded-full bg-stone/15 text-soft-black text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. POLICY DETAILS LIST */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#131E33] block mb-1.5 sm:mb-2">
              POLICIES &amp; TERMS
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold uppercase text-soft-black tracking-tight">
              HOW WE HANDLE RETURNS &amp; REPLACEMENTS
            </h2>
          </div>

          {policies.map((policy, idx) => {
            const Icon = policy.icon;
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
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold text-soft-black">
                      {policy.title}
                    </h3>
                  </div>
                  <span className="text-[10.5px] font-semibold uppercase tracking-widest text-[#131E33] bg-[#131E33]/10 px-2.5 py-1 rounded self-start sm:self-center">
                    {policy.badge}
                  </span>
                </div>

                <div className="text-sm sm:text-base text-dark-charcoal/85 font-normal leading-relaxed">
                  {policy.content}
                </div>
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* 4. CLAIM INITIATION BANNER */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto bg-[#F6F6F7] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center">
          <span className="text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#131E33] block mb-2 sm:mb-3">
            NEED TO SUBMIT A CLAIM?
          </span>
          
          <h2 className="text-xl sm:text-3xl font-serif font-semibold text-soft-black mb-3">
            We Are Here to Resolve Issues Quickly
          </h2>
          
          <p className="text-sm sm:text-base text-dark-charcoal/80 font-normal mb-8 max-w-xl mx-auto leading-relaxed">
            Have your order number and unboxing video ready, and message our dispatch support desk on WhatsApp for fastest verification.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-center">
            <a
              href="https://wa.me/8801940689061?text=Hello%20AST%20Macrame,%20I%20have%20an%20order%20issue%20with%20my%20unboxing%20video."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#131E33] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-xl hover:bg-soft-black transition-all inline-flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Submit Claim via WhatsApp</span>
            </a>
            <a
              href="mailto:astmacrame@gmail.com?subject=Defect%20Claim%20with%20Unboxing%20Video"
              className="w-full sm:w-auto bg-white text-soft-black px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] rounded-xl hover:bg-stone-100 transition-all inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email Video Link</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Refund;
