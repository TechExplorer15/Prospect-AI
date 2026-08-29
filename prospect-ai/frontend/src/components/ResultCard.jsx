import { useState } from 'react'

function ResultCard({ title, icon, iconColor, children, copyText, delay = 0, variant }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!copyText) return
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const isAvoid = variant === 'avoid'

  return (
    <div
      className={`result-card ${isAvoid ? 'avoid-card' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="result-card-header">
        <div className="result-card-title">
          <div className={`card-icon ${iconColor || ''}`}>{icon}</div>
          {title}
        </div>
        {copyText && (
          <button
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? 'Copied ✓' : '📋 Copy'}
          </button>
        )}
      </div>
      <div className="result-card-body">
        {children}
      </div>
    </div>
  )
}

export default ResultCard
