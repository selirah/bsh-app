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
      primary: '#4E45E4',
      primaryLight: '#8972ff',
      primaryDark: '#001bb1',
      secondary: '#DB1EBC',
      secondaryLight: '#ff61ef',
      secondaryDark: '#a5008b',
      accent: '#FF3B88',
      accentLight: '#ff76b8',
      accentDark: '#c6005b',
      white: '#ffffff',
      black: '#000000',
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
          inputDisabled: '#F9FAFB'
        }
      },
      error: {
        text: '#B5241E',
        container: '#F9DFDC',
        card: '#DC2726',
        hovered: '#9E221C',
        disabled: '#DA7A7A',
        avatar: '#DC2726'
      },
      success: {
        text: '#376A20',
        container: '#DDFDE7',
        card: '#1EA249',
        hovered: '#2A501A',
        disabled: '#94E2AE',
        avatar: '#4BDD80'
      },
      warning: {
        text: '#895314',
        container: '#FFF8C3',
        avatar: '#F57C00'
      },
      info: {
        text: '#1F41AE',
        container: '#DAEAFF',
        avatar: '#42ACFF'
      },
      badge: {
        default: {
          text: '#202A38',
          container: '#F2F5F6'
        },
        block: {
          text: '#A63837',
          container: '#FDE3E0'
        },
        pending: {
          text: '#895314',
          container: '#FFF8C3'
        },
        rejected: {
          text: '#1F41AE',
          container: '#DAEAFF'
        },
        active: {
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
      card: '0 2px 4px rgba(0, 0, 0, 0.2)'
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
      padding: {
        '4px': '4px',
        '6px': '6px',
        '8px': '8px',
        '10px': '10px',
        '12px': '12px',
        '14px': '14px',
        '16px': '16px',
        '18px': '18px',
        '20px': '20px',
        '22px': '22px',
        '24px': '24px',
        '32px': '32px',
        '48px': '48px'
      },
      height: {
        '24px': '24px',
        '30px': '30px',
        '40px': '40px',
        '45px': '45px',
        '50px': '50px',
        '60px': '60px',
        '70px': '70px',
        '80px': '80px',
        '90px': '90px',
        '100px': '100px'
      },
      width: {
        '24px': '24px',
        '30px': '30px',
        '40px': '40px',
        '45px': '45px',
        '50px': '50px',
        '60px': '60px',
        '70px': '70px',
        '80px': '80px',
        '90px': '90px',
        '100px': '100px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')],
  darkMode: 'class'
}
