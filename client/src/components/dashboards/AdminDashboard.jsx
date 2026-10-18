import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  XCircle,
  FileText,
  AlertTriangle,
  Users,
  Award,
  Newspaper,
  Layers,
  Activity,
  Server,
  Building,
} from 'lucide-react'

export default function AdminDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  // Approval queue
  const [approvals, setApprovals] = useState([
    { id: 'app-1', type: 'Seller KYC', applicant: 'ProStrike Willow Crafts (GST Reg)', date: 'Today', status: 'Pending Review' },
    { id: 'app-2', type: 'Academy Affiliation', applicant: 'Champions Cricket Hub (Coimbatore)', date: 'Yesterday', status: 'Pending Review' },
    { id: 'app-3', type: 'Official Scorer License', applicant: 'K. Ramesh (District Certified)', date: '2 days ago', status: 'Pending Review' },
  ])

  // Fraud detection alerts
  const [fraudAlerts, setFraudAlerts] = useState([
    { id: 'f-1', severity: 'High', msg: 'Rapid scoring spike: 36 runs in 1 over flagged for manual review', match: 'Match #18 (Local Turf Cup)' },
    { id: 'f-2', severity: 'Medium', msg: 'Auction bidding pattern: 2 paddles bidding from identical IP subnet', match: 'Lot #14 Coastal Auctions' },
  ])

  const [actionFeedback, setActionFeedback] = useState(null)

  function handleAction(id, decision) {
    setApprovals((prev) => prev.filter((a) => a.id !== id))
    setActionFeedback(`Application ${id} successfully marked as ${decision}.`)
    setTimeout(() => setActionFeedback(null), 3000)
  }

  function resolveAlert(id) {
    setFraudAlerts((prev) => prev.filter((f) => f.id !== id))
    setActionFeedback(`Integrity alert ${id} resolved and archived.`)
    setTimeout(() => setActionFeedback(null), 3000)
  }

  return (
    <div className="sh-dashboard-layout">
      {/* Super Admin Hero Card */}
      <section className="sh-dash-hero-card sh-dash-hero-card--admin">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(255, 23, 68, 0.2)', borderColor: '#ff1744' }}>
              <ShieldAlert size={24} color="#ff1744" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{user.nickname}</h2>
                <span className="sh-badge-chip" style={{ color: '#ff1744', borderColor: '#ff174455' }}>
                  PLATFORM SUPER ADMIN
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Governance: <strong>{details.department || 'Platform Integrity & Anti-Fraud Desk'}</strong>
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Control Center: Universal Sports OS • Status: <strong>{details.activeServers || 'All Systems Operational (99.98%)'}</strong>
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#ff174455' }}>
            <strong style={{ color: '#ff1744' }}>{approvals.length}</strong>
            <span>PENDING QUEUE</span>
          </div>
        </div>

        {/* Admin Metric Highlights */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#ff1744' }}>{fraudAlerts.length}</strong>
            <span>Fraud Alerts</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>240</strong>
            <span>Umpires & Scorers</span>
          </div>
          <div className="sh-stat-box">
            <strong>38</strong>
            <span>Sports Journalists</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#3de0ff' }}>Ready</strong>
            <span>E-Paper Bureau</span>
          </div>
        </div>
      </section>

      {actionFeedback && (
        <div style={{ padding: '8px 12px', background: 'rgba(0,230,118,0.15)', color: '#00e676', borderRadius: 10, border: '1px solid rgba(0,230,118,0.3)', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>
          ✓ {actionFeedback}
        </div>
      )}

      {/* Quick Action Shortcuts (Allocated Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/admin')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,23,68,0.15)', color: '#ff1744' }}>
            <ShieldAlert size={18} />
          </div>
          <span>Approvals</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/admin')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,145,0,0.15)', color: '#ff9100' }}>
            <AlertTriangle size={18} />
          </div>
          <span>Fraud Radar</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/epaper')}>
          <div className="sh-action-icon" style={{ background: 'rgba(124,77,255,0.15)', color: '#7c4dff' }}>
            <Newspaper size={18} />
          </div>
          <span>E-Paper Desk</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/partners')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <Users size={18} />
          </div>
          <span>Registry</span>
        </button>
      </div>

      {/* Approval Workflows (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={18} color="#00e676" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Platform Approval Workflows</h3>
          </div>
          <span className="pill" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
            {approvals.length} Pending
          </span>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {approvals.length > 0 ? (
            approvals.map((app) => (
              <div
                key={app.id}
                style={{
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="pill" style={{ fontSize: 9, background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
                      {app.type}
                    </span>
                    <strong style={{ display: 'block', fontSize: 13, marginTop: 4 }}>{app.applicant}</strong>
                    <small style={{ color: 'var(--muted)', fontSize: 11 }}>Submitted {app.date}</small>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      className="btn btn--secondary btn--sm"
                      style={{ padding: '4px 8px', fontSize: 11, color: '#ff2d3a' }}
                      onClick={() => handleAction(app.id, 'Rejected')}
                    >
                      <XCircle size={13} />
                    </button>
                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      style={{ padding: '4px 10px', fontSize: 11, background: '#00e676', color: '#020617', fontWeight: 'bold' }}
                      onClick={() => handleAction(app.id, 'Approved')}
                    >
                      <CheckCircle size={13} /> Approve
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--muted)', fontSize: 12 }}>
              ✓ All applicant approvals cleared!
            </div>
          )}
        </div>
      </section>

      {/* Fraud Detection & Trust Shield (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px', border: '1px solid rgba(255,23,68,0.3)' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertTriangle size={18} color="#ff1744" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Fraud Detection & Trust Shield</h3>
          </div>
          <span className="pill" style={{ background: 'rgba(255,23,68,0.2)', color: '#ff1744' }}>
            ACTIVE SCAN
          </span>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {fraudAlerts.length > 0 ? (
            fraudAlerts.map((fa) => (
              <div
                key={fa.id}
                style={{
                  padding: 10,
                  background: 'rgba(255,23,68,0.06)',
                  border: '1px solid rgba(255,23,68,0.25)',
                  borderRadius: 8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="pill" style={{ background: '#ff1744', color: '#fff', fontSize: 9 }}>
                      {fa.severity} Priority
                    </span>
                    <p style={{ margin: '4px 0 2px', fontSize: 12, color: '#f4f7ff', fontWeight: 'bold' }}>{fa.msg}</p>
                    <small style={{ color: 'var(--muted)', fontSize: 10 }}>Context: {fa.match}</small>
                  </div>

                  <button
                    type="button"
                    className="btn btn--secondary btn--sm"
                    style={{ fontSize: 11, width: 'auto' }}
                    onClick={() => resolveAlert(fa.id)}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '10px 0', color: '#00e676', fontSize: 12 }}>
              ✓ Zero fraud flags detected across platform nodes.
            </div>
          )}
        </div>
      </section>

      {/* Officials Registry: Scorers, Umpires & Journalists */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Officials Registry & Accreditation</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/admin')}>
            Directory →
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
            <span>Certified Live Scorers (App Trained)</span>
            <strong style={{ color: '#00e676' }}>142 Active</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
            <span>Field Umpires (Level 1 / 2)</span>
            <strong style={{ color: '#3de0ff' }}>98 Licensed</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            <span>Accredited Sports Journalists (E-Paper)</span>
            <strong style={{ color: '#ffc83d' }}>38 Verified</strong>
          </div>
        </div>
      </section>

      {/* Sports E-Paper Publishing Bureau Allotment */}
      <section className="panel" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => navigate('/app/epaper')}>
        <header style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Newspaper size={17} color="#7c4dff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Sports E-Paper Editorial Bureau</h3>
          </div>
          <span className="text-link">Review draft →</span>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
          Super Admin editorial desk: Review journalist submissions, auto-generate infographics from live scorecards, and sign off for digital printing.
        </p>
      </section>
    </div>
  )
}
