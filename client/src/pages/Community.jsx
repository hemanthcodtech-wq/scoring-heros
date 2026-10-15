import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share2,
  Send,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react'
import Screen from '../components/Screen'
import { COMMUNITY_POSTS, COMMUNITY_CHATS } from '../data/communityData'
import { useAuth } from '../context/AuthContext'

export default function Community() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [activeTab, setActiveTab] = useState('feed') // 'feed' | 'chats'
  const [feedFilter, setFeedFilter] = useState('all') // 'all' | 'milestones' | 'franchises'
  const [posts, setPosts] = useState(COMMUNITY_POSTS)
  const [likedPosts, setLikedPosts] = useState({})
  const [retweetedPosts, setRetweetedPosts] = useState({})
  const [activeChat, setActiveChat] = useState(null)
  const [chatMessages, setChatMessages] = useState({
    'chat-1': [
      { sender: 'them', text: 'Hey bro, stellar 60(44) today!', time: '12:40 PM' },
      { sender: 'me', text: 'Thanks man! Pitch had extra bounce early on.', time: '12:42 PM' },
      { sender: 'them', text: 'Great knock bro! The 42*(18) in the 8th over sealed it.', time: '12:45 PM' }
    ],
    'chat-2': [
      { sender: 'them', text: 'Rematch locked for this Saturday 7:30 PM under lights.', time: '11:15 AM' }
    ],
    'chat-3': [
      { sender: 'them', text: 'Your auction contract terms are verified on-chain.', time: 'Yesterday' }
    ]
  })
  const [newChatText, setNewChatText] = useState('')

  // New Post Composer State
  const [showComposer, setShowComposer] = useState(false)
  const [composerText, setComposerText] = useState('')
  const [selectedMilestone, setSelectedMilestone] = useState(false)
  const [moderationPass, setModerationPass] = useState(null)
  const [postingStatus, setPostingStatus] = useState('idle') // 'idle' | 'checking' | 'done'

  // Social Sharing Notification Toast
  const [shareToast, setShareToast] = useState(null)

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[postId]
      setPosts((pList) =>
        pList.map((p) => {
          if (p.id === postId) {
            return { ...p, likes: p.likes + (isLiked ? 1 : -1) }
          }
          return p
        })
      )
      return { ...prev, [postId]: isLiked }
    })
  }

  const toggleRetweet = (postId) => {
    setRetweetedPosts((prev) => {
      const isRt = !prev[postId]
      setPosts((pList) =>
        pList.map((p) => {
          if (p.id === postId) {
            return { ...p, retweets: p.retweets + (isRt ? 1 : -1) }
          }
          return p
        })
      )
      return { ...prev, [postId]: isRt }
    })
  }

  const handleCreatePost = (e) => {
    e.preventDefault()
    if (!composerText.trim() && !selectedMilestone) return

    setPostingStatus('checking')
    setTimeout(() => {
      setModerationPass(true)

      const newPost = {
        id: `post-${Date.now()}`,
        author: {
          name: user.nickname || 'You',
          handle: `@${(user.nickname || 'player').toLowerCase().replace(/\s+/g, '_')}`,
          avatar: user.avatarJersey ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          badge: user.role || 'PLAYER',
          team: user.team || 'Scoring Heroes Squad',
          trustScore: user.trust || 92,
        },
        time: 'Just now',
        content: composerText,
        statCard: selectedMilestone ? {
          badge: 'MATCH MILESTONE',
          title: '52* RUNS & 2 WKTS',
          sub: '31 BALLS • 4 FOURS • 3 SIXES • MOTM',
          match: 'Scoring XI vs Premier Club',
          venue: 'Marina Oval',
          image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80'
        } : null,
        likes: 1,
        comments: 0,
        retweets: 0,
        shares: 0,
        platforms: ['SH', 'IG', 'X'],
        aiModerated: true,
      }

      setPosts([newPost, ...posts])
      setPostingStatus('done')
      setTimeout(() => {
        setShowComposer(false)
        setComposerText('')
        setSelectedMilestone(false)
        setPostingStatus('idle')
        setModerationPass(null)
      }, 700)
    }, 900)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newChatText.trim() || !activeChat) return

    const newMsg = {
      sender: 'me',
      text: newChatText.trim(),
      time: 'Just now'
    }

    setChatMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg]
    }))
    setNewChatText('')
  }

  const triggerShare = (platform, title) => {
    setShareToast(`Broadcasted to ${platform}! Shared with external fans.`)
    setTimeout(() => setShareToast(null), 3000)
  }

  const filteredPosts = posts.filter((post) => {
    if (feedFilter === 'milestones') return Boolean(post.statCard)
    if (feedFilter === 'franchises') return post.author.badge.includes('FRANCHISE') || post.author.team.includes('Marina')
    return true
  })

  return (
    <Screen
      title="Community"
      subtitle="Cricket Feed & Direct Chats"
      right={
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className="icon-btn"
            type="button"
            onClick={() => setShowComposer(!showComposer)}
            style={{ color: 'var(--red-2)', background: 'rgba(225, 6, 19, 0.12)' }}
            title="Create Post"
          >
            <PlusCircle size={20} />
          </button>
        </div>
      }
    >
      <div className="community-page">
        {/* Navigation Tabs (Twitter/X style) */}
        <div className="community-tabs">
          <button
            className={`community-tab ${activeTab === 'feed' ? 'is-active' : ''}`}
            onClick={() => { setActiveTab('feed'); setActiveChat(null) }}
            type="button"
          >
            Feed & Highlights
          </button>
          <button
            className={`community-tab ${activeTab === 'chats' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('chats')}
            type="button"
          >
            DMs & Squad Chats
            <span className="community-badge-dot" />
          </button>
        </div>

        {shareToast && (
          <div className="community-toast">
            <Sparkles size={16} color="var(--cyan)" />
            <span>{shareToast}</span>
          </div>
        )}

        {/* FEED VIEW */}
        {activeTab === 'feed' && (
          <div className="community-feed-section">
            {/* Quick Filter Pill Bar */}
            <div className="community-subfilters">
              <button
                className={`filter-chip ${feedFilter === 'all' ? 'active' : ''}`}
                onClick={() => setFeedFilter('all')}
                type="button"
              >
                🔥 Trending
              </button>
              <button
                className={`filter-chip ${feedFilter === 'milestones' ? 'active' : ''}`}
                onClick={() => setFeedFilter('milestones')}
                type="button"
              >
                🏏 Milestones
              </button>
              <button
                className={`filter-chip ${feedFilter === 'franchises' ? 'active' : ''}`}
                onClick={() => setFeedFilter('franchises')}
                type="button"
              >
                🛡️ Franchises
              </button>
            </div>

            {/* Quick Creator Bar */}
            <div className="community-quick-composer" onClick={() => setShowComposer(true)}>
              <img
                src={user.avatarJersey ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt="user avatar"
                className="community-mini-avatar"
              />
              <span className="community-composer-prompt">Post match highlights or celebrate teammates...</span>
              <button type="button" className="btn btn--sm btn--primary">Post</button>
            </div>

            {/* Composer Modal / Drawer if open */}
            {showComposer && (
              <div className="community-composer-card">
                <div className="composer-header">
                  <strong>Create Community Post</strong>
                  <button className="icon-btn-ghost" onClick={() => setShowComposer(false)}>✕</button>
                </div>
                <form onSubmit={handleCreatePost}>
                  <textarea
                    rows={3}
                    placeholder="What happened in today's innings? Tag your match, franchise, or captain..."
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    className="composer-textarea"
                  />

                  {/* Auto-posting & Tagging Integration selector */}
                  <div className="composer-options">
                    <label className="composer-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedMilestone}
                        onChange={(e) => setSelectedMilestone(e.target.checked)}
                      />
                      <span>Attach latest match milestone stat-card (52* Runs)</span>
                    </label>

                    <div className="composer-platforms">
                      <span className="muted-text">Auto-share to:</span>
                      <span className="platform-tag is-selected">SH Hub</span>
                      <span className="platform-tag is-selected">IG</span>
                      <span className="platform-tag is-selected">X</span>
                    </div>
                  </div>

                  {/* AI Content Moderation Banner */}
                  <div className="composer-moderation-note">
                    <ShieldCheck size={14} color="var(--green)" />
                    <span>AI Content Moderation active: sports relevance verified.</span>
                  </div>

                  <div className="composer-actions">
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm"
                      onClick={() => setShowComposer(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={postingStatus !== 'idle'}
                      className="btn btn--primary btn--sm"
                    >
                      {postingStatus === 'checking' ? 'AI Reviewing...' : postingStatus === 'done' ? 'Published!' : 'Post & Broadcast'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Posts Stream */}
            <div className="community-posts-stream">
              {filteredPosts.map((post) => {
                const isLiked = likedPosts[post.id]
                const isRt = retweetedPosts[post.id]

                return (
                  <article key={post.id} className="community-post-card">
                    {/* Header */}
                    <div className="post-header">
                      <img src={post.author.avatar} alt={post.author.name} className="post-author-avatar" />
                      <div className="post-author-meta">
                        <div className="post-author-row">
                          <span className="post-author-name">{post.author.name}</span>
                          {post.author.badge && (
                            <span className="post-badge">{post.author.badge}</span>
                          )}
                          <span className="post-handle">{post.author.handle}</span>
                          <span className="post-dot">·</span>
                          <span className="post-time">{post.time}</span>
                        </div>
                        <div className="post-team-sub">
                          <span className="post-team-name">{post.author.team}</span>
                          <span className="post-trust-score">
                            <ShieldCheck size={12} color="var(--cyan)" /> {post.author.trustScore}% Trust
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content text */}
                    <p className="post-text">{post.content}</p>

                    {/* Stat Card if milestone */}
                    {post.statCard && (
                      <div className="post-milestone-card">
                        <div className="milestone-badge-row">
                          <span className="milestone-pill">{post.statCard.badge}</span>
                          <span className="milestone-venue">{post.statCard.venue}</span>
                        </div>
                        <div className="milestone-hero">
                          <h4>{post.statCard.title}</h4>
                          <p>{post.statCard.sub}</p>
                          <div className="milestone-match">{post.statCard.match}</div>
                        </div>
                        {post.statCard.image && (
                          <div className="milestone-img-wrap">
                            <img src={post.statCard.image} alt="Milestone highlight" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Plain image if present */}
                    {post.image && !post.statCard && (
                      <div className="post-media-wrap">
                        <img src={post.image} alt="Match announcement" />
                      </div>
                    )}

                    {/* Multi-platform broadcast badge */}
                    {post.platforms && post.platforms.length > 0 && (
                      <div className="post-platforms-footer">
                        <span className="connected-label">Connected:</span>
                        {post.platforms.map((p) => (
                          <button
                            key={p}
                            type="button"
                            className="connected-chip"
                            onClick={() => triggerShare(p, post.content)}
                            title={`Share to ${p}`}
                          >
                            {p}
                          </button>
                        ))}
                        <span className="ai-verified-tag">
                          <CheckCircle2 size={12} color="#00e676" /> Verified Sports Content
                        </span>
                      </div>
                    )}

                    {/* Actions Row (Twitter/X style) */}
                    <div className="post-actions-row">
                      <button
                        className={`post-action-btn ${isLiked ? 'liked' : ''}`}
                        type="button"
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart size={16} fill={isLiked ? 'var(--red-2)' : 'none'} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        className={`post-action-btn ${isRt ? 'retweeted' : ''}`}
                        type="button"
                        onClick={() => toggleRetweet(post.id)}
                      >
                        <Repeat2 size={16} />
                        <span>{post.retweets}</span>
                      </button>

                      <button
                        className="post-action-btn"
                        type="button"
                        onClick={() => {
                          setActiveTab('chats')
                          setActiveChat(COMMUNITY_CHATS[0])
                        }}
                      >
                        <MessageCircle size={16} />
                        <span>{post.comments}</span>
                      </button>

                      <button
                        className="post-action-btn"
                        type="button"
                        onClick={() => triggerShare('External Feed', post.content)}
                      >
                        <Share2 size={16} />
                        <span>{post.shares}</span>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        )}

        {/* CHATS VIEW */}
        {activeTab === 'chats' && (
          <div className="community-chats-section">
            {!activeChat ? (
              <div className="chats-list">
                <div className="chats-list-header">
                  <h3>Direct Messages & Squads</h3>
                  <span className="badge-pill">3 Active</span>
                </div>
                {COMMUNITY_CHATS.map((c) => (
                  <div
                    key={c.id}
                    className="chat-list-item"
                    onClick={() => setActiveChat(c)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="chat-avatar-wrap">
                      <img src={c.avatar} alt={c.user} className="chat-avatar" />
                      {c.online && <span className="chat-online-indicator" />}
                    </div>
                    <div className="chat-info">
                      <div className="chat-name-row">
                        <strong>{c.user}</strong>
                        <span className="chat-time">{c.time}</span>
                      </div>
                      <p className="chat-last-msg">{c.lastMsg}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="chat-unread-badge">{c.unread}</span>
                    )}
                  </div>
                ))}

                <div className="community-squad-promo">
                  <div className="squad-promo-icon">🛡️</div>
                  <div>
                    <strong>Create Matchroom Chat</strong>
                    <p>Invite captains, vice-captains, and scorers for live sync.</p>
                  </div>
                  <button className="btn btn--sm btn--ghost" type="button">Create</button>
                </div>
              </div>
            ) : (
              <div className="chat-conversation-view">
                <div className="chat-convo-header">
                  <button
                    className="icon-btn-ghost"
                    onClick={() => setActiveChat(null)}
                    type="button"
                  >
                    ← Back
                  </button>
                  <div className="chat-convo-user">
                    <img src={activeChat.avatar} alt={activeChat.user} />
                    <div>
                      <strong>{activeChat.user}</strong>
                      <span className="chat-user-status">Online • Verified Identity</span>
                    </div>
                  </div>
                </div>

                <div className="chat-messages-container">
                  {(chatMessages[activeChat.id] || []).map((msg, idx) => (
                    <div
                      key={idx}
                      className={`chat-bubble-row ${msg.sender === 'me' ? 'is-me' : 'is-them'}`}
                    >
                      <div className="chat-bubble">
                        <p>{msg.text}</p>
                        <span className="chat-bubble-time">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="chat-input-bar" onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    placeholder="Type message to teammate..."
                    value={newChatText}
                    onChange={(e) => setNewChatText(e.target.value)}
                  />
                  <button type="submit" className="chat-send-btn">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </Screen>
  )
}
