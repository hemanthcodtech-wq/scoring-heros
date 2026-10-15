import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onboardingSlides, sports } from '../data/demo'
import Screen, { Flow } from '../components/Screen'

export default function Onboarding() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const slide = onboardingSlides[index]
  const last = index === onboardingSlides.length - 1

  return (
    <Screen back>
      <Flow
        foot={
          <>
            <div className="dots">
              {onboardingSlides.map((s, i) => (
                <button
                  key={s.title}
                  className={i === index ? 'is-on' : ''}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button
              className="btn btn--primary"
              type="button"
              onClick={() => (last ? navigate('/register') : setIndex((i) => i + 1))}
            >
              {last ? 'Continue with cricket' : 'Continue'}
            </button>
          </>
        }
      >
        <p className="kicker">{slide.kicker}</p>
        <h2 className="headline">{slide.title}</h2>
        <p className="lede">{slide.copy}</p>

        {last ? (
          <div className="sport-grid">
            {sports.map((sport) => (
              <button
                key={sport.id}
                className={`sport-chip ${sport.focus ? 'is-on' : 'is-off'}`}
                type="button"
              >
                <span>{sport.emoji}</span>
                <strong>{sport.name}</strong>
                <small>{sport.focus ? 'Launch sport' : 'Later phase'}</small>
              </button>
            ))}
          </div>
        ) : (
          <div className="preview-card">
            <div className="preview-card__art">
              <span>Android</span>
              <span>iOS</span>
              <span>Web</span>
              <span className="is-later">TV later</span>
            </div>
            <div>
              <strong>One career. Every device.</strong>
              <p>Android, iOS and web now. Smart TV later.</p>
            </div>
          </div>
        )}
      </Flow>
    </Screen>
  )
}
