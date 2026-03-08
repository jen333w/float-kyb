import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar'

function formatDOB(val) {
  const digits = val.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export default function Identity() {
  const navigate = useNavigate()
  const { state: prev } = useLocation()

  const [dob, setDob] = useState('')
  const [sin, setSin] = useState('')
  const [exiting, setExiting] = useState(false)

  const dobDigits = dob.replace(/\D/g, '')
  const valid = dobDigits.length === 8 && sin.length === 4

  const next = () => {
    if (!valid) return
    setExiting(true)
    setTimeout(() => navigate('/business-number', { state: { ...prev, dob, sinLast4: sin } }), 250)
  }

  return (
    <div className="screen">
      <TopBar step={3} total={6} onBack={() => navigate(-1)} />

      <div className={`${exiting ? 'page-exit' : 'page-enter'}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 40px', gap: 32 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#049fdd', letterSpacing: '0.04em', marginBottom: 8 }}>Step 3 of 6</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#212322', letterSpacing: '-0.3px', marginBottom: 6 }}>Verify your identity</h2>
          <p style={{ fontSize: 15, color: '#6B7280' }}>Required by Canadian financial regulations. Your info is encrypted and never stored in plain text.</p>
        </div>

        {/* Trust badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#F0FDF4', borderRadius: 12, border: '1px solid #BBF7D0' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1L2 4v5c0 4.1 3 7.9 7 9 4-1.1 7-4.9 7-9V4L9 1z" fill="#16A34A" opacity="0.15"/>
            <path d="M9 1L2 4v5c0 4.1 3 7.9 7 9 4-1.1 7-4.9 7-9V4L9 1z" stroke="#16A34A" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M6 9l2 2 4-4" stroke="#16A34A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 13, color: '#15803D', fontWeight: 500 }}>256-bit encrypted · Never shared</span>
        </div>

        <div className="field-group" style={{ flex: 1 }}>
          <div className="field">
            <label>Date of birth</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="DD/MM/YYYY"
              value={dob}
              onChange={e => setDob(formatDOB(e.target.value))}
              autoFocus
            />
          </div>

          <div className="field">
            <label>Last 4 digits of SIN</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="•••• 1234"
              maxLength={4}
              value={sin}
              onChange={e => setSin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            />
            <span className="field-hint">We only store the last 4 digits for verification</span>
          </div>
        </div>

        <button className="btn-primary" disabled={!valid} onClick={next}>Continue</button>
      </div>
    </div>
  )
}
