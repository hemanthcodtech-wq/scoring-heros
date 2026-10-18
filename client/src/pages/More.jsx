import { useNavigate } from 'react-router-dom'
import { Shield, LogOut } from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import { getRoleById } from '../data/rolesData'
import LanguageSelector from '../components/LanguageSelector'

const links = [
  ['Career Stats & Leaderboards', 'stats', '/app/stats'],
  ['3D Avatar & Jersey Creator', 'avatar', '/app/avatar'],
  ['Career Journey Tracker', 'journey', '/app/journey'],
  ['Academy Hub & Student Batches', 'academy', '/app/academy'],
  ['Auctions & Bidding War Room', 'auctions', '/app/auction'],
  ['AI Commentary Desk', 'commentary', '/app/commentary'],
  ['Video Highlights Studio', 'highlights', '/app/highlights'],
  ['Match Tools (DRS & DLS Calculator)', 'tools', '/app/match-tools'],
  ['Ground & Turf Slot Booking', 'grounds', '/app/grounds'],
  ['Tournament & Ticketing Box Office', 'tickets', '/app/ticketing'],
  ['Sports Marketplace & Storefront', 'market', '/app/marketplace'],
  ['Brand Partners & Manufacturers', 'partners', '/app/partners'],
  ['Sponsorship & Ad Campaigns', 'ads', '/app/sponsorship'],
  ['AI Match Simulation System', 'aimatch', '/app/aimatch'],
  ['Entertainment & Fan Arena Music', 'entertainment', '/app/entertainment'],
  ['Interview & Media Press Room', 'interview', '/app/interview'],
  ['Sports E-Paper Daily Edition', 'epaper', '/app/epaper'],
  ['Super Scoring 11 Fantasy Squad', 'super11', '/app/super11'],
  ['Platform Governance & Super Admin', 'admin', '/app/admin'],
]

export default function More() {
  const navigate = useNavigate()
  const { user, switchRole, logout } = useAuth()

  const activeRole = getRoleById(user?.role || 'player')

  return (
    <Screen
      title="Profile & Ecosystem"
      right={<LanguageSelector compact />}
    >
      {/* Active Profile ID Card */}
      <div className="id-card" style={{ borderLeft: `4px solid ${activeRole.color}` }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <h2 style={{ margin: 0 }}>{user.nickname}</h2>
            <span
              className="pill"
              style={{
                background: activeRole.accentBg,
                color: activeRole.color,
                borderColor: `${activeRole.color}66`,
                fontSize: 9,
                fontWeight: 'bold',
              }}
            >
              {activeRole.badge}
            </span>
          </div>
          <p style={{ margin: '2px 0' }}>
            {activeRole.title} • {user.city}
          </p>
          <small style={{ color: 'var(--muted)', fontSize: 11 }}>
            Phone: {user.phoneCode || '+91'} {user.phone || '98765 43210'} • Trust: {user.trust || 94}/100
          </small>
        </div>

        <div
          className="id-card__avatar-holo"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: activeRole.accentBg,
            border: `1.5px solid ${activeRole.color}`,
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            color: activeRole.color,
          }}
          title={activeRole.title}
        >
          <Shield size={22} />
        </div>
      </div>

      {/* Profile Switcher Dropdown */}
      <div
        style={{
          margin: '0 0 14px',
          padding: '12px 14px',
          borderRadius: 14,
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--line)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <label style={{ fontSize: 11, fontWeight: 'bold', color: 'var(--muted)' }}>
          SWITCH ACTIVE DASHBOARD PROFILE
        </label>
        <select
          className="sh-select"
          value={user?.role || 'player'}
          onChange={(e) => switchRole(e.target.value)}
          style={{ background: '#081330', borderColor: 'rgba(61,224,255,0.4)', color: '#f4f7ff' }}
        >
          <optgroup label="Athlete & Student">
            <option value="player">🏏 1. Player (including academy students)</option>
          </optgroup>
          <optgroup label="Officials & Business Roles">
            <option value="fan">💛 2. Fan / Viewer (Super 11, Tickets, Entertainment)</option>
            <option value="franchise">🔨 3. Franchise Owner (Auction Bidding & Team Mgmt)</option>
            <option value="coach">⚡ 4. Coach / Trainer (Attendance & Feedback)</option>
            <option value="academy">🎓 5. Academy Owner / Mgr (Students, Accounts & Staff)</option>
            <option value="ground">🏟️ 6. Ground / Stadium Owner (Bookings & Leases)</option>
            <option value="staff">📋 7. Staff Member (Role-based, Attendance & Payroll)</option>
            <option value="organizer">🏆 8. Tournament Organizer (Tournaments & Ticketing)</option>
            <option value="seller">🛍️ 9. Seller / Brand / Manufacturer (KYC & Storefront)</option>
            <option value="sponsor">📢 10. Sponsor / Advertiser (Sponsorships & Ads)</option>
            <option value="admin">🛡️ 11. Platform Super Admin (Approvals, Fraud & E-Paper)</option>
          </optgroup>
        </select>
      </div>

      {/* Module Links List */}
      <div className="list" style={{ paddingBottom: 110 }}>
        {links.map(([label, slug, path]) => (
          <button
            key={slug}
            className={`row-btn ${slug === 'avatar' ? 'row-btn--avatar' : ''}`}
            type="button"
            onClick={() => navigate(path || `/app/module/${slug}`)}
          >
            {label}
          </button>
        ))}

        <button
          className="row-btn row-btn--danger"
          type="button"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          onClick={() => {
            logout()
            navigate('/', { replace: true })
          }}
        >
          <LogOut size={16} /> Sign out of Scoring Heroes
        </button>
      </div>
    </Screen>
  )
}
