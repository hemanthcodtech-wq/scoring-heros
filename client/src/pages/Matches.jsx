import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import { upcomingMatches } from '../data/demo'

export default function Matches() {
  const navigate = useNavigate()

  return (
    <Screen title="Matches">
      <button className="btn btn--primary" type="button" onClick={() => navigate('/app/scorer')}>
        Start live scoring
      </button>
      <div className="list" style={{ paddingBottom: 110 }}>
        {upcomingMatches.map((match) => (
          <article className="match-row" key={match.id}>
            <div>
              <p className="kicker">{match.live ? 'LIVE NOW' : match.when}</p>
              <h3>
                {match.a} vs {match.b}
              </h3>
              <p>
                {match.title} • {match.ground}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button type="button" className="chip-btn" onClick={() => navigate('/app/scorer')}>
                {match.live ? 'Score' : 'Preview'}
              </button>
              {match.live && (
                <>
                  <button
                    type="button"
                    className="chip-btn"
                    style={{ background: 'rgba(225,6,19,0.15)', color: '#ff8a93', borderColor: 'rgba(225,6,19,0.3)', fontSize: 10, padding: '4px 8px' }}
                    onClick={() => navigate('/app/highlights')}
                  >
                    🎬 Highlights
                  </button>
                  <button
                    type="button"
                    className="chip-btn"
                    style={{ background: 'rgba(61,224,255,0.12)', color: '#3de0ff', borderColor: 'rgba(61,224,255,0.3)', fontSize: 10, padding: '4px 8px' }}
                    onClick={() => navigate('/app/commentary')}
                  >
                    🎙️ AI Voice
                  </button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </Screen>
  )
}
