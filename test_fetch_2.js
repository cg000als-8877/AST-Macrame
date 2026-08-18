
const url = 'https://script.google.com/macros/s/AKfycbzJtqUpaA-Zfo1MId06SHg2omv178oBX8NsjZkRVKdr4_3RhsRCZDYy6nPuHlocAHME/exec';
const data = new URLSearchParams({
  name: 'Test Name Without Sheet Param',
  phone: '01711111111'
});
fetch(url, { method: 'POST', body: data })
  .then(res => res.text())
  .then(text => console.log('Response:', text))
  .catch(err => console.error('Error:', err));
