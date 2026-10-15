import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, RefreshCw, Shirt, Star } from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'

const TEAMS = [
  {
    id: 'scoring',
    name: 'Scoring XI',
    league: 'Chennai Street Cup',
    primary: '#e10613',
    secondary: '#ffffff',
    accent: '#ffd700',
    num: '7',
    stars: 4,
    pattern: 'diagonal',
  },
  {
    id: 'marina',
    name: 'Marina Strikers',
    league: 'Chennai Street Cup',
    primary: '#1d6dff',
    secondary: '#ffffff',
    accent: '#00d4ff',
    num: '12',
    stars: 3,
    pattern: 'solid',
  },
  {
    id: 'coastal',
    name: 'Coastal Kings',
    league: 'Academy Super League',
    primary: '#059669',
    secondary: '#ffffff',
    accent: '#34d399',
    num: '5',
    stars: 5,
    pattern: 'stripes',
  },
  {
    id: 'titans',
    name: 'U19 Titans',
    league: 'Academy Super League',
    primary: '#7c3aed',
    secondary: '#fbbf24',
    accent: '#a78bfa',
    num: '3',
    stars: 3,
    pattern: 'solid',
  },
  {
    id: 'giants',
    name: 'City Super Giants',
    league: 'Premier Cup',
    primary: '#f59e0b',
    secondary: '#1a1a1a',
    accent: '#fbbf24',
    num: '11',
    stars: 5,
    pattern: 'diagonal',
  },
  {
    id: 'warriors',
    name: 'Warriors XI',
    league: 'Premier Cup',
    primary: '#dc2626',
    secondary: '#1f1f1f',
    accent: '#ef4444',
    num: '9',
    stars: 4,
    pattern: 'stripes',
  },
]

function JerseyMini({ team, size = 64, animated = false }) {
  const { primary, secondary, accent, num, pattern } = team
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 80 96"
      fill="none"
      className={animated ? 'jersey-animated' : ''}
    >
      {/* Jersey body */}
      <path d="M16 30 L6 60 L6 88 L74 88 L74 60 L64 30 Q40 20 16 30Z" fill={primary} />

      {/* Pattern overlay */}
      {pattern === 'diagonal' && (
        <g opacity="0.18">
          {[-20, -8, 4, 16, 28, 40, 52, 64].map((x) => (
            <line key={x} x1={x} y1="20" x2={x + 30} y2="95" stroke={secondary} strokeWidth="4" />
          ))}
        </g>
      )}
      {pattern === 'stripes' && (
        <g opacity="0.18">
          {[0, 12, 24, 36, 48, 60].map((x) => (
            <rect key={x} x={x} y="20" width="6" height="75" fill={secondary} />
          ))}
        </g>
      )}

      {/* Collar */}
      <path d="M32 30 Q40 42 48 30 L44 26 Q40 36 36 26Z" fill={secondary} opacity="0.9" />

      {/* Accent shoulder band */}
      <path d="M16 30 Q28 26 40 24 Q52 26 64 30 L60 36 Q40 30 20 36Z" fill={accent} opacity="0.5" />

      {/* Sleeves */}
      <path d="M16 30 L2 50 L10 55 L24 40Z" fill={primary} />
      <path d="M64 30 L78 50 L70 55 L56 40Z" fill={primary} />
      {/* Sleeve stripe */}
      <line x1="3" y1="48" x2="10" y2="54" stroke={accent} strokeWidth="2" opacity="0.7" />
      <line x1="77" y1="48" x2="70" y2="54" stroke={accent} strokeWidth="2" opacity="0.7" />

      {/* Number */}
      <text
        x="40" y="70"
        textAnchor="middle"
        fontSize="26"
        fontWeight="900"
        fill={secondary}
        opacity="0.9"
        fontFamily="Barlow Condensed, sans-serif"
      >
        {num}
      </text>
    </svg>
  )
}

function BigJerseyPreview({ team }) {
  const { primary, secondary, accent, num, pattern, name } = team
  return (
    <div className="jersey-big-wrap">
      <div className="jersey-big-glow" style={{ background: `radial-gradient(circle, ${primary}44, transparent 60%)` }} />
      <svg viewBox="0 0 200 240" className="jersey-big-svg" fill="none">
        {/* Body */}
        <path d="M40 75 L14 155 L14 220 L186 220 L186 155 L160 75 Q100 50 40 75Z" fill={primary} />

        {/* Pattern */}
        {pattern === 'diagonal' && (
          <g opacity="0.15">
            {[-30, -10, 10, 30, 50, 70, 90, 110, 130].map((x) => (
              <line key={x} x1={x} y1="50" x2={x + 70} y2="230" stroke={secondary} strokeWidth="9" />
            ))}
          </g>
        )}
        {pattern === 'stripes' && (
          <g opacity="0.15">
            {[0, 24, 48, 72, 96, 120, 144, 168].map((x) => (
              <rect key={x} x={x} y="50" width="12" height="180" fill={secondary} />
            ))}
          </g>
        )}

        {/* Collar */}
        <path d="M80 75 Q100 105 120 75 L112 65 Q100 90 88 65Z" fill={secondary} opacity="0.95" />

        {/* Shoulder band */}
        <path d="M40 75 Q70 65 100 60 Q130 65 160 75 L150 90 Q100 76 50 90Z" fill={accent} opacity="0.45" />

        {/* Sleeves */}
        <path d="M40 75 L4 128 L24 140 L58 102Z" fill={primary} />
        <path d="M160 75 L196 128 L176 140 L142 102Z" fill={primary} />
        <line x1="5" y1="125" x2="23" y2="137" stroke={accent} strokeWidth="4" opacity="0.7" />
        <line x1="195" y1="125" x2="177" y2="137" stroke={accent} strokeWidth="4" opacity="0.7" />

        {/* Logo placeholder */}
        <circle cx="100" cy="105" r="14" fill={secondary} opacity="0.12" />
        <text x="100" y="110" textAnchor="middle" fontSize="14" fill={secondary} opacity="0.5">SH</text>

        {/* Number */}
        <text x="100" y="185" textAnchor="middle" fontSize="72" fontWeight="900"
          fill={secondary} opacity="0.88" fontFamily="Barlow Condensed, sans-serif">
          {num}
        </text>

        {/* Name bar */}
        <rect x="40" y="192" width="120" height="22" rx="4" fill={secondary} opacity="0.12" />
        <text x="100" y="208" textAnchor="middle" fontSize="11" fontWeight="700"
          fill={secondary} opacity="0.7" fontFamily="Outfit, sans-serif" letterSpacing="2">
          {name.toUpperCase().slice(0, 12)}
        </text>
      </svg>
    </div>
  )
}

