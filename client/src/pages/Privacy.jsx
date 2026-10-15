import { useNavigate } from 'react-router-dom'
import { BadgeCheck, EyeOff, Shield } from 'lucide-react'
import Screen, { Flow } from '../components/Screen'
import { useAuth } from '../context/AuthContext'

export default function Privacy() {
  const navigate = useNavigate()
  const { draft, completeSignup } = useAuth()

  function finish() {
    completeSignup()
    navigate('/app', { replace: true })
  }

  return (
    <Screen back title="Privacy layer">
      <Flow
        foot={
          <button className="btn btn--primary" type="button" onClick={finish}>
            Enter Scoring Heroes
          </button>
        }
      >
        <p className="kicker">Trust & verification</p>
        <h2 className="headline">Public career. Private identity.</h2>

        <div className="privacy-grid">
          <article>
            <EyeOff size={18} />
            <h3>Hidden</h3>
            <p>Mobile, email and Aadhaar stay off the public profile. Duplicate checks run in admin only.</p>
          </article>
          <article>
            <BadgeCheck size={18} />
            <h3>Shown</h3>
            <p>
              {draft.nickname || 'Blade'} • {draft.age || '18'} • {draft.city || 'Chennai'} • {draft.role}
            </p>
          </article>
          <article>
            <Shield size={18} />
            <h3>Verified Player</h3>
            <p>Internal trust score starts at 86. Badge appears after backend Aadhaar match.</p>
          </article>
        </div>
      </Flow>
    </Screen>
  )
}
