import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bot,
  Zap,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
  Users,
  Activity,
  Flame,
  Globe,
  Share2,
  CheckCircle2,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Volume2,
  Calendar,
  Layers,
  Check,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function AIMatchSystem() {
  const navigate = useNavigate()

  // Active Tab: 'generator' | 'tournament' | 'commentary' | 'behavior' | 'multisport'
  const [activeTab, setActiveTab] = useState('generator')
  const [toastMsg, setToastMsg] = useState('')

  // Toast feedback
  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- MATCH SIMULATION SETUP STATE ---
  const [format, setFormat] = useState('T20') // 'T20' | 'ODI' | 'Test'
  const [venue, setVenue] = useState('Global Arena')
  const [teamA, setTeamA] = useState('India AI')
  const [teamB, setTeamB] = useState('Australia AI')
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulatedResult, setSimulatedResult] = useState({
    generated: true,
    winner: 'India AI',
    margin: 'Won by 14 runs',
    winProbA: 64,
    winProbB: 36,
    scoreA: '188/4 (20.0 ov)',
    scoreB: '174/7 (20.0 ov)',
    topBatter: 'Rohit AI • 74 (42b, 7x4, 4x6)',
    topBowler: 'Bumrah AI • 3/21 (4.0 ov)',
  })

  const teamsList = [
    { id: 'ind', name: 'India AI' },
    { id: 'aus', name: 'Australia AI' },
    { id: 'world', name: 'World AI XI' },
    { id: 'eng', name: 'England AI' },
    { id: 'sa', name: 'South Africa AI' },
  ]

  const venuesList = ['Global Arena', 'Eden Gardens (Kolkata)', "Lord's (London)", 'MCG (Melbourne)']

  const handleGenerateMatch = () => {
    setIsSimulating(true)
    triggerToast('AI Match Engine simulating ball-by-ball physics...')
    setTimeout(() => {
      setIsSimulating(false)
      const probA = Math.floor(Math.random() * 30) + 50 // 50-80%
      const probB = 100 - probA
      const winner = probA >= 50 ? teamA : teamB
      setSimulatedResult({
        generated: true,
        winner,
        margin: probA >= 50 ? 'Won by 18 runs' : 'Won by 4 wickets',
        winProbA: probA,
        winProbB: probB,
        scoreA: '192/5 (20.0 ov)',
        scoreB: '181/8 (20.0 ov)',
        topBatter: `${teamA.split(' ')[0]} Star • 82* (45b)`,
        topBowler: 'Pace Ace • 3/19 (4.0 ov)',
      })
      triggerToast(`AI Simulation Complete! ${winner} victorious!`)
    }, 1200)
  }

  // --- TOURNAMENT SIMULATION BRACKET ---
  const [tournamentStage, setTournamentStage] = useState(0) // 0: 8 Teams, 1: Semi 4, 2: Final 2, 3: Champion
  const tournamentStages = [
    { count: 8, label: 'GROUP' },
    { count: 4, label: 'SEMI' },
    { count: 2, label: 'FINAL' },
    { count: 1, label: 'CHAMPION' },
  ]

  const tournamentBracket = {
    teams: ['India AI', 'Australia AI', 'England AI', 'South Africa AI', 'New Zealand AI', 'Pakistan AI', 'West Indies AI', 'Sri Lanka AI'],
    semis: ['India AI', 'Australia AI', 'England AI', 'South Africa AI'],
    finals: ['India AI', 'Australia AI'],
    champion: 'India AI 🏆',
  }

  const advanceTournament = () => {
    setTournamentStage((prev) => (prev + 1) % 4)
    triggerToast('AI Tournament Stage Advanced!')
  }

  // --- AI COMMENTARY & BALL-BY-BALL FEED ---
  const [commentaryFeed] = useState([
    { over: '19.6', commentary: 'SIX! Smashed over deep mid-wicket! High into the night sky, towering finish!', type: 'boundary' },
    { over: '19.5', commentary: 'WICKET! Yorker right on the base of leg stump! Defences breached cleanly!', type: 'wicket' },
    { over: '19.4', commentary: 'FOUR! Sliced deftly past short third man with sublime wrist-work.', type: 'boundary' },
    { over: '19.3', commentary: '2 runs. Driven down the ground, brisk sprint between the wickets.', type: 'normal' },
    { over: '19.2', commentary: 'Dot ball. Slower bouncer outside off, beaten by the deceptive pace.', type: 'normal' },
  ])

  // --- MULTI-SPORT AI STATE ---
  const [selectedSport, setSelectedSport] = useState('cricket')
  const sports = [
    { id: 'cricket', name: 'Cricket AI', emoji: '🏏', desc: 'Ball-by-ball physics, pitch wear, swing modeling' },
    { id: 'football', name: 'Football AI', emoji: '⚽', desc: 'xG shot probability, press intensity, tactical formations' },
    { id: 'basketball', name: 'Basketball AI', emoji: '🏀', desc: 'True shooting %, fast-break pace, clutch efficiency' },
    { id: 'kabaddi', name: 'Kabaddi AI', emoji: '🤼', desc: 'Raid success rate, ankle-hold tackling pressure' },
  ]

  return (
    <Screen
      back
      title="AI Match System"
      right={
        <button
          className="aimatch-top-btn"
          onClick={() => triggerToast('AI Simulation Engine: Active v4.2')}
          title="AI Engine Status"
        >
          <Bot size={18} color="#3de0ff" />
        </button>
      }
    >
      <div className="native-aimatch-app">
        {/* Floating Toast */}
        {toastMsg && (
          <div className="aimatch-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Sticky Segmented Navigation Tabs */}
        <div className="aimatch-nav-tabs-scroll">
          <button
            className={`aimatch-nav-tab ${activeTab === 'generator' ? 'active' : ''}`}
            onClick={() => setActiveTab('generator')}
          >
            <Bot size={14} />
            <span>AI Match Engine</span>
          </button>
          <button
            className={`aimatch-nav-tab ${activeTab === 'tournament' ? 'active' : ''}`}
            onClick={() => setActiveTab('tournament')}
          >
            <Trophy size={14} />
            <span>Tournament Sim</span>
          </button>
          <button
            className={`aimatch-nav-tab ${activeTab === 'commentary' ? 'active' : ''}`}
            onClick={() => setActiveTab('commentary')}
          >
            <MessageSquare size={14} />
            <span>AI Commentary</span>
          </button>
          <button
            className={`aimatch-nav-tab ${activeTab === 'behavior' ? 'active' : ''}`}
            onClick={() => setActiveTab('behavior')}
          >
            <Activity size={14} />
            <span>Player Behavior</span>
          </button>
          <button
            className={`aimatch-nav-tab ${activeTab === 'multisport' ? 'active' : ''}`}
            onClick={() => setActiveTab('multisport')}
          >
            <Globe size={14} />
            <span>Multi-Sport AI</span>
          </button>
        </div>

        {/* ---------------- TAB 1: AI MATCH ENGINE GENERATOR ---------------- */}
        {activeTab === 'generator' && (
          <div className="aimatch-tab-content">
            {/* Robot Engine Hero Box (Matching Blueprint) */}
            <div className="aimatch-engine-hero">
              <div className="engine-robot-icon-box">
                <Bot size={34} color="#3de0ff" />
              </div>
              <div className="engine-hero-title">AI MATCH ENGINE</div>
              <div className="engine-hero-sub">
                Real player statistics, pitch conditions & ball physics simulation
              </div>
            </div>

            {/* Match Setup Spec Card */}
            <div className="aimatch-setup-card">
              <div className="setup-field-row">
                <span className="setup-label">Format</span>
                <div className="setup-format-toggle">
                  {['T20', 'ODI', 'Test'].map((f) => (
                    <button
                      key={f}
                      className={`format-btn ${format === f ? 'active' : ''}`}
                      onClick={() => setFormat(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setup-field-row">
                <span className="setup-label">Venue</span>
                <select
                  className="setup-select"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                >
                  {venuesList.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div className="setup-field-row">
                <span className="setup-label">Matchup</span>
                <div className="matchup-picker-row">
                  <select
                    className="matchup-team-select"
                    value={teamA}
                    onChange={(e) => setTeamA(e.target.value)}
                  >
                    {teamsList.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <span className="vs-badge">VS</span>
                  <select
                    className="matchup-team-select"
                    value={teamB}
                    onChange={(e) => setTeamB(e.target.value)}
                  >
                    {teamsList.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="setup-field-row">
                <span className="setup-label">Simulation</span>
                <span className="simulation-pill">Real player career data</span>
              </div>
            </div>

            {/* Simulated Win Prediction Box (Matching Blueprint WIN PREDICTION INDIA 64%) */}
            {simulatedResult.generated && (
              <div className="aimatch-prediction-card">
                <div className="pred-header-row">
                  <span className="pred-kicker">WIN PREDICTION</span>
                  <span className="pred-lead-badge">{simulatedResult.winner} FAVORED</span>
                </div>

                <div className="pred-percentage-display">
                  {simulatedResult.winner.toUpperCase()} {simulatedResult.winProbA}%
                </div>

                {/* Progress bar */}
                <div className="pred-bar-track">
                  <div
                    className="pred-bar-fill"
                    style={{ width: `${simulatedResult.winProbA}%` }}
                  />
                </div>

                <div className="pred-conditions-caption">
                  Based on recent player form, venue pitch degradation + simulation parameters
                </div>

                {/* Match Summary Box */}
                <div className="simulated-score-box">
                  <div className="score-row">
                    <span className="team-score-name">{teamA}</span>
                    <span className="team-score-val">{simulatedResult.scoreA}</span>
                  </div>
                  <div className="score-row">
                    <span className="team-score-name">{teamB}</span>
                    <span className="team-score-val">{simulatedResult.scoreB}</span>
                  </div>
                  <div className="match-verdict-line">
                    🏆 {simulatedResult.winner} {simulatedResult.margin}
                  </div>

                  <div className="stars-meta-row">
                    <div>🏏 {simulatedResult.topBatter}</div>
                    <div>🎯 {simulatedResult.topBowler}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Generate AI Match CTA Button */}
            <button
              className="aimatch-red-cta-btn"
              onClick={handleGenerateMatch}
              disabled={isSimulating}
            >
              <Zap size={16} />
              <span>{isSimulating ? 'SIMULATING IN REAL-TIME...' : 'GENERATE AI MATCH'}</span>
            </button>
          </div>
        )}

        {/* ---------------- TAB 2: AI TOURNAMENT SIMULATION (MATCHING BLUEPRINT) ---------------- */}
        {activeTab === 'tournament' && (
          <div className="aimatch-tab-content">
            <div className="tournament-sim-hero">
              <Trophy size={32} color="#ffc83d" />
              <h3 style={{ margin: '6px 0 2px', fontSize: 16, color: '#fff' }}>
                AI Tournament Simulation System
              </h3>
              <p style={{ margin: 0, fontSize: 11, color: '#9aa8c7' }}>
                Simulates complete knockout stages, semi-finals, and grand finals with AI models
              </p>
            </div>

            {/* 4 Bracket Nodes: 8 (Group) -> 4 (Semi) -> 2 (Final) -> 1 (Champion) */}
            <div className="tournament-bracket-nodes-row">
              {tournamentStages.map((stage, idx) => {
                const isActive = idx === tournamentStage
                const isPassed = idx < tournamentStage
                return (
                  <div
                    key={stage.label}
                    className={`bracket-node-item ${isActive ? 'active' : ''} ${
                      isPassed ? 'passed' : ''
                    }`}
                  >
                    <div className="bracket-circle">{stage.count}</div>
                    <span className="bracket-label">{stage.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Active Stage Teams View */}
            <div className="bracket-stage-display-card">
              <div className="stage-header-row">
                <span className="stage-badge">CURRENT STAGE</span>
                <span className="stage-title-text">
                  {tournamentStages[tournamentStage].label} STAGE ({tournamentStages[tournamentStage].count} Teams)
                </span>
              </div>

              <div className="stage-teams-pills-grid">
                {tournamentStage === 0 &&
                  tournamentBracket.teams.map((t) => (
                    <span key={t} className="stage-team-pill">
                      {t}
                    </span>
                  ))}
                {tournamentStage === 1 &&
                  tournamentBracket.semis.map((t) => (
                    <span key={t} className="stage-team-pill semi">
                      {t}
                    </span>
                  ))}
                {tournamentStage === 2 &&
                  tournamentBracket.finals.map((t) => (
                    <span key={t} className="stage-team-pill final">
                      {t}
                    </span>
                  ))}
                {tournamentStage === 3 && (
                  <div className="champion-celebration-pill">
                    🏆 {tournamentBracket.champion} WINS GRAND TROPHY!
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Generate / Advance Button */}
            <button className="aimatch-red-cta-btn" onClick={advanceTournament}>
              <span>ADVANCE TOURNAMENT STAGE ({tournamentStages[tournamentStage].label})</span>
            </button>
          </div>
        )}

        {/* ---------------- TAB 3: AI COMMENTARY & VIRTUAL LOUNGES ---------------- */}
        {activeTab === 'commentary' && (
          <div className="aimatch-tab-content">
            <div className="commentary-header-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Volume2 size={24} color="#3de0ff" />
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                    AI Commentary & Highlights Engine
                  </h4>
                  <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                    Real-time audio speech synthesis & ball-by-ball description
                  </div>
                </div>
              </div>
              <span className="lounge-count-pill">🔴 2,840 IN LOUNGE</span>
            </div>

            {/* Live Simulated Commentary Feed */}
            <div className="commentary-live-list">
              {commentaryFeed.map((c, i) => (
                <div key={i} className={`commentary-row ${c.type}`}>
                  <span className="comm-over-tag">{c.over}</span>
                  <div className="comm-text-box">
                    <p className="comm-text">{c.commentary}</p>
                    <span className="comm-ai-voice">🎙️ Harsha AI Voice Synthesis</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="aimatch-red-cta-btn"
              onClick={() => triggerToast('Next ball commentary generated!')}
            >
              <span>SIMULATE NEXT OVER</span>
            </button>
          </div>
        )}

        {/* ---------------- TAB 4: PLAYER BEHAVIOR & PREDICTIONS ---------------- */}
        {activeTab === 'behavior' && (
          <div className="aimatch-tab-content">
            <div className="behavior-overview-card">
              <h4 style={{ margin: '0 0 4px', fontSize: 14, color: '#fff' }}>
                AI Player Behavior Engine
              </h4>
              <p style={{ margin: '0 0 12px', fontSize: 11, color: '#9aa8c7' }}>
                Adapts batting aggression and bowling line/length based on match pressure
              </p>

              <div className="behavior-matrix-grid">
                <div className="matrix-item">
                  <span className="matrix-label">Powerplay Aggression</span>
                  <span className="matrix-val highlight">88% Attack</span>
                </div>
                <div className="matrix-item">
                  <span className="matrix-label">Death Overs Strike Rate</span>
                  <span className="matrix-val gold">192.4 SR</span>
                </div>
                <div className="matrix-item">
                  <span className="matrix-label">Pitch Response</span>
                  <span className="matrix-val green">Seam Friendly</span>
                </div>
                <div className="matrix-item">
                  <span className="matrix-label">Clutch Pressure Index</span>
                  <span className="matrix-val">94.8 / 100</span>
                </div>
              </div>
            </div>

            <button
              className="aimatch-red-cta-btn"
              onClick={() => triggerToast('Player behavior models recalibrated!')}
            >
              <span>RECALIBRATE PLAYER MODELS</span>
            </button>
          </div>
        )}

        {/* ---------------- TAB 5: MULTI-SPORT AI EXPANSION ---------------- */}
        {activeTab === 'multisport' && (
          <div className="aimatch-tab-content">
            <div className="multisport-header-card">
              <Globe size={24} color="#3de0ff" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Multi-Sport AI Expansion System
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Universal simulation architecture across cricket, football, basketball & kabaddi
                </div>
              </div>
            </div>

            <div className="sports-selector-list">
              {sports.map((s) => (
                <div
                  key={s.id}
                  className={`sport-card ${selectedSport === s.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSport(s.id)
                    triggerToast(`Switched to ${s.name}`)
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <span className="sport-emoji">{s.emoji}</span>
                  <div className="sport-info">
                    <div className="sport-name">{s.name}</div>
                    <div className="sport-desc">{s.desc}</div>
                  </div>
                  {selectedSport === s.id && <Check size={16} color="#3de0ff" />}
                </div>
              ))}
            </div>

            <button
              className="aimatch-red-cta-btn"
              onClick={() => {
                setActiveTab('generator')
                triggerToast(`Generating match in ${selectedSport.toUpperCase()}!`)
              }}
            >
              <span>LAUNCH {selectedSport.toUpperCase()} SIMULATOR</span>
            </button>
          </div>
        )}
      </div>
    </Screen>
  )
}
