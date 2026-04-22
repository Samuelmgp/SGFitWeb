import type {
  User,
  ExerciseDefinition,
  WorkoutTemplate,
  WorkoutSession,
  PersonalRecord,
  Badge,
  BadgeAward,
} from '../types'

// ─── Mock User ────────────────────────────────────────────────────────────────

export const mockUser: User = {
  id: 'user-1',
  name: 'Sam',
  heightMeters: 1.8,
  bodyWeightKg: 82,
  createdAt: new Date('2024-01-15'),
  preferredWeightUnit: 'lbs',
  targetWorkoutDaysPerWeek: 5,
  targetWorkoutMinutes: 60,
}

// ─── Exercise Definitions ─────────────────────────────────────────────────────

export const mockExercises: ExerciseDefinition[] = [
  // Chest
  { id: 'ex-1', name: 'Barbell Bench Press', muscleGroup: 'chest', equipment: 'Barbell', exerciseType: 'strength' },
  { id: 'ex-2', name: 'Dumbbell Fly', muscleGroup: 'chest', equipment: 'Dumbbells', exerciseType: 'strength' },
  { id: 'ex-3', name: 'Incline Bench Press', muscleGroup: 'chest', equipment: 'Barbell', exerciseType: 'strength' },
  { id: 'ex-4', name: 'Cable Crossover', muscleGroup: 'chest', equipment: 'Cable', exerciseType: 'strength' },
  // Back
  { id: 'ex-5', name: 'Pull-Up', muscleGroup: 'back', equipment: 'Bodyweight', exerciseType: 'strength' },
  { id: 'ex-6', name: 'Seated Cable Row', muscleGroup: 'back', equipment: 'Cable', exerciseType: 'strength' },
  { id: 'ex-7', name: 'Barbell Deadlift', muscleGroup: 'back', equipment: 'Barbell', exerciseType: 'strength' },
  { id: 'ex-8', name: 'Lat Pulldown', muscleGroup: 'back', equipment: 'Cable', exerciseType: 'strength' },
  // Legs
  { id: 'ex-9', name: 'Barbell Squat', muscleGroup: 'legs', equipment: 'Barbell', exerciseType: 'strength' },
  { id: 'ex-10', name: 'Romanian Deadlift', muscleGroup: 'legs', equipment: 'Barbell', exerciseType: 'strength' },
  { id: 'ex-11', name: 'Leg Press', muscleGroup: 'legs', equipment: 'Machine', exerciseType: 'strength' },
  { id: 'ex-12', name: 'Walking Lunge', muscleGroup: 'legs', equipment: 'Dumbbells', exerciseType: 'strength' },
  // Shoulders
  { id: 'ex-13', name: 'Overhead Press', muscleGroup: 'shoulders', equipment: 'Barbell', exerciseType: 'strength' },
  { id: 'ex-14', name: 'Lateral Raise', muscleGroup: 'shoulders', equipment: 'Dumbbells', exerciseType: 'strength' },
  { id: 'ex-15', name: 'Face Pull', muscleGroup: 'shoulders', equipment: 'Cable', exerciseType: 'strength' },
  // Arms
  { id: 'ex-16', name: 'Barbell Curl', muscleGroup: 'arms', equipment: 'Barbell', exerciseType: 'strength' },
  { id: 'ex-17', name: 'Tricep Pushdown', muscleGroup: 'arms', equipment: 'Cable', exerciseType: 'strength' },
  { id: 'ex-18', name: 'Hammer Curl', muscleGroup: 'arms', equipment: 'Dumbbells', exerciseType: 'strength' },
  // Core
  { id: 'ex-19', name: 'Plank', muscleGroup: 'core', equipment: 'Bodyweight', exerciseType: 'strength' },
  { id: 'ex-20', name: 'Russian Twist', muscleGroup: 'core', equipment: 'Bodyweight', exerciseType: 'strength' },
  { id: 'ex-21', name: 'Cable Crunch', muscleGroup: 'core', equipment: 'Cable', exerciseType: 'strength' },
  // Cardio
  { id: 'ex-22', name: 'Treadmill Run', exerciseType: 'cardio', equipment: 'Machine' },
  { id: 'ex-23', name: 'Rowing Machine', muscleGroup: 'back', exerciseType: 'cardio', equipment: 'Machine' },
  { id: 'ex-24', name: 'Stationary Bike', muscleGroup: 'legs', exerciseType: 'cardio', equipment: 'Machine' },
]

