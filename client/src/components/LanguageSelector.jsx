import { useState, useRef, useEffect } from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageSelector({ compact = false }) {
  const { lang, setLang, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const activeLang = languages.find((l) => l.code === lang) || languages[0]

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="sh-lang-container" ref={ref}>
      <button
        type="button"
        className={`sh-lang-btn ${compact ? 'sh-lang-btn--compact' : ''}`}
        onClick={() => setOpen(!open)}
        title="Select Language / भाषा चुनें"
      >
        <Globe size={15} color="#3de0ff" />
        <span className="sh-lang-text">
          {activeLang.flag} {activeLang.native}
        </span>
      </button>

      {open && (
        <div className="sh-lang-dropdown">
          <div className="sh-lang-header">
            <span>🌐 Select Language</span>
          </div>
          <div className="sh-lang-grid">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                className={`sh-lang-item ${l.code === lang ? 'is-active' : ''}`}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
              >
                <span className="sh-lang-flag">{l.flag}</span>
                <div className="sh-lang-names">
                  <strong>{l.native}</strong>
                  <small>{l.label}</small>
                </div>
                {l.code === lang && <Check size={14} color="#00e676" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
