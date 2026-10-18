import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Sun,
  Moon,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Wrench,
  Megaphone,
  Activity,
} from 'lucide-react'

export default function GroundDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  // Slot calendar for ground
  const [slots, setSlots] = useState([
    { id: 's1', time: '06:00 AM - 09:00 AM', pitch: 'Turf Pitch 1 (Red Soil)', team: 'Scoring Heroes Academy', status: 'Booked', paid: true, floodlight: false },
    { id: 's2', time: '09:30 AM - 12:30 PM', pitch: 'Turf Pitch 2 (Black Soil)', team: 'Marina Corporate Cup', status: 'Booked', paid: true, floodlight: false },
    { id: 's3', time: '02:00 PM - 05:00 PM', pitch: 'Turf Pitch 1 (Red Soil)', team: 'Maintenance & Rolling', status: 'Maintenance', paid: false, floodlight: false },
    { id: 's4', time: '06:00 PM - 09:30 PM', pitch: 'Main Stadium Pitch', team: 'Chennai Street Cup (T20)', status: 'Booked', paid: true, floodlight: true },
    { id: 's5', time: '10:00 PM - 12:30 AM', pitch: 'Astroturf Box Net', team: 'Available for Slot Booking', status: 'Available', paid: false, floodlight: true },
  ])

  function bookAvailableSlot(id) {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: 'Booked', team: 'Walk-In Customer XI', paid: true } : s
      )
    )
  }

  return (
    <div className="sh-dashboard-layout">
      {/* Ground Hero Card */}
      <section className="sh-dash-hero-card sh-dash-hero-card--ground">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(0, 176, 255, 0.2)', borderColor: '#00b0ff' }}>
              <MapPin size={24} color="#00b0ff" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{details.venueName || 'Marina International Arena & Turfs'}</h2>
                <span className="sh-badge-chip" style={{ color: '#00b0ff', borderColor: '#00b0ff55' }}>
                  VENUE VERIFIED
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Manager: <strong>{user.nickname}</strong> • {details.pitchesCount || 3} Standard Pitches
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Location: {user.city} • Floodlights: {details.floodlights || '800-Lux Night Match Ready'}
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#00b0ff55' }}>
            <strong style={{ color: '#00b0ff' }}>{details.weeklyRevenue || '₹1.48L'}</strong>
            <span>WEEK REVENUE</span>
          </div>
        </div>

        {/* Ground Overview Metrics */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#00b0ff' }}>{details.todayBookings || 8}</strong>
            <span>Today Slots</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>92%</strong>
            <span>Occupancy</span>
          </div>
          <div className="sh-stat-box">
            <strong>2</strong>
            <span>Active Leases</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#ffc83d' }}>₹1,800</strong>
            <span>Hourly Tariff</span>
          </div>
        </div>
      </section>

      {/* Quick Action Shortcuts (Allocated Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/grounds')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,176,255,0.15)', color: '#00b0ff' }}>
            <Calendar size={18} />
          </div>
          <span>Turf Slots</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/matches')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,145,0,0.15)', color: '#ff9100' }}>
            <Layers size={18} />
          </div>
          <span>Match Fixtures</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/sponsorship')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,214,0,0.15)', color: '#ffd600' }}>
            <Megaphone size={18} />
          </div>
          <span>Stadium Ads</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/partners')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <Wrench size={18} />
          </div>
          <span>Turf Gear</span>
        </button>
      </div>

      {/* Pitch & Turf Slot Booking Schedule (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Calendar size={18} color="#00b0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Today's Turf & Pitch Slots</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/grounds')}>
            Full calendar →
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {slots.map((s) => (
            <div
              key={s.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                background:
                  s.status === 'Booked'
                    ? 'rgba(0,176,255,0.06)'
                    : s.status === 'Available'
                    ? 'rgba(0,230,118,0.06)'
                    : 'rgba(255,200,61,0.06)',
                border: `1px solid ${
                  s.status === 'Booked'
                    ? 'rgba(0,176,255,0.2)'
                    : s.status === 'Available'
                    ? 'rgba(0,230,118,0.2)'
                    : 'rgba(255,200,61,0.2)'
                }`,
                borderRadius: 10,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <strong style={{ fontSize: 13 }}>{s.time}</strong>
                  {s.floodlight && (
                    <span style={{ fontSize: 10, color: '#ffd600', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Moon size={11} /> Floodlight
                    </span>
                  )}
                </div>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>
                  {s.pitch} • <strong style={{ color: '#f4f7ff' }}>{s.team}</strong>
                </small>
              </div>

              <div>
                {s.status === 'Available' ? (
                  <button
                    type="button"
                    className="btn btn--secondary btn--sm"
                    style={{ fontSize: 11, background: '#00e676', color: '#020617', fontWeight: 'bold' }}
                    onClick={() => bookAvailableSlot(s.id)}
                  >
                    + Book Slot
                  </button>
                ) : (
                  <span
                    className="pill"
                    style={{
                      background: s.status === 'Booked' ? 'rgba(0,176,255,0.15)' : 'rgba(255,200,61,0.15)',
                      color: s.status === 'Booked' ? '#00b0ff' : '#ffc83d',
                      fontSize: 10,
                    }}
                  >
                    {s.status === 'Booked' ? 'CONFIRMED' : 'MAINTENANCE'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pitch Maintenance & Curator Log */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wrench size={17} color="#ffd600" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Curator Log & Turf Maintenance</h3>
          </div>
          <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            {details.maintenanceStatus || 'Pitch 1 Match Ready'}
          </span>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
            <span>Heavy Roller on Pitch 1 (Main Stadium)</span>
            <strong style={{ color: '#00e676' }}>Done (2 hrs)</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--line)' }}>
            <span>Boundary Rope & 30-Yard Circle Spray</span>
            <strong style={{ color: '#00e676' }}>Completed</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            <span>Floodlight Tower Generator Fuel (800-Lux)</span>
            <strong style={{ color: '#3de0ff' }}>92% Full</strong>
          </div>
        </div>
      </section>

      {/* Stadium Boundary Ads & Commercial Billboard Slots */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Megaphone size={17} color="#ffd600" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Boundary Perimeter Billboard Slots</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/sponsorship')}>
            Manage Ads →
          </button>
        </header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'rgba(255,214,0,0.04)', borderRadius: 8, border: '1px solid rgba(255,214,0,0.15)' }}>
          <div>
            <strong style={{ fontSize: 13, color: '#f4f7ff' }}>4 of 6 Perimeter Boards Occupied</strong>
            <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>Active Advertisers: Velocity Nutrition, Apex Willow</small>
          </div>
          <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>₹48,000 / mo</span>
        </div>
      </section>
    </div>
  )
}
