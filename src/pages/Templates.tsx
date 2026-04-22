import { useState } from 'react'
import { Plus, Search, Clock, ChevronRight } from 'lucide-react'
import { mockTemplates } from '../data/mockData'
import MuscleGroupBadge from '../components/ui/MuscleGroupBadge'
import Button from '../components/ui/Button'
import type { MuscleGroup } from '../types'

export default function Templates() {
  const [query, setQuery] = useState('')

  const filtered = mockTemplates.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Templates</h1>
        <Button variant="primary" size="sm" Icon={Plus}>
          New
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          className="input pl-10"
          placeholder="Search templates…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Template List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 dark:text-slate-500">
            <p className="text-sm">No templates found</p>
          </div>
        )}
        {filtered.map(template => {
          const muscleGroups = [...new Set(
            template.exercises.map(e => e.muscleGroup).filter((g): g is MuscleGroup => g != null)
          )]

          return (
            <button
              key={template.id}
              className="card w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/40 active:scale-[0.99] transition-all"
            >
              <div className="flex items-start gap-3">
                {/* Badge for first muscle group */}
                <MuscleGroupBadge
                  muscleGroup={template.exercises[0]?.muscleGroup}
                  exerciseType={template.exercises[0]?.exerciseType}
                  size="lg"
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-slate-50">{template.name}</p>
                  {template.notes && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">
                      {template.notes}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {template.exercises.length} exercises
                    </span>
                    {template.targetDurationMinutes && (
                      <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock size={11} />
                        {template.targetDurationMinutes} min
                      </span>
                    )}
                  </div>

                  {/* Muscle group pills */}
                  {muscleGroups.length > 0 && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {muscleGroups.map(mg => (
                        <span
                          key={mg}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full capitalize"
                          style={{
                            backgroundColor: getMuscleColor(mg, 0.12),
                            color: getMuscleColor(mg, 1),
                          }}
                        >
                          {mg}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 shrink-0 mt-1" />
              </div>

              {/* Exercise preview */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {template.exercises.slice(0, 5).map(ex => (
                    <div key={ex.id} className="flex items-center gap-1.5 shrink-0">
                      <MuscleGroupBadge muscleGroup={ex.muscleGroup} exerciseType={ex.exerciseType} size="sm" />
                      <span className="text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {ex.name}
                      </span>
                    </div>
                  ))}
                  {template.exercises.length > 5 && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 self-center shrink-0">
                      +{template.exercises.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function getMuscleColor(mg: MuscleGroup, alpha: number): string {
  const colors: Record<MuscleGroup, string> = {
    chest:     `rgba(59,130,246,${alpha})`,
    back:      `rgba(34,197,94,${alpha})`,
    legs:      `rgba(249,115,22,${alpha})`,
    shoulders: `rgba(168,85,247,${alpha})`,
    arms:      `rgba(239,68,68,${alpha})`,
    core:      `rgba(245,158,11,${alpha})`,
  }
  return colors[mg]
}