// ─── Workout Templates ────────────────────────────────────────────────────────

export const mockTemplates: WorkoutTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Push Day A',
    notes: 'Chest, shoulders, triceps',
    targetDurationMinutes: 60,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-10'),
    exercises: [
      {
        id: 'et-1', name: 'Barbell Bench Press', order: 0, exerciseType: 'strength',
        muscleGroup: 'chest', exerciseDefinitionId: 'ex-1', restSeconds: 120,
        setGoals: [
          { id: 'sg-1', order: 0, targetReps: 5, targetWeightKg: 100 },
          { id: 'sg-2', order: 1, targetReps: 5, targetWeightKg: 100 },
          { id: 'sg-3', order: 2, targetReps: 5, targetWeightKg: 100 },
        ],
      },
      {
        id: 'et-2', name: 'Overhead Press', order: 1, exerciseType: 'strength',
        muscleGroup: 'shoulders', exerciseDefinitionId: 'ex-13', restSeconds: 90,
        setGoals: [
          { id: 'sg-4', order: 0, targetReps: 8, targetWeightKg: 60 },
          { id: 'sg-5', order: 1, targetReps: 8, targetWeightKg: 60 },
          { id: 'sg-6', order: 2, targetReps: 8, targetWeightKg: 60 },
        ],
      },
      {
        id: 'et-3', name: 'Lateral Raise', order: 2, exerciseType: 'strength',
        muscleGroup: 'shoulders', exerciseDefinitionId: 'ex-14', restSeconds: 60,
        setGoals: [
          { id: 'sg-7', order: 0, targetReps: 12, targetWeightKg: 14 },
          { id: 'sg-8', order: 1, targetReps: 12, targetWeightKg: 14 },
          { id: 'sg-9', order: 2, targetReps: 12, targetWeightKg: 14 },
        ],
      },
      {
        id: 'et-4', name: 'Tricep Pushdown', order: 3, exerciseType: 'strength',
        muscleGroup: 'arms', exerciseDefinitionId: 'ex-17', restSeconds: 60,
        setGoals: [
          { id: 'sg-10', order: 0, targetReps: 12, targetWeightKg: 30 },
          { id: 'sg-11', order: 1, targetReps: 12, targetWeightKg: 30 },
          { id: 'sg-12', order: 2, targetReps: 12, targetWeightKg: 30 },
        ],
      },
    ],
  },
  {
    id: 'tmpl-2',
    name: 'Pull Day A',
    notes: 'Back and biceps',
    targetDurationMinutes: 55,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-03-10'),
    exercises: [
      {
        id: 'et-5', name: 'Pull-Up', order: 0, exerciseType: 'strength',
        muscleGroup: 'back', exerciseDefinitionId: 'ex-5', restSeconds: 120,
        setGoals: [
          { id: 'sg-13', order: 0, targetReps: 8 },
          { id: 'sg-14', order: 1, targetReps: 8 },
          { id: 'sg-15', order: 2, targetReps: 8 },
        ],
      },
      {
        id: 'et-6', name: 'Barbell Deadlift', order: 1, exerciseType: 'strength',
        muscleGroup: 'back', exerciseDefinitionId: 'ex-7', restSeconds: 180,
        setGoals: [
          { id: 'sg-16', order: 0, targetReps: 5, targetWeightKg: 140 },
          { id: 'sg-17', order: 1, targetReps: 5, targetWeightKg: 140 },
          { id: 'sg-18', order: 2, targetReps: 3, targetWeightKg: 150 },
        ],
      },
      {
        id: 'et-7', name: 'Seated Cable Row', order: 2, exerciseType: 'strength',
        muscleGroup: 'back', exerciseDefinitionId: 'ex-6', restSeconds: 90,
        setGoals: [
          { id: 'sg-19', order: 0, targetReps: 10, targetWeightKg: 60 },
          { id: 'sg-20', order: 1, targetReps: 10, targetWeightKg: 60 },
          { id: 'sg-21', order: 2, targetReps: 10, targetWeightKg: 60 },
        ],
      },
      {
        id: 'et-8', name: 'Barbell Curl', order: 3, exerciseType: 'strength',
        muscleGroup: 'arms', exerciseDefinitionId: 'ex-16', restSeconds: 60,
        setGoals: [
          { id: 'sg-22', order: 0, targetReps: 10, targetWeightKg: 35 },
          { id: 'sg-23', order: 1, targetReps: 10, targetWeightKg: 35 },
          { id: 'sg-24', order: 2, targetReps: 10, targetWeightKg: 35 },
        ],
      },
    ],
  },
  {
    id: 'tmpl-3',
    name: 'Leg Day A',
    notes: 'Quads, hamstrings, glutes',
    targetDurationMinutes: 65,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-02-28'),
    exercises: [
      {
        id: 'et-9', name: 'Barbell Squat', order: 0, exerciseType: 'strength',
        muscleGroup: 'legs', exerciseDefinitionId: 'ex-9', restSeconds: 180,
        setGoals: [
          { id: 'sg-25', order: 0, targetReps: 5, targetWeightKg: 120 },
          { id: 'sg-26', order: 1, targetReps: 5, targetWeightKg: 120 },
          { id: 'sg-27', order: 2, targetReps: 5, targetWeightKg: 120 },
        ],
      },
      {
        id: 'et-10', name: 'Romanian Deadlift', order: 1, exerciseType: 'strength',
        muscleGroup: 'legs', exerciseDefinitionId: 'ex-10', restSeconds: 120,
        setGoals: [
          { id: 'sg-28', order: 0, targetReps: 8, targetWeightKg: 90 },
          { id: 'sg-29', order: 1, targetReps: 8, targetWeightKg: 90 },
          { id: 'sg-30', order: 2, targetReps: 8, targetWeightKg: 90 },
        ],
      },
      {
        id: 'et-11', name: 'Leg Press', order: 2, exerciseType: 'strength',
        muscleGroup: 'legs', exerciseDefinitionId: 'ex-11', restSeconds: 90,
        setGoals: [
          { id: 'sg-31', order: 0, targetReps: 12, targetWeightKg: 150 },
          { id: 'sg-32', order: 1, targetReps: 12, targetWeightKg: 150 },
          { id: 'sg-33', order: 2, targetReps: 12, targetWeightKg: 150 },
        ],
      },
    ],
  },
  {
    id: 'tmpl-4',
    name: 'Full Body',
    notes: 'Compound movements only',
    targetDurationMinutes: 50,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-04-01'),
    exercises: [
      {
        id: 'et-12', name: 'Barbell Squat', order: 0, exerciseType: 'strength',
        muscleGroup: 'legs', exerciseDefinitionId: 'ex-9', restSeconds: 120,
        setGoals: [
          { id: 'sg-34', order: 0, targetReps: 5, targetWeightKg: 100 },
          { id: 'sg-35', order: 1, targetReps: 5, targetWeightKg: 100 },
        ],
      },
      {
        id: 'et-13', name: 'Barbell Bench Press', order: 1, exerciseType: 'strength',
        muscleGroup: 'chest', exerciseDefinitionId: 'ex-1', restSeconds: 120,
        setGoals: [
          { id: 'sg-36', order: 0, targetReps: 5, targetWeightKg: 90 },
          { id: 'sg-37', order: 1, targetReps: 5, targetWeightKg: 90 },
        ],
      },
      {
        id: 'et-14', name: 'Pull-Up', order: 2, exerciseType: 'strength',
        muscleGroup: 'back', exerciseDefinitionId: 'ex-5', restSeconds: 90,
        setGoals: [
          { id: 'sg-38', order: 0, targetReps: 8 },
          { id: 'sg-39', order: 1, targetReps: 8 },
        ],
      },
      {
        id: 'et-15', name: 'Overhead Press', order: 3, exerciseType: 'strength',
        muscleGroup: 'shoulders', exerciseDefinitionId: 'ex-13', restSeconds: 90,
        setGoals: [
          { id: 'sg-40', order: 0, targetReps: 8, targetWeightKg: 55 },
          { id: 'sg-41', order: 1, targetReps: 8, targetWeightKg: 55 },
        ],
      },
      {
        id: 'et-16', name: 'Plank', order: 4, exerciseType: 'strength',
        muscleGroup: 'core', exerciseDefinitionId: 'ex-19', restSeconds: 60,
        setGoals: [
          { id: 'sg-42', order: 0, targetDurationSeconds: 60 },
          { id: 'sg-43', order: 1, targetDurationSeconds: 60 },
        ],
      },
    ],
  },
]

