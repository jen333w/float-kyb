import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar'

function formatBN(val) {
  const digits = val.replace(/\D/g, '').slice(0, 9)
  if (digits.length <= 9) return digits.replace(/(\d{9})/, '$1')
  return digits
}

export default function BusinessNumber() {
  const navigate = useNavigate()
  const { state: prev } = useLocation()

  const [bn, setBn] = useState('')
  const [skipped, setSkipped] = useState(false)
  const [exiting, setExiting] = useState(false)

  const valid = bn.replace(/\D/g, '').length === 9

  const next = (skip = false) => {
    setExiting(true)
    setTimeout(() => navigate('/review', {
      state: { ...prev, businessNumber: skip ? null : bn }
    }), 250)
  }

  return (
    <div className="screen">
      <TopBar step={4} total={6} onBack={() => navigate(-1)} />

      <div className={`${exiting ? 'page-exit' : 'page-enter'}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 40px', gap: 32 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#049fdd', letterSpacing: '0.04em', marginBottom: 8 }}>Step 4 of 6</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#212322', letterSpacing: '-0.3px', marginBottom: 6 }}>Business registration</h2>
          <p style={{ fontSize: 15, color: '#6B7280' }}>Your 9-digit CRA Business Number helps us verify your company faster.</p>
        </div>

        <div className="field-group" style={{ flex: 1 }}>
          <div className="field">
            <label>CRA Business Number (BN)</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="123456789"
              value={bn}
              onChange={e => setBn(formatBN(e.target.value))}
              autoFocus
            />
            <span className="field-hint">Found on your CRA My Business Account or Notice of Assessment</span>
          </div>

          {/* Info card */}
          <div style={{ padding: '14px 16px', background: '#F9FAFB', borderRadius: 12, border: '1px solid #E5E7EB' }}>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
              Don't have it handy? You can still continue — we'll ask for it within 7 days of account activation.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn-primary" disabled={!valid} onClick={() => next(false)}>Continue</button>
          <button className="btn-ghost" onClick={() => next(true)}>Skip for now</button>
        </div>
      </div>
    </div>
  )
}
