/**
 * Smart Dynamic Weight & DHL Zone Matrix Calculator
 * Unit belt weight: 236 grams
 * Standard protective packaging weight: 100 grams
 */

export const BELT_WEIGHT_GRAMS = 236;
export const PACKAGING_WEIGHT_GRAMS = 100;

export const calculateShipmentWeight = (quantity = 1) => {
  const safeQty = Math.max(1, Number(quantity) || 1);
  const totalGrams = (safeQty * BELT_WEIGHT_GRAMS) + PACKAGING_WEIGHT_GRAMS;
  return {
    grams: totalGrams,
    kg: Number((totalGrams / 1000).toFixed(3))
  };
};

export const getDHLZoneInfo = (countryCode = 'BD', continentCode = '') => {
  const code = (countryCode || 'BD').toUpperCase();
  const continent = (continentCode || '').toUpperCase();

  if (code === 'BD') {
    return {
      zone: 0,
      carrier: 'Express Courier',
      transit: '1–3 Days',
      base05: 120,
      base10: 120,
      add05: 30
    };
  }

  const southAsia = ['IN', 'NP', 'LK', 'BT', 'MV'];
  const seaGulf = ['AE', 'SA', 'QA', 'OM', 'KW', 'BH', 'SG', 'MY', 'TH', 'ID', 'PH', 'VN'];
  const northAmerica = ['US', 'CA', 'MX'];
  const europe = ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'CH', 'SE', 'NO', 'DK', 'FI', 'IE', 'AT', 'PT', 'PL', 'GR', 'CZ', 'RO', 'HU'];
  const oceaniaEastAsia = ['AU', 'NZ', 'JP', 'KR', 'HK', 'TW'];

  if (southAsia.includes(code)) {
    return {
      zone: 1,
      carrier: 'DHL Express',
      transit: '2–4 Days',
      base05: 1350,
      base10: 1750,
      add05: 350
    };
  }

  if (seaGulf.includes(code)) {
    return {
      zone: 2,
      carrier: 'DHL Express',
      transit: '3–5 Days',
      base05: 1650,
      base10: 2200,
      add05: 450
    };
  }

  if (northAmerica.includes(code)) {
    return {
      zone: 4,
      carrier: 'DHL Express',
      transit: '3–5 Days',
      base05: 1890,
      base10: 2550,
      add05: 600
    };
  }

  if (europe.includes(code) || continent === 'EU') {
    return {
      zone: 3,
      carrier: 'DHL Express',
      transit: '3–5 Days',
      base05: 1950,
      base10: 2600,
      add05: 550
    };
  }

  if (oceaniaEastAsia.includes(code)) {
    return {
      zone: 5,
      carrier: 'DHL Express',
      transit: '3–5 Days',
      base05: 2250,
      base10: 2950,
      add05: 650
    };
  }

  // Rest of World (Zone 6)
  return {
    zone: 6,
    carrier: 'DHL Express',
    transit: '4–7 Days',
    base05: 2600,
    base10: 3400,
    add05: 750
  };
};

/**
 * Calculates shipping quote dynamically based on weight & destination country.
 * @param {number} quantity - Total belts being shipped
 * @param {string} countryCode - 2-letter ISO country code (e.g. 'US', 'DE', 'BD')
 * @param {string} continentCode - 2-letter continent code (e.g. 'EU', 'NA', 'AS')
 * @param {number} exchangeRate - Rate from BDT to local currency
 */
export const calculateShippingQuote = (
  quantity = 1,
  countryCode = 'BD',
  continentCode = '',
  exchangeRate = 1
) => {
  const { grams, kg } = calculateShipmentWeight(quantity);
  const zoneInfo = getDHLZoneInfo(countryCode, continentCode);

  let costBDT = zoneInfo.base05;

  if (zoneInfo.zone === 0) {
    // Domestic BD
    if (kg <= 1.0) costBDT = 120;
    else if (kg <= 2.0) costBDT = 150;
    else costBDT = 180;
  } else {
    // International DHL Express
    if (kg <= 0.5) {
      costBDT = zoneInfo.base05;
    } else if (kg <= 1.0) {
      costBDT = zoneInfo.base10;
    } else {
      const extraKg = kg - 1.0;
      const extraSlabs = Math.ceil(extraKg / 0.5);
      costBDT = zoneInfo.base10 + (extraSlabs * zoneInfo.add05);
    }
  }

  const costLocal = costBDT * (exchangeRate || 1);

  return {
    quantity: Math.max(1, Number(quantity) || 1),
    weightGrams: grams,
    weightKg: kg,
    costBDT,
    costLocal,
    carrier: zoneInfo.carrier,
    transit: zoneInfo.transit,
    zone: zoneInfo.zone
  };
};
