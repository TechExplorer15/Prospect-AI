import { useState } from 'react'

const GOALS = [
  { value: 'demo', icon: '🎯', label: 'Book Demo', desc: 'Get them to see your product' },
  { value: 'partnership', icon: '🤝', label: 'Partnership', desc: 'Peer-to-peer collaboration' },
  { value: 'recruiting', icon: '💼', label: 'Recruiting', desc: 'Attract top talent' },
  { value: 'general', icon: '👋', label: 'General', desc: 'Professional connection' }
]

function GoalSelector({ selected, onSelect }) {
  return (
    <div className="goal-selector">
      {GOALS.map((goal) => (
        <button
          key={goal.value}
          type="button"
          className={`goal-option ${selected === goal.value ? 'selected' : ''}`}
          onClick={() => onSelect(goal.value)}
        >
          <div className="goal-icon">{goal.icon}</div>
          <div className="goal-label">{goal.label}</div>
          <div className="goal-desc">{goal.desc}</div>
        </button>
      ))}
    </div>
  )
}

export default GoalSelector
