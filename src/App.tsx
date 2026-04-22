import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import AppShell from './components/layout/AppShell'
import Home from './pages/Home'
import Templates from './pages/Templates'
import History from './pages/History'
import Profile from './pages/Profile'
import ActiveWorkout from './pages/ActiveWorkout'
import ExerciseLibrary from './pages/ExerciseLibrary'
import PersonalRecords from './pages/PersonalRecords'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Full-screen routes (no tab bar) */}
          <Route path="/workout/active" element={<ActiveWorkout />} />

          {/* Main app shell with tab navigation */}
          <Route element={<AppShell />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/exercise-library" element={<ExerciseLibrary />} />
            <Route path="/profile/personal-records" element={<PersonalRecords />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
