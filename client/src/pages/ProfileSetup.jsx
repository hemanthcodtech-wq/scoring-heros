import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Screen, { Flow } from '../components/Screen'
import { useAuth } from '../context/AuthContext'

export default function ProfileSetup() {
  const navigate = useNavigate()
  const { draft, updateDraft } = useAuth()
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!draft.nickname.trim() || !draft.age || !draft.city.trim()) {
      setError('Nickname, age and city are required for your public card.')
      return
    }
    navigate('/role')
  }

  return (
    <Screen back title="Public profile">
      <Flow
        as="form"
        onSubmit={submit}
        foot={
          <button className="btn btn--primary" type="submit">
            Save public identity
          </button>
        }
      >
        <p className="kicker">Nickname • Age • Location</p>
        <h2 className="headline">This is what the cricket world will see.</h2>
        <p className="lede">
          Nickname becomes your brand on scorecards, auctions and Super Scoring 11. Legal name stays internal.
        </p>

        <label className="field">
          Public nickname
          <input
            placeholder="Blade"
            value={draft.nickname}
            onChange={(e) => updateDraft({ nickname: e.target.value })}
          />
        </label>
        <div className="split">
          <label className="field">
            Age
            <input
              inputMode="numeric"
              placeholder="18"
              value={draft.age}
              onChange={(e) => updateDraft({ age: e.target.value.replace(/\D/g, '').slice(0, 2) })}
            />
          </label>
          <label className="field">
            City
            <input
              placeholder="Chennai"
              value={draft.city}
              onChange={(e) => updateDraft({ city: e.target.value })}
            />
          </label>
        </div>
        {error ? <p className="error">{error}</p> : null}
      </Flow>
    </Screen>
  )
}
