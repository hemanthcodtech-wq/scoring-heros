import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy,
  Ticket,
  Radio,
  Music,
  Newspaper,
  Heart,
  Vote,
  Sparkles,
  Share2,
  Video,
  Flame,
  MessageCircle,
  Volume2,
  CheckCircle2,
} from 'lucide-react'
import { super11, liveMatch } from '../../data/demo'

export default function FanDashboard({ user }) {
  const navigate = useNavigate()
  const [votedPlayer, setVotedPlayer] = useState('Rohit')
  const [cheerCount, setCheerCount] = useState(142)
  const [hasCheered, setHasCheered] = useState(false)
  const [selectedSeatTier, setSelectedSeatTier] = useState('east') // 'vip' | 'east' | 'student'
  const [bookedPass, setBookedPass] = useState(false)
  const [activeSound, setActiveSound] = useState(null)
  const [pollVote, setPollVote] = useState('rohit')

  function handleCheer() {
    setCheerCount((c) => c + 1)
    setHasCheered(true)
    setTimeout(() => setHasCheered(false), 800)
  }

  function handlePlaySound(soundName) {
    setActiveSound(soundName)
    setTimeout(() => setActiveSound(null), 2500)
  }

  function handleBookPass() {
    setBookedPass(true)
    setTimeout(() => setBookedPass(false), 3000)
  }

  return (
    <div className="sh-dashboard-layout">
      {/* Fan Hero Header */}
      <section className="sh-dash-hero-card sh-dash-hero-card--fan">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(255, 200, 61, 0.2)', borderColor: '#ffc83d' }}>
              <Heart size={24} color="#ffc83d" fill="#ffc83d" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{user.nickname}</h2>
                <span className="sh-badge-chip" style={{ color: '#ffc83d', borderColor: '#ffc83d55' }}>
                  SUPER SCORING FAN
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Cheering for: <strong>{user?.roleDetails?.favTeam || 'Scoring XI'}</strong> • {user.city}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Fantasy Squad: <strong>{user?.roleDetails?.fantasyClub || 'Marina Blasters XI'}</strong>
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#ffc83d55' }}>
            <strong style={{ color: '#ffc83d' }}>{user?.roleDetails?.pointsEarned || 1420}</strong>
            <span>FAN PTS</span>
          </div>
        </div>

        {/* Fan Status Highlights */}
        <div className="sh-player-stats-bar">
          <div className="sh-stat-box">
            <strong style={{ color: '#ffc83d' }}>#12</strong>
            <span>State Rank</span>
          </div>
          <div className="sh-stat-box">
            <strong>4</strong>
            <span>Match Passes</span>
          </div>
          <div className="sh-stat-box">
            <strong>28</strong>
            <span>Predictions Won</span>
          </div>
          <div className="sh-stat-box">
            <strong>98.2%</strong>
            <span>Loyalty Score</span>
          </div>
        </div>
      </section>

      {/* Fan Fast Actions (Allocated Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/super11')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
            <Trophy size={18} />
          </div>
          <span>Super 11</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/ticketing')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,229,255,0.15)', color: '#00e5ff' }}>
            <Ticket size={18} />
          </div>
          <span>Match Passes</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/entertainment')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,45,58,0.15)', color: '#ff2d3a' }}>
            <Music size={18} />
          </div>
          <span>Arena Music</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/epaper')}>
          <div className="sh-action-icon" style={{ background: 'rgba(124,77,255,0.15)', color: '#7c4dff' }}>
            <Newspaper size={18} />
          </div>
          <span>Daily E-Paper</span>
        </button>
      </div>

      {/* Super Scoring 11 Fan Voting Lounge */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Vote size={18} color="#ffc83d" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Super Scoring 11 • Fan Voting</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/super11')}>
            Full Squad →
          </button>
        </header>

        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
          Vote for today’s Hero of the Match. Your vote directly impacts weekly fantasy leaderboard rewards!
        </p>

        <div className="sh-vote-list">
          {super11.slice(0, 4).map((player) => (
            <div
              key={player.name}
              className={`sh-vote-item ${votedPlayer === player.name ? 'is-voted' : ''}`}
              onClick={() => setVotedPlayer(player.name)}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="sh-vote-indicator">{votedPlayer === player.name ? '✓' : ''}</span>
                <div>
                  <strong>{player.name}</strong>
                  <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>
                    {player.role} • {player.pts} Fan Rating
                  </small>
                </div>
              </div>
              <span className="pill" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
                {votedPlayer === player.name ? 'VOTED' : 'TAP TO VOTE'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Match Ticketing Fast Reservation Allotment */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ticket size={17} color="#00e5ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Stadium Pass Fast Booking</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/ticketing')}>
            Box Office →
          </button>
        </header>

        <div style={{ padding: 12, background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(0,229,255,0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <strong style={{ fontSize: 14 }}>Chennai Street Cup • Semi Final</strong>
              <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11, marginTop: 2 }}>
                Coastal Kings vs Marina Titans • Tonight 7:30 PM
              </small>
            </div>
            <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
              FILLING FAST
            </span>
          </div>

          {/* Seat Tier Selector */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {[
              { id: 'vip', name: 'VIP Pavilion', price: '₹999' },
              { id: 'east', name: 'East Stand', price: '₹399' },
              { id: 'student', name: 'Student Pass', price: '₹149' },
            ].map((tier) => (
              <button
                key={tier.id}
                type="button"
                className={`pill ${selectedSeatTier === tier.id ? 'is-active' : ''}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '6px 4px',
                  alignItems: 'center',
                  background: selectedSeatTier === tier.id ? '#00e5ff' : 'rgba(255,255,255,0.06)',
                  color: selectedSeatTier === tier.id ? '#020617' : '#f4f7ff',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedSeatTier(tier.id)}
              >
                <span style={{ fontSize: 10, fontWeight: 'bold' }}>{tier.name}</span>
                <strong style={{ fontSize: 12 }}>{tier.price}</strong>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn--primary btn--sm"
            style={{ width: '100%', marginTop: 10, background: 'linear-gradient(135deg, #00b0ff, #00e5ff)', color: '#020617', fontWeight: 'bold' }}
            onClick={handleBookPass}
          >
            {bookedPass ? '✓ Pass Reserved! Viewing M-Ticket...' : 'Reserve Match Pass Now'}
          </button>

          {bookedPass && (
            <div style={{ marginTop: 8, padding: 6, background: 'rgba(0,230,118,0.15)', color: '#00e676', borderRadius: 8, fontSize: 11, textAlign: 'center' }}>
              ✓ E-Ticket Confirmed! Gate 3 Entry QR sent to your Scoring Heroes Passbook.
            </div>
          )}
        </div>
      </section>

      {/* Stadium Soundboard & Live Audio Stream */}
      <section className="live-card">
        <div className="live-card__meta">
          <span className="pill" style={{ background: '#ff2d3a' }}>LIVE STADIUM AUDIO</span>
          <span>{liveMatch.batting} vs {liveMatch.bowling}</span>
        </div>
        <div style={{ margin: '8px 0', fontSize: 13, color: '#f4f7ff', lineHeight: 1.4 }}>
          🎙️ <strong>Over 10.3:</strong> Six over long-on! Decibel meter hitting 112 dB at the venue!
        </div>

        {/* Interactive Soundboard Chants */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, marginTop: 10 }}>
          {[
            { id: 'titans', name: '📢 Marina Chant' },
            { id: 'siren', name: '🚨 Sixer Siren' },
            { id: 'dhol', name: '🥁 Dhol Beats' },
            { id: 'trumpet', name: '🎺 Stadium Trumpet' },
          ].map((snd) => (
            <button
              key={snd.id}
              type="button"
              onClick={() => handlePlaySound(snd.name)}
              style={{
                padding: '6px 8px',
                borderRadius: 8,
                border: activeSound === snd.name ? '1px solid #ff2d3a' : '1px solid rgba(255,255,255,0.08)',
                background: activeSound === snd.name ? 'rgba(255,45,58,0.2)' : 'rgba(255,255,255,0.04)',
                color: activeSound === snd.name ? '#ff2d3a' : '#f4f7ff',
                fontSize: 11,
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {snd.name} {activeSound === snd.name ? '🔊' : ''}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button
            type="button"
            className={`btn btn--primary ${hasCheered ? 'sh-cheer-burst' : ''}`}
            style={{ flex: 1, background: 'linear-gradient(135deg, #e10613, #ff5722)' }}
            onClick={handleCheer}
          >
            👏 Send Stadium Cheer ({cheerCount})
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => navigate('/app/commentary')}
            style={{ width: 'auto' }}
          >
            <Radio size={15} /> Commentary Desk
          </button>
        </div>
      </section>

      {/* Fan Prediction Poll Lounge */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={17} color="#ffc83d" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Fan Live Prediction • Win 250 Pts</h3>
          </div>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
          Who will hit the highest strike-rate in the death overs (16-20)?
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { id: 'rohit', name: 'Rohit Sharma (Scoring XI)', pct: 64 },
            { id: 'meera', name: 'Meera Krishnan (Titans)', pct: 28 },
            { id: 'kavya', name: 'Kavya Raman (Blasters)', pct: 8 },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPollVote(opt.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: 8,
                background: pollVote === opt.id ? 'rgba(255,200,61,0.12)' : 'rgba(255,255,255,0.03)',
                border: pollVote === opt.id ? '1px solid #ffc83d' : '1px solid rgba(255,255,255,0.06)',
                color: '#f4f7ff',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 12 }}>{opt.name}</span>
              <span style={{ fontSize: 12, fontWeight: 'bold', color: pollVote === opt.id ? '#ffc83d' : '#9aa8c7' }}>
                {opt.pct}% {pollVote === opt.id ? '✓' : ''}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Sports E-Paper Daily Edition Allotment */}
      <section className="panel" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => navigate('/app/epaper')}>
        <header style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Newspaper size={17} color="#7c4dff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Today's Sports E-Paper</h3>
          </div>
          <span className="text-link">Read Edition →</span>
        </header>
        <div style={{ padding: 10, background: 'rgba(124,77,255,0.06)', borderRadius: 8, border: '1px solid rgba(124,77,255,0.2)' }}>
          <span className="pill" style={{ background: '#7c4dff', color: '#fff', fontSize: 9 }}>TODAY'S FRONT PAGE</span>
          <p style={{ margin: '6px 0 2px', fontSize: 13, fontWeight: 'bold' }}>
            "Rohit's Blitzkrieg Takes Scoring XI to Super 11 Summit"
          </p>
          <small style={{ color: 'var(--muted)', fontSize: 11 }}>Read full 8-page digital broadsheet with match charts.</small>
        </div>
      </section>
    </div>
  )
}
