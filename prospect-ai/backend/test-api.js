const http = require('http');

const data = JSON.stringify({
  profileText: 'Sarah Chen - VP of Engineering at DataFlow Inc. Previously Senior Director at Stripe for 4 years. Led a team of 50 engineers building payment infrastructure. Recently posted about scaling microservices and the challenges of hiring senior backend engineers. Stanford CS graduate. Passionate about developer tooling and API design. Based in San Francisco. Company recently raised Series C.',
  goalType: 'demo',
  senderContext: 'I run an AI analytics startup targeting enterprise engineering teams'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/outreach/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log(JSON.stringify(JSON.parse(body), null, 2));
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
