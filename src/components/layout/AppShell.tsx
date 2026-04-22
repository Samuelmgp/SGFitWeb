import { Outlet } from 'react-router-dom'
import TabBar from './TabBar'

export default function AppShell() {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop sidebar */}
      <TabBar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
        <Outlet />
      </main>
    </div>
  )
}
