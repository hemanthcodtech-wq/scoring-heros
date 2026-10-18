import { createContext, useContext, useMemo, useState } from 'react'
import { getRoleById } from '../data/rolesData'

const KEY = 'sh-prototype-user'
const AuthContext = createContext(null)

function readUser() {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser)
  const [draft, setDraft] = useState({
    phoneCode: '+91',
    phone: '',
    email: '',
    nickname: '',
    age: '19',
    city: 'Chennai',
    roleCategory: 'player', // 'player' | 'official'
    role: 'player', // one of 11 roles
    roleDetails: {},
    mode: 'register',
  })

  const value = useMemo(
    () => ({
      user,
      draft,
      updateDraft: (patch) => setDraft((d) => ({ ...d, ...patch })),
      updateUser: (patch) => {
        setUser((prev) => {
          const next = { ...(prev || {}), ...patch }
          sessionStorage.setItem(KEY, JSON.stringify(next))
          return next
        })
      },
      // Finish registration / login
      completeSignup: (customData) => {
        const targetRoleId = customData?.role || draft.role || 'player'
        const roleMeta = getRoleById(targetRoleId)

        const next = {
          ...draft,
          ...(roleMeta?.defaultUser || {}),
          ...(customData || {}),
          role: targetRoleId,
          roleCategory: roleMeta.category,
          nickname: (customData?.nickname || draft.nickname || roleMeta.defaultUser?.nickname || 'Player_One').trim(),
          city: (customData?.city || draft.city || roleMeta.defaultUser?.city || 'Chennai').trim(),
          age: (customData?.age || draft.age || roleMeta.defaultUser?.age || '22'),
          phoneCode: customData?.phoneCode || draft.phoneCode || '+91',
          phone: (customData?.phone || draft.phone || '9876543210'),
          email: (customData?.email || draft.email || ''),
          roleDetails: {
            ...(roleMeta.defaultUser?.roleDetails || {}),
            ...(draft.roleDetails || {}),
            ...(customData?.roleDetails || {}),
          },
          verified: true,
          trust: customData?.trust || 92,
          isGuest: Boolean(customData?.isGuest),
        }
        sessionStorage.setItem(KEY, JSON.stringify(next))
        setUser(next)
      },
      // Instant switch between any of the 11 role profiles & dashboards
      switchRole: (roleId) => {
        const roleMeta = getRoleById(roleId)
        setUser((prev) => {
          const base = prev || {}
          const next = {
            ...base,
            role: roleId,
            roleCategory: roleMeta.category,
            nickname: base.isGuest ? roleMeta.defaultUser.nickname : (base.nickname || roleMeta.defaultUser.nickname),
            roleDetails: {
              ...(roleMeta.defaultUser?.roleDetails || {}),
              ...(base.roleDetails?.[roleId] || {}),
            },
          }
          sessionStorage.setItem(KEY, JSON.stringify(next))
          return next
        })
      },
      // 1-Click Guest Login for any role (defaults to player if not specified)
      loginAsGuest: (roleId = 'player') => {
        const roleMeta = getRoleById(roleId)
        const guestData = {
          ...roleMeta.defaultUser,
          phoneCode: '+91',
          phone: '9876543210',
          isGuest: true,
          verified: true,
          trust: 90,
        }
        sessionStorage.setItem(KEY, JSON.stringify(guestData))
        setUser(guestData)
      },
      logout: () => {
        sessionStorage.removeItem(KEY)
        setUser(null)
      },
    }),
    [user, draft],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
