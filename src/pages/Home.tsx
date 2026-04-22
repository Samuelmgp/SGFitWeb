import { useNavigate } from 'react-router-dom'
import { Dumbbell, Zap, ClipboardEdit, Flame, Clock, BarChart3, Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { mockUser, mockSessions } from '../data/mockData'
import { sessionDurationMinutes } from '../utils/units'
import RingProgress from '../components/ui/RingProgress'
import StatCard from '../components/ui/StatCard'
import WorkoutCard from '../components/ui/WorkoutCard'
import Button from '../components/ui/Button'
import type { Theme } from '../types'

const THEME_ICONS: Record<Theme, typeof Moon> = { dark: Moon, light: Sun, system: Monitor }

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const navigate = useNavigate()
  const { theme, setTheme } = useTheme()

  const ThemeIcon = THEME_ICONS[theme]
  const nextTheme: Theme = theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system'

  // Compute this-week stats from mock sessions
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const thisWeekSessions = mockSessions.filter(s => s.startedAt >= startOfWeek && s.completedAt)
  const totalMinutes = thisWeekSessions.reduce((acc, s) => acc + sessionDurationMinutes(s), 0)
  const target = mockUser.targetWorkoutDaysPerWeek ?? 5
  const progress = thisWeekSessions.length / target

  // Streak: count consecutive days with a session going back from today
  const streak = 7 // mock fixed value

  const recentSessions = mockSessions.slice(0, 4)

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mt-0.5">
            {getGreeting()}, {mockUser.name}
          </h1>
        </div>
        <button
          onClick={() => setTheme(nextTheme)}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ThemeIcon size={18} />
        </button>
      </div>

      {/* Progress Ring */}
      <div className="card p-6 mb-4 flex flex-col items-center">
        <RingProgress progress={progress} size={148} strokeWidth={12} color="#6366f1">
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              {thisWeekSessions.length}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">of {target}</p>
          </div>
        </RingProgress>
        <p className="mt-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          workouts this week
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard
          label="Streak"
          value={`${streak} days`}
          Icon={Flame}
          iconColor="#f97316"
          iconBg="rgba(249,115,22,0.12)"
        />
        <StatCard
          label="This week"
          value={totalMinutes >= 60 ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m` : `${totalMinutes}m`}
          Icon={Clock}
          iconColor="#22c55e"
          iconBg="rgba(34,197,94,0.12)"
        />
        <StatCard
          label="Sessions"
          value={`${mockSessions.length}`}
          sub="all time"
          Icon={BarChart3}
          iconColor="#6366f1"
          iconBg="rgba(99,102,241,0.12)"
        />
      </div>

      {/* Actions */}
      <div className="space-y-3 mb-6">
        <Button
          variant="primary"
          size="lg"
          Icon={Dumbbell}
          fullWidth
          onClick={() => navigate('/workout/active')}
        >
          Record Workout
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            size="lg"
            Icon={Zap}
            fullWidth
            onClick={() => navigate('/workout/active')}
          >
            Start Scratch
          </Button>
          <Button
            variant="secondary"
            size="lg"
            Icon={ClipboardEdit}
            fullWidth
            onClick={() => navigate('/workout/active')}
          >
            Log Workout
          </Button>
        </div>
      </div>

      {/* Recent Workouts */}
      <div>
        <p className="section-header">Recent Workouts</p>
        <div className="space-y-2">
          {recentSessions.map(session => (
            <WorkoutCard
              key={session.id}
              session={session}
              onClick={() => {/* TODO: navigate to detail */}}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
