import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic,
  Volume2,
  VolumeX,
  Languages,
  Sliders,
  Sparkles,
  Radio,
  Play,
  Square,
  Zap,
  Activity,
  Headphones,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react'
import Screen from '../components/Screen'
import { liveMatch } from '../data/demo'

export default function AICommentary() {
  const navigate = useNavigate()

  // Feature 9.1 Multi-Language Commentary
  const [selectedLanguage, setSelectedLanguage] = useState('en') // 'en' | 'hi' | 'ta' | 'te'
  // Feature 9.3 Emotion-Based Voice Modulation System
  const [voiceEmotion, setVoiceEmotion] = useState('excited') // 'calm' | 'excited' | 'classic'
  // Playback / Engine status
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  // Audio Mixer levels (Feature 9.4 Noise Cancellation & Feature 9.6 Commentary Mixer)
  const [aiVoiceVol, setAiVoiceVol] = useState(85)
  const [humanMicVol, setHumanMicVol] = useState(55)
  const [crowdVol, setCrowdVol] = useState(40)
  const [noiseFilterEnabled, setNoiseFilterEnabled] = useState(true)
  // Multi-device sync (Feature 9.8)
  const [syncStatus, setSyncStatus] = useState('0.04s low-latency')

  // Live commentary stream
  const [feedIndex, setFeedIndex] = useState(0)

  const commentaryLines = [
    {
      over: '10.3',
      text: 'FOUR! Brilliant timing through extra cover! Rohit leans into the drive with surgical elegance!',
      context: 'Rahul is 4 runs away from his fifty. The field moves back.',
      emotion: 'Excited • Pitch Modulated',
      event: 'BOUNDARY',
    },
    {
      over: '10.2',
      text: 'Good length on off stump, defended with soft hands into the gap on the on-side for a quick single.',
      context: 'Score ticks to 102/3. CRR at 10.05.',
      emotion: 'Calm Analysis',
      event: 'SINGLE',
    },
    {
      over: '10.1',
      text: 'UP IN THE AIR... AND CARRIED OVER THE ROPES! Smashed clean into the second tier! What monstrous power!',
      context: 'Warriors XI captain calls a team huddle.',
      emotion: 'Peak Hype (Stadium Pro)',
      event: 'SIX',
    },
    {
      over: '9.6',
      text: 'Appeal for LBW! Turned down by the umpire! Impact looked outside the line of off-stump.',
      context: 'Bowler considers DRS review. Clock running.',
      emotion: 'Tense',
      event: 'DOT',
    },
  ]

  // Simulate real-time commentary generation (Feature 9.2)
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setFeedIndex((prev) => (prev + 1) % commentaryLines.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isPlaying])

  const activeLine = commentaryLines[feedIndex]

  return (
    <Screen
      back
      title="AI Commentary"
      subtitle="Smart Voice & Broadcast Studio"
      right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="commentary-live-indicator">
            <Radio size={14} className="radio-pulse" />
            <span>AI ON AIR</span>
          </div>
        </div>
      }
    >
      <div className="ai-commentary-page">
        {/* Live Audio Engine Hero (Feature 9.2 Real-Time Commentary Generation) */}
        <div className="commentary-engine-card">
          <div className="engine-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Headphones size={18} color="#3de0ff" />
              <strong style={{ fontSize: 13 }}>LIVE AUDIO ENGINE</strong>
            </div>
            <span className="latency-badge">{syncStatus}</span>
          </div>

          {/* Dynamic Waveform Simulation */}
          <div className={`audio-waveform-container ${isPlaying ? 'is-animating' : ''}`}>
            <span className="wave-bar bar-1" />
            <span className="wave-bar bar-2" />
            <span className="wave-bar bar-3" />
            <span className="wave-bar bar-4" />
            <span className="wave-bar bar-5" />
            <span className="wave-bar bar-6" />
            <span className="wave-bar bar-7" />
            <span className="wave-bar bar-8" />
            <span className="wave-bar bar-9" />
            <span className="wave-bar bar-10" />
            <span className="wave-bar bar-11" />
            <span className="wave-bar bar-12" />
          </div>

          {/* Live Transcript Speech Bubble */}
          <div className="live-transcript-box">
            <div className="transcript-meta">
              <span className="transcript-over">BALL {activeLine.over}</span>
              <span className="transcript-emotion">{activeLine.emotion}</span>
            </div>
            <p className="transcript-quote">"{activeLine.text}"</p>
          </div>

          {/* Feature 9.7 Context-Aware Commentary System */}
          <div className="context-aware-banner">
            <Sparkles size={14} color="#3de0ff" />
            <div style={{ flex: 1 }}>
              <span className="context-title">MATCH CONTEXT & TACTICAL ANALYSIS</span>
              <p className="context-detail">{activeLine.context}</p>
            </div>
          </div>

          {/* Main Broadcast Control Button */}
          <button
            type="button"
            className={`btn btn--full ${isPlaying ? 'btn--primary' : 'btn--outline'}`}
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ marginTop: 6 }}
          >
            {isPlaying ? (
              <>
                <Square size={16} fill="white" /> Pause AI Commentary
              </>
            ) : (
              <>
                <Play size={16} fill="white" /> Start AI Commentary
              </>
            )}
          </button>
        </div>

        {/* Feature 9.1 Multi-Language Commentary System */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Languages size={18} color="var(--cyan)" />
            <h4 style={{ margin: 0, fontSize: 14 }}>Broadcast Language</h4>
          </div>
          <div className="language-selector-grid">
            {[
              { id: 'en', label: 'English', dialect: 'Neutral / Global' },
              { id: 'hi', label: 'हिंदी (Hindi)', dialect: 'Desi Energy' },
              { id: 'ta', label: 'தமிழ் (Tamil)', dialect: 'Kolly Vibe' },
              { id: 'te', label: 'తెలుగు (Telugu)', dialect: 'Mass Commentary' },
            ].map((lang) => (
              <button
                key={lang.id}
                type="button"
                className={`lang-card-btn ${selectedLanguage === lang.id ? 'is-active' : ''}`}
                onClick={() => setSelectedLanguage(lang.id)}
              >
                <strong>{lang.label}</strong>
                <small>{lang.dialect}</small>
              </button>
            ))}
          </div>
        </div>

        {/* Feature 9.3 Emotion-Based Voice Modulation System */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Zap size={18} color="#ffb300" />
            <h4 style={{ margin: 0, fontSize: 14 }}>Voice Emotion & Modulation</h4>
          </div>
          <div className="emotion-selector-pills">
            <button
              type="button"
              className={`emotion-pill ${voiceEmotion === 'calm' ? 'is-active' : ''}`}
              onClick={() => setVoiceEmotion('calm')}
            >
              😌 CALM & ANALYTICAL
            </button>
            <button
              type="button"
              className={`emotion-pill emotion-pill--excited ${voiceEmotion === 'excited' ? 'is-active' : ''}`}
              onClick={() => setVoiceEmotion('excited')}
            >
              🔥 EXCITED (STADIUM PRO)
            </button>
            <button
              type="button"
              className={`emotion-pill ${voiceEmotion === 'classic' ? 'is-active' : ''}`}
              onClick={() => setVoiceEmotion('classic')}
            >
              🎙️ CLASSIC RADIO
            </button>
          </div>
        </div>

        {/* Feature 9.6 Commentary Mixer System & Feature 9.4 Noise Cancellation */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sliders size={18} color="var(--cyan)" />
              <h4 style={{ margin: 0, fontSize: 14 }}>Commentary Mixer & Noise Cancellation</h4>
            </div>
            <button
              type="button"
              className={`filter-toggle-btn ${noiseFilterEnabled ? 'is-active' : ''}`}
              onClick={() => setNoiseFilterEnabled(!noiseFilterEnabled)}
            >
              {noiseFilterEnabled ? 'Noise Filter ON' : 'Noise Filter OFF'}
            </button>
          </div>

          <div className="mixer-sliders-list">
            <div className="mixer-row">
              <span className="mixer-label">AI Commentary Voice</span>
              <input
                type="range"
                min="0"
                max="100"
                value={aiVoiceVol}
                onChange={(e) => setAiVoiceVol(Number(e.target.value))}
                className="mixer-slider"
              />
              <span className="mixer-val">{aiVoiceVol}%</span>
            </div>

            <div className="mixer-row">
              <span className="mixer-label">Human Co-Commentator Mic</span>
              <input
                type="range"
                min="0"
                max="100"
                value={humanMicVol}
                onChange={(e) => setHumanMicVol(Number(e.target.value))}
                className="mixer-slider"
              />
              <span className="mixer-val">{humanMicVol}%</span>
            </div>

            <div className="mixer-row">
              <span className="mixer-label">Crowd & Atmosphere</span>
              <input
                type="range"
                min="0"
                max="100"
                value={crowdVol}
                onChange={(e) => setCrowdVol(Number(e.target.value))}
                className="mixer-slider"
              />
              <span className="mixer-val">{crowdVol}%</span>
            </div>
          </div>
        </div>

        {/* Feature 9.9 Auto Highlight Commentary System */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong style={{ fontSize: 13, color: '#fff' }}>Auto-Highlight Reels Voiceover</strong>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted)' }}>
                Generates instant audio clips for boundary and wicket replays.
              </p>
            </div>
            <span className="status-pill status-pill--completed">ENABLED</span>
          </div>
        </div>
      </div>
    </Screen>
  )
}
