import { StylesConfig } from 'react-select'

export const CustomStyles = (
  size: 'sm' | 'md' | 'lg',
  error: string,
  success: boolean
  // theme?: 'light' | 'dark'
) => {
  return {
    control: (base, { isFocused }) => ({
      ...base,
      height: size === 'sm' ? '40px' : size === 'md' ? '45px' : size === 'lg' ? '50px' : '45',
      boxShadow: isFocused ? '0 6px 30px 5px rgba(0, 0, 0, 0.12)' : 'none',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '4px',
      transitionDelay: '150ms',
      transitionDuration: '300ms',
      borderColor: isFocused ? '#4E45E4' : error ? '#B5241E' : success ? '#376A20' : '#DDE0E4',
      cursor: 'pointer',
      '&:active': {
        borderColor: '#4E45E4'
      }
    }),
    option: (base, { isSelected }) => ({
      ...base,
      borderColor: '#EEEEEE',
      '&:hover': {
        backgroundColor: '#4E45E4',
        color: '#FFFFFF'
      },
      backgroundColor: isSelected ? '#EEEEEE' : 'transparent',
      color: '#0E172B',
      cursor: 'pointer'
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#F2F5F6',
      borderRadius: '4px'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#202A38'
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#202A38',
      ':hover': {
        background: '#DC2726',
        color: '#FFFFFF'
      }
    })
  } as StylesConfig
}
