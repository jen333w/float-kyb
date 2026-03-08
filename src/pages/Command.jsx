import { useState } from 'react'
import { useLocation } from 'react-router-dom'

// ─── Mock data ────────────────────────────────────────────────────────────────

const BALANCE       = 12_450.00
const MONTH_SPEND   = 8_234.50
const MONTH_BUDGET  = 15_000.00
const LAST_MONTH    = 6_890.00

const CATEGORIES = [
  { label: 'Software',   amount: 2840, color: '#049fdd' },
  { label: 'Travel',     amount: 1920, color: '#7C3AED' },
  { label: 'Marketing',  amount: 1680, color: '#F59E0B' },
  { label: 'Meals',      amount:  890, color: '#10B981' },
  { label: 'Office',     amount:  610, color: '#EF4444' },
  { label: 'Other',      amount:  294, color: '#9CA3AF' },
]

const TOP_SPENDERS = [
  { name: 'Sarah Chen',       title: 'Head of Marketing', amount: 1840 },
  { name: 'Marcus Williams',  title: 'Senior Engineer',   amount: 1240 },
  { name: 'Priya Patel',      title: 'Account Executive', amount: 980  },
]

const TRANSACTIONS = [
  { merchant: 'Amazon Web Services', category: 'Software',  amount: -340.00,  date: 'Today',     icon: '☁️' },
  { merchant: 'Uber for Business',   category: 'Travel',    amount: -67.50,   date: 'Yesterday', icon: '🚗' },
  { merchant: 'LinkedIn Ads',        category: 'Marketing', amount: -890.00,  date: 'Mar 6',     icon: '📣' },
  { merchant: 'Founding +Funds',     category: 'Income',    amount: +5000.00, date: 'Mar 5',     icon: '🏦' },
  { merchant: 'WeWork',              category: 'Office',    amount: -250.00,  date: 'Mar 4',     icon: '🏢' },
]

const INSIGHTS = [
  { type: 'warn', icon: '🧾', title: '4 receipts missing',            sub: 'Required for reconciliation' },
  { type: 'info', icon: '📈', title: 'Software up 23% vs last month', sub: 'Largest category this month' },
  { type: 'good', icon: '✅', title: 'Accounting synced',             sub: 'QuickBooks updated 2h ago' },
]

const QUICK_ACTIONS = [
  { icon: '➕', label: 'Add funds' },
  { icon: '❄️', label: 'Freeze card' },
  { icon: '🎯', label: 'Set limits' },
  { icon: '📥', label: 'Export' },
]

const CAT_COLORS = {
  Software: '#E6F7FD', Travel: '#F5F3FF', Marketing: '#FFFBEB',
  Meals: '#F0FDF4', Office: '#FEF2F2', Income: '#F0FDF4', Other: '#F9FAFB',
}
const CAT_TEXT = {
  Software: '#049fdd', Travel: '#7C3AED', Marketing: '#D97706',
  Meals: '#059669', Office: '#DC2626', Income: '#059669', Other: '#6B7280',
}

// ─── Setup wizard data ────────────────────────────────────────────────────────

const EXPENSE_CATEGORIES = [
  { id: 'travel',    label: 'Travel',    icon: '✈️', color: '#E6F7FD', border: '#9DDDF6' },
  { id: 'software',  label: 'Software',  icon: '💻', color: '#F0FDF4', border: '#BBF7D0' },
  { id: 'marketing', label: 'Marketing', icon: '📣', color: '#FFF7ED', border: '#FED7AA' },
  { id: 'meals',     label: 'Meals',     icon: '🍽️', color: '#FDF4FF', border: '#E9D5FF' },
  { id: 'office',    label: 'Office',    icon: '🏢', color: '#F0F9FF', border: '#BAE6FD' },
  { id: 'other',     label: 'Other',     icon: '📦', color: '#F9FAFB', border: '#E5E7EB' },
]

const INTEGRATIONS = [
  { id: 'quickbooks',  name: 'QuickBooks',  logo: '🟢', sub: 'Most popular' },
  { id: 'xero',        name: 'Xero',        logo: '🔵', sub: 'Great for SMBs' },
  { id: 'freshbooks',  name: 'FreshBooks',  logo: '🔴', sub: 'Canadian favourite' },
  { id: 'sage',        name: 'Sage',        logo: '🟡', sub: 'Enterprise-ready' },
]

