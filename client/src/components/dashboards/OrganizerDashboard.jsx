import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy,
  Ticket,
  Users,
  Calendar,
  Layers,
  CheckCircle2,
  Plus,
  Coins,
  QrCode,
  Shield,
  Video,
  Megaphone,
} from 'lucide-react'

export default function OrganizerDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  const [tournaments, setTournaments] = useState([
    {
      id: 'tour-1',
      title: 'Chennai Street Cup (Season 4)',
      teams: 16,
      stage: 'Semi Finals (2 Matches Today)',
      gateRevenue: '₹1,24,000',
      status: 'Live & Active',
    },
    {
      id: 'tour-2',
      title: 'South Zone Academy Super League',
      teams: 16,
      stage: 'Group Stages (Round 3)',
      gateRevenue: '₹90,000',
      status: 'Running',
    },
  ])

  return (
    <div className="sh-dashboard-layout">
      {/* Tournament Organizer Hero Banner */}
      <section className="sh-dash-hero-card sh-dash-hero-card--organizer">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(255, 145, 0, 0.2)', borderColor: '#ff9100' }}>
              <Trophy size={24} color="#ff9100" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{details.orgName || 'South Zone Cricket Federation'}</h2>
                <span className="sh-badge-chip" style={{ color: '#ff9100', borderColor: '#ff910055' }}>
                  SANCTIONED ORGANIZER
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Director: <strong>{user.nickname}</strong> • City: {user.city}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Active Cups: {details.activeTournaments || 2} • Prize Pool: {details.totalPrizePool || '₹5,00,000'}
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#ff910055' }}>
            <strong style={{ color: '#ff9100' }}>{details.gateTicketRevenue || '₹2.14L'}</strong>
            <span>GATE REVENUE</span>
          </div>
        </div>

        {/* Overview Bar */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#ff9100' }}>{details.registeredTeams || 32}</strong>
            <span>Teams Entered</span>
          </div>
          <div className="sh-stat-box">
            <strong>{details.matchesScheduled || 48}</strong>
            <span>Fixtures</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>8</strong>
            <span>Certified Officials</span>
          </div>
          <div className="sh-stat-box">
            <strong>100%</strong>
            <span>GST Verified</span>
          </div>
        </div>
      </section>

      {/* Quick Action Shortcuts (Allocated Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/matches')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,145,0,0.15)', color: '#ff9100' }}>
            <Trophy size={18} />
          </div>
          <span>Brackets</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/ticketing')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,229,255,0.15)', color: '#00e5ff' }}>
            <Ticket size={18} />
          </div>
          <span>Box Office</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/match-tools')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <Shield size={18} />
          </div>
          <span>Match Tools</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/epaper')}>
          <div className="sh-action-icon" style={{ background: 'rgba(124,77,255,0.15)', color: '#7c4dff' }}>
            <Newspaper size={18} />
          </div>
          <span>E-Paper News</span>
        </button>
      </div>

      {/* Tournaments Management (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Trophy size={18} color="#ff9100" />
            <h3 style={{ margin: 0, fontSize: 15 }}>My Active Tournaments</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/ticketing')}>
            + New League
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tournaments.map((t) => (
            <div
              key={t.id}
              style={{
                padding: 12,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,145,0,0.2)',
                borderRadius: 10,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: 14 }}>{t.title}</strong>
                <span className="pill" style={{ background: 'rgba(255,145,0,0.15)', color: '#ff9100', fontSize: 10 }}>
                  {t.status}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: 'var(--muted)' }}>
                <span>{t.teams} Registered Teams • {t.stage}</span>
                <strong style={{ color: '#00e676' }}>Gate: {t.gateRevenue}</strong>
              </div>

              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  style={{ flex: 1, fontSize: 11 }}
                  onClick={() => navigate('/app/ticketing')}
                >
                  Draw Brackets
                </button>
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  style={{ flex: 1, fontSize: 11 }}
                  onClick={() => navigate('/app/matches')}
                >
                  Assign Officials
                </button>
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  style={{ flex: 1, fontSize: 11, background: 'linear-gradient(135deg, #ff9100, #ff5722)' }}
                  onClick={() => navigate('/app/ticketing')}
                >
                  Sell Passes
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gate Ticketing & Box Office QR Scanner */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ticket size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Gate Passes & Box Office</h3>
          </div>
          <span className="pill" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
            QR VALIDATION ACTIVE
          </span>
        </header>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--line)', fontSize: 12 }}>
          <span>VIP Pavilion Tickets (₹499)</span>
          <strong style={{ color: '#00e676' }}>148 / 150 Sold (98%)</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--line)', fontSize: 12 }}>
          <span>General Admission (₹99)</span>
          <strong style={{ color: '#00e676' }}>820 / 1,000 Sold</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 12 }}>
          <span>Scanned Check-Ins at Turnstiles</span>
          <strong style={{ color: '#3de0ff' }}>542 Spectators Checked In</strong>
        </div>

        <button
          type="button"
          className="btn btn--secondary btn--sm"
          style={{ width: '100%', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          onClick={() => navigate('/app/ticketing')}
        >
          <QrCode size={14} /> Open Box Office Scanner Desk
        </button>
      </section>

      {/* Official Sports E-Paper Match Bulletins Allotment */}
      <section className="panel" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => navigate('/app/epaper')}>
        <header style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Newspaper size={17} color="#7c4dff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Official E-Paper Tournament Bulletin</h3>
          </div>
          <span className="text-link">Publish Scorecard →</span>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
          Send verified official scorecards and tournament press summaries directly to the daily sports e-paper.
        </p>
      </section>
    </div>
  )
}
