const bd = require('@bangladeshi/bangladesh-address');
const dist = bd.allDistrict();
const dhaka = dist.find(d => d.name === 'Dhaka');
console.log(dhaka);
if(dhaka) {
    console.log(bd.upazilasOf(dhaka.name).slice(0, 10));
}
