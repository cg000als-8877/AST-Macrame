import districtsRaw from '../data/bd-districts.json';
import upazilasRaw from '../data/bd-upazilas.json';

const districts = districtsRaw.districts;
const upazilas = upazilasRaw.upazilas;

// Mapping of District ID to Metropolitan City Thanas
const metroMap = {
  // Dhaka
  "1": [
    "Adabor", "Airport", "Badda", "Banani", "Bangshal", "Bhashantek", "Cantonment", 
    "Chawkbazar", "Dakshinkhan", "Dar-us-Salam", "Demra", "Dhanmondi", "Gendaria", 
    "Gulshan", "Hatirjheel", "Hazaribagh", "Jatrabari", "Kadamtali", "Kafrul", 
    "Kalabagan", "Kamrangirchar", "Khilgaon", "Khilkhet", "Kotwali", "Lalbagh", 
    "Mirpur", "Mohammadpur", "Motijheel", "Mugda", "New Market", "Pallabi", "Paltan", 
    "Ramna", "Rampura", "Sabujbagh", "Shah Ali", "Shahbag", "Shahjahanpur", 
    "Sher-e-Bangla Nagar", "Shyampur", "Sutrapur", "Tejgaon", "Tejgaon Industrial Area", 
    "Turag", "Uttara East", "Uttara West", "Uttara Khan", "Vatara", "Wari"
  ],
  // Gazipur
  "3": [
    "Bason", "Gacha", "Kashimpur", "Konabari", "Pubail", "Sadar", "Tongi East", "Tongi West"
  ],
  // Rajshahi
  "24": [
    "Airport", "Belpukur", "Boalia", "Chandrima", "Damkura", "Karnahar", "Kashiadanga", 
    "Katakhali", "Matihar", "Paba", "Rajpara", "Shah Makhdum"
  ],
  // Rangpur
  "32": [
    "Haragach", "Hazirhat", "Kotwali", "Mahiganj", "Parshuram", "Tajhat"
  ],
  // Barishal
  "35": [
    "Airport", "Bandar", "Kaunia", "Kotwali"
  ],
  // Chattogram
  "43": [
    "Akbarshah", "Bakalia", "Bandar", "Bayezid Bostami", "Chandgaon", "Chawkbazar", 
    "Double Mooring", "EPZ", "Halishahar", "Karnafuli", "Khulshi", "Kotowali", 
    "Pahartali", "Panchlaish", "Patenga", "Sadarghat"
  ],
  // Cumilla
  "44": [
    "Kotwali", "Sadar Dakshin"
  ],
  // Sylhet
  "54": [
    "Airport", "Dakshin Surma", "Jalalabad", "Kotwali", "Mogla Bazar", "Shah Paran"
  ],
  // Khulna
  "59": [
    "Arongghata", "Daulatpur", "Harintana", "Khalishpur", "Khan Jahan Ali", 
    "Khulna Sadar", "Labanchara", "Sonadanga"
  ]
};

export function getDistricts() {
  return districts;
}

export function getUpazilasByDistrict(districtId) {
  let results = upazilas.filter((u) => u.district_id === districtId);
  
  // Inject Metropolitan Thanas if the district has any
  if (metroMap[districtId]) {
    const metroObjects = metroMap[districtId].map((name, index) => ({
      id: `metro-${districtId}-${index}`,
      district_id: districtId,
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