export default function AvatarJersey() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()

  // Initialize from user saved jersey if available
  const initialIdx = Math.max(0, TEAMS.findIndex((t) => t.id === user?.avatarJersey?.id))
  const [selected, setSelected] = useState(initialIdx !== -1 ? initialIdx : 0)
  const [applied, setApplied] = useState(Boolean(user?.avatarJersey))
  const [applying, setApplying] = useState(false)
  const [customNum, setCustomNum] = useState(user?.avatarJersey?.customNum || '')
  const [savedToProfile, setSavedToProfile] = useState(false)

  const team = TEAMS[selected]

  const apply = () => {
    if (applying) return
    setApplying(true)
    setTimeout(() => {
      const jerseyData = {
        id: team.id,
        name: team.name,
        league: team.league,
        primary: team.primary,
        secondary: team.secondary,
        accent: team.accent,
        num: customNum || team.num,
        customNum: customNum || team.num,
        pattern: team.pattern,
      }
      updateUser({
        avatarJersey: jerseyData,
        avatarConfigured: true,
      })
      try {
        localStorage.setItem('sh_user_avatar', JSON.stringify({
          jersey: jerseyData,
          updatedAt: Date.now(),
        }))
      } catch (err) {}
      setApplying(false)
      setApplied(true)
    }, 800)
  }

  const saveAndExit = () => {
    apply()
    setSavedToProfile(true)
    setTimeout(() => {
      navigate('/app/more')
    }, 400)
  }

  return (
    <Screen title="Team Jersey" back padded={false}>
      <div className="jersey-screen">
        {/* Big preview */}
        <BigJerseyPreview team={{ ...team, num: customNum || team.num }} />

        {/* Team info */}
        <div className="jersey-info">
          <div>
            <p className="kicker" style={{ color: team.primary }}>{team.league}</p>
            <h2 className="jersey-info__name">{team.name}</h2>
          </div>
          <div className="jersey-stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < team.stars ? team.accent : 'none'} color={team.accent} />
            ))}
          </div>
        </div>

        {/* Jersey grid */}
        <div className="jersey-grid">
          {TEAMS.map((t, i) => (
            <button
              key={t.id}
              className={`jersey-card ${i === selected ? 'is-active' : ''}`}
              style={{ '--jc-accent': t.primary }}
              onClick={() => { setSelected(i); setApplied(false) }}
            >
              <JerseyMini team={t} size={48} />
              <span className="jersey-card__name">{t.name.split(' ')[0]}</span>
              {i === selected && <div className="jersey-card__tick"><Check size={10} /></div>}
            </button>
          ))}
        </div>

        {/* Custom number */}
        <div className="jersey-custom-num">
          <label className="jersey-custom-num__label">
            <Shirt size={14} />
            Custom jersey number
          </label>
          <div className="jersey-custom-num__row">
            {[7, 10, 18, 99].map((n) => (
              <button
                key={n}
                className={`jersey-num-chip ${customNum === String(n) ? 'is-on' : ''}`}
                style={{ '--nc': team.primary }}
                onClick={() => setCustomNum((v) => (v === String(n) ? '' : String(n)))}
              >
                {n}
              </button>
            ))}
            <input
              className="jersey-num-input"
              type="number"
              min="1"
              max="99"
              placeholder="##"
              value={customNum}
              onChange={(e) => setCustomNum(e.target.value)}
            />
          </div>
        </div>

        {/* Apply CTA */}
        <div className="jersey-foot">
          <button
            className={`btn ${applied ? 'btn--ghost' : 'btn--primary'} jersey-apply-btn`}
            onClick={apply}
            style={applied ? { borderColor: team.primary, color: team.primary } : {}}
          >
            {applying ? (
              <><RefreshCw size={16} className="spin-icon" /> Applying…</>
            ) : applied ? (
              <><Check size={16} /> Jersey Applied!</>
            ) : (
              <>Apply to Avatar</>
            )}
          </button>

          <button
            className="btn btn--primary"
            onClick={saveAndExit}
            style={{ marginTop: 10, background: 'linear-gradient(135deg, var(--red), #b91c1c)' }}
          >
            {savedToProfile ? '✓ Saved to Profile!' : 'Save & Done →'}
          </button>

          {applied && (
            <button
              className="btn btn--ghost"
              onClick={() => navigate('/app/avatar/viewer')}
              style={{ marginTop: 8 }}
            >
              View in 360° →
            </button>
          )}
        </div>
      </div>
    </Screen>
  )
}
