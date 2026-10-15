import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Share2,
  Calendar,
  Award,
  Flame,
  Clock,
  Filter,
} from 'lucide-react'
import Screen from '../components/Screen'
import { PLAYER_STATS_SYSTEM } from '../data/playerStatsData'

export default function PlayerStatDetail() {
  const { statId } = useParams()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All Matches')
  const [activePointIdx, setActivePointIdx] = useState(null)
  const [showFullPerf, setShowFullPerf] = useState(false)

  const currentIndex = PLAYER_STATS_SYSTEM.points.findIndex((p) => p.id === statId)
  const point = PLAYER_STATS_SYSTEM.points[currentIndex !== -1 ? currentIndex : 0]
  const prevPoint = currentIndex > 0 ? PLAYER_STATS_SYSTEM.points[currentIndex - 1] : null
  const nextPoint = currentIndex < PLAYER_STATS_SYSTEM.points.length - 1 ? PLAYER_STATS_SYSTEM.points[currentIndex + 1] : null

  // SVG Chart path calculation
  const chartCoordinates = useMemo(() => {
    const width = 320
    const height = 110
    const paddingX = 16
    const paddingY = 16
    const usableW = width - paddingX * 2
    const usableH = height - paddingY * 2

    const points = point.chartPoints.map((pt, i) => {
      const x = paddingX + (i / (point.chartPoints.length - 1)) * usableW
      const y = height - paddingY - (pt.y / 100) * usableH
      return { x, y, val: pt.y, label: pt.label }
    })

    const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '')
    return { points, pathD, width, height }
  }, [point])

  return (
    <Screen
      title={point.title}
      back
      right={
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            className="icon-btn"
            onClick={() => prevPoint && navigate(`/app/stats/${prevPoint.id}`)}
            disabled={!prevPoint}
            style={{ opacity: prevPoint ? 1 : 0.3 }}
            title="Previous System"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="icon-btn"
            onClick={() => nextPoint && navigate(`/app/stats/${nextPoint.id}`)}
            disabled={!nextPoint}
            style={{ opacity: nextPoint ? 1 : 0.3 }}
            title="Next System"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      }
      padded={false}
    >
      <div className="stat-screen">
        {/* Subheader category */}
        <div className="stat-screen__head">
          <span className="stat-screen__category">STATISTICS / ANALYTICS</span>
          <h2 className="stat-screen__title">{point.title}</h2>
        </div>

        {/* Big Interactive Card */}
        <div className="stat-main-card">
          <div className="stat-main-card__meta">
            <span className="stat-main-card__label">{point.cardTitle}</span>
            <span className="stat-main-card__sub">CAREER PERFORMANCE</span>
          </div>

          {/* Big Hero Metric */}
          <div className="stat-main-card__metric">
            <span className="stat-main-card__num">{point.mainValue}</span>
            <span className="stat-main-card__unit">{point.unit}</span>
          </div>

          {/* Interactive Line Chart */}
          <div className="stat-chart-container">
            <svg
              viewBox={`0 0 ${chartCoordinates.width} ${chartCoordinates.height}`}
              className="stat-chart-svg"
            >
              <defs>
                <linearGradient id={`chart-grad-${point.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3de0ff" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#3de0ff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d={`${chartCoordinates.pathD} L ${chartCoordinates.width - 16} ${chartCoordinates.height} L 16 ${chartCoordinates.height} Z`}
                fill={`url(#chart-grad-${point.id})`}
              />

              <path
                d={chartCoordinates.pathD}
                fill="none"
                stroke="#3de0ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {chartCoordinates.points.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r={activePointIdx === i ? 6 : 4.5}
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="1.8"
                  style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                  onClick={() => setActivePointIdx(i)}
                />
              ))}
            </svg>

            {activePointIdx !== null && (
              <div
                className="stat-tooltip"
                style={{
                  left: `${(chartCoordinates.points[activePointIdx].x / chartCoordinates.width) * 100}%`,
                  top: `${chartCoordinates.points[activePointIdx].y - 28}px`,
                }}
              >
                Match {activePointIdx + 1}: <strong>{chartCoordinates.points[activePointIdx].val}</strong>
              </div>
            )}
          </div>

          {/* 3 KPI Sub-metrics */}
          <div className="stat-kpi-row">
            {point.stats.map((st, i) => (
              <div key={i} className="stat-kpi-box">
                <strong className="stat-kpi-val" style={{ color: st.highlight }}>
                  {st.value}
                </strong>
                <span className="stat-kpi-label">{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Performance Primary CTA */}
        <div className="stat-action-wrap">
          <button
            className="btn btn--primary stat-cta-btn"
            onClick={() => setShowFullPerf(!showFullPerf)}
          >
            {showFullPerf ? 'Hide Performance Breakdown ▲' : 'View Full Performance'}
          </button>
        </div>

        {/* Expandable Match-by-Match Breakdown */}
        {showFullPerf && (
          <div className="stat-breakdown-card">
            <div className="stat-breakdown-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <TrendingUp size={16} color="var(--cyan)" />
                <strong>Match-by-Match Performance</strong>
              </div>
              <span className="muted" style={{ fontSize: 11 }}>Last 8 innings</span>
            </div>

            <div className="stat-breakdown-list">
              {point.chartPoints.map((pt, i) => (
                <div key={i} className="stat-breakdown-item">
                  <div className="stat-breakdown-left">
                    <span className="stat-breakdown-dot" />
                    <div>
                      <span className="stat-breakdown-match">Match {i + 1} • League Championship</span>
                      <small className="stat-breakdown-sub">Chennai Turf • Verified Scorecard</small>
                    </div>
                  </div>
                  <div className="stat-breakdown-right">
                    <strong>{pt.y}</strong>
                    <span className="stat-breakdown-unit">{point.unit.toLowerCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick System Navigation Pills */}
        <div className="stat-quick-nav">
          <span className="stat-quick-nav__title">Quick Switch Systems</span>
          <div className="stat-quick-nav__list">
            {PLAYER_STATS_SYSTEM.points.map((p) => (
              <button
                key={p.id}
                className={`stat-pill-btn ${p.id === statId ? 'is-active' : ''}`}
                onClick={() => {
                  setActivePointIdx(null)
                  setShowFullPerf(false)
                  navigate(`/app/stats/${p.id}`)
                }}
              >
                {p.num}. {p.cardTitle}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}
