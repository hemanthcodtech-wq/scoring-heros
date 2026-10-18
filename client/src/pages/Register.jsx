import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShieldCheck, Zap, UserRound, Briefcase } from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import CountryCodePicker from '../components/CountryCodePicker'
import LanguageSelector from '../components/LanguageSelector'
import { OFFICIAL_ROLES, getRoleById } from '../data/rolesData'

export default function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'register'
  const initialCat = searchParams.get('category') === 'official' ? 'official' : 'player'
  const initialRole = searchParams.get('role') || 'franchise'

  const [mode, setMode] = useState(initialMode) // 'login' | 'register'
  const [roleCategory, setRoleCategory] = useState(initialCat) // 'player' | 'official'
  const [selectedOfficialRoleId, setSelectedOfficialRoleId] = useState(initialRole)

  const { draft, updateDraft, loginAsGuest } = useAuth()
  const { t } = useLanguage()

  const [phoneCode, setPhoneCode] = useState(draft.phoneCode || '+91')
  const [error, setError] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)

  // Dynamic role fields state for officials
  const [roleDetails, setRoleDetails] = useState({
    // Player
    playingRole: 'All-rounder',
    battingStyle: 'Right Hand Bat',
    bowlingStyle: 'Right-arm Fast',
    academyStudent: true,
    academyName: 'Marina Titans Cricket Academy',
    // Franchise
    franchiseName: 'Coastal Kings XI',
    leagueName: 'Premier Champions Cup',
    allocatedPurse: '₹50,00,000 (50L)',
    paddleNumber: '#04',
    // Coach
    coachSpecialization: 'Head Coach / All-Round',
    licenseLevel: 'BCCI / ICC Level 2',
    academyAffiliation: 'Scoring Heroes Apex Academy',
    yearsExperience: '8',
    // Academy
    academyOwnerName: 'Scoring Heroes Elite Academy',
    regNumber: 'TN-SPO-2023-771',
    studentCapacity: '50 - 150 Students',
    netsCount: '4 Turf Nets',
    // Ground
    venueName: 'Marina International Arena & Turfs',
    turfType: 'Natural Red Soil Turf',
    hasFloodlights: true,
    hourlyRate: '₹1,800',
    // Staff
    staffRole: 'Official Match Scorer',
    staffId: 'SH-STF-088',
    assignedVenue: 'Marina Arena - Pavilion B',
    shiftType: 'Day Shift (2 PM - 10 PM)',
    // Organizer
    orgName: 'South Zone Cricket Federation',
    tournamentScale: 'State Championship (32+ Teams)',
    sanctionNumber: 'SAN-2024-CC',
    // Seller
    businessName: 'Apex Willow & Pro Gear Co.',
    gstNumber: '09AAACA1234F1Z8',
    category: 'Cricket Bats (English & Kashmir Willow)',
    kycDocType: 'GST Certificate',
    // Sponsor
    companyName: 'Velocity Sports Nutrition',
    marketingCategory: 'Sports Beverage & Nutrition',
    campaignBudget: '₹2,00,000 - ₹10,00,000 (City League Title)',
    // Fan
    favTeam: 'Scoring XI & CSK',
    fantasyClub: 'Marina Blasters XI',
    interestedSports: 'Cricket First',
    // Admin
    adminCode: 'ADMIN-2026-ROOT',
    department: 'Platform Integrity & Anti-Fraud',
  })

  function updateRoleDetail(key, value) {
    setRoleDetails((prev) => ({ ...prev, [key]: value }))
  }

  const activeOfficialRole = getRoleById(selectedOfficialRoleId)

  // Handle Form Submission
  function handleSubmit(e) {
    e.preventDefault()
    const cleanPhone = draft.phone.replace(/\D/g, '')

    if (cleanPhone.length < 8) {
      setError('Please enter a valid mobile number (at least 8-10 digits).')
      return
    }

    if (mode === 'register') {
      if (!draft.nickname.trim() || draft.nickname.trim().length < 3) {
        setError('Nickname or Brand name must be at least 3 characters.')
        return
      }
      if (!agreeTerms) {
        setError('You must agree to the terms to continue.')
        return
      }
    }

    setError('')

    const finalRole = roleCategory === 'player' ? 'player' : selectedOfficialRoleId

    updateDraft({
      mode,
      phoneCode,
      role: finalRole,
      roleCategory,
      roleDetails,
    })

    navigate('/otp')
  }

  // Direct 1-tap Guest login for selected role (NO MODAL)
  function handleDirectGuest() {
    const targetRole = roleCategory === 'player' ? 'player' : selectedOfficialRoleId
    loginAsGuest(targetRole)
    navigate('/app', { replace: true })
  }

  return (
    <Screen
      back
      title={mode === 'login' ? t('mode_login') : t('create_identity')}
      right={<LanguageSelector compact />}
    >
      <div className="sh-auth-container">
        {/* Top Hero Banner */}
        <div className="sh-hero-card">
          <h2>Play. Score. Rise.</h2>
          <div className="sh-hero-sub">
            Universal Sports Platform for Players, Franchises, Academies & Officials.
          </div>
          <span className="sh-free-pill">11 Dedicated Dashboards · Worldwide Access</span>
        </div>

        {/* 1. Mode Switcher (Sign In vs Register) */}
        <div className="sh-seg">
          <button
            type="button"
            className={`sh-seg-btn ${mode === 'login' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('login')
              setError('')
            }}
          >
            {t('mode_login')}
          </button>
          <button
            type="button"
            className={`sh-seg-btn ${mode === 'register' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('register')
              setError('')
            }}
          >
            {t('mode_register')}
          </button>
        </div>

        {/* 2. Two Main Tabs: Player vs Officials */}
        <div className="sh-role-category-tabs">
          <button
            type="button"
            className={`sh-cat-tab ${roleCategory === 'player' ? 'is-active' : ''}`}
            onClick={() => {
              setRoleCategory('player')
              setError('')
            }}
          >
            <UserRound size={17} />
            <span>{t('tab_player')}</span>
          </button>

          <button
            type="button"
            className={`sh-cat-tab ${roleCategory === 'official' ? 'is-active' : ''}`}
            onClick={() => {
              setRoleCategory('official')
              setError('')
            }}
          >
            <Briefcase size={17} />
            <span>{t('tab_officials')}</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="sh-auth-card">
          <form className="sh-form" onSubmit={handleSubmit}>
            {/* If OFFICIALS is active: Prominent Dropdown of all 10 remaining roles */}
            {roleCategory === 'official' && (
              <div className="sh-official-picker-box">
                <label className="sh-label">
                  <span style={{ color: '#ffd600', fontWeight: 'bold' }}>
                    Select Official Role (from dropdown)
                  </span>
                  <select
                    className="sh-select"
                    value={selectedOfficialRoleId}
                    onChange={(e) => setSelectedOfficialRoleId(e.target.value)}
                    style={{
                      border: '1.5px solid rgba(255, 214, 0, 0.4)',
                      background: '#06112c',
                      fontSize: '13px',
                      padding: '10px 12px',
                    }}
                  >
                    <option value="fan">1. Fan / Viewer (Super Scoring 11, Tickets & Entertainment)</option>
                    <option value="franchise">2. Franchise Owner (Auction Bidding & Team Management)</option>
                    <option value="coach">3. Coach / Trainer (Feedback & Attendance Tracking)</option>
                    <option value="academy">4. Academy Owner / Manager (Students, Accounts & Staff)</option>
                    <option value="ground">5. Ground / Stadium Owner & Manager (Bookings, Leases & Finance)</option>
                    <option value="staff">6. Staff Member (Role-based, Attendance & Payroll)</option>
                    <option value="organizer">7. Tournament Organizer (Tournaments & Ticketing)</option>
                    <option value="seller">8. Seller / Manufacturer / Brand (KYC, Storefronts & Settlement)</option>
                    <option value="sponsor">9. Sponsor / Advertiser / Local Business (Sponsorships & Ads)</option>
                    <option value="admin">10. Platform Super Admin (Approvals, Fraud & E-Paper)</option>
                  </select>
                </label>

                {/* Role Briefing Summary */}
                <div
                  className="sh-role-summary-banner"
                  style={{
                    background: activeOfficialRole.accentBg,
                    border: `1px solid ${activeOfficialRole.color}55`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="sh-role-indicator-badge" style={{ color: activeOfficialRole.color }}>
                      {activeOfficialRole.badge}
                    </span>
                    <strong style={{ fontSize: 13, color: '#f4f7ff' }}>{activeOfficialRole.title}</strong>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--muted)', lineHeight: 1.4 }}>
                    {activeOfficialRole.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic Specific Role Fields for Officials (in Register Mode) */}
            {mode === 'register' && roleCategory === 'official' && (
              <div className="sh-dynamic-role-fields">
                {/* 1. Franchise Owner */}
                {selectedOfficialRoleId === 'franchise' && (
                  <>
                    <label className="sh-label">
                      Franchise / Team Name
                      <input
                        className="sh-input"
                        placeholder="e.g. Marina Coastal Kings"
                        required
                        value={roleDetails.franchiseName}
                        onChange={(e) => updateRoleDetail('franchiseName', e.target.value)}
                      />
                    </label>
                    <div className="sh-row-split">
                      <label className="sh-label" style={{ flex: 1.4 }}>
                        Auction Purse Budget
                        <select
                          className="sh-select"
                          value={roleDetails.allocatedPurse}
                          onChange={(e) => updateRoleDetail('allocatedPurse', e.target.value)}
                        >
                          <option>₹25,00,000 (25L)</option>
                          <option>₹50,00,000 (50L)</option>
                          <option>₹1,00,00,000 (1 Cr)</option>
                          <option>₹5,00,00,000 (5 Cr)</option>
                        </select>
                      </label>
                      <label className="sh-label" style={{ flex: 1 }}>
                        Paddle Number
                        <input
                          className="sh-input"
                          placeholder="#04"
                          value={roleDetails.paddleNumber}
                          onChange={(e) => updateRoleDetail('paddleNumber', e.target.value)}
                        />
                      </label>
                    </div>
                  </>
                )}

                {/* 2. Coach / Trainer */}
                {selectedOfficialRoleId === 'coach' && (
                  <>
                    <label className="sh-label">
                      Coaching Specialization
                      <select
                        className="sh-select"
                        value={roleDetails.coachSpecialization}
                        onChange={(e) => updateRoleDetail('coachSpecialization', e.target.value)}
                      >
                        <option>Head Coach / All-Round</option>
                        <option>Batting Masterclass</option>
                        <option>Fast Bowling Specialist</option>
                        <option>Spin Bowling Master</option>
                        <option>Strength & Conditioning (S&C)</option>
                      </select>
                    </label>
                    <div className="sh-row-split">
                      <label className="sh-label" style={{ flex: 1.3 }}>
                        Certification / License
                        <select
                          className="sh-select"
                          value={roleDetails.licenseLevel}
                          onChange={(e) => updateRoleDetail('licenseLevel', e.target.value)}
                        >
                          <option>BCCI / ICC Level 2</option>
                          <option>BCCI / ICC Level 1</option>
                          <option>State Sports Board Certified</option>
                          <option>Academy Coach</option>
                        </select>
                      </label>
                      <label className="sh-label" style={{ flex: 1 }}>
                        Experience
                        <input
                          type="number"
                          className="sh-input"
                          placeholder="8 Yrs"
                          value={roleDetails.yearsExperience}
                          onChange={(e) => updateRoleDetail('yearsExperience', e.target.value)}
                        />
                      </label>
                    </div>
                    <label className="sh-label">
                      Affiliated Academy / Club
                      <input
                        className="sh-input"
                        placeholder="e.g. Apex High-Performance Center"
                        value={roleDetails.academyAffiliation}
                        onChange={(e) => updateRoleDetail('academyAffiliation', e.target.value)}
                      />
                    </label>
                  </>
                )}

                {/* 3. Academy Owner */}
                {selectedOfficialRoleId === 'academy' && (
                  <>
                    <label className="sh-label">
                      Academy Name
                      <input
                        className="sh-input"
                        placeholder="e.g. Champions Cricket Academy"
                        required
                        value={roleDetails.academyOwnerName}
                        onChange={(e) => updateRoleDetail('academyOwnerName', e.target.value)}
                      />
                    </label>
                    <div className="sh-row-split">
                      <label className="sh-label" style={{ flex: 1 }}>
                        Registration / Board No.
                        <input
                          className="sh-input"
                          placeholder="TN-SPO-2023-771"
                          value={roleDetails.regNumber}
                          onChange={(e) => updateRoleDetail('regNumber', e.target.value)}
                        />
                      </label>
                      <label className="sh-label" style={{ flex: 1 }}>
                        Student Capacity
                        <select
                          className="sh-select"
                          value={roleDetails.studentCapacity}
                          onChange={(e) => updateRoleDetail('studentCapacity', e.target.value)}
                        >
                          <option>Under 50</option>
                          <option>50 - 150</option>
                          <option>150 - 500</option>
                          <option>500+ Campus</option>
                        </select>
                      </label>
                    </div>
                  </>
                )}

                {/* 4. Ground / Stadium Owner */}
                {selectedOfficialRoleId === 'ground' && (
                  <>
                    <label className="sh-label">
                      Stadium / Ground Name
                      <input
                        className="sh-input"
                        placeholder="e.g. Marina International Arena"
                        required
                        value={roleDetails.venueName}
                        onChange={(e) => updateRoleDetail('venueName', e.target.value)}
                      />
                    </label>
                    <div className="sh-row-split">
                      <label className="sh-label" style={{ flex: 1.2 }}>
                        Turf / Pitch Type
                        <select
                          className="sh-select"
                          value={roleDetails.turfType}
                          onChange={(e) => updateRoleDetail('turfType', e.target.value)}
                        >
                          <option>Natural Red Soil Turf</option>
                          <option>Natural Black Soil Turf</option>
                          <option>Synthetic Astroturf</option>
                          <option>Multi-Pitch Complex</option>
                        </select>
                      </label>
                      <label className="sh-label" style={{ flex: 1 }}>
                        Hourly Rate
                        <input
                          className="sh-input"
                          placeholder="₹1,800"
                          value={roleDetails.hourlyRate}
                          onChange={(e) => updateRoleDetail('hourlyRate', e.target.value)}
                        />
                      </label>
                    </div>
                  </>
                )}

                {/* 5. Staff */}
                {selectedOfficialRoleId === 'staff' && (
                  <>
                    <label className="sh-label">
                      Staff Capacity / Role
                      <select
                        className="sh-select"
                        value={roleDetails.staffRole}
                        onChange={(e) => updateRoleDetail('staffRole', e.target.value)}
                      >
                        <option>Official Match Scorer</option>
                        <option>Certified Field Umpire</option>
                        <option>Groundskeeper & Pitch Curator</option>
                        <option>Sports Physio & Medical</option>
                        <option>Security & Gate Operations</option>
                      </select>
                    </label>
                    <div className="sh-row-split">
                      <label className="sh-label" style={{ flex: 1 }}>
                        Staff ID
                        <input
                          className="sh-input"
                          placeholder="SH-STF-088"
                          value={roleDetails.staffId}
                          onChange={(e) => updateRoleDetail('staffId', e.target.value)}
                        />
                      </label>
                      <label className="sh-label" style={{ flex: 1.2 }}>
                        Shift Schedule
                        <select
                          className="sh-select"
                          value={roleDetails.shiftType}
                          onChange={(e) => updateRoleDetail('shiftType', e.target.value)}
                        >
                          <option>Morning (6 AM - 2 PM)</option>
                          <option>Day (2 PM - 10 PM)</option>
                          <option>Tournament Full-Day</option>
                        </select>
                      </label>
                    </div>
                  </>
                )}

                {/* 6. Tournament Organizer */}
                {selectedOfficialRoleId === 'organizer' && (
                  <>
                    <label className="sh-label">
                      Organization / League Name
                      <input
                        className="sh-input"
                        placeholder="e.g. South Zone Cricket Federation"
                        required
                        value={roleDetails.orgName}
                        onChange={(e) => updateRoleDetail('orgName', e.target.value)}
                      />
                    </label>
                    <div className="sh-row-split">
                      <label className="sh-label" style={{ flex: 1 }}>
                        Sanction ID
                        <input
                          className="sh-input"
                          placeholder="SAN-2024-CC"
                          value={roleDetails.sanctionNumber}
                          onChange={(e) => updateRoleDetail('sanctionNumber', e.target.value)}
                        />
                      </label>
                      <label className="sh-label" style={{ flex: 1.2 }}>
                        Tournament Scale
                        <select
                          className="sh-select"
                          value={roleDetails.tournamentScale}
                          onChange={(e) => updateRoleDetail('tournamentScale', e.target.value)}
                        >
                          <option>City League (8-16 Teams)</option>
                          <option>State Cup (32+ Teams)</option>
                          <option>Academy Knockout</option>
                        </select>
                      </label>
                    </div>
                  </>
                )}

                {/* 7. Seller / Manufacturer / Brand */}
                {selectedOfficialRoleId === 'seller' && (
                  <>
                    <label className="sh-label">
                      Brand / Storefront Name
                      <input
                        className="sh-input"
                        placeholder="e.g. Apex Willow & Pro Gear Co."
                        required
                        value={roleDetails.businessName}
                        onChange={(e) => updateRoleDetail('businessName', e.target.value)}
                      />
                    </label>
                    <div className="sh-row-split">
                      <label className="sh-label" style={{ flex: 1.2 }}>
                        GSTIN / Tax ID
                        <input
                          className="sh-input"
                          placeholder="09AAACA1234F1Z8"
                          required
                          value={roleDetails.gstNumber}
                          onChange={(e) => updateRoleDetail('gstNumber', e.target.value)}
                        />
                      </label>
                      <label className="sh-label" style={{ flex: 1 }}>
                        KYC Proof Type
                        <select
                          className="sh-select"
                          value={roleDetails.kycDocType}
                          onChange={(e) => updateRoleDetail('kycDocType', e.target.value)}
                        >
                          <option>GST Certificate</option>
                          <option>Udyam MSME</option>
                          <option>Trade License</option>
                        </select>
                      </label>
                    </div>
                  </>
                )}

                {/* 8. Sponsor / Advertiser */}
                {selectedOfficialRoleId === 'sponsor' && (
                  <>
                    <label className="sh-label">
                      Company / Brand Name
                      <input
                        className="sh-input"
                        placeholder="e.g. Velocity Sports Nutrition"
                        required
                        value={roleDetails.companyName}
                        onChange={(e) => updateRoleDetail('companyName', e.target.value)}
                      />
                    </label>
                    <div className="sh-row-split">
                      <label className="sh-label" style={{ flex: 1 }}>
                        Industry
                        <select
                          className="sh-select"
                          value={roleDetails.marketingCategory}
                          onChange={(e) => updateRoleDetail('marketingCategory', e.target.value)}
                        >
                          <option>Sports Nutrition</option>
                          <option>Automobile / EV</option>
                          <option>EdTech / App</option>
                          <option>Local Retail</option>
                        </select>
                      </label>
                      <label className="sh-label" style={{ flex: 1.2 }}>
                        Quarterly Ad Budget
                        <select
                          className="sh-select"
                          value={roleDetails.campaignBudget}
                          onChange={(e) => updateRoleDetail('campaignBudget', e.target.value)}
                        >
                          <option>₹50k - ₹2L</option>
                          <option>₹2L - ₹10L</option>
                          <option>₹10L+ Title</option>
                        </select>
                      </label>
                    </div>
                  </>
                )}

                {/* 9. Fan / Viewer */}
                {selectedOfficialRoleId === 'fan' && (
                  <>
                    <label className="sh-label">
                      Favorite Team / Club
                      <input
                        className="sh-input"
                        placeholder="e.g. Scoring XI & CSK"
                        value={roleDetails.favTeam}
                        onChange={(e) => updateRoleDetail('favTeam', e.target.value)}
                      />
                    </label>
                    <label className="sh-label">
                      Super 11 Squad Name
                      <input
                        className="sh-input"
                        placeholder="e.g. Marina Blasters XI"
                        value={roleDetails.fantasyClub}
                        onChange={(e) => updateRoleDetail('fantasyClub', e.target.value)}
                      />
                    </label>
                  </>
                )}

                {/* 10. Platform Super Admin */}
                {selectedOfficialRoleId === 'admin' && (
                  <>
                    <label className="sh-label">
                      Admin Security Clearance Passkey
                      <input
                        type="password"
                        className="sh-input"
                        placeholder="ADMIN-2026-ROOT"
                        value={roleDetails.adminCode}
                        onChange={(e) => updateRoleDetail('adminCode', e.target.value)}
                      />
                    </label>
                    <label className="sh-label">
                      Governance Department
                      <select
                        className="sh-select"
                        value={roleDetails.department}
                        onChange={(e) => updateRoleDetail('department', e.target.value)}
                      >
                        <option>Platform Integrity & Anti-Fraud</option>
                        <option>KYC & Legal Verification Desk</option>
                        <option>Editorial Bureau (Sports E-Paper)</option>
                        <option>Officials & Scorer Accreditation</option>
                      </select>
                    </label>
                  </>
                )}
              </div>
            )}

            {/* Dynamic Specific Role Fields for Player (in Register Mode) */}
            {mode === 'register' && roleCategory === 'player' && (
              <div className="sh-dynamic-role-fields">
                <div className="sh-row-split">
                  <label className="sh-label" style={{ flex: 1.2 }}>
                    Cricket Playing Role
                    <select
                      className="sh-select"
                      value={roleDetails.playingRole}
                      onChange={(e) => updateRoleDetail('playingRole', e.target.value)}
                    >
                      <option>All-rounder</option>
                      <option>Batsman</option>
                      <option>Fast Bowler</option>
                      <option>Spin Bowler</option>
                      <option>Wicketkeeper</option>
                    </select>
                  </label>
                  <label className="sh-label" style={{ flex: 1 }}>
                    Batting Style
                    <select
                      className="sh-select"
                      value={roleDetails.battingStyle}
                      onChange={(e) => updateRoleDetail('battingStyle', e.target.value)}
                    >
                      <option>Right Hand Bat</option>
                      <option>Left Hand Bat</option>
                    </select>
                  </label>
                </div>

                <label className="sh-ck-label" style={{ margin: '4px 0 8px' }}>
                  <input
                    type="checkbox"
                    checked={roleDetails.academyStudent}
                    onChange={(e) => updateRoleDetail('academyStudent', e.target.checked)}
                  />
                  <span>Enrolled as an Academy / Club Student</span>
                </label>

                {roleDetails.academyStudent && (
                  <label className="sh-label">
                    Academy / School Name
                    <input
                      className="sh-input"
                      placeholder="e.g. Marina Titans Cricket Academy"
                      value={roleDetails.academyName}
                      onChange={(e) => updateRoleDetail('academyName', e.target.value)}
                    />
                  </label>
                )}
              </div>
            )}

            {/* Common User Profile Fields (in Register Mode) */}
            {mode === 'register' && (
              <>
                <label className="sh-label">
                  {roleCategory === 'player' ? 'Athlete Public Nickname' : 'Representative / Profile Name'}
                  <input
                    name="nickname"
                    required
                    minLength={3}
                    maxLength={30}
                    placeholder={roleCategory === 'player' ? 'Rohit_45' : 'Official_Name'}
                    className="sh-input"
                    value={draft.nickname}
                    onChange={(e) => updateDraft({ nickname: e.target.value })}
                  />
                  <span className="sh-field-hint">
                    {roleCategory === 'player'
                      ? 'Visible on scorecards, leaderboards and auctions.'
                      : 'Used for official approvals and verification certificates.'}
                  </span>
                </label>

                <div className="sh-row-split">
                  <label className="sh-label" style={{ flex: 1 }}>
                    {t('age')}
                    <input
                      type="number"
                      name="age"
                      min={5}
                      max={95}
                      required
                      placeholder="20"
                      className="sh-input"
                      value={draft.age}
                      onChange={(e) => updateDraft({ age: e.target.value })}
                    />
                  </label>
                  <label className="sh-label" style={{ flex: 1.4 }}>
                    {t('city')}
                    <input
                      name="city"
                      required
                      placeholder="Chennai"
                      className="sh-input"
                      value={draft.city}
                      onChange={(e) => updateDraft({ city: e.target.value })}
                    />
                  </label>
                </div>

                <label className="sh-label">
                  Official Email (Confidential)
                  <input
                    type="email"
                    name="email"
                    placeholder="contact@sports.com"
                    className="sh-input"
                    value={draft.email}
                    onChange={(e) => updateDraft({ email: e.target.value })}
                  />
                </label>
              </>
            )}

            {/* Worldwide Mobile Number with Country Code Picker */}
            <label className="sh-label">
              {t('mobile_number')}
              <div className="sh-phone-input-group">
                <CountryCodePicker value={phoneCode} onChange={setPhoneCode} />
                <input
                  name="phone"
                  inputMode="tel"
                  required
                  placeholder="98765 43210"
                  className="sh-input sh-phone-input"
                  value={draft.phone}
                  onChange={(e) => updateDraft({ phone: e.target.value })}
                />
              </div>
              <span className="sh-field-hint">
                Worldwide country codes supported. Test demo OTP code is <strong>1234</strong>.
              </span>
            </label>

            {/* Terms checkbox */}
            {mode === 'register' && (
              <label className="sh-ck-label">
                <input
                  type="checkbox"
                  name="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>{t('terms_agree')}</span>
              </label>
            )}

            {/* Error Message */}
            {error && <p className="error" style={{ margin: '4px 0' }}>{error}</p>}

            {/* Submit Button */}
            <button className="sh-btn-submit" type="submit">
              {mode === 'login'
                ? `Send OTP for ${roleCategory === 'player' ? 'Player' : activeOfficialRole.short} →`
                : `Create ${roleCategory === 'player' ? 'Player' : activeOfficialRole.short} Account →`}
            </button>
          </form>

          {/* 1-Tap Guest Access Directly for this Role (NO MODAL) */}
          <div className="sh-auth-divider">
            <span>OR GUEST MODE</span>
          </div>

          <button
            type="button"
            className="sh-guest-btn"
            style={{ width: '100%' }}
            onClick={handleDirectGuest}
          >
            <Zap size={16} color="#ffd600" />
            <span>
              Instant Guest Login as {roleCategory === 'player' ? 'Player' : activeOfficialRole.short}
            </span>
          </button>
        </div>
      </div>
    </Screen>
  )
}
