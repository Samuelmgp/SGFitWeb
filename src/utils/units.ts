import type { WeightUnit } from '../types'

const KG_TO_LBS = 2.20462262

/** Convert kg value to the user's preferred unit for display */
export function fromKilograms(kg: number, unit: WeightUnit): number {
  return unit === 'lbs' ? kg * KG_TO_LBS : kg
}

/** Convert a displayed value back to kg for storage */
export function toKilograms(value: number, unit: WeightUnit): number {
  return unit === 'lbs' ? value / KG_TO_LBS : value
}

/** Format a weight value with unit label */
export function formatWeight(kg: number, unit: WeightUnit, decimals = 1): string {
  const converted = fromKilograms(kg, unit)
  return `${converted % 1 === 0 ? converted.toFixed(0) : converted.toFixed(decimals)} ${unit}`
}

/** Format a height in meters to display string */
export function formatHeight(meters: number, unit: WeightUnit): string {
  if (unit === 'lbs') {
    const totalInches = meters / 0.0254
    const feet = Math.floor(totalInches / 12)
    const inches = Math.round(totalInches % 12)
    return `${feet}'${inches}"`
  }
  return `${Math.round(meters * 100)} cm`
}

/** Format seconds to mm:ss */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Format minutes to human-readable string (e.g. "1h 23m" or "45 min") */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

/** Format distance in meters to km or m */
export function formatDistance(meters: number): string {
  return meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`
}

/** Get duration of a session in minutes */
export function sessionDurationMinutes(session: { startedAt: Date; completedAt?: Date }): number {
  const end = session.completedAt ?? new Date()
  return Math.round((end.getTime() - session.startedAt.getTime()) / 60000)
}

/** Format a date relative to today */
export function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
