import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

const PERKS = [
  { icon: '💳', text: 'Corporate card with up to 4% cashback' },
  { icon: '⚡', text: 'Instant spend controls & real-time visibility' },
  { icon: '🇨🇦', text: 'Built for Canadian businesses' },
]

export default function Welcome() {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('float_setup')
    navigate('/', { replace: true, state: null })
  }, [])

  return (
    <div className="screen">
      <TopBar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 40px' }}>
        {/* Hero */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
          <div style={{ animation: 'fade-up 0.5s ease both' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#E6F7FD', borderRadius: 999, padding: '5px 12px', marginBottom: 20,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#049fdd' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#049fdd', letterSpacing: '0.04em' }}>Takes under 5 minutes</span>
            </div>
            <h1 style={{ fontSize: 34, fontWeight: 700, color: '#212322', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: 14 }}>
              Your business card,<br />ready today.
            </h1>
            <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.6 }}>
              Apply for your Float card and start managing business spend — all in one place.
            </p>
          </div>

          {/* Perks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'fade-up 0.5s ease 0.1s both' }}>
            {PERKS.map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: '#f4f4f4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>
                  {icon}
                </div>
                <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fade-up 0.5s ease 0.2s both' }}>
          <button className="btn-primary" onClick={() => navigate('/business')}>
            Get my Float card
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', lineHeight: 1.5 }}>
            No hard credit check. No setup fees.
          </p>
        </div>
      </div>
    </div>
  )
}
