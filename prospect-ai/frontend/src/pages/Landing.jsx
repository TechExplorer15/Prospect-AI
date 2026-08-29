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
      <section style={{ padding: '0 24px 100px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '40px' }}>
          Three steps. Thirty seconds.
        </h2>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { num: '01', label: 'Paste Profile', desc: 'Copy any LinkedIn About, headline, or post' },
            { num: '02', label: 'Pick Your Goal', desc: 'Demo, partnership, recruiting, or general' },
            { num: '03', label: 'Get Results', desc: 'Personalised outreach ready to send' }
          ].map((step) => (
            <div key={step.num} style={{
              flex: '1 1 200px',
              maxWidth: '240px',
              textAlign: 'center'
            }}>
              <div style={{
                fontFamily: 'var(--mono)',
                fontSize: '32px',
                fontWeight: 800,
                background: 'linear-gradient(135deg, var(--blue), var(--violet))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px'
              }}>{step.num}</div>
              <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '6px' }}>{step.label}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-sub)' }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ─────────────────────────────── */}
      <section style={{
        padding: '60px 24px 80px',
        textAlign: 'center',
        borderTop: '1px solid var(--border)'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
          Ready to write outreach that gets replies?
        </h2>
        <p style={{ color: 'var(--text-sub)', fontSize: '15px', marginBottom: '28px' }}>
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
