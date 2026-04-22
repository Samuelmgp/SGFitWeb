import { useNavigate } from 'react-router-dom'
import {
  User, Target, Scale, Ruler, ChevronRight,
  Trophy, Dumbbell, Calendar, Award, Moon, Sun, Monitor,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { mockUser, mockSessions, mockBadgeAwards } from '../data/mockData'
import { formatHeight, formatWeight, sessionDurationMinutes } from '../utils/units'
import type { Theme } from '../types'

const THEME_OPTIONS: { value: Theme; Icon: typeof Moon; label: string }[] = [
  { value: 'light', Icon: Sun, label: 'Light' },
  { value: 'dark', Icon: Moon, label: 'Dark' },
  { value: 'system', Icon: Monitor, label: 'System' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const totalSessions = mockSessions.length
  const totalMinutes = mockSessions.reduce((acc, s) => acc + sessionDurationMinutes(s), 0)
  const totalHours = Math.round(totalMinutes / 60)
  const memberSince = mockUser.createdAt.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4 space-y-5">
      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Profile</h1>

      {/* User Card */}
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {mockUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">{mockUser.name}</h2>
            <p className="text-sm text-slate-400 dark:text-slate-500">Member since {memberSince}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-100 dark:border-slate-700/50">
          {[
            { label: 'Workouts', value: String(totalSessions) },
            { label: 'Hours', value: String(totalHours) },
            { label: 'Badges', value: String(mockBadgeAwards.length) },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div>
        <p className="section-header">Goals</p>
        <div className="card divide-y divide-slate-100 dark:divide-slate-700/50">
          <RowItem
            Icon={Calendar}
            label="Weekly Target"
            value={mockUser.targetWorkoutDaysPerWeek ? `${mockUser.targetWorkoutDaysPerWeek} days/week` : 'Not set'}
          />
          <RowItem
            Icon={Target}
            label="Session Duration"
            value={mockUser.targetWorkoutMinutes ? `${mockUser.targetWorkoutMinutes} min` : 'Not set'}
          />
        </div>
      </div>

      {/* Body Measurements */}
      <div>
        <p className="section-header">Body</p>
        <div className="card divide-y divide-slate-100 dark:divide-slate-700/50">
          <RowItem
            Icon={Ruler}
            label="Height"
            value={mockUser.heightMeters
              ? formatHeight(mockUser.heightMeters, mockUser.preferredWeightUnit)
              : 'Not set'}
          />
          <RowItem
            Icon={Scale}
            label="Body Weight"
            value={mockUser.bodyWeightKg
              ? formatWeight(mockUser.bodyWeightKg, mockUser.preferredWeightUnit)
              : 'Not set'}
          />
          <RowItem
            Icon={User}
            label="Weight Unit"
            value={mockUser.preferredWeightUnit.toUpperCase()}
          />
        </div>
      </div>

      {/* Appearance */}
      <div>
        <p className="section-header">Appearance</p>
        <div className="card p-4">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Theme</p>
          <div className="grid grid-cols-3 gap-2">
            {THEME_OPTIONS.map(({ value, Icon, label }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={`flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all ${
                  theme === value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <Icon
                  size={20}
                  className={theme === value ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}
                />
                <span className={`text-xs font-medium ${theme === value ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Library */}
      <div>
        <p className="section-header">Library</p>
        <div className="card divide-y divide-slate-100 dark:divide-slate-700/50">
          <NavRow
            Icon={Trophy}
            label="Personal Records"
            iconColor="#f59e0b"
            iconBg="rgba(245,158,11,0.12)"
            onClick={() => navigate('/profile/personal-records')}
          />
          <NavRow
            Icon={Dumbbell}
            label="Exercise Library"
            iconColor="#6366f1"
            iconBg="rgba(99,102,241,0.12)"
            onClick={() => navigate('/profile/exercise-library')}
          />
        </div>
      </div>

      {/* Badges */}
      <div>
        <p className="section-header">Badges</p>
        <div className="card p-4">
          {mockBadgeAwards.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">No badges earned yet</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {mockBadgeAwards.map(award => (
                <div key={award.id} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3">
                  <div className="text-2xl">{award.badge.icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{award.badge.name}</p>
                    <p className="text-[10px] text-slate-400">{award.badge.description}</p>
                  </div>
                </div>
              ))}
              {/* Locked badge teaser */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3 opacity-40">
                <Award size={28} className="text-slate-400" />
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Locked</p>
                  <p className="text-[10px] text-slate-400">Keep going!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function RowItem({ Icon, label, value }: { Icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-slate-500 dark:text-slate-400" />
      </div>
      <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{label}</span>
      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{value}</span>
    </div>
  )
}

function NavRow({ Icon, label, iconColor, iconBg, onClick }: {
  Icon: typeof Trophy
  label: string
  iconColor: string
  iconBg: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3.5 w-full text-left hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
        <Icon size={15} color={iconColor} />
      </div>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex-1">{label}</span>
      <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
    </button>
  )
}
