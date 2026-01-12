/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    600: '#2563eb',
                    700: '#1d4ed8',
                },
                gray: colors.gray,
            }
        },
    },
    plugins: [],
}
