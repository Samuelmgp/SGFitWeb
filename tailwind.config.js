/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Muscle group colors (matching iOS app)
        muscle: {
          chest: '#3b82f6',      // blue-500
          back: '#22c55e',       // green-500
          legs: '#f97316',       // orange-500
          shoulders: '#a855f7',  // purple-500
          arms: '#ef4444',       // red-500
          core: '#f59e0b',       // amber-500
        },
        // Workout status colors
        status: {
          exceeded: '#a855f7',   // purple
          met: '#22c55e',        // green
          partial: '#eab308',    // yellow
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
