const fs = require('fs');

async function run() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const countries = await res.json();
    
    function getFlagEmoji(countryCode) {
      if (!countryCode) return '';
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
      return String.fromCodePoint(...codePoints);
    }

    const formatted = countries
      .filter(c => c.idd && c.idd.root)
      .map(c => {
        const suffix = c.idd.suffixes && c.idd.suffixes.length === 1 ? c.idd.suffixes[0] : '';
        const dialCode = c.idd.root + suffix;
        return {
          name: c.name.common,
          code: c.cca2,
          dialCode: dialCode,
          flag: getFlagEmoji(c.cca2)
        };
      })
      .filter(c => c.dialCode) 
      .sort((a, b) => a.name.localeCompare(b.name));

    const uniqueCountries = [];
    const seenCodes = new Set();
    for (const c of formatted) {
      if (!seenCodes.has(c.code)) {
        seenCodes.add(c.code);
        uniqueCountries.push(c);
      }
    }

    const fileContent = `export const countries = ${JSON.stringify(uniqueCountries, null, 2)};\n`;
    fs.mkdirSync('./src/utils', { recursive: true });
    fs.writeFileSync('./src/utils/countries.js', fileContent);
    console.log('Successfully created src/utils/countries.js with ' + uniqueCountries.length + ' countries.');
  } catch(e) {
    console.error(e);
  }
}
run();
