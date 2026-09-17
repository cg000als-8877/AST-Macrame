// Central Product Catalog Configuration

// Adult Images (Original Studio Photos)
import b1 from '../assets/products/Black/1.webp';
import b2 from '../assets/products/Black/2.webp';
import b3 from '../assets/products/Black/3.webp';
import b4 from '../assets/products/Black/4.webp';
import b5 from '../assets/products/Black/5.webp';
import b6 from '../assets/products/Black/6.webp';

import n1 from '../assets/products/Navy/1.webp';
import n2 from '../assets/products/Navy/2.webp';
import n3 from '../assets/products/Navy/3.webp';
import n4 from '../assets/products/Navy/4.webp';
import n5 from '../assets/products/Navy/5.webp';
import n6 from '../assets/products/Navy/6.webp';

import br1 from '../assets/products/Brown/1.webp';
import br2 from '../assets/products/Brown/2.webp';
import br3 from '../assets/products/Brown/3.webp';
import br4 from '../assets/products/Brown/4.webp';
import br5 from '../assets/products/Brown/5.webp';
import br6 from '../assets/products/Brown/6.webp';

import m1 from '../assets/products/Maroon/1.webp';
import m2 from '../assets/products/Maroon/2.webp';
import m3 from '../assets/products/Maroon/3.webp';
import m4 from '../assets/products/Maroon/4.webp';
import m5 from '../assets/products/Maroon/5.webp';
import m6 from '../assets/products/Maroon/6.webp';

import k1 from '../assets/products/Khaki/1.webp';
import k2 from '../assets/products/Khaki/2.webp';
import k3 from '../assets/products/Khaki/3.webp';
import k4 from '../assets/products/Khaki/4.webp';
import k5 from '../assets/products/Khaki/5.webp';
import k6 from '../assets/products/Khaki/6.webp';

// Isolated Display Images for Products Gallery (#F5F5F5 background)
import b1Clean from '../assets/products/Black/1_clean.png';
import n1Clean from '../assets/products/Navy/1_clean.png';
import br1Clean from '../assets/products/Brown/1_clean.png';
import m1Clean from '../assets/products/Maroon/1_clean.png';
import k1Clean from '../assets/products/Khaki/1_clean.png';

import kidsNeonClean from '../assets/products/Kids/Neon/1_clean.png';
import kidsNavyClean from '../assets/products/Kids/Navy/1_clean.png';
import kidsRedClean from '../assets/products/Kids/Red/1_clean.png';
import kidsBlackClean from '../assets/products/Kids/Black/1_clean.png';

// Women's Waist Belt Images (Original Studio Photos & Clean Display Images)
import wp1 from '../assets/products/Women/Pink/1.webp';
import wp2 from '../assets/products/Women/Pink/2.webp';
import wp3 from '../assets/products/Women/Pink/3.webp';
import wp4 from '../assets/products/Women/Pink/4.webp';
import wp5 from '../assets/products/Women/Pink/5.webp';
import wp6 from '../assets/products/Women/Pink/6.webp';
import womenPinkClean from '../assets/products/Women/Pink/1_clean.png';

import wpu1 from '../assets/products/Women/Purple/1.webp';
import wpu2 from '../assets/products/Women/Purple/2.webp';
import wpu3 from '../assets/products/Women/Purple/3.webp';
import wpu4 from '../assets/products/Women/Purple/4.webp';
import womenPurpleClean from '../assets/products/Women/Purple/1_clean.png';

// Kids Images (served from public folder for order pages)
const kidsNeon = [
  '/AST Macrame Kids/Neon Green/1.webp',
  '/AST Macrame Kids/Neon Green/2.webp',
  '/AST Macrame Kids/Neon Green/3.webp',
  '/AST Macrame Kids/Neon Green/4.webp'
];

const kidsNavy = [
  '/AST Macrame Kids/Navy/1.webp',
  '/AST Macrame Kids/Navy/2.webp',
  '/AST Macrame Kids/Navy/3.webp',
  '/AST Macrame Kids/Navy/4.webp'
];

