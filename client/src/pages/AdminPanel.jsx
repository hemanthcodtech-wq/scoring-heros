import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShieldAlert,
  UserCheck,
  Trophy,
  ShoppingBag,
  DollarSign,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Search,
  Filter,
  Check,
  ChevronRight,
  Eye,
  RefreshCw,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function AdminPanel() {
  const navigate = useNavigate()

  // Active Tab: 'verifications' | 'matches' | 'tournaments' | 'marketplace' | 'financials'
  const [activeTab, setActiveTab] = useState('verifications')
  const [toastMsg, setToastMsg] = useState('')

  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- 1. AADHAAR VERIFICATION QUEUE (FEATURE 3.3 & 3.19) ---
  const [kycQueue, setKycQueue] = useState([
    {
      id: 'kyc-1',
      name: 'Vikas Rathi',
      phone: '+91 98765 43210',
      aadhaarHash: 'XXXX-XXXX-8492',
      city: 'Delhi NCR',
      role: 'Pace Bowler',
      trustScore: 840,
      fraudRisk: 'Low',
      status: 'Pending',
    },
    {
      id: 'kyc-2',
      name: 'Arjun Das',
      phone: '+91 91234 56789',
      aadhaarHash: 'XXXX-XXXX-1934',
      city: 'Meerut',
      role: 'All-Rounder',
      trustScore: 910,
      fraudRisk: 'Low',
      status: 'Pending',
    },
    {
      id: 'kyc-3',
      name: 'Sameer Khan',
      phone: '+91 97890 12345',
      aadhaarHash: 'XXXX-XXXX-6621',
      city: 'Mumbai',
      role: 'Batsman',
      trustScore: 610,
      fraudRisk: 'Medium (Duplicate IP)',
      status: 'Flagged',
    },
  ])

  const handleVerify = (id, approve) => {
    setKycQueue((prev) =>
      prev.map((k) =>
        k.id === id ? { ...k, status: approve ? 'Verified' : 'Rejected' } : k
      )
    )
    triggerToast(approve ? 'Player Aadhaar verified & Verified Badge issued!' : 'KYC rejected and notification sent.')
  }

  // --- 2. LIVE MATCHES OVERSIGHT (FEATURE 3.5 & 3.19) ---
  const liveMatches = [
    { id: 'lm-1', teams: 'Hapur Heroes vs Meerut Titans', over: '19.4 / 20.0', score: '192/5 vs 189/6', scorer: 'Rajesh K. (Authorized)', status: 'Live' },
    { id: 'lm-2', teams: 'Coastal Kings vs Marina Strikers', over: '12.1 / 20.0', score: '98/2 vs yet to bat', scorer: 'Deepak V. (Authorized)', status: 'Live' },
  ]

  // --- 3. TOURNAMENTS & GST LEDGER (FEATURE 3.9, 3.11 & 3.19) ---
  const tournamentsList = [
    { id: 't-1', name: 'District Premier Cup 2026', teams: 16, fee: '₹5,000 + 18% GST', gstCollected: '₹14,400', escrowBalance: '₹94,400', status: 'Approved' },
    { id: 't-2', name: 'U19 Academy Champions Trophy', teams: 12, fee: '₹3,500 + 18% GST', gstCollected: '₹7,560', escrowBalance: '₹49,560', status: 'Approved' },
  ]

  // --- 4. MARKETPLACE & SPONSORED ADS (FEATURE 3.16, 3.17 & 3.19) ---
  const marketplaceList = [
    { id: 'mp-1', seller: 'SS Cricket Factory Outlet', item: 'Ton Pro Grade Bat', price: '₹7,999', status: 'Verified Vendor' },
    { id: 'mp-2', seller: 'Spartan Athletics Official', item: 'AeroSpeed Turf Spikes', price: '₹4,499', status: 'Verified Vendor' },
  ]

  return (
    <Screen
      back
      title="Admin Control Panel"
      right={
        <button
          className="admin-top-btn"
          onClick={() => triggerToast('Admin Security: Master Role Active')}
          title="Master Admin"
        >
          <ShieldAlert size={18} color="#e10613" />
        </button>
      }
    >
      <div className="native-admin-app">
        {/* Floating Toast Notification */}
        {toastMsg && (
          <div className="admin-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Global Platform KPIs */}
        <div className="admin-kpi-grid">
          <div className="admin-kpi-card">
            <span className="kpi-val highlight">14,280</span>
            <span className="kpi-lbl">Total Players</span>
          </div>
          <div className="admin-kpi-card">
            <span className="kpi-val green">92.4%</span>
            <span className="kpi-lbl">Aadhaar Verified</span>
          </div>
          <div className="admin-kpi-card">
            <span className="kpi-val gold">₹18.4L</span>
            <span className="kpi-lbl">Monthly GMV</span>
          </div>
          <div className="admin-kpi-card">
            <span className="kpi-val red">₹2.1L</span>
            <span className="kpi-lbl">Platform Cut</span>
          </div>
        </div>

        {/* Top Sticky Segmented Navigation Tabs */}
        <div className="admin-nav-tabs-scroll">
          <button
            className={`admin-nav-tab ${activeTab === 'verifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('verifications')}
          >
            <UserCheck size={14} />
            <span>KYC & Trust</span>
          </button>
          <button
            className={`admin-nav-tab ${activeTab === 'matches' ? 'active' : ''}`}
            onClick={() => setActiveTab('matches')}
          >
            <Trophy size={14} />
            <span>Live Matches</span>
          </button>
          <button
            className={`admin-nav-tab ${activeTab === 'tournaments' ? 'active' : ''}`}
            onClick={() => setActiveTab('tournaments')}
          >
            <FileSpreadsheet size={14} />
            <span>Tournaments & GST</span>
          </button>
          <button
            className={`admin-nav-tab ${activeTab === 'marketplace' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketplace')}
          >
            <ShoppingBag size={14} />
            <span>Commerce & Ads</span>
          </button>
          <button
            className={`admin-nav-tab ${activeTab === 'financials' ? 'active' : ''}`}
            onClick={() => setActiveTab('financials')}
          >
            <DollarSign size={14} />
            <span>Payouts & Escrow</span>
          </button>
        </div>

        {/* ================= TAB 1: KYC & AADHAAR VERIFICATION (3.3 & 3.19) ================= */}
        {activeTab === 'verifications' && (
          <div className="admin-tab-content">
            <div className="admin-info-card">
              <UserCheck size={24} color="#3de0ff" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Aadhaar Verification & Trust Queue
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Fraud detection engine with internal trust scoring & duplicate detection
                </div>
              </div>
            </div>

            <div className="kyc-items-list">
              {kycQueue.map((item) => (
                <div key={item.id} className="kyc-card">
                  <div className="kyc-top-row">
                    <div>
                      <h4 className="kyc-player-name">{item.name}</h4>
                      <span className="kyc-meta-sub">{item.role} • {item.city}</span>
                    </div>
                    <span className={`kyc-status-pill ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="kyc-details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Aadhaar Token</span>
                      <span className="detail-val">{item.aadhaarHash}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Trust Score</span>
                      <span className="detail-val gold">{item.trustScore} / 1000</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Fraud Check</span>
                      <span className={`detail-val ${item.fraudRisk.includes('Medium') ? 'red' : 'green'}`}>
                        {item.fraudRisk}
                      </span>
                    </div>
                  </div>

                  {item.status === 'Pending' && (
                    <div className="kyc-action-buttons">
                      <button
                        className="kyc-btn approve"
                        onClick={() => handleVerify(item.id, true)}
                      >
                        <CheckCircle2 size={14} />
                        <span>APPROVE & VERIFY</span>
                      </button>
                      <button
                        className="kyc-btn reject"
                        onClick={() => handleVerify(item.id, false)}
                      >
                        <XCircle size={14} />
                        <span>REJECT</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: LIVE MATCH MONITORING (3.5 & 3.19) ================= */}
        {activeTab === 'matches' && (
          <div className="admin-tab-content">
            <div className="admin-info-card">
              <Trophy size={24} color="#ffc83d" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Live Match Oversight & Scorer Authorization
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Supervise active tournament matches, override disputed balls & monitor scorers
                </div>
              </div>
            </div>

            <div className="admin-matches-list">
              {liveMatches.map((m) => (
                <div key={m.id} className="admin-match-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="match-live-pill">🔴 LIVE OVERSIGHT</span>
                    <span style={{ fontSize: 10, color: '#9aa8c7' }}>Over {m.over}</span>
                  </div>
                  <h4 style={{ margin: '6px 0 2px', fontSize: 14, color: '#fff' }}>{m.teams}</h4>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#3de0ff' }}>{m.score}</div>
                  <div style={{ fontSize: 10, color: '#9aa8c7', marginTop: 4 }}>
                    Scorer: <strong>{m.scorer}</strong>
                  </div>

                  <div className="match-admin-actions">
                    <button
                      className="admin-mini-btn"
                      onClick={() => triggerToast(`Opened Match Oversight for ${m.teams}`)}
                    >
                      Audit Scorecard
                    </button>
                    <button
                      className="admin-mini-btn danger"
                      onClick={() => triggerToast('DRS Optical review override applied')}
                    >
                      DRS Review Override
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: TOURNAMENTS & GST (3.9, 3.11 & 3.19) ================= */}
        {activeTab === 'tournaments' && (
          <div className="admin-tab-content">
            <div className="admin-info-card">
              <FileSpreadsheet size={24} color="#10b981" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Tournament Registrations & GST Ledger
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  GST invoice compliance, registration payouts & franchise budget audits
                </div>
              </div>
            </div>

            <div className="tournaments-admin-list">
              {tournamentsList.map((t) => (
                <div key={t.id} className="tournament-admin-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: 13, color: '#fff' }}>{t.name}</h4>
                    <span className="admin-status-pill approved">{t.status}</span>
                  </div>
                  <div className="t-specs-grid">
                    <div>Teams: <strong>{t.teams}</strong></div>
                    <div>Fee: <strong>{t.fee}</strong></div>
                    <div>GST (18%): <strong style={{ color: '#ffc83d' }}>{t.gstCollected}</strong></div>
                    <div>Escrow: <strong style={{ color: '#10b981' }}>{t.escrowBalance}</strong></div>
                  </div>

                  <button
                    className="admin-action-btn-full"
                    onClick={() => triggerToast(`Exported GST tax report for ${t.name}`)}
                  >
                    <span>DOWNLOAD GST B2B INVOICE PACK</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: COMMERCE & ADS (3.16, 3.17 & 3.19) ================= */}
        {activeTab === 'marketplace' && (
          <div className="admin-tab-content">
            <div className="admin-info-card">
              <ShoppingBag size={24} color="#a855f7" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Marketplace & Sponsored Ads Moderation
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Merchant verification, catalog compliance & campaign impression tracking
                </div>
              </div>
            </div>

            <div className="commerce-items-list">
              {marketplaceList.map((item) => (
                <div key={item.id} className="commerce-item-card">
                  <div>
                    <h4 style={{ margin: '0 0 2px', fontSize: 13, color: '#fff' }}>{item.item}</h4>
                    <span style={{ fontSize: 10, color: '#9aa8c7' }}>Seller: {item.seller}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 900, color: '#ffc83d' }}>{item.price}</div>
                    <span style={{ fontSize: 9, color: '#10b981' }}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="admin-red-cta-btn"
              onClick={() => triggerToast('Ad campaign slots recalibrated!')}
            >
              <span>MANAGE SPONSORED BANNER SLOTS</span>
            </button>
          </div>
        )}

        {/* ================= TAB 5: PAYOUTS & FINANCIALS (3.19) ================= */}
        {activeTab === 'financials' && (
          <div className="admin-tab-content">
            <div className="admin-info-card">
              <DollarSign size={24} color="#ffc83d" />
              <div>
                <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>
                  Financial Escrow & Commission Settlement
                </h4>
                <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                  Player purse disbursements, ticket gateway settlements & platform commission
                </div>
              </div>
            </div>

            <div className="payouts-card">
              <div className="payout-row">
                <span>Total Tournament Escrow</span>
                <strong style={{ color: '#fff' }}>₹4,25,000</strong>
              </div>
              <div className="payout-row">
                <span>Auction Player Purse Disbursed</span>
                <strong style={{ color: '#10b981' }}>₹12,40,000</strong>
              </div>
              <div className="payout-row">
                <span>Platform Commission (5%)</span>
                <strong style={{ color: '#ffc83d' }}>₹83,250</strong>
              </div>
              <div className="payout-row">
                <span>Pending Vendor Payouts</span>
                <strong style={{ color: '#3de0ff' }}>₹32,400</strong>
              </div>
            </div>

            <button
              className="admin-red-cta-btn"
              onClick={() => triggerToast('Automated bank payouts triggered via RazorpayX!')}
            >
              <RefreshCw size={16} />
              <span>RELEASE PENDING SETTLEMENTS</span>
            </button>
          </div>
        )}
      </div>
    </Screen>
  )
}
