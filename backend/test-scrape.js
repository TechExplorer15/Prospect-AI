const { scrapeLinkedInProfile } = require('./services/scrapeService');

async function test() {
  const result = await scrapeLinkedInProfile('https://www.linkedin.com/in/williamhgates');
  console.log(JSON.stringify(result, null, 2));
}

test();