const HRIS_SYSTEMS = [
  { id: 'rippling',  name: 'Rippling',          color: '#FFEDE0', text: '#C2410C', initial: 'R', sub: 'Most popular' },
  { id: 'bamboohr',  name: 'BambooHR',           color: '#E8F5E9', text: '#2E7D32', initial: 'B', sub: 'Great for SMBs' },
  { id: 'gusto',     name: 'Gusto',              color: '#FFF3E0', text: '#E65100', initial: 'G', sub: 'Payroll + HR' },
  { id: 'workday',   name: 'Workday',            color: '#E3F2FD', text: '#1565C0', initial: 'W', sub: 'Enterprise' },
  { id: 'adp',       name: 'ADP',                color: '#FCE4EC', text: '#AD1457', initial: 'A', sub: 'Large teams' },
  { id: 'dayforce',  name: 'Ceridian Dayforce',  color: '#F3E5F5', text: '#6A1B9A', initial: 'D', sub: 'Canadian favourite' },
]

const MOCK_EMPLOYEES = [
  { id: 'e1', name: 'Sarah Chen',       title: 'Head of Marketing',  dept: 'Marketing' },
  { id: 'e2', name: 'Marcus Williams',  title: 'Senior Engineer',    dept: 'Engineering' },
  { id: 'e3', name: 'Priya Patel',      title: 'Account Executive',  dept: 'Sales' },
  { id: 'e4', name: 'Jordan Lee',       title: 'Finance Analyst',    dept: 'Finance' },
  { id: 'e5', name: 'Camille Tremblay', title: 'Operations Manager', dept: 'Operations' },
  { id: 'e6', name: 'Dev Anand',        title: 'Product Designer',   dept: 'Product' },
]

const STEPS = [
  {
    id: 'invite',
    title: 'Invite your team',
    description: 'Add employees and set spend limits — cards auto-created on accept.',
    icon: '👥',
    Panel: InvitePanel,
  },
  {
    id: 'cards',
    title: 'Set up expense cards',
    description: 'Auto-generate virtual cards by category — travel, software, meals and more.',
    icon: '💳',
    Panel: CardsPanel,
  },
  {
    id: 'accounting',
    title: 'Link your accounting',
    description: 'One-click sync with QuickBooks, Xero, or FreshBooks for automatic month-end reconciliation.',
    icon: '🔗',
    Panel: AccountingPanel,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt  = (n) => '$' + Math.abs(n).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtK = (n) => n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`

// ─── Shared sub-components ────────────────────────────────────────────────────

function Avatar({ name, size = 32 }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const hue = name.charCodeAt(0) * 5 % 360
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `hsl(${hue},60%,88%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700, color: `hsl(${hue},60%,28%)`,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

function Card({ children, style }) {
  return (
    <div style={{ background: '#FFFFFF', borderRadius: 20, border: '1px solid #d9d9d6', overflow: 'hidden', ...style }}>
      {children}
    </div>
  )
}

function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: '#212322', margin: 0 }}>{children}</h3>
      {action && <button className="btn-ghost" style={{ fontSize: 13, color: '#049fdd', fontWeight: 600 }} onClick={onAction}>{action}</button>}
    </div>
  )
}

function StepBadge({ done }) {
  return done ? (
    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#049fdd', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l2.5 2.5L10 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  ) : (
    <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #E5E7EB', flexShrink: 0 }} />
  )
}

// ─── Invite Panel ─────────────────────────────────────────────────────────────

