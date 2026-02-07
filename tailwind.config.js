/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-navy': '#0F172A',
                'primary-blue': '#4F46E5',
                'primary-sky': '#60A5FA',
                'success': '#10B981',
                'warning': '#F59E0B',
                'error': '#EF4444',
                'text-primary': '#334155',
                'text-secondary': '#64748B',
                'bg-primary': '#F8FAFC',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'wave': 'wave 1.2s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                wave: {
                    '0%, 100%': { height: '20%' },
                    '50%': { height: '100%' },
                },
            },
        },
    },
    plugins: [],
}