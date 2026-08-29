const express = require('express');
const { scrapeLinkedInProfile } = require('../services/scrapeService');
const { globalLimiter } = require('../middleware/rateLimit');

const router = express.Router();

// POST /api/scrape
router.post('/', globalLimiter, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL is required'
      });
    }

    const result = await scrapeLinkedInProfile(url);
    
    // We return 200 even on scrape failure so the frontend can handle the fallback message gracefully
    res.status(200).json(result);

  } catch (err) {
    console.error('Scrape route error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error during scraping'
    });
  }
});

module.exports = router;
