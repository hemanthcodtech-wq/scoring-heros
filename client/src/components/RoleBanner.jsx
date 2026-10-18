import { useNavigate } from 'react-router-dom'
import { ShieldCheck, ShieldAlert } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getRoleById } from '../data/rolesData'
import LanguageSelector from './LanguageSelector'

export default function RoleBanner() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const activeRole = getRoleById(user?.role || 'player')
  const isAadhaarVerified = user?.aadhaarVerified !== false

  return (
    <div className="sh-role-banner">
      <div
        className="sh-role-banner-left"
        onClick={() => navigate('/app/profile')}
        role="button"
        tabIndex={0}
        title="View Role Profile & Account"
        style={{ cursor: 'pointer' }}
      >
        <div
          className="sh-role-avatar-dot"
          style={{ background: activeRole.color, boxShadow: `0 0 10px ${activeRole.color}88` }}
        />
        <div className="sh-role-banner-text">
          <div className="sh-role-banner-heading">
            <span className="sh-role-name">{activeRole.title}</span>
            {user?.isGuest && <span className="sh-guest-pill">GUEST MODE</span>}
          </div>
          <span className="sh-role-subline">
            {user?.nickname || 'User'} • {user?.city || 'Chennai'}
          </span>
        </div>
      </div>

      <div className="sh-role-banner-actions">
        {/* Aadhaar Verification Status Badge (Clickable for Players) */}
        {user?.role === 'player' && (
          <button
            type="button"
            className={`sh-banner-trust-badge ${isAadhaarVerified ? 'is-verified' : 'is-pending'}`}
            onClick={() => navigate('/app/aadhaar')}
            title="Aadhaar & Trust Security System"
          >
            {isAadhaarVerified ? (
              <>
                <ShieldCheck size={14} color="#00e676" />
                <span>AADHAAR VERIFIED</span>
              </>
            ) : (
              <>
                <ShieldAlert size={14} color="#ffc83d" />
                <span>VERIFY AADHAAR</span>
              </>
            )}
          </button>
        )}

        <LanguageSelector compact />
      </div>
    </div>
  )
}
