import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Megaphone,
  Award,
  Sparkles,
  BarChart3,
  Tv,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Layers,
  Share2,
  FileText,
  ChevronRight,
  ExternalLink,
  Target,
  Users,
  Check,
  Plus,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function SponsorshipAds() {
  const navigate = useNavigate()

  // Active Tab: 'packages' | 'placements' | 'branding' | 'analytics'
  const [activeTab, setActiveTab] = useState('packages')
  const [toastMsg, setToastMsg] = useState('')

  // Toast feedback
  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- SPONSOR PACKAGES (3-TIER COMPARISON AS PER BLUEPRINT) ---
  const [selectedTier, setSelectedTier] = useState('title') // default to 'title' like in blueprint screenshot
  const packages = [
    {
      id: 'silver',
      name: 'SILVER',
      price: '₹25,000',
      shortPrice: '₹25K',
      popular: false,
      color: '#9aa8c7',
      features: [
        'Scorecard footer banner ad',
        'Match feed logo placement',
        'Social media shoutout on results',
        '15,000 guaranteed impressions',
      ],
    },
    {
      id: 'gold',
      name: 'GOLD',
      price: '₹75,000',
      shortPrice: '₹75K',
      popular: false,
      color: '#ffc83d',
      features: [
        'Live stream corner logo bug',
        'Match break 15-second video ad',
        'Jersey sleeve sponsor badge',
        'In-app featured brand story',
        '75,000 guaranteed impressions',
      ],
    },
    {
      id: 'title',
      name: 'TITLE',
      price: '₹2,50,000',
      shortPrice: '₹2.5L',
      popular: true,
      color: '#ff3b50',
      features: [
        'Official Naming Rights ("Cup powered by Brand")',
        'Trophy & Player of the Match branding',
        'Boundary perimeter hoardings',
        'Full app theme takeover for tournament',
        '300,000+ guaranteed impressions',
      ],
    },
  ]

  const currentSelectedPkg = packages.find((p) => p.id === selectedTier) || packages[2]

  // --- LIVE AD PLACEMENT TOGGLES ---
  const [adPlacements, setAdPlacements] = useState([
    { id: 'scorecard', title: 'Scorecard banner', active: true, format: '320x50 Banner' },
    { id: 'match_break', title: 'Match break video', active: true, format: '10s Video Overlay' },
    { id: 'local_card', title: 'Local business card', active: false, format: 'Sponsored Tile' },
    { id: 'epaper', title: 'E-paper article', active: true, format: 'Editorial Inline' },
  ])

  const togglePlacement = (id) => {
    setAdPlacements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    )
    triggerToast('Live ad placement toggle updated')
  }

  // --- BRANDING ON JERSEY STATE ---
  const [jerseyColor, setJerseyColor] = useState('blue')
  const colorSwatches = [
    { id: 'red', label: 'RED', color: '#e10613' },
    { id: 'blue', label: 'BLUE', color: '#1d6dff' },
    { id: 'gold', label: 'GOLD', color: '#f59e0b' },
    { id: 'green', label: 'GREEN', color: '#10b981' },
  ]
  const [sponsorLogoPosition, setSponsorLogoPosition] = useState('chest') // 'chest' | 'sleeve' | 'back'

  return (
    <Screen
      back
      title="Sponsorship & Advertising"
      right={
        <button
          className="sponsor-top-badge-btn"
          onClick={() => triggerToast('Opening Brand Campaign Desk...')}
          title="Campaign Desk"
        >
          <Megaphone size={18} color="#ff3b50" />
        </button>
      }
    >
      <div className="native-sponsor-app">
        {/* Toast Alert */}
        {toastMsg && (
          <div className="sponsor-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Top Sticky Segmented Tabs */}
        <div className="sponsor-nav-tabs-scroll">
          <button
            className={`sponsor-nav-tab ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            <Award size={14} />
            <span>Sponsor Packages</span>
          </button>
          <button
            className={`sponsor-nav-tab ${activeTab === 'placements' ? 'active' : ''}`}
            onClick={() => setActiveTab('placements')}
          >
            <Tv size={14} />
            <span>Ad Placements</span>
          </button>
          <button
            className={`sponsor-nav-tab ${activeTab === 'branding' ? 'active' : ''}`}
            onClick={() => setActiveTab('branding')}
          >
            <Sparkles size={14} />
            <span>Jersey Branding</span>
          </button>
          <button
            className={`sponsor-nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={14} />
            <span>Ad Analytics</span>
          </button>
        </div>

        {/* ---------------- TAB 1: SPONSOR PACKAGES (3 SIDE-BY-SIDE TILES AS PER BLUEPRINT) ---------------- */}
        {activeTab === 'packages' && (
          <div className="sponsor-tab-content">
            <div className="blueprint-section-kicker">
              <span className="kicker-sub">SPONSOR PACKAGES</span>
              <h3 className="kicker-title">Multi-Level Sponsorship System</h3>
            </div>

            {/* 3 Columns Comparison Cards Grid (Matching Blueprint exactly) */}
            <div className="sponsor-3col-grid">
              {packages.map((pkg) => {
                const isSelected = selectedTier === pkg.id
                return (
                  <div
                    key={pkg.id}
                    className={`sponsor-3col-card ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedTier(pkg.id)
                      triggerToast(`Selected ${pkg.name} Package`)
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="col-tier-title">{pkg.name}</div>
                    <div className="col-tier-price">{pkg.shortPrice}</div>

                    <div className="col-tier-checklist">
                      <div className="col-check-item">
                        <Check size={11} color={isSelected ? '#fff' : '#10b981'} />
                        <span>Logo</span>
                      </div>
                      <div className="col-check-item">
                        <Check size={11} color={isSelected ? '#fff' : '#10b981'} />
                        <span>Match Ads</span>
                      </div>
                      <div className="col-check-item">
                        <Check size={11} color={isSelected ? '#fff' : '#10b981'} />
                        <span>Social</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Selected Package Details Box */}
            <div className="selected-package-box">
              <div className="pkg-detail-header">
                <div>
                  <span className="pkg-tag">CHOSEN SPONSORSHIP TIER</span>
                  <div className="pkg-detail-name">
                    {currentSelectedPkg.name} SPONSOR ({currentSelectedPkg.price})
                  </div>
                </div>
                {currentSelectedPkg.popular && <span className="pkg-popular-badge">TITLE RIGHTS</span>}
              </div>

              <div className="pkg-deliverables-list">
                {currentSelectedPkg.features.map((feat, i) => (
                  <div key={i} className="pkg-deliverable-item">
                    <CheckCircle2 size={13} color="#10b981" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                className="selected-contact-btn"
                onClick={() => triggerToast(`Contacting brand relations for ${currentSelectedPkg.name}...`)}
              >
                SELECT PACKAGE & CONTACT BRAND
              </button>
            </div>

            {/* Bottom Red Action Button */}
            <button
              className="sponsor-red-cta-btn"
              onClick={() => {
                triggerToast('Campaign created! Opening ad placements...')
                setActiveTab('placements')
              }}
            >
              <span>CREATE CAMPAIGN</span>
            </button>
          </div>
        )}

        {/* ---------------- TAB 2: LIVE AD PLACEMENTS & TOGGLES (MATCHING BLUEPRINT) ---------------- */}
        {activeTab === 'placements' && (
          <div className="sponsor-tab-content">
            {/* Mega Megaphone Live Ad Placement Badge */}
            <div className="blueprint-ad-placement-hero">
              <div className="mega-ad-icon-box">
                <Megaphone size={32} color="#ffc83d" />
              </div>
              <div className="mega-ad-title">LIVE AD PLACEMENT</div>
              <div className="mega-ad-sub">Dynamic in-match ad surfaces across scoring & video</div>
            </div>

            {/* Blueprint Toggles List */}
            <div className="blueprint-toggles-card">
              {adPlacements.map((ad) => (
                <div key={ad.id} className="blueprint-toggle-row">
                  <span className="bp-toggle-label">{ad.title}</span>

                  <button
                    className={`bp-switch-pill ${ad.active ? 'on' : 'off'}`}
                    onClick={() => togglePlacement(ad.id)}
                  >
                    <span>{ad.active ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Live Scorecard Ad Mockup Preview */}
            <div className="ad-mockup-preview-card">
              <span className="preview-label">LIVE SCORECARD BANNER PREVIEW</span>
              <div className="mockup-banner-frame">
                <div className="mockup-sponsor-logo">SH BRAND</div>
                <div className="mockup-copy">
                  <strong>Official Performance Partner</strong>
                  <span>Exclusive 20% discount on match gear</span>
                </div>
                <button className="mockup-btn" onClick={() => triggerToast('Ad clicked!')}>
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* Bottom Red Action Button */}
            <button
              className="sponsor-red-cta-btn"
              onClick={() => {
                triggerToast('Ad placements saved! Opening performance analytics...')
                setActiveTab('analytics')
              }}
            >
              <span>CREATE CAMPAIGN</span>
            </button>
          </div>
        )}

        {/* ---------------- TAB 3: JERSEY & EQUIPMENT BRANDING (MATCHING BLUEPRINT) ---------------- */}
        {activeTab === 'branding' && (
          <div className="sponsor-tab-content">
            <div className="jersey-branding-blueprint-card">
              <h3 style={{ margin: '0 0 10px', fontSize: 15, color: '#fff' }}>Jersey & Equipment Branding</h3>

              {/* Jersey Graphic with Crest Mockup */}
              <div className="jersey-branding-vector-stage">
                <svg width="150" height="140" viewBox="0 0 140 130" fill="none">
                  <path
                    d="M40 20 L20 45 L35 55 L45 42 L45 115 L95 115 L95 42 L105 55 L120 45 L100 20 L80 32 Q70 38 60 32 Z"
                    fill={
                      jerseyColor === 'red'
                        ? '#e10613'
                        : jerseyColor === 'gold'
                        ? '#f59e0b'
                        : jerseyColor === 'green'
                        ? '#10b981'
                        : '#1d6dff'
                    }
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                  {/* Collar */}
                  <path d="M60 20 Q70 28 80 20" stroke="#fff" strokeWidth="2" fill="none" />
                  {/* Sponsor Logo Box on Chest */}
                  <rect x="50" y="46" width="40" height="15" rx="3" fill="#ffc83d" stroke="#ffffff" strokeWidth="1" />
                  <text x="70" y="57" fill="#000000" fontSize="7.5" fontWeight="900" textAnchor="middle">
                    SPONSOR
                  </text>
                  {/* Player Number */}
                  <text x="70" y="88" fill="#ffffff" fontSize="26" fontWeight="900" textAnchor="middle">
                    14
                  </text>
                </svg>

                <div className="applied-pill-green">TEAM JERSEY APPLIED</div>
              </div>

              {/* Color Swatch Buttons (RED, BLUE, GOLD, GREEN as in blueprint) */}
              <div className="blueprint-swatch-row">
                {colorSwatches.map((c) => (
                  <button
                    key={c.id}
                    className={`bp-swatch-btn ${jerseyColor === c.id ? 'active' : ''}`}
                    style={{ background: c.color }}
                    onClick={() => {
                      setJerseyColor(c.id)
                      triggerToast(`Selected ${c.label} Jersey Theme`)
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* Logo Position Selector */}
              <div className="logo-position-row" style={{ marginTop: 8 }}>
                {[
                  { id: 'chest', label: 'Chest Crest' },
                  { id: 'sleeve', label: 'Right Sleeve' },
                  { id: 'back', label: 'Back Header' },
                ].map((pos) => (
                  <button
                    key={pos.id}
                    className={`pos-btn ${sponsorLogoPosition === pos.id ? 'active' : ''}`}
                    onClick={() => setSponsorLogoPosition(pos.id)}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>

              {/* Action Button as in blueprint */}
              <button
                className="sponsor-red-cta-btn"
                style={{ marginTop: 12 }}
                onClick={() => {
                  navigate('/app/avatar')
                  triggerToast('Opening 3D Avatar Suite...')
                }}
              >
                <span>CREATE / UPDATE AVATAR</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------- TAB 4: AD ANALYTICS (MATCHING BLUEPRINT) ---------------- */}
        {activeTab === 'analytics' && (
          <div className="sponsor-tab-content">
            <div className="blueprint-analytics-card">
              <div className="bp-analytics-header">
                <span className="bp-analytics-kicker">AD PERFORMANCE ANALYTICS</span>
                <h3 className="bp-analytics-title">Campaign Performance</h3>
              </div>

              {/* 3 Blueprint Metric Boxes: 1.8M, 4.7%, ₹42K */}
              <div className="blueprint-kpis-grid">
                <div className="bp-kpi-box">
                  <span className="bp-kpi-val">1.8M</span>
                  <span className="bp-kpi-lbl">IMPRESSIONS</span>
                </div>
                <div className="bp-kpi-box">
                  <span className="bp-kpi-val gold">4.7%</span>
                  <span className="bp-kpi-lbl">ENGAGEMENT</span>
                </div>
                <div className="bp-kpi-box">
                  <span className="bp-kpi-val green">₹42K</span>
                  <span className="bp-kpi-lbl">VALUE</span>
                </div>
              </div>

              {/* Wave Chart Graphic */}
              <div className="analytics-chart-box">
                <svg width="100%" height="80" viewBox="0 0 280 80" fill="none">
                  <path
                    d="M10 65 Q 40 45, 70 52 T 130 35 T 190 40 T 260 15"
                    stroke="#3de0ff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="260" cy="15" r="4.5" fill="#ff3b50" stroke="#ffffff" strokeWidth="2" />
                </svg>
                <div className="report-ready-text">REPORT READY FOR SPONSOR</div>
              </div>

              {/* Action Button */}
              <button
                className="sponsor-red-cta-btn"
                style={{ marginTop: 14 }}
                onClick={() => triggerToast('Exporting official Sponsor Performance Audit...')}
              >
                <span>CREATE CAMPAIGN</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
