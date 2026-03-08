import ProgressBar from './ProgressBar'

const FloatLogo = () => (
  <img src="/float-logo.svg" alt="Float" style={{ height: 22, width: 'auto' }} />
)

export default function TopBar({ step, total, onBack }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 14px' }}>
        {onBack ? (
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginLeft: -4, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 16L7 10L12.5 4" stroke="#212322" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div style={{ width: 28 }} />
        )}
        <FloatLogo />
        <div style={{ width: 28 }} />
      </div>
      {step && total && <ProgressBar step={step} total={total} />}
    </div>
  )
}
