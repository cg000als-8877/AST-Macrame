
const url = 'https://script.google.com/macros/s/AKfycbzJtqUpaA-Zfo1MId06SHg2omv178oBX8NsjZkRVKdr4_3RhsRCZDYy6nPuHlocAHME/exec';
const data = new URLSearchParams({
  name: 'Test Name',
  phone: '01711111111',
  address: 'Test Address, Thana, District',
  formType: 'Retail Order',
  orderType: 'Single (1090 BDT)',
  color: 'Terracotta',
  size: '100cm',
  deliveryCharge: 'Outside Chittagong Delivery Charge 120 Tk',
  date: 'Aug 18, 2026',
  time: '11:00 AM',
  totalAmount: '1210 BDT',
  sheet: 'Sheet1',
  sheetName: 'Sheet1'
});
fetch(url, { method: 'POST', body: data })
  .then(res => res.text())
  .then(text => console.log('Response:', text))
  .catch(err => console.error('Error:', err));