function InvitePanel({ onComplete }) {
  const [view, setView] = useState('options')
  const [connectedHris, setConnectedHris] = useState(null)
  const [selected, setSelected] = useState(new Set())
  const [sending, setSending] = useState(false)
  const [email, setEmail] = useState('')
  const [manualInvited, setManualInvited] = useState([])
  const [manualSending, setManualSending] = useState(false)

  const connectHris = (sys) => {
    setConnectedHris(sys)
    setView('connecting')
    setTimeout(() => setView('employees'), 1800)
  }

  const toggleEmployee = (id) =>
    setSelected(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })

  const selectAll = () =>
    setSelected(selected.size === MOCK_EMPLOYEES.length ? new Set() : new Set(MOCK_EMPLOYEES.map(e => e.id)))

  const sendInvites = () => {
    setSending(true)
    setTimeout(() => { setSending(false); setView('done'); onComplete() }, 1200)
  }

  const sendManual = () => {
    if (!email.includes('@')) return
    setManualSending(true)
    setTimeout(() => {
      setManualInvited(prev => [...prev, email])
      setEmail('')
      setManualSending(false)
      onComplete()
    }, 900)
  }

  if (view === 'connecting') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '12px 0', animation: 'fade-in 0.2s ease both' }}>
        <div style={{ position: 'relative', width: 52, height: 52 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #E6F7FD' }} />
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #049fdd', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: connectedHris.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: connectedHris.text }}>{connectedHris.initial}</span>
          </div>
        </div>
        <p style={{ fontSize: 14, color: '#6B7280', fontWeight: 500, margin: 0 }}>Connecting to {connectedHris.name}…</p>
      </div>
    )
  }

  if (view === 'employees') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fade-up 0.25s ease both' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: connectedHris.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: connectedHris.text }}>{connectedHris.initial}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#212322' }}>{connectedHris.name}</span>
            <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600, background: '#F0FDF4', padding: '2px 8px', borderRadius: 999, border: '1px solid #BBF7D0' }}>Connected</span>
          </div>
          <button className="btn-ghost" style={{ fontSize: 13, color: '#049fdd', fontWeight: 600 }} onClick={selectAll}>
            {selected.size === MOCK_EMPLOYEES.length ? 'Deselect all' : 'Select all'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {MOCK_EMPLOYEES.map(emp => {
            const isSelected = selected.has(emp.id)
            return (
              <button
                key={emp.id}
                onClick={() => toggleEmployee(emp.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 12,
                  border: `1.5px solid ${isSelected ? '#049fdd' : '#E5E7EB'}`,
                  background: isSelected ? '#E6F7FD' : '#FFFFFF',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
                  transition: 'border-color 0.15s, background 0.15s',
                }}
              >
                <Avatar name={emp.name} size={36} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#212322', margin: '0 0 1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{emp.name}</p>
                  <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>{emp.title} · {emp.dept}</p>
                </div>
                <div style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  border: `2px solid ${isSelected ? '#049fdd' : '#D1D5DB'}`,
                  background: isSelected ? '#049fdd' : '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.15s, border-color 0.15s',
                }}>
                  {isSelected && (
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5l2 2 5-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
            )
          })}
        </div>
        <button className="btn-primary" disabled={selected.size === 0 || sending} onClick={sendInvites} style={{ height: 44 }}>
          {sending ? 'Sending invites…' : `Invite ${selected.size > 0 ? selected.size : ''} employee${selected.size !== 1 ? 's' : ''}`}
        </button>
      </div>
    )
  }

  if (view === 'done') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, animation: 'fade-up 0.25s ease both' }}>
        {MOCK_EMPLOYEES.filter(e => selected.has(e.id)).map(emp => (
          <div key={emp.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
            <Avatar name={emp.name} size={30} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#212322', margin: 0 }}>{emp.name}</p>
              <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>{emp.dept} · Card auto-created</p>
            </div>
            <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600 }}>✓ Invited</span>
          </div>
        ))}
        {manualInvited.map((e, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
            <Avatar name={e} size={30} />
            <p style={{ fontSize: 13, fontWeight: 600, color: '#212322', margin: 0, flex: 1 }}>{e}</p>
            <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600 }}>✓ Invited</span>
          </div>
        ))}
      </div>
    )
  }

  if (view === 'manual') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fade-up 0.2s ease both' }}>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: 0, fontSize: 13, color: '#049fdd' }} onClick={() => setView('options')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#049fdd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to integrations
        </button>
        {manualInvited.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {manualInvited.map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#F0FDF4', borderRadius: 10, border: '1px solid #BBF7D0' }}>
                <Avatar name={e} size={28} />
                <p style={{ fontSize: 13, fontWeight: 600, color: '#212322', margin: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e}</p>
                <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600 }}>✓ Sent</span>
              </div>
            ))}
          </div>
        )}
        <div className="field">
          <label>Work email</label>
          <input type="email" placeholder="colleague@company.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendManual()} autoFocus />
        </div>
        <button className="btn-primary" disabled={!email.includes('@') || manualSending} onClick={sendManual} style={{ height: 44 }}>
          {manualSending ? 'Sending…' : 'Send invite'}
        </button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fade-up 0.25s ease both' }}>
      <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Connect your HR system to import your team in one tap — cards are auto-created when they accept.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {HRIS_SYSTEMS.map(sys => (
          <button
            key={sys.id}
            onClick={() => connectHris(sys)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 14px', borderRadius: 12,
              border: '1.5px solid #E5E7EB', background: '#FFFFFF',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
              transition: 'border-color 0.15s, background 0.15s',
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: sys.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: sys.text }}>{sys.initial}</span>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#212322', margin: '0 0 1px' }}>{sys.name}</p>
              <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>{sys.sub}</p>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#049fdd' }}>Connect</span>
          </button>
        ))}
      </div>
      <button className="btn-ghost" style={{ fontSize: 13, color: '#9CA3AF', paddingTop: 4 }} onClick={() => setView('manual')}>
        Don't use an HRIS? Invite manually →
      </button>
    </div>
  )
}

