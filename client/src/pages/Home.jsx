import { useState } from 'react'
import { Bell, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Screen from '../components/Screen'
import { career, liveMatch, modules, super11 } from '../data/demo'
import { useAuth } from '../context/AuthContext'
import {
  Activity,
  BarChart3,
  CalendarDays,
  Film,
  Flame,
  Gavel,
  Heart,
  MapPin,
  MessageCircle,
  Play,
  Repeat2,
  Radio,
  RotateCcw,
  Settings,
  Sparkles,
  Trophy,
  UserRound,
  Users,
  Video,
  ShoppingBag,
} from 'lucide-react'
import { COMMUNITY_POSTS } from '../data/communityData'
import { HIGHLIGHT_CLIPS } from '../data/highlightsData'

const icons = {
  scorer: BarChart3,
  trophy: Trophy,
  users: Users,
  user: UserRound,
  gavel: Gavel,
  map: MapPin,
  video: Video,
  calendar: CalendarDays,
  chart: BarChart3,
  activity: Activity,
  replay: RotateCcw,
  settings: Settings,
  cart: ShoppingBag,
}

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Top Category Tabs
  const [activeSection, setActiveSection] = useState('match') // 'match' | 'highlights' | 'community' | 'modules'

  return (
    <Screen
      branded
      padded={false}
      right={
        <div className="topbar__actions">
          <button className="icon-btn" type="button" aria-label="Search">
            <Search size={18} />
          </button>
          <button
            className="icon-btn"
            type="button"
            onClick={() => navigate('/app/community')}
            aria-label="Community chats"
            style={{ position: 'relative' }}
          >
            <MessageCircle size={18} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: 'var(--red-2)' }} />
          </button>
        </div>
      }
    >
      <div className="home-dashboard">
        {/* Compact Player ID Banner */}
        <section className="home-id-banner">
          <div className="home-id-avatar-block" onClick={() => navigate('/app/avatar')} role="button" tabIndex={0}>
            <div className="home-avatar-ring">
              <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
                <circle cx="20" cy="11" r="5" stroke={user?.avatarJersey?.primary || '#3de0ff'} strokeWidth="1.8" fill="rgba(61,224,255,0.2)" />
                <path d="M12 28c0-5 3.5-7.5 8-7.5s8 2.5 8 7.5" stroke={user?.avatarJersey?.primary || '#e10613'} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="home-avatar-num">{user?.avatarJersey ? `#${user.avatarJersey.num}` : '3D'}</span>
            </div>
            <div className="home-id-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <h2>{user.nickname}</h2>
                <span className="verified-chip">VERIFIED</span>
              </div>
              <p>{user.role} • {user.city} • {career.stage}</p>
            </div>
          </div>
          <div className="home-trust-pill" onClick={() => navigate('/app/stats')} role="button" tabIndex={0}>
            <strong>{user.trust}</strong>
            <span>TRUST</span>
          </div>
        </section>

        {/* Responsive Home Navigation Tabs (Match | Highlights | Hub | Modules) */}
        <div className="home-top-tabs">
          <button
            type="button"
            className={`home-tab-btn ${activeSection === 'match' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('match')}
          >
            🏏 Live & Feed
          </button>
          <button
            type="button"
            className={`home-tab-btn ${activeSection === 'highlights' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('highlights')}
          >
            🎬 Highlights ({HIGHLIGHT_CLIPS.length})
          </button>
          <button
            type="button"
            className={`home-tab-btn ${activeSection === 'community' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('community')}
          >
            💬 Community
          </button>
          <button
            type="button"
            className={`home-tab-btn ${activeSection === 'modules' ? 'is-active' : ''}`}
            onClick={() => setActiveSection('modules')}
          >
            ⚡ Features
          </button>
        </div>

        {/* 1. MATCH TAB (Live Card + Highlights Reel + Stats Snapshot) */}
        {activeSection === 'match' && (
          <div className="home-tab-content">
            {/* Live Match Card */}
            <section className="live-card" onClick={() => navigate('/app/scorer')} role="button" tabIndex={0}>
              <div className="live-card__meta">
                <span className="pill">LIVE</span>
                <span>{liveMatch.format} • {liveMatch.over}/{liveMatch.maxOvers}</span>
              </div>
              <div className="live-card__score">
                <div>
                  <small>{liveMatch.batting}</small>
                  <strong>{liveMatch.score}</strong>
                </div>
                <span>vs</span>
                <div>
                  <small>{liveMatch.bowling}</small>
                  <strong>yet to bat</strong>
                </div>
              </div>
              <p>CRR {liveMatch.crr} • RRR {liveMatch.rrr} • {liveMatch.striker.name} {liveMatch.striker.runs}*</p>
              
              <div className="live-card-quick-actions">
                <button
                  type="button"
                  className="live-action-pill"
                  onClick={(e) => { e.stopPropagation(); navigate('/app/highlights') }}
                >
                  <Video size={13} color="var(--red-2)" /> Video Highlights
                </button>
                <button
                  type="button"
                  className="live-action-pill live-action-pill--cyan"
                  onClick={(e) => { e.stopPropagation(); navigate('/app/commentary') }}
                >
                  <Radio size={13} color="#3de0ff" /> AI Commentary
                </button>
              </div>
            </section>

            {/* Match Highlights Scroll Reel */}
            <section className="panel" style={{ padding: '12px 14px' }}>
              <header style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Film size={16} color="var(--red-2)" />
                  <h3 style={{ margin: 0, fontSize: 14 }}>Match Video Highlights</h3>
                </div>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => navigate('/app/highlights')}
                >
                  Full studio →
                </button>
              </header>

              <div className="home-highlights-carousel">
                {HIGHLIGHT_CLIPS.map((clip) => (
                  <div
                    key={clip.id}
                    className="home-highlight-card"
                    onClick={() => navigate(`/app/highlights?clip=${clip.id}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="home-highlight-thumb">
                      <img src={clip.image} alt={clip.title} />
                      <div className="highlight-play-overlay">
                        <Play size={16} fill="#ffffff" />
                      </div>
                      <span className="highlight-tag-badge">{clip.eventTag}</span>
                      {clip.metrics.distance && (
                        <span className="highlight-metric-tag">{clip.metrics.distance}</span>
                      )}
                    </div>
                    <div className="home-highlight-info">
                      <strong>{clip.title}</strong>
                      <span>Ball {clip.ball} • {clip.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Career Stats Snapshot */}
            <section className="panel" style={{ cursor: 'pointer' }} onClick={() => navigate('/app/stats')}>
              <header>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BarChart3 size={16} color="var(--cyan)" />
                  <h3 style={{ margin: 0, fontSize: 14 }}>Career Snapshot</h3>
                </div>
                <button type="button" className="text-link" onClick={(e) => { e.stopPropagation(); navigate('/app/stats') }}>
                  All stats →
                </button>
              </header>
              <div className="stat-row">
                <div>
                  <strong>{career.runs}</strong>
                  <span>Runs</span>
                </div>
                <div>
                  <strong>{career.avg}</strong>
                  <span>Avg</span>
                </div>
                <div>
                  <strong>{career.wickets}</strong>
                  <span>Wkts</span>
                </div>
                <div>
                  <strong>{career.sr}</strong>
                  <span>SR</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 2. HIGHLIGHTS DEDICATED TAB */}
        {activeSection === 'highlights' && (
          <div className="home-tab-content">
            <div className="highlights-hero-promo" onClick={() => navigate('/app/highlights')}>
              <div className="promo-tag">AI BROADCAST STUDIO</div>
              <h3>Ball Trajectory & 4K Replays</h3>
              <p>Experience distance calculations, inswing yorker wicket animations, and cinematic effects.</p>
              <button type="button" className="btn btn--primary btn--sm" style={{ width: 'auto', alignSelf: 'flex-start' }}>
                Open Highlights Studio →
              </button>
            </div>

            <div className="highlights-vertical-grid">
              {HIGHLIGHT_CLIPS.map((clip) => (
                <div
                  key={clip.id}
                  className="highlight-row-item"
                  onClick={() => navigate(`/app/highlights?clip=${clip.id}`)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="row-thumb">
                    <img src={clip.image} alt={clip.title} />
                    <span className="row-tag">{clip.eventTag}</span>
                  </div>
                  <div className="row-meta">
                    <strong>{clip.title}</strong>
                    <span>{clip.match}</span>
                    <div className="row-metrics">
                      {clip.metrics.distance && <span>Dist: <strong>{clip.metrics.distance}</strong></span>}
                      {clip.metrics.speed && <span>Speed: <strong>{clip.metrics.speed}</strong></span>}
                    </div>
                  </div>
                  <Play size={18} color="var(--red-2)" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. COMMUNITY TAB */}
        {activeSection === 'community' && (
          <div className="home-tab-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 14 }}>Trending in Scoring Heroes</h3>
              <button
                type="button"
                className="text-link"
                onClick={() => navigate('/app/community')}
              >
                Open Full Community →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMMUNITY_POSTS.map((post) => (
                <article
                  key={post.id}
                  className="community-post-card"
                  style={{ background: 'var(--card)', padding: 12 }}
                  onClick={() => navigate('/app/community')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="post-header">
                    <img src={post.author.avatar} alt={post.author.name} className="post-author-avatar" style={{ width: 34, height: 34 }} />
                    <div className="post-author-meta">
                      <div className="post-author-row">
                        <span className="post-author-name" style={{ fontSize: 13 }}>{post.author.name}</span>
                        <span className="post-badge">{post.author.badge}</span>
                        <span className="post-time">{post.time}</span>
                      </div>
                      <span className="post-team-name">{post.author.team}</span>
                    </div>
                  </div>

                  <p className="post-text" style={{ fontSize: 12, margin: '6px 0' }}>{post.content}</p>

                  {post.statCard && (
                    <div className="post-milestone-card" style={{ padding: 10 }}>
                      <div className="milestone-badge-row">
                        <span className="milestone-pill">{post.statCard.badge}</span>
                        <span className="milestone-venue">{post.statCard.venue}</span>
                      </div>
                      <div className="milestone-hero">
                        <h4 style={{ fontSize: 18 }}>{post.statCard.title}</h4>
                        <p style={{ fontSize: 10 }}>{post.statCard.sub}</p>
                      </div>
                    </div>
                  )}

                  <div className="post-actions-row" style={{ paddingTop: 4 }}>
                    <div style={{ display: 'flex', gap: 14, color: 'var(--muted)', fontSize: 11, alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Heart size={13} color="var(--red-2)" /> {post.likes}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Repeat2 size={13} /> {post.retweets}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MessageCircle size={13} /> {post.comments}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 4. MODULES & ECOSYSTEM TAB */}
        {activeSection === 'modules' && (
          <div className="home-tab-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 14 }}>All Platform Features</h3>
              <span className="pill" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff', border: '1px solid #3de0ff' }}>
                12 Modules
              </span>
            </div>

            <div className="home-modules-responsive-grid">
              {modules.map((mod) => {
                const Icon = icons[mod.icon]
                return (
                  <button
                    key={mod.slug}
                    className={`module-tile ${mod.accent ? 'module-tile--accent' : ''}`}
                    type="button"
                    onClick={() => navigate(mod.to || `/app/module/${mod.slug}`)}
                  >
                    <Icon size={22} />
                    <span>{mod.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Super 11 Squad Showcase */}
            <section
              className="panel"
              style={{ marginTop: 10, cursor: 'pointer' }}
              onClick={() => navigate('/app/super11')}
            >
              <header>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Trophy size={16} color="#ffc83d" />
                  <h3 style={{ fontSize: 14 }}>Super Scoring 11</h3>
                </div>
                <button
                  type="button"
                  className="text-link"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate('/app/super11')
                  }}
                >
                  Full squad & voting →
                </button>
              </header>
              <div className="ss11">
                {super11.map((p) => (
                  <div key={p.name}>
                    <strong>{p.name}</strong>
                    <span>{p.role} • {p.pts}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </Screen>
  )
}
