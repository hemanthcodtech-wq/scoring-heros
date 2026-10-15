import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  RotateCcw,
  CloudRain,
  FileText,
  Video,
  MoreHorizontal,
  Settings,
  ChevronLeft,
  Share2,
} from 'lucide-react'
import Screen from '../components/Screen'
import { liveMatch } from '../data/demo'

const keyPadRows = [
  [
    { label: '0', val: '0', type: 'num' },
    { label: '1', val: '1', type: 'num' },
    { label: '2', val: '2', type: 'num' },
    { label: '3', val: '3', type: 'num' },
  ],
  [
    { label: '4', val: '4', type: 'boundary', color: '#00e676' },
    { label: '6', val: '6', type: 'six', color: '#651fff' },
    { label: 'W', val: 'W', type: 'wicket', color: '#e10613' },
    { label: '↶', val: 'undo', type: 'undo', color: '#ffb300' },
  ],
  [
    { label: 'Wide', val: 'Wd', type: 'extra', color: '#1d6dff' },
    { label: 'No Ball', val: 'Nb', type: 'extra', color: '#e10613' },
    { label: 'Bye', val: 'B', type: 'extra', color: '#182b4d' },
    { label: 'Leg Bye', val: 'Lb', type: 'extra', color: '#182b4d' },
  ],
]