// ─── Cards Panel ──────────────────────────────────────────────────────────────

function CardsPanel({ onComplete }) {
  const [selected, setSelected] = useState([])
  const [created, setCreated] = useState(false)
  const [creating, setCreating] = useState(false)

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  const create = () => {
    setCreating(true)
    setTimeout(() => { setCreated(true); setCreating(false); onComplete() }, 1200)
  }

  if (created) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'fade-up 0.25s ease both' }}>
        {selected.map(id => {
          const cat = EXPENSE_CATEGORIES.find(c => c.id === id)
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: cat.color, borderRadius: 12, border: `1px solid ${cat.border}` }}>
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#212322', margin: 0 }}>{cat.label} Card</p>
                <p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>•••• 00{selected.indexOf(id) + 1}</p>
              </div>
              <span style={{ fontSize: 11, color: '#16A34A', fontWeight: 600 }}>Active</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'fade-up 0.25s ease both' }}>
      <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Select categories to auto-generate dedicated virtual cards with custom spend rules.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {EXPENSE_CATEGORIES.map(cat => {
          const active = selected.includes(cat.id)
          return (
            <button
              key={cat.id}
              onClick={() => toggle(cat.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
                padding: '14px 14px', borderRadius: 12,
                border: `1.5px solid ${active ? '#049fdd' : '#E5E7EB'}`,
                background: active ? '#E6F7FD' : '#FFFFFF',
                cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                transition: 'border-color 0.15s, background 0.15s',
              }}
            >
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: active ? '#049fdd' : '#212322' }}>{cat.label}</span>
            </button>
          )
        })}
      </div>
      <button className="btn-primary" disabled={selected.length === 0 || creating} onClick={create} style={{ height: 44 }}>
        {creating ? 'Creating cards…' : `Create ${selected.length > 0 ? selected.length : ''} card${selected.length !== 1 ? 's' : ''}`}
      </button>
    </div>
  )
}

// ─── Accounting Panel ─────────────────────────────────────────────────────────

