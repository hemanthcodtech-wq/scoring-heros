import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Factory,
  Building2,
  ShieldCheck,
  Award,
  CheckCircle2,
  Truck,
  Package,
  Layers,
  Store,
  Tag,
  Sparkles,
  Plus,
  Minus,
  TrendingUp,
  Clock,
  MapPin,
  Check,
  DollarSign,
  BarChart3,
  Sliders,
  AlertCircle,
  FileText,
  Percent,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function ManufacturerPartners() {
  const navigate = useNavigate()

  // Active Tab: 'network' | 'production' | 'wholesale' | 'logistics' | 'settlement'
  const [activeTab, setActiveTab] = useState('network')
  const [toastMsg, setToastMsg] = useState('')

  // Toast feedback
  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- PRODUCTION CAPACITY & SYNC STATE ---
  const [dailyCapacity, setDailyCapacity] = useState(500)
  const [currentOutput, setCurrentOutput] = useState(380)
  const [allocatedJerseys, setAllocatedJerseys] = useState(60) // 60%
  const [allocatedBats, setAllocatedBats] = useState(25) // 25%
  const [allocatedGear, setAllocatedGear] = useState(15) // 15%

  // --- WHOLESALE QUOTATION CALCULATOR ---
  const [orderCategory, setOrderCategory] = useState('jerseys') // 'jerseys' | 'bats' | 'balls'
  const [quantity, setQuantity] = useState(50)

  const unitPrices = {
    jerseys: { base: 850, minQty: 20, leadDays: 4 },
    bats: { base: 4200, minQty: 10, leadDays: 7 },
    balls: { base: 950, minQty: 30, leadDays: 3 },
  }

  const currentPricing = unitPrices[orderCategory]
  const institutionalDiscount = quantity >= 100 ? 25 : quantity >= 50 ? 20 : 15
  const grossTotal = quantity * currentPricing.base
  const discountAmount = Math.round((grossTotal * institutionalDiscount) / 100)
  const netTotal = grossTotal - discountAmount

  // --- BRAND PARTNERS DIRECTORY ---
  const brandPartners = [
    {
      id: 'ss',
      name: 'SS Sunridges Manufacturing',
      hub: 'Meerut Sports Industrial Estate',
      kyc: 'VERIFIED',
      rating: 4.9,
      specialty: 'English Willow Bats & Protective Pads',
      activeOrders: 14,
      capacityStatus: 'High (85% Utilized)',
      imageEmoji: '🏏',
    },
    {
      id: 'tirupur',
      name: 'Tirupur Elite Apparel Direct',
      hub: 'Tirupur Textile Park, TN',
      kyc: 'VERIFIED',
      rating: 4.8,
      specialty: 'Moisture-Wick Sublimation Team Jerseys',
      activeOrders: 32,
      capacityStatus: 'Optimal (72% Utilized)',
      imageEmoji: '👕',
    },
    {
      id: 'kookaburra',
      name: 'Jalandhar Leather & Sports Hub',
      hub: 'Leather Complex, Jalandhar',
      kyc: 'VERIFIED',
      rating: 4.7,
      specialty: 'Alum Tan Match Balls & Wicketkeeping Gear',
      activeOrders: 9,
      capacityStatus: 'Moderate (55% Utilized)',
      imageEmoji: '🔴',
    },
    {
      id: 'masuri',
      name: 'Masuri Certified Safety Armour',
      hub: 'Delhi NCR Tech Hub',
      kyc: 'VERIFIED',
      rating: 4.9,
      specialty: 'Titanium & Carbon Fiber Helmets',
      activeOrders: 6,
      capacityStatus: 'Optimal (68% Utilized)',
      imageEmoji: '🪖',
    },
  ]

  // --- FEATURED PROMOTION CAMPAIGNS ---
  const [featuredListings, setFeaturedListings] = useState([
    { id: 'f1', title: 'Grade 1 Pro Bats Collection', active: true, impressions: '42.8K', ctr: '5.2%' },
    { id: 'f2', title: 'Custom Sublimation Teamwear', active: true, impressions: '68.1K', ctr: '6.9%' },
    { id: 'f3', title: 'Club Match Leather Balls (Box of 12)', active: false, impressions: '18.4K', ctr: '3.8%' },
  ])

  const toggleFeatured = (id) => {
    setFeaturedListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    )
    triggerToast('Listing promotion status updated')
  }

  return (
    <Screen
      back
      title="Manufacturer & Brand Partner Hub"
      right={
        <button
          className="partner-cta-top-btn"
          onClick={() => triggerToast('Opening Partner KYC Portal...')}
          title="KYC Certified"
        >
          <ShieldCheck size={18} color="#10b981" />
        </button>
      }
    >
      <div className="native-partner-hub-app">
        {/* Toast Alert */}
        {toastMsg && (
          <div className="partner-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Segmented Top Tabs */}
        <div className="partner-nav-tabs-scroll">
          <button
            className={`partner-nav-tab ${activeTab === 'network' ? 'active' : ''}`}
            onClick={() => setActiveTab('network')}
          >
            <Factory size={15} />
            <span>Partner Network</span>
          </button>
          <button
            className={`partner-nav-tab ${activeTab === 'production' ? 'active' : ''}`}
            onClick={() => setActiveTab('production')}
          >
            <Sliders size={15} />
            <span>Production Sync</span>
          </button>
          <button
            className={`partner-nav-tab ${activeTab === 'wholesale' ? 'active' : ''}`}
            onClick={() => setActiveTab('wholesale')}
          >
            <Layers size={15} />
            <span>Institutional Supply</span>
          </button>
          <button
            className={`partner-nav-tab ${activeTab === 'logistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('logistics')}
          >
            <Truck size={15} />
            <span>Order Dispatch</span>
          </button>
          <button
            className={`partner-nav-tab ${activeTab === 'settlement' ? 'active' : ''}`}
            onClick={() => setActiveTab('settlement')}
          >
            <DollarSign size={15} />
            <span>Revenue Settlements</span>
          </button>
        </div>

        {/* ---------------- TAB 1: PARTNER NETWORK & KYC ---------------- */}
        {activeTab === 'network' && (
          <div className="partner-tab-content">
            {/* Manufacturer Trust Card */}
            <div className="partner-hero-badge-card">
              <div className="partner-hero-top">
                <div className="partner-hero-icon">
                  <Building2 size={26} color="#3de0ff" />
                </div>
                <div>
                  <div className="partner-hero-kicker">VERIFIED SUPPLY & PRODUCTION NETWORK</div>
                  <h3 className="partner-hero-title">Factory Direct Certification</h3>
                  <div className="partner-hero-sub">Direct factory-floor integrations with official BCCI/ICC certified gear</div>
                </div>
              </div>

              <div className="partner-specs-grid">
                <div className="partner-spec-box">
                  <span className="spec-label">Business KYC</span>
                  <span className="spec-val success">100% VERIFIED</span>
                </div>
                <div className="partner-spec-box">
                  <span className="spec-label">Quality Lab</span>
                  <span className="spec-val success">APPROVED</span>
                </div>
                <div className="partner-spec-box">
                  <span className="spec-label">Network Rating</span>
                  <span className="spec-val gold">★ 4.8 / 5</span>
                </div>
                <div className="partner-spec-box">
                  <span className="spec-label">Completed Units</span>
                  <span className="spec-val highlight">1,248 Units</span>
                </div>
              </div>
            </div>

            {/* Official Brand Partners Directory */}
            <div className="partner-directory-section">
              <div className="section-header-row">
                <h4 className="section-title">CERTIFIED BRAND PARTNERS</h4>
                <span className="section-count">{brandPartners.length} Active Hubs</span>
              </div>

              <div className="brand-partners-list">
                {brandPartners.map((b) => (
                  <div key={b.id} className="brand-partner-card">
                    <div className="brand-top-row">
                      <span className="brand-emoji">{b.imageEmoji}</span>
                      <div className="brand-title-box">
                        <div className="brand-name">{b.name}</div>
                        <div className="brand-hub-meta">
                          <MapPin size={11} color="#9aa8c7" />
                          <span>{b.hub}</span>
                        </div>
                      </div>
                      <span className="brand-kyc-pill">{b.kyc}</span>
                    </div>

                    <div className="brand-details-body">
                      <div className="brand-specialty">{b.specialty}</div>
                      <div className="brand-stats-row">
                        <span>★ {b.rating} Rating</span>
                        <span>• {b.activeOrders} Active Batches</span>
                        <span style={{ color: '#3de0ff' }}>• {b.capacityStatus}</span>
                      </div>
                    </div>

                    <div className="brand-card-actions">
                      <button
                        className="brand-action-btn secondary"
                        onClick={() => {
                          navigate('/app/marketplace')
                          triggerToast(`Browsing ${b.name} catalog...`)
                        }}
                      >
                        <Store size={13} />
                        <span>View Catalog</span>
                      </button>
                      <button
                        className="brand-action-btn primary"
                        onClick={() => triggerToast(`Contacting ${b.name.split(' ')[0]} floor manager...`)}
                      >
                        <span>Direct Inquiry</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 2: PRODUCTION & CAPACITY SYNC ---------------- */}
        {activeTab === 'production' && (
          <div className="partner-tab-content">
            <div className="production-sync-card">
              <div className="production-header">
                <div>
                  <span className="prod-badge">FACTORY TELEMETRY</span>
                  <h3 style={{ margin: '4px 0 2px', fontSize: 16, color: '#fff' }}>
                    Live Production Capacity & Output
                  </h3>
                  <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                    Automated line synchronization between app orders and factory capacity
                  </div>
                </div>
                <div className="prod-efficiency-box">
                  <span className="eff-val">{Math.round((currentOutput / dailyCapacity) * 100)}%</span>
                  <span className="eff-label">Capacity Utilized</span>
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="capacity-bar-container">
                <div
                  className="capacity-bar-fill"
                  style={{ width: `${Math.min(100, (currentOutput / dailyCapacity) * 100)}%` }}
                />
              </div>
              <div className="capacity-numbers-row">
                <span>Current Daily Output: <strong>{currentOutput} Units</strong></span>
                <span>Max Capacity Limit: <strong>{dailyCapacity} Units/Day</strong></span>
              </div>

              {/* Capacity Controls Stepper */}
              <div className="capacity-stepper-box">
                <span className="stepper-title-label">Adjust Factory Output Target:</span>
                <div className="stepper-btns-row">
                  <button
                    className="cap-step-btn"
                    onClick={() => {
                      setCurrentOutput((prev) => Math.max(100, prev - 20))
                      triggerToast('Target adjusted -20 units')
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="cap-val-display">{currentOutput} Units</span>
                  <button
                    className="cap-step-btn"
                    onClick={() => {
                      setCurrentOutput((prev) => Math.min(dailyCapacity, prev + 20))
                      triggerToast('Target adjusted +20 units')
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Line Allocation Distribution */}
            <div className="line-allocation-card">
              <h4 style={{ margin: '0 0 10px', fontSize: 13, color: '#fff' }}>
                PRODUCTION LINE WORKLOAD DISTRIBUTION
              </h4>

              <div className="allocation-rows">
                <div className="alloc-item">
                  <div className="alloc-meta">
                    <span>👕 Custom Sublimation Team Jerseys</span>
                    <strong style={{ color: '#3de0ff' }}>{allocatedJerseys}% Line Load</strong>
                  </div>
                  <div className="alloc-track">
                    <div className="alloc-fill blue" style={{ width: `${allocatedJerseys}%` }} />
                  </div>
                </div>

                <div className="alloc-item">
                  <div className="alloc-meta">
                    <span>🏏 English Willow Bats (Grade 1 Pressing)</span>
                    <strong style={{ color: '#ffc83d' }}>{allocatedBats}% Line Load</strong>
                  </div>
                  <div className="alloc-track">
                    <div className="alloc-fill gold" style={{ width: `${allocatedBats}%` }} />
                  </div>
                </div>

                <div className="alloc-item">
                  <div className="alloc-meta">
                    <span>🪖 Safety Helmets & Leather Match Balls</span>
                    <strong style={{ color: '#10b981' }}>{allocatedGear}% Line Load</strong>
                  </div>
                  <div className="alloc-track">
                    <div className="alloc-fill green" style={{ width: `${allocatedGear}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- TAB 3: WHOLESALE & INSTITUTIONAL SUPPLY ---------------- */}
        {activeTab === 'wholesale' && (
          <div className="partner-tab-content">
            <div className="institutional-quote-card">
              <div className="quote-header">
                <Layers size={22} color="#ff3b50" />
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, color: '#fff' }}>
                    Institutional & Academy Wholesale Engine
                  </h3>
                  <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                    Bulk orders for coaching academies, corporate leagues, and state clubs
                  </div>
                </div>
              </div>

              {/* Category Selector Chips */}
              <div className="quote-category-selector">
                {[
                  { id: 'jerseys', label: 'Squad Jerseys' },
                  { id: 'bats', label: 'Academy Pro Bats' },
                  { id: 'balls', label: 'Match Leather Balls' },
                ].map((c) => (
                  <button
                    key={c.id}
                    className={`quote-cat-btn ${orderCategory === c.id ? 'active' : ''}`}
                    onClick={() => setOrderCategory(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Volume Quantity Stepper */}
              <div className="quote-quantity-box">
                <span className="quote-qty-label">SELECT BULK QUANTITY:</span>
                <div className="quote-qty-control">
                  <button
                    className="quote-qty-btn"
                    onClick={() => setQuantity((prev) => Math.max(currentPricing.minQty, prev - 10))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quote-qty-val">{quantity} Units</span>
                  <button className="quote-qty-btn" onClick={() => setQuantity((prev) => prev + 10)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Pricing Breakdown Sheet */}
              <div className="quote-bill-sheet">
                <div className="bill-line">
                  <span>Base Factory Unit Price:</span>
                  <span style={{ color: '#fff' }}>₹{currentPricing.base} / unit</span>
                </div>
                <div className="bill-line">
                  <span>Gross Order Value ({quantity} Units):</span>
                  <span style={{ textDecoration: 'line-through', color: '#9aa8c7' }}>
                    ₹{grossTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bill-line highlight">
                  <span>Institutional Volume Discount ({institutionalDiscount}%):</span>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="bill-line">
                  <span>Estimated Production Lead Time:</span>
                  <span style={{ color: '#3de0ff', fontWeight: 700 }}>{currentPricing.leadDays} Days to Dispatch</span>
                </div>
                <div className="bill-divider" />
                <div className="bill-line total">
                  <span>Net Wholesale Payable:</span>
                  <span className="bill-net-price">₹{netTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                className="partner-red-cta-btn"
                onClick={() => {
                  triggerToast(`Wholesale inquiry created for ${quantity} ${orderCategory}!`)
                }}
              >
                <FileText size={16} />
                <span>REQUEST OFFICIAL PROFORMA INVOICE</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------- TAB 4: DISPATCH & LOGISTICS ---------------- */}
        {activeTab === 'logistics' && (
          <div className="partner-tab-content">
            <div className="dispatch-overview-card">
              <div className="dispatch-header-row">
                <div>
                  <span className="dispatch-id-pill">ACTIVE DISPATCH BATCH #SH-2048</span>
                  <h3 style={{ margin: '4px 0 2px', fontSize: 15, color: '#fff' }}>
                    18x Custom Team Jerseys • Dispatch Queue
                  </h3>
                  <div style={{ fontSize: 11, color: '#9aa8c7' }}>Consignee: Scoring Heroes Club • Air Express</div>
                </div>
                <span className="dispatch-status-badge">READY TO SHIP</span>
              </div>

              {/* Quality Inspection Check */}
              <div className="quality-inspection-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={16} color="#10b981" />
                  <strong style={{ fontSize: 12, color: '#10b981' }}>QUALITY CONTROL PASSED (STAGE 3)</strong>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 11, color: '#c0cce8' }}>
                  Stitch tensile test, color fastness wash test, and digital serial code tagging verified by QC team.
                </p>
              </div>

              {/* Courier Partner Card */}
              <div className="courier-card">
                <div className="courier-item">
                  <Truck size={14} color="#3de0ff" />
                  <div>
                    <div className="courier-label">INTEGRATED LOGISTICS</div>
                    <div className="courier-val">BlueDart Air Cargo Priority</div>
                  </div>
                </div>
                <div className="courier-item">
                  <Clock size={14} color="#ffc83d" />
                  <div>
                    <div className="courier-label">SCHEDULED PICKUP</div>
                    <div className="courier-val">Today, 4:30 PM Factory Gate</div>
                  </div>
                </div>
              </div>

              <button
                className="partner-red-cta-btn"
                onClick={() => {
                  navigate('/app/marketplace')
                  triggerToast('Opening Marketplace tracking tab...')
                }}
              >
                <span>VIEW ORDER IN MARKETPLACE TRACKER</span>
                <ExternalLink size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- TAB 5: REVENUE SETTLEMENTS & ADS ---------------- */}
        {activeTab === 'settlement' && (
          <div className="partner-tab-content">
            {/* Settlement Summary Card */}
            <div className="settlement-summary-card">
              <div className="settle-top-meta">
                <span style={{ fontSize: 11, color: '#9aa8c7', fontWeight: 800 }}>MONTHLY GROSS FACTORY SETTLEMENT</span>
                <span className="settle-status-badge">SETTLED TO BANK</span>
              </div>
              <div className="settle-total-amount">₹14,80,000</div>

              <div className="settle-breakdown-row">
                <div className="breakdown-col">
                  <span className="col-label">Vendor Net (93%):</span>
                  <span className="col-val green">₹13,76,400</span>
                </div>
                <div className="breakdown-col">
                  <span className="col-label">Platform Fee (5%):</span>
                  <span className="col-val blue">₹74,000</span>
                </div>
                <div className="breakdown-col">
                  <span className="col-label">Gateway (2%):</span>
                  <span className="col-val red">₹29,600</span>
                </div>
              </div>
            </div>

            {/* Featured Listings / Brand Promotion Portal */}
            <div className="promotions-manager-card">
              <div className="promo-header">
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>FEATURED BRAND PROMOTIONS</h4>
                  <div style={{ fontSize: 11, color: '#9aa8c7', marginTop: 2 }}>
                    Boost your factory catalog to the top of the Marketplace search
                  </div>
                </div>
              </div>

              <div className="promotions-list">
                {featuredListings.map((f) => (
                  <div key={f.id} className="promo-row">
                    <div className="promo-info">
                      <div className="promo-title">{f.title}</div>
                      <div className="promo-stats">
                        <span>{f.impressions} Impressions</span>
                        <span>• {f.ctr} CTR</span>
                      </div>
                    </div>

                    <button
                      className={`promo-toggle-btn ${f.active ? 'active' : ''}`}
                      onClick={() => toggleFeatured(f.id)}
                    >
                      {f.active ? 'BOOSTED' : 'BOOST'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
