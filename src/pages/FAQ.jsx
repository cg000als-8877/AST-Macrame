import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Minus, 
  Plus, 
  Search, 
  HelpCircle, 
  Truck, 
  Ruler, 
  ShieldCheck, 
  Sparkles, 
  HeartHandshake, 
  Building2, 
  MessageCircle,
  Mail
} from 'lucide-react';

const FAQ_CATEGORIES = [
  {
    id: 'orders-delivery',
    name: 'Orders & Delivery in Bangladesh',
    shortName: 'Orders & Delivery',
    icon: Truck,
    description: 'Cash on Delivery, shipping rates, and delivery timelines across Bangladesh',
    questions: [
      {
        q: "Do you offer Cash on Delivery (COD) across Bangladesh?",
        a: "Yes! We offer 100% Cash on Delivery across all 64 districts in Bangladesh. You do not have to pay any advance for retail orders—simply pay in cash directly to the delivery rider once your package arrives at your doorstep."
      },
      {
        q: "What are the delivery charges and delivery times?",
        a: "Our shipping charges and delivery timeframes are:\n• Inside Dhaka & Chittagong: ৳70 (typically delivered within 24 to 48 hours)\n• Outside Dhaka (All Other Districts): ৳130 (delivered within 2 to 4 business days via reliable doorstep courier)."
      },
      {
        q: "How can I track my order status?",
        a: "Once your order is confirmed and dispatched from our workshop, you will receive an SMS and/or WhatsApp message with your unique courier tracking consignment ID so you can follow the live delivery progress."
      },
      {
        q: "Can I change my delivery address or phone number after ordering?",
        a: "If your parcel has not been picked up by the courier yet, simply message our WhatsApp support immediately (+880 1940-689061) with your name and updated details, and we will update it right away."
      }
    ]
  },
  {
    id: 'sizing-fit',
    name: 'Sizing & Pinless Fit',
    shortName: 'Sizing & Fit',
    icon: Ruler,
    description: 'How our stretch-macramé weave adapts to any waist with millimeter precision',
    questions: [
      {
        q: "How does the pinless macramé buckle work?",
        a: "Unlike standard leather belts that restrict you to punched holes every 1 inch, the AST Macramé belt prong inserts effortlessly anywhere through the micro-weave braided cord. This provides an exact, micro-adjustable fit tailored to your waist every single day."
      },
      {
        q: "What sizes are available and how do I choose?",
        a: "We offer two versatile sizes:\n• Medium (M): Fits waist sizes 28\" to 36\" (Total belt length ~42\")\n• Large (L): Fits waist sizes 36\" to 42\" (Total belt length ~46\")\n\nBecause the buckle fastens anywhere along the weave, you can choose based on how much extra tail length you prefer."
      },
      {
        q: "What if I am between sizes?",
        a: "If your waist measurement falls between sizes (for example, 35\"–36\"), we recommend choosing size Large (L). A slightly longer belt allows comfortable styling without restricting adjustability."
      },
      {
        q: "Are AST belts suitable for both men and women?",
        a: "Yes! Our macramé belts feature a timeless unisex aesthetic that pairs effortlessly with denim jeans, chinos, tailored trousers, linen pants, dresses, and casual ethnic wear."
      }
    ]
  },
  {
    id: 'checking-exchange',
    name: 'Open-Box Checking & Returns',
    shortName: 'Returns & Checking',
    icon: ShieldCheck,
    description: 'Doorstep inspection guarantee and 48-hour hassle-free exchange policy',
    questions: [
      {
        q: "Can I open and inspect the package before paying the courier rider?",
        a: "Yes! We proudly support 100% Open-Box Checking. You have the right to open the security flyer in front of the delivery agent and verify the color, size, and finish. If there is any defect or mismatch, you can hand it back on the spot with zero hassle."
      },
      {
        q: "What is your exchange and return policy?",
        a: "If you need a size exchange or discover any defect after delivery, simply reach out to our WhatsApp support within 48 hours of delivery. We will arrange a replacement or exchange promptly."
      },
      {
        q: "What should I do if I received the wrong color or size?",
        a: "Please take a quick photo of the belt and packaging and send it to our WhatsApp support (+880 1940-689061). We will immediately dispatch the correct replacement at our own expense."
      }
    ]
  },
  {
    id: 'materials-quality',
    name: 'Materials & Craftsmanship',
    shortName: 'Materials & Quality',
    icon: Sparkles,
    description: '100% natural combed cotton, artisan hand-braiding, and treated hardware',
    questions: [
      {
        q: "What materials are used to make AST belts?",
        a: "We use 100% high-density, multi-ply combed natural cotton cords that are soft against the body yet exceptionally strong. The buckle is cast from treated, rust-resistant zinc alloy designed for everyday durability."
      },
      {
        q: "Will the braided cord stretch out or sag over time?",
        a: "No. Each belt is hand-braided under strict tension standards in our Chattogram workshop. While the cotton cord flexes naturally for all-day comfort, the knot pattern is firmly locked to prevent stretching, sagging, or deforming."
      },
      {
        q: "Are the metal buckles rust-resistant?",
        a: "Yes. All hardware is coated and corrosion-tested to ensure resilience against humidity, sweat, and everyday weather."
      }
    ]
  },
  {
    id: 'care-maintenance',
    name: 'Care & Maintenance',
    shortName: 'Care & Wash',
    icon: HeartHandshake,
    description: 'Simple tips to keep your handmade macramé belt looking fresh for years',
    questions: [
      {
        q: "How do I clean my macramé belt?",
        a: "Spot clean gently with a soft cloth dampened with cold water and mild soap. Avoid soaking the buckle in water or using harsh chemical bleaches. Allow the belt to air dry naturally away from direct sun or radiators."
      },
      {
        q: "Can I wash it in a washing machine?",
        a: "We do not recommend machine washing, as the aggressive spinning cycle can damage the hand-woven knots and scratch the metal hardware. Hand spot cleaning is best."
      },
      {
        q: "How should I store my belt when not in use?",
        a: "Hang the belt by the buckle or roll it loosely and store in a dry, ventilated drawer. Avoid storing in damp environments."
      }
    ]
  },
  {
    id: 'wholesale-b2b',
    name: 'Wholesale, B2B & Custom OEM',
    shortName: 'Wholesale & OEM',
    icon: Building2,
    description: 'Bulk orders, private labeling, custom colors, and corporate gifting',
    questions: [
      {
        q: "Do you supply wholesale for boutiques, brands, and retailers?",
        a: "Yes. As the direct manufacturing workshop, we supply boutique labels, e-commerce retailers, and international brands with tiered wholesale pricing and low initial Minimum Order Quantities (MOQs)."
      },
      {
        q: "Can I order custom colors, lengths, or private label branding?",
        a: "Yes! We offer OEM & Private Label manufacturing including custom pantone-matched dyed cords, custom lengths/widths, custom debossed leather tabs, and bespoke packaging. Visit our Wholesale Page or message our production team directly."
      },
      {
        q: "Can I order a single physical sample before placing a bulk order?",
        a: "Yes. You can order individual sample pieces directly through our website to evaluate our knot density, cord softness, and hardware quality prior to placing a bulk purchase."
      }
    ]
  }
];

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    document.title = "Frequently Asked Questions (FAQ) - AST Macramé";
  }, []);

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = useMemo(() => {
    return FAQ_CATEGORIES.map((category, catIdx) => {
      if (selectedCategory !== 'all' && category.id !== selectedCategory) {
        return null;
      }

      if (!searchQuery.trim()) {
        return { ...category, catIdx, matchedQuestions: category.questions.map((q, qIdx) => ({ ...q, qIdx })) };
      }

      const qLow = searchQuery.toLowerCase();
      const matched = category.questions
        .map((q, qIdx) => ({ ...q, qIdx }))
        .filter(q => q.q.toLowerCase().includes(qLow) || q.a.toLowerCase().includes(qLow));

      if (matched.length === 0) return null;

      return {
        ...category,
        catIdx,
        matchedQuestions: matched
      };
    }).filter(Boolean);
  }, [selectedCategory, searchQuery]);

  const totalResults = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + (cat?.matchedQuestions?.length || 0), 0);
  }, [filteredCategories]);

  return (
    <div className="w-full bg-cream min-h-screen pt-[76px] sm:pt-[84px] md:pt-[104px] pb-16 md:pb-24">
      {/* Hero Header */}
      <section className="relative px-4 sm:px-6 lg:px-12 py-8 sm:py-12 md:py-16 border-b border-stone/20 bg-gradient-to-b from-stone/10 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-stone/20 text-terracotta text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help &amp; Knowledge Base</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-soft-black font-normal mb-3 sm:mb-4 leading-tight">
            Frequently Asked Questions
          </h1>
          
          <p className="text-xs sm:text-sm md:text-base text-dark-charcoal/80 max-w-xl mx-auto font-light leading-relaxed mb-6 sm:mb-8">
            Find immediate answers regarding Cash on Delivery, sizing adjustability, doorstep open-box checking, belt care, and wholesale inquiries.
          </p>

          {/* Instant Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-dark-charcoal/50">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. COD, size, wash, exchange)..."
              className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3.5 bg-white border border-stone/30 focus:border-terracotta text-xs sm:text-sm text-soft-black placeholder:text-dark-charcoal/40 outline-none transition-all shadow-sm rounded-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs font-bold text-dark-charcoal/50 hover:text-soft-black cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        {/* Category Pills Filter */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-6 sm:mb-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className={`px-3.5 sm:px-5 py-2 text-[10.5px] sm:text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-soft-black text-white shadow-sm'
                : 'bg-white text-soft-black border border-stone/25 hover:border-stone/50'
            }`}
          >
            All Topics
          </button>
          
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[10.5px] sm:text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-soft-black text-white shadow-sm'
                    : 'bg-white text-soft-black border border-stone/25 hover:border-stone/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-terracotta' : 'text-dark-charcoal/60'}`} />
                <span>{cat.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Results Counter if searching */}
        {searchQuery && (
          <div className="mb-6 text-xs sm:text-sm text-dark-charcoal/70">
            Showing <strong className="text-soft-black">{totalResults}</strong> result{totalResults === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
          </div>
        )}

        {/* FAQ Accordion List */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-8 sm:space-y-12">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} className="bg-white/90 border border-stone/20 p-4 sm:p-6 md:p-8 shadow-sm">
                  {/* Category Header */}
                  <div className="flex items-start gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-stone/20 mb-4 sm:mb-6">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-none bg-stone/10 text-terracotta flex items-center justify-center shrink-0 border border-stone/20">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg md:text-xl font-serif font-bold text-soft-black">
                        {category.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-dark-charcoal/70 mt-0.5 font-light">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Questions in Category */}
                  <div className="divide-y divide-stone/15">
                    {category.matchedQuestions.map((item) => {
                      const itemKey = `${category.catIdx}-${item.qIdx}`;
                      const isOpen = !!openItems[itemKey];

                      return (
                        <div key={item.qIdx} className="transition-colors">
                          <button
                            onClick={() => toggleItem(category.catIdx, item.qIdx)}
                            className="w-full py-3.5 sm:py-4.5 flex items-center justify-between text-left gap-3.5 cursor-pointer select-none group"
                          >
                            <span className={`text-xs sm:text-sm md:text-base font-semibold leading-snug transition-colors ${
                              isOpen ? 'text-terracotta' : 'text-soft-black group-hover:text-terracotta'
                            }`}>
                              {item.q}
                            </span>
                            <div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center transition-colors ${
                              isOpen ? 'text-terracotta' : 'text-stone-400 group-hover:text-soft-black'
                            }`}>
                              {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="pb-4 sm:pb-5 text-[11.5px] sm:text-xs md:text-sm text-dark-charcoal/85 leading-relaxed font-sans whitespace-pre-line border-l-2 border-terracotta/40 pl-3 sm:pl-4 my-1">
                                  {item.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white border border-stone/20 p-8 sm:p-12 text-center my-8">
            <HelpCircle className="w-10 h-10 text-dark-charcoal/30 mx-auto mb-3" />
            <h3 className="text-base sm:text-lg font-serif font-bold text-soft-black mb-1">
              No matching questions found
            </h3>
            <p className="text-xs sm:text-sm text-dark-charcoal/70 max-w-sm mx-auto mb-5">
              We couldn't find any answer matching &ldquo;{searchQuery}&rdquo;. Try another search term or chat with our live support.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 bg-soft-black text-white text-xs font-bold uppercase tracking-wider hover:bg-terracotta transition-colors cursor-pointer"
            >
              Reset Search Filter
            </button>
          </div>
        )}

        {/* Live Support Banner */}
        <div className="mt-12 sm:mt-16 bg-soft-black text-cream p-6 sm:p-8 md:p-10 border border-stone/30 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="max-w-xl">
              <span className="text-[10px] sm:text-xs font-bold text-white uppercase tracking-[0.2em] block mb-1.5">
                Direct Artisan Assistance
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-white font-normal mb-2">
                Still have a question or need custom assistance?
              </h3>
              <p className="text-xs sm:text-sm text-cream/70 font-light leading-relaxed">
                Connect directly with our workshop team for immediate sizing advice, custom order inquiries, or order status assistance.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="https://wa.me/8801940689061"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-[#1EBE5D] transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp Live Support</span>
              </a>
              
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 hover:bg-white hover:text-soft-black px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Form</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
