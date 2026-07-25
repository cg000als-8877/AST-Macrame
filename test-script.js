const url = 'https://script.google.com/macros/s/AKfycbybgvWpMHYzv5e6yHqhuS4mfBYXFsp5rKcRnqC2sp3F_Hr1h4vhzc6bcUi0ryB-lVs/exec';

const data = new URLSearchParams();
data.append('formType', 'Test');
data.append('name', 'Test Name');
data.append('company', 'Test Company');
data.append('email', 'test@test.com');
data.append('address', '123 Test St');
data.append('color', 'Black');
data.append('size', 'M');
data.append('message', 'Test Message');

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: data.toString()
})
.then(res => res.text())
.then(text => console.log('Response:', text))
.catch(err => console.error('Error:', err));
