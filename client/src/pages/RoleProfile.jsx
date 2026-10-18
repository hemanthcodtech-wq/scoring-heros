import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Screen from '../components/Screen'
import RoleProfileView from '../components/RoleProfileView'
import LanguageSelector from '../components/LanguageSelector'

export default function RoleProfile() {
  const navigate = useNavigate()

  return (
    <Screen
      title="Profile & Account"
      left={
        <button
          type="button"
          className="btn-icon"
          onClick={() => navigate('/app')}
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={20} />
        </button>
      }
      right={<LanguageSelector compact />}
      padded={false}
    >
      <div style={{ padding: '12px 14px 60px' }}>
        <RoleProfileView />
      </div>
    </Screen>
  )
}