function AccountingPanel({ onComplete }) {
  const [connecting, setConnecting] = useState(null)
  const [connected, setConnected] = useState(null)

  const connect = (id) => {
    setConnecting(id)
    setTimeout(() => { setConnected(id); setConnecting(null); onComplete() }, 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'fade-up 0.25s ease both' }}>
      {INTEGRATIONS.map(int => {
        const isConnecting = connecting === int.id
        const isConnected  = connected  === int.id
        const isDisabled   = !!connected || !!connecting
        return (
          <button
            key={int.id}
            onClick={() => !isDisabled && connect(int.id)}
            disabled={isDisabled && !isConnected}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 12,
              border: `1.5px solid ${isConnected ? '#049fdd' : '#E5E7EB'}`,
              background: isConnected ? '#E6F7FD' : '#FFFFFF',
              cursor: isDisabled ? 'default' : 'pointer',
              fontFamily: 'inherit', textAlign: 'left', width: '100%',
              opacity: isDisabled && !isConnected ? 0.4 : 1,
              transition: 'border-color 0.15s, background 0.15s, opacity 0.15s',
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              {int.logo}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#212322', margin: '0 0 2px' }}>{int.name}</p>
              <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>{int.sub}</p>
            </div>
            {isConnecting && (
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2.5px solid #049fdd', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
            )}
            {isConnected && (
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#049fdd', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'circle-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            {!isConnecting && !isConnected && (
              <span style={{ fontSize: 13, fontWeight: 600, color: '#049fdd' }}>Connect</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Command() {
  const { state } = useLocation()
  const firstName   = state?.firstName   ?? 'Alex'
  const businessName = state?.businessName ?? 'Acme Corp'

  // Setup completion — reactive state
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('float_setup')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    } catch { return new Set() }
  })

  const complete = (id) => setCompleted(prev => {
    const next = new Set([...prev, id])
    localStorage.setItem('float_setup', JSON.stringify([...next]))
    return next
  })

  const setupComplete = completed.size >= 3

  // Parse deposit from onboarding state e.g. "$1,000" → 1000
  const depositRaw = state?.initialDeposit ?? '$0'
  const depositAmt = parseFloat(depositRaw.replace(/[$,]/g, '')) || 0

  const balance     = setupComplete ? BALANCE      : depositAmt
  const monthSpend  = setupComplete ? MONTH_SPEND  : 0
  const monthBudget = setupComplete ? MONTH_BUDGET : depositAmt || 1
  const lastMonth   = setupComplete ? LAST_MONTH   : 0

  const spendPct    = Math.round((monthSpend / monthBudget) * 100)
  const remaining   = monthBudget - monthSpend
  const vsLastMonth = lastMonth > 0 ? ((monthSpend - lastMonth) / lastMonth * 100).toFixed(0) : null
  const maxCatAmount = setupComplete ? Math.max(...CATEGORIES.map(c => c.amount)) : 1

  const [activeTab, setActiveTab] = useState('overview')
  const [openStep,  setOpenStep]  = useState(null)
  const toggleStep = (id) => setOpenStep(s => s === id ? null : id)

  const loadDemo = () => {
    const all = new Set(['invite', 'cards', 'accounting'])
    localStorage.setItem('float_setup', JSON.stringify([...all]))
    setCompleted(all)
  }

  const remaining_setup = 3 - completed.size

  const TABS = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'cards',    label: 'Cards',    icon: '💳' },
    { id: 'team',     label: 'Team',     icon: '👥' },
    { id: 'setup',    label: !setupComplete ? `Setup (${remaining_setup})` : 'Setup', icon: '⚙️' },
  ]

  return (
    <div className="screen screen-wide" style={{ background: '#f4f4f4' }}>

      {/* ── Desktop sidebar ── */}
      <div className="cmd-sidebar">
        <div style={{ marginBottom: 28, paddingLeft: 6 }}>
          <img src="/float-logo.svg" alt="Float" style={{ height: 26, width: 'auto' }} />
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600, textAlign: 'left',
                background: activeTab === id ? '#f4f4f4' : 'transparent',
                color: activeTab === id ? '#212322' : (id === 'setup' && !setupComplete ? '#049fdd' : '#6B7280'),
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              <span style={{ fontSize: 16 }}>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 8px', marginTop: 'auto' }}>
          <Avatar name={firstName} size={32} />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#212322', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{firstName}</p>
            <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{businessName}</p>
          </div>
        </div>
      </div>

      {/* ── Main area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

      {/* ── Mobile top nav ── */}
      <div className="cmd-topbar-mobile" style={{ background: '#FFFFFF', borderBottom: '1px solid #d9d9d6', padding: '52px 20px 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/float-logo.svg" alt="Float" style={{ height: 34, width: 'auto' }} />
            <span style={{ fontSize: 15, color: '#9CA3AF', fontWeight: 700, letterSpacing: '-0.3px', marginTop: 3 }}>Dashboard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2a6 6 0 0 1 6 6c0 3.5 1 5 2 6H3c1-1 2-2.5 2-6a6 6 0 0 1 6-6z" stroke="#6B7280" strokeWidth="1.6" strokeLinejoin="round"/>
                <path d="M9 18a2 2 0 0 0 4 0" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: '50%', background: '#EF4444', border: '1.5px solid #FFFFFF' }} />
            </div>
            <Avatar name={firstName} size={34} />
          </div>
        </div>

        {/* Mobile tabs */}
        <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                padding: '7px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
                background: activeTab === id ? '#212322' : 'transparent',
                color: activeTab === id ? '#FFFFFF' : (id === 'setup' && !setupComplete ? '#049fdd' : '#9CA3AF'),
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="cmd-body" style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 48px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ── Overview tab ── */}
        {activeTab === 'overview' && (
          <>
            {!setupComplete && (
              <div style={{ borderRadius: 20, overflow: 'hidden', border: '1.5px solid #9DDDF6', background: '#E6F7FD', animation: 'fade-up 0.3s ease both' }}>
                <div style={{ padding: '18px 20px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#212322', margin: 0 }}>Finish setting up your account</p>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#049fdd', background: '#FFFFFF', padding: '3px 10px', borderRadius: 999 }}>
                      {completed.size}/3
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 16px' }}>Complete these steps to get the most out of Float.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                    {STEPS.map(({ id, icon, title }) => {
                      const done = completed.has(id)
                      return (
                        <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                            background: done ? '#049fdd' : '#FFFFFF',
                            border: `2px solid ${done ? '#049fdd' : '#9DDDF6'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.2s, border-color 0.2s',
                          }}>
                            {done && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l2.5 2.5L10 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 500, color: done ? '#9CA3AF' : '#374151', textDecoration: done ? 'line-through' : 'none' }}>
                            {icon} {title}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <button className="btn-primary" style={{ height: 44 }} onClick={() => setActiveTab('setup')}>
                    Continue setup →
                  </button>
                </div>
              </div>
            )}

            {/* Balance hero */}
            <Card>
              <div style={{ padding: '20px 20px 0' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 4px' }}>Available to spend</p>
                <p style={{ fontSize: 38, fontWeight: 800, color: '#212322', margin: '0 0 4px', letterSpacing: '-1px', lineHeight: 1 }}>
                  {fmt(balance)}
                </p>
                {vsLastMonth !== null ? (
                  <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 18px' }}>
                    <span style={{ color: parseFloat(vsLastMonth) > 0 ? '#EF4444' : '#10B981', fontWeight: 600 }}>
                      {parseFloat(vsLastMonth) > 0 ? '▲' : '▼'} {Math.abs(parseFloat(vsLastMonth))}%
                    </span>
                    {' '}vs last month
                  </p>
                ) : (
                  <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 18px' }}>No spend yet this month</p>
                )}
                <div style={{ marginBottom: 6 }}>
                  <div style={{ height: 8, background: '#f4f4f4', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 999,
                      width: `${spendPct}%`,
                      background: spendPct > 85 ? '#EF4444' : spendPct > 65 ? '#F59E0B' : '#049fdd',
                      transition: 'width 0.6s cubic-bezier(0.32,0.72,0,1)',
                    }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>{fmt(monthSpend)} spent</span>
                  <span style={{ fontSize: 12, color: '#9CA3AF' }}>
                    {setupComplete ? `${fmtK(monthBudget)} budget · ${spendPct}% used` : 'Set a budget once set up'}
                  </span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #f4f4f4' }}>
                {[
                  { label: 'Remaining',    value: setupComplete ? fmtK(remaining) : fmt(balance), color: '#212322' },
                  { label: 'This month',   value: setupComplete ? fmtK(monthSpend) : '$0',         color: '#212322' },
                  { label: 'Cards active', value: setupComplete ? '8' : '1',                       color: '#049fdd' },
                ].map(({ label, value, color }, i) => (
                  <div key={label} style={{ padding: '12px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid #f4f4f4' : 'none' }}>
                    <p style={{ fontSize: 16, fontWeight: 700, color, margin: '0 0 2px' }}>{value}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0, fontWeight: 500 }}>{label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick actions */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {QUICK_ACTIONS.map(({ icon, label }) => (
                  <button
                    key={label}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      padding: '14px 8px', borderRadius: 16,
                      background: '#FFFFFF', border: '1px solid #d9d9d6',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#374151', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
                  </button>
                ))}
              </div>
              {!setupComplete && (
                <button
                  onClick={loadDemo}
                  style={{
                    marginTop: 8, display: 'flex', alignItems: 'center', gap: 6,
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
                    color: '#9CA3AF', padding: '4px 2px',
                  }}
                >
                  <span>✨</span> Load demo data
                </button>
              )}
            </div>

            {setupComplete ? (
              <>
                <Card style={{ padding: 20 }}>
                  <SectionTitle action="See all">Where it's going</SectionTitle>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {CATEGORIES.map(({ label, amount, color }) => {
                      const pct = Math.round((amount / maxCatAmount) * 100)
                      return (
                        <div key={label}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{label}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#212322' }}>{fmtK(amount)}</span>
                          </div>
                          <div style={{ height: 6, background: '#f4f4f4', borderRadius: 999, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, borderRadius: 999, background: color, transition: 'width 0.5s ease' }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>

                <Card style={{ padding: 20 }}>
                  <SectionTitle>Insights</SectionTitle>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {INSIGHTS.map(({ type, icon, title, sub }) => {
                      const bg     = type === 'warn' ? '#FFFBEB' : type === 'good' ? '#F0FDF4' : '#E6F7FD'
                      const border = type === 'warn' ? '#FDE68A' : type === 'good' ? '#BBF7D0' : '#9DDDF6'
                      return (
                        <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: bg, borderRadius: 12, border: `1px solid ${border}` }}>
                          <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 700, color: '#212322', margin: '0 0 1px' }}>{title}</p>
                            <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>{sub}</p>
                          </div>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                            <path d="M6 12l4-4-4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )
                    })}
                  </div>
                </Card>

                <Card style={{ padding: 20 }}>
                  <SectionTitle action="All transactions">Recent activity</SectionTitle>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {TRANSACTIONS.map(({ merchant, category, amount, date, icon }, i) => (
                      <div key={merchant} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: i > 0 ? 14 : 0, paddingBottom: 14, borderBottom: i < TRANSACTIONS.length - 1 ? '1px solid #f4f4f4' : 'none' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: '#212322', margin: '0 0 3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{merchant}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 7px', borderRadius: 999, background: CAT_COLORS[category] ?? '#f4f4f4', color: CAT_TEXT[category] ?? '#6B7280' }}>{category}</span>
                            <span style={{ fontSize: 12, color: '#9CA3AF' }}>{date}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: amount > 0 ? '#10B981' : '#212322', margin: 0, flexShrink: 0 }}>{amount > 0 ? '+' : ''}{fmt(amount)}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            ) : (
              <Card style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10 }}>
                <div style={{ fontSize: 36, marginBottom: 4 }}>📊</div>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#212322', margin: 0 }}>No activity yet</p>
                <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0, lineHeight: 1.6 }}>
                  Your spend data, transactions, and insights will appear here once your account is set up and your team starts using their cards.
                </p>
              </Card>
            )}
          </>
        )}

        {/* ── Cards tab ── */}
        {activeTab === 'cards' && (
          setupComplete ? (
            <>
              <Card style={{ padding: 20 }}>
                <SectionTitle action="+ New card">Active cards</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: 'Travel',    last4: '4821', limit: 3000, spent: 1920, color: '#7C3AED' },
                    { label: 'Software',  last4: '9034', limit: 5000, spent: 2840, color: '#049fdd' },
                    { label: 'Marketing', last4: '2291', limit: 3000, spent: 1680, color: '#F59E0B' },
                    { label: 'Meals',     last4: '7743', limit: 1500, spent: 890,  color: '#10B981' },
                  ].map(({ label, last4, limit, spent, color }) => {
                    const pct = Math.round((spent / limit) * 100)
                    return (
                      <div key={label} style={{ padding: '14px', borderRadius: 14, border: '1.5px solid #d9d9d6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
                            <div>
                              <p style={{ fontSize: 14, fontWeight: 700, color: '#212322', margin: 0 }}>{label}</p>
                              <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>•••• {last4}</p>
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: '#212322', margin: 0 }}>{fmtK(spent)}</p>
                            <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>of {fmtK(limit)}</p>
                          </div>
                        </div>
                        <div style={{ height: 5, background: '#f4f4f4', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 999, background: color }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
              <Card style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#212322', margin: '0 0 3px' }}>Virtual card controls</p>
                    <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0 }}>Freeze, set limits, or restrict by merchant</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15l5-5-5-5" stroke="#049fdd" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Card>
            </>
          ) : (
            <Card style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10 }}>
              <div style={{ fontSize: 36, marginBottom: 4 }}>💳</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#212322', margin: 0 }}>No cards yet</p>
              <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0, lineHeight: 1.6 }}>Expense cards will appear here once you complete your account setup.</p>
              <button className="btn-primary" style={{ height: 40, marginTop: 8, fontSize: 14 }} onClick={() => setActiveTab('setup')}>Complete setup →</button>
            </Card>
          )
        )}

        {/* ── Team tab ── */}
        {activeTab === 'team' && (
          setupComplete ? (
            <>
              <Card style={{ padding: 20 }}>
                <SectionTitle action="Manage team">Top spenders</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {TOP_SPENDERS.map(({ name, title, amount }) => {
                    const pct = Math.round((amount / TOP_SPENDERS[0].amount) * 100)
                    return (
                      <div key={name}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 7 }}>
                          <Avatar name={name} size={38} />
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#212322', margin: '0 0 2px' }}>{name}</p>
                            <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>{title}</p>
                          </div>
                          <p style={{ fontSize: 15, fontWeight: 700, color: '#212322', margin: 0 }}>{fmtK(amount)}</p>
                        </div>
                        <div style={{ height: 5, background: '#f4f4f4', borderRadius: 999, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, borderRadius: 999, background: '#049fdd' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
              <Card style={{ padding: 20 }}>
                <SectionTitle>Spend by department</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { dept: 'Marketing',   amount: 3120, members: 3 },
                    { dept: 'Engineering', amount: 1840, members: 5 },
                    { dept: 'Sales',       amount: 1640, members: 4 },
                    { dept: 'Operations',  amount:  980, members: 2 },
                    { dept: 'Finance',     amount:  654, members: 2 },
                  ].map(({ dept, amount, members }) => (
                    <div key={dept} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#F9FAFB', borderRadius: 12 }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#212322', margin: '0 0 2px' }}>{dept}</p>
                        <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>{members} members</p>
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#212322', margin: 0 }}>{fmtK(amount)}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10 }}>
              <div style={{ fontSize: 36, marginBottom: 4 }}>👥</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#212322', margin: 0 }}>No team members yet</p>
              <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0, lineHeight: 1.6 }}>Invite your team and their spend will show up here automatically.</p>
              <button className="btn-primary" style={{ height: 40, marginTop: 8, fontSize: 14 }} onClick={() => setActiveTab('setup')}>Invite team →</button>
            </Card>
          )
        )}

        {/* ── Setup tab ── */}
        {activeTab === 'setup' && (
          <>
            <div style={{ padding: '0 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#212322', margin: 0 }}>Activate your account</h2>
                <span style={{ fontSize: 13, fontWeight: 600, color: completed.size === 3 ? '#16A34A' : '#049fdd' }}>
                  {completed.size}/3 done
                </span>
              </div>
              <div style={{ height: 4, background: '#E5E7EB', borderRadius: 999 }}>
                <div style={{ height: '100%', borderRadius: 999, background: completed.size === 3 ? '#16A34A' : '#049fdd', width: `${(completed.size / 3) * 100}%`, transition: 'width 0.4s cubic-bezier(0.32,0.72,0,1), background 0.3s' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STEPS.map(({ id, title, description, icon, Panel }) => {
                const isOpen = openStep === id
                const isDone = completed.has(id)
                return (
                  <div
                    key={id}
                    style={{
                      background: '#FFFFFF', borderRadius: 16,
                      border: `1.5px solid ${isOpen ? '#049fdd' : isDone ? '#BBF7D0' : '#E5E7EB'}`,
                      overflow: 'hidden',
                      transition: 'border-color 0.2s',
                      boxShadow: isOpen ? '0 4px 20px rgba(4,159,221,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <button
                      onClick={() => toggleStep(id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        width: '100%', padding: '16px', background: 'none',
                        border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                      }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: isDone ? '#F0FDF4' : '#f4f4f4',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22,
                      }}>
                        {icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#212322', margin: '0 0 3px' }}>{title}</p>
                        <p style={{ fontSize: 13, color: '#9CA3AF', margin: 0, lineHeight: 1.4 }}>{description}</p>
                      </div>
                      <div style={{ flexShrink: 0, marginLeft: 4 }}>
                        {isDone ? (
                          <StepBadge done />
                        ) : (
                          <svg
                            width="18" height="18" viewBox="0 0 18 18" fill="none"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
                          >
                            <path d="M4.5 7l4.5 4.5L13.5 7" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </button>

                    <div style={{
                      display: 'grid',
                      gridTemplateRows: isOpen && !isDone ? '1fr' : '0fr',
                      transition: 'grid-template-rows 0.3s cubic-bezier(0.32,0.72,0,1)',
                    }}>
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '0 16px 20px', borderTop: '1px solid #f4f4f4', paddingTop: 16 }}>
                          <Panel onComplete={() => { complete(id); setTimeout(() => setOpenStep(null), 800) }} />
                        </div>
                      </div>
                    </div>

                    {isDone && (
                      <div style={{ padding: '0 16px 14px', animation: 'fade-in 0.3s ease both' }}>
                        <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>✓ Completed</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {completed.size === 3 && (
              <div style={{
                padding: '20px', borderRadius: 16,
                background: 'linear-gradient(135deg, #049fdd, #4F8BFF)',
                animation: 'fade-up 0.4s ease both',
              }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', margin: '0 0 6px' }}>🎉 You're fully set up!</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
                  Your team is invited, cards are live, and your books sync automatically. Float is working for you.
                </p>
              </div>
            )}
          </>
        )}

      </div>
      </div>{/* end main area */}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
