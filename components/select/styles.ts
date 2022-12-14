import { StylesConfig } from 'react-select'

export const CustomStyles = (
  size: 'sm' | 'md' | 'lg',
  error: string,
  success: boolean,
  theme?: 'light' | 'dark',
  color?: 'uat' | 'prod'
) => {
  const primaryColor = color === 'prod' ? '#A32A29' : '#4E45E4'
  return {
    control: (base, { isFocused }) => ({
      ...base,
      minHeight: size === 'sm' ? '40px' : size === 'md' ? '45px' : size === 'lg' ? '50px' : '45px',
      boxShadow: isFocused ? '0 6px 30px 5px rgba(0, 0, 0, 0.12)' : 'none',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '4px',
      transitionDelay: '150ms',
      transitionDuration: '300ms',
      borderColor: isFocused
        ? primaryColor
        : error
        ? '#B5241E'
        : success
        ? '#376A20'
        : theme === 'dark'
        ? '#2D2D2D'
        : '#DDE0E4',
      cursor: 'pointer',
      '&:active': {
        borderColor: primaryColor
      },
      backgroundColor: theme === 'dark' ? '#212021' : '#FEFEFE',
      color: theme === 'dark' ? '#D1D5DA' : '#0E172B'
    }),
    option: (base) => ({
      ...base,
      borderColor: theme === 'dark' ? '#212021' : '#FEFEFE',
      '&:hover': {
        backgroundColor: primaryColor,
        color: '#FFFFFF'
      },
      backgroundColor: theme === 'dark' ? '#212021' : '#FEFEFE',
      color: theme === 'dark' ? '#D1D5DA' : '#0E172B',
      cursor: 'pointer',
      borderRadius: '4px'
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: theme === 'dark' ? '' : '#F2F4F7',
      borderRadius: '4px'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: theme === 'dark' ? '#FFFFFF' : '#121212'
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: theme === 'dark' ? '#FFFFFF' : '#121212',
      ':hover': {
        background: '#DC2726',
        color: '#FFFFFF'
      }
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: theme === 'dark' ? '#212021' : '#FEFEFE',
      borderRadius: '4px',
      fontFamily: 'Montserrat',
      fontSize: '13.5px'
    }),
    input: (base) => ({
      ...base,
      color: theme === 'dark' ? '#D1D5DA' : '#0E172B'
    }),
    singleValue: (base) => ({
      ...base,
      color: theme === 'dark' ? '#D1D5DA' : '#0E172B'
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999
    })
  } as StylesConfig
}
