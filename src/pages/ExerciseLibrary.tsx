import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Plus } from 'lucide-react'
import { mockExercises } from '../data/mockData'
import MuscleGroupBadge, { MUSCLE_CONFIG } from '../components/ui/MuscleGroupBadge'
import Button from '../components/ui/Button'
import type { MuscleGroup, ExerciseType } from '../types'

const MUSCLE_FILTERS: Array<MuscleGroup | 'all'> = ['all', 'chest', 'back', 'legs', 'shoulders', 'arms', 'core']
const TYPE_FILTERS: Array<ExerciseType | 'all'> = ['all', 'strength', 'cardio']

export default function ExerciseLibrary() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<ExerciseType | 'all'>('all')

  const filtered = mockExercises.filter(ex => {
    const matchesQuery = ex.name.toLowerCase().includes(query.toLowerCase())
    const matchesMuscle = muscleFilter === 'all' || ex.muscleGroup === muscleFilter
    const matchesType = typeFilter === 'all' || ex.exerciseType === typeFilter
    return matchesQuery && matchesMuscle && matchesType
  })

  // Group by muscle group
  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, ex) => {
    const key = ex.muscleGroup ?? ex.exerciseType
    acc[key] = acc[key] ?? []
    acc[key].push(ex)
    return acc
  }, {})

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={18} className="text-slate-600 dark:text-slate-300" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex-1">Exercise Library</h1>
        <Button variant="primary" size="sm" Icon={Plus}>
          New
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          className="input pl-10"
          placeholder="Search exercises…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
        {TYPE_FILTERS.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors capitalize ${
              typeFilter === t
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t === 'all' ? 'All Types' : t}
          </button>
        ))}
      </div>

      {/* Muscle Filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {MUSCLE_FILTERS.map(mg => {
          const config = mg !== 'all' ? MUSCLE_CONFIG[mg] : null
          return (
            <button
              key={mg}
              onClick={() => setMuscleFilter(mg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors capitalize ${
                muscleFilter === mg ? 'text-white' : 'text-slate-600 dark:text-slate-400'
              }`}
              style={
                muscleFilter === mg && config
                  ? { backgroundColor: config.color }
                  : muscleFilter === mg
                  ? { backgroundColor: '#6366f1' }
                  : { backgroundColor: config ? config.bg : 'transparent', border: '1px solid transparent' }
              }
            >
              {mg === 'all' ? 'All' : mg}
            </button>
          )
        })}
      </div>

      {/* Exercise List */}
      <div className="space-y-5">
        {Object.entries(grouped).map(([group, exercises]) => (
          <div key={group}>
            <p className="section-header capitalize">{group}</p>
            <div className="card divide-y divide-slate-100 dark:divide-slate-700/50">
              {exercises.map(ex => (
                <button
                  key={ex.id}
                  className="flex items-center gap-3 px-4 py-3.5 w-full text-left hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                >
                  <MuscleGroupBadge
                    muscleGroup={ex.muscleGroup}
                    exerciseType={ex.exerciseType}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">{ex.name}</p>
                    {ex.equipment && (
                      <p className="text-xs text-slate-400 dark:text-slate-500">{ex.equipment}</p>
                    )}
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    ex.exerciseType === 'cardio'
                      ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                      : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                  }`}>
                    {ex.exerciseType}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p className="text-sm">No exercises found</p>
          </div>
        )}
      </div>
    </div>
  )
}
