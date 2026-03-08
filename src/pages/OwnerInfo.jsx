import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar'

const TITLES = ['CEO', 'CFO', 'COO', 'President', 'Director', 'Owner']

export default function OwnerInfo() {
  const navigate = useNavigate()
  const { state: prev } = useLocation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState('')
  const [ownership, setOwnership] = useState('100')
  const [exiting, setExiting] = useState(false)

  const ownershipNum = parseInt(ownership, 10)
  const valid = firstName.trim() && lastName.trim() && title && ownershipNum >= 25 && ownershipNum <= 100

  const next = () => {
    if (!valid) return
    setExiting(true)
    setTimeout(() => navigate('/identity', {
      state: { ...prev, firstName, lastName, title, ownership: ownershipNum }
    }), 250)
  }

  return (
    <div className="screen">
      <TopBar step={2} total={6} onBack={() => navigate(-1)} />

      <div className={`${exiting ? 'page-exit' : 'page-enter'}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 40px', gap: 32 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#049fdd', letterSpacing: '0.04em', marginBottom: 8 }}>Step 2 of 6</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#212322', letterSpacing: '-0.3px', marginBottom: 6 }}>About you</h2>
          <p style={{ fontSize: 15, color: '#6B7280' }}>We need the details of a primary owner or director.</p>
        </div>

        <div className="field-group" style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="field">
              <label>First name</label>
              <input type="text" placeholder="Jane" value={firstName} onChange={e => setFirstName(e.target.value)} autoFocus />
            </div>
            <div className="field">
              <label>Last name</label>
              <input type="text" placeholder="Smith" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>Title</label>
            <div className="chip-group">
              {TITLES.map(t => (
                <button key={t} className={`chip${title === t ? ' active' : ''}`} onClick={() => setTitle(t)}>{t}</button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Ownership %</label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="25"
              min="25"
              max="100"
              value={ownership}
              onChange={e => setOwnership(e.target.value)}
            />
            <span className="field-hint">Must be at least 25% to apply as primary owner</span>
          </div>
        </div>

        <button className="btn-primary" disabled={!valid} onClick={next}>Continue</button>
      </div>
    </div>
  )
}
