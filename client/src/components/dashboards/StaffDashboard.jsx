import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ClipboardCheck,
  Clock,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  Shield,
  Activity,
  Download,
  Award,
} from 'lucide-react'

export default function StaffDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  const [isPunchedIn, setIsPunchedIn] = useState(true)
  const [shiftSeconds, setShiftSeconds] = useState(14850) // e.g. 4h 7m
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Calibrate Digital Live Scorer Tablet', done: true },
    { id: 't2', title: 'Verify Match Official Team Sheet Signatures', done: true },
    { id: 't3', title: 'Confirm DRS Hawk-Eye Camera Alignments', done: false },
    { id: 't4', title: 'Post-Match Scorecard Digital Signoff', done: false },
  ])

  useEffect(() => {
    let timer
    if (isPunchedIn) {
      timer = setInterval(() => setShiftSeconds((s) => s + 1), 1000)
    }
    return () => clearInterval(timer)
  }, [isPunchedIn])

  function formatDuration(sec) {
    const hrs = Math.floor(sec / 3600)
    const mins = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return `${hrs}h ${mins}m ${s < 10 ? '0' : ''}${s}s`
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  return (
    <div className="sh-dashboard-layout">
      {/* Staff Hero Card */}
      <section className="sh-dash-hero-card sh-dash-hero-card--staff">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(171, 71, 188, 0.2)', borderColor: '#ab47bc' }}>
              <ClipboardCheck size={24} color="#ab47bc" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{user.nickname}</h2>
                <span className="sh-badge-chip" style={{ color: '#ab47bc', borderColor: '#ab47bc55' }}>
                  {details.staffId || 'SH-STF-088'}
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Function: <strong>{details.staffRole || 'Official Match Scorer & Tech Desk'}</strong>
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Assigned: {details.assignedVenue || 'Marina International Arena'} • City: {user.city}
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#ab47bc55' }}>
            <strong style={{ color: '#ab47bc' }}>{details.shiftsDoneThisMonth || 18}</strong>
            <span>SHIFTS</span>
          </div>
        </div>

        {/* Biometric Punch Clock (Core requirement) */}
        <div style={{ marginTop: 14, padding: 12, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(171,71,188,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: isPunchedIn ? '#00e676' : '#ff2d3a' }} />
                <span style={{ fontSize: 12, fontWeight: 'bold', color: isPunchedIn ? '#00e676' : '#ff2d3a' }}>
                  {isPunchedIn ? 'CURRENTLY ON DUTY (PUNCHED IN)' : 'OFF DUTY'}
                </span>
              </div>
              <small style={{ color: 'var(--muted)', fontSize: 11, display: 'block', marginTop: 2 }}>
                Shift Timer: <strong style={{ color: '#f4f7ff' }}>{formatDuration(shiftSeconds)}</strong>
              </small>
            </div>

            <button
              type="button"
              className="btn btn--sm"
              style={{
                width: 'auto',
                background: isPunchedIn ? '#ff2d3a' : '#00e676',
                color: '#fff',
                fontSize: 11,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => setIsPunchedIn(!isPunchedIn)}
            >
              {isPunchedIn ? 'Punch Out' : 'Punch In'}
            </button>
          </div>
        </div>

        {/* Payroll Status Bar */}
        <div className="sh-player-stats-bar" style={{ marginTop: 12 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>{details.pendingPayroll || '₹28,500'}</strong>
            <span>Salary Pending</span>
          </div>
          <div className="sh-stat-box">
            <strong>100%</strong>
            <span>Punctuality</span>
          </div>
          <div className="sh-stat-box">
            <strong>6h / Day</strong>
            <span>Avg Shift</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#ab47bc' }}>Tier 1</strong>
            <span>Grade</span>
          </div>
        </div>
      </section>

      {/* Quick Action Shortcuts (Allocated Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/scorer')}>
          <div className="sh-action-icon" style={{ background: 'rgba(225,6,19,0.15)', color: '#ff2d3a' }}>
            <Activity size={18} />
          </div>
          <span>Live Scorer</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/match-tools')}>
          <div className="sh-action-icon" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
            <Shield size={18} />
          </div>
          <span>DRS Tools</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/matches')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,145,0,0.15)', color: '#ff9100' }}>
            <Calendar size={18} />
          </div>
          <span>My Matches</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/alerts')}>
          <div className="sh-action-icon" style={{ background: 'rgba(171,71,188,0.15)', color: '#ab47bc' }}>
            <ClipboardCheck size={18} />
          </div>
          <span>Duty Alerts</span>
        </button>
      </div>

      {/* Assigned Duties & Shift Checklist (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ClipboardCheck size={18} color="#ab47bc" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Assigned Duty Checklist</h3>
          </div>
          <span className="pill" style={{ background: 'rgba(171,71,188,0.15)', color: '#ab47bc' }}>
            MATCH #14
          </span>
        </header>

        <p style={{ fontSize: 12, color: 'var(--muted)', margin: '0 0 10px' }}>
          Duties for <strong>Scoring XI vs Marina Strikers</strong> at 7:30 PM (Main Pavilion Desk)
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                background: task.done ? 'rgba(0,230,118,0.05)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${task.done ? 'rgba(0,230,118,0.2)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 8,
                cursor: 'pointer',
              }}
              role="button"
              tabIndex={0}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {}}
                style={{ width: 16, height: 16, accentColor: '#00e676', cursor: 'pointer' }}
              />
              <span
                style={{
                  fontSize: 13,
                  textDecoration: task.done ? 'line-through' : 'none',
                  color: task.done ? 'var(--muted)' : 'var(--text)',
                }}
              >
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* DRS Third Umpire Decision Desk (Match Tools Allotment) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Shield size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>DRS Hawk-Eye & TV Umpire Console</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/match-tools')}>
            Tools Lab →
          </button>
        </header>
        <div style={{ padding: 10, background: 'rgba(61,224,255,0.03)', borderRadius: 10, border: '1px solid rgba(61,224,255,0.15)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, textAlign: 'center', marginBottom: 8 }}>
            <div style={{ padding: 6, background: 'rgba(0,230,118,0.1)', borderRadius: 6 }}>
              <span style={{ fontSize: 9, color: 'var(--muted)', display: 'block' }}>PITCHING</span>
              <strong style={{ fontSize: 11, color: '#00e676' }}>IN LINE</strong>
            </div>
            <div style={{ padding: 6, background: 'rgba(0,230,118,0.1)', borderRadius: 6 }}>
              <span style={{ fontSize: 9, color: 'var(--muted)', display: 'block' }}>IMPACT</span>
              <strong style={{ fontSize: 11, color: '#00e676' }}>IN LINE</strong>
            </div>
            <div style={{ padding: 6, background: 'rgba(255,45,58,0.1)', borderRadius: 6 }}>
              <span style={{ fontSize: 9, color: 'var(--muted)', display: 'block' }}>WICKETS</span>
              <strong style={{ fontSize: 11, color: '#ff2d3a' }}>HITTING</strong>
            </div>
          </div>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            style={{ width: '100%', background: '#ff2d3a', color: '#fff', fontWeight: 'bold' }}
            onClick={() => navigate('/app/match-tools')}
          >
            Review LBW Decision: Signal OUT
          </button>
        </div>
      </section>

      {/* Official Live Match Scorer Integration */}
      <section className="panel" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => navigate('/app/scorer')}>
        <header style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={17} color="#ff2d3a" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Official Live Match Scorer Console</h3>
          </div>
          <span className="text-link">Open Scorer →</span>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
          Certified ball-by-ball scoring input for boundary checks, batsman strike rates, and bowler spell validation.
        </p>
      </section>
    </div>
  )
}
