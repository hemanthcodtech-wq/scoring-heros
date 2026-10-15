import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Home, LayoutGrid, MessageSquare, Plus, Trophy } from 'lucide-react'

const items = [
  { to: '/app', label: 'Home', icon: Home, end: true },
  { to: '/app/matches', label: 'Matches', icon: Trophy },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  // Hide the bottom navigation bar only on avatar camera/flow pages
  if (location.pathname.startsWith('/app/avatar')) {
    return null
  }

  return (
    <nav className="tabbar">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `tabbar__item ${isActive ? 'is-active' : ''}`}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}

      <button className="tabbar__fab" type="button" onClick={() => navigate('/app/scorer')} aria-label="Start scoring">
        <Plus size={26} strokeWidth={2.6} />
      </button>

      <NavLink to="/app/community" className={({ isActive }) => `tabbar__item ${isActive ? 'is-active' : ''}`}>
        <MessageSquare size={20} />
        <span>Community</span>
      </NavLink>
      <NavLink to="/app/more" className={({ isActive }) => `tabbar__item ${isActive ? 'is-active' : ''}`}>
        <LayoutGrid size={20} />
        <span>More</span>
      </NavLink>
    </nav>
  )
}