// ─── Recent Sessions ──────────────────────────────────────────────────────────

const d = (daysAgo: number, hour = 9) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  date.setHours(hour, 0, 0, 0)
  return date
}

export const mockSessions: WorkoutSession[] = [
  {
    id: 'sess-1',
    name: 'Push Day A',
    startedAt: d(0, 8),
    completedAt: d(0, 9),
    targetDurationMinutes: 60,
    isManualEntry: false,
    status: 'targetMet',
    hasPRs: false,
    exercises: [
      {
        id: 'es-1', name: 'Barbell Bench Press', order: 0, exerciseType: 'strength',
        muscleGroup: 'chest', exerciseDefinitionId: 'ex-1',
        performedSets: [
          { id: 'ps-1', order: 0, reps: 5, weightKg: 102.5, isCompleted: true },
          { id: 'ps-2', order: 1, reps: 5, weightKg: 102.5, isCompleted: true },
          { id: 'ps-3', order: 2, reps: 4, weightKg: 102.5, isCompleted: true },
        ],
      },
      {
        id: 'es-2', name: 'Overhead Press', order: 1, exerciseType: 'strength',
        muscleGroup: 'shoulders', exerciseDefinitionId: 'ex-13',
        performedSets: [
          { id: 'ps-4', order: 0, reps: 8, weightKg: 62.5, isCompleted: true },
          { id: 'ps-5', order: 1, reps: 7, weightKg: 62.5, isCompleted: true },
          { id: 'ps-6', order: 2, reps: 6, weightKg: 62.5, isCompleted: true },
        ],
      },
    ],
  },
  {
    id: 'sess-2',
    name: 'Pull Day A',
    startedAt: d(2, 8),
    completedAt: d(2, 9),
    targetDurationMinutes: 55,
    isManualEntry: false,
    status: 'exceeded',
    hasPRs: true,
    exercises: [
      {
        id: 'es-3', name: 'Barbell Deadlift', order: 0, exerciseType: 'strength',
        muscleGroup: 'back', exerciseDefinitionId: 'ex-7',
        performedSets: [
          { id: 'ps-7', order: 0, reps: 5, weightKg: 152.5, isCompleted: true },
          { id: 'ps-8', order: 1, reps: 5, weightKg: 152.5, isCompleted: true },
          { id: 'ps-9', order: 2, reps: 3, weightKg: 160, isCompleted: true },
        ],
      },
    ],
  },
  {
    id: 'sess-3',
    name: 'Leg Day A',
    startedAt: d(4, 17),
    completedAt: d(4, 18),
    targetDurationMinutes: 65,
    isManualEntry: false,
    status: 'partial',
    hasPRs: false,
    exercises: [
      {
        id: 'es-4', name: 'Barbell Squat', order: 0, exerciseType: 'strength',
        muscleGroup: 'legs', exerciseDefinitionId: 'ex-9',
        performedSets: [
          { id: 'ps-10', order: 0, reps: 5, weightKg: 122.5, isCompleted: true },
          { id: 'ps-11', order: 1, reps: 5, weightKg: 122.5, isCompleted: true },
          { id: 'ps-12', order: 2, reps: 5, weightKg: 122.5, isCompleted: true },
        ],
      },
    ],
  },
  {
    id: 'sess-4',
    name: 'Full Body',
    startedAt: d(6, 9),
    completedAt: d(6, 10),
    targetDurationMinutes: 50,
    isManualEntry: false,
    status: 'targetMet',
    hasPRs: false,
    exercises: [],
  },
  {
    id: 'sess-5',
    name: 'Push Day A',
    startedAt: d(9, 8),
    completedAt: d(9, 9),
    targetDurationMinutes: 60,
    isManualEntry: false,
    status: 'targetMet',
    hasPRs: false,
    exercises: [],
  },
  {
    id: 'sess-6',
    name: 'Pull Day A',
    startedAt: d(11, 17),
    completedAt: d(11, 19),
    targetDurationMinutes: 55,
    isManualEntry: false,
    status: 'exceeded',
    hasPRs: true,
    exercises: [],
  },
  {
    id: 'sess-7',
    name: 'Leg Day A',
    startedAt: d(13, 8),
    completedAt: d(13, 9),
    targetDurationMinutes: 65,
    isManualEntry: false,
    status: 'targetMet',
    hasPRs: false,
    exercises: [],
  },
]

