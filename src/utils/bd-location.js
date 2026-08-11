import districtsRaw from '../data/bd-districts.json';
import upazilasRaw from '../data/bd-upazilas.json';

const districts = districtsRaw.districts;
const upazilas = upazilasRaw.upazilas;

export function getDistricts() {
  return districts;
}

export function getUpazilasByDistrict(districtId) {
  return upazilas.filter((u) => u.district_id === districtId);
}

export default {
  getDistricts,
  getUpazilasByDistrict
};
