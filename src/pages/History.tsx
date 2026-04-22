import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, Trophy } from 'lucide-react'
import { mockSessions, generateYearData } from '../data/mockData'
import WorkoutCard from '../components/ui/WorkoutCard'

type ViewMode = 'grid' | 'calendar'

const STATUS_COLORS = {
  exceeded:  '#a855f7',
  targetMet: '#22c55e',
  partial:   '#eab308',
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function History() {
  const [query, setQuery] = useState('')
  const [view, setView] = useState<ViewMode>('grid')
  const [calMonth, setCalMonth] = useState(() => new Date())

  const yearData = generateYearData()
  const filtered = mockSessions.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">History</h1>
        <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
          {(['grid', 'calendar'] as ViewMode[]).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                view === v
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Year Contribution Grid */}
      {view === 'grid' && (
        <div className="card p-4 mb-5 overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {new Date().getFullYear()} Activity
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: STATUS_COLORS.partial }} />
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: STATUS_COLORS.targetMet }} />
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: STATUS_COLORS.exceeded }} />
            </div>
          </div>

          {/* Day labels */}
          <div className="flex gap-px mb-1" style={{ paddingLeft: 28 }}>
            {DAY_LABELS.map((d, i) => (
              <div key={i} className="w-3 text-[9px] text-slate-400 text-center">{d}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-px">
            {/* Month labels + weeks */}
            {buildWeeks(yearData).map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-px">
                {/* Month label for first week of month */}
                <div className="h-4 text-[9px] text-slate-400 flex items-center">
                  {wIdx > 0 && week[0]?.date.getDate() <= 7
                    ? MONTH_NAMES[week[0].date.getMonth()]
                    : ''}
                </div>
                {week.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    title={`${day.date.toLocaleDateString()} ${day.status ?? ''}`}
                    className="w-3 h-3 rounded-sm transition-opacity hover:opacity-75 cursor-default"
                    style={{
                      backgroundColor: day.status
                        ? STATUS_COLORS[day.status]
                        : 'rgb(226,232,240)',
                      outline: day.hasPRs ? '1.5px solid #eab308' : 'none',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-3">
            <LegendItem color={STATUS_COLORS.exceeded} label="Exceeded" />
            <LegendItem color={STATUS_COLORS.targetMet} label="Completed" />
            <LegendItem color={STATUS_COLORS.partial} label="Partial" />
            <LegendItem color="#eab308" label="PR day" outline />
          </div>
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="card p-4 mb-5">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCalMonth(m => { const d = new Date(m); d.setMonth(d.getMonth() - 1); return d })}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ChevronLeft size={16} />
            </button>
            <p className="font-semibold text-slate-900 dark:text-slate-50 text-sm">
              {calMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <button
              onClick={() => setCalMonth(m => { const d = new Date(m); d.setMonth(d.getMonth() + 1); return d })}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-center text-xs font-medium text-slate-400 py-1">{d}</div>
            ))}
          </div>

          {/* Calendar cells */}
          <div className="grid grid-cols-7 gap-1">
            {buildCalendarDays(calMonth, mockSessions).map((cell, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative ${
                  cell.isCurrentMonth
                    ? 'text-slate-900 dark:text-slate-100'
                    : 'text-slate-300 dark:text-slate-600'
                } ${
                  cell.isToday
                    ? 'ring-2 ring-indigo-500'
                    : ''
                } ${
                  cell.session ? 'cursor-pointer hover:opacity-80' : ''
                }`}
                style={cell.session?.status ? { backgroundColor: `${STATUS_COLORS[cell.session.status]}22` } : {}}
              >
                <span className="font-medium">{cell.day}</span>
                {cell.session?.hasPRs && (
                  <Trophy size={8} className="absolute top-1 right-1 text-yellow-500" />
                )}
                {cell.session && (
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-0.5"
                    style={{ backgroundColor: STATUS_COLORS[cell.session.status ?? 'targetMet'] }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session List */}
      <div>
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-10"
            placeholder="Search sessions…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <p className="section-header">Sessions ({filtered.length})</p>
        <div className="space-y-2">
          {filtered.map(session => (
            <WorkoutCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  )
}

function LegendItem({ color, label, outline }: { color: string; label: string; outline?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-2.5 h-2.5 rounded-sm shrink-0"
        style={{
          backgroundColor: outline ? 'transparent' : color,
          border: outline ? `1.5px solid ${color}` : 'none',
        }}
      />
      <span className="text-[10px] text-slate-400">{label}</span>
    </div>
  )
}

function buildWeeks(days: ReturnType<typeof generateYearData>) {
  const weeks: typeof days[] = []
  let week: typeof days = []
  // Pad start
  const firstDay = days[0]?.date.getDay() ?? 0
  for (let i = 0; i < firstDay; i++) {
    week.push({ date: new Date(0), status: undefined, hasPRs: false })
  }
  for (const day of days) {
    week.push(day)
    if (week.length === 7) { weeks.push(week); week = [] }
  }
  if (week.length > 0) weeks.push(week)
  return weeks
}

function buildCalendarDays(month: Date, sessions: typeof mockSessions) {
  const year = month.getFullYear()
  const m = month.getMonth()
  const firstDay = new Date(year, m, 1).getDay()
  const daysInMonth = new Date(year, m + 1, 0).getDate()
  const today = new Date()

  const cells: Array<{ day: number; isCurrentMonth: boolean; isToday: boolean; session?: typeof sessions[0] }> = []

  // Prev month padding
  const prevMonthDays = new Date(year, m, 0).getDate()
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, isCurrentMonth: false, isToday: false })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, m, d)
    const session = sessions.find(s => {
      const sd = s.startedAt
      return sd.getFullYear() === year && sd.getMonth() === m && sd.getDate() === d
    })
    cells.push({
      day: d,
      isCurrentMonth: true,
      isToday: cellDate.toDateString() === today.toDateString(),
      session,
    })
  }

  // Next month padding
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, isCurrentMonth: false, isToday: false })
  }

  return cells
}
