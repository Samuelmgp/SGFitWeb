import { ChevronRight, Trophy } from 'lucide-react'
import type { WorkoutSession } from '../../types'
import { formatRelativeDate, sessionDurationMinutes } from '../../utils/units'
import MuscleGroupBadge from './MuscleGroupBadge'

const STATUS_STYLES = {
  exceeded:  { dot: 'bg-purple-500', text: 'text-purple-500', label: 'Exceeded' },
  targetMet: { dot: 'bg-green-500',  text: 'text-green-500',  label: 'Completed' },
  partial:   { dot: 'bg-yellow-500', text: 'text-yellow-500', label: 'Partial' },
}

interface WorkoutCardProps {
  session: WorkoutSession
  onClick?: () => void
}

export default function WorkoutCard({ session, onClick }: WorkoutCardProps) {
  const style = session.status ? STATUS_STYLES[session.status] : STATUS_STYLES.targetMet
  const duration = sessionDurationMinutes(session)

  // Unique muscle groups from this session
  const muscleGroups = [...new Set(
    session.exercises
      .map(e => e.muscleGroup)
      .filter((g): g is NonNullable<typeof g> => g != null)
  )].slice(0, 4)

  return (
    <button
      onClick={onClick}
      className="card w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 active:scale-[0.99] transition-all"
    >
      {/* Muscle group badge (first exercise) */}
      <MuscleGroupBadge
        muscleGroup={session.exercises[0]?.muscleGroup}
        exerciseType={session.exercises[0]?.exerciseType}
        size="md"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-slate-900 dark:text-slate-50 truncate text-sm">
            {session.name}
          </p>
          {session.hasPRs && <Trophy size={12} className="text-yellow-500 shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatRelativeDate(session.startedAt)} · {duration} min
          </p>
          {/* Muscle group dots */}
          {muscleGroups.length > 0 && (
            <div className="flex gap-1 ml-auto">
              {muscleGroups.map(mg => (
                <div
                  key={mg}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: `var(--muscle-${mg}, #6366f1)` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 shrink-0" />
    </button>
  )
}
