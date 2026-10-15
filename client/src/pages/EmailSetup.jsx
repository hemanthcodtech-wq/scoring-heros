import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen, { Flow } from '../components/Screen'
import { useAuth } from '../context/AuthContext'

export default function EmailSetup() {
  const navigate = useNavigate()
  const { draft, updateDraft } = useAuth()
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
      setError('Enter a valid email for recovery.')
      return
    }
    setError('')
    navigate('/profile')
  }

  return (
    <Screen back title="Email recovery">
      <Flow
        as="form"
        onSubmit={submit}
        foot={
          <>
            <button className="btn btn--primary" type="submit">
              Confirm email
            </button>
            <button className="btn btn--ghost" type="button" onClick={() => navigate('/profile')}>
              Skip for now
            </button>
          </>
        }
      >
        <p className="kicker">Secondary identity</p>
        <h2 className="headline">Add an email for account recovery.</h2>
        <p className="lede">
          Email stays private. It is used for reports, auction receipts and restoring access if you change numbers.
        </p>

        <label className="field">
          Email
          <input
            type="email"
            placeholder="you@scoringheroes.in"
            value={draft.email}
            onChange={(e) => updateDraft({ email: e.target.value })}
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
      </Flow>
    </Screen>
  )
}
