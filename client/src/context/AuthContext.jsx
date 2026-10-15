import { createContext, useContext, useMemo, useState } from 'react'

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
    phone: '',
    email: '',
    nickname: '',
    age: '18',
    city: 'Chennai',
    kind: 'Player',
    role: 'allrounder',
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
      completeSignup: (customData) => {
        const next = {
          ...draft,
          ...(customData || {}),
          nickname: (customData?.nickname || draft.nickname || 'Rohit_45').trim(),
          city: (customData?.city || draft.city || 'Chennai').trim(),
          age: (customData?.age || draft.age || '18'),
          kind: (customData?.kind || draft.kind || 'Player'),
          role: (customData?.role || draft.role || 'allrounder'),
          phone: (customData?.phone || draft.phone || '9876543210'),
          email: (customData?.email || draft.email || ''),
          verified: true,
          trust: 86,
        }
        sessionStorage.setItem(KEY, JSON.stringify(next))
        setUser(next)
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
