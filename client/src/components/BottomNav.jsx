import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Plus,
  Trophy,
  BarChart3,
  Shirt,
  Gavel,
  Music,
  Ticket,
  Radio,
  Calendar,
  Users,
  GraduationCap,
  ClipboardCheck,
  Shield,
  ShoppingBag,
  Megaphone,
  ShieldAlert,
  ShieldCheck,
  Award,
  Layers,
  Wrench,
  Bot,
  Video,
  Activity,
  Milestone,
  Newspaper,
  User,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Configuration of distinct bottom navigation per role (allotted features)
const ROLE_NAV_CONFIG = {
  player: {
    items: [
      { to: '/app', label: 'Player Hub', icon: Home, end: true },
      { to: '/app/stats', label: 'Career Stats', icon: BarChart3 },
    ],
    fab: { to: '/app/scorer', label: 'Live Scorer', icon: Plus },
    afterFab: [
      { to: '/app/avatar', label: '3D Avatar', icon: Shirt },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  fan: {
    items: [
      { to: '/app', label: 'Fan Zone', icon: Home, end: true },
      { to: '/app/super11', label: 'Super 11', icon: Trophy },
    ],
    fab: { to: '/app/commentary', label: 'Live Audio', icon: Radio },
    afterFab: [
      { to: '/app/entertainment', label: 'Fan Arena', icon: Music },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  franchise: {
    items: [
      { to: '/app', label: 'Franchise', icon: Home, end: true },
      { to: '/app/auction', label: 'War Room', icon: Gavel },
    ],
    fab: { to: '/app/aimatch', label: 'Simulate XI', icon: Bot },
    afterFab: [
      { to: '/app/stats', label: 'Scouting', icon: BarChart3 },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  coach: {
    items: [
      { to: '/app', label: 'Coach Desk', icon: Home, end: true },
      { to: '/app/academy', label: 'Batches', icon: GraduationCap },
    ],
    fab: { to: '/app/scorer', label: 'Net Scorer', icon: Plus },
    afterFab: [
      { to: '/app/match-tools', label: 'DRS Tools', icon: Shield },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  academy: {
    items: [
      { to: '/app', label: 'Academy Hub', icon: Home, end: true },
      { to: '/app/academy', label: 'Students & Fees', icon: GraduationCap },
    ],
    fab: { to: '/app/grounds', label: 'Reserve Pitches', icon: Layers },
    afterFab: [
      { to: '/app/marketplace', label: 'Pro Store', icon: ShoppingBag },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  ground: {
    items: [
      { to: '/app', label: 'Venue Hub', icon: Home, end: true },
      { to: '/app/grounds', label: 'Turf Slots', icon: Calendar },
    ],
    fab: { to: '/app/matches', label: 'Match Fixtures', icon: ClipboardCheck },
    afterFab: [
      { to: '/app/sponsorship', label: 'Stadium Ads', icon: Megaphone },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  staff: {
    items: [
      { to: '/app', label: 'Shift Desk', icon: Home, end: true },
      { to: '/app/matches', label: 'My Matches', icon: Calendar },
    ],
    fab: { to: '/app/scorer', label: 'Live Scorer', icon: Activity },
    afterFab: [
      { to: '/app/match-tools', label: 'DRS Tools', icon: Shield },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  organizer: {
    items: [
      { to: '/app', label: 'League Hub', icon: Home, end: true },
      { to: '/app/ticketing', label: 'Box Office', icon: Ticket },
    ],
    fab: { to: '/app/matches', label: 'Tournaments', icon: Trophy },
    afterFab: [
      { to: '/app/match-tools', label: 'Match Tools', icon: Shield },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  seller: {
    items: [
      { to: '/app', label: 'Storefront', icon: Home, end: true },
      { to: '/app/marketplace', label: 'Catalog', icon: ShoppingBag },
    ],
    fab: { to: '/app/partners', label: 'KYC & B2B', icon: ShieldCheck },
    afterFab: [
      { to: '/app/sponsorship', label: 'Promote Ads', icon: Megaphone },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  sponsor: {
    items: [
      { to: '/app', label: 'Sponsor Hub', icon: Home, end: true },
      { to: '/app/sponsorship', label: 'Ad Campaigns', icon: Megaphone },
    ],
    fab: { to: '/app/epaper', label: 'Print Ads', icon: Newspaper },
    afterFab: [
      { to: '/app/entertainment', label: 'Arena Audio', icon: Music },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
  admin: {
    items: [
      { to: '/app', label: 'Admin Root', icon: Home, end: true },
      { to: '/app/admin', label: 'Approvals', icon: ShieldAlert },
    ],
    fab: { to: '/app/admin', label: 'Anti-Fraud Radar', icon: Shield },
    afterFab: [
      { to: '/app/epaper', label: 'E-Paper Bureau', icon: Newspaper },
      { to: '/app/profile', label: 'Profile', icon: User },
    ],
  },
}

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  // Hide the bottom navigation bar on camera/capture pages
  if (location.pathname.startsWith('/app/avatar/capture') || location.pathname.startsWith('/app/avatar/mapping')) {
    return null
  }

  const roleKey = user?.role || 'player'
  const navConfig = ROLE_NAV_CONFIG[roleKey] || ROLE_NAV_CONFIG.player
  const FabIcon = navConfig.fab.icon

  return (
    <nav className="tabbar">
      {/* First two navigation tabs */}
      {navConfig.items.map((item) => (
        <NavLink
          key={item.label + item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `tabbar__item ${isActive ? 'is-active' : ''}`}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}

      {/* Central Role-Specific Floating Action Button */}
      <button
        className="tabbar__fab"
        type="button"
        onClick={() => navigate(navConfig.fab.to)}
        aria-label={navConfig.fab.label}
        title={navConfig.fab.label}
      >
        <FabIcon size={24} strokeWidth={2.4} />
      </button>

      {/* Trailing navigation tabs */}
      {navConfig.afterFab.map((item) => (
        <NavLink
          key={item.label + item.to}
          to={item.to}
          className={({ isActive }) => `tabbar__item ${isActive ? 'is-active' : ''}`}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
