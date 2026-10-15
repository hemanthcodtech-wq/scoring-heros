import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GraduationCap,
  Award,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Target,
  FileText,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Flame,
  Clock,
  Dumbbell,
  Users,
  CreditCard,
  Building,
  BarChart3,
  Check,
  AlertCircle,
  Share2,
} from 'lucide-react'
import Screen from '../components/Screen'
import { useAuth } from '../context/AuthContext'

export default function AcademyCareer() {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Top Mode: 'operations' (The 10 Feature 12 Management Systems) vs 'pathway' (Student Career Ladder)
  const [mainView, setMainView] = useState('operations') // 'operations' | 'pathway'

  // Current Operations System: 1 to 10
  const [activeSystem, setActiveSystem] = useState(1)
  const [saveToast, setSaveToast] = useState('')

  // System 1: Student Registration Form State
  const [studentForm, setStudentForm] = useState({
    name: 'Arjun Verma',
    ageGroup: 'U-16',
    role: 'All-Rounder',
    batch: 'Morning A',
  })

  // System 2: Student Attendance State
  const [studentAttendance, setStudentAttendance] = useState([
    { id: 1, name: 'Arjun Verma', present: true },
    { id: 2, name: 'Rahul Sharma', present: true },
    { id: 3, name: 'Ashish KP', present: true },
    { id: 4, name: 'Karan Singh', present: false },
    { id: 5, name: 'Mohit Rao', present: true },
    { id: 6, name: 'Divya Patel', present: true },
    { id: 7, name: 'Sai Teja', present: true },
  ])

  // System 3: Coach Attendance State
  const [coachAttendance, setCoachAttendance] = useState([
    { id: 1, name: 'Arjun Verma', role: 'Head Coach', present: true },
    { id: 2, name: 'Rahul Sharma', role: 'Bowling Coach', present: true },
    { id: 3, name: 'Ashish KP', role: 'Batting Coach', present: true },
    { id: 4, name: 'Karan Singh', role: 'Fielding Coach', present: false },
    { id: 5, name: 'Mohit Rao', role: 'Fitness Trainer', present: true },
  ])

  // System 6 & 7: Schedule Slots State
  const [trainingSlots, setTrainingSlots] = useState([
    { id: 1, time: '06:00', title: 'Fitness', ground: 'Pitch 1', booked: true },
    { id: 2, time: '07:00', title: 'Batting Nets', ground: 'Nets A & B', booked: true },
    { id: 3, time: '08:00', title: 'Bowling Skills', ground: 'Main Ground', booked: true },
    { id: 4, time: '16:30', title: 'Match Practice', ground: 'Center Turf', booked: true },
  ])

  // System 8: Accounts State
  const [accounts, setAccounts] = useState({
    monthlyCollection: 246500,
    paidStudents: 184,
    pendingFees: 38000,
    transportFees: 22500,
    receiptsIssued: 176,
  })

  // System 9: Staff Form State
  const [staffForm, setStaffForm] = useState({
    name: 'Arjun Verma',
    role: 'Head Coach',
    batch: 'Morning A',
    access: 'Admin & Scorer',
  })

  // Helper to trigger save toast
  const triggerSave = (msg) => {
    setSaveToast(msg || 'Academy record saved & synchronized!')
    setTimeout(() => setSaveToast(''), 3000)
  }

  // Count present students
  const presentCount = studentAttendance.filter((s) => s.present).length
  const totalStudents = studentAttendance.length + 45 // 48/52 matching reference

  // Count present coaches
  const presentCoachCount = coachAttendance.filter((c) => c.present).length

  // System Names for Ribbon and Headers (Clean Product Names without blueprint 'FEATURE' tags)
  const systemsMeta = [
    { id: 1, title: 'Student / Player Registration', short: 'Player Registration' },
    { id: 2, title: 'Student Attendance Tracking', short: 'Student Attendance' },
    { id: 3, title: 'Coach Attendance & Activity', short: 'Coach Attendance' },
    { id: 4, title: 'Performance Tracking', short: 'Performance' },
    { id: 5, title: 'Behaviour & Discipline Monitoring', short: 'Discipline' },
    { id: 6, title: 'Training Program Management', short: 'Training Plan' },
    { id: 7, title: 'Ground Slot Allocation', short: 'Ground Slots' },
    { id: 8, title: 'Accounts & Fee Management', short: 'Accounts & Fees' },
    { id: 9, title: 'Staff Management', short: 'Staff Management' },
    { id: 10, title: 'Reports & Analytics', short: 'Reports & Analytics' },
  ]

  const curSystem = systemsMeta.find((s) => s.id === activeSystem) || systemsMeta[0]

  return (
    <Screen
      back
      title="Academy Management"
      subtitle="Operations & Player Development"
    >
      <div className="academy-ops-container">
        {/* Main Mode Toggle: Operations (10 Systems) vs Player Pathway */}
        <div className="sh-seg" style={{ marginBottom: 4 }}>
          <button
            type="button"
            className={`sh-seg-btn ${mainView === 'operations' ? 'is-active' : ''}`}
            onClick={() => setMainView('operations')}
          >
            ⚡ Academy Operations (10 Systems)
          </button>
          <button
            type="button"
            className={`sh-seg-btn ${mainView === 'pathway' ? 'is-active' : ''}`}
            onClick={() => setMainView('pathway')}
          >
            🏏 Player Pathway & Drills
          </button>
        </div>

        {saveToast && (
          <div className="match-tools-toast" style={{ margin: '0 0 6px' }}>
            <CheckCircle2 size={16} color="#00e676" />
            <span>{saveToast}</span>
          </div>
        )}

        {/* =========================================================
            OPERATIONS VIEW: 10 BLUEPRINT SCREENS
            ========================================================= */}
        {mainView === 'operations' && (
          <>
            {/* 10-System Selector Ribbon */}
            <div className="academy-ops-ribbon">
              {systemsMeta.map((sys) => (
                <button
                  key={sys.id}
                  type="button"
                  className={`ops-ribbon-btn ${activeSystem === sys.id ? 'is-active' : ''}`}
                  onClick={() => setActiveSystem(sys.id)}
                >
                  <span className="ops-num-badge">{sys.id}</span>
                  <span>{sys.short}</span>
                </button>
              ))}
            </div>

            {/* Authentic Mobile Screen Frame */}
            <div className="academy-phone-screen">
              {/* Top Bar inside Screen */}
              <div className="phone-top-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, #ff3b50, #b0211a)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#fff',
                      fontWeight: 900,
                      fontSize: 13,
                    }}
                  >
                    {activeSystem}
                  </div>
                  <div>
                    <h2 className="phone-system-title">{curSystem.title}</h2>
                    <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>
                      Scoring Heroes Academy Operations
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    className="icon-btn"
                    style={{ width: 32, height: 32 }}
                    disabled={activeSystem === 1}
                    onClick={() => setActiveSystem((s) => Math.max(1, s - 1))}
                    title="Previous system"
                  >
                    ‹
                  </button>
                  <button
                    className="icon-btn"
                    style={{ width: 32, height: 32 }}
                    disabled={activeSystem === 10}
                    onClick={() => setActiveSystem((s) => Math.min(10, s + 1))}
                    title="Next system"
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* SCREEN 1: Student / Player Registration System */}
              {activeSystem === 1 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Student / Player Registration</h3>

                  <div className="ops-input-group">
                    <span className="ops-label">Player Name</span>
                    <input
                      className="ops-input"
                      value={studentForm.name}
                      onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                      placeholder="Arjun Verma"
                    />
                  </div>

                  <div className="ops-input-group">
                    <span className="ops-label">Age Group</span>
                    <select
                      className="ops-input"
                      value={studentForm.ageGroup}
                      onChange={(e) => setStudentForm({ ...studentForm, ageGroup: e.target.value })}
                    >
                      <option value="U-12">U-12</option>
                      <option value="U-14">U-14</option>
                      <option value="U-16">U-16</option>
                      <option value="U-19">U-19</option>
                      <option value="Senior">Senior</option>
                    </select>
                  </div>

                  <div className="ops-input-group">
                    <span className="ops-label">Role</span>
                    <select
                      className="ops-input"
                      value={studentForm.role}
                      onChange={(e) => setStudentForm({ ...studentForm, role: e.target.value })}
                    >
                      <option value="All-Rounder">All-Rounder</option>
                      <option value="Batsman">Batsman</option>
                      <option value="Fast Bowler">Fast Bowler</option>
                      <option value="Spin Bowler">Spin Bowler</option>
                      <option value="Wicketkeeper">Wicketkeeper</option>
                    </select>
                  </div>

                  <div className="ops-input-group">
                    <span className="ops-label">Batch</span>
                    <select
                      className="ops-input"
                      value={studentForm.batch}
                      onChange={(e) => setStudentForm({ ...studentForm, batch: e.target.value })}
                    >
                      <option value="Morning A">Morning A</option>
                      <option value="Morning B">Morning B</option>
                      <option value="Evening Elite">Evening Elite</option>
                      <option value="Weekend Pro">Weekend Pro</option>
                    </select>
                  </div>

                  <div className="ops-verified-shield-row">
                    <ShieldCheck size={20} color="#00e676" />
                    <span>Aadhaar Identity & Academy Roster Verified</span>
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave(`Registration record saved for ${studentForm.name} (${studentForm.ageGroup})!`)}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 2: Student Attendance Tracking System */}
              {activeSystem === 2 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Student Attendance</h3>

                  <div className="ops-gold-banner">
                    <span>TODAY • 48 / 52 PRESENT</span>
                  </div>

                  <div className="ops-item-list">
                    {studentAttendance.map((st) => (
                      <div key={st.id} className="ops-item-row">
                        <span className="ops-item-name">{st.name}</span>
                        <button
                          type="button"
                          className={`ops-pill-btn ${st.present ? 'is-present' : 'is-absent'}`}
                          onClick={() => {
                            setStudentAttendance((list) =>
                              list.map((item) => (item.id === st.id ? { ...item, present: !item.present } : item))
                            )
                          }}
                        >
                          {st.present ? 'PRESENT' : 'ABSENT'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave('Student attendance roster successfully committed to state log!')}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 3: Coach Attendance & Activity System */}
              {activeSystem === 3 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Coach Attendance & Activity</h3>

                  <div className="ops-gold-banner">
                    <span>TODAY • 48 / 52 PRESENT (COACHES & STAFF)</span>
                  </div>

                  <div className="ops-item-list">
                    {coachAttendance.map((coach) => (
                      <div key={coach.id} className="ops-item-row">
                        <div>
                          <div className="ops-item-name">{coach.name}</div>
                          <div className="ops-item-sub">{coach.role}</div>
                        </div>
                        <button
                          type="button"
                          className={`ops-pill-btn ${coach.present ? 'is-present' : 'is-absent'}`}
                          onClick={() => {
                            setCoachAttendance((list) =>
                              list.map((item) => (item.id === coach.id ? { ...item, present: !item.present } : item))
                            )
                          }}
                        >
                          {coach.present ? 'PRESENT' : 'ABSENT'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave('Coach attendance and shift log synced!')}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 4: Performance Tracking System */}
              {activeSystem === 4 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Performance</h3>

                  <div className="ops-gold-banner">
                    <span>ACADEMY PERFORMANCE</span>
                  </div>

                  <div className="ops-perf-stat-row">
                    <div className="ops-perf-stat-card">
                      <div className="ops-perf-stat-num">52</div>
                      <div className="ops-perf-stat-lbl">PLAYERS</div>
                    </div>
                    <div className="ops-perf-stat-card">
                      <div className="ops-perf-stat-num" style={{ color: '#00e676' }}>86%</div>
                      <div className="ops-perf-stat-lbl">ATTENDANCE</div>
                    </div>
                    <div className="ops-perf-stat-card">
                      <div className="ops-perf-stat-num" style={{ color: '#3de0ff' }}>14</div>
                      <div className="ops-perf-stat-lbl">MATCHES</div>
                    </div>
                  </div>

                  {/* Performance Curve SVG */}
                  <div className="ops-chart-box">
                    <svg viewBox="0 0 240 70" width="100%" height="70">
                      <defs>
                        <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3de0ff" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3de0ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 10 55 Q 60 45, 100 35 T 180 20 T 230 10 L 230 65 L 10 65 Z"
                        fill="url(#curveGrad)"
                      />
                      <path
                        d="M 10 55 Q 60 45, 100 35 T 180 20 T 230 10"
                        fill="none"
                        stroke="#3de0ff"
                        strokeWidth="2.5"
                      />
                      <circle cx="10" cy="55" r="3.5" fill="#3de0ff" />
                      <circle cx="100" cy="35" r="3.5" fill="#3de0ff" />
                      <circle cx="180" cy="20" r="3.5" fill="#3de0ff" />
                      <circle cx="230" cy="10" r="4.5" fill="#00e676" />
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#ffc83d', letterSpacing: 0.8 }}>
                      MONTHLY REPORT READY
                    </span>
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave('Monthly performance metrics exported & saved!')}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 5: Behaviour & Discipline Monitoring System */}
              {activeSystem === 5 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Behaviour & Discipline Monitoring</h3>

                  <div className="ops-input-group">
                    <span className="ops-label">Player Name</span>
                    <input className="ops-input" readOnly value="Arjun Verma" />
                  </div>

                  <div className="ops-row-split">
                    <div className="ops-input-group" style={{ flex: 1 }}>
                      <span className="ops-label">Age Group</span>
                      <input className="ops-input" readOnly value="U-16" />
                    </div>
                    <div className="ops-input-group" style={{ flex: 1 }}>
                      <span className="ops-label">Batch</span>
                      <input className="ops-input" readOnly value="Morning A" />
                    </div>
                  </div>

                  <div className="ops-item-list">
                    <div className="ops-item-row">
                      <span className="ops-item-name">Punctuality & Timeliness</span>
                      <span style={{ color: '#00e676', fontWeight: 800 }}>95% (Good)</span>
                    </div>
                    <div className="ops-item-row">
                      <span className="ops-item-name">Teamwork & Comradery</span>
                      <span style={{ color: '#3de0ff', fontWeight: 800 }}>92% (High)</span>
                    </div>
                    <div className="ops-item-row">
                      <span className="ops-item-name">Fairplay & Code of Conduct</span>
                      <span style={{ color: '#ffc83d', fontWeight: 800 }}>Zero Sanctions</span>
                    </div>
                  </div>

                  <div className="ops-verified-shield-row">
                    <ShieldCheck size={20} color="#00e676" />
                    <span>Discipline Benchmark Level A — Clean Track Record</span>
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave('Discipline record updated with zero sanctions!')}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 6: Training Program Management System */}
              {activeSystem === 6 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Training Program</h3>

                  <div className="ops-gold-banner">
                    <span>TRAINING PLAN</span>
                  </div>

                  <div className="ops-item-list">
                    {trainingSlots.map((slot) => (
                      <div key={slot.id} className="ops-item-row">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <strong style={{ fontFamily: 'monospace', color: '#ffc83d', fontSize: 13 }}>
                            {slot.time}
                          </strong>
                          <span className="ops-item-name">{slot.title}</span>
                        </div>
                        <button
                          type="button"
                          className="ops-pill-btn is-booked"
                          onClick={() => {
                            setTrainingSlots((slots) =>
                              slots.map((s) => (s.id === slot.id ? { ...s, booked: !s.booked } : s))
                            )
                          }}
                        >
                          {slot.booked ? 'BOOKED' : 'OPEN'}
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave('Training plan syllabus synchronized across academy batches!')}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 7: Ground Slot Allocation System */}
              {activeSystem === 7 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Ground Slot Allocation</h3>

                  <div className="ops-gold-banner">
                    <span>TRAINING PLAN</span>
                  </div>

                  <div className="ops-item-list">
                    {trainingSlots.map((slot) => (
                      <div key={slot.id} className="ops-item-row">
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <strong style={{ fontFamily: 'monospace', color: '#ffc83d', fontSize: 13 }}>
                              {slot.time}
                            </strong>
                            <span className="ops-item-name">{slot.title}</span>
                          </div>
                          <span className="ops-item-sub">Allocated: {slot.ground}</span>
                        </div>
                        <span className="ops-pill-btn is-booked">BOOKED</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave('Ground and pitch slot allocations reserved & confirmed!')}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 8: Accounts & Fee Management System */}
              {activeSystem === 8 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Accounts & Fee</h3>

                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--muted)', letterSpacing: 0.8 }}>
                      MONTHLY COLLECTION
                    </span>
                    <div className="ops-big-currency">
                      ₹ {accounts.monthlyCollection.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="ops-financial-grid">
                    <div className="ops-fin-row">
                      <span className="ops-fin-label">Paid students</span>
                      <span className="ops-fin-val">{accounts.paidStudents}</span>
                    </div>
                    <div className="ops-fin-row">
                      <span className="ops-fin-label">Pending fees</span>
                      <span className="ops-fin-val is-red">₹ {accounts.pendingFees.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="ops-fin-row">
                      <span className="ops-fin-label">Transport fees</span>
                      <span className="ops-fin-val">₹ {accounts.transportFees.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="ops-fin-row">
                      <span className="ops-fin-label">Receipts issued</span>
                      <span className="ops-fin-val">{accounts.receiptsIssued}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave('Accounts ledger & monthly fees updated successfully!')}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 9: Staff Management System */}
              {activeSystem === 9 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Staff</h3>

                  <div className="ops-input-group">
                    <span className="ops-label">Staff Name</span>
                    <input
                      className="ops-input"
                      value={staffForm.name}
                      onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    />
                  </div>

                  <div className="ops-input-group">
                    <span className="ops-label">Role</span>
                    <input
                      className="ops-input"
                      value={staffForm.role}
                      onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    />
                  </div>

                  <div className="ops-row-split">
                    <div className="ops-input-group" style={{ flex: 1 }}>
                      <span className="ops-label">Assigned Batch</span>
                      <input
                        className="ops-input"
                        value={staffForm.batch}
                        onChange={(e) => setStaffForm({ ...staffForm, batch: e.target.value })}
                      />
                    </div>
                    <div className="ops-input-group" style={{ flex: 1 }}>
                      <span className="ops-label">Permissions</span>
                      <input
                        className="ops-input"
                        value={staffForm.access}
                        onChange={(e) => setStaffForm({ ...staffForm, access: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="ops-verified-shield-row">
                    <ShieldCheck size={20} color="#00e676" />
                    <span>State Cricket Board Certified Staff Member</span>
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave(`Staff profile for ${staffForm.name} saved!`)}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}

              {/* SCREEN 10: Reports & Analytics System */}
              {activeSystem === 10 && (
                <div className="ops-inner-card">
                  <h3 className="ops-inner-card-title">Reports & Analytics</h3>

                  <div className="ops-gold-banner">
                    <span>ACADEMY PERFORMANCE</span>
                  </div>

                  <div className="ops-perf-stat-row">
                    <div className="ops-perf-stat-card">
                      <div className="ops-perf-stat-num">52</div>
                      <div className="ops-perf-stat-lbl">PLAYERS</div>
                    </div>
                    <div className="ops-perf-stat-card">
                      <div className="ops-perf-stat-num" style={{ color: '#00e676' }}>86%</div>
                      <div className="ops-perf-stat-lbl">ATTENDANCE</div>
                    </div>
                    <div className="ops-perf-stat-card">
                      <div className="ops-perf-stat-num" style={{ color: '#3de0ff' }}>14</div>
                      <div className="ops-perf-stat-lbl">MATCHES</div>
                    </div>
                  </div>

                  <div className="ops-chart-box">
                    <svg viewBox="0 0 240 70" width="100%" height="70">
                      <defs>
                        <linearGradient id="curveGrad10" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3de0ff" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#3de0ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 10 55 Q 60 45, 100 35 T 180 20 T 230 10 L 230 65 L 10 65 Z"
                        fill="url(#curveGrad10)"
                      />
                      <path
                        d="M 10 55 Q 60 45, 100 35 T 180 20 T 230 10"
                        fill="none"
                        stroke="#3de0ff"
                        strokeWidth="2.5"
                      />
                      <circle cx="10" cy="55" r="3.5" fill="#3de0ff" />
                      <circle cx="100" cy="35" r="3.5" fill="#3de0ff" />
                      <circle cx="180" cy="20" r="3.5" fill="#3de0ff" />
                      <circle cx="230" cy="10" r="4.5" fill="#00e676" />
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#ffc83d', letterSpacing: 0.8 }}>
                      MONTHLY REPORT READY
                    </span>
                  </div>

                  <button
                    type="button"
                    className="ops-save-record-btn"
                    onClick={() => triggerSave('Full academy analytics PDF generated and downloaded!')}
                  >
                    SAVE ACADEMY RECORD
                  </button>
                </div>
              )}
            </div>

            {/* 10 Operations Systems Overview Grid */}
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#ffc83d', letterSpacing: 0.8 }}>
                  ACADEMY OPERATIONS DIRECTORY
                </span>
                <span className="pill" style={{ fontSize: 9 }}>10 SYSTEMS</span>
              </div>

              <div className="ops-overview-10-grid">
                {systemsMeta.map((sys) => (
                  <button
                    key={sys.id}
                    type="button"
                    className="ops-overview-tile"
                    style={activeSystem === sys.id ? { borderColor: '#ff3b50', background: '#12266a' } : {}}
                    onClick={() => {
                      setActiveSystem(sys.id)
                      window.scrollTo({ top: 120, behavior: 'smooth' })
                    }}
                  >
                    <div className={`ops-overview-num-pill ${sys.id % 2 === 0 ? 'is-blue' : ''}`}>
                      {sys.id}
                    </div>
                    <span className="ops-overview-text">{sys.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* =========================================================
            PATHWAY & DRILLS VIEW
            ========================================================= */}
        {mainView === 'pathway' && (
          <div className="academy-overview-view">
            <div className="academy-hero-card">
              <div className="academy-hero-top">
                <div className="academy-logo-badge">
                  <GraduationCap size={24} color="#3de0ff" />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 2px', fontSize: 16 }}>Scoring Heroes High Performance Center</h3>
                  <span className="muted-text">Affiliated State Academy • Batch 2026-A</span>
                </div>
              </div>

              <div className="academy-stats-row">
                <div className="academy-stat-box">
                  <span className="stat-label">Attendance</span>
                  <strong className="stat-val" style={{ color: '#00e676' }}>96.4%</strong>
                  <span className="stat-sub">48 / 50 sessions</span>
                </div>
                <div className="academy-stat-box">
                  <span className="stat-label">Fitness Score</span>
                  <strong className="stat-val" style={{ color: '#3de0ff' }}>Yo-Yo 19.8</strong>
                  <span className="stat-sub">Top 5% bracket</span>
                </div>
                <div className="academy-stat-box">
                  <span className="stat-label">Discipline & Trust</span>
                  <strong className="stat-val" style={{ color: '#ffb300' }}>98 / 100</strong>
                  <span className="stat-sub">Zero sanctions</span>
                </div>
              </div>
            </div>

            <div className="panel">
              <h4 style={{ margin: '0 0 12px', fontSize: 14 }}>Career Pathway Progression</h4>
              <div className="pathway-ladder">
                {[
                  { title: 'Grassroots U12', status: 'completed', academy: 'City Youth Cricket' },
                  { title: 'Sub-Junior U14', status: 'completed', academy: 'Coastal Sports Foundation' },
                  { title: 'Junior U16 Division 1', status: 'completed', academy: 'Tamil Nadu Cricket Academy' },
                  { title: 'Elite U19 Academy', status: 'current', academy: 'Scoring Heroes National Center' },
                  { title: 'Senior State / Franchise Pro', status: 'upcoming', academy: 'Super 11 Pro League' },
                ].map((st, idx) => (
                  <div key={idx} className={`pathway-step pathway-step--${st.status}`}>
                    <div className="pathway-marker">
                      {st.status === 'completed' && <CheckCircle2 size={16} color="#00e676" />}
                      {st.status === 'current' && <Flame size={16} color="#ff3b50" />}
                      {st.status === 'upcoming' && <Clock size={16} color="var(--muted)" />}
                    </div>
                    <div className="pathway-content">
                      <div className="pathway-title-row">
                        <strong>{st.title}</strong>
                        <span className={`status-pill status-pill--${st.status}`}>
                          {st.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="pathway-sub">{st.academy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel" style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <h4 style={{ margin: 0, fontSize: 14 }}>High Performance Drills</h4>
                <span className="pill">Weekly Benchmarks</span>
              </div>
              <div className="drills-list">
                {[
                  { name: 'Death Over Yorkers & Slower Balls', metric: '88% accuracy', coach: 'Coach Meera', progress: 90 },
                  { name: 'Wrist Roll & Bat Acceleration', metric: '138 km/h swing speed', coach: 'Coach Raman', progress: 82 },
                  { name: 'Match Pressure Simulation (36 off 18)', metric: '4/5 chases completed', coach: 'Head Coach Vijay', progress: 95 },
                ].map((drill, idx) => (
                  <div key={idx} className="drill-card" style={{ marginBottom: 10 }}>
                    <div className="drill-card-top">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Dumbbell size={16} color="var(--cyan)" />
                        <strong>{drill.name}</strong>
                      </div>
                      <span className="drill-pct">{drill.progress}%</span>
                    </div>
                    <div className="drill-track">
                      <div className="drill-bar" style={{ width: `${drill.progress}%` }} />
                    </div>
                    <div className="drill-footer">
                      <span>Performance: <strong>{drill.metric}</strong></span>
                      <span>Overseer: {drill.coach}</span>
                    </div>
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
