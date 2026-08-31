import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="landing">
      {/* ── Landing Navbar ──────────────────────────── */}
      <nav className="landing-nav">
        <div className="navbar-logo">
          <div className="logo-icon">⚡</div>
          Prospect AI
        </div>
        <Link to="/tool" className="landing-nav-cta">
          Open Tool →
        </Link>
      </nav>

      {/* ── Hero Section ───────────────────────────── */}
      <section className="landing-hero">
        <div className="landing-badge">
          <span className="badge-dot" />
          AI-Powered Outreach Generation
        </div>

        <h1>
          Stop writing<br />
          <span className="gradient-text">generic outreach</span>
        </h1>

        <p className="hero-sub">
          Paste a LinkedIn profile. Get personalised connection requests,
          emails, and call scripts that actually get replies — powered by
          AI that analyses real signals, not templates.
        </p>

        <Link to="/tool" className="landing-cta">
          ⚡ Generate Outreach — Free
        </Link>
      </section>

      {/* ── Features ───────────────────────────────── */}
      <section className="landing-features">
        <div className="feature-card">
          <div className="feature-icon" style={{ background: 'var(--blue-dim)' }}>🔍</div>
          <h3>Deep Profile Analysis</h3>
          <p>
            Extracts job changes, company stage, communication style, and 
            likely pain points from the profile text you paste.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" style={{ background: 'var(--violet-dim)' }}>✍️</div>
          <h3>Multi-Channel Copy</h3>
          <p>
            Get a connection request, cold email, and call script — all 
            personalised to the same prospect in one click.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon" style={{ background: 'var(--amber-dim)' }}>⚠️</div>
          <h3>What NOT to Say</h3>
          <p>
            Unique to Prospect AI — tells you exactly what to avoid with 
            each prospect and why, based on their communication style.
          </p>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────── */}
      <section className="landing-steps">
        <h2 className="landing-steps-title">
          Three steps. Thirty seconds.
        </h2>
        <div className="landing-steps-grid">
          {[
            { num: '01', label: 'Paste Profile', desc: 'Copy any LinkedIn About, headline, or post' },
            { num: '02', label: 'Pick Your Goal', desc: 'Demo, partnership, recruiting, or general' },
            { num: '03', label: 'Get Results', desc: 'Personalised outreach ready to send' }
          ].map((step) => (
            <div key={step.num} className="landing-step-item">
              <div className="landing-step-num">{step.num}</div>
              <div className="landing-step-label">{step.label}</div>
              <div className="landing-step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ─────────────────────────────── */}
      <section className="landing-footer">
        <h2 className="landing-footer-title">
          Ready to write outreach that gets replies?
        </h2>
        <p className="landing-footer-desc">
          20 free generations per hour. No signup required.
        </p>
        <Link to="/tool" className="landing-cta">
          Start Generating →
        </Link>
      </section>
    </div>
  )
}

export default Landing
