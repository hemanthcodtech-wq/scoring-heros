import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Flame,
  Shield,
  Sparkles,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import Screen from '../components/Screen'
import { PLAYER_STATS_SYSTEM } from '../data/playerStatsData'

export default function PlayerStatsHub() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all') // all | batting | career

  const filteredPoints = PLAYER_STATS_SYSTEM.points.filter((p) => {
    if (filter === 'batting') return [1, 3, 4, 6, 7].includes(p.num)
    if (filter === 'career') return [2, 5, 8, 9, 10].includes(p.num)
    return true
  })

  return (
    <Screen title="Player Stats System" back padded={false}>
      <div className="ps-hub">
        <div className="ps-hero">
          <div className="ps-hero__glow" />
          <div className="ps-quick-stats">
            <div className="ps-quick-stat">
              <span className="ps-quick-stat__num">14,696</span>
              <span className="ps-quick-stat__label">Total Runs</span>
            </div>
            <div className="ps-quick-stat__div" />
            <div className="ps-quick-stat">
              <span className="ps-quick-stat__num">43.64</span>
              <span className="ps-quick-stat__label">Career Avg</span>
            </div>
            <div className="ps-quick-stat__div" />
            <div className="ps-quick-stat">
              <span className="ps-quick-stat__num">139.5</span>
              <span className="ps-quick-stat__label">Strike Rate</span>
            </div>
            <div className="ps-quick-stat__div" />
            <div className="ps-quick-stat">
              <span className="ps-quick-stat__num">18</span>
              <span className="ps-quick-stat__label">50s/100s</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="ps-filter-bar">
          <button
            className={`ps-filter-chip ${filter === 'all' ? 'is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All 10 Systems
          </button>
          <button
            className={`ps-filter-chip ${filter === 'batting' ? 'is-active' : ''}`}
            onClick={() => setFilter('batting')}
          >
            Batting Metrics
          </button>
          <button
            className={`ps-filter-chip ${filter === 'career' ? 'is-active' : ''}`}
            onClick={() => setFilter('career')}
          >
            Career & Matches
          </button>
        </div>

        {/* Redesigned Premium Cards */}
        <div className="ps-grid">
          {filteredPoints.map((p) => {
            const isRed = p.num === 1 || p.num === 4 || p.num === 7 || p.num === 10
            const accentColor = isRed ? '#e10613' : '#3de0ff'
            return (
              <button
                key={p.id}
                className="ps-modern-card"
                onClick={() => navigate(`/app/stats/${p.id}`)}
                style={{ '--ps-accent': accentColor }}
              >
                {/* Number Badge */}
                <div className="ps-modern-card__num-badge">
                  {p.num}
                </div>

                {/* Content */}
                <div className="ps-modern-card__body">
                  <div className="ps-modern-card__header">
                    <strong className="ps-modern-card__title">{p.title}</strong>
                    <ChevronRight size={18} className="ps-modern-card__chevron" />
                  </div>

                  <div className="ps-modern-card__row">
                    <div className="ps-modern-card__metric">
                      <span className="ps-modern-card__val">{p.mainValue}</span>
                      <span className="ps-modern-card__unit">{p.unit}</span>
                    </div>

                    {/* Smooth glowing SVG sparkline */}
                    <div className="ps-modern-card__chart">
                      <svg viewBox="0 0 90 22" width="90" height="22" preserveAspectRatio="none">
                        <polyline
                          fill="none"
                          stroke={accentColor}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={p.chartPoints
                            .map((pt, i) => `${(i / (p.chartPoints.length - 1)) * 86 + 2},${22 - (pt.y / 100) * 18}`)
                            .join(' ')}
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Micro KPIs */}
                  <div className="ps-modern-card__stats">
                    {p.stats.map((st, i) => (
                      <span key={i} className="ps-modern-card__stat-item">
                        <span className="ps-modern-card__stat-label">{st.label}:</span>
                        <strong className="ps-modern-card__stat-val" style={{ color: st.highlight }}>{st.value}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="ps-hub__footer">
          <div className="ps-hub__footer-card">
            <div className="ps-hub__footer-icon">
              <Shield size={22} color="#3de0ff" />
            </div>
            <div>
              <strong>Verified Cricket Engine</strong>
              <p>
                Strict error prevention · Tamper-proof logs · Cryptographic scorecard verification
              </p>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  )
}
