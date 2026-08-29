import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="page-padded">
      <div className="about-content">
        <h1>About Prospect AI</h1>
        <p className="about-lead">
          AI-powered outreach generation that analyses real signals from 
          prospect profiles — not templates. Write connection requests, 
          emails, and call scripts that actually get replies.
        </p>

        <div className="about-section">
          <h2>Why Prospect AI?</h2>
          <p>
            Most sales outreach fails because it's generic. "I came across 
            your profile" and "I'd love to connect" are ignored by 97% of 
            prospects. They can smell a template from a mile away.
          </p>
          <p>
            Prospect AI takes a fundamentally different approach. Instead of 
            filling in blanks in a template, it deeply analyses the 
            prospect's profile to find specific signals — job changes, 
            company stage, communication patterns, and likely pain points — 
            then generates outreach that references those signals naturally.
          </p>
        </div>

        <div className="about-section">
          <h2>How It Works</h2>
          <div className="about-grid">
            <div className="about-stat">
              <div className="stat-value">01</div>
              <div className="stat-label">Paste a prospect's LinkedIn profile</div>
            </div>
            <div className="about-stat">
              <div className="stat-value">02</div>
              <div className="stat-label">Choose your outreach goal</div>
            </div>
            <div className="about-stat">
              <div className="stat-value">03</div>
              <div className="stat-label">AI analyses real signals</div>
            </div>
            <div className="about-stat">
              <div className="stat-value">04</div>
              <div className="stat-label">Get personalised multi-channel copy</div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>What You Get</h2>
          <p>
            Every generation includes a personalised connection request 
            (under 280 characters), a cold email with specific subject line, 
            a complete call script with opener, bridge, discovery question, 
            and objection handler — plus a unique "What NOT to Say" section 
            that tells you exactly what to avoid with each prospect.
          </p>
        </div>

        <div className="about-section">
          <h2>The "What NOT to Say" Edge</h2>
          <p>
            This is what makes Prospect AI different. Based on each 
            prospect's communication style and role, we tell you what 
            phrases, approaches, and tactics to avoid — and exactly why. 
            Knowing what NOT to say is often more valuable than knowing 
            what to say.
          </p>
        </div>

        <div className="about-section">
          <h2>Built For</h2>
          <p>
            SDRs, AEs, founders doing outbound, recruiters, agency owners, 
            and anyone who needs to write personalised outreach at scale 
            without sounding like a robot.
          </p>
        </div>

        <div style={{ 
          marginTop: '48px', 
          paddingTop: '32px', 
          borderTop: '1px solid var(--border)', 
          textAlign: 'center' 
        }}>
          <Link to="/tool" className="landing-cta" style={{ fontSize: '14px', padding: '12px 24px' }}>
            ⚡ Try Prospect AI — Free
          </Link>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '12px' }}>
            20 free generations per hour · No signup required
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
