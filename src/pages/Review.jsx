import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import TopBar from '../components/TopBar'

export default function Review() {
  const navigate = useNavigate()
  const { state: prev } = useLocation()
  const [exiting, setExiting] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const rows = [
    { label: 'Business', value: prev?.businessName },
    { label: 'Province', value: prev?.province },
    { label: 'Type', value: prev?.entity },
    { label: 'Applicant', value: `${prev?.firstName ?? ''} ${prev?.lastName ?? ''}`.trim() },
    { label: 'Title', value: `${prev?.title}${prev?.ownership ? ` · ${prev.ownership}%` : ''}` },
    { label: 'Date of birth', value: prev?.dob },
    { label: 'BN', value: prev?.businessNumber ?? 'To be provided' },
  ].filter(r => r.value)

  const next = () => {
    if (!agreed) return
    setExiting(true)
    setTimeout(() => navigate('/funding', { state: prev }), 250)
  }

  return (
    <div className="screen">
      <TopBar step={5} total={6} onBack={() => navigate(-1)} />

      <div className={`${exiting ? 'page-exit' : 'page-enter'}`} style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px 24px 40px', gap: 28 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#049fdd', letterSpacing: '0.04em', marginBottom: 8 }}>Step 5 of 6</p>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#212322', letterSpacing: '-0.3px', marginBottom: 6 }}>Review & confirm</h2>
          <p style={{ fontSize: 15, color: '#6B7280' }}>Make sure everything looks right before we submit your application.</p>
        </div>

        {/* Summary card */}
        <div style={{ background: '#F9FAFB', borderRadius: 16, border: '1px solid #E5E7EB', overflow: 'hidden', flex: 1 }}>
          {rows.map((row, i) => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '14px 16px',
              borderBottom: i < rows.length - 1 ? '1px solid #E5E7EB' : 'none',
            }}>
              <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{row.label}</span>
              <span style={{ fontSize: 14, color: '#212322', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Agreement */}
        <button
          onClick={() => setAgreed(!agreed)}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', padding: 0 }}
        >
          <div style={{
            width: 22, height: 22, borderRadius: 6, border: `2px solid ${agreed ? '#049fdd' : '#D1D5DB'}`,
            background: agreed ? '#049fdd' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginTop: 1, transition: 'background 0.15s, border-color 0.15s',
          }}>
            {agreed && (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.5 6.5l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <span style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
            I confirm the information above is accurate and I agree to Float's{' '}
            <span style={{ color: '#049fdd', fontWeight: 500 }}>Terms of Service</span> and{' '}
            <span style={{ color: '#049fdd', fontWeight: 500 }}>Privacy Policy</span>.
          </span>
        </button>

        <button className="btn-primary" disabled={!agreed} onClick={next}>Submit application</button>
      </div>
    </div>
  )
}
