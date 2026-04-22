import { NavLink } from 'react-router-dom'
import { Home, ClipboardList, History, User } from 'lucide-react'

const tabs = [
  { to: '/home',      label: 'Home',      Icon: Home },
  { to: '/templates', label: 'Templates', Icon: ClipboardList },
  { to: '/history',   label: 'History',   Icon: History },
  { to: '/profile',   label: 'Profile',   Icon: User },
]

export default function TabBar() {
  return (
    <>
      {/* ── Bottom tab bar (mobile) ── */}
      <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700/60 pb-safe">
        <div className="flex items-center justify-around h-16">
          {tabs.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-colors ${
                  isActive
                    ? 'text-indigo-500 dark:text-indigo-400'
                    : 'text-slate-400 dark:text-slate-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── Sidebar (desktop ≥768px) ── */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900 px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SG</span>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-50 tracking-tight">
            SGFitness
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {tabs.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium text-sm ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
