/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './controllers/**/*.{js,ts,jsx,tsx}',
    './examples/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: 'var(--theme-primary)',
      'primary-light': 'var(--theme-primary-light)',
      'primary-dark': 'var(--theme-primary-dark)',
      secondary: 'var(--theme-secondary)',
      'secondary-light': 'var(--theme-secondary-light)',
      'secondary-dark': 'var(--theme-secondary-dark)',
      accent: 'var(--theme-accent)',
      'accent-light': 'var(--theme-accent-light)',
      'accent-dark': 'var(--theme-accent-dark)',
      success: 'var(--theme-success)',
      'success-light': 'var(--theme-success-light)',
      'success-dark': 'var(--theme-success-dark)',
      error: 'var(--theme-error)',
      'error-light': 'var(--theme-error-light)',
      'error-dark': 'var(--theme-error-dark)',
      info: 'var(--theme-info)',
      'info-light': 'var(--theme-info-light)',
      'info-dark': 'var(--theme-info-dark)',
      warning: 'var(--theme-warning)',
      'warning-light': 'var(--theme-warning-light)',
      'warning-dark': 'var(--theme-warning-dark)',
      light: {
        background: '#F2F4F7',
        container: '#FEFEFE',
        border: '#EEEEEE',
        text: '#737B86',
        btnText: '#FFFFFF',
        gray: '#D0D5DA',
        form: {
          placeholder: '#797F8B',
          inputBorder: '#DDE0E4',
          inputText: '#0E172B',
          label: '#222222',
          inputDisabled: '#F9FAFB'
        }
      },
      dark: {
        background: '#121212',
        container: '#212021',
        border: '#2D2D2D',
        text: '#D1D5DA',
        btnText: '#121212',
        gray: '#535558',
        form: {
          placeholder: '#797F8B',
          inputBorder: '#2D2D2D',
          inputText: '#D1D5DA',
          label: '#D1D5DA',
          inputDisabled: '#121212'
        }
      },
      badge: {
        default: {
          text: '#202A38',
          container: '#F2F5F6'
        },
        error: {
          text: '#A63837',
          container: '#FDE3E0'
        },
        warning: {
          text: '#895314',
          container: '#FFF8C3'
        },
        info: {
          text: '#1F41AE',
          container: '#DAEAFF'
        },
        success: {
          text: '#4BDD80',
          container: '#DDFDE7'
        }
      },
      table: {
        cell: '#F8FAFA',
        header: '#F2F4F7'
      },
      overlay: '#374051'
    },
    boxShadow: {
      umbra: '0 16px 24px 2px rgba(0, 0, 0, 0.14)',
      penumbra: '0 6px 30px 5px rgba(0, 0, 0, 0.12)',
      ambient: '0 8px 10px 0 rgba(0, 0, 0, 0.20)',
      none: '0 0 #0000',
      card: '0 2px 2px rgba(0, 0, 0, 0.2)'
    },
    fontSize: {
      h1: [
        '57.33px',
        {
          lineHeight: 'auto',
          letterSpacing: '0px'
        }
      ],
      h2: [
        '47.78px',
        {
          lineHeight: 'auto',
          letterSpacing: '0px'
        }
      ],
      h3: [
        '39.81px',
        {
          lineHeight: 'auto',
          letterSpacing: '0px'
        }
      ],
      h4: [
        '33.18px',
        {
          lineHeight: 'auto',
          letterSpacing: '0px'
        }
      ],
      h5: [
        '27.65px',
        {
          lineHeight: 'auto',
          letterSpacing: '0px'
        }
      ],
      h6: [
        '23.04px',
        {
          lineHeight: 'auto',
          letterSpacing: '0px'
        }
      ],
      pLarge: [
        '19.2px',
        {
          lineHeight: '26px',
          letterSpacing: '0.4px'
        }
      ],
      pNormal: [
        '16px',
        {
          lineHeight: '26px',
          letterSpacing: '0.4px'
        }
      ],
      pSmall: [
        '13.2px',
        {
          lineHeight: '22px',
          letterSpacing: '0.4px'
        }
      ]
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    },
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif']
    },
    extend: {
      animation: {
        'spin-slow': 'spin 0.9s linear infinite',
        'spin-fast': 'spin 0.6s linear infinite',
        'stroke-slow': 'spin 1.2s linear infinite',
        'stroke-fast': 'spin 0.9s linear infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-textshadow')],
  darkMode: 'class'
}
