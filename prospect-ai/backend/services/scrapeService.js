const https = require('https');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fetchMicrolinkData(url) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}`;
    
    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse Microlink'));
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}


async function scrapeLinkedInProfile(url) {
  if (!url || (!url.includes('linkedin.com/in/') && !url.includes('linkedin.com/pub/'))) {
    return { success: false, message: 'Please provide a valid LinkedIn profile URL' };
  }

  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http')) normalizedUrl = 'https://' + normalizedUrl;
  normalizedUrl = normalizedUrl.split('?')[0].replace(/\/+$/, '');

  try {
    // 1. Try public extraction
    const result = await fetchMicrolinkData(normalizedUrl);

    if (result.status === 'success' && result.data && result.data.description && result.data.description.length > 50) {
      const { author, title, description, image } = result.data;
      const profileText = [author ? `Name: ${author}` : '', title || '', description].filter(Boolean).join('\n\n');
      
      return {
        success: true,
        profileText,
        name: author || '',
        image: image?.url || '',
        message: 'Profile data extracted successfully'
      };
    }
  } catch (err) {
    console.error('Microlink scrape error:', err.message);
  }

  // Absolute failure if Microlink doesn't succeed
  return {
    success: false,
    profileText: '',
    message: 'LinkedIn is blocking automated requests. Please copy and paste the profile text manually.'
  };
}

module.exports = { scrapeLinkedInProfile };
