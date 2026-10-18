import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import { COUNTRIES } from '../data/countries'

export default function CountryCodePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef(null)

  const selectedCountry = COUNTRIES.find((c) => c.dial === value) || COUNTRIES[0]

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className="sh-country-picker" ref={containerRef}>
      <button
        type="button"
        className="sh-country-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title={`${selectedCountry.name} (${selectedCountry.dial})`}
      >
        <span className="sh-country-flag">{selectedCountry.flag}</span>
        <span className="sh-country-dial">{selectedCountry.dial}</span>
        <ChevronDown size={14} className="sh-country-arrow" />
      </button>

      {isOpen && (
        <div className="sh-country-dropdown">
          <div className="sh-country-search-wrap">
            <Search size={14} color="var(--muted)" />
            <input
              type="text"
              className="sh-country-search-input"
              placeholder="Search country or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {search && (
              <button
                type="button"
                className="sh-country-search-clear"
                onClick={() => setSearch('')}
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="sh-country-list">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={`${c.code}-${c.dial}`}
                  type="button"
                  className={`sh-country-item ${c.dial === value ? 'is-selected' : ''}`}
                  onClick={() => {
                    onChange(c.dial)
                    setIsOpen(false)
                    setSearch('')
                  }}
                >
                  <span className="sh-country-flag">{c.flag}</span>
                  <span className="sh-country-name">{c.name}</span>
                  <span className="sh-country-dial-code">{c.dial}</span>
                </button>
              ))
            ) : (
              <div className="sh-country-empty">No country found</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
