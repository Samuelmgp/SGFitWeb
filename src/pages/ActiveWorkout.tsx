import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Plus, Check, MoreHorizontal, Timer, ChevronDown } from 'lucide-react'
import { mockTemplates } from '../data/mockData'
import MuscleGroupBadge from '../components/ui/MuscleGroupBadge'
import Button from '../components/ui/Button'
import type { ExerciseTemplate } from '../types'

interface ActiveSet {
  id: string
  reps: string
  weight: string
  isCompleted: boolean
}

interface ActiveExercise {
  template: ExerciseTemplate
  sets: ActiveSet[]
}

function buildInitialExercises(): ActiveExercise[] {
  const template = mockTemplates[0] // default: Push Day A
  return template.exercises.map(ex => ({
    template: ex,
    sets: ex.setGoals.map((sg, i) => ({
      id: `set-${ex.id}-${i}`,
      reps: String(sg.targetReps ?? ''),
      weight: sg.targetWeightKg ? String(Math.round(sg.targetWeightKg * 2.20462)) : '',
      isCompleted: false,
    })),
  }))
}

export default function ActiveWorkout() {
  const navigate = useNavigate()
  const [exercises, setExercises] = useState<ActiveExercise[]>(buildInitialExercises)
  const [elapsed, setElapsed] = useState(0)
  const [restTimer, setRestTimer] = useState<number | null>(null)
  const [showFinish, setShowFinish] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const restRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Elapsed timer
  useEffect(() => {
    intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  // Rest countdown
  useEffect(() => {
    if (restTimer === null) return
    if (restTimer <= 0) { setRestTimer(null); return }
    restRef.current = setInterval(() => setRestTimer(t => (t ?? 0) - 1), 1000)
    return () => { if (restRef.current) clearInterval(restRef.current) }
  }, [restTimer !== null]) // eslint-disable-line react-hooks/exhaustive-deps

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const toggleSet = (exIdx: number, setIdx: number) => {
    setExercises(prev => {
      const next = [...prev]
      const set = { ...next[exIdx].sets[setIdx] }
      set.isCompleted = !set.isCompleted
      next[exIdx] = { ...next[exIdx], sets: next[exIdx].sets.map((s, i) => i === setIdx ? set : s) }
      return next
    })
    // Start rest timer if completing
    const restSecs = exercises[exIdx]?.template.restSeconds
    if (!exercises[exIdx].sets[setIdx].isCompleted && restSecs) {
      setRestTimer(restSecs)
    }
  }

  const completedSets = exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.isCompleted).length, 0)
  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets.length, 0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* Timer Header */}
      <div className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-4 py-3">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/home')}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="text-center">
            <div className="flex items-center gap-2">
              <Timer size={16} className="text-indigo-400" />
              <span className="text-2xl font-bold font-mono tracking-wider">{formatElapsed(elapsed)}</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{completedSets}/{totalSets} sets</p>
          </div>

          <button className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800 hover:bg-slate-700 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mt-3">
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${totalSets > 0 ? (completedSets / totalSets) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rest Timer Overlay */}
      {restTimer !== null && (
        <div className="fixed inset-0 z-20 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-400 mb-2 text-sm">Rest Timer</p>
            <p className="text-7xl font-bold font-mono text-indigo-400">{restTimer}</p>
            <p className="text-slate-400 mt-1 text-sm">seconds</p>
            <button
              onClick={() => setRestTimer(null)}
              className="mt-6 px-6 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Exercise List */}
      <div className="flex-1 overflow-y-auto max-w-2xl mx-auto w-full px-4 py-4 space-y-4">
        {exercises.map((ex, exIdx) => (
          <div key={ex.template.id} className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">
            {/* Exercise Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
              <MuscleGroupBadge
                muscleGroup={ex.template.muscleGroup}
                exerciseType={ex.template.exerciseType}
                size="md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-50 truncate">{ex.template.name}</p>
                {ex.template.restSeconds && (
                  <p className="text-xs text-slate-500">{ex.template.restSeconds}s rest</p>
                )}
              </div>
              <ChevronDown size={16} className="text-slate-500" />
            </div>

            {/* Set Headers */}
            <div className="grid grid-cols-[32px_1fr_80px_80px] gap-2 px-4 py-2 border-b border-slate-800">
              <div />
              <p className="text-xs font-medium text-slate-500">SET</p>
              <p className="text-xs font-medium text-slate-500 text-center">LBS</p>
              <p className="text-xs font-medium text-slate-500 text-center">REPS</p>
            </div>

            {/* Sets */}
            <div className="divide-y divide-slate-800/60">
              {ex.sets.map((set, setIdx) => (
                <div
                  key={set.id}
                  className={`grid grid-cols-[32px_1fr_80px_80px] gap-2 items-center px-4 py-2.5 transition-colors ${
                    set.isCompleted ? 'bg-indigo-500/5' : ''
                  }`}
                >
                  {/* Complete button */}
                  <button
                    onClick={() => toggleSet(exIdx, setIdx)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      set.isCompleted
                        ? 'bg-indigo-500 border-indigo-500'
                        : 'border-slate-600 hover:border-indigo-400'
                    }`}
                  >
                    {set.isCompleted && <Check size={13} strokeWidth={3} />}
                  </button>

                  {/* Set number */}
                  <span className="text-sm text-slate-400 font-medium">Set {setIdx + 1}</span>

                  {/* Weight */}
                  <input
                    type="number"
                    value={set.weight}
                    onChange={e => {
                      setExercises(prev => {
                        const next = [...prev]
                        next[exIdx] = {
                          ...next[exIdx],
                          sets: next[exIdx].sets.map((s, i) =>
                            i === setIdx ? { ...s, weight: e.target.value } : s
                          ),
                        }
                        return next
                      })
                    }}
                    placeholder="—"
                    className="w-full text-center bg-slate-800 text-slate-100 rounded-lg py-1.5 text-sm outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-600"
                  />

                  {/* Reps */}
                  <input
                    type="number"
                    value={set.reps}
                    onChange={e => {
                      setExercises(prev => {
                        const next = [...prev]
                        next[exIdx] = {
                          ...next[exIdx],
                          sets: next[exIdx].sets.map((s, i) =>
                            i === setIdx ? { ...s, reps: e.target.value } : s
                          ),
                        }
                        return next
                      })
                    }}
                    placeholder="—"
                    className="w-full text-center bg-slate-800 text-slate-100 rounded-lg py-1.5 text-sm outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-600"
                  />
                </div>
              ))}
            </div>

            {/* Add Set */}
            <button className="flex items-center gap-2 px-4 py-3 w-full text-left text-indigo-400 hover:bg-slate-800/40 transition-colors text-sm font-medium">
              <Plus size={15} />
              Add Set
            </button>
          </div>
        ))}

        {/* Add Exercise */}
        <button className="card w-full py-4 flex items-center justify-center gap-2 text-indigo-500 dark:text-indigo-400 border-2 border-dashed border-indigo-500/30 hover:border-indigo-500/60 transition-colors rounded-2xl bg-transparent">
          <Plus size={18} />
          <span className="font-medium text-sm">Add Exercise</span>
        </button>
      </div>

      {/* Finish Button */}
      <div className="sticky bottom-0 px-4 py-4 bg-slate-950 border-t border-slate-800 pb-safe max-w-2xl mx-auto w-full">
        {showFinish ? (
          <div className="flex gap-3">
            <Button variant="ghost" size="lg" fullWidth onClick={() => setShowFinish(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/home')}>
              Save Workout
            </Button>
          </div>
        ) : (
          <Button variant="primary" size="lg" fullWidth onClick={() => setShowFinish(true)}>
            Finish Workout
          </Button>
        )}
      </div>
    </div>
  )
}
