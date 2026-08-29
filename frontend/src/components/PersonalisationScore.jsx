function PersonalisationScore({ score, reason }) {
  const circumference = 2 * Math.PI * 22
  const offset = circumference - (score / 10) * circumference

  const getColor = (score) => {
    if (score >= 7) return 'var(--green)'
    if (score >= 4) return 'var(--amber)'
    return 'var(--red)'
  }

  const color = getColor(score)

  return (
    <div className="score-container">
      <div className="score-ring">
        <svg viewBox="0 0 48 48">
          <circle className="ring-bg" cx="24" cy="24" r="22" />
          <circle
            className="ring-fill"
            cx="24"
            cy="24"
            r="22"
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="score-value" style={{ color }}>
          {score}
        </div>
      </div>
      <div className="score-info">
        <div className="score-label">Personalisation Score</div>
        <div className="score-reason">{reason}</div>
      </div>
    </div>
  )
}

export default PersonalisationScore
