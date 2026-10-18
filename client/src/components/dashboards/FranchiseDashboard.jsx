import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Gavel,
  Users,
  Coins,
  Shield,
  TrendingUp,
  Plus,
  ArrowRight,
  Flame,
  CheckCircle2,
  Bot,
  Video,
  Shirt,
  MessageSquare,
  Send,
  Zap,
} from 'lucide-react'

export default function FranchiseDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  const [currentBid, setCurrentBid] = useState(420000)
  const [biddingSuccess, setBiddingSuccess] = useState(false)
  const [soldStatus, setSoldStatus] = useState(false)
  const [simRunning, setSimRunning] = useState(false)
  const [simResult, setSimResult] = useState(null)
  const [pressNote, setPressNote] = useState('')
  const [pressSent, setPressSent] = useState(false)

  const roster = [
    { name: 'Rohit Sharma', role: 'Top Order Bat', fee: '₹5,20,000', origin: 'State Icon' },
    { name: 'Marcus Bennett', role: 'Fast Bowler', fee: '₹4,80,000', origin: 'Overseas (AUS)' },
    { name: 'Kavya Raman', role: 'Pace All-Rounder', fee: '₹3,50,000', origin: 'Academy Pick' },
  ]

  function placeBid(increment) {
    if (soldStatus) return
    setCurrentBid((b) => b + increment)
    setBiddingSuccess(true)
    setTimeout(() => setBiddingSuccess(false), 2000)
  }

  function handleHammer() {
    setSoldStatus(true)
  }

  function runSimulation() {
    setSimRunning(true)
    setTimeout(() => {
      setSimRunning(false)
      setSimResult({
        winProb: 76,
        favoredTactic: 'Bowl first under 800-Lux floodlights; exploit swing in overs 1-6',
        projectedTotal: '178/6',
      })
    }, 900)
  }

  function handleSendPress(e) {
    e.preventDefault()
    if (!pressNote.trim()) return
    setPressSent(true)
    setTimeout(() => {
      setPressNote('')
      setPressSent(false)
    }, 2500)
  }

  return (
    <div className="sh-dashboard-layout">
      {/* Franchise Owner Hero Banner */}
      <section className="sh-dash-hero-card sh-dash-hero-card--franchise">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(255, 87, 34, 0.2)', borderColor: '#ff5722' }}>
              <Gavel size={24} color="#ff5722" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{details.franchiseName || 'Coastal Kings XI'}</h2>
                <span className="sh-badge-chip" style={{ color: '#ff5722', borderColor: '#ff572255' }}>
                  {details.paddleNumber || 'PADDLE #04'}
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Owner: <strong>{user.nickname}</strong> • {details.leagueName || 'Premier Champions Cup'}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Headquarters: {user.city} • Verified Franchise Franchisee
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#ff572255' }}>
            <strong style={{ color: '#ff5722' }}>{details.remainingPurse || '₹15.8L'}</strong>
            <span>PURSE LEFT</span>
          </div>
        </div>

        {/* Purse Budget Breakdown Bar */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
            <span>Allocated: {details.allocatedPurse || '₹50,00,000'}</span>
            <span style={{ color: '#ff5722' }}>Spent: {details.spentPurse || '₹34,20,000'} (68.4%)</span>
          </div>
          <div className="sh-progress-track">
            <div className="sh-progress-fill" style={{ width: '68.4%', background: 'linear-gradient(90deg, #ff9100, #ff5722)' }} />
          </div>
        </div>

        <div className="sh-player-stats-bar" style={{ marginTop: 12 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#ff5722' }}>16</strong>
            <span>Players Signed</span>
          </div>
          <div className="sh-stat-box">
            <strong>2</strong>
            <span>Slots Left</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>3 / 4</strong>
            <span>Overseas Cap</span>
          </div>
          <div className="sh-stat-box">
            <strong>₹5.2L</strong>
            <span>Top Signing</span>
          </div>
        </div>
      </section>

      {/* Franchise Fast Actions (Allocated Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/auction')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,87,34,0.15)', color: '#ff5722' }}>
            <Gavel size={18} />
          </div>
          <span>War Room</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/aimatch')}>
          <div className="sh-action-icon" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
            <Bot size={18} />
          </div>
          <span>Simulate XI</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/stats')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <TrendingUp size={18} />
          </div>
          <span>Scouting</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/interview')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,45,58,0.15)', color: '#ff2d3a' }}>
            <Video size={18} />
          </div>
          <span>Press Room</span>
        </button>
      </div>

      {/* Live Auction War Room Simulator */}
      <section className="panel" style={{ padding: '14px 16px', border: '1px solid rgba(255,87,34,0.3)' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Gavel size={18} color="#ff5722" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Live Auction Podium • Lot #28</h3>
          </div>
          <span className="pill" style={{ background: soldStatus ? '#00e676' : '#ff2d3a', color: soldStatus ? '#020617' : '#fff' }}>
            {soldStatus ? 'SOLD' : 'LIVE HAMMER'}
          </span>
        </header>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: 16 }}>Meera Krishnan</strong>
              <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>
                All-Rounder • U19 National Academy • Base: ₹1,50,000
              </small>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 10, color: 'var(--muted)', display: 'block' }}>CURRENT HIGH BID</span>
              <strong style={{ fontSize: 18, color: '#ffc83d' }}>₹{(currentBid).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {biddingSuccess && (
            <div style={{ marginTop: 8, padding: 6, background: 'rgba(0,230,118,0.15)', color: '#00e676', borderRadius: 8, fontSize: 11, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <CheckCircle2 size={14} /> Bid Raised by {details.paddleNumber || 'Paddle #04'} ({details.franchiseName || 'Coastal Kings'})!
            </div>
          )}

          {soldStatus && (
            <div style={{ marginTop: 8, padding: 8, background: 'rgba(0,230,118,0.2)', color: '#00e676', borderRadius: 8, fontSize: 12, fontWeight: 'bold', textAlign: 'center' }}>
              🎉 HAMMER DOWN! Meera Krishnan sold to {details.franchiseName || 'Coastal Kings XI'} for ₹{currentBid.toLocaleString('en-IN')}!
            </div>
          )}
        </div>

        {!soldStatus ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="btn btn--secondary"
              style={{ flex: 1 }}
              onClick={() => placeBid(25000)}
            >
              +₹25,000
            </button>
            <button
              type="button"
              className="btn btn--primary"
              style={{ flex: 1.2, background: 'linear-gradient(135deg, #ff9100, #ff5722)' }}
              onClick={() => placeBid(50000)}
            >
              Raise +₹50,000
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              style={{ background: '#00e676', color: '#020617', fontWeight: 'bold' }}
              onClick={handleHammer}
            >
              Hammer 🔨
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn--secondary"
            style={{ width: '100%' }}
            onClick={() => setSoldStatus(false)}
          >
            Load Next Auction Lot →
          </button>
        )}
      </section>

      {/* AI Match Simulator Tactical Allotment */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bot size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>AI Match Simulator • Strategy Lab</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/aimatch')}>
            Full Simulator →
          </button>
        </header>

        <div style={{ padding: 12, background: 'rgba(61,224,255,0.03)', borderRadius: 10, border: '1px solid rgba(61,224,255,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <strong style={{ fontSize: 13, color: '#f4f7ff' }}>Upcoming: Coastal Kings XI vs Marina Titans</strong>
            <span className="pill" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>T20 DERBY</span>
          </div>

          {simResult && (
            <div style={{ marginBottom: 10, padding: 8, background: 'rgba(0,0,0,0.3)', borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>Win Probability:</span>
                <strong style={{ fontSize: 13, color: '#00e676' }}>{simResult.winProb}% Coastal Kings</strong>
              </div>
              <div className="sh-progress-track">
                <div className="sh-progress-fill" style={{ width: `${simResult.winProb}%`, background: '#00e676' }} />
              </div>
              <small style={{ display: 'block', marginTop: 6, fontSize: 11, color: '#3de0ff' }}>
                💡 <strong>Tactic:</strong> {simResult.favoredTactic} (Proj: {simResult.projectedTotal})
              </small>
            </div>
          )}

          <button
            type="button"
            className="btn btn--primary btn--sm"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
            onClick={runSimulation}
            disabled={simRunning}
          >
            <Zap size={14} /> {simRunning ? 'Running Monte Carlo Match Engine...' : 'Run AI Strategy Simulation'}
          </button>
        </div>
      </section>

      {/* Squad Contracts & Overseas Cap Panel */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Users size={17} color="#ff9100" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Squad Roster Contracts</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/auction')}>
            View all 16 →
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {roster.map((player) => (
            <div
              key={player.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div>
                <strong style={{ fontSize: 13 }}>{player.name}</strong>
                <small style={{ display: 'block', fontSize: 10, color: 'var(--muted)' }}>
                  {player.role} • {player.origin}
                </small>
              </div>
              <span className="pill" style={{ background: 'rgba(255,145,0,0.15)', color: '#ff9100', fontSize: 11 }}>
                {player.fee}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Press Conference & Media Room Allotment */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Video size={17} color="#ff2d3a" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Franchise Media & Press Desk</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/interview')}>
            Press Studio →
          </button>
        </header>

        <form onSubmit={handleSendPress} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea
            className="sh-input"
            rows={2}
            placeholder="Publish official statement from Franchise Ownership (e.g. 'We are thrilled with our auction signings and confident in our squad depth for the upcoming campaign')..."
            value={pressNote}
            onChange={(e) => setPressNote(e.target.value)}
            style={{ resize: 'vertical' }}
          />
          <button
            type="submit"
            className="btn btn--secondary btn--sm"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <Send size={13} /> Broadcast to E-Paper & Press Wire
          </button>
          {pressSent && (
            <div style={{ padding: 6, background: 'rgba(0,230,118,0.15)', color: '#00e676', borderRadius: 8, fontSize: 11, textAlign: 'center' }}>
              ✓ Official statement published to Sports E-Paper news wire!
            </div>
          )}
        </form>
      </section>
    </div>
  )
}
