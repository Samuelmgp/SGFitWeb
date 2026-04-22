import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  sub?: string
  Icon: LucideIcon
  iconColor?: string
  iconBg?: string
}

export default function StatCard({ label, value, sub, Icon, iconColor = '#6366f1', iconBg = 'rgba(99,102,241,0.12)' }: StatCardProps) {
  return (
    <div className="card px-4 py-3 flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={18} color={iconColor} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-base font-bold text-slate-900 dark:text-slate-50 leading-tight">{value}</p>
        {sub && <p className="text-xs text-slate-400 dark:text-slate-500">{sub}</p>}
      </div>
    </div>
  )
}
