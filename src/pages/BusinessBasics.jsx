import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

const ENTITY_TYPES = ['Corporation', 'Partnership', 'Sole Proprietor', 'Non-Profit']

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland & Labrador', 'Nova Scotia', 'Ontario',
  'Prince Edward Island', 'Quebec', 'Saskatchewan',
]

export default function BusinessBasics() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [province, setProvince] = useState('')
  const [entity, setEntity] = useState('')
  const [exiting, setExiting] = useState(false)

  const valid = name.trim().length > 1 && province && entity

  const next = () => {
    if (!valid) return
    setExiting(true)
    setTimeout(() => navigate('/owner', { state: { businessName: name, province, entity } }), 250)
  }

  return (
    <div className="screen">
      <TopBar step={1} total={6} onBack={() => navigate(-1)} />

      <div className={`${exiting ? 'page-exit' : 'page-enter'}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 40px', gap: 32 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#049fdd', letterSpacing: '0.04em', marginBottom: 8 }}>Step 1 of 6</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#212322', letterSpacing: '-0.3px', marginBottom: 6 }}>About your business</h2>
          <p style={{ fontSize: 15, color: '#6B7280' }}>Tell us a bit about the company applying for Float.</p>
        </div>

        <div className="field-group" style={{ flex: 1 }}>
          <div className="field">
            <label>Legal business name</label>
            <input
              type="text"
              placeholder="Acme Corp Inc."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && next()}
              autoFocus
            />
          </div>

          <div className="field">
            <label>Province</label>
            <div style={{ position: 'relative' }}>
              <select value={province} onChange={e => setProvince(e.target.value)}>
                <option value="">Select province</option>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="field">
            <label>Business type</label>
            <div className="chip-group">
              {ENTITY_TYPES.map(t => (
                <button key={t} className={`chip${entity === t ? ' active' : ''}`} onClick={() => setEntity(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-primary" disabled={!valid} onClick={next}>Continue</button>
      </div>
    </div>
  )
}
