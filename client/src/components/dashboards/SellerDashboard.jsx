import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  ShieldCheck,
  Package,
  TrendingUp,
  DollarSign,
  Truck,
  Plus,
  CheckCircle2,
  Building,
  Megaphone,
} from 'lucide-react'

export default function SellerDashboard({ user }) {
  const navigate = useNavigate()
  const details = user?.roleDetails || {}

  const [payoutRequested, setPayoutRequested] = useState(false)

  const [orders, setOrders] = useState([
    { id: 'ORD-8821', item: 'Apex Pro Grade 1 English Willow Bat', buyer: 'Rohit Sharma (Player)', amount: '₹14,500', status: 'Processing' },
    { id: 'ORD-8820', item: 'Box of 12 Match White Leather Balls', buyer: 'Marina Titans Academy', amount: '₹7,800', status: 'Dispatched' },
    { id: 'ORD-8819', item: 'Full Team Sublimation Jersey Kit (15 Sets)', buyer: 'Coastal Kings XI (Franchise)', amount: '₹22,500', status: 'Delivered' },
  ])

  function handlePayout() {
    setPayoutRequested(true)
    setTimeout(() => setPayoutRequested(false), 3000)
  }

  return (
    <div className="sh-dashboard-layout">
      {/* Seller Hero Card */}
      <section className="sh-dash-hero-card sh-dash-hero-card--seller">
        <div className="sh-dash-hero-top">
          <div className="sh-dash-avatar-box">
            <div className="sh-avatar-hex" style={{ background: 'rgba(0, 230, 118, 0.2)', borderColor: '#00e676' }}>
              <ShoppingBag size={24} color="#00e676" />
            </div>
            <div>
              <div className="sh-dash-hero-title-row">
                <h2>{details.businessName || 'Apex Willow & Pro Gear Co.'}</h2>
                <span className="sh-badge-chip" style={{ color: '#00e676', borderColor: '#00e67655' }}>
                  KYC VERIFIED BRAND
                </span>
              </div>
              <p className="sh-dash-hero-sub">
                Founder: <strong>{user.nickname}</strong> • GSTIN: {details.gstNumber || '09AAACA1234F1Z8'}
              </p>
              <small style={{ color: 'var(--muted)', fontSize: 11 }}>
                Category: {details.category || 'English Willow & Protective Gear'} • Origin: {user.city}
              </small>
            </div>
          </div>

          <div className="sh-dash-stat-pill" style={{ borderColor: '#00e67655' }}>
            <strong style={{ color: '#00e676' }}>{details.escrowSettlementBalance || '₹1.82L'}</strong>
            <span>ESCROW BAL</span>
          </div>
        </div>

        {/* Seller Status Bar */}
        <div className="sh-player-stats-bar" style={{ marginTop: 14 }}>
          <div className="sh-stat-box">
            <strong style={{ color: '#00e676' }}>{details.activeListings || 38}</strong>
            <span>Store Products</span>
          </div>
          <div className="sh-stat-box">
            <strong style={{ color: '#ffc83d' }}>{details.pendingOrders || 14}</strong>
            <span>Orders in Queue</span>
          </div>
          <div className="sh-stat-box">
            <strong>{details.averageRating || '4.9 ★'}</strong>
            <span>Buyer Rating</span>
          </div>
          <div className="sh-stat-box">
            <strong>B2B + B2C</strong>
            <span>Channels</span>
          </div>
        </div>
      </section>

      {/* Quick Action Shortcuts (Allocated Features) */}
      <div className="sh-quick-actions-grid">
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/marketplace')}>
          <div className="sh-action-icon" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            <ShoppingBag size={18} />
          </div>
          <span>Catalog</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/partners')}>
          <div className="sh-action-icon" style={{ background: 'rgba(61,224,255,0.15)', color: '#3de0ff' }}>
            <Building size={18} />
          </div>
          <span>B2B KYC</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/sponsorship')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,214,0,0.15)', color: '#ffd600' }}>
            <Megaphone size={18} />
          </div>
          <span>Promote Ads</span>
        </button>
        <button type="button" className="sh-action-btn" onClick={() => navigate('/app/stats')}>
          <div className="sh-action-icon" style={{ background: 'rgba(255,200,61,0.15)', color: '#ffc83d' }}>
            <TrendingUp size={18} />
          </div>
          <span>Sales Stats</span>
        </button>
      </div>

      {/* Escrow Settlement & Payout Desk (Core requirement) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <DollarSign size={18} color="#00e676" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Revenue Settlement & Escrow Payouts</h3>
          </div>
          <span className="pill" style={{ background: 'rgba(0,230,118,0.15)', color: '#00e676' }}>
            AUTO-SETTLED T+2
          </span>
        </header>

        <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>ESCROW BALANCE READY FOR PAYOUT</span>
              <strong style={{ fontSize: 18, color: '#00e676', display: 'block' }}>{details.escrowSettlementBalance || '₹1,82,400'}</strong>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>Verified Bank</span>
              <strong style={{ fontSize: 13, color: '#f4f7ff', display: 'block' }}>HDFC Bank •••• 4091</strong>
            </div>
          </div>

          {payoutRequested ? (
            <div style={{ marginTop: 10, padding: 8, background: 'rgba(0,230,118,0.15)', color: '#00e676', borderRadius: 8, fontSize: 12, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <CheckCircle2 size={14} /> Payout initiated to bank account! Reference: NEFT-SH-99214
            </div>
          ) : (
            <button
              type="button"
              className="btn btn--primary btn--sm"
              style={{ width: '100%', marginTop: 10, background: 'linear-gradient(135deg, #00e676, #00b0ff)' }}
              onClick={handlePayout}
            >
              Request Bank Transfer Payout →
            </button>
          )}
        </div>
      </section>

      {/* Orders In Flow (Buyers: Players, Teams, Academies) */}
      <section className="panel" style={{ padding: '14px 16px' }}>
        <header style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Package size={17} color="#3de0ff" />
            <h3 style={{ margin: 0, fontSize: 15 }}>Orders Queue (Players, Academies & Teams)</h3>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/app/marketplace')}>
            All orders →
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {orders.map((o) => (
            <div
              key={o.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div>
                <strong style={{ fontSize: 13 }}>{o.item}</strong>
                <small style={{ display: 'block', color: 'var(--muted)', fontSize: 11 }}>
                  {o.id} • Buyer: {o.buyer}
                </small>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: 14, color: '#f4f7ff' }}>{o.amount}</strong>
                <span
                  className="pill"
                  style={{
                    display: 'block',
                    fontSize: 9,
                    marginTop: 2,
                    background:
                      o.status === 'Processing'
                        ? 'rgba(255,200,61,0.15)'
                        : o.status === 'Dispatched'
                        ? 'rgba(61,224,255,0.15)'
                        : 'rgba(0,230,118,0.15)',
                    color:
                      o.status === 'Processing'
                        ? '#ffc83d'
                        : o.status === 'Dispatched'
                        ? '#3de0ff'
                        : '#00e676',
                  }}
                >
                  {o.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B2B Wholesale Deals Allotment */}
      <section className="panel" style={{ padding: '14px 16px', cursor: 'pointer' }} onClick={() => navigate('/app/partners')}>
        <header style={{ marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Building size={17} color="#00e676" />
            <h3 style={{ margin: 0, fontSize: 15 }}>B2B Wholesale Contracts & Team Inquiries</h3>
          </div>
          <span className="text-link">Review bids →</span>
        </header>
        <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
          3 bulk requests: 50 custom academy jerseys from Marina Titans + 20 tournament grade leather balls.
        </p>
      </section>
    </div>
  )
}
