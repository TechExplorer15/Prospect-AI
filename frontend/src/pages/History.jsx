import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function History() {
  const [history, setHistory] = useState([])
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('prospect-ai-history') || '[]')
    setHistory(stored)
  }, [])

  const handleClear = () => {
    if (window.confirm('Clear all history? This cannot be undone.')) {
      localStorage.removeItem('prospect-ai-history')
      setHistory([])
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const goalLabels = {
    demo: '🎯 Demo',
    partnership: '🤝 Partnership',
    recruiting: '💼 Recruiting',
    general: '👋 General'
  }

  return (
    <div className="page-padded">
      <div className="history-header">
        <h1>Generation History</h1>
        {history.length > 0 && (
          <button className="clear-btn" onClick={handleClear}>
            🗑 Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No history yet</h3>
          <p>
            Your outreach generations will appear here. History is stored 
            locally in your browser and persists across refreshes.
          </p>
          <Link to="/tool" className="landing-cta mt-24" style={{ fontSize: '14px', padding: '12px 24px' }}>
            Generate Your First Outreach
          </Link>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((item, index) => (
            <div
              key={index}
              className="history-item"
              onClick={() => setExpandedId(expandedId === index ? null : index)}
            >
              <div className="history-item-header">
                <span className="history-item-name">
                  {item.prospectName || 'Unknown Prospect'}
                </span>
                <span className="history-item-time">
                  {formatTime(item.timestamp || item.generatedAt)}
                </span>
              </div>
              <div className="history-item-meta">
                <span className="history-item-tag">
                  {goalLabels[item.goalType] || item.goalType}
                </span>
                <span>{item.prospectCompany || 'Unknown Company'}</span>
                <span>Score: {item.personalisationScore}/10</span>
              </div>

              {expandedId === index && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  {item.connectionRequest && (
                    <div className="content-block" style={{ marginBottom: '12px' }}>
                      <div className="label">Connection Request</div>
                      <p style={{ fontSize: '14px', color: 'var(--text)' }}>{item.connectionRequest}</p>
                    </div>
                  )}
                  {item.emailSubject && (
                    <div className="content-block" style={{ marginBottom: '12px' }}>
                      <div className="label">Email</div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{item.emailSubject}</p>
                      <p style={{ fontSize: '13px', color: 'var(--text-sub)' }}>{item.emailBody}</p>
                    </div>
                  )}
                  {item.keyInsights && item.keyInsights.length > 0 && (
                    <div className="content-block">
                      <div className="label">Key Insights</div>
                      <ul className="insights-list">
                        {item.keyInsights.map((insight, i) => (
                          <li key={i}>{insight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default History
