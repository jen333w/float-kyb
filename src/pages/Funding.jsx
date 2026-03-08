import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar'

const AMOUNTS = ['$500', '$1,000', '$2,500', '$5,000']

export default function Funding() {
  const navigate = useNavigate()
  const { state: prev } = useLocation()

  const [method, setMethod] = useState(null) // 'plaid' | 'eft'
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState('$1,000')
  const [exiting, setExiting] = useState(false)

  const connectBank = () => {
    setConnecting(true)
    setTimeout(() => { setConnecting(false); setConnected(true) }, 2000)
  }

  const valid = method && (method === 'eft' || connected)

  const next = () => {
    if (!valid) return
    setExiting(true)
    setTimeout(() => navigate('/done', {
      state: { ...prev, fundingMethod: method, initialDeposit: selectedAmount }
    }), 250)
  }

  return (
    <div className="screen">
      <TopBar step={6} total={6} onBack={() => navigate(-1)} />

      <div className={`${exiting ? 'page-exit' : 'page-enter'}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 40px', gap: 28 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#049fdd', letterSpacing: '0.04em', marginBottom: 8 }}>Step 6 of 6</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#212322', letterSpacing: '-0.3px', marginBottom: 6 }}>Add funds to your account</h2>
          <p style={{ fontSize: 15, color: '#6B7280' }}>Connect your business bank account or send an e-transfer to fund your Float account instantly.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {/* Plaid option */}
          <button
            onClick={() => { setMethod('plaid'); if (!connected) connectBank() }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px', borderRadius: 14,
              border: `1.5px solid ${method === 'plaid' ? '#049fdd' : '#E5E7EB'}`,
              background: method === 'plaid' ? '#E6F7FD' : '#FFFFFF',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 20 }}>🏦</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#212322', margin: '0 0 2px' }}>Connect bank account</p>
              <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Instant via Plaid · Most popular</p>
            </div>
            {connected && method === 'plaid' ? (
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: 'circle-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l2.5 2.5L11 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ) : connecting && method === 'plaid' ? (
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2.5px solid #049fdd', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
            ) : (
              <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px solid #E5E7EB', flexShrink: 0 }} />
            )}
          </button>

          {/* EFT option */}
          <button
            onClick={() => setMethod('eft')}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px', borderRadius: 14,
              border: `1.5px solid ${method === 'eft' ? '#049fdd' : '#E5E7EB'}`,
              background: method === 'eft' ? '#E6F7FD' : '#FFFFFF',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 20 }}>📧</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#212322', margin: '0 0 2px' }}>Send an e-transfer</p>
              <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Instructions sent after account creation</p>
            </div>
            {method === 'eft' ? (
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#049fdd', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l2.5 2.5L11 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ) : (
              <div style={{ width: 24, height: 24, borderRadius: '50%', border: '1.5px solid #E5E7EB', flexShrink: 0 }} />
            )}
          </button>

          {/* Amount selector */}
          {method && (
            <div style={{ animation: 'fade-up 0.3s ease both', marginTop: 8 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 10, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Initial deposit amount</p>
              <div className="chip-group">
                {AMOUNTS.map(a => (
                  <button key={a} className={`chip${selectedAmount === a ? ' active' : ''}`} onClick={() => setSelectedAmount(a)}>{a}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="btn-primary" disabled={!valid} onClick={next}>
          {method === 'plaid' && !connected ? 'Connecting…' : 'Activate my account'}
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