const kidsRed = [
  '/AST Macrame Kids/Red/1.webp',
  '/AST Macrame Kids/Red/2.webp',
  '/AST Macrame Kids/Red/3.webp',
  '/AST Macrame Kids/Red/4.webp'
];

const kidsBlack = [
  '/AST Macrame Kids/Black/1.webp',
  '/AST Macrame Kids/Black/2.webp',
  '/AST Macrame Kids/Black/3.webp',
  '/AST Macrame Kids/Black/4.webp'
];

// Women's Waist Belt Gallery Image Arrays
const womenPink = [wp1, wp2, wp3, wp4, wp5, wp6];
const womenPurple = [wpu1, wpu2, wpu3, wpu4];

// Tier pricing calculations for Adult Belt (Base 850 BDT, Regular 1050 BDT)
export const calculateAdultTierPriceBDT = (totalQty) => {
  if (totalQty <= 0) return 0;
  if (totalQty === 1) return 850;
  if (totalQty === 2) return 1490; // 745/pc (Save 210)
  if (totalQty === 3) return 2090; // 697/pc (Save 460)
  if (totalQty === 4) return 2650; // 662.5/pc (Save 750)
  if (totalQty === 5) return 3150; // 630/pc (Save 1100)
  return totalQty * 630;
};

// Tier pricing calculations for Women's Waist Belt (Base 590 BDT, Regular 750 BDT)
export const calculateWomenTierPriceBDT = (totalQty) => {
  if (totalQty <= 0) return 0;
  if (totalQty === 1) return 590;
  if (totalQty === 2) return 1080; // 540/pc (Save 420 vs 1500)
  if (totalQty === 3) return 1530; // 510/pc (Save 720 vs 2250)
  if (totalQty === 4) return 1960; // 490/pc (Save 1040 vs 3000)
  if (totalQty === 5) return 2350; // 470/pc (Save 1400 vs 3750)
  return totalQty * 470;
};

// Tier pricing calculations for Kids Belt (Base 600 BDT, Regular 850 BDT)
export const calculateKidsTierPriceBDT = (totalQty) => {
  if (totalQty <= 0) return 0;
  if (totalQty === 1) return 600;
  if (totalQty === 2) return 1090; // 545/pc (Save 610)
  if (totalQty === 3) return 1560; // 520/pc (Save 990)
  if (totalQty === 4) return 1980; // 495/pc (Save 1420)
  if (totalQty === 5) return 2350; // 470/pc (Save 1900)
  return totalQty * 470;
};

