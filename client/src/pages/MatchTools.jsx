import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Video,
  CloudRain,
  FileText,
  Mic,
  PieChart,
  BarChart3,
  Users,
  TrendingUp,
  Award,
  Settings,
  Share2,
  ChevronRight,
  Shield,
  Activity,
  Flame,
  CheckCircle2,
} from 'lucide-react'
import Screen from '../components/Screen'
import { liveMatch } from '../data/demo'

export default function MatchTools() {
  const navigate = useNavigate()
  const [selectedTool, setSelectedTool] = useState(null)
  const [shareSuccess, setShareSuccess] = useState(false)

  const tools = [
    {
      id: 'drs',
      title: 'DRS',
      sub: 'UltraEdge & Ball Tracker',
      icon: Video,
      color: '#e10613',
      border: 'rgba(225,6,19,0.4)',
      bg: 'linear-gradient(135deg, rgba(225,6,19,0.3), rgba(120,6,10,0.5))',
      action: () => navigate('/app/highlights'),
    },
    {
      id: 'dls',
      title: 'DLS',
      sub: 'Rain / Par Target Calc',
      icon: CloudRain,
      color: '#3de0ff',
      border: 'rgba(61,224,255,0.4)',
      bg: 'linear-gradient(135deg, rgba(29,109,255,0.3), rgba(6,30,80,0.5))',
      action: () => setSelectedTool('dls'),
    },
    {
      id: 'scorecard',
      title: 'Live Scorecard',
      sub: 'Detailed Bat / Bowl figures',
      icon: FileText,
      color: '#f4f7ff',
      action: () => navigate('/app/scorer'),
    },
    {
      id: 'commentary',
      title: 'Commentary',
      sub: 'AI Multilingual Voice',
      icon: Mic,
      color: '#3de0ff',
      action: () => navigate('/app/commentary'),
    },
    {
      id: 'wagon',
      title: 'Wagon Wheel',
      sub: 'Radial boundary dispersion',
      icon: PieChart,
      color: '#ffd600',
      action: () => setSelectedTool('wagon'),
    },
    {
      id: 'manhattan',
      title: 'Manhattan',
      sub: 'Over-by-over run analysis',
      icon: BarChart3,
      color: '#00e676',
      action: () => setSelectedTool('manhattan'),
    },
    {
      id: 'partnerships',
      title: 'Partnerships',
      sub: 'Current & historic stands',
      icon: Users,
      color: '#f4f7ff',
      action: () => setSelectedTool('partnerships'),
    },
    {
      id: 'runrate',
      title: 'Run Rate',
      sub: 'Worm chart & projected scores',
      icon: TrendingUp,
      color: '#ff8a93',
      action: () => setSelectedTool('runrate'),
    },
    {
      id: 'playerstats',
      title: 'Player Stats',
      sub: 'Impact & career metrics',
      icon: Award,
      color: '#3de0ff',
      action: () => navigate('/app/stats'),
    },
    {
      id: 'settings',
      title: 'Match Settings',
      sub: 'Overs, wide/no-ball rules',
      icon: Settings,
      color: '#9aa8c7',
      action: () => setSelectedTool('settings'),
    },
    {
      id: 'streaming',
      title: 'Live Streaming',
      sub: 'Video feed & 4K broadcast',
      icon: Video,
      color: '#ff2d3a',
      action: () => navigate('/app/highlights'),
    },
    {
      id: 'share',
      title: 'Share Live',
      sub: 'Social links & broadcast card',
      icon: Share2,
      color: '#00e676',
      action: () => {
        setShareSuccess(true)
        setTimeout(() => setShareSuccess(false), 3000)
      },
    },
  ]

  return (
    <Screen back title="Match Tools" subtitle={`${liveMatch.batting} vs ${liveMatch.bowling}`}>
      <div className="match-tools-page">
        {shareSuccess && (
          <div className="match-tools-toast">
            <CheckCircle2 size={16} color="#00e676" />
            <span>Live match scorecard link copied to clipboard & broadcasted!</span>
          </div>
        )}

        {/* 12 Grid of Match Tools (Matching Screen 3 of the user's design image) */}
        <div className="match-tools-grid">
          {tools.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                type="button"
                className="match-tool-card"
                style={t.bg ? { background: t.bg, borderColor: t.border } : {}}
                onClick={t.action}
              >
                <div className="match-tool-icon-wrap" style={{ color: t.color }}>
                  <Icon size={24} />
                </div>
                <strong className="match-tool-title">{t.title}</strong>
                <span className="match-tool-sub">{t.sub}</span>
              </button>
            )
          })}
        </div>

        {/* Modal / Preview drawer when a specific analytics tool is tapped */}
        {selectedTool === 'wagon' && (
          <div className="match-tool-drawer">
            <div className="tool-drawer-header">
              <strong>Radial Wagon Wheel — Rohit (42*)</strong>
              <button className="icon-btn-ghost" onClick={() => setSelectedTool(null)}>✕</button>
            </div>
            <div className="wagon-wheel-preview">
              <svg viewBox="0 0 200 200" width="160" height="160">
                <circle cx="100" cy="100" r="95" fill="#0d2818" stroke="#2e7d32" strokeWidth="2" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                <rect x="94" y="80" width="12" height="40" fill="#ffd54f" rx="2" />
                {/* Shots */}
                <line x1="100" y1="100" x2="30" y2="40" stroke="#ffd600" strokeWidth="2" />
                <line x1="100" y1="100" x2="40" y2="120" stroke="#ff3b30" strokeWidth="2.5" />
                <line x1="100" y1="100" x2="160" y2="30" stroke="#ff3b30" strokeWidth="2.5" />
                <line x1="100" y1="100" x2="175" y2="90" stroke="#00e676" strokeWidth="2" />
                <line x1="100" y1="100" x2="130" y2="170" stroke="#00e676" strokeWidth="2" />
              </svg>
              <div className="wagon-legend">
                <span>🔴 Boundaries (4s & 6s)</span>
                <span>🟡 Twos & Threes</span>
                <span>🟢 Singles</span>
              </div>
            </div>
          </div>
        )}

        {selectedTool === 'dls' && (
          <div className="match-tool-drawer">
            <div className="tool-drawer-header">
              <strong>DLS Par Score Calculator</strong>
              <button className="icon-btn-ghost" onClick={() => setSelectedTool(null)}>✕</button>
            </div>
            <div className="dls-info-box">
              <p>Current Over: <strong>10.3 / 20</strong></p>
              <p>Actual Score: <strong>106 / 3</strong></p>
              <p>DLS Par Score (at 10.3): <strong style={{ color: '#00e676', fontSize: 16 }}>94</strong></p>
              <span className="dls-lead-tag">Scoring XI leads by +12 runs on DLS</span>
            </div>
          </div>
        )}

        {selectedTool === 'manhattan' && (
          <div className="match-tool-drawer">
            <div className="tool-drawer-header">
              <strong>Manhattan Over-by-Over</strong>
              <button className="icon-btn-ghost" onClick={() => setSelectedTool(null)}>✕</button>
            </div>
            <div className="manhattan-chart">
              {[8, 14, 6, 12, 18, 9, 7, 15, 8, 9].map((runs, idx) => (
                <div key={idx} className="manhattan-col">
                  <span className="manhattan-bar-val">{runs}</span>
                  <div className="manhattan-bar" style={{ height: `${runs * 3.5}px` }} />
                  <span className="manhattan-bar-lbl">{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
