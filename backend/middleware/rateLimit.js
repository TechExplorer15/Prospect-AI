const rateLimit = require('express-rate-limit');

// Global rate limiter — generous for general API use
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Outreach generation limiter — 20 per hour per IP
const outreachLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 3600000, // 1 hour
  max: parseInt(process.env.RATE_LIMIT_MAX) || 20,
  handler: (req, res) => {
    const resetTime = new Date(Date.now() + (parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 3600000));
    res.status(429).json({
      error: 'Rate limit exceeded',
      resetsAt: resetTime.toISOString(),
      message: `You have used your ${process.env.RATE_LIMIT_MAX || 20} free generations this hour. Try again at ${resetTime.toLocaleTimeString()}.`
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip
});

module.exports = { globalLimiter, outreachLimiter };
