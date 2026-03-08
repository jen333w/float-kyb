import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const STEPS = [
  'Verifying your identity…',
  'Registering your business…',
  'Activating your card…',
  'Setting up your account…',
]

export default function Done() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stepIndex, setStepIndex] = useState(0)

  const firstName = state?.firstName ?? 'there'
  const businessName = state?.businessName ?? 'your business'

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(i => Math.min(i + 1, STEPS.length - 1))
    }, 900)
    const done = setTimeout(() => { setLoading(false); clearInterval(interval) }, 3800)
    return () => { clearInterval(interval); clearTimeout(done) }
  }, [])

  if (loading) {
    return (
      <div className="screen" style={{ justifyContent: 'center', alignItems: 'center', gap: 24 }}>
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '3px solid #E6F7FD',
          }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '3px solid #049fdd',
            borderTopColor: 'transparent',
            animation: 'spin 0.8s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: 8, borderRadius: '50%',
            background: '#E6F7FD', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 20 }}>⚡</span>
          </div>
        </div>
        <p key={stepIndex} style={{ fontSize: 15, color: '#6B7280', fontWeight: 500, animation: 'fade-in 0.35s ease both' }}>
          {STEPS[stepIndex]}
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div className="screen page-enter" style={{ justifyContent: 'center', alignItems: 'center', padding: '40px 24px' }}>
      <div style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

        {/* Success circle */}
        <div style={{ position: 'relative', width: 80, height: 80, animation: 'circle-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#049fdd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M9 18.5L15.5 25L27 12"
                stroke="#FFFFFF"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="30"
                strokeDashoffset="30"
                style={{ animation: 'check-draw 0.4s ease 0.3s both' }}
              />
            </svg>
          </div>
        </div>

        {/* Copy */}
        <div style={{ textAlign: 'center', animation: 'fade-up 0.4s ease 0.4s both' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#212322', letterSpacing: '-0.4px', marginBottom: 10 }}>
            You're in, {firstName}!
          </h2>
          <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
            Your Float account for <strong style={{ color: '#212322' }}>{businessName}</strong> is active. Your card is on the way.
          </p>
        </div>

        {/* Card visual */}
        <div style={{
          width: '100%', borderRadius: 20, padding: '28px 24px', background: '#049fdd',
          position: 'relative', overflow: 'hidden',
          animation: 'fade-up 0.4s ease 0.55s both',
          boxShadow: '0 12px 40px rgba(27,86,245,0.35)',
        }}>
          {/* Subtle circles */}
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: -20, right: 20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <span style={{ fontWeight: 700, fontSize: 18, color: '#FFFFFF', letterSpacing: '0.02em' }}>float</span>
            <div style={{ width: 36, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.2)' }} />
          </div>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', margin: '0 0 16px', fontFamily: 'monospace' }}>
            •••• •••• •••• 4242
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', margin: '0 0 3px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Cardholder</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF', margin: 0 }}>{state?.firstName} {state?.lastName}</p>
            </div>
            <svg width="46" height="28" viewBox="0 0 46 28" fill="none">
              <circle cx="16" cy="14" r="14" fill="#EB001B" opacity="0.9"/>
              <circle cx="30" cy="14" r="14" fill="#F79E1B" opacity="0.9"/>
              <path d="M23 4.4a14 14 0 0 1 0 19.2A14 14 0 0 1 23 4.4z" fill="#FF5F00"/>
            </svg>
          </div>
        </div>

        {/* Actions */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, animation: 'fade-up 0.4s ease 0.7s both' }}>
          <button className="btn-primary" style={{ background: '#212322' }}>
            Add to Apple Wallet
          </button>
          <button className="btn-primary" style={{ background: '#FFFFFF', color: '#049fdd', border: '1.5px solid #049fdd' }} onClick={() => navigate('/command', { state })}>
            Go to dashboard
          </button>
        </div>

        <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', animation: 'fade-up 0.4s ease 0.8s both' }}>
          Physical card arrives in 3–5 business days
        </p>
      </div>
    </div>
  )
}
