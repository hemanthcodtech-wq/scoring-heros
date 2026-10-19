import { useState } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, UserRound, Briefcase, Zap, ShieldCheck, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import LanguageSelector from '../components/LanguageSelector'
import { OFFICIAL_ROLES, getRoleById } from '../data/rolesData'
import FlashScreen from './FlashScreen'

export default function Welcome({ skipFlash = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loginAsGuest } = useAuth()
  const { t } = useLanguage()

  const [showFlash, setShowFlash] = useState(() => {
    if (skipFlash) return false
    if (location.state?.skipFlash) return false
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('skip') === '1' || params.get('skip') === 'true') {
        return false
      }
    }
    return true
  })

  // Two main tabs: Player vs Officials
  const [roleCategory, setRoleCategory] = useState('player') // 'player' | 'official'
  const [selectedOfficialRole, setSelectedOfficialRole] = useState('franchise')

  if (user) return <Navigate to="/app" replace />

  const activeOfficial = getRoleById(selectedOfficialRole)

  function handleGuestLogin() {
    const targetRole = roleCategory === 'player' ? 'player' : selectedOfficialRole
    loginAsGuest(targetRole)
    navigate('/app', { replace: true })
  }

  function handleRegister() {
    navigate(`/register?mode=register&category=${roleCategory}&role=${selectedOfficialRole}`)
  }

  function handleSignIn() {
    navigate(`/register?mode=login&category=${roleCategory}&role=${selectedOfficialRole}`)
  }

  return (
    <>
      {showFlash && (
        <FlashScreen onFinish={() => setShowFlash(false)} />
      )}
      <div className="sh-splash">
        {/* Top Floating Bar: Intro Replay & Language Selector */}
        <div className="sh-welcome-lang-bar" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className="sh-replay-intro-btn"
            onClick={() => setShowFlash(true)}
            title="Replay intro flash screen"
          >
            <Sparkles size={13} color="#ffd600" />
            <span>Intro</span>
          </button>
          <LanguageSelector />
        </div>

      {/* Light streaks across background */}
      <div className="sh-streaks">
        <span style={{ top: '18%' }} />
        <span style={{ top: '38%', animationDelay: '0.7s' }} />
        <span style={{ top: '62%', animationDelay: '1.3s' }} />
        <span style={{ top: '82%', animationDelay: '0.3s' }} />
      </div>

      {/* 3D Helmet Logo */}
      <div className="sh-slogo">
        <img src="/logo.png" alt="Scoring Heroes" />
      </div>

      <div className="sh-sname">{t('app_title')}</div>
      <div className="sh-stag">{t('app_tagline')}</div>

      {/* Two Tabs: Player vs Officials */}
      <div className="sh-welcome-portal-card">
        <div className="sh-welcome-tab-switch">
          <button
            type="button"
            className={`sh-welcome-tab-btn ${roleCategory === 'player' ? 'is-active' : ''}`}
            onClick={() => setRoleCategory('player')}
          >
            <UserRound size={16} />
            <span>{t('tab_player')}</span>
          </button>
          <button
            type="button"
            className={`sh-welcome-tab-btn ${roleCategory === 'official' ? 'is-active' : ''}`}
            onClick={() => setRoleCategory('official')}
          >
            <Briefcase size={16} />
            <span>{t('tab_officials')}</span>
          </button>
        </div>

        {/* If Officials Tab Selected: Dropdown of all remaining roles */}
        {roleCategory === 'official' && (
          <div className="sh-welcome-dropdown-section">
            <label className="sh-welcome-label">
              Select Official / Business Role
              <select
                className="sh-select"
                value={selectedOfficialRole}
                onChange={(e) => setSelectedOfficialRole(e.target.value)}
              >
                <option value="fan">1. Fan / Viewer (Super 11, Ticketing & Entertainment)</option>
                <option value="franchise">2. Franchise Owner (Auction Bidding & Team Mgmt)</option>
                <option value="coach">3. Coach / Trainer (Attendance & Player Feedback)</option>
                <option value="academy">4. Academy Owner / Mgr (Students, Accounts & Staff)</option>
                <option value="ground">5. Ground / Stadium Owner (Bookings, Rentals & Finance)</option>
                <option value="staff">6. Staff Member (Role-based Access, Shifts & Payroll)</option>
                <option value="organizer">7. Tournament Organizer (Tournaments & Gate Tickets)</option>
                <option value="seller">8. Seller / Manufacturer / Brand (KYC & Storefronts)</option>
                <option value="sponsor">9. Sponsor / Advertiser (Sponsorships & Ads)</option>
                <option value="admin">10. Platform Super Admin (Approvals, Fraud & E-Paper)</option>
              </select>
            </label>

            <div
              className="sh-welcome-role-preview"
              style={{
                background: activeOfficial.accentBg,
                borderColor: `${activeOfficial.color}55`,
              }}
            >
              <span className="pill" style={{ color: activeOfficial.color, borderColor: `${activeOfficial.color}66` }}>
                {activeOfficial.badge}
              </span>
              <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--muted)', lineHeight: 1.3 }}>
                {activeOfficial.desc}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
          <button
            className="sh-btn-submit"
            type="button"
            onClick={handleRegister}
          >
            Register as {roleCategory === 'player' ? 'Player' : activeOfficial.short} →
          </button>

          <button
            className="sh-btn-ghost"
            type="button"
            style={{ background: 'rgba(255, 255, 255, 0.08)' }}
            onClick={handleSignIn}
          >
            Existing User Sign In
          </button>

          {/* 1-Tap Guest Login for Selected Role */}
          <button
            className="sh-guest-btn"
            type="button"
            onClick={handleGuestLogin}
            title="Instant access without phone verification"
          >
            <Zap size={16} color="#ffd600" />
            <span>
              Continue as Guest ({roleCategory === 'player' ? 'Player' : activeOfficial.short})
            </span>
          </button>
        </div>
      </div>
    </div>
  </>
)
}
