import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Welcome() {
  const navigate = useNavigate()
  const { user } = useAuth()
  if (user) return <Navigate to="/app" replace />

  return (
    <div className="sh-splash" onClick={() => navigate('/register')} role="button" tabIndex={0}>
      {/* Light streaks across background */}
      <div className="sh-streaks">
        <span style={{ top: '20%' }} />
        <span style={{ top: '38%', animationDelay: '0.7s' }} />
        <span style={{ top: '62%', animationDelay: '1.3s' }} />
        <span style={{ top: '80%', animationDelay: '0.3s' }} />
      </div>

      {/* 3D Helmet Logo */}
      <div className="sh-slogo">
        <img src="/logo.png" alt="Scoring Heroes" />
      </div>

      <div className="sh-sname">SCORING HEROES</div>
      <div className="sh-stag">Universal Sports OS. Cricket first, 500+ sports ready.</div>

      {/* Animated loadbar */}
      <div className="sh-loadbar">
        <i />
      </div>

      <div className="sh-hint">Tap anywhere to continue</div>

      {/* Direct Quick Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: 'min(86vw, 320px)',
          marginTop: 14,
          zIndex: 4,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="sh-btn-submit"
          type="button"
          onClick={() => navigate('/register')}
        >
          Create Identity (Register) →
        </button>
        <button
          className="sh-btn-ghost"
          type="button"
          style={{ background: 'rgba(255, 255, 255, 0.08)' }}
          onClick={() => navigate('/register?mode=login')}
        >
          Existing User Sign In
        </button>
      </div>
    </div>
  )
}

