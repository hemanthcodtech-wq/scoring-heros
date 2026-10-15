import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy,
  Users,
  Award,
  Sparkles,
  Share2,
  ThumbsUp,
  Filter,
  CheckCircle2,
  Flame,
  Activity,
  ArrowRight,
  Shield,
  Star,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function SuperScoring11() {
  const navigate = useNavigate()

  // Active Tab: 'lineup' | 'formula' | 'fan_votes' | 'archive'
  const [activeTab, setActiveTab] = useState('lineup')
  const [selectedMatch, setSelectedMatch] = useState('m1')
  const [toastMsg, setToastMsg] = useState('')

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- SUPER 11 BALANCED SQUAD DATA (FEATURE 3.8) ---
  const [squad, setSquad] = useState([
    { id: 1, name: 'Rohit Sharma', role: 'BAT', category: 'Batsman', isCaptain: true, runs: 74, balls: 42, wkts: 0, pts: 98, votes: 4820, voted: false, avatar: '🏏' },
    { id: 2, name: 'Yashasvi Jaiswal', role: 'BAT', category: 'Batsman', isCaptain: false, runs: 68, balls: 38, wkts: 0, pts: 92, votes: 3410, voted: false, avatar: '⚡' },
    { id: 3, name: 'Virat Kohli', role: 'BAT', category: 'Batsman', isCaptain: false, runs: 59, balls: 40, wkts: 0, pts: 89, votes: 5690, voted: false, avatar: '👑' },
    { id: 4, name: 'Suryakumar Yadav', role: 'BAT', category: 'Batsman', isCaptain: false, runs: 44, balls: 19, wkts: 0, pts: 86, votes: 2980, voted: false, avatar: '🎯' },
    { id: 5, name: 'Meera Patel', role: 'WK', category: 'Wicketkeeper', isCaptain: false, runs: 41, balls: 24, dismissals: 3, pts: 91, votes: 3120, voted: false, avatar: '🧤' },
    { id: 6, name: 'Hardik Pandya', role: 'AR', category: 'All-Rounder', isViceCaptain: true, runs: 38, balls: 18, wkts: 2, pts: 94, votes: 4210, voted: false, avatar: '🔥' },
    { id: 7, name: 'Ravindra Jadeja', role: 'AR', category: 'All-Rounder', isCaptain: false, runs: 28, balls: 14, wkts: 2, pts: 88, votes: 2890, voted: false, avatar: '⚔️' },
    { id: 8, name: 'Jasprit Bumrah', role: 'BOWL', category: 'Bowler', isCaptain: false, runs: 0, wkts: 4, econ: 4.5, pts: 99, votes: 6140, voted: false, avatar: '💥' },
    { id: 9, name: 'Kuldeep Yadav', role: 'BOWL', category: 'Bowler', isCaptain: false, runs: 0, wkts: 3, econ: 5.2, pts: 90, votes: 2450, voted: false, avatar: '🌀' },
    { id: 10, name: 'Arshdeep Singh', role: 'BOWL', category: 'Bowler', isCaptain: false, runs: 0, wkts: 3, econ: 6.0, pts: 87, votes: 1980, voted: false, avatar: '🎯' },
    { id: 11, name: 'Mohammed Siraj', role: 'BOWL', category: 'Bowler', isCaptain: false, runs: 0, wkts: 2, econ: 6.2, pts: 85, votes: 1760, voted: false, avatar: '🚀' },
  ])

  const handleVote = (id) => {
    setSquad((prev) =>
      prev.map((player) => {
        if (player.id === id) {
          const newVoted = !player.voted
          triggerToast(newVoted ? `Voted for ${player.name} in Super 11!` : `Removed vote for ${player.name}`)
          return {
            ...player,
            voted: newVoted,
            votes: newVoted ? player.votes + 1 : player.votes - 1,
          }
        }
        return player
      })
    )
  }

  return (
    <Screen
      back
      title="Super Scoring 11"
      right={
        <button
          className="super11-top-btn"
          onClick={() => triggerToast('Super 11 AI Algorithm v4.2 • Role-Balanced')}
          title="Algorithm Info"
        >
          <Trophy size={18} color="#ffc83d" />
        </button>
      }
    >
      <div className="native-super11-app">
        {/* Floating Toast Notification */}
        {toastMsg && (
          <div className="super11-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Sticky Segmented Navigation Tabs */}
        <div className="super11-nav-tabs-scroll">
          <button
            className={`super11-nav-tab ${activeTab === 'lineup' ? 'active' : ''}`}
            onClick={() => setActiveTab('lineup')}
          >
            <Trophy size={14} />
            <span>Dream XI Lineup</span>
          </button>
          <button
            className={`super11-nav-tab ${activeTab === 'fan_votes' ? 'active' : ''}`}
            onClick={() => setActiveTab('fan_votes')}
          >
            <ThumbsUp size={14} />
            <span>Fan Voting</span>
          </button>
          <button
            className={`super11-nav-tab ${activeTab === 'formula' ? 'active' : ''}`}
            onClick={() => setActiveTab('formula')}
          >
            <Activity size={14} />
            <span>Weighted Formula</span>
          </button>
          <button
            className={`super11-nav-tab ${activeTab === 'archive' ? 'active' : ''}`}
            onClick={() => setActiveTab('archive')}
          >
            <Shield size={14} />
            <span>Past Match XIs</span>
          </button>
        </div>

        {/* ================= TAB 1: ROLE-BALANCED LINEUP ================= */}
        {activeTab === 'lineup' && (
          <div className="super11-tab-content">
            {/* Header Showcase Card */}
            <div className="super11-hero-banner">
              <div className="super11-trophy-circle">
                <Trophy size={36} color="#ffc83d" />
              </div>
              <span className="super11-badge">AUTOMATIC MATCH OF THE DAY SELECTION</span>
              <h2 className="super11-title">SUPER SCORING 11</h2>
              <p className="super11-sub">
                Best 11 players selected via AI Impact Score + Fan Voting Influence
              </p>

              <div className="super11-balance-pills">
                <span className="balance-pill">4 Batsmen</span>
                <span className="balance-pill">1 Wicketkeeper</span>
                <span className="balance-pill">2 All-Rounders</span>
                <span className="balance-pill">4 Bowlers</span>
              </div>
            </div>

            {/* Starting 11 Pitch Grid List */}
            <div className="super11-players-list">
              <div className="section-divider-row">
                <span>STARTING ELEVEN (BY IMPACT SCORE)</span>
                <span className="match-tag">Hapur Heroes vs Meerut Titans</span>
              </div>

              {squad.map((p, idx) => (
                <div key={p.id} className="super11-player-row">
                  <span className="player-rank-num">0{idx + 1}</span>
                  <div className="player-avatar-box">{p.avatar}</div>
                  <div className="player-meta-box">
                    <div className="player-name-line">
                      <span className="name-text">{p.name}</span>
                      {p.isCaptain && <span className="captain-badge">C</span>}
                      {p.isViceCaptain && <span className="vice-badge">VC</span>}
                    </div>
                    <span className="player-role-sub">
                      {p.category} • {p.role === 'BAT' ? `${p.runs} runs (${p.balls}b)` : p.role === 'BOWL' ? `${p.wkts} wkts (${p.econ} econ)` : p.role === 'WK' ? `${p.runs} runs, ${p.dismissals} catches/stumpings` : `${p.runs}r, ${p.wkts}w`}
                    </span>
                  </div>

                  <div className="player-pts-col">
                    <span className="pts-val">{p.pts}</span>
                    <span className="pts-lbl">IMPACT</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Share Button */}
            <button
              className="super11-red-cta-btn"
              onClick={() => triggerToast('Super Scoring 11 squad graphic exported to WhatsApp & Instagram!')}
            >
              <Share2 size={16} />
              <span>SHARE SUPER 11 GRAPHIC</span>
            </button>
          </div>
        )}

        {/* ================= TAB 2: FAN VOTING INFLUENCE ================= */}
        {activeTab === 'fan_votes' && (
          <div className="super11-tab-content">
            <div className="super11-info-card">
              <ThumbsUp size={24} color="#3de0ff" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Fan Voting & Squad Influence
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Fan votes account for 25% of the player's total match ranking score
                </div>
              </div>
            </div>

            <div className="voting-players-grid">
              {squad.map((p) => (
                <div key={p.id} className={`vote-player-card ${p.voted ? 'voted' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{p.avatar}</span>
                    <div>
                      <div className="vote-p-name">{p.name}</div>
                      <div className="vote-p-role">{p.category}</div>
                    </div>
                  </div>

                  <div className="vote-action-row">
                    <span className="vote-count-text">👍 {p.votes.toLocaleString()} Votes</span>
                    <button
                      className={`vote-btn ${p.voted ? 'active' : ''}`}
                      onClick={() => handleVote(p.id)}
                    >
                      {p.voted ? 'VOTED' : 'VOTE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: WEIGHTED RANKING ALGORITHM ================= */}
        {activeTab === 'formula' && (
          <div className="super11-tab-content">
            <div className="super11-info-card">
              <Activity size={24} color="#ffc83d" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Super 11 AI Ranking Algorithm
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Transparent mathematical formula powering automated selection
                </div>
              </div>
            </div>

            <div className="formula-cards-grid">
              <div className="formula-card">
                <span className="formula-type">🏏 BATTING IMPACT FORMULA</span>
                <p className="formula-math">
                  Score = (Runs × 1.0) + ((StrikeRate - 100) × 0.5) + (4s × 1) + (6s × 2) + MilestoneBonus(50/100)
                </p>
                <span className="formula-note">Rewards rapid run acceleration and boundary frequency</span>
              </div>

              <div className="formula-card">
                <span className="formula-type">🎯 BOWLING IMPACT FORMULA</span>
                <p className="formula-math">
                  Score = (Wickets × 25) + ((6.5 - EconomyRate) × 6) + (DotBalls × 1.5) + MaidenOverBonus(20)
                </p>
                <span className="formula-note">Penalizes expensive overs and heavily credits wicket-taking</span>
              </div>

              <div className="formula-card">
                <span className="formula-type">🧤 CLUTCH & FIELDING FORMULA</span>
                <p className="formula-math">
                  Score = (Catches × 8) + (RunOuts × 12) + (DeathOverDotRate × 10) + FanVoteMultiplier(1.25)
                </p>
                <span className="formula-note">Rewards tight death over bowling and sensational boundary catches</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: ARCHIVE & PAST TEAMS ================= */}
        {activeTab === 'archive' && (
          <div className="super11-tab-content">
            <div className="super11-info-card">
              <Shield size={24} color="#10b981" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Past Match Super 11 Archives
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Historical dream teams from league finals, qualifiers and street cups
                </div>
              </div>
            </div>

            <div className="past-super11-list">
              {[
                { match: 'Round 4: Chennai Derby', captain: 'Rohit Sharma (C)', mvp: 'Jasprit Bumrah', date: '12 Jul 2026', totalPts: '1,048 pts' },
                { match: 'Round 3: Coastal Trophy', captain: 'Virat Kohli (C)', mvp: 'Hardik Pandya', date: '08 Jul 2026', totalPts: '994 pts' },
                { match: 'Round 2: Street Cup Qualifier', captain: 'Arjun Das (C)', mvp: 'Meera Patel', date: '02 Jul 2026', totalPts: '1,012 pts' },
              ].map((item, idx) => (
                <div key={idx} className="archive-match-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="archive-match-name">{item.match}</span>
                    <span className="archive-pts-pill">{item.totalPts}</span>
                  </div>
                  <div className="archive-meta-text">
                    Captain: <strong>{item.captain}</strong> • MVP: <strong>{item.mvp}</strong>
                  </div>
                  <div className="archive-footer-row">
                    <span style={{ fontSize: 9, color: '#9aa8c7' }}>{item.date}</span>
                    <button
                      className="view-lineup-btn"
                      onClick={() => triggerToast(`Loaded lineup for ${item.match}`)}
                    >
                      View 11 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