export default function LiveScorer() {
  const navigate = useNavigate()

  // Match state
  const [runs, setRuns] = useState(106)
  const [wickets, setWickets] = useState(3)
  const [overs, setOvers] = useState('10.3')
  const [currentOverBalls, setCurrentOverBalls] = useState([
    { val: '4', color: '#00e676' },
    { val: '6', color: '#651fff' },
    { val: '1', color: '#3de0ff' },
    { val: '0', color: '#9aa8c7' },
  ])
  const [striker, setStriker] = useState({ name: 'Rohit', runs: 42, balls: 18 })
  const [nonStriker, setNonStriker] = useState({ name: 'Karan', runs: 18, balls: 10 })
  const [bowler, setBowler] = useState({ name: 'Vikram', figures: '1.3 - 0 - 21 - 1' })

  const handleKeyPress = (key) => {
    if (key.type === 'undo') {
      if (currentOverBalls.length > 0) {
        setCurrentOverBalls((b) => b.slice(0, -1))
      }
      return
    }

    if (key.type === 'wicket') {
      setWickets((w) => w + 1)
      setCurrentOverBalls((b) => [...b, { val: 'W', color: '#e10613' }])
      return
    }

    const runNum = parseInt(key.val)
    if (!isNaN(runNum)) {
      setRuns((r) => r + runNum)
      setStriker((s) => ({ ...s, runs: s.runs + runNum, balls: s.balls + 1 }))
      setCurrentOverBalls((b) => [
        ...b,
        {
          val: key.val,
          color: runNum === 4 ? '#00e676' : runNum === 6 ? '#651fff' : '#ffffff',
        },
      ])
    }
  }

  return (
    <Screen
      back
      title="Live Scorer"
      right={
        <button
          className="icon-btn"
          type="button"
          onClick={() => navigate('/app/match-tools')}
          title="Match Settings & Tools"
        >
          <Settings size={18} />
        </button>
      }
    >
      <div className="perfect-scorer-screen">
        {/* Top Header Card (Screen 2 of reference image) */}
        <div className="scorer-header-card">
          <div className="scorer-header-top">
            <span className="live-red-pill">LIVE</span>
            <span className="scorer-format-meta">T20 • {overs} (20)</span>
          </div>

          <div className="scorer-teams-hero">
            <div className="scorer-team-block">
              <div className="team-badge-circle" style={{ borderColor: 'var(--red)' }}>
                <span style={{ fontSize: 13, fontWeight: 900 }}>SH</span>
              </div>
              <strong className="team-abbr">Scoring XI</strong>
            </div>

            <div className="scorer-score-center">
              <h1 className="score-main">{runs}/{wickets}</h1>
              <div className="score-rates">
                <span>CRR 10.10</span>
                <span className="rate-divider">|</span>
                <span>RRR 8.25</span>
              </div>
            </div>

            <div className="scorer-team-block">
              <div className="team-badge-circle" style={{ borderColor: 'var(--cyan)' }}>
                <span style={{ fontSize: 13, fontWeight: 900 }}>WAR</span>
              </div>
              <strong className="team-abbr">Warriors XI</strong>
            </div>
          </div>
        </div>

        {/* Batsmen & Current Over Strip */}
        <div className="batsmen-table-card">
          <div className="batsman-row is-striker">
            <div className="batsman-name-group">
              <span className="striker-dot" />
              <strong>{striker.name}</strong>
            </div>
            <div className="batsman-score-figures">
              <strong>{striker.runs}</strong>
              <small>({striker.balls})</small>
            </div>
            <div className="batsman-ball-bubbles">
              <span className="b-bubble" style={{ background: '#00e676', color: '#000' }}>4</span>
              <span className="b-bubble" style={{ background: '#651fff' }}>6</span>
              <span className="b-bubble" style={{ background: '#37474f' }}>1</span>
              <span className="b-bubble" style={{ background: '#263238' }}>0</span>
            </div>
          </div>

          <div className="batsman-row">
            <div className="batsman-name-group">
              <span className="non-striker-dot" />
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{nonStriker.name}</span>
            </div>
            <div className="batsman-score-figures">
              <strong>{nonStriker.runs}</strong>
              <small>({nonStriker.balls})</small>
            </div>
            <div className="batsman-ball-bubbles">
              <span className="b-bubble" style={{ background: '#37474f' }}>1</span>
              <span className="b-bubble" style={{ background: '#37474f' }}>1</span>
              <span className="b-bubble" style={{ background: '#00e676', color: '#000' }}>4</span>
              <span className="b-bubble" style={{ background: '#651fff' }}>6</span>
            </div>
          </div>
        </div>

        {/* Bowler Details Strip */}
        <div className="bowler-strip-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="bowler-icon">⚾</span>
            <strong style={{ fontSize: 13, color: '#fff' }}>{bowler.name}</strong>
          </div>
          <span className="bowler-stats-val">{bowler.figures}</span>
        </div>

        {/* Keypad Grid (Screen 2: 0,1,2,3 / 4,6,W,Undo / Wide, No Ball, Bye, Leg Bye) */}
        <div className="keypad-matrix">
          {keyPadRows.map((row, rIdx) => (
            <div key={rIdx} className="keypad-row">
              {row.map((k, kIdx) => (
                <button
                  key={kIdx}
                  type="button"
                  className={`keypad-btn key-${k.type}`}
                  style={k.color ? { background: k.color } : {}}
                  onClick={() => handleKeyPress(k)}
                >
                  {k.label}
                </button>
              ))}
            </div>
          ))}

          {/* Undo + Change Bowler Actions */}
          <div className="keypad-row-dual">
            <button
              type="button"
              className="keypad-aux-btn"
              onClick={() => handleKeyPress({ type: 'undo' })}
            >
              <RotateCcw size={16} /> UNDO
            </button>
            <button
              type="button"
              className="keypad-aux-btn keypad-aux-btn--bowler"
              onClick={() => setBowler({ name: 'Karan Patel', figures: '0.0 - 0 - 0 - 0' })}
            >
              CHANGE BOWLER
            </button>
          </div>
        </div>

        {/* Bottom Fast Action Bar (DRS Review | Rain / DLS | Scorecard | More) */}
        <div className="scorer-footer-toolbar">
          <button
            type="button"
            className="footer-tool-btn is-drs"
            onClick={() => navigate('/app/highlights')}
          >
            <Video size={16} />
            <span>DRS Review</span>
          </button>

          <button
            type="button"
            className="footer-tool-btn is-dls"
            onClick={() => navigate('/app/match-tools')}
          >
            <CloudRain size={16} />
            <span>Rain / DLS</span>
          </button>

          <button
            type="button"
            className="footer-tool-btn"
            onClick={() => navigate('/app/match-tools')}
          >
            <FileText size={16} />
            <span>Scorecard</span>
          </button>

          <button
            type="button"
            className="footer-tool-btn"
            onClick={() => navigate('/app/match-tools')}
          >
            <MoreHorizontal size={16} />
            <span>More</span>
          </button>
        </div>
      </div>
    </Screen>
  )
}