export const PRODUCTS = {
  adult: {
    id: 'adult',
    slug: 'adult',
    title: 'AST Handmade Macramé Belt',
    shortTitle: 'Adult Unisex Belt',
    badge: 'Adult Collection',
    category: 'adult',
    subtitle: 'UNISEX | 100% NATURAL COTTON',
    shortDesc: 'Export-grade artisanal macramé with retail-ready finishing. Exceptional craftsmanship built to elevate your brand’s collection.',
    retailDesc: 'Handcrafted with high-density cotton weave for superior flexibility, lasting strength, and effortless daily style.',
    singlePriceBDT: 850,
    singleRegularPriceBDT: 1050,
    comboPriceBDT: 1490,
    comboRegularPriceBDT: 2100,
    calculateTierPrice: calculateAdultTierPriceBDT,
    sizes: ['M', 'L'],
    defaultSize: 'M',
    dimensionsText: '1.5" Width • 38"-42" Length',
    colors: [
      {
        id: 'adult-black',
        name: 'Black',
        colorName: 'Black',
        hex: '#1C1B1A',
        tagline: 'Classic & Versatile',
        displayImage: b1Clean,
        images: [b1, b2, b3, b4, b5, b6],
        desc: 'Deep obsidian tone. The quintessential everyday belt for sharp formal wear and casual styling.'
      },
      {
        id: 'adult-navy',
        name: 'Navy',
        colorName: 'Navy',
        hex: '#1B263B',
        tagline: 'Refined Maritime Blue',
        displayImage: n1Clean,
        images: [n1, n2, n3, n4, n5, n6],
        desc: 'Rich indigo hue. Pairs effortlessly with raw denim, chinos, linen shirts, and warm summer neutrals.'
      },
      {
        id: 'adult-brown',
        name: 'Brown',
        colorName: 'Brown',
        hex: '#4A3525',
        tagline: 'Earth & Leather Heritage',
        displayImage: br1Clean,
        images: [br1, br2, br3, br4, br5, br6],
        desc: 'Warm earthy espresso tone. Offers organic texture for safari jackets, olive trousers, and casual suits.'
      },
      {
        id: 'adult-maroon',
        name: 'Maroon',
        colorName: 'Maroon',
        hex: '#58111A',
        tagline: 'Signature Artisan Wine',
        displayImage: m1Clean,
        images: [m1, m2, m3, m4, m5, m6],
        desc: 'Distinctive burgundy wine palette. A bold conversational statement piece crafted with tight knot density.'
      },
      {
        id: 'adult-khaki',
        name: 'Khaki',
        colorName: 'Khaki',
        hex: '#C3B091',
        tagline: 'Sun-Bleached Sand',
        displayImage: k1Clean,
        images: [k1, k2, k3, k4, k5, k6],
        desc: 'Warm desert sand tone. Highlights the natural pure cotton weave pattern with high-contrast depth.'
      }
    ],
    sizeGuide: {
      title: 'Adult Sizing Guide',
      columns: ['Size', 'Waist', 'Length'],
      rows: [
        { size: 'M', waist: '32–35"', length: '38"' },
        { size: 'L', waist: '35–38"', length: '42"' }
      ],
      width: '1.5"',
      note: '* Our macramé weave is naturally flexible, offering a slightly adjustable and comfortable fit.'
    },
    careGuide: {
      title: 'Care Instructions',
      points: [
        'Spot clean with a damp cloth or soft brush for everyday dust and minor marks.',
        'Hand wash gently in cold water with mild detergent when deep cleaning.',
        'Lay flat on a clean surface in shade to dry naturally.',
        'Do not machine wash, tumble dry, bleach, or wring out tightly.'
      ],
      instructions: 'Spot clean with a damp cloth or hand wash in cold water with mild detergent. Lay flat in shade to dry. Do not machine dry, bleach, or wring.'
    }
  },

  women: {
    id: 'women',
    slug: 'women',
    title: 'AST Women’s Handmade Macramé Waist Belt',
    shortTitle: 'Women’s Waist Belt',
    badge: 'Women’s Collection',
    category: 'women',
    subtitle: 'WOMEN’S TIE-STYLE | 100% NATURAL COTTON',
    shortDesc: 'Artisanal tie-style macramé waist belt for women with flexible knotting and 2-inch width. Beautifully handcrafted to elevate dresses, tunics, and modern fashion.',
    retailDesc: 'Handcrafted with 100% natural cotton in an intricate diamond macramé knot. Features an adjustable tie-style closure that shapes comfortably around any waist.',
    singlePriceBDT: 590,
    singleRegularPriceBDT: 750,
    comboPriceBDT: 1080,
    comboRegularPriceBDT: 1500,
    calculateTierPrice: calculateWomenTierPriceBDT,
    sizes: ['31"', '36"'],
    defaultSize: '31"',
    dimensionsText: '2" Width • 31" / 36" Length',
    colors: [
      {
        id: 'women-pink',
        name: 'Pink',
        colorName: 'Pink',
        hex: '#E5989B',
        shade: 'Blush Pink',
        tagline: 'Blush Pink | Bohemian Grace',
        displayImage: womenPinkClean,
        images: womenPink,
        desc: 'Soft rose blush pink shade. A romantic bohemian statement piece that pairs gorgeously with flowy maxi dresses, linen tunics, and festive evening wear.'
      },
      {
        id: 'women-purple',
        name: 'Purple',
        colorName: 'Purple',
        hex: '#5A2A60',
        shade: 'Royal Purple',
        tagline: 'Royal Purple | Rich Regal Accent',
        displayImage: womenPurpleClean,
        images: womenPurple,
        desc: 'Deep royal purple tone. Adds an eye-catching regal accent to monochromatic dresses, kaftans, and contemporary party outfits.'
      }
    ],
    sizeGuide: {
      title: 'Women’s Waist Belt Sizing Guide',
      columns: ['Size', 'Total Length', 'Width', 'Fit'],
      rows: [
        { size: '31"', length: '31 inches', waist: '24–30"', width: '2 inches', fit: 'Adjustable Tie' },
        { size: '36"', length: '36 inches', waist: '30–38"', width: '2 inches', fit: 'Adjustable Tie' }
      ],
      width: '2"',
      note: '* Tie-Style Adjustability: Designed with generous woven end ties, allowing you to knot or bow at your preferred waist position for a tailored silhouette over any outfit.'
    },
    careGuide: {
      title: 'Women’s Belt Care Instructions',
      points: [
        'Spot clean dust and minor marks with a soft damp cloth.',
        'Hand wash gently in cold water with mild soap when necessary.',
        'Lay flat on a clean dry towel in shade to dry naturally.',
        'Do not machine wash, tumble dry, wring, or bleach.'
      ],
      instructions: 'Spot clean with a soft damp cloth or hand wash gently in cold water with mild soap. Lay flat in shade to dry naturally. Do not machine dry, bleach, or wring.'
    }
  },

  kids: {
    id: 'kids',
    slug: 'kids',
    title: 'AST Handmade Macramé Kids Belt',
    shortTitle: 'Kids Belt (Boys & Girls)',
    badge: 'Kids Collection',
    category: 'kids',
    subtitle: 'KIDS UNISEX (BOYS & GIRLS) | 100% NATURAL COTTON',
    shortDesc: 'Lightweight, gentle on young skin, and ultra-durable. Handcrafted 100% natural cotton macramé belt designed for boys and girls with effortless pin-anywhere weave flexibility.',
    retailDesc: 'Specially proportioned for children with softer weave density, rounded skin-safe buckle, and pin-anywhere adjustability that grows with your child.',
    singlePriceBDT: 600,
    singleRegularPriceBDT: 850,
    comboPriceBDT: 1090,
    comboRegularPriceBDT: 1700,
    calculateTierPrice: calculateKidsTierPriceBDT,
    sizes: ['One'],
    defaultSize: 'One',
    dimensionsText: '1 1/4" Width • 28" Length',
    colors: [
      {
        id: 'kids-lime-rush',
        name: 'Lime Rush',
        colorName: 'Lime Rush',
        hex: '#CBE743',
        shade: 'Neon Lime + Grey',
        tagline: 'Neon Lime + Grey | Vibrant & Energetic',
        displayImage: kidsNeonClean,
        images: kidsNeon,
        desc: 'Electric neon lime interwoven with crisp grey accents. A lively, dual-tone pop of color for kids active wear, parties, and summer outfits.'
      },
      {
        id: 'kids-ocean-navy',
        name: 'Ocean Navy',
        colorName: 'Ocean Navy',
        hex: '#1B263B',
        shade: 'Navy + Grey',
        tagline: 'Navy + Grey | Refined Maritime Classic',
        displayImage: kidsNavyClean,
        images: kidsNavy,
        desc: 'Deep oceanic navy paired with refined grey shades. Ideal for school uniforms, family gatherings, denim jeans, and smart casual attire.'
      },
      {
        id: 'kids-red-blaze',
        name: 'Red Blaze',
        colorName: 'Red Blaze',
        hex: '#D62226',
        shade: 'Red + Grey',
        tagline: 'Red + Grey | Bold & Playful Blaze',
        displayImage: kidsRedClean,
        images: kidsRed,
        desc: 'Bright ruby red blended with subtle grey contrast. Adds an eye-catching, cheerful dual-shade style to kids outfits, dresses, and celebratory wear.'
      },
      {
        id: 'kids-shadow-black',
        name: 'Shadow Black',
        colorName: 'Shadow Black',
        hex: '#1C1B1A',
        shade: 'Black + Grey',
        tagline: 'Black + Grey | Smart & Modern Essential',
        displayImage: kidsBlackClean,
        images: kidsBlack,
        desc: 'Crisp obsidian black combined with grey tones. Clean, versatile, and stain-resistant for daily school, sports, and formal wear.'
      }
    ],
    sizeGuide: {
      title: 'Kids Sizing Guide (Boys & Girls)',
      columns: ['Size', 'Waist Fit', 'Total Length'],
      rows: [
        { size: 'One', waist: '20–26"', length: '28"' }
      ],
      width: '1 1/4"',
      length: '28"',
      note: '* Pin-Anywhere Flexibility: The buckle prong inserts smoothly through any point of the macramé braid without fixed punch holes, effortlessly adjusting as your child grows.'
    },
    careGuide: {
      title: 'Kids Belt Care Instructions',
      points: [
        'Spot clean food, juice, or play stains easily using a soft damp cloth.',
        'Hand wash gently in cool water with mild, child-safe soap when needed.',
        'Lay flat to air-dry naturally in shade.',
        'Do not machine wash, tumble dry, wring, or bleach.'
      ],
      instructions: 'Hand wash gently in cold water using mild, kid-safe soap. Spot clean juice, food, or play stains with a soft damp cloth. Lay flat to dry naturally in shade. Do not tumble dry, wring, or bleach.'
    }
  }
};

