import { useState, useEffect } from 'react'
import GoalSelector from '../components/GoalSelector'
import ResultCard from '../components/ResultCard'
import PersonalisationScore from '../components/PersonalisationScore'

const API_URL = import.meta.env.VITE_API_URL || ''

function Tool() {
  const [profileText, setProfileText] = useState('')
  const [goalType, setGoalType] = useState('demo')
  const [senderContext, setSenderContext] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingPhase, setLoadingPhase] = useState(1)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [profileUrl, setProfileUrl] = useState('')
  const [scraping, setScraping] = useState(false)
  const [showLowScoreBanner, setShowLowScoreBanner] = useState(true)

  const handleScrape = async () => {
    if (!profileUrl.trim()) return

    setScraping(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/api/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: profileUrl })
      })
      const data = await res.json()

      if (!data.success) {
        setError(data.message)
      } else {
        setProfileText(data.profileText)
      }
    } catch (err) {
      setError('Network error while trying to fetch profile.')
    } finally {
      setScraping(false)
    }
  }

  const handleGenerate = async () => {
    if (profileText.trim().length < 50) {
      setError('Profile text must be at least 50 characters. Paste the prospect\'s LinkedIn About section, headline, or recent posts.')
      return
    }

    setError(null)
    setResult(null)
    setLoading(true)
    setLoadingPhase(1)
    setShowLowScoreBanner(true)

    // Two-phase loading
    const phaseTimer = setTimeout(() => setLoadingPhase(2), 3000)

    try {
      const res = await fetch(`${API_URL}/api/outreach/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileText, goalType, senderContext })
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setError(data.message || 'Rate limit exceeded. Please try again later.')
        } else {
          setError(data.error || 'Something went wrong. Please try again.')
        }
        return
      }

      setResult(data)

      // Save to localStorage history
      const history = JSON.parse(localStorage.getItem('prospect-ai-history') || '[]')
      history.unshift({
        ...data,
        timestamp: new Date().toISOString()
      })
      // Keep max 50 items
      if (history.length > 50) history.pop()
      localStorage.setItem('prospect-ai-history', JSON.stringify(history))

    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      clearTimeout(phaseTimer)
      setLoading(false)
    }
  }

  return (
    <div className="tool-layout">
      {/* ── Input Panel ──────────────────────────────── */}
      <div className="input-panel">
        <h2 className="text-gradient-primary">Generate Outreach</h2>
        <p className="subtitle">Paste a LinkedIn profile and get personalised outreach in seconds</p>

        <div className="form-group">
          <label className="form-label">Outreach Goal</label>
          <GoalSelector selected={goalType} onSelect={setGoalType} />
        </div>

        <div className="form-group" style={{ marginBottom: '12px' }}>
          <label className="form-label">Profile Link <span className="text-muted">(optional)</span></label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              className="form-input"
              placeholder="https://linkedin.com/in/username"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              disabled={scraping}
            />
            <button
              className="generate-btn"
              style={{ width: 'auto', padding: '12px 16px', background: 'var(--bg-surface)' }}
              onClick={handleScrape}
              disabled={scraping || !profileUrl.trim()}
            >
              {scraping ? '⏳' : '📥 Fetch'}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Prospect Profile Text</label>
          <textarea
            className="form-textarea"
            placeholder="Paste the prospect's LinkedIn About section, headline, experience, or recent posts here…"
            value={profileText}
            onChange={(e) => setProfileText(e.target.value)}
            rows={7}
          />
          <div className="text-sub mt-4" style={{ fontSize: '12px' }}>
            {profileText.length} characters {profileText.length < 50 && profileText.length > 0 && '· Need at least 50'}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Your Context <span className="text-muted">(optional)</span></label>
          <input
            className="form-input"
            placeholder="e.g. I run an AI analytics startup targeting enterprise…"
            value={senderContext}
            onChange={(e) => setSenderContext(e.target.value)}
          />
        </div>

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading || profileText.trim().length < 50}
        >
          {loading ? (
            <>
              <div className="btn-shimmer" />
              {loadingPhase === 1 ? '🔍 Researching prospect…' : '✍️ Crafting your outreach…'}
            </>
          ) : (
            <>⚡ Generate Outreach</>
          )}
        </button>

        {error && (
          <div className="error-banner mt-16">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* ── Results Panel ────────────────────────────── */}
      <div className="results-panel">
        {loading && (
          <div className="loading-indicator">
            <div className="loading-spinner" />
            <div className="loading-phase">
              {loadingPhase === 1 ? 'Researching prospect…' : 'Crafting your outreach…'}
            </div>
            <div className="loading-subtext">
              {loadingPhase === 1
                ? 'Analysing profile signals, communication style, and likely pain points'
                : 'Writing personalised copy that feels human, not templated'}
            </div>
          </div>
        )}

        {!loading && !result && (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3>Ready to generate</h3>
            <p>Paste a prospect's LinkedIn profile on the left and click Generate to create personalised outreach copy</p>
          </div>
        )}

        {!loading && result && (
          <>
            {/* Prospect Meta */}
            <div className="prospect-meta">
              <div>
                <div className="prospect-name">{result.prospectName || 'Unknown'}</div>
                <div className="prospect-company">{result.prospectCompany || 'Unknown'}</div>
              </div>
              <div className="prospect-divider" />
              <PersonalisationScore
                score={result.personalisationScore}
                reason={result.scoreReason}
              />
            </div>

            {/* Low Score Banner */}
            {result.personalisationScore < 4 && showLowScoreBanner && (
              <div className="low-score-banner">
                <span className="banner-icon">⚠️</span>
                <span className="banner-text">
                  Low profile data — paste the About section or recent posts for better results.
                </span>
                <button
                  className="banner-dismiss"
                  onClick={() => setShowLowScoreBanner(false)}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Key Insights */}
            {result.keyInsights && result.keyInsights.length > 0 && (
              <ResultCard
                title="Key Insights"
                icon="💡"
                iconColor="blue"
                delay={0}
              >
                <ul className="insights-list">
                  {result.keyInsights.map((insight, i) => (
                    <li key={i}>{insight}</li>
                  ))}
                </ul>
              </ResultCard>
            )}

            {/* Connection Request */}
            <ResultCard
              title="Connection Request"
              icon="🔗"
              iconColor="violet"
              delay={150}
              copyText={result.connectionRequest}
            >
              <p>{result.connectionRequest}</p>
              <div className="text-muted mt-8" style={{ fontSize: '12px' }}>
                {result.connectionRequest?.length || 0}/280 characters
              </div>
            </ResultCard>

            {/* Email */}
            <ResultCard
              title="Email"
              icon="✉️"
              iconColor="teal"
              delay={300}
              copyText={`Subject: ${result.emailSubject}\n\n${result.emailBody}`}
            >
              <div className="email-subject">
                <span className="label">Subject: </span>
                {result.emailSubject}
              </div>
              <p>{result.emailBody}</p>
            </ResultCard>

            {/* Call Script */}
            {result.callScript && (
              <ResultCard
                title="Call Script"
                icon="📞"
                iconColor="blue"
                delay={450}
                copyText={
                  `Opener: ${result.callScript.opener}\n\nBridge: ${result.callScript.bridge}\n\nDiscovery Question: ${result.callScript.question}\n\nObjection Handler: ${result.callScript.objectionHandler}`
                }
              >
                <div className="call-script-section">
                  <div className="call-script-label opener">🟢 Opener (first 8 seconds)</div>
                  <div className="call-script-text">{result.callScript.opener}</div>
                </div>
                <div className="call-script-section">
                  <div className="call-script-label bridge">🔵 Bridge</div>
                  <div className="call-script-text">{result.callScript.bridge}</div>
                </div>
                <div className="call-script-section">
                  <div className="call-script-label question">🟣 Discovery Question</div>
                  <div className="call-script-text">{result.callScript.question}</div>
                </div>
                <div className="call-script-section">
                  <div className="call-script-label objection">🟡 Objection Handler</div>
                  <div className="call-script-text">{result.callScript.objectionHandler}</div>
                </div>
              </ResultCard>
            )}

            {/* What NOT to Say */}
            {result.avoidThese && result.avoidThese.length > 0 && (
              <ResultCard
                title="What NOT to Say"
                icon="⚠"
                iconColor="amber"
                delay={600}
                variant="avoid"
              >
                <ul className="avoid-list">
                  {result.avoidThese.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="avoid-exclusive">
                  Prospect AI exclusive · Based on this prospect's communication style
                </div>
              </ResultCard>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Tool