// ─── Personal Records ─────────────────────────────────────────────────────────

export const mockPRs: PersonalRecord[] = [
  { id: 'pr-1', exerciseDefinitionId: 'ex-7', exerciseName: 'Barbell Deadlift', recordType: 'maxWeight', medal: 'gold', valueKg: 160, reps: 3, achievedAt: d(2), muscleGroup: 'back' },
  { id: 'pr-2', exerciseDefinitionId: 'ex-7', exerciseName: 'Barbell Deadlift', recordType: 'maxWeight', medal: 'silver', valueKg: 152.5, reps: 5, achievedAt: d(11), muscleGroup: 'back' },
  { id: 'pr-3', exerciseDefinitionId: 'ex-7', exerciseName: 'Barbell Deadlift', recordType: 'maxWeight', medal: 'bronze', valueKg: 140, reps: 5, achievedAt: d(30), muscleGroup: 'back' },
  { id: 'pr-4', exerciseDefinitionId: 'ex-1', exerciseName: 'Barbell Bench Press', recordType: 'maxWeight', medal: 'gold', valueKg: 110, reps: 3, achievedAt: d(20), muscleGroup: 'chest' },
  { id: 'pr-5', exerciseDefinitionId: 'ex-9', exerciseName: 'Barbell Squat', recordType: 'maxWeight', medal: 'gold', valueKg: 130, reps: 3, achievedAt: d(15), muscleGroup: 'legs' },
  { id: 'pr-6', exerciseDefinitionId: 'ex-13', exerciseName: 'Overhead Press', recordType: 'bestVolume', medal: 'gold', valueKg: 375, reps: 24, achievedAt: d(2), muscleGroup: 'shoulders' },
]

