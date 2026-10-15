import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cpu, Eye, Layers, Scan, Zap } from 'lucide-react'
import Screen from '../components/Screen'

const STAGES = [
  { id: 'detect', icon: Scan,   label: 'Face Detection',      pct: 20, color: '#3de0ff' },
  { id: 'mesh',   icon: Layers, label: '3D Mesh Generation',  pct: 45, color: '#7c3aed' },
  { id: 'map',    icon: Eye,    label: 'Feature Mapping',      pct: 70, color: '#1d6dff' },
  { id: 'render', icon: Cpu,    label: 'Avatar Rendering',     pct: 90, color: '#e10613' },
  { id: 'done',   icon: Zap,    label: 'Avatar Ready!',        pct: 100, color: '#059669' },
]

const POINTS = [
  [50, 38], [44, 42], [56, 42], [42, 48], [58, 48],
  [50, 54], [45, 60], [55, 60], [50, 65], [47, 56],
  [53, 56], [40, 44], [60, 44], [46, 52], [54, 52],
  [50, 70], [43, 66], [57, 66],
]

export default function AvatarMapping() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [stageIdx, setStageIdx] = useState(0)
  const [visiblePts, setVisiblePts] = useState([])

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return Math.min(p + 0.55, 100)
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  // advance stage based on progress
  useEffect(() => {
    const idx = STAGES.findLastIndex((s) => progress >= s.pct)
    setStageIdx(Math.max(0, idx))
  }, [progress])

  // reveal landmark dots progressively
  useEffect(() => {
    const count = Math.floor((progress / 100) * POINTS.length)
    setVisiblePts(POINTS.slice(0, count))
  }, [progress])

  const stage = STAGES[stageIdx] || STAGES[0]

  return (
    <Screen title="AI Face Mapping" back padded={false}>
      <div className="mapping-screen">
        {/* 3D Head wireframe */}
        <div className="mapping-head-wrap">
          <div className="mapping-head-glow" style={{ background: `radial-gradient(circle, ${stage.color}33, transparent 60%)` }} />

          <svg className="mapping-head-svg" viewBox="0 0 100 120" fill="none">
            {/* Head outline */}
            <ellipse cx="50" cy="50" rx="30" ry="36"
              stroke={stage.color} strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5" />
            {/* Jaw */}
            <path d="M30 65 Q50 90 70 65"
              stroke={stage.color} strokeWidth="0.6" fill="none" opacity="0.4" />
            {/* Vertical meridian */}
            <line x1="50" y1="14" x2="50" y2="86"
              stroke={stage.color} strokeWidth="0.4" strokeDasharray="2 2" opacity="0.3" />
            {/* Horizontal guides */}
            {[38, 50, 62, 72].map((y) => (
              <line key={y} x1="22" y1={y} x2="78" y2={y}
                stroke={stage.color} strokeWidth="0.3" strokeDasharray="1.5 2" opacity="0.25" />
            ))}
            {/* Landmark points */}
            {visiblePts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.4"
                fill={stage.color} opacity="0.9"
                style={{ animation: 'dot-pop 0.3s ease' }}
              />
            ))}
            {/* Mesh lines between nearby dots */}
            {visiblePts.length > 4 && (
              <>
                <polyline
                  points={visiblePts.slice(0, 6).map(([x, y]) => `${x},${y}`).join(' ')}
                  stroke={stage.color} strokeWidth="0.3" fill="none" opacity="0.35"
                />
                <polyline
                  points={visiblePts.slice(6, 12).map(([x, y]) => `${x},${y}`).join(' ')}
                  stroke={stage.color} strokeWidth="0.3" fill="none" opacity="0.35"
                />
              </>
            )}
            {/* Neck */}
            <line x1="44" y1="84" x2="44" y2="105" stroke={stage.color} strokeWidth="0.5" opacity="0.3" />
            <line x1="56" y1="84" x2="56" y2="105" stroke={stage.color} strokeWidth="0.5" opacity="0.3" />
            <line x1="36" y1="105" x2="64" y2="105" stroke={stage.color} strokeWidth="0.5" opacity="0.3" />
          </svg>

          {/* Rotating ring */}
          <div className="mapping-orbit">
            <div className="mapping-orbit__dot" />
          </div>

          {/* Scan line */}
          <div className="mapping-scanline" style={{ '--scan-color': stage.color }} />
        </div>

        {/* Stage label */}
        <div className="mapping-stage">
          <div className="mapping-stage__icon" style={{ color: stage.color }}>
            <stage.icon size={20} />
          </div>
          <span className="mapping-stage__label" style={{ color: stage.color }}>
            {stage.label}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mapping-progress-wrap">
          <div className="mapping-progress-bar">
            <div
              className="mapping-progress-fill"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${stage.color}, ${stage.color}cc)` }}
            />
          </div>
          <span className="mapping-pct">{Math.round(progress)}%</span>
        </div>

        {/* Stage checklist */}
        <div className="mapping-checklist">
          {STAGES.map((s, i) => {
            const Icon = s.icon
            const done = i < stageIdx
            const active = i === stageIdx
            return (
              <div key={s.id} className={`mapping-check ${done ? 'is-done' : ''} ${active ? 'is-active' : ''}`}>
                <div className="mapping-check__dot" style={{ '--dot-color': s.color }}>
                  {done ? '✓' : active ? <Icon size={12} /> : ''}
                </div>
                <span>{s.label}</span>
              </div>
            )
          })}
        </div>

        {/* CTA when done */}
        {progress >= 100 && (
          <div className="mapping-done-cta">
            <button
              className="btn btn--primary"
              onClick={() => navigate('/app/avatar/viewer')}
              style={{ animation: 'fade-up 0.4s ease' }}
            >
              View Your 3D Avatar →
            </button>
          </div>
        )}
      </div>
    </Screen>
  )
}
