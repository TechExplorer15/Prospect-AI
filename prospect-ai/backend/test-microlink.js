const https = require('https');

async function test() {
  const url = 'https://api.microlink.io/?url=https://www.linkedin.com/in/williamhgates';
  https.get(url, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => console.log(data));
  });
}
test();