// ─── Badges ───────────────────────────────────────────────────────────────────

export const mockBadges: Badge[] = [
  { id: 'badge-1', name: 'First Rep', description: 'Completed your first workout', icon: '🏋️' },
  { id: 'badge-2', name: 'Week Warrior', description: 'Worked out 5 days in a week', icon: '🔥' },
  { id: 'badge-3', name: 'Century', description: 'Completed 100 workouts', icon: '💯' },
  { id: 'badge-4', name: 'Iron Will', description: 'Maintained a 30-day streak', icon: '⚡' },
]

export const mockBadgeAwards: BadgeAward[] = [
  { id: 'ba-1', badgeId: 'badge-1', badge: mockBadges[0], awardedAt: new Date('2024-01-15') },
  { id: 'ba-2', badgeId: 'badge-2', badge: mockBadges[1], awardedAt: new Date('2024-02-03') },
]

// ─── Year Grid Data ───────────────────────────────────────────────────────────

/** Generate 365 days of mock contribution data for the year grid */
export function generateYearData() {
  const days: Array<{ date: Date; status?: WorkoutSession['status']; hasPRs: boolean }> = []
  const now = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    const dayOfWeek = date.getDay() // 0=Sun, 6=Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Simulate ~5 workouts/week on weekdays with some variation
    const rand = Math.random()
    let status: WorkoutSession['status'] | undefined
    let hasPRs = false

    if (!isWeekend && rand > 0.2) {
      if (rand > 0.85) { status = 'exceeded'; hasPRs = Math.random() > 0.6 }
      else if (rand > 0.4) { status = 'targetMet' }
      else { status = 'partial' }
    } else if (isWeekend && rand > 0.75) {
      status = rand > 0.9 ? 'exceeded' : 'targetMet'
    }

    days.push({ date, status, hasPRs })
  }

  // Override the last 7 days with the mock sessions
  const recentDays = [0, 2, 4, 6, 9, 11, 13]
  const recentStatuses: WorkoutSession['status'][] = ['targetMet', 'exceeded', 'partial', 'targetMet', 'targetMet', 'exceeded', 'targetMet']
  const recentPRs = [false, true, false, false, false, true, false]

  recentDays.forEach((daysAgo, idx) => {
    const entry = days[days.length - 1 - daysAgo]
    if (entry) {
      entry.status = recentStatuses[idx]
      entry.hasPRs = recentPRs[idx]
    }
  })

  return days
}
