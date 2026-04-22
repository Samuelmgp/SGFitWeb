import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trophy } from 'lucide-react'
import { mockPRs } from '../data/mockData'
import { MUSCLE_CONFIG } from '../components/ui/MuscleGroupBadge'
import { formatWeight } from '../utils/units'
import { mockUser } from '../data/mockData'
import type { MuscleGroup, PRMedal } from '../types'

const MEDAL_CONFIG: Record<PRMedal, { emoji: string; label: string; border: string }> = {
  gold:   { emoji: '🥇', label: '1st', border: 'border-yellow-400' },
  silver: { emoji: '🥈', label: '2nd', border: 'border-slate-400' },
  bronze: { emoji: '🥉', label: '3rd', border: 'border-orange-600' },
}

export default function PersonalRecords() {
  const navigate = useNavigate()

  // Group PRs by muscle group then exercise
  const byMuscle = mockPRs.reduce<Record<string, typeof mockPRs>>((acc, pr) => {
    const key = pr.muscleGroup ?? 'other'
    acc[key] = acc[key] ?? []
    acc[key].push(pr)
    return acc
  }, {})

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex-1">Personal Records</h1>
        <Trophy size={20} className="text-yellow-500" />
      </div>

      {/* PR Groups */}
      <div className="space-y-5">
        {Object.entries(byMuscle).map(([group, prs]) => {
          const muscleConfig = group !== 'other' ? MUSCLE_CONFIG[group as MuscleGroup] : null

          // Group by exercise
          const byExercise = prs.reduce<Record<string, typeof prs>>((acc, pr) => {
            acc[pr.exerciseName] = acc[pr.exerciseName] ?? []
            acc[pr.exerciseName].push(pr)
            return acc
          }, {})

          return (
            <div key={group}>
              {/* Section header */}
              <div className="flex items-center gap-2 mb-3">
                {muscleConfig && (
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: muscleConfig.color }}
                  />
                )}
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 capitalize">
                  {group}
                </p>
              </div>

              <div className="space-y-3">
                {Object.entries(byExercise).map(([exerciseName, exercisePRs]) => (
                  <div key={exerciseName} className="card p-4">
                    <p className="font-semibold text-slate-900 dark:text-slate-50 mb-3">{exerciseName}</p>

                    <div className="grid grid-cols-1 gap-2">
                      {exercisePRs
                        .sort((a, b) => ['gold', 'silver', 'bronze'].indexOf(a.medal) - ['gold', 'silver', 'bronze'].indexOf(b.medal))
                        .map(pr => {
                          const medal = MEDAL_CONFIG[pr.medal]
                          const displayValue = pr.recordType === 'maxWeight' && pr.valueKg
                            ? `${formatWeight(pr.valueKg, mockUser.preferredWeightUnit)}${pr.reps ? ` × ${pr.reps}` : ''}`
                            : pr.recordType === 'bestVolume' && pr.valueKg
                            ? `${formatWeight(pr.valueKg, mockUser.preferredWeightUnit)} vol`
                            : '—'

                          return (
                            <div
                              key={pr.id}
                              className={`flex items-center gap-3 p-3 rounded-xl border ${medal.border} bg-slate-50 dark:bg-slate-800/50`}
                            >
                              <span className="text-xl shrink-0">{medal.emoji}</span>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                                  {displayValue}
                                </p>
                                <p className="text-[10px] text-slate-400 capitalize">
                                  {pr.recordType.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}
                                </p>
                              </div>
                              <p className="text-xs text-slate-400 shrink-0">
                                {pr.achievedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {mockPRs.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Trophy size={40} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No records yet</p>
            <p className="text-sm mt-1">Complete workouts to set PRs</p>
          </div>
        )}
      </div>
    </div>
  )
}
