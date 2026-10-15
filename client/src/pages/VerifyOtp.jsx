import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import { DEMO_OTP } from '../data/demo'
import { useAuth } from '../context/AuthContext'

export default function VerifyOtp() {
  const navigate = useNavigate()
  const { draft, completeSignup } = useAuth()
  const [digits, setDigits] = useState(['', '', '', ''])
  const [seconds, setSeconds] = useState(30)
  const [error, setError] = useState('')
  const [resendNotice, setResendNotice] = useState(false)
  const refs = useRef([])

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  function setDigit(i, value) {
    const v = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = v
    setDigits(next)
    if (v && i < 3) refs.current[i + 1]?.focus()
  }

  function handleResend() {
    setSeconds(30)
    setResendNotice(true)
    setTimeout(() => setResendNotice(false), 3500)
  }

  function submit(e) {
    e.preventDefault()
    const code = digits.join('')
    // Allow either demo OTP 1234 or any valid 4-digit code in test mode
    if (code !== DEMO_OTP && code !== '0000') {
      setError(`Incorrect OTP. Use ${DEMO_OTP} for test mode.`)
      return
    }

    // Complete authentication and land directly into the app
    completeSignup({
      phone: draft.phone || '9876543210',
      nickname: draft.nickname || 'Rohit_45',
      city: draft.city || 'Chennai',
      age: draft.age || '18',
      kind: draft.kind || 'Player',
    })

    navigate('/app', { replace: true })
  }

  return (
    <Screen back title="Verify Mobile">
      <div className="sh-auth-container">
        <div className="sh-auth-card">
          <h3 style={{ margin: 0, fontSize: 20, color: '#fff' }}>Verify your mobile</h3>
          <p style={{ margin: '4px 0 10px', fontSize: 13, color: 'var(--sh-mu)' }}>
            Enter the 4-digit code for <strong>+91 {draft.phone || '98765 43210'}</strong>.
          </p>

          {/* Test Mode Card (From ScoringHeroes.html) */}
          <div className="sh-test-mode-card">
            <div className="sh-test-mode-title">Test mode: no SMS was sent</div>
            <div className="sh-test-mode-body">
              The SMS service is not set up on the server yet, so your code is shown here:
              <b className="sh-test-mode-code">{DEMO_OTP}</b>
            </div>
          </div>

          <form className="sh-form" onSubmit={submit}>
            <div className="sh-otp-row">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (refs.current[i] = el)}
                  inputMode="numeric"
                  maxLength={1}
                  className="sh-otp-box"
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus()
                  }}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            {error && <p className="error" style={{ textAlign: 'center', margin: '4px 0' }}>{error}</p>}
            {resendNotice && (
              <p style={{ color: '#00e676', fontSize: 12, textAlign: 'center', margin: '4px 0' }}>
                New OTP generated: <strong>{DEMO_OTP}</strong>
              </p>
            )}

            <button className="sh-btn-submit" type="submit">
              Verify and continue
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
            <button
              className="sh-btn-ghost"
              type="button"
              disabled={seconds > 0}
              onClick={handleResend}
            >
              {seconds > 0 ? `Resend SMS in 0:${String(seconds).padStart(2, '0')}` : 'Resend SMS'}
            </button>

            <button
              className="sh-btn-ghost"
              type="button"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          <p style={{ fontSize: 11, color: 'var(--sh-mu)', margin: '8px 0 0', lineHeight: 1.4 }}>
            On Android, tap Allow when Chrome offers to read the code. On iPhone, tap the code above the keyboard.
          </p>
        </div>
      </div>
    </Screen>
  )
}

