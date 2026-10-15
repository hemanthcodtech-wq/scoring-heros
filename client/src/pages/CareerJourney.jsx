import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy,
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  Calendar,
  Share2,
  Medal,
  Flame,
  Shield,
  Star,
  UserCheck,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'

export default function CareerJourney() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Tabs: 'stages' | 'feedback' | 'growth' | 'gallery' | 'portfolio'
  const [activeTab, setActiveTab] = useState('stages')

  // Stages matching 11.1
  const stageNodes = [
    { id: 'academy', label: 'ACADEMY', age: 'U14', active: true, color: '#3de0ff' },
    { id: 'u16', label: 'U16', age: 'Junior', active: true, color: '#3de0ff' },
    { id: 'u19', label: 'U19', age: 'Elite', active: true, color: '#3de0ff' },
    { id: 'state', label: 'STATE', age: 'Senior', active: true, color: '#3de0ff' },
    { id: 'pro', label: 'PRO', age: 'Super 11', active: false, current: true, color: '#e10613' },
  ]

  // Coach Feedback metrics matching 11.2 & 11.3
  const coachReview = [
    { title: 'Technique', rating: 4, max: 5 },
    { title: 'Fitness', rating: 5, max: 5 },
    { title: 'Teamwork', rating: 4, max: 5 },
    { title: 'Discipline', rating: 5, max: 5 },
  ]

  // Gallery Memories matching 11.5
  const matchGallery = [
    { title: 'DEBUT', sub: 'Saved memory', icon: '🏏', event: 'U14 Inter-District' },
    { title: 'FIRST 50', sub: 'Saved memory', icon: '⭐', event: 'Marina Oval 52*(29)' },
    { title: 'BEST SPELL', sub: 'Saved memory', icon: '🎯', event: '3/18 vs Kings' },
    { title: 'FINAL', sub: 'Saved memory', icon: '🏆', event: 'Trophy Final 2025' },
    { title: 'AWARD', sub: 'Saved memory', icon: '🥇', event: 'Player of Series' },
    { title: 'TEAM', sub: 'Saved memory', icon: '🛡️', event: 'Scoring Heroes Squad' },
  ]

  return (
    <Screen
      back
      title="Identity Journey"
      subtitle="Academy-to-Pro Career Portfolio"
      right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676', border: '1px solid #00e676', fontSize: 10 }}>
            PORTFOLIO READY
          </span>
        </div>
      }
    >
      <div className="career-journey-page">
        {/* Navigation Tabs */}
        <div className="journey-nav-tabs">
          <button
            type="button"
            className={`journey-tab ${activeTab === 'stages' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('stages')}
          >
            Stages
          </button>
          <button
            type="button"
            className={`journey-tab ${activeTab === 'feedback' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('feedback')}
          >
            Review
          </button>
          <button
            type="button"
            className={`journey-tab ${activeTab === 'gallery' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery
          </button>
          <button
            type="button"
            className={`journey-tab ${activeTab === 'portfolio' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
        </div>

        {/* 1. STAGES & TIMELINE PROGRESSION (Feature 11.1 & 11.4) */}
        {activeTab === 'stages' && (
          <div className="journey-stages-container">
            {/* Visual Node Path */}
            <div className="journey-node-timeline-card">
              <span className="journey-kicker">CAREER STAGE PROGRESSION</span>
              <div className="node-track-row">
                <div className="node-line-track" />
                {stageNodes.map((n) => (
                  <div key={n.id} className="stage-node-item">
                    <div
                      className={`stage-node-circle ${n.current ? 'is-current' : n.active ? 'is-completed' : ''}`}
                      style={{ borderColor: n.color }}
                    >
                      {n.active ? '✓' : '•'}
                    </div>
                    <span className="stage-node-label">{n.label}</span>
                  </div>
                ))}
              </div>

              {/* Summary 3 Metrics (Matches, Awards, Growth %) */}
              <div className="journey-three-stats">
                <div className="journey-stat-cell">
                  <strong>103</strong>
                  <span>MATCHES</span>
                </div>
                <div className="journey-stat-cell">
                  <strong style={{ color: '#ffd600' }}>8</strong>
                  <span>AWARDS</span>
                </div>
                <div className="journey-stat-cell">
                  <strong style={{ color: '#00e676' }}>88%</strong>
                  <span>GROWTH %</span>
                </div>
              </div>

              {/* Career Portfolio Ready Box */}
              <div className="portfolio-ready-badge-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CheckCircle2 size={18} color="#00e676" />
                  <strong>CAREER PORTFOLIO READY</strong>
                </div>
                <span className="verified-shield-tag">VERIFIED</span>
              </div>
            </div>

            {/* Role Identification System (Feature 11.9) */}
            <div className="panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Shield size={16} color="var(--cyan)" />
                  <h4 style={{ margin: 0, fontSize: 13 }}>Role Identification</h4>
                </div>
                <span className="pill" style={{ background: 'var(--red)', fontSize: 9 }}>TOP-ORDER BATSMAN</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
                AI Match engine classified primary strength: Top-order anchor with 154.2 strike rate in death overs.
              </p>
            </div>

            <button
              type="button"
              className="btn btn--primary btn--full"
              onClick={() => setActiveTab('portfolio')}
            >
              OPEN CAREER JOURNEY →
            </button>
          </div>
        )}

        {/* 2. COACH & DISCIPLINE REVIEW (Feature 11.2 & 11.3) */}
        {activeTab === 'feedback' && (
          <div className="journey-feedback-container">
            <div className="coach-review-box-card">
              <span className="review-box-kicker">BEHAVIOR & DISCIPLINE TRACKING</span>
              <h3 style={{ margin: '4px 0 14px', fontSize: 16 }}>COACH REVIEW</h3>

              <div className="review-rubric-list">
                {coachReview.map((item, idx) => (
                  <div key={idx} className="rubric-row">
                    <span className="rubric-title">{item.title}</span>
                    <div className="rubric-dots-track">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <span
                          key={dot}
                          className={`rubric-dot ${dot <= item.rating ? 'is-filled' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="coach-quote-bubble">
                <p>
                  "Strong progress. Improve front-foot balance against left-arm angle and keep the same academy discipline."
                </p>
                <span>— Head Coach Ramanujam (National High Performance)</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. MATCH GALLERY SYSTEM (Feature 11.5) */}
        {activeTab === 'gallery' && (
          <div className="journey-gallery-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h4 style={{ margin: 0, fontSize: 14 }}>Match Gallery Memories</h4>
              <span className="pill">6 Moments</span>
            </div>

            <div className="gallery-tiles-grid">
              {matchGallery.map((m, idx) => (
                <div key={idx} className="gallery-memory-tile">
                  <div className="memory-icon-wrap">{m.icon}</div>
                  <strong className="memory-title">{m.title}</strong>
                  <span className="memory-sub">{m.sub}</span>
                  <small className="memory-event">{m.event}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. CAREER PORTFOLIO SYSTEM (Feature 11.10) */}
        {activeTab === 'portfolio' && (
          <div className="journey-portfolio-container">
            <div className="portfolio-summary-dossier">
              <div className="dossier-hero">
                <img
                  src={user.avatarJersey ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'}
                  alt="Player Profile"
                  className="dossier-avatar"
                />
                <div>
                  <h3 style={{ margin: '0 0 2px', fontSize: 16 }}>{user.nickname}</h3>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)' }}>
                    {user.role} • {user.city} • Tamil Nadu Division 1
                  </p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                    <span className="pill" style={{ background: 'var(--red)', fontSize: 9 }}>#{user.avatarJersey?.num || '7'}</span>
                    <span className="pill" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff', border: '1px solid #3de0ff', fontSize: 9 }}>
                      AUCTION CLEARED
                    </span>
                  </div>
                </div>
              </div>

              <div className="dossier-metrics-strip">
                <div>
                  <span>Total Runs</span>
                  <strong>1,420</strong>
                </div>
                <div>
                  <span>Strike Rate</span>
                  <strong>146.8</strong>
                </div>
                <div>
                  <span>Wickets</span>
                  <strong>18</strong>
                </div>
                <div>
                  <span>Trust Score</span>
                  <strong style={{ color: 'var(--cyan)' }}>94%</strong>
                </div>
              </div>

              <div className="dossier-teams-history">
                <span className="section-small-title">ACADEMY & TEAM HISTORY</span>
                <div className="teams-chip-wrap">
                  <span className="team-chip">Scoring Heroes Academy (2024-26)</span>
                  <span className="team-chip">Tamil Nadu U19 (2025)</span>
                  <span className="team-chip">Marina Turf Club (2026)</span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn--outline btn--full"
                onClick={() => navigate('/app/community')}
                style={{ marginTop: 8 }}
              >
                <Share2 size={16} /> Share Digital Resume to Franchises
              </button>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
