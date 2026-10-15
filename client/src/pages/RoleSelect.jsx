import { useNavigate } from 'react-router-dom'
import Screen, { Flow } from '../components/Screen'
import { roles } from '../data/demo'
import { useAuth } from '../context/AuthContext'

export default function RoleSelect() {
  const navigate = useNavigate()
  const { draft, updateDraft } = useAuth()

  return (
    <Screen back title="Player role">
      <Flow
        foot={
          <button className="btn btn--primary" type="button" onClick={() => navigate('/privacy')}>
            Continue
          </button>
        }
      >
        <p className="kicker">How you play</p>
        <h2 className="headline">Pick your cricket role.</h2>
        <p className="lede">This powers Super Scoring 11 balance, auction categories and academy grouping.</p>

        <div className="role-list">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              className={`role-card ${draft.role === role.id ? 'is-on' : ''}`}
              onClick={() => updateDraft({ role: role.id })}
            >
              <strong>{role.title}</strong>
              <span>{role.copy}</span>
            </button>
          ))}
        </div>
      </Flow>
    </Screen>
  )
}
