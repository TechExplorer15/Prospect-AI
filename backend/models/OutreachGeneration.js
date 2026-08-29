const mongoose = require('mongoose');

const outreachGenerationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  sessionId: {
    type: String,
    required: true
  },
  prospectName: String,
  prospectCompany: String,
  goalType: {
    type: String,
    enum: ['demo', 'partnership', 'recruiting', 'general'],
    required: true
  },
  senderContext: String,
  profileText: String,
  personalisationScore: Number,
  scoreReason: String,
  keyInsights: [String],
  connectionRequest: String,
  emailSubject: String,
  emailBody: String,
  callScript: {
    opener: String,
    bridge: String,
    question: String,
    objectionHandler: String
  },
  avoidThese: [String],
  generatedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String
});

module.exports = mongoose.model('OutreachGeneration', outreachGenerationSchema);
