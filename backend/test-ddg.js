const https = require('https');
const cheerio = require('cheerio');

async function testDDG() {
  const url = 'https://www.linkedin.com/in/satyanadella/';
  // Use DuckDuckGo HTML version to bypass JS requirements
  const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(url)}`;
  
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };

  https.get(ddgUrl, options, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      const $ = cheerio.load(data);
      const result = $('.result__snippet').first().text();
      const title = $('.result__title').first().text();
      console.log('Title:', title.trim());
      console.log('Snippet:', result.trim());
    });
  });
}
testDDG();
