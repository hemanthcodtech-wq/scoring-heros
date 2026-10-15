import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, RefreshCw, Zap, Shield, X } from 'lucide-react'
import Screen from '../components/Screen'

const TIPS = [
  'Face the camera straight-on',
  'Good even lighting works best',
  'Remove glasses if possible',
  'Keep a neutral expression',
]

export default function AvatarCapture() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [phase, setPhase] = useState('intro') // intro | live | countdown | done
  const [countdown, setCountdown] = useState(3)
  const [tipIdx, setTipIdx] = useState(0)
  const [faceLocked, setFaceLocked] = useState(false)
  const [capturedSrc, setCapturedSrc] = useState(null)
  const [camErr, setCamErr] = useState(false)
  const [facing, setFacing] = useState('user')

  // cycle tips
  useEffect(() => {
    const t = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 2500)
    return () => clearInterval(t)
  }, [])

  // simulate face lock after camera starts
  useEffect(() => {
    if (phase === 'live') {
      const t = setTimeout(() => setFaceLocked(true), 1800)
      return () => clearTimeout(t)
    }
  }, [phase])

  const startCamera = useCallback(async () => {
    setCamErr(false)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: 640, height: 640 },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setPhase('live')
      setFaceLocked(false)
    } catch {
      setCamErr(true)
      setPhase('live') // still show simulated UI
    }
  }, [facing])

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }, [])

  useEffect(() => () => stopCamera(), [stopCamera])

  const flipCamera = async () => {
    stopCamera()
    setFacing((f) => (f === 'user' ? 'environment' : 'user'))
    setPhase('intro')
    setTimeout(startCamera, 300)
  }

  const shoot = () => {
    if (phase !== 'live' || !faceLocked) return
    setPhase('countdown')
    let c = 3
    setCountdown(c)
    const t = setInterval(() => {
      c -= 1
      setCountdown(c)
      if (c === 0) {
        clearInterval(t)
        captureFrame()
      }
    }, 900)
  }

  const captureFrame = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (video && canvas) {
      canvas.width = video.videoWidth || 400
      canvas.height = video.videoHeight || 400
      canvas.getContext('2d').drawImage(video, 0, 0)
      setCapturedSrc(canvas.toDataURL('image/jpeg', 0.9))
    } else {
      // fallback — no real camera
      setCapturedSrc(null)
    }
    stopCamera()
    setPhase('done')
  }

  const retake = () => {
    setCapturedSrc(null)
    setPhase('intro')
    setFaceLocked(false)
  }

  return (
    <Screen title="Selfie Capture" back padded={false}>
      <div className="capture-screen">
        {/* ───── INTRO ───── */}
        {phase === 'intro' && (
          <div className="capture-intro">
            <div className="capture-intro__art">
              <div className="capture-frame-outline">
                <div className="capture-corner capture-corner--tl" />
                <div className="capture-corner capture-corner--tr" />
                <div className="capture-corner capture-corner--bl" />
                <div className="capture-corner capture-corner--br" />
                <div className="capture-face-ghost">
                  <div className="capture-face-oval" />
                  <div className="capture-face-dots">
                    <span /><span /><span /><span /><span />
                  </div>
                </div>
              </div>
            </div>

            <div className="capture-intro__info">
              <p className="kicker">AI Face Mapping</p>
              <h2 className="headline">Position your face</h2>
              <p className="lede">
                We'll map 68 facial landmarks to build your personal 3D avatar. No data leaves your device.
              </p>
              <div className="capture-tips">
                {TIPS.map((tip, i) => (
                  <div key={tip} className={`capture-tip ${i === tipIdx ? 'is-active' : ''}`}>
                    <Zap size={14} />
                    {tip}
                  </div>
                ))}
              </div>
              <div className="capture-privacy-badge">
                <Shield size={14} />
                On-device only · GDPR compliant
              </div>
            </div>

            <div className="capture-intro__foot">
              <button className="btn btn--primary" onClick={startCamera}>
                <Camera size={18} style={{ marginRight: 8 }} />
                Open Camera
              </button>
            </div>
          </div>
        )}

        {/* ───── LIVE / COUNTDOWN ───── */}
        {(phase === 'live' || phase === 'countdown') && (
          <div className="capture-live">
            <div className="capture-viewport">
              {/* Real video or simulated bg */}
              {!camErr ? (
                <video
                  ref={videoRef}
                  className="capture-video"
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <div className="capture-video capture-video--sim">
                  <div className="capture-sim-face">
                    <div className="capture-sim-oval" />
                  </div>
                </div>
              )}

              {/* Overlay frame */}
              <div className={`capture-overlay ${faceLocked ? 'is-locked' : ''}`}>
                <div className="capture-ov-corner capture-ov-corner--tl" />
                <div className="capture-ov-corner capture-ov-corner--tr" />
                <div className="capture-ov-corner capture-ov-corner--bl" />
                <div className="capture-ov-corner capture-ov-corner--br" />

                {/* Landmark dots */}
                {faceLocked && (
                  <div className="capture-landmarks">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div
                        key={i}
                        className="capture-landmark"
                        style={{
                          left: `${20 + (i % 7) * 10}%`,
                          top: `${20 + Math.floor(i / 7) * 20}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                    <svg className="capture-mesh" viewBox="0 0 200 200" preserveAspectRatio="none">
                      <polyline points="40,50 60,40 80,42 100,40 120,42 140,50" stroke="rgba(61,224,255,0.4)" strokeWidth="0.8" fill="none" />
                      <polyline points="40,80 60,72 80,70 100,68 120,70 140,72 160,80" stroke="rgba(61,224,255,0.4)" strokeWidth="0.8" fill="none" />
                      <polyline points="60,110 80,115 100,118 120,115 140,110" stroke="rgba(61,224,255,0.4)" strokeWidth="0.8" fill="none" />
                      <polyline points="70,140 100,148 130,140" stroke="rgba(61,224,255,0.35)" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                )}

                {/* Scan line */}
                <div className={`capture-scan ${faceLocked ? 'is-on' : ''}`} />
              </div>

              {/* Status badge */}
              <div className={`capture-status ${faceLocked ? 'is-good' : ''}`}>
                {faceLocked ? '✓ Face detected — 68 landmarks mapped' : 'Looking for face…'}
              </div>

              {/* Countdown bubble */}
              {phase === 'countdown' && (
                <div className="capture-countdown">{countdown || '📸'}</div>
              )}
            </div>

            {/* Controls */}
            <div className="capture-controls">
              <button className="capture-ctrl-btn" onClick={retake} aria-label="Cancel">
                <X size={20} />
              </button>
              <button
                id="shoot-btn"
                className={`capture-shutter ${faceLocked && phase === 'live' ? 'is-ready' : ''}`}
                onClick={shoot}
                disabled={!faceLocked || phase === 'countdown'}
                aria-label="Take photo"
              >
                <div className="capture-shutter__ring" />
                <div className="capture-shutter__inner" />
              </button>
              <button className="capture-ctrl-btn" onClick={flipCamera} aria-label="Flip camera">
                <RefreshCw size={20} />
              </button>
            </div>
            <p className="capture-hint">
              {faceLocked ? 'Tap the shutter to capture' : 'Align your face in the frame'}
            </p>
          </div>
        )}

        {/* ───── DONE ───── */}
        {phase === 'done' && (
          <div className="capture-done">
            <div className="capture-done__preview">
              {capturedSrc ? (
                <img src={capturedSrc} alt="Captured selfie" className="capture-done__img" />
              ) : (
                <div className="capture-done__img capture-done__img--sim">
                  <div className="capture-sim-oval--lg" />
                  <p>Selfie captured</p>
                </div>
              )}
              <div className="capture-done__badge">
                <span>✓</span> 68 landmarks
              </div>
            </div>

            <div className="capture-done__info">
              <p className="kicker">Selfie captured</p>
              <h2 className="headline">Looking great!</h2>
              <p className="lede">
                Your face has been analysed. Ready to generate your 3D avatar.
              </p>
            </div>

            <div className="capture-done__actions">
              <button className="btn btn--ghost" style={{ marginBottom: 10 }} onClick={retake}>
                Retake selfie
              </button>
              <button
                className="btn btn--primary"
                onClick={() => navigate('/app/avatar/mapping')}
              >
                Generate 3D Avatar →
              </button>
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        )}

        {/* hidden canvas for capture frame */}
        {phase !== 'done' && <canvas ref={canvasRef} style={{ display: 'none' }} />}
      </div>
    </Screen>
  )
}
