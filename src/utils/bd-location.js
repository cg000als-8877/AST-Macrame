import districtsRaw from '../data/bd-districts.json';
import upazilasRaw from '../data/bd-upazilas.json';

const districts = districtsRaw.districts;
const upazilas = upazilasRaw.upazilas;

const dhakaMetroThanas = [
  "Adabor", "Airport", "Badda", "Banani", "Bangshal", "Bhashantek", "Cantonment", 
  "Chawkbazar", "Dakshinkhan", "Dar-us-Salam", "Demra", "Dhanmondi", "Gendaria", 
  "Gulshan", "Hatirjheel", "Hazaribagh", "Jatrabari", "Kadamtali", "Kafrul", 
  "Kalabagan", "Kamrangirchar", "Khilgaon", "Khilkhet", "Kotwali", "Lalbagh", 
  "Mirpur", "Mohammadpur", "Motijheel", "Mugda", "New Market", "Pallabi", "Paltan", 
  "Ramna", "Rampura", "Sabujbagh", "Shah Ali", "Shahbag", "Shahjahanpur", 
  "Sher-e-Bangla Nagar", "Shyampur", "Sutrapur", "Tejgaon", "Tejgaon Industrial Area", 
  "Turag", "Uttara East", "Uttara West", "Uttara Khan", "Vatara", "Wari"
];

export function getDistricts() {
  return districts;
}

export function getUpazilasByDistrict(districtId) {
  let results = upazilas.filter((u) => u.district_id === districtId);
  
  // If Dhaka (ID: 1) is selected, inject Metropolitan Thanas
  if (districtId === "1") {
    const metroObjects = dhakaMetroThanas.map((name, index) => ({
      id: `metro-${index}`,
      district_id: "1",
      name: name,
      bn_name: name // Kept English for now as fallback
    }));
    results = [...results, ...metroObjects];
    
    // Sort alphabetically
    results.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  return results;
}

export default {
  getDistricts,
  getUpazilasByDistrict
};

