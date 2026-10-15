import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import { career } from '../data/demo'
import { useAuth } from '../context/AuthContext'

const links = [
  ['Career Stats', 'stats', '/app/stats'],
  ['3D Avatar', 'avatar', '/app/avatar'],
  ['Career Journey', 'journey', '/app/journey'],
  ['Academy career', 'academy', '/app/academy'],
  ['Auctions', 'auctions', '/app/auction'],
  ['AI Commentary', 'commentary', '/app/commentary'],
  ['Video Highlights', 'highlights', '/app/highlights'],
  ['Match Tools (DRS / DLS)', 'tools', '/app/match-tools'],
  ['Ground Slot Booking', 'grounds', '/app/grounds'],
  ['Tournament & Ticketing', 'tickets', '/app/ticketing'],
  ['Marketplace', 'market', '/app/marketplace'],
  ['Brand Partners (Manufacturers)', 'partners', '/app/partners'],
  ['Sponsorship & Ads', 'ads', '/app/sponsorship'],
  ['AI Match System', 'aimatch', '/app/aimatch'],
  ['Entertainment System', 'entertainment', '/app/entertainment'],
  ['Interview & Media', 'interview', '/app/interview'],
  ['Sports E-Paper', 'epaper', '/app/epaper'],
  ['Super Scoring 11', 'super11', '/app/super11'],
  ['Admin Control Panel', 'admin', '/app/admin'],
]

export default function More() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <Screen title="More">
      <div className="id-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/app/avatar')} role="button" tabIndex={0}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <h2 style={{ margin: 0 }}>{user.nickname}</h2>
            {user?.avatarConfigured && (
              <span className="pill" style={{ background: user?.avatarJersey?.primary || 'var(--red)', fontSize: 9 }}>
                3D AVATAR READY
              </span>
            )}
          </div>
          <p>
            {user.email || 'email pending'} • last 5 teams
          </p>
          <small>
            {user?.avatarJersey
              ? `Jersey: ${user.avatarJersey.name} #${user.avatarJersey.num} • ${user.avatarJersey.league}`
              : career.lastTeams.join(' · ')}
          </small>
        </div>
        <div
          className="id-card__avatar-holo"
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: user?.avatarJersey
              ? `radial-gradient(circle, ${user.avatarJersey.primary}40, transparent 70%)`
              : 'radial-gradient(circle, rgba(61,224,255,0.25), transparent 70%)',
            border: `1.5px solid ${user?.avatarJersey?.primary || 'var(--cyan)'}`,
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
          }}
          title="Customise 3D Avatar"
        >
          <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
            <circle cx="20" cy="11" r="5" stroke={user?.avatarJersey?.primary || '#3de0ff'} strokeWidth="1.8" fill="rgba(61,224,255,0.2)" />
            <path d="M12 28c0-5 3.5-7.5 8-7.5s8 2.5 8 7.5" stroke={user?.avatarJersey?.primary || '#e10613'} strokeWidth="1.8" strokeLinecap="round" />
            <text x="20" y="26" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">
              {user?.avatarJersey?.num || '3D'}
            </text>
          </svg>
        </div>
      </div>
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
          onClick={() => {
            logout()
            navigate('/', { replace: true })
          }}
        >
          Sign out
        </button>
      </div>
    </Screen>
  )
}
