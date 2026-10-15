import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import BrandMark from './BrandMark'

export function Flow({ as: Tag = 'div', children, foot, onSubmit, className = '' }) {
  return (
    <Tag className={`flow ${className}`} onSubmit={onSubmit}>
      <div className="flow__main">{children}</div>
      {foot ? <div className="screen__foot">{foot}</div> : null}
    </Tag>
  )
}

export default function Screen({
  children,
  back,
  title,
  right,
  branded,
  padded = true,
  className = '',
}) {
  const navigate = useNavigate()

  return (
    <div className={`screen ${className}`}>
      {(back || title || branded) && (
        <header className="topbar">
          {back ? (
            <button className="icon-btn" type="button" onClick={() => navigate(-1)} aria-label="Back">
              <ChevronLeft size={22} />
            </button>
          ) : branded ? (
            <BrandMark size={28} withWord />
          ) : (
            <span className="icon-btn icon-btn--ghost" />
          )}
          {title ? <h1 className="topbar__title">{title}</h1> : <span />}
          <div className="topbar__right">{right}</div>
        </header>
      )}
      <div className={`screen__body ${padded ? 'screen__body--pad' : ''}`}>{children}</div>
    </div>
  )
}
