export default function ProgressBar({ step, total }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="progress-bar-track">
      <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
