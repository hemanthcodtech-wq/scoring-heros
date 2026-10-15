import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('mode') === 'login' ? 'login' : 'register'
  const [tab, setTab] = useState(initialTab) // 'login' | 'register'

  const { draft, updateDraft } = useAuth()
  const [error, setError] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)

  // Handle Login submission
  function handleLoginSubmit(e) {
    e.preventDefault()
    const cleanPhone = draft.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }
    setError('')
    updateDraft({ mode: 'login' })
    navigate('/otp')
  }

  // Handle Register submission
  function handleRegisterSubmit(e) {
    e.preventDefault()
    const cleanPhone = draft.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }
    if (!draft.nickname.trim() || draft.nickname.trim().length < 3) {
      setError('Nickname must be at least 3 characters.')
      return
    }
    if (!draft.age || Number(draft.age) < 5 || Number(draft.age) > 90) {
      setError('Please enter a valid age between 5 and 90.')
      return
    }
    if (!draft.city.trim()) {
      setError('Please enter your city.')
      return
    }
    if (!agreeTerms) {
      setError('You must agree to the terms to continue.')
      return
    }
    setError('')
    updateDraft({ mode: 'register' })
    navigate('/otp')
  }

  return (
    <Screen back title={tab === 'login' ? 'Login' : 'Create Identity'}>
      <div className="sh-auth-container">
        {/* Authentic ScoringHeroes Hero Banner */}
        <div className="sh-hero-card">
          <h2>Play. Score. Rise.</h2>
          <div className="sh-hero-sub">Your sports career, tracked from academy to pro.</div>
          <span className="sh-free-pill">100% Free · No Ads · Open Sports Network</span>
        </div>

        {/* Segmented Switcher (Login / Register) */}
        <div className="sh-seg">
          <button
            type="button"
            className={`sh-seg-btn ${tab === 'login' ? 'is-active' : ''}`}
            onClick={() => {
              setTab('login')
              setError('')
            }}
          >
            Login
          </button>
          <button
            type="button"
            className={`sh-seg-btn ${tab === 'register' ? 'is-active' : ''}`}
            onClick={() => {
              setTab('register')
              setError('')
            }}
          >
            Register
          </button>
        </div>

        {/* Form Card */}
        <div className="sh-auth-card">
          {tab === 'login' ? (
            /* --- LOGIN FORM --- */
            <form className="sh-form" onSubmit={handleLoginSubmit}>
              <label className="sh-label">
                Mobile number
                <input
                  name="phone"
                  inputMode="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="sh-input"
                  value={draft.phone}
                  onChange={(e) => updateDraft({ phone: e.target.value })}
                />
              </label>

              {error && <p className="error" style={{ margin: '2px 0' }}>{error}</p>}

              <button className="sh-btn-submit" type="submit">
                Send OTP
              </button>

              <div className="hint-card" style={{ marginTop: 8 }}>
                <ShieldCheck size={18} />
                <p>
                  Demo OTP is <strong>1234</strong>. Secure SMS login keeps duplicate accounts out.
                </p>
              </div>
            </form>
          ) : (
            /* --- REGISTER FORM (Exact ScoringHeroes.html fields) --- */
            <form className="sh-form" onSubmit={handleRegisterSubmit}>
              <label className="sh-label">
                Nickname (public)
                <input
                  name="nick"
                  required
                  minLength={3}
                  maxLength={20}
                  pattern="[A-Za-z0-9_.]+"
                  title="Letters, numbers, dot and underscore"
                  placeholder="Rohit_45"
                  className="sh-input"
                  value={draft.nickname}
                  onChange={(e) => updateDraft({ nickname: e.target.value })}
                />
                <span className="sh-field-hint">Public handle on scorecards and auctions.</span>
              </label>

              <label className="sh-label">
                Mobile number (private)
                <input
                  name="phone"
                  inputMode="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="sh-input"
                  value={draft.phone}
                  onChange={(e) => updateDraft({ phone: e.target.value })}
                />
              </label>

              <label className="sh-label">
                Email (optional, private)
                <input
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  className="sh-input"
                  value={draft.email}
                  onChange={(e) => updateDraft({ email: e.target.value })}
                />
                <span className="sh-field-hint">
                  Not needed to join. Add it if you want to connect social media later for posting posters.
                </span>
              </label>

              <div className="sh-row-split">
                <label className="sh-label" style={{ flex: 1 }}>
                  Age
                  <input
                    type="number"
                    name="age"
                    min={5}
                    max={90}
                    required
                    placeholder="18"
                    className="sh-input"
                    value={draft.age}
                    onChange={(e) => updateDraft({ age: e.target.value })}
                  />
                </label>

                <label className="sh-label" style={{ flex: 1.4 }}>
                  City
                  <input
                    name="loc"
                    required
                    placeholder="Chennai"
                    className="sh-input"
                    value={draft.city}
                    onChange={(e) => updateDraft({ city: e.target.value })}
                  />
                </label>
              </div>

              <label className="sh-label">
                I am a
                <select
                  name="kind"
                  className="sh-select"
                  value={draft.kind || 'Player'}
                  onChange={(e) => updateDraft({ kind: e.target.value })}
                >
                  <option value="Player">Player</option>
                  <option value="Fan">Fan</option>
                  <option value="Scorer">Scorer</option>
                  <option value="Organiser">Organiser</option>
                </select>
              </label>

              <label className="sh-ck-label">
                <input
                  type="checkbox"
                  name="ok"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>I agree to the terms. My mobile number and email stay private.</span>
              </label>

              {error && <p className="error" style={{ margin: '2px 0' }}>{error}</p>}

              <button className="sh-btn-submit" type="submit">
                Create account
              </button>
            </form>
          )}
        </div>
      </div>
    </Screen>
  )
}

