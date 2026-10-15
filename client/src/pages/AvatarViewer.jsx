import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { RotateCcw, Shirt, Share2, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
import Screen from '../components/Screen'

const JERSEYS = [
  { id: 'scoring', label: 'Scoring XI', primary: '#e10613', secondary: '#fff', num: '7' },
  { id: 'marina',  label: 'Marina XI',  primary: '#1d6dff', secondary: '#fff', num: '12' },
  { id: 'coastal', label: 'Coastal Kings', primary: '#059669', secondary: '#fff', num: '5' },
  { id: 'titans',  label: 'U19 Titans', primary: '#7c3aed', secondary: '#fbbf24', num: '3' },
]

export default function AvatarViewer() {
  const navigate = useNavigate()
  const [rotation, setRotation] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [jerseyIdx, setJerseyIdx] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [shareFlash, setShareFlash] = useState(false)
  const animRef = useRef(null)
  const lastRotRef = useRef(0)

  const jersey = JERSEYS[jerseyIdx]

  // auto-spin on mount
  useEffect(() => {
    setIsSpinning(true)
    let r = 0
    const spin = () => {
      r += 0.5
      setRotation(r % 360)
      animRef.current = requestAnimationFrame(spin)
    }
    animRef.current = requestAnimationFrame(spin)
    const t = setTimeout(() => {
      cancelAnimationFrame(animRef.current)
      setIsSpinning(false)
      setRotation(r % 360)
      lastRotRef.current = r % 360
    }, 2400)
    return () => {
      cancelAnimationFrame(animRef.current)
      clearTimeout(t)
    }
  }, [])

  // Drag to rotate
  const onPointerDown = (e) => {
    if (isSpinning) return
    setIsDragging(true)
    setDragStart({ x: e.clientX, startRot: lastRotRef.current })
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = useCallback((e) => {
    if (!isDragging || !dragStart) return
    const dx = e.clientX - dragStart.x
    const newRot = (dragStart.startRot + dx * 0.6) % 360
    setRotation(newRot)
  }, [isDragging, dragStart])

  const onPointerUp = useCallback((e) => {
    if (!isDragging) return
    setIsDragging(false)
    const dx = e.clientX - (dragStart?.x || 0)
    lastRotRef.current = (dragStart?.startRot + dx * 0.6) % 360
    setDragStart(null)
  }, [isDragging, dragStart])

  const spin360 = () => {
    if (isSpinning) return
    setIsSpinning(true)
    const startRot = lastRotRef.current
    let frame = 0
    const totalFrames = 90
    const step = () => {
      frame++
      const r = (startRot + (frame / totalFrames) * 360) % 360
      setRotation(r)
      if (frame < totalFrames) {
        animRef.current = requestAnimationFrame(step)
      } else {
        setIsSpinning(false)
        lastRotRef.current = r
      }
    }
    animRef.current = requestAnimationFrame(step)
  }

  // perspective transform from rotation angle
  const sinR = Math.sin((rotation * Math.PI) / 180)
  const scaleX = 0.85 + 0.15 * Math.abs(Math.cos((rotation * Math.PI) / 180))
  const shadowOpa = 0.3 + 0.2 * Math.abs(sinR)

  const shareAvatar = () => {
    setShareFlash(true)
    setTimeout(() => setShareFlash(false), 1500)
  }

  return (
    <Screen title="3D Avatar" back padded={false}>
      <div className="viewer-screen">
        {/* ── Stage ── */}
        <div
          className={`viewer-stage ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* ground shadow */}
          <div
            className="viewer-shadow"
            style={{
              opacity: shadowOpa,
              transform: `scaleX(${scaleX * zoom * 0.9})`,
            }}
          />

          {/* Avatar body SVG — simplified humanoid */}
          <div
            className="viewer-avatar"
            style={{
              transform: `scale(${zoom}) scaleX(${scaleX})`,
              filter: `drop-shadow(0 16px 32px ${jersey.primary}55)`,
            }}
          >
            <svg viewBox="0 0 120 220" className="viewer-avatar-svg" fill="none">
              {/* Head */}
              <ellipse cx="60" cy="30" rx="22" ry="26" fill="#f5c7a0" />
              {/* Hair */}
              <ellipse cx="60" cy="10" rx="22" ry="12" fill="#3b2008" />
              {/* Neck */}
              <rect x="52" y="53" width="16" height="12" rx="4" fill="#f5c7a0" />
              {/* Jersey body */}
              <path d="M28 65 L20 100 L20 145 L100 145 L100 100 L92 65 Q60 55 28 65Z"
                fill={jersey.primary} />
              {/* Jersey collar */}
              <path d="M48 65 Q60 78 72 65 L68 60 Q60 70 52 60Z"
                fill={jersey.secondary} opacity="0.9" />
              {/* Jersey number */}
              <text x="60" y="118" textAnchor="middle" fontSize="28" fontWeight="900"
                fill={jersey.secondary} opacity="0.85" fontFamily="Barlow Condensed, sans-serif">
                {jersey.num}
              </text>
              {/* Sleeves */}
              <path d="M28 65 L8 90 L18 96 L36 78Z" fill={jersey.primary} />
              <path d="M92 65 L112 90 L102 96 L84 78Z" fill={jersey.primary} />
              {/* Sleeve stripe */}
              <path d="M10 87 L19 93" stroke={jersey.secondary} strokeWidth="2" opacity="0.6" />
              <path d="M110 87 L101 93" stroke={jersey.secondary} strokeWidth="2" opacity="0.6" />
              {/* Pants */}
              <path d="M28 145 L24 200 L50 200 L60 165 L70 200 L96 200 L92 145Z"
                fill={sinR > 0 ? '#fff' : '#eee'} />
              {/* Pads / legs */}
              <rect x="26" y="196" width="24" height="10" rx="4" fill="#d4d4d4" />
              <rect x="70" y="196" width="24" height="10" rx="4" fill="#d4d4d4" />
              {/* Shoes */}
              <ellipse cx="38" cy="208" rx="14" ry="6" fill="#1a1a1a" />
              <ellipse cx="82" cy="208" rx="14" ry="6" fill="#1a1a1a" />
              {/* Face details */}
              {Math.cos((rotation * Math.PI) / 180) > 0 && (
                <>
                  <ellipse cx="52" cy="28" rx="4" ry="4.5" fill="#fff" />
                  <ellipse cx="68" cy="28" rx="4" ry="4.5" fill="#fff" />
                  <circle cx="53" cy="29" r="2.5" fill="#3b2008" />
                  <circle cx="69" cy="29" r="2.5" fill="#3b2008" />
                  <path d="M53 42 Q60 47 67 42" stroke="#c27d5a" strokeWidth="1.2" fill="none" />
                </>
              )}
            </svg>
          </div>

          {/* Drag hint */}
          {!isDragging && !isSpinning && (
            <div className="viewer-hint">
              <RotateCcw size={14} /> Drag to rotate
            </div>
          )}

          {/* Rotation indicator */}
          <div className="viewer-deg">{Math.round(((rotation % 360) + 360) % 360)}°</div>
        </div>

        {/* ── Controls ── */}
        <div className="viewer-controls">
          <button className="viewer-ctrl-btn" onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))} aria-label="Zoom out">
            <ZoomOut size={18} />
          </button>
          <button className="viewer-ctrl-btn viewer-ctrl-btn--spin" onClick={spin360} disabled={isSpinning} aria-label="Spin 360">
            <RotateCcw size={20} />
            <span>360°</span>
          </button>
          <button className="viewer-ctrl-btn" onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))} aria-label="Zoom in">
            <ZoomIn size={18} />
          </button>
        </div>

        {/* ── Jersey switcher ── */}
        <div className="viewer-jersey-row">
          <span className="viewer-jersey-title">Team Jersey</span>
          <div className="viewer-jersey-pick">
            <button className="viewer-jersey-nav" onClick={() => setJerseyIdx((i) => (i - 1 + JERSEYS.length) % JERSEYS.length)}>
              <ChevronLeft size={16} />
            </button>
            <span className="viewer-jersey-name" style={{ color: jersey.primary }}>{jersey.label}</span>
            <button className="viewer-jersey-nav" onClick={() => setJerseyIdx((i) => (i + 1) % JERSEYS.length)}>
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="viewer-jersey-swatches">
            {JERSEYS.map((j, i) => (
              <button
                key={j.id}
                className={`viewer-swatch ${i === jerseyIdx ? 'is-active' : ''}`}
                style={{ background: j.primary }}
                onClick={() => setJerseyIdx(i)}
                aria-label={j.label}
              />
            ))}
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="viewer-actions">
          <button
            className={`viewer-action-btn ${shareFlash ? 'is-flash' : ''}`}
            onClick={shareAvatar}
          >
            <Share2 size={16} />
            {shareFlash ? 'Copied link!' : 'Share'}
          </button>
          <button
            className="btn btn--primary viewer-action-btn viewer-action-btn--main"
            onClick={() => navigate('/app/avatar/jersey')}
          >
            <Shirt size={16} />
            Customise Jersey
          </button>
        </div>
      </div>
    </Screen>
  )
}
