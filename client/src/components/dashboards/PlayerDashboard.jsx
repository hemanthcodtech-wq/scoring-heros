import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GiCricketBat } from 'react-icons/gi'
import {
  BarChart3,
  Video,
  Radio,
  Play,
  Film,
  Trophy,
  ArrowRight,
  Sparkles,
  Shirt,
  Calendar,
  Activity,
  Flame,
  Award,
  Milestone,
  ShoppingBag,
  Shield,
  ShieldCheck,
  Lock,
  Fingerprint,
  CheckCircle2,
  Check,
  MessageSquare,
  GraduationCap,
} from 'lucide-react'
import { career, liveMatch, super11 } from '../../data/demo'
import { HIGHLIGHT_CLIPS } from '../../data/highlightsData'

export default function PlayerDashboard({ user }) {
  const navigate = useNavigate()
  const roleDetails = user?.roleDetails || {}

  const [selectedFormat, setSelectedFormat] = useState('t20') // 't20' | 'odi' | 'nets'
  const [drills, setDrills] = useState([
    { id: 1, name: 'Bat Swing Speed Drill', target: '132 km/h', current: '128 km/h', pct: 94, done: true },
    { id: 2, name: 'Yorker Defense & Footwork', target: 'Zero Dismissals', current: 'Coach Approved', pct: 88, done: false },
    { id: 3, name: 'Boundary Power Clearance', target: '8 of 10 Cleared', current: '7 Cleared', pct: 82, done: false },
  ])
  const [drillSuccess, setDrillSuccess] = useState(false)

  // Format stats mapping
  const formatStats = {
    t20: { runs: career.runs, avg: career.avg, wickets: career.wickets, sr: career.sr, highest: career.highest },
    odi: { runs: 840, avg: 42.0, wickets: 24, sr: 94.6, highest: '98*' },
    nets: { runs: 1420, avg: 56.4, wickets: 45, sr: 168.2, highest: '112*' },
  }

  const currentStats = formatStats[selectedFormat] || formatStats.t20

  function toggleDrill(id) {
    setDrills((prev) =>
      prev.map((d) => (d.id === id ? { ...d, done: !d.done } : d))
    )
    setDrillSuccess(true)
    setTimeout(() => setDrillSuccess(false), 2000)
  }

  return (
    <div className="sh-dashboard-layout">
      {/* Player Identity Card */}
      <section className="sh-dash-hero-card sh-dash-hero-card--player">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box" onClick={() => navigate('/app/avatar')} role="button" tabIndex={0}>
            <div className="sh-avatar-hex">
              <svg viewBox="0 0 40 40" width="36" height="36" fill="none">
                <circle cx="20" cy="11" r="5" stroke="#3de0ff" strokeWidth="1.8" fill="rgba(61,224,255,0.2)" />
                <path d="M12 28c0-5 3.5-7.5 8-7.5s8 2.5 8 7.5" stroke="#e10613" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="sh-avatar-num-badge">3D</span>
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{user.nickname}</h2>
                <span
                  className="sh-badge-chip"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/app/aadhaar')
                  }}
                  style={{ cursor: 'pointer' }}
                  title="View Aadhaar & Athlete Verification"
                >
                  <ShieldCheck size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: 3 }} />
                  ATHLETE VERIFIED
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                {roleDetails.role || 'All-rounder'} • {roleDetails.battingStyle || 'Right Hand Bat'} • {user.city}
              </p>
              <small className="sh-academy-pill">
                <GraduationCap size={13} color="#3de0ff" style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} />
                {roleDetails.academyName || 'Marina Titans Academy'} ({roleDetails.stage || 'U19 Academy Pro'})
              </small>
            </div>
          </div>

          <div
            className="sh-dash-stat-pill"
            onClick={() => navigate('/app/aadhaar')}
            role="button"
            tabIndex={0}
            title="View Internal Trust Score"
            style={{ cursor: 'pointer' }}
          >
            <strong>{user.trust || 94}</strong>
            <span>TRUST SCORE</span>
          </div>
        </div>

        {/* Format Selector Pills */}
        <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
          {[
            { id: 't20', label: 'T20 Pro League' },
            { id: 'odi', label: '50-Over Cup' },
            { id: 'nets', label: 'Academy Nets' },
          ].map((fmt) => (
            <button
              key={fmt.id}
              type="button"
              className={`pill ${selectedFormat === fmt.id ? 'is-active' : ''}`}
              style={{
                fontSize: 10,
                padding: '4px 10px',
                cursor: 'pointer',
                background: selectedFormat === fmt.id ? '#3de0ff' : 'rgba(255,255,255,0.06)',
                color: selectedFormat === fmt.id ? '#020617' : '#9aa8c7',
                fontWeight: selectedFormat === fmt.id ? 'bold' : 'normal',
                border: 'none',
              }}
              onClick={() => setSelectedFormat(fmt.id)}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {/* Quick Career Stats Grid (Dynamic per format) */}
        <div className="sh-player-stats-bar">
          <div className="sh-stat-box">
            <strong>{currentStats.runs}</strong>
            <span>Runs</span>
          </div>
          <div className="sh-stat-box">
            <strong>{currentStats.avg}</strong>
            <span>Bat Avg</span>
          </div>
          <div className="sh-stat-box">
            <strong>{currentStats.wickets}</strong>
            <span>Wickets</span>
          </div>
          <div className="sh-stat-box">
            <strong>{currentStats.sr}</strong>
            <span>Strike Rate</span>
          </div>
          <div className="sh-stat-box">
            <strong>{currentStats.highest}</strong>
            <span>Top Score</span>
          </div>
        </div>
      </section>

      {/* Quick Action Shortcuts for Player (Allotted Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/scorer')}>
          <div className="sh-action-icon" style={{ background: 'rgba(225,6,19,0.15)', color: '#ff2d3a' }}>
            <Activity size={18} />
          </div>
          <span>Live Scorer</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/avatar')}>
          <div className="sh-action-icon" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
            <Shirt size={18} />
          </div>
          <span>3D Avatar</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/stats')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
            <Award size={18} />
          </div>
          <span>Career Stats</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/journey')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <Milestone size={18} />
          </div>
          <span>Journey Path</span>
        </button>
      </div>

      {/* Live Match Card with AI Commentary & Highlights */}
      <section className="live-card" onClick={() => navigate('/app/scorer')} role="button" tabIndex={0}>
        <div className="live-card__meta">
          <span className="pill">MY MATCH</span>
          <span>{liveMatch.format} • Over {liveMatch.over}/{liveMatch.maxOvers}</span>
        </div>
        <div className="live-card__score">
          <div>
            <small>{liveMatch.batting}</small>
            <strong>{liveMatch.score}</strong>
          </div>
          <span>vs</span>
          <div>
            <small>{liveMatch.bowling}</small>
            <strong>yet to bat</strong>
          </div>
        </div>
        <p>CRR {liveMatch.crr} • {liveMatch.striker.name} {liveMatch.striker.runs}*(18) at crease</p>

        <div className="live-card-quick-actions">
          <button
            type="button"
            className="live-action-pill"
            onClick={(e) => {
              e.stopPropagation()
              navigate('/app/highlights')
            }}
          >
            <Video size={13} color="var(--red-2)" /> Video Highlights
          </button>
          <button
            type="button"
            className="live-action-pill live-action-pill--cyan"
            onClick={(e) => {
              e.stopPropagation()
              navigate('/app/commentary')
            }}
          >
            <Radio size={13} color="#3de0ff" /> AI Commentary
          </button>
        </div>
      </section>

      {/* Feature 03: Aadhaar + Trust Foundation Shield */}
      <section className="panel sh-dash-aadhaar-preview-panel" onClick={() => navigate('/app/aadhaar')} style={{ cursor: 'pointer' }}>
        <div className="sh-dash-aadhaar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="sh-shield-icon-badge">
              <ShieldCheck size={20} color="#00e676" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h3 style={{ margin: 0, fontSize: 15 }}>Aadhaar & Trust Foundation</h3>
                <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontSize: 10, padding: '2px 8px' }}>
                  FEATURE 03
                </span>
              </div>
              <small style={{ color: '#9aa8c7', fontSize: 11 }}>
                Backend-only UIDAI identity validation • Zero fake accounts
              </small>
            </div>
          </div>
          <span className="text-link" style={{ fontSize: 12 }}>Open System →</span>
        </div>

        <div className="sh-dash-aadhaar-grid">
          <div className="sh-dash-aadhaar-box">
            <span className="sh-dash-label">AADHAAR TOKEN</span>
            <strong className="sh-dash-val">{user?.aadhaarMasked || 'XXXX-XXXX-9012'}</strong>
            <small style={{ color: '#00e676' }}>✓ Verified Vault</small>
          </div>
          <div className="sh-dash-aadhaar-box">
            <span className="sh-dash-label">FRAUD RADAR</span>
            <strong className="sh-dash-val" style={{ color: '#00e676' }}>0 Risks</strong>
            <small style={{ color: '#3de0ff' }}>2 Threats Blocked</small>
          </div>
          <div className="sh-dash-aadhaar-box">
            <span className="sh-dash-label">INTERNAL TRUST</span>
            <strong className="sh-dash-val" style={{ color: '#00e676' }}>{user?.trust || 94} / 100</strong>
            <small style={{ color: '#ffd600' }}>High Reliability</small>
          </div>
        </div>

        <div className="sh-dash-aadhaar-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Lock size={12} color="#ffd600" />
            <span style={{ fontSize: 11, color: '#9aa8c7' }}>
              Private data (phone, email, UID) hidden from public view.
            </span>
          </div>
          <span className="pill" style={{ background: 'rgba(61,224,255,0.12)', color: '#3de0ff', fontSize: 10 }}>
            PRIVACY LAYER ACTIVE
          </span>
        </div>
      </section>

      {/* Career Journey & Milestones Progress */}
      <section className="panel" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => navigate('/app/journey')}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Milestone size={17} color="#00e676" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Career Journey Progression</h3>
          </div>
          <span className="text-link">Full timeline →</span>
        </header>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>Current Stage: <strong style={{ color: '#f4f7ff' }}>U19 State Academy League</strong></span>
          <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', fontSize: 10 }}>STAGE 3 OF 5</span>
        </div>
        <div className="sh-progress-track">
          <div className="sh-progress-fill" style={{ width: '68%', background: 'linear-gradient(90deg, #3de0ff, #00e676)' }} />
        </div>
        <small style={{ display: 'block', marginTop: 6, fontSize: 11, color: '#9aa8c7' }}>
          Next Goal: 200 runs or 10 wickets to unlock State Senior Trials selection radar.
        </small>
      </section>

      {/* Academy Training & Interactive Drills Tracker */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Flame size={17} color="#ff2d3a" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Academy Training & Daily Drills</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/academy')}>
            View schedule →
          </button>
        </header>

        <div className="sh-drill-progress-card">
          {drills.map((drill) => (
            <div key={drill.id} style={{ marginBottom: 12 }}>
              <div className="sh-drill-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: 13, textDecoration: drill.done ? 'line-through' : 'none', color: drill.done ? '#9aa8c7' : '#f4f7ff' }}>
                    {drill.name}
                  </strong>
                  <small style={{ display: 'block', fontSize: 11, color: 'var(--muted)' }}>
                    Target: {drill.target} • {drill.current}
                  </small>
                </div>
                <button
                  type="button"
                  onClick={() => toggleDrill(drill.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 8,
                    fontSize: 11,
                    border: 'none',
                    background: drill.done ? '#00e676' : 'rgba(255,255,255,0.08)',
                    color: drill.done ? '#020617' : '#f4f7ff',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {drill.done ? <Check size={12} /> : null}
                  {drill.done ? 'COMPLETED' : 'MARK DONE'}
                </button>
              </div>
              <div className="sh-progress-track" style={{ marginTop: 6 }}>
                <div
                  className="sh-progress-fill"
                  style={{
                    width: `${drill.pct}%`,
                    background: drill.done ? '#00e676' : 'linear-gradient(90deg, #3de0ff, #00e676)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {drillSuccess && (
          <div style={{ padding: 6, background: 'rgba(0,230,118,0.15)', color: '#00e676', borderRadius: 8, fontSize: 11, textAlign: 'center' }}>
            ✓ Drill progress saved to your Athlete Training Diary!
          </div>
        )}
      </section>

      {/* Pro Gear Marketplace Allotment */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShoppingBag size={17} color="#ffc83d" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Athlete Pro Gear Store</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/marketplace')}>
            Full Store →
          </button>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
          Exclusive 15% athlete discount on English Willow bats, turf spikes, and custom team kits.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="btn btn--secondary btn--sm" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={() => navigate('/app/marketplace')}>
            <GiCricketBat size={14} color="#3de0ff" /> Willow Bats
          </button>
          <button type="button" className="btn btn--secondary btn--sm" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={() => navigate('/app/marketplace')}>
            <Shield size={14} color="#00e676" /> Pads & Gloves
          </button>
          <button type="button" className="btn btn--secondary btn--sm" style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }} onClick={() => navigate('/app/avatar/jersey')}>
            <Shirt size={14} color="#ffc83d" /> My Jersey
          </button>
        </div>
      </section>

      {/* Press & Media Interview Room Allotment */}
      <section className="panel" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => navigate('/app/interview')}>
        <header style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <MessageSquare size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Post-Match Media & Press Q&A</h3>
          </div>
          <span className="text-link">Start Q&A →</span>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
          Answer AI journalist press questions after your matches and build your Athlete Public Profile.
        </p>
      </section>
    </div>
  )
}
