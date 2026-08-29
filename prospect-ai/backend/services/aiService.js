const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const GOAL_INSTRUCTIONS = {
  demo: 'Book a product demo — make them want to see it in action',
  partnership: 'Explore partnership — peer to peer tone, not sales',
  recruiting: 'Recruit this person — make them excited about opportunity',
  general: 'General professional connection — low pressure, high value'
};

function cleanJson(str) {
  let clean = str.trim();
  if (clean.startsWith('```')) {
    clean = clean.replace(/^```(json)?\n/, '').replace(/\n```$/, '');
  }
  return clean;
}

const buildPrompt = (profileText, goalType, senderContext) => `
You are an elite B2B sales strategist with 10 years of outbound experience. You write outreach that gets replies because it feels genuinely personal, never templated.

OUTREACH GOAL: ${GOAL_INSTRUCTIONS[goalType]}
SENDER CONTEXT: ${senderContext || 'Not provided'}

PROSPECT PROFILE:
${profileText}

Analyse deeply. Find specific signals — job changes, company stage, communication style, likely pain points.
Never use: "I came across your profile", "I hope this finds you well", "I'd love to connect", "synergy", "reaching out", "touch base", "circle back".

CRITICAL INSTRUCTION: You must make the outreach extremely personalized based on whatever details are available in the profile text. Find at least one specific, unique detail to mention. Score the profile realistically (1-10) based on how much detail was available, but always provide the best possible personalised outreach.

Return ONLY raw valid JSON. No markdown. No code fences. No text before or after. Exactly this structure:

{
  "prospectName": "extracted name or Unknown",
  "prospectCompany": "current company or Unknown",
  "personalisationScore": <integer 1-10>,
  "scoreReason": "<one sentence: what specific signals you found>",
  "keyInsights": [
    "<specific insight 1>",
    "<specific insight 2>",
    "<specific insight 3>"
  ],
  "connectionRequest": "<max 280 chars. ONE specific detail. No generic opener. Ends with value to them.>",
  "emailSubject": "<specific — not Quick question or Following up>",
  "emailBody": "<150 words max. Opens with their situation. Bridges to value. Soft CTA. Natural sign-off.>",
  "callScript": {
    "opener": "<exact words for first 8 seconds>",
    "bridge": "<their situation to your reason for calling, 2 sentences>",
    "question": "<one open discovery question specific to their role>",
    "objectionHandler": "<20 second response to not interested>"
  },
  "avoidThese": [
    "<specific thing to avoid with THIS prospect and exact reason>",
    "<second thing to avoid>",
    "<optional third>"
  ]
}
`;

async function generateOutreach(profileText, goalType, senderContext) {
  const prompt = buildPrompt(profileText, goalType, senderContext);

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: { temperature: 0.7 }
    });

    const result = await model.generateContent(prompt);
    const raw = cleanJson(result.response.text());
    return JSON.parse(raw);

  } catch (err) {
    console.error('AI generation first attempt failed:', err.message);

    // Retry once with stricter instruction and lower temperature
    try {
      const retryPrompt = prompt +
        '\n\nCRITICAL: Your previous response was not valid JSON. ' +
        'Return ONLY the JSON object. Nothing else. No markdown fences.';

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: { temperature: 0.7 }
      });

      const retry = await model.generateContent(retryPrompt);
      const raw = cleanJson(retry.response.text());
      return JSON.parse(raw);
    } catch (retryErr) {
      console.error('AI generation retry failed:', retryErr.message);
      throw new Error('AI generation failed after retry');
    }
  }
}

module.exports = { generateOutreach };
