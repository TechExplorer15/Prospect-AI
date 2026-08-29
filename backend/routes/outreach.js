const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const OutreachGeneration = require('../models/OutreachGeneration');
const User = require('../models/User');
const { generateOutreach } = require('../services/aiService');
const { outreachLimiter } = require('../middleware/rateLimit');

const router = express.Router();

// POST /api/outreach/generate
router.post('/generate', outreachLimiter, async (req, res) => {
  try {
    const { profileText, goalType, senderContext } = req.body;

    // ── Step 2: Validate inputs ──────────────────────────
    if (!profileText || profileText.trim().length < 50) {
      return res.status(400).json({
        error: 'Profile text must be at least 50 characters. Paste the prospect\'s LinkedIn About section, headline, or recent posts for best results.'
      });
    }

    const validGoals = ['demo', 'partnership', 'recruiting', 'general'];
    if (!goalType || !validGoals.includes(goalType)) {
      return res.status(400).json({
        error: `Invalid goal type. Must be one of: ${validGoals.join(', ')}`
      });
    }

    // ── Step 3: Generate sessionId ───────────────────────
    let userId = null;
    let sessionId;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
        sessionId = `user_${userId}_${Date.now()}`;
      } catch {
        // Invalid token — continue as guest
        sessionId = crypto
          .createHash('sha256')
          .update(`${req.ip}_${Date.now()}`)
          .digest('hex')
          .slice(0, 16);
      }
    } else {
      sessionId = crypto
        .createHash('sha256')
        .update(`${req.ip}_${Date.now()}`)
        .digest('hex')
        .slice(0, 16);
    }

    // ── Step 4 & 5: Call AI service (with built-in retry) ─
    let aiResult;
    try {
      aiResult = await generateOutreach(profileText, goalType, senderContext);
    } catch (err) {
      console.error('AI generation failed:', err.message);
      return res.status(500).json({
        error: 'AI generation failed. Please try again.'
      });
    }

    // ── Step 6: Save to MongoDB ──────────────────────────
    const generation = await OutreachGeneration.create({
      userId,
      sessionId,
      prospectName: aiResult.prospectName,
      prospectCompany: aiResult.prospectCompany,
      goalType,
      senderContext: senderContext || '',
      profileText,
      personalisationScore: aiResult.personalisationScore,
      scoreReason: aiResult.scoreReason,
      keyInsights: aiResult.keyInsights,
      connectionRequest: aiResult.connectionRequest,
      emailSubject: aiResult.emailSubject,
      emailBody: aiResult.emailBody,
      callScript: aiResult.callScript,
      avoidThese: aiResult.avoidThese,
      ipAddress: req.ip
    });

    // ── Step 7: Increment user generation count ──────────
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        $inc: { generationCount: 1 }
      });
    }

    // ── Step 8: Return result ────────────────────────────
    res.status(200).json(generation);

  } catch (err) {
    console.error('Outreach generation error:', err);
    res.status(500).json({
      error: 'Something went wrong. Please try again.'
    });
  }
});

module.exports = router;
