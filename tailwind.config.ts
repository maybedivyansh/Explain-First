import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F172A', // slate-900
                    navy: '#0F172A', // slate-900
                    foreground: '#F8FAFC',
                },
                accent: {
                    DEFAULT: '#4F46E5', // indigo-600
                    hover: '#4338CA',
                    light: '#E0E7FF',
                },
                success: {
                    DEFAULT: '#10B981', // emerald-500
                    light: '#ECFDF5',
                },
                warning: {
                    DEFAULT: '#F59E0B', // amber-500
                    light: '#FFFBEB',
                },
                error: {
                    DEFAULT: '#EF4444', // red-500
                    light: '#FEF2F2',
                },
                background: '#F8FAFC', // slate-50
                text: {
                    primary: '#334155', // slate-700
                    secondary: '#64748B', // slate-500
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
