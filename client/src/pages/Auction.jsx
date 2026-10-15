import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Gavel,
  Shield,
  Wallet,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Filter,
  DollarSign,
  AlertCircle,
  Share2,
  Award,
  ChevronRight,
  UserCheck,
  Star,
} from 'lucide-react'
import Screen from '../components/Screen'
import {
  TOURNAMENT_DATA,
  FRANCHISE_WALLET,
  AUCTION_PLAYERS,
  POOL_CATEGORIES,
  FRANCHISES_LIST,
} from '../data/auctionData'

export default function Auction() {
  const navigate = useNavigate()

  // Views: 'bidding' | 'pool' | 'wallet' | 'tournament' | 'sold'
  const [activeTab, setActiveTab] = useState('bidding')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Live bidding state on current active player (Arjun Verma)
  const [currentPlayer, setCurrentPlayer] = useState(AUCTION_PLAYERS[0])
  const [currentBid, setCurrentBid] = useState(AUCTION_PLAYERS[0].currentBid)
  const [leadingFranchise, setLeadingFranchise] = useState(AUCTION_PLAYERS[0].leadingFranchise)
  const [wallet, setWallet] = useState(FRANCHISE_WALLET)
  const [bidHistory, setBidHistory] = useState([
    { franchise: 'Marina Strikers', amount: 155000, time: '30s ago' },
    { franchise: 'Coastal Kings', amount: 170000, time: '18s ago' },
    { franchise: 'Hapur Heroes', amount: 185000, time: 'Just now' },
  ])
  const [isSold, setIsSold] = useState(false)
  const [autoSocialPosted, setAutoSocialPosted] = useState(false)
  const [biddingTimer, setBiddingTimer] = useState(14)
  const [playersList, setPlayersList] = useState(AUCTION_PLAYERS)

  // Raise bid
  const handlePlaceBid = (increment) => {
    if (isSold) return
    const nextBid = currentBid + increment
    if (wallet.availableBudget < nextBid) {
      alert('Insufficient available franchise wallet balance after GST allocation!')
      return
    }

    setCurrentBid(nextBid)
    setLeadingFranchise('Hapur Heroes')
    setBidHistory((prev) => [
      { franchise: 'Hapur Heroes', amount: nextBid, time: 'Just now' },
      ...prev,
    ])
    setBiddingTimer(15)
  }

  // Finalize Sale (Sold Confirmation & Team Assignment System 8.9)
  const handleFinalizeSold = () => {
    setIsSold(true)
    const newSpent = wallet.spentPurchased + currentBid
    const newGST = Math.round(newSpent * 0.18)
    const newAvailable = wallet.totalBudget - newSpent - newGST

    setWallet((prev) => ({
      ...prev,
      spentPurchased: newSpent,
      gstPlatformFee: newGST,
      availableBudget: Math.max(0, newAvailable),
      slotsFilled: prev.slotsFilled + 1,
    }))

    // Auto social broadcast
    setTimeout(() => {
      setAutoSocialPosted(true)
    }, 800)
  }

  // Shortlist toggle
  const toggleShortlist = (playerId) => {
    setPlayersList((list) =>
      list.map((p) => (p.id === playerId ? { ...p, shortlisted: !p.shortlisted } : p))
    )
  }

  return (
    <Screen
      title="Auction Arena"
      subtitle={`${TOURNAMENT_DATA.name} • Live`}
      right={
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div className="auction-live-badge">
            <span className="live-dot" /> LIVE
          </div>
        </div>
      }
    >
      <div className="auction-page">
        {/* Navigation Tabs */}
        <div className="auction-nav-tabs">
          <button
            type="button"
            className={`auction-nav-tab ${activeTab === 'bidding' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('bidding')}
          >
            <Gavel size={15} />
            <span>Live Bid</span>
          </button>
          <button
            type="button"
            className={`auction-nav-tab ${activeTab === 'pool' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('pool')}
          >
            <Users size={15} />
            <span>Player Pool</span>
          </button>
          <button
            type="button"
            className={`auction-nav-tab ${activeTab === 'wallet' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('wallet')}
          >
            <Wallet size={15} />
            <span>Wallet & GST</span>
          </button>
          <button
            type="button"
            className={`auction-nav-tab ${activeTab === 'tournament' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('tournament')}
          >
            <Shield size={15} />
            <span>Franchises</span>
          </button>
        </div>

        {/* 1. LIVE BIDDING VIEW (Features 8.6, 8.8, 8.9, 8.10) */}
        {activeTab === 'bidding' && (
          <div className="auction-bidding-container">
            {/* Player Card on Auction Podium */}
            <div className="auction-player-card">
              <div className="auction-player-hero">
                <div className="player-avatar-podium">
                  <img src={currentPlayer.avatarImg} alt={currentPlayer.name} className="podium-avatar" />
                  <span className="jersey-pill">#{currentPlayer.jerseyNumber}</span>
                  <div className="podium-ring" />
                </div>

                <div className="player-auction-details">
                  <div className="player-role-badge">{currentPlayer.role}</div>
                  <h2 className="player-podium-name">{currentPlayer.name}</h2>
                  <div className="player-stats-mini-strip">
                    <span>Avg: <strong>{currentPlayer.stats.batAvg}</strong></span>
                    <span>SR: <strong>{currentPlayer.stats.strikeRate}</strong></span>
                    <span>Wkts: <strong>{currentPlayer.stats.wickets}</strong></span>
                  </div>
                  <div className="base-price-tag">
                    Base: ₹ {currentPlayer.basePrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Live Bid Meter */}
              <div className="auction-bid-meter">
                <div className="bid-meter-header">
                  <span className="bid-status-label">CURRENT BID</span>
                  <div className="timer-badge">
                    <Clock size={12} /> {isSold ? 'HAMMER DOWN' : `${biddingTimer}s`}
                  </div>
                </div>

                <div className="bid-amount-display">
                  ₹ {currentBid.toLocaleString('en-IN')}
                </div>

                <div className="bid-leader-banner">
                  <span>Leading:</span>
                  <strong>{leadingFranchise}</strong>
                  {leadingFranchise === 'Hapur Heroes' && (
                    <span className="your-team-badge">YOUR FRANCHISE</span>
                  )}
                </div>
              </div>

              {/* Sold Confirmation Overlay / State */}
              {isSold ? (
                <div className="sold-confirmation-banner">
                  <div className="sold-conf-top">
                    <CheckCircle2 size={24} color="#00e676" />
                    <div>
                      <div className="sold-headline">SOLD TO {leadingFranchise.toUpperCase()}!</div>
                      <p className="sold-sub">Officially registered in squad roster with team jersey assignment.</p>
                    </div>
                  </div>

                  {autoSocialPosted && (
                    <div className="auto-social-pill">
                      <Sparkles size={14} color="#3de0ff" />
                      <span>Auto-posted to Community Feed & external networks!</span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn btn--primary btn--full"
                    onClick={() => {
                      setIsSold(false)
                      setAutoSocialPosted(false)
                      setCurrentPlayer(AUCTION_PLAYERS[2])
                      setCurrentBid(AUCTION_PLAYERS[2].basePrice)
                      setLeadingFranchise('None')
                    }}
                  >
                    Next Player to Podium →
                  </button>
                </div>
              ) : (
                /* Bidding Control Actions (Features 8.6 & 8.8) */
                <div className="bidding-controls">
                  <div className="bid-increment-buttons">
                    <button
                      type="button"
                      className="bid-btn"
                      onClick={() => handlePlaceBid(10000)}
                    >
                      + ₹10K
                    </button>
                    <button
                      type="button"
                      className="bid-btn bid-btn--popular"
                      onClick={() => handlePlaceBid(25000)}
                    >
                      + ₹25K
                    </button>
                    <button
                      type="button"
                      className="bid-btn"
                      onClick={() => handlePlaceBid(50000)}
                    >
                      + ₹50K
                    </button>
                  </div>

                  <div className="bid-management-row">
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => toggleShortlist(currentPlayer.id)}
                    >
                      <Star size={14} fill={currentPlayer.shortlisted ? '#ffb300' : 'none'} color="#ffb300" />
                      {currentPlayer.shortlisted ? 'Shortlisted' : 'Shortlist'}
                    </button>

                    <button
                      type="button"
                      className="btn btn--primary btn--sm"
                      style={{ background: '#00c853' }}
                      onClick={handleFinalizeSold}
                    >
                      Sold / Confirm Assignment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Wallet Bar */}
            <div className="quick-wallet-status" onClick={() => setActiveTab('wallet')}>
              <div>
                <span className="wallet-mini-label">YOUR REMAINING PURSE</span>
                <strong className="wallet-mini-amount">₹ {wallet.availableBudget.toLocaleString('en-IN')}</strong>
              </div>
              <div className="wallet-slots-status">
                <span>Slots: {wallet.slotsFilled}/{wallet.squadCapacity}</span>
                <ChevronRight size={16} />
              </div>
            </div>

            {/* Recent Bids Log */}
            <div className="bids-log-card">
              <h4>Live Bidding Activity</h4>
              <div className="bids-log-list">
                {bidHistory.map((item, idx) => (
                  <div key={idx} className="bid-log-row">
                    <span className="bid-log-franchise">{item.franchise}</span>
                    <strong className="bid-log-amount">₹ {item.amount.toLocaleString('en-IN')}</strong>
                    <span className="bid-log-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. PLAYER POOL & PRE-AUCTION SHORTLISTING (Features 8.3 & 8.7) */}
        {activeTab === 'pool' && (
          <div className="auction-pool-container">
            {/* Category Filter Chips */}
            <div className="pool-category-chips">
              {POOL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`pool-chip ${selectedCategory === cat.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.title} ({cat.count})
                </button>
              ))}
            </div>

            {/* Player Pool List */}
            <div className="pool-players-list">
              {playersList.map((player) => (
                <div key={player.id} className="pool-player-item">
                  <img src={player.avatarImg} alt={player.name} className="pool-player-avatar" />
                  <div className="pool-player-info">
                    <div className="pool-player-name-row">
                      <strong>{player.name}</strong>
                      <span className={`pool-status-tag status-${player.status}`}>
                        {player.status.toUpperCase()}
                      </span>
                    </div>
                    <span className="pool-player-role">{player.role} • #{player.jerseyNumber}</span>
                    <div className="pool-player-price">
                      <span>Base: ₹{player.basePrice.toLocaleString('en-IN')}</span>
                      {player.soldTo && (
                        <span className="sold-to-text">Sold to {player.soldTo}</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="pool-action-btn"
                    onClick={() => {
                      setCurrentPlayer(player)
                      setCurrentBid(player.currentBid)
                      setLeadingFranchise(player.leadingFranchise)
                      setActiveTab('bidding')
                    }}
                  >
                    Bid
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. FRANCHISE WALLET & GST SETTLEMENT (Features 8.2, 8.5, 8.12) */}
        {activeTab === 'wallet' && (
          <div className="auction-wallet-container">
            {/* Big Wallet Card */}
            <div className="franchise-wallet-card">
              <span className="wallet-card-kicker">FRANCHISE WALLET • {wallet.teamName.toUpperCase()}</span>
              <div className="wallet-total-balance">
                ₹ {wallet.totalBudget.toLocaleString('en-IN')}
              </div>
              <span className="wallet-subtext">Approved Season Cap Allocation</span>

              {/* Progress Bar of Budget Utilization */}
              <div className="wallet-progress-track">
                <div
                  className="wallet-progress-fill"
                  style={{
                    width: `${((wallet.spentPurchased + wallet.gstPlatformFee) / wallet.totalBudget) * 100}%`,
                  }}
                />
              </div>

              {/* Breakdown Grid */}
              <div className="wallet-breakdown-grid">
                <div className="breakdown-card">
                  <span className="breakdown-label">Players Purchased</span>
                  <strong className="breakdown-val">₹ {wallet.spentPurchased.toLocaleString('en-IN')}</strong>
                </div>

                <div className="breakdown-card">
                  <span className="breakdown-label">GST / Platform Fee (18%)</span>
                  <strong className="breakdown-val" style={{ color: '#ff8a93' }}>
                    ₹ {wallet.gstPlatformFee.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div className="breakdown-card breakdown-card--highlight">
                  <span className="breakdown-label">Available Purse</span>
                  <strong className="breakdown-val" style={{ color: '#00e676' }}>
                    ₹ {wallet.availableBudget.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </div>

            {/* Financial Settlement & Transparency Rules (Feature 8.12) */}
            <div className="panel" style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <CheckCircle2 size={16} color="var(--cyan)" />
                <h4 style={{ margin: 0, fontSize: 14 }}>Settlement & Compliance</h4>
              </div>
              <ul className="settlement-rules-list">
                <li>Automated TDS & 18% GST calculation on all confirmed player bids.</li>
                <li>Instant escrow deduction upon gavel strike prevents over-spending.</li>
                <li>Digital smart contract generated for player franchise agreement.</li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. TOURNAMENT & FRANCHISES DASHBOARD (Features 8.1, 8.4, 8.11) */}
        {activeTab === 'tournament' && (
          <div className="auction-franchises-container">
            <div className="tournament-summary-card">
              <h3>{TOURNAMENT_DATA.name}</h3>
              <p>{TOURNAMENT_DATA.tier} • {TOURNAMENT_DATA.organizer}</p>
              <div className="tournament-meta-pills">
                <span className="meta-pill">8 Franchises</span>
                <span className="meta-pill">144 Player Slots</span>
                <span className="meta-pill">₹10 Lakh Cap / Team</span>
              </div>
            </div>

            <h4>Participating Franchises</h4>
            <div className="franchises-list">
              {FRANCHISES_LIST.map((f) => (
                <div key={f.id} className="franchise-item-card">
                  <div className="franchise-color-mark" style={{ background: f.color }} />
                  <div className="franchise-info">
                    <strong>{f.name}</strong>
                    <span>{f.playersCount} Players Acquired</span>
                  </div>
                  <div className="franchise-wallet-badge">
                    <span>Remaining</span>
                    <strong>{f.wallet}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
