// ─── Enums ────────────────────────────────────────────────────────────────────

export type WeightUnit = 'kg' | 'lbs'
export type ExerciseType = 'strength' | 'cardio'
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core'
export type WorkoutStatus = 'exceeded' | 'targetMet' | 'partial'
export type PRRecordType = 'maxWeight' | 'bestVolume' | 'cardioTime'
export type PRMedal = 'gold' | 'silver' | 'bronze'
export type ScheduledWorkoutStatus = 'planned' | 'completed' | 'skipped'
export type Theme = 'light' | 'dark' | 'system'

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  heightMeters?: number
  bodyWeightKg?: number
  createdAt: Date
  preferredWeightUnit: WeightUnit
  targetWorkoutDaysPerWeek?: number
  targetWorkoutMinutes?: number
}

// ─── Exercise Definitions ─────────────────────────────────────────────────────

export interface ExerciseDefinition {
  id: string
  name: string
  muscleGroup?: MuscleGroup
  equipment?: string
  exerciseType: ExerciseType
  isCustom?: boolean
}

// ─── Set Models ───────────────────────────────────────────────────────────────

/** Planned set inside a WorkoutTemplate exercise */
export interface SetGoal {
  id: string
  order: number
  targetReps?: number
  targetWeightKg?: number // nil = bodyweight
  targetDurationSeconds?: number // cardio
}

/** Actual set performed during a WorkoutSession */
export interface PerformedSet {
  id: string
  order: number
  reps?: number            // distance in meters for cardio
  weightKg?: number        // nil = bodyweight
  durationSeconds?: number // cardio elapsed time
  isCompleted: boolean
  completedAt?: Date
}

// ─── Template Models ──────────────────────────────────────────────────────────

export interface ExerciseTemplate {
  id: string
  name: string
  order: number
  notes?: string
  restSeconds?: number
  setGoals: SetGoal[]
  exerciseDefinitionId?: string
  muscleGroup?: MuscleGroup
  exerciseType: ExerciseType
}

export interface WorkoutTemplate {
  id: string
  name: string
  notes?: string
  targetDurationMinutes?: number
  createdAt: Date
  updatedAt: Date
  exercises: ExerciseTemplate[]
}

// ─── Session Models ───────────────────────────────────────────────────────────

export interface ExerciseSession {
  id: string
  name: string
  order: number
  notes?: string
  effort?: number // 1–10 scale
  restSeconds?: number
  performedSets: PerformedSet[]
  exerciseDefinitionId?: string
  exerciseType: ExerciseType
  muscleGroup?: MuscleGroup
}

export interface WorkoutSession {
  id: string
  name: string
  notes?: string
  startedAt: Date
  completedAt?: Date
  targetDurationMinutes?: number
  isManualEntry: boolean
  status?: WorkoutStatus
  hasPRs?: boolean
  exercises: ExerciseSession[]
}

// ─── Personal Records ─────────────────────────────────────────────────────────

export interface PersonalRecord {
  id: string
  exerciseDefinitionId: string
  exerciseName: string
  recordType: PRRecordType
  medal: PRMedal
  valueKg?: number
  reps?: number
  distanceMeters?: number
  durationSeconds?: number
  achievedAt: Date
  muscleGroup?: MuscleGroup
}

// ─── Badges ───────────────────────────────────────────────────────────────────

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
}

export interface BadgeAward {
  id: string
  badgeId: string
  badge: Badge
  awardedAt: Date
}

// ─── Scheduled Workouts ───────────────────────────────────────────────────────

export interface ScheduledWorkout {
  id: string
  date: Date
  status: ScheduledWorkoutStatus
  templateId?: string
  sessionId?: string
  templateName?: string
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────

export interface DayData {
  date: Date
  session?: WorkoutSession
  status?: WorkoutStatus
  hasPRs: boolean
  muscleGroups: MuscleGroup[]
}
