import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Video,
  Mic,
  Play,
  Pause,
  Camera,
  Share2,
  Scissors,
  Archive,
  FileText,
  Sparkles,
  Upload,
  Radio,
  Tv,
  CheckCircle2,
  Award,
  Flame,
  Globe,
  Clock,
  ChevronRight,
  Filter,
  Search,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Check,
  RotateCcw,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function InterviewMediaSystem() {
  const navigate = useNavigate()

  // Active Tab: 'record' | 'match_review' | 'hype' | 'clips' | 'archive' | 'portfolio'
  const [activeTab, setActiveTab] = useState('record')
  const [toastMsg, setToastMsg] = useState('')

  // Toast helper
  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- RECORDING STATE (FEATURE 21.1, 21.2, 21.3, 21.4, 21.5) ---
  const [isRecording, setIsRecording] = useState(false)
  const [recordSec, setRecordSec] = useState(0)
  const [activeDurationFormat, setActiveDurationFormat] = useState('highlight') // 'full' (08:24) | 'highlight' (00:30) | 'quote' (00:12)
  const [interviewCategory, setInterviewCategory] = useState('player') // 'player' | 'review' | 'hype' | 'coach' | 'story'

  useEffect(() => {
    let timer = null
    if (isRecording) {
      timer = setInterval(() => {
        setRecordSec((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordSec(0)
    }
    return () => clearInterval(timer)
  }, [isRecording])

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true)
      triggerToast('🔴 Recording started! HD video + noise-cancelled audio capture.')
    } else {
      setIsRecording(false)
      triggerToast('✅ Interview saved! Processing AI transcription & clip extraction.')
    }
  }

  // --- SAMPLE INTERVIEW ARCHIVE DATA (FEATURE 21.9) ---
  const [interviewList, setInterviewList] = useState([
    {
      id: 'int-1',
      title: 'Post-Match: "We trusted our death bowling plans"',
      speaker: 'Rohit Sharma (Captain)',
      type: 'Match Review',
      duration: '03:45',
      timeAgo: '2h ago',
      views: '14.2K',
      likes: '1.8K',
      status: 'Published',
      thumbnailBg: 'linear-gradient(135deg, #0d2352 0%, #173b82 100%)',
      quote: 'The yorkers in the 19th over turned the entire momentum.',
    },
    {
      id: 'int-2',
      title: 'Pre-Match Hype: Ready for the Derby Clash',
      speaker: 'Virat Kohli (Top Order)',
      type: 'Pre-Match Hype',
      duration: '01:20',
      timeAgo: '5h ago',
      views: '28.9K',
      likes: '4.1K',
      status: 'Published',
      thumbnailBg: 'linear-gradient(135deg, #3d1420 0%, #7d1a29 100%)',
      quote: 'Crowd energy here gives us an extra 10% on the field.',
    },
    {
      id: 'int-3',
      title: 'Academy Story: From District Mud Pit to State Finals',
      speaker: 'Arjun Das (Rising Pacer)',
      type: 'Player Story',
      duration: '06:15',
      timeAgo: '1d ago',
      views: '9.4K',
      likes: '890',
      status: 'Archived',
      thumbnailBg: 'linear-gradient(135deg, #0f2e24 0%, #155e47 100%)',
      quote: 'My coach gave me my first leather ball when I had nothing.',
    },
    {
      id: 'int-4',
      title: 'Official Press: Ground Conditions & Rain Contingency',
      speaker: 'Tournament Director',
      type: 'Organizer Press',
      duration: '02:50',
      timeAgo: '2d ago',
      views: '5.1K',
      likes: '340',
      status: 'Published',
      thumbnailBg: 'linear-gradient(135deg, #281a42 0%, #4c2d7d 100%)',
      quote: 'Sub-air drainage ensures resumption within 15 minutes of rain stopping.',
    },
  ])

  // --- AI CLIP HIGHLIGHTING STATE (FEATURE 21.8) ---
  const [extractedClips, setExtractedClips] = useState([
    {
      id: 'clip-1',
      title: 'Viral Quote: "Confidence comes from nets"',
      duration: '00:15',
      aspectRatio: '9:16 Reel',
      views: '42.8K',
    },
    {
      id: 'clip-2',
      title: 'Tactical Breakdown: Slower bouncer setup',
      duration: '00:28',
      aspectRatio: '9:16 Reel',
      views: '18.4K',
    },
    {
      id: 'clip-3',
      title: 'Emotional Trophy Dedication',
      duration: '00:22',
      aspectRatio: '9:16 Reel',
      views: '33.1K',
    },
  ])

  return (
    <Screen
      back
      title="Interview & Media"
      right={
        <button
          className="interview-top-btn"
          onClick={() => triggerToast('Interview Studio v3.4 • HD Cloud Sync Ready')}
          title="Studio Status"
        >
          <Camera size={18} color="#3de0ff" />
        </button>
      }
    >
      <div className="native-interview-app">
        {/* Floating Toast Notification */}
        {toastMsg && (
          <div className="interview-floating-toast">
            <Sparkles size={14} color="#3de0ff" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Sticky Segmented Navigation Tabs */}
        <div className="interview-nav-tabs-scroll">
          <button
            className={`interview-nav-tab ${activeTab === 'record' ? 'active' : ''}`}
            onClick={() => setActiveTab('record')}
          >
            <Video size={14} />
            <span>Interview Studio</span>
          </button>
          <button
            className={`interview-nav-tab ${activeTab === 'match_review' ? 'active' : ''}`}
            onClick={() => setActiveTab('match_review')}
          >
            <Mic size={14} />
            <span>Match Review</span>
          </button>
          <button
            className={`interview-nav-tab ${activeTab === 'hype' ? 'active' : ''}`}
            onClick={() => setActiveTab('hype')}
          >
            <Flame size={14} />
            <span>Pre-Match Hype</span>
          </button>
          <button
            className={`interview-nav-tab ${activeTab === 'clips' ? 'active' : ''}`}
            onClick={() => setActiveTab('clips')}
          >
            <Scissors size={14} />
            <span>AI Clip Extractor</span>
          </button>
          <button
            className={`interview-nav-tab ${activeTab === 'archive' ? 'active' : ''}`}
            onClick={() => setActiveTab('archive')}
          >
            <Archive size={14} />
            <span>Media Archive</span>
          </button>
          <button
            className={`interview-nav-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            <Award size={14} />
            <span>Player Portfolio</span>
          </button>
        </div>

        {/* ================= TAB 1: INTERVIEW STUDIO & RECORDING (BLUEPRINT SCREEN 21.1) ================= */}
        {activeTab === 'record' && (
          <div className="interview-tab-content">
            {/* Centerpiece Interview Card (Matching Blueprint Screenshot) */}
            <div className="interview-studio-card">
              <div className="studio-card-subheading">Player Interview Recording</div>

              {/* Camera Preview Area with Red Mic Halo & Secure Play Watermark */}
              <div className="studio-camera-preview-box">
                <div className="camera-live-badge">
                  {isRecording ? (
                    <>
                      <span className="live-dot-pulse"></span>
                      <span>REC {String(Math.floor(recordSec / 60)).padStart(2, '0')}:{String(recordSec % 60).padStart(2, '0')}</span>
                    </>
                  ) : (
                    <>
                      <span className="standby-dot"></span>
                      <span>CAMERA READY (1080p 60fps)</span>
                    </>
                  )}
                </div>

                <div className="preview-watermark-overlay">
                  <div className="watermark-logo-badge">
                    <span className="wm-scoring">SCORING</span>
                    <span className="wm-heroes">HEROES</span>
                  </div>
                  <div className="wm-secure-text">Secure Player Feed</div>
                </div>

                {/* Center Glowing Mic Icon */}
                <div className={`studio-mic-hero-icon ${isRecording ? 'recording' : ''}`}>
                  <Mic size={36} color="#ffffff" />
                </div>

                {/* Subtitle / Prompter overlay */}
                <div className="teleprompter-caption-box">
                  <p className="prompter-text">
                    {isRecording
                      ? '"How did the pitch play in the opening 6 overs, and what was your team talk during the innings break?"'
                      : 'Position speaker inside frame • Audio auto-leveling active'}
                  </p>
                </div>
              </div>

              {/* Header Title Text */}
              <div className="studio-interview-title">PLAYER INTERVIEW</div>

              {/* Segmented Duration Format Selector (Matching Blueprint: FULL 08:24 | HIGHLIGHT 00:30 | QUOTE 00:12) */}
              <div className="studio-format-selector-row">
                <button
                  className={`studio-format-pill ${activeDurationFormat === 'full' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDurationFormat('full')
                    triggerToast('Mode set to Full Interview (Up to 08:24)')
                  }}
                >
                  <span className="format-title">FULL</span>
                  <span className="format-time">08:24</span>
                </button>

                <button
                  className={`studio-format-pill ${activeDurationFormat === 'highlight' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDurationFormat('highlight')
                    triggerToast('Mode set to Social Reel Highlight (00:30)')
                  }}
                >
                  <span className="format-title">HIGHLIGHT</span>
                  <span className="format-time">00:30</span>
                </button>

                <button
                  className={`studio-format-pill ${activeDurationFormat === 'quote' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveDurationFormat('quote')
                    triggerToast('Mode set to Bite-Sized Quote (00:12)')
                  }}
                >
                  <span className="format-title">QUOTE</span>
                  <span className="format-time">00:12</span>
                </button>
              </div>

              {/* Red CTA Action Button (Matching Blueprint: RECORD / PUBLISH) */}
              <button
                className={`interview-red-cta-btn ${isRecording ? 'is-recording' : ''}`}
                onClick={toggleRecording}
              >
                {isRecording ? <Pause size={18} /> : <Video size={18} />}
                <span>{isRecording ? 'STOP & SAVE RECORDING' : 'RECORD / PUBLISH'}</span>
              </button>
            </div>

            {/* Quick Publishing Destinations (FEATURE 21.7 & 21.10) */}
            <div className="interview-destinations-card">
              <span className="destinations-title">AUTO-PUBLISH DESTINATIONS</span>
              <div className="destinations-grid">
                <label className="destination-checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>📰 Feed to Daily E-Paper</span>
                </label>
                <label className="destination-checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>📱 Auto-Export 9:16 Reel</span>
                </label>
                <label className="destination-checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>🏆 Attach to Player Profile</span>
                </label>
                <label className="destination-checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>📢 Press Room Wire</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: POST-MATCH REVIEW (FEATURE 21.2) ================= */}
        {activeTab === 'match_review' && (
          <div className="interview-tab-content">
            <div className="feature-intro-card">
              <Mic size={24} color="#3de0ff" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Match Review Interview System
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Capture immediate post-match thoughts from captains, coaches & players
                </div>
              </div>
            </div>

            {/* Match Review Spec Card (Matching Blueprint 21.2 POST-MATCH REVIEW) */}
            <div className="interview-studio-card">
              <div className="studio-card-subheading">Match Review Interview</div>

              <div className="studio-camera-preview-box mini">
                <div className="watermark-logo-badge">
                  <span className="wm-scoring">SCORING</span>
                  <span className="wm-heroes">HEROES</span>
                </div>
                <div className="studio-mic-hero-icon small">
                  <Mic size={28} color="#ffffff" />
                </div>
              </div>

              <div className="studio-interview-title">POST-MATCH REVIEW</div>

              <div className="studio-format-selector-row">
                {['full', 'highlight', 'quote'].map((f) => (
                  <button
                    key={f}
                    className={`studio-format-pill ${activeDurationFormat === f ? 'active' : ''}`}
                    onClick={() => setActiveDurationFormat(f)}
                  >
                    <span className="format-title">{f.toUpperCase()}</span>
                    <span className="format-time">{f === 'full' ? '08:24' : f === 'highlight' ? '00:30' : '00:12'}</span>
                  </button>
                ))}
              </div>

              <button
                className="interview-red-cta-btn"
                onClick={() => triggerToast('Post-match interview session started!')}
              >
                <Video size={18} />
                <span>RECORD / PUBLISH</span>
              </button>
            </div>

            {/* Quick Match Review Topics */}
            <div className="interview-topics-card">
              <span className="topics-heading">RECOMMENDED QUESTIONS FOR CAPTAINS</span>
              <div className="topics-list">
                <div className="topic-item">
                  <span className="topic-bullet">1</span>
                  <span>"What was the key turning point in the middle overs?"</span>
                </div>
                <div className="topic-item">
                  <span className="topic-bullet">2</span>
                  <span>"How satisfied are you with the bowling execution at the death?"</span>
                </div>
                <div className="topic-item">
                  <span className="topic-bullet">3</span>
                  <span>"Message for the supporters who packed the stadium tonight?"</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: PRE-MATCH HYPE (FEATURE 21.3) ================= */}
        {activeTab === 'hype' && (
          <div className="interview-tab-content">
            <div className="feature-intro-card">
              <Flame size={24} color="#ffc83d" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Pre-Match Hype Media System
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Ignite fan anticipation with squad predictions & walkout energy
                </div>
              </div>
            </div>

            {/* Blueprint 21.3 READY FOR THE BIG MATCH card */}
            <div className="interview-studio-card">
              <div className="studio-card-subheading">Pre-Match Hype Media</div>

              <div className="studio-camera-preview-box mini">
                <div className="watermark-logo-badge">
                  <span className="wm-scoring">SCORING</span>
                  <span className="wm-heroes">HEROES</span>
                </div>
                <div className="studio-mic-hero-icon small">
                  <Flame size={28} color="#ffc83d" />
                </div>
              </div>

              <div className="studio-interview-title">READY FOR THE BIG MATCH</div>

              <div className="studio-format-selector-row">
                {['full', 'highlight', 'quote'].map((f) => (
                  <button
                    key={f}
                    className={`studio-format-pill ${activeDurationFormat === f ? 'active' : ''}`}
                    onClick={() => setActiveDurationFormat(f)}
                  >
                    <span className="format-title">{f.toUpperCase()}</span>
                    <span className="format-time">{f === 'full' ? '08:24' : f === 'highlight' ? '00:30' : '00:12'}</span>
                  </button>
                ))}
              </div>

              <button
                className="interview-red-cta-btn"
                onClick={() => triggerToast('Pre-match hype broadcast queued to Live Feed!')}
              >
                <Flame size={18} />
                <span>RECORD / PUBLISH</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 4: AI CLIP HIGHLIGHTING (FEATURE 21.8) ================= */}
        {activeTab === 'clips' && (
          <div className="interview-tab-content">
            <div className="feature-intro-card">
              <Scissors size={24} color="#3de0ff" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Interview Clip Highlighting System
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  AI automatically extracts viral quotes, emotional bursts & key tactical analysis
                </div>
              </div>
            </div>

            <div className="clips-grid-section">
              {extractedClips.map((clip) => (
                <div key={clip.id} className="clip-card-row">
                  <div className="clip-left-thumbnail">
                    <Scissors size={18} color="#3de0ff" />
                    <span className="clip-format-pill">{clip.aspectRatio}</span>
                  </div>
                  <div className="clip-center-info">
                    <div className="clip-title">{clip.title}</div>
                    <div className="clip-meta">Duration: {clip.duration} • {clip.views} Views</div>
                  </div>
                  <button
                    className="clip-share-btn"
                    onClick={() => triggerToast(`Clip "${clip.title}" exported to Instagram Reels!`)}
                    title="Export Reel"
                  >
                    <Share2 size={16} color="#fff" />
                  </button>
                </div>
              ))}
            </div>

            <button
              className="interview-red-cta-btn"
              onClick={() => triggerToast('AI scanning recent interviews for new viral quotes...')}
            >
              <Sparkles size={16} />
              <span>EXTRACT NEW AI CLIPS</span>
            </button>
          </div>
        )}

        {/* ================= TAB 5: ARCHIVE & SEARCH (FEATURE 21.9 & 21.6) ================= */}
        {activeTab === 'archive' && (
          <div className="interview-tab-content">
            <div className="feature-intro-card">
              <Archive size={24} color="#10b981" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Interview Archive & Media Library
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Search and access historical interviews, press quotes & behind-the-scenes footage
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="archive-search-bar-box">
              <Search size={16} color="#9aa8c7" />
              <input
                type="text"
                placeholder="Search by player, tournament, or quote..."
                className="archive-search-input"
              />
            </div>

            {/* List of Archived Interviews */}
            <div className="archive-interviews-list">
              {interviewList.map((item) => (
                <div key={item.id} className="archive-interview-card">
                  <div className="card-top-row">
                    <span className="type-badge">{item.type}</span>
                    <span className="time-ago">{item.timeAgo}</span>
                  </div>
                  <div className="archive-item-title">{item.title}</div>
                  <div className="archive-item-quote">"{item.quote}"</div>
                  <div className="archive-card-footer">
                    <span className="speaker-name">{item.speaker}</span>
                    <div className="meta-stats-group">
                      <span>👁️ {item.views}</span>
                      <span>❤️ {item.likes}</span>
                      <button
                        className="mini-card-action-btn"
                        onClick={() => triggerToast(`Playing: ${item.title}`)}
                      >
                        <Play size={12} fill="#fff" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: PLAYER MEDIA PORTFOLIO (FEATURE 21.12) ================= */}
        {activeTab === 'portfolio' && (
          <div className="interview-tab-content">
            <div className="feature-intro-card">
              <Award size={24} color="#a855f7" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Player Media Portfolio System
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Consolidated press profile, verified public quotes & career storytelling
                </div>
              </div>
            </div>

            {/* Player Bio Hero Card */}
            <div className="portfolio-hero-card">
              <div className="portfolio-avatar-circle">
                <span style={{ fontSize: 28 }}>🏏</span>
              </div>
              <h3 className="portfolio-player-name">Arjun Sharma</h3>
              <p className="portfolio-player-sub">All-Rounder • Delhi Capitals Academy</p>

              <div className="portfolio-kpi-row">
                <div className="kpi-col">
                  <span className="kpi-num">24</span>
                  <span className="kpi-lbl">Interviews</span>
                </div>
                <div className="kpi-col">
                  <span className="kpi-num">128K</span>
                  <span className="kpi-lbl">Media Reach</span>
                </div>
                <div className="kpi-col">
                  <span className="kpi-num">4.9★</span>
                  <span className="kpi-lbl">Press Score</span>
                </div>
              </div>
            </div>

            {/* Storytelling Section (FEATURE 21.5) */}
            <div className="interview-topics-card">
              <span className="topics-heading">MY CRICKET JOURNEY (STORYTELLING)</span>
              <p style={{ margin: '6px 0 10px', fontSize: 11, color: '#9aa8c7', lineHeight: 1.4 }}>
                "Started on the gravel grounds of Rohini. Bowled 40 overs every weekend before making the U-19 state trials."
              </p>
              <button
                className="interview-outline-btn"
                onClick={() => triggerToast('Opening full biographical audio narrative...')}
              >
                <span>LISTEN TO BIO NARRATIVE (06:15)</span>
              </button>
            </div>

            <button
              className="interview-red-cta-btn"
              onClick={() => triggerToast('Press kit PDF & portfolio link exported!')}
            >
              <Share2 size={16} />
              <span>EXPORT MEDIA PRESS KIT</span>
            </button>
          </div>
        )}
      </div>
    </Screen>
  )
}
