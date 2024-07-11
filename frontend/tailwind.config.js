/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,html}'],
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        extend: {
            fontSize: {
                '2xl': '1.75rem',
                '3xl': '2rem',
            },

            colors: {
                background: 'var(--background-body)',
                'text-primary': 'var(--text-main)',
                'text-secondary': 'var(--text-secondary)',
                'd-background': 'var(--dark-background-body)',
                'd-text-primary': 'var(--dark-text-main)',
                'd-text-secondary': 'var(--dark-text-secondary)',
                primary: 'var(--primary-color)',
                gray: colors.gray,
            },
        },
        fontFamily: {
            serif: ['Merriweather", "serif'],
            sans: ['Fira Sans', 'sans-serif'],
            bebas: ['"Bebas Neue"', ...defaultTheme.fontFamily.sans],
        },
        screens: {
            xs: '340px',
            // => @media (min-width: 340px) { ... }

            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: [],
}