// Flattened gallery catalog containing all product styles (Adult, Women, Kids)
export const ALL_GALLERY_ITEMS = [
  ...PRODUCTS.adult.colors.map(c => ({
    ...c,
    productId: 'adult',
    productTitle: PRODUCTS.adult.title,
    badge: 'Adult Unisex',
    singlePriceBDT: PRODUCTS.adult.singlePriceBDT,
    regularPriceBDT: PRODUCTS.adult.singleRegularPriceBDT,
    sizes: PRODUCTS.adult.sizes,
    dimensions: PRODUCTS.adult.dimensionsText,
    displayImage: c.displayImage || c.images[0]
  })),
  ...PRODUCTS.women.colors.map(c => ({
    ...c,
    productId: 'women',
    productTitle: PRODUCTS.women.title,
    badge: 'Women’s Collection',
    singlePriceBDT: PRODUCTS.women.singlePriceBDT,
    regularPriceBDT: PRODUCTS.women.singleRegularPriceBDT,
    sizes: PRODUCTS.women.sizes,
    dimensions: PRODUCTS.women.dimensionsText,
    displayImage: c.displayImage || c.images[0]
  })),
  ...PRODUCTS.kids.colors.map(c => ({
    ...c,
    productId: 'kids',
    productTitle: PRODUCTS.kids.title,
    badge: 'Kids (Boys & Girls)',
    singlePriceBDT: PRODUCTS.kids.singlePriceBDT,
    regularPriceBDT: PRODUCTS.kids.singleRegularPriceBDT,
    sizes: PRODUCTS.kids.sizes,
    dimensions: PRODUCTS.kids.dimensionsText,
    displayImage: c.displayImage || c.images[0]
  }))
];

// Helper to get product by id or slug
export const getProductById = (id = 'adult') => {
  const cleanId = (id || '').toLowerCase().trim();
  if (cleanId === 'kids' || cleanId === 'kid' || cleanId === 'ast-macrame-kids') {
    return PRODUCTS.kids;
  }
  if (cleanId === 'women' || cleanId === 'womens' || cleanId === 'women-waist-belt' || cleanId === 'ast-womens-waist-belt' || cleanId === 'waist-belt') {
    return PRODUCTS.women;
  }
  return PRODUCTS.adult;
};

