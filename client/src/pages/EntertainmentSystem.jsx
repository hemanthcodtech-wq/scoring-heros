import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Radio,
  Share2,
  Upload,
  CheckCircle2,
  Sliders,
  Tv,
  Smartphone,
  Flame,
  Award,
  Layers,
  Repeat,
  Heart,
  Smile,
  Bell,
  Check,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function EntertainmentSystem() {
  const navigate = useNavigate()

  // Active Tab: 'entry' | 'soundboard' | 'highlights' | 'ai_audio' | 'library'
  const [activeTab, setActiveTab] = useState('entry')
  const [toastMsg, setToastMsg] = useState('')

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- AUDIO PLAYER STATE (FEATURE 20.1: Player Entry Theme Song System) ---
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(true)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [progress, setProgress] = useState(12) // seconds
  const [activeEventEffect, setActiveEventEffect] = useState(null)
  const [fanClapCount, setFanClapCount] = useState(1482)

  const tracks = [
    {
      id: 't1',
      title: 'HERO RISE',
      duration: '00:28',
      totalSec: 28,
      genre: 'Heavy Bass Drop & Trap',
      vibe: 'Intimidating Walkout',
      applied: true,
    },
    {
      id: 't2',
      title: 'GLORY BOUND',
      duration: '00:35',
      totalSec: 35,
      genre: 'Symphonic Rock & Brass',
      vibe: 'Heroic Entrance',
      applied: false,
    },
    {
      id: 't3',
      title: 'THUNDER STRIKE',
      duration: '00:30',
      totalSec: 30,
      genre: 'Electronic Synthwave',
      vibe: 'High Tempo Action',
      applied: false,
    },
    {
      id: 't4',
      title: 'VICTORY HORNS',
      duration: '00:25',
      totalSec: 25,
      genre: 'Stadium Brass & Drums',
      vibe: 'Carnival Celebration',
      applied: false,
    },
    {
      id: 't5',
      title: 'WARRIOR BEATS',
      duration: '00:40',
      totalSec: 40,
      genre: 'Traditional Dhol & Sub-Bass',
      vibe: 'Folk Champion Anthem',
      applied: false,
    },
  ]

  const currentTrack = tracks[currentTrackIndex]

  // Timer ticker when playing
  useEffect(() => {
    let interval = null
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentTrack.totalSec) {
            return isLooping ? 0 : currentTrack.totalSec
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, isLooping, currentTrack.totalSec])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    triggerToast(isPlaying ? 'Audio Paused' : `Now Playing: ${currentTrack.title}`)
  }

  const handleNextTrack = () => {
    setProgress(0)
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
    setIsPlaying(true)
    triggerToast(`Switched to: ${tracks[(currentTrackIndex + 1) % tracks.length].title}`)
  }

  const handlePrevTrack = () => {
    setProgress(0)
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
    setIsPlaying(true)
    triggerToast(`Switched to: ${tracks[(currentTrackIndex - 1 + tracks.length) % tracks.length].title}`)
  }

  const handleApplyAudio = () => {
    triggerToast(`✅ "${currentTrack.title}" applied as your match entry anthem!`)
  }

  // --- SOUNDBOARD TRIGGERS (FEATURE 20.10: Event-Based Audio Trigger System) ---
  const soundboardEvents = [
    { id: 'four', label: 'BOUNDARY 4', sound: 'Crowd Roar + Laser Synth', icon: '⚡', color: '#3de0ff' },
    { id: 'six', label: 'MAXIMUM 6', sound: 'Sub-Bass Drop + Fireworks', icon: '🚀', color: '#ffc83d' },
    { id: 'wicket', label: 'WICKET OUT', sound: 'Air Raid Siren + Red Flash', icon: '🚨', color: '#e10613' },
    { id: 'fifty', label: '50 MILESTONE', sound: 'Trumpet Fanfare + Clapping', icon: '🎖️', color: '#10b981' },
    { id: 'century', label: 'CENTURY 100', sound: 'Grand Stadium Anthem', icon: '👑', color: '#a855f7' },
    { id: 'horn', label: 'VUVUZELA', sound: 'Stadium Horn Blast', icon: '🎺', color: '#f97316' },
  ]

  const triggerSoundboardEvent = (ev) => {
    setActiveEventEffect(ev.id)
    triggerToast(`🔊 SFX Triggered: ${ev.label} (${ev.sound})`)
    setTimeout(() => setActiveEventEffect(null), 1800)
  }

  // --- FAN CLAPPING INTERACTION (FEATURE 20.11) ---
  const handleFanClap = () => {
    setFanClapCount((prev) => prev + 1)
    triggerToast('👏 Virtual Applause sent to stadium sound system!')
  }

  return (
    <Screen
      back
      title="Entertainment System"
      right={
        <button
          className="entertainment-top-btn"
          onClick={() => triggerToast('Audio Engine: Dolby Atmos 7.1 Virtual')}
          title="Audio Engine Info"
        >
          <Music size={18} color="#ffc83d" />
        </button>
      }
    >
      <div className="native-entertainment-app">
        {/* Floating Toast */}
        {toastMsg && (
          <div className="entertainment-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Sticky Segmented Navigation Tabs */}
        <div className="entertainment-nav-tabs-scroll">
          <button
            className={`ent-nav-tab ${activeTab === 'entry' ? 'active' : ''}`}
            onClick={() => setActiveTab('entry')}
          >
            <Music size={14} />
            <span>Walkout Theme</span>
          </button>
          <button
            className={`ent-nav-tab ${activeTab === 'soundboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('soundboard')}
          >
            <Zap size={14} />
            <span>Event SFX Board</span>
          </button>
          <button
            className={`ent-nav-tab ${activeTab === 'highlights' ? 'active' : ''}`}
            onClick={() => setActiveTab('highlights')}
          >
            <Radio size={14} />
            <span>DJ & Highlights</span>
          </button>
          <button
            className={`ent-nav-tab ${activeTab === 'ai_audio' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai_audio')}
          >
            <Sliders size={14} />
            <span>AI Voice & Music</span>
          </button>
          <button
            className={`ent-nav-tab ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            <Layers size={14} />
            <span>Media Library</span>
          </button>
        </div>

        {/* ================= TAB 1: PLAYER ENTRY THEME SONG SYSTEM (BLUEPRINT SCREEN) ================= */}
        {activeTab === 'entry' && (
          <div className="ent-tab-content">
            {/* Blueprint Centerpiece Card */}
            <div className="player-entry-card">
              <div className="player-entry-subheading">Player Entry Theme</div>

              {/* Glowing Golden Music Note Icon */}
              <div className="music-note-hero-icon">
                <Music size={44} color="#ffc83d" />
              </div>

              <div className="player-entry-title">PLAYER ENTRY THEME</div>

              {/* Dynamic Animated Sound Waveform Bars */}
              <div className={`audio-waveform-container ${isPlaying ? 'playing' : ''}`}>
                <div className="soundwave-bar bar-1"></div>
                <div className="soundwave-bar bar-2"></div>
                <div className="soundwave-bar bar-3"></div>
                <div className="soundwave-bar bar-4"></div>
                <div className="soundwave-bar bar-5"></div>
                <div className="soundwave-bar bar-6"></div>
                <div className="soundwave-bar bar-7"></div>
                <div className="soundwave-bar bar-8"></div>
                <div className="soundwave-bar bar-9"></div>
                <div className="soundwave-bar bar-10"></div>
                <div className="soundwave-bar bar-11"></div>
                <div className="soundwave-bar bar-12"></div>
                <div className="soundwave-bar bar-13"></div>
                <div className="soundwave-bar bar-14"></div>
                <div className="soundwave-bar bar-15"></div>
              </div>

              {/* Track Name & Duration Display (Matching Blueprint HERO RISE • 00:28) */}
              <div className="track-display-meta">
                {currentTrack.title} • {currentTrack.duration}
              </div>

              {/* Audio scrubber line */}
              <div className="audio-scrubber-bar">
                <div
                  className="audio-scrubber-fill"
                  style={{ width: `${(progress / currentTrack.totalSec) * 100}%` }}
                />
              </div>

              {/* Audio Transport Playback Controls: Prev, Big Circle Play/Pause, Next */}
              <div className="audio-transport-controls">
                <button
                  className="transport-btn skip"
                  onClick={handlePrevTrack}
                  title="Previous Anthem"
                >
                  <SkipBack size={20} color="#9aa8c7" />
                </button>

                <button
                  className="transport-btn main-play"
                  onClick={togglePlayPause}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause size={24} color="#ffffff" />
                  ) : (
                    <Play size={24} color="#ffffff" style={{ marginLeft: 3 }} />
                  )}
                </button>

                <button
                  className="transport-btn skip"
                  onClick={handleNextTrack}
                  title="Next Anthem"
                >
                  <SkipForward size={20} color="#9aa8c7" />
                </button>
              </div>

              {/* Audio Modifiers (Loop, Mute, Genre) */}
              <div className="audio-aux-controls">
                <button
                  className={`aux-pill-btn ${isLooping ? 'active' : ''}`}
                  onClick={() => {
                    setIsLooping(!isLooping)
                    triggerToast(isLooping ? 'Loop Disabled' : 'Loop Enabled')
                  }}
                >
                  <Repeat size={12} />
                  <span>Loop</span>
                </button>
                <button
                  className={`aux-pill-btn ${isMuted ? 'active' : ''}`}
                  onClick={() => {
                    setIsMuted(!isMuted)
                    triggerToast(isMuted ? 'Audio Unmuted' : 'Audio Muted')
                  }}
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  <span>{isMuted ? 'Muted' : 'Stereo'}</span>
                </button>
                <span className="aux-genre-pill">{currentTrack.genre}</span>
              </div>
            </div>

            {/* Stadium Walkout Anthems Playlist */}
            <div className="anthems-playlist-section">
              <div className="playlist-heading-row">
                <span className="playlist-heading-title">STADIUM WALKOUT PLAYLIST</span>
                <span className="playlist-count-pill">{tracks.length} Anthems</span>
              </div>

              <div className="playlist-items-list">
                {tracks.map((t, idx) => {
                  const isCurrent = idx === currentTrackIndex
                  return (
                    <div
                      key={t.id}
                      className={`playlist-track-row ${isCurrent ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentTrackIndex(idx)
                        setProgress(0)
                        setIsPlaying(true)
                        triggerToast(`Playing: ${t.title}`)
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="track-left-info">
                        <span className="track-idx-number">0{idx + 1}</span>
                        <div>
                          <div className="track-title-text">{t.title}</div>
                          <div className="track-genre-text">{t.vibe}</div>
                        </div>
                      </div>

                      <div className="track-right-meta">
                        <span className="track-duration-pill">{t.duration}</span>
                        {isCurrent && isPlaying ? (
                          <div className="mini-playing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Red Action CTA Button (Matching Blueprint: PLAY / APPLY AUDIO) */}
            <button className="entertainment-red-cta-btn" onClick={handleApplyAudio}>
              <Sparkles size={16} />
              <span>PLAY / APPLY AUDIO</span>
            </button>
          </div>
        )}

        {/* ================= TAB 2: EVENT SFX SOUNDBOARD (FEATURE 20.10 & 20.11) ================= */}
        {activeTab === 'soundboard' && (
          <div className="ent-tab-content">
            <div className="soundboard-header-card">
              <Zap size={24} color="#ffc83d" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Event-Based Audio Trigger System
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Instant match audio triggers & stadium DJ soundboard
                </div>
              </div>
            </div>

            {/* 6-Grid Soundboard Pads */}
            <div className="soundboard-grid">
              {soundboardEvents.map((ev) => {
                const isTriggered = activeEventEffect === ev.id
                return (
                  <button
                    key={ev.id}
                    className={`soundboard-pad-btn ${isTriggered ? 'triggered' : ''}`}
                    onClick={() => triggerSoundboardEvent(ev)}
                    style={{
                      borderColor: isTriggered ? ev.color : 'rgba(255,255,255,0.1)',
                      boxShadow: isTriggered ? `0 0 20px ${ev.color}80` : 'none',
                    }}
                  >
                    <span className="pad-icon">{ev.icon}</span>
                    <span className="pad-label">{ev.label}</span>
                    <span className="pad-sub">{ev.sound}</span>
                  </button>
                )
              })}
            </div>

            {/* Fan Interaction Section (FEATURE 20.11) */}
            <div className="fan-interaction-card">
              <div className="fan-row-head">
                <span className="fan-title">Fan Crowd Interaction</span>
                <span className="fan-counter-badge">👏 {fanClapCount} LIVE CHEERS</span>
              </div>
              <p className="fan-desc">
                Tap to trigger real-time crowd applause and stadium virtual cheer in the commentary stream.
              </p>
              <div className="fan-buttons-row">
                <button className="fan-cheer-btn" onClick={handleFanClap}>
                  👏 Applause
                </button>
                <button
                  className="fan-cheer-btn"
                  onClick={() => triggerToast('📢 Vuvuzela horn sounded!')}
                >
                  📢 Horn
                </button>
                <button
                  className="fan-cheer-btn"
                  onClick={() => triggerToast('🔥 Crowd Mexican Wave started!')}
                >
                  🔥 Wave
                </button>
                <button
                  className="fan-cheer-btn"
                  onClick={() => triggerToast('❤️ Team chants synced!')}
                >
                  ❤️ Chant
                </button>
              </div>
            </div>

            <button
              className="entertainment-red-cta-btn"
              onClick={() => triggerToast('Soundboard preset saved to live match mode')}
            >
              <span>SAVE SOUNDBOARD PRESET</span>
            </button>
          </div>
        )}

        {/* ================= TAB 3: HIGHLIGHT BACKGROUND MUSIC & CELEBRATIONS ================= */}
        {activeTab === 'highlights' && (
          <div className="ent-tab-content">
            <div className="highlights-hero-card">
              <Radio size={24} color="#3de0ff" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Highlight Background Music & Celebrations
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Automated music overlays for sixes, wickets & video packages
                </div>
              </div>
            </div>

            {/* Music Style Selector */}
            <div className="ent-config-card">
              <span className="config-card-title">HIGHLIGHT BGM MOOD</span>
              <div className="mood-pills-row">
                {['Epic Orchestral', 'Cyberpunk Trap', 'Stadium Rock', 'Adrenaline EDM'].map(
                  (mood, idx) => (
                    <button
                      key={mood}
                      className={`mood-pill-btn ${idx === 0 ? 'active' : ''}`}
                      onClick={() => triggerToast(`Highlight BGM set to: ${mood}`)}
                    >
                      {mood}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Celebration Effects Trigger (FEATURE 20.5) */}
            <div className="ent-config-card">
              <span className="config-card-title">PLAYER CELEBRATION EFFECTS</span>
              <div className="celebration-toggles-list">
                <div className="toggle-item-row">
                  <div>
                    <div className="toggle-title">Milestone Confetti & Pyro FX</div>
                    <div className="toggle-desc">Trigger stadium graphics on 50 / 100 runs</div>
                  </div>
                  <input type="checkbox" defaultChecked className="ent-switch" />
                </div>
                <div className="toggle-item-row">
                  <div>
                    <div className="toggle-title">Wicket Strobe & Siren</div>
                    <div className="toggle-desc">Flashing stadium LED animation with siren SFX</div>
                  </div>
                  <input type="checkbox" defaultChecked className="ent-switch" />
                </div>
                <div className="toggle-item-row">
                  <div>
                    <div className="toggle-title">Victory Fireworks Theme</div>
                    <div className="toggle-desc">Grand climax theme playback on winning ball</div>
                  </div>
                  <input type="checkbox" defaultChecked className="ent-switch" />
                </div>
              </div>
            </div>

            <button
              className="entertainment-red-cta-btn"
              onClick={() => triggerToast('Highlight audio overlays applied to your recent clips!')}
            >
              <span>APPLY HIGHLIGHT BGM</span>
            </button>
          </div>
        )}

        {/* ================= TAB 4: AI AUDIO & SYNTHESIZER (FEATURE 20.7 & 20.3) ================= */}
        {activeTab === 'ai_audio' && (
          <div className="ent-tab-content">
            <div className="ai-audio-hero-card">
              <Sliders size={24} color="#a855f7" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  AI-Generated Audio Content System
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Neural audio synthesis & personalized match commentary tones
                </div>
              </div>
            </div>

            {/* Prompt Generator Box */}
            <div className="ent-config-card">
              <span className="config-card-title">PROMPT-TO-ANTHEM GENERATOR</span>
              <textarea
                className="ai-prompt-input"
                rows={3}
                defaultValue="Aggressive entry theme with thumping stadium 808s, roaring crowd chants, high tempo 140 BPM, electric guitar solo"
              />
              <button
                className="ai-generate-theme-btn"
                onClick={() => triggerToast('AI Audio synthesizing new 30s anthem in background...')}
              >
                <Sparkles size={14} color="#ffc83d" />
                <span>GENERATE CUSTOM AI ANTHEM</span>
              </button>
            </div>

            {/* Commentary Voice Personalization */}
            <div className="ent-config-card">
              <span className="config-card-title">COMMENTARY TONE & STYLE</span>
              <div className="voice-styles-grid">
                {[
                  { name: 'Passionate Hindi', style: 'Energy & Shayaris', icon: '🇮🇳' },
                  { name: 'Classic English', style: 'Crisp & Technical', icon: '🇬🇧' },
                  { name: 'Stadium Hype', style: 'DJ Screams & FX', icon: '🎧' },
                  { name: 'Tactical Analyst', style: 'Fielding & Run-Rate', icon: '📊' },
                ].map((v, i) => (
                  <div
                    key={v.name}
                    className={`voice-card ${i === 0 ? 'active' : ''}`}
                    onClick={() => triggerToast(`Commentary Voice set to: ${v.name}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <span style={{ fontSize: 20 }}>{v.icon}</span>
                    <div className="voice-name">{v.name}</div>
                    <div className="voice-style">{v.style}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="entertainment-red-cta-btn"
              onClick={() => triggerToast('AI Audio preferences saved!')}
            >
              <span>SAVE AUDIO PREFERENCES</span>
            </button>
          </div>
        )}

        {/* ================= TAB 5: MEDIA CONTENT LIBRARY & UPLOAD (FEATURE 20.6 & 20.12) ================= */}
        {activeTab === 'library' && (
          <div className="ent-tab-content">
            {/* Custom Sound Upload Section (FEATURE 20.12) */}
            <div className="custom-upload-card">
              <Upload size={32} color="#3de0ff" />
              <div className="upload-title">Custom Sound Upload System</div>
              <div className="upload-desc">
                Upload your MP3, WAV or AAC audio clips (max 60 seconds) to use as your personalized walkout theme.
              </div>
              <button
                className="upload-dropzone-btn"
                onClick={() => triggerToast('File Picker opened: Select your MP3/WAV audio track')}
              >
                <span>CHOOSE AUDIO FILE</span>
              </button>
            </div>

            {/* Multi-Device Entertainment Sync (FEATURE 20.9) */}
            <div className="ent-config-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="config-card-title">MULTI-DEVICE ENTERTAINMENT SYNC</span>
                <span className="sync-online-badge">● SYNCED</span>
              </div>
              <div className="devices-sync-row">
                <div className="device-item active">
                  <Smartphone size={18} color="#3de0ff" />
                  <span>Mobile Phone</span>
                </div>
                <div className="device-item active">
                  <Tv size={18} color="#10b981" />
                  <span>Living Room TV</span>
                </div>
                <div className="device-item">
                  <Radio size={18} color="#9aa8c7" />
                  <span>Stadium PA</span>
                </div>
              </div>
            </div>

            {/* Social Media Sharing (FEATURE 20.8) */}
            <div className="ent-config-card">
              <span className="config-card-title">SOCIAL MEDIA ENTERTAINMENT SHARING</span>
              <p style={{ margin: '4px 0 10px', fontSize: 11, color: '#9aa8c7' }}>
                Export your walkout theme synced with your 3D avatar animation directly to social channels.
              </p>
              <div className="social-share-buttons-row">
                <button
                  className="social-btn instagram"
                  onClick={() => triggerToast('Exporting to Instagram Story with Anthem Audio...')}
                >
                  <Share2 size={14} />
                  <span>Instagram</span>
                </button>
                <button
                  className="social-btn whatsapp"
                  onClick={() => triggerToast('Sharing Audio Highlight to WhatsApp...')}
                >
                  <Share2 size={14} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            <button
              className="entertainment-red-cta-btn"
              onClick={() => triggerToast('Media library refreshed')}
            >
              <span>MANAGE SAVED TRACKS</span>
            </button>
          </div>
        )}
      </div>
    </Screen>
  )
}
