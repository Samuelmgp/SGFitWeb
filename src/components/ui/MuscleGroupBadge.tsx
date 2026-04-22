import {
  Dumbbell,
  Activity,
  type LucideIcon,
} from 'lucide-react'
import type { MuscleGroup, ExerciseType } from '../../types'

const MUSCLE_CONFIG: Record<MuscleGroup, { color: string; bg: string; label: string }> = {
  chest:     { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)',  label: 'Chest' },
  back:      { color: '#22c55e', bg: 'rgba(34,197,94,0.15)',   label: 'Back' },
  legs:      { color: '#f97316', bg: 'rgba(249,115,22,0.15)',  label: 'Legs' },
  shoulders: { color: '#a855f7', bg: 'rgba(168,85,247,0.15)',  label: 'Shoulders' },
  arms:      { color: '#ef4444', bg: 'rgba(239,68,68,0.15)',   label: 'Arms' },
  core:      { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'Core' },
}

const SIZE_MAP = {
  sm: { box: 28, icon: 14 },
  md: { box: 36, icon: 18 },
  lg: { box: 44, icon: 22 },
}

interface MuscleGroupBadgeProps {
  muscleGroup?: MuscleGroup
  exerciseType?: ExerciseType
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function MuscleGroupBadge({
  muscleGroup,
  exerciseType = 'strength',
  size = 'md',
  className = '',
}: MuscleGroupBadgeProps) {
  const { box, icon } = SIZE_MAP[size]
  const config = muscleGroup ? MUSCLE_CONFIG[muscleGroup] : null

  const color = config?.color ?? (exerciseType === 'cardio' ? '#f97316' : '#6366f1')
  const bg = config?.bg ?? (exerciseType === 'cardio' ? 'rgba(249,115,22,0.15)' : 'rgba(99,102,241,0.15)')
  const Icon: LucideIcon = exerciseType === 'cardio' ? Activity : Dumbbell

  return (
    <div
      className={`rounded-xl flex items-center justify-center shrink-0 ${className}`}
      style={{ width: box, height: box, backgroundColor: bg }}
    >
      <Icon size={icon} color={color} strokeWidth={2} />
    </div>
  )
}

export { MUSCLE_CONFIG }
