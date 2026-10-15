import { useNavigate } from 'react-router-dom'
import {
  Camera,
  RotateCcw,
  Shirt,
  Sparkles,
  ChevronRight,
} from 'lucide-react'
import Screen from '../components/Screen'

const steps = [
  {
    id: 'capture',
    icon: Camera,
    label: 'Step 1',
    title: 'Selfie Capture',
    desc: 'Take a selfie for AI face mapping',
    to: '/app/avatar/capture',
    accent: '#e10613',
  },
  {
    id: 'mapping',
    icon: Sparkles,
    label: 'Step 2',
    title: 'AI Face Mapping',
    desc: 'Generate your personalised 3D avatar',
    to: '/app/avatar/mapping',
    accent: '#7c3aed',
  },
  {
    id: 'viewer',
    icon: RotateCcw,
    label: 'Step 3',
    title: '360° Avatar View',
    desc: 'Rotate and preview your avatar',
    to: '/app/avatar/viewer',
    accent: '#1d6dff',
  },
  {
    id: 'jersey',
    icon: Shirt,
    label: 'Step 4',
    title: 'Team Jersey',
    desc: 'Apply your team kit in real-time',
    to: '/app/avatar/jersey',
    accent: '#059669',
  },
]

export default function Avatar() {
  const navigate = useNavigate()

  return (
    <Screen title="3D Avatar" back padded={false}>
      <div className="avatar-hub">
        <div className="avatar-hub__hero">
          <div className="avatar-hub__glow" />
          <div className="avatar-hub__silhouette">
            <div className="avatar-sil-body">
              <div className="avatar-sil-head" />
              <div className="avatar-sil-torso" />
              <div className="avatar-sil-legs" />
            </div>
            <div className="avatar-sil-rings">
              <div className="avatar-sil-ring avatar-sil-ring--1" />
              <div className="avatar-sil-ring avatar-sil-ring--2" />
              <div className="avatar-sil-ring avatar-sil-ring--3" />
            </div>
            <div className="avatar-scan-line" />
          </div>
          <h2 className="avatar-hub__heading" style={{ marginTop: 12 }}>Your 3D Avatar</h2>
          <p className="avatar-hub__sub">
            AI-powered face mapping · 360° rotation · Team jersey
          </p>
        </div>

        <div className="avatar-steps">
          {steps.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                className="avatar-step"
                onClick={() => navigate(s.to)}
                style={{ '--step-accent': s.accent }}
              >
                <div className="avatar-step__icon">
                  <Icon size={20} />
                </div>
                <div className="avatar-step__body">
                  <span className="avatar-step__label">{s.label}</span>
                  <strong className="avatar-step__title">{s.title}</strong>
                  <p className="avatar-step__desc">{s.desc}</p>
                </div>
                <ChevronRight size={18} className="avatar-step__arrow" />
              </button>
            )
          })}
        </div>

        <div className="avatar-hub__foot">
          <button
            className="btn btn--primary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            onClick={() => navigate('/app/avatar/capture')}
          >
            <Camera size={18} />
            Start Avatar Setup
          </button>
          <p className="muted" style={{ textAlign: 'center', marginTop: 8 }}>
            Your face data stays on-device · never uploaded
          </p>
        </div>
      </div>
    </Screen>
  )
}
