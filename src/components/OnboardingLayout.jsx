import { Outlet } from 'react-router-dom'

const PERKS = [
  { icon: '💳', text: 'Corporate card with up to 4% cashback' },
  { icon: '⚡', text: 'Instant spend controls & real-time visibility' },
  { icon: '🇨🇦', text: 'Built for Canadian businesses' },
  { icon: '🔒', text: 'No hard credit check. No setup fees.' },
]

export default function OnboardingLayout() {
  return (
    <div className="onboarding-shell">
      <div className="onboarding-panel">
        <img src="/float-logo.svg" alt="Float" className="onboarding-panel-logo" />

        <div className="onboarding-panel-body">
          <h2 className="onboarding-panel-headline">
            Your business card,<br />ready today.
          </h2>
          <p className="onboarding-panel-sub">
            Apply in minutes and start managing your business spend all in one place.
          </p>

          <div className="onboarding-panel-perks">
            {PERKS.map(({ icon, text }) => (
              <div key={text} className="onboarding-panel-perk">
                <span className="onboarding-panel-perk-icon">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="onboarding-panel-footer">© {new Date().getFullYear()} Float Financial Solutions Inc.</p>
      </div>

      <div className="onboarding-content">
        <Outlet />
      </div>
    </div>
  )
}
