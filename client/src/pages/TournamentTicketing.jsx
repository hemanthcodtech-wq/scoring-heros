import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy,
  Ticket,
  QrCode,
  Users,
  Calendar,
  Building,
  TrendingUp,
  DollarSign,
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  FileText,
  BarChart3,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function TournamentTicketing() {
  const navigate = useNavigate()

  // 1 to 12 Systems
  const [activeSystem, setActiveSystem] = useState(1)
  const [selectedTier, setSelectedTier] = useState('standard')
  const [toastMsg, setToastMsg] = useState('')

  // Live crowd numbers
  const [crowd, setCrowd] = useState({
    present: 3842,
    capacity: 5000,
    stands: [
      { name: 'NORTH STAND', pct: 84 },
      { name: 'SOUTH STAND', pct: 72 },
      { name: 'EAST STAND', pct: 91 },
      { name: 'WEST PAVILION', pct: 60 },
    ],
  })

  // Ticket tiers
  const ticketTiers = [
    { id: 'standard', name: 'STANDARD TICKET', price: 199, access: 'General Stand Entry' },
    { id: 'premium', name: 'PREMIUM TICKET', price: 499, access: 'Covered Wing & Soft Drinks' },
    { id: 'vip', name: 'VIP PASS', price: 999, access: 'Pavilion Lounge & Hospitality' },
  ]

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // 12 Systems Meta (Strictly NO "FEATURE 15" tags)
  const systems = [
    { id: 1, title: 'Tournament Creation & Configuration', short: 'Tournament Setup' },
    { id: 2, title: 'Stadium & Ground Rental', short: 'Stadium Rental' },
    { id: 3, title: 'Lease-Based Ground Usage', short: 'Ground Lease' },
    { id: 4, title: 'Match Scheduling & Slot Allocation', short: 'Match Scheduling' },
    { id: 5, title: 'Ticket Creation & Pricing', short: 'Ticket Pricing' },
    { id: 6, title: 'Online Ticket Booking', short: 'Online Booking' },
    { id: 7, title: 'QR Code Entry System', short: 'QR Entry Pass' },
    { id: 8, title: 'Live Attendance & Crowd Management', short: 'Crowd Attendance' },
    { id: 9, title: 'Revenue Split & Settlement', short: 'Revenue Split' },
    { id: 10, title: 'Sponsorship & Branding Integration', short: 'Sponsorships' },
    { id: 11, title: 'Tournament Analytics & Reporting', short: 'Analytics & Reports' },
    { id: 12, title: 'Multi-Level Tournament Support', short: 'Multi-Level Format' },
  ]

  const curSystem = systems.find((s) => s.id === activeSystem) || systems[0]

  return (
    <Screen
      back
      title="Tournament & Ticketing"
      subtitle="Event Entry & Revenue Control"
    >
      <div className="tournament-ops-container">
        {toastMsg && (
          <div className="match-tools-toast" style={{ margin: '0 0 4px' }}>
            <CheckCircle2 size={16} color="#00e676" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* 12 Systems Selector Ribbon */}
        <div className="academy-ops-ribbon">
          {systems.map((sys) => (
            <button
              key={sys.id}
              type="button"
              className={`ops-ribbon-btn ${activeSystem === sys.id ? 'is-active' : ''}`}
              onClick={() => setActiveSystem(sys.id)}
            >
              <span className="ops-num-badge">{sys.id}</span>
              <span>{sys.short}</span>
            </button>
          ))}
        </div>

        {/* Phone Mockup Screen */}
        <div className="ground-screen-card">
          {/* Top Bar inside Screen */}
          <div className="phone-top-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #ff3b50, #b0211a)',
                  display: 'grid',
                  placeItems: 'center',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: 13,
                }}
              >
                {activeSystem}
              </div>
              <div>
                <h2 className="phone-system-title">{curSystem.title}</h2>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>
                  Tournament Control & Entry System
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className="icon-btn"
                style={{ width: 32, height: 32 }}
                disabled={activeSystem === 1}
                onClick={() => setActiveSystem((s) => Math.max(1, s - 1))}
                title="Previous"
              >
                ‹
              </button>
              <button
                className="icon-btn"
                style={{ width: 32, height: 32 }}
                disabled={activeSystem === 12}
                onClick={() => setActiveSystem((s) => Math.min(12, s + 1))}
                title="Next"
              >
                ›
              </button>
            </div>
          </div>

          {/* SCREEN 1: Tournament Creation & Configuration */}
          {activeSystem === 1 && (
            <div className="tournament-control-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="tournament-control-title">TOURNAMENT CONTROL</h3>

              <div className="tournament-metrics-3col">
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num">8</div>
                  <div className="tournament-metric-lbl">TEAMS</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ffc83d' }}>24</div>
                  <div className="tournament-metric-lbl">MATCHES</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#3de0ff' }}>3</div>
                  <div className="tournament-metric-lbl">VENUES</div>
                </div>
              </div>

              <div className="tournament-strip-meta">FIXTURES • SLOTS • ENTRY • REVENUE</div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Tournament structure & rules committed!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 2: Stadium & Ground Rental */}
          {activeSystem === 2 && (
            <div className="tournament-control-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="tournament-control-title">STADIUM & GROUND RENTAL</h3>

              <div className="tournament-metrics-3col">
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num">8</div>
                  <div className="tournament-metric-lbl">TEAMS</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ffc83d' }}>24</div>
                  <div className="tournament-metric-lbl">MATCHES</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#3de0ff' }}>3</div>
                  <div className="tournament-metric-lbl">VENUES</div>
                </div>
              </div>

              <div className="tournament-strip-meta">3 VENUES ALLOCATED ACROSS TOURNAMENT</div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Ground rental agreement locked for 24 fixtures!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 3: Lease-Based Ground Usage */}
          {activeSystem === 3 && (
            <div className="tournament-control-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="tournament-control-title">LEASE-BASED GROUND USAGE</h3>

              <div className="tournament-metrics-3col">
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num">8</div>
                  <div className="tournament-metric-lbl">TEAMS</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ffc83d' }}>24</div>
                  <div className="tournament-metric-lbl">MATCHES</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#3de0ff' }}>3</div>
                  <div className="tournament-metric-lbl">VENUES</div>
                </div>
              </div>

              <div className="tournament-strip-meta">LONG-TERM TOURNAMENT LEASE ACTIVE</div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Lease terms & damage deposit registered!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 4: Match Scheduling & Slot Allocation */}
          {activeSystem === 4 && (
            <div className="tournament-control-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="tournament-control-title">MATCH SCHEDULING</h3>

              <div className="tournament-metrics-3col">
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num">8</div>
                  <div className="tournament-metric-lbl">TEAMS</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ffc83d' }}>24</div>
                  <div className="tournament-metric-lbl">MATCHES</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#3de0ff' }}>3</div>
                  <div className="tournament-metric-lbl">VENUES</div>
                </div>
              </div>

              <div className="tournament-strip-meta">FIXTURES • TIMETABLE • UMPIRES ASSIGNED</div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Match schedule calendar synced with live scoring!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 5: Ticket Creation & Pricing */}
          {activeSystem === 5 && (
            <div className="ops-inner-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Ticket size={24} color="#ffc83d" />
                <h3 className="ops-inner-card-title">SH PREMIER LEAGUE FINAL</h3>
              </div>

              <div className="ticket-tier-list">
                {ticketTiers.map((t) => (
                  <div
                    key={t.id}
                    className={`ticket-tier-card ${selectedTier === t.id ? 'is-selected' : ''}`}
                    onClick={() => setSelectedTier(t.id)}
                  >
                    <div>
                      <div className="ticket-tier-name">{t.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{t.access}</div>
                    </div>
                    <div className="ticket-tier-price">₹ {t.price}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast(`Ticket pricing configured for ${selectedTier.toUpperCase()}!`)}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 6: Online Ticket Booking */}
          {activeSystem === 6 && (
            <div className="ops-inner-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Ticket size={24} color="#ffc83d" />
                <h3 className="ops-inner-card-title">SH PREMIER LEAGUE FINAL</h3>
              </div>

              <div className="ticket-tier-list">
                {ticketTiers.map((t) => (
                  <div
                    key={t.id}
                    className={`ticket-tier-card ${selectedTier === t.id ? 'is-selected' : ''}`}
                    onClick={() => setSelectedTier(t.id)}
                  >
                    <div>
                      <div className="ticket-tier-name">{t.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{t.access}</div>
                    </div>
                    <div className="ticket-tier-price">₹ {t.price}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast(`Ticket booked! ₹${ticketTiers.find((t) => t.id === selectedTier)?.price} payment processed.`)}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 7: QR Code Entry System */}
          {activeSystem === 7 && (
            <div className="ops-inner-card">
              <h3 className="ops-inner-card-title" style={{ textAlign: 'center' }}>SCAN ENTRY PASS</h3>

              <div className="qr-entry-box">
                {/* Visual SVG QR Code Graphic */}
                <div className="qr-code-graphic">
                  <svg viewBox="0 0 100 100" width="130" height="130" fill="#000">
                    <rect x="10" y="10" width="24" height="24" fill="#000" />
                    <rect x="14" y="14" width="16" height="16" fill="#fff" />
                    <rect x="18" y="18" width="8" height="8" fill="#000" />

                    <rect x="66" y="10" width="24" height="24" fill="#000" />
                    <rect x="70" y="14" width="16" height="16" fill="#fff" />
                    <rect x="74" y="18" width="8" height="8" fill="#000" />

                    <rect x="10" y="66" width="24" height="24" fill="#000" />
                    <rect x="14" y="70" width="16" height="16" fill="#fff" />
                    <rect x="18" y="74" width="8" height="8" fill="#000" />

                    <rect x="42" y="15" width="16" height="6" fill="#000" />
                    <rect x="45" y="28" width="8" height="12" fill="#000" />
                    <rect x="40" y="46" width="20" height="8" fill="#000" />
                    <rect x="68" y="45" width="12" height="14" fill="#000" />
                    <rect x="25" y="46" width="10" height="10" fill="#000" />
                    <rect x="42" y="66" width="14" height="20" fill="#000" />
                    <rect x="64" y="68" width="22" height="10" fill="#000" />
                  </svg>
                </div>

                <div className="qr-ticket-num">TICKET #SH-20461</div>
                <div className="qr-verified-pill">ENTRY VERIFIED</div>
              </div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Next pass scanned — Entry access granted!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 8: Live Attendance & Crowd Management */}
          {activeSystem === 8 && (
            <div className="ops-inner-card">
              <h3 className="ops-inner-card-title">Live Attendance & Crowd</h3>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: 0.8 }}>
                  LIVE ATTENDANCE
                </span>
                <div className="ops-big-currency" style={{ fontSize: 36, color: '#ffc83d' }}>
                  {crowd.present.toLocaleString('en-IN')} / {crowd.capacity.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="crowd-attendance-card">
                {crowd.stands.map((s, idx) => (
                  <div key={idx} className="crowd-stand-row">
                    <div className="crowd-stand-header">
                      <span>{s.name}</span>
                      <strong style={{ color: '#3de0ff' }}>{s.pct}%</strong>
                    </div>
                    <div className="crowd-stand-bar-track">
                      <div className="crowd-stand-bar-fill" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Gates monitored: Turnstile count synchronized!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 9: Revenue Split & Settlement */}
          {activeSystem === 9 && (
            <div className="tournament-control-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="tournament-control-title">REVENUE SPLIT & SETTLEMENT</h3>

              <div className="tournament-metrics-3col">
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num">50%</div>
                  <div className="tournament-metric-lbl">ORGANISER</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ffc83d' }}>30%</div>
                  <div className="tournament-metric-lbl">STADIUM</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#00e676' }}>20%</div>
                  <div className="tournament-metric-lbl">PRIZE POOL</div>
                </div>
              </div>

              <div className="tournament-strip-meta">AUTOMATED GATE SHARE SETTLEMENT</div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Revenue split contracts settled & escrow released!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 10: Sponsorship & Branding Integration */}
          {activeSystem === 10 && (
            <div className="tournament-control-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="tournament-control-title">SPONSORSHIP & BRANDING</h3>

              <div className="tournament-metrics-3col">
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num">8</div>
                  <div className="tournament-metric-lbl">SPONSORS</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ffc83d' }}>16</div>
                  <div className="tournament-metric-lbl">BANNERS</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#3de0ff' }}>4K</div>
                  <div className="tournament-metric-lbl">STREAM ADS</div>
                </div>
              </div>

              <div className="tournament-strip-meta">DIGITAL BOUNDARY & STREAM OVERLAYS</div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Sponsor deliverables and ad spots verified!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 11: Tournament Analytics & Reporting */}
          {activeSystem === 11 && (
            <div className="tournament-control-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="tournament-control-title">TOURNAMENT ANALYTICS</h3>

              <div className="tournament-metrics-3col">
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#00e676' }}>94%</div>
                  <div className="tournament-metric-lbl">TICKET SELL</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ffc83d' }}>24.8K</div>
                  <div className="tournament-metric-lbl">VIEWERS</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#3de0ff' }}>₹14.2L</div>
                  <div className="tournament-metric-lbl">REVENUE</div>
                </div>
              </div>

              <div className="tournament-strip-meta">AUDIENCE ENGAGEMENT & GATE SUMMARY</div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Tournament analytics report exported as PDF!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}

          {/* SCREEN 12: Multi-Level Tournament Support */}
          {activeSystem === 12 && (
            <div className="tournament-control-card">
              <svg className="stadium-illustration-arc" viewBox="0 0 100 60" fill="none">
                <path d="M10 45 C10 15, 90 15, 90 45" stroke="#ffc83d" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M22 45 C22 26, 78 26, 78 45" stroke="rgba(255, 200, 61, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
                <rect x="44" y="32" width="12" height="18" fill="#3de0ff" rx="2" />
              </svg>

              <h3 className="tournament-control-title">MULTI-LEVEL FORMAT</h3>

              <div className="tournament-metrics-3col">
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num">STAGE 1</div>
                  <div className="tournament-metric-lbl">LEAGUE</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ffc83d' }}>STAGE 2</div>
                  <div className="tournament-metric-lbl">SUPER 8S</div>
                </div>
                <div className="tournament-metric-box">
                  <div className="tournament-metric-num" style={{ color: '#ff3b50' }}>FINAL</div>
                  <div className="tournament-metric-lbl">PLAYOFFS</div>
                </div>
              </div>

              <div className="tournament-strip-meta">AUTO-QUALIFYING & NET RUN RATE ENGINE</div>

              <button
                type="button"
                className="tournament-red-cta-btn"
                onClick={() => triggerToast('Multi-stage tournament format validated!')}
              >
                BOOK / MANAGE EVENT
              </button>
            </div>
          )}
        </div>

        {/* 12 Systems Directory Matrix */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#ffc83d', letterSpacing: 0.8 }}>
              TOURNAMENT & TICKETING DIRECTORY
            </span>
            <span className="pill" style={{ fontSize: 9 }}>12 SYSTEMS</span>
          </div>

          <div className="ops-overview-10-grid">
            {systems.map((sys) => (
              <button
                key={sys.id}
                type="button"
                className="ops-overview-tile"
                style={activeSystem === sys.id ? { borderColor: '#ff3b50', background: '#12266a' } : {}}
                onClick={() => {
                  setActiveSystem(sys.id)
                  window.scrollTo({ top: 120, behavior: 'smooth' })
                }}
              >
                <div className={`ops-overview-num-pill ${sys.id % 2 === 0 ? 'is-blue' : ''}`}>
                  {sys.id}
                </div>
                <span className="ops-overview-text">{sys.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  )
}
