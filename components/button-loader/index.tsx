import React from 'react'
import classnames from 'classnames'

type Color =
  | 'primary'
  | 'error'
  | 'success'
  | 'accent'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'default'

type BgColor = 'white' | 'black'

type LoaderSize = 'sm' | 'md' | 'lg'

interface ButtonLoaderProps {
  size?: LoaderSize
  slow?: boolean
}

interface BasicLoaderProps extends ButtonLoaderProps {
  spinColor?: Color
  bgColor?: BgColor
}

interface AppleLoaderProps extends ButtonLoaderProps {
  strokeColor?: Color
}

export const BasicLoader: React.FC<BasicLoaderProps> = (props) => {
  const { size, spinColor, bgColor, slow } = props
  return (
    <div aria-label="Loading..." role="status">
      <svg
        className={classnames('', {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md' || !size,
          'h-6 w-6': size === 'lg',
          'animate-spin-fast': !slow,
          'animate-spin-slow': slow
        })}
        viewBox="3 3 18 18"
      >
        <path
          className={classnames('', {
            'fill-light-btnText': bgColor === 'white' || !bgColor,
            'fill-dark-btnText': bgColor === 'black'
          })}
          d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
        ></path>
        <path
          className={classnames('', {
            'fill-light-btnText': spinColor === 'default' || !spinColor,
            'fill-primary': spinColor === 'primary',
            'fill-error-card': spinColor === 'error',
            'fill-success-card': spinColor === 'success',
            'fill-secondary': spinColor === 'secondary',
            'fill-accent': spinColor === 'accent',
            'fill-info-avatar': spinColor === 'info',
            'fill-warning-avatar': spinColor === 'warning'
          })}
          d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
        ></path>
      </svg>
    </div>
  )
}

export const AppleLoader: React.FC<AppleLoaderProps> = (props) => {
  const { strokeColor, size, slow } = props
  return (
    <div aria-label="Loading..." role="status">
      <svg
        className={classnames('', {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md' || !size,
          'h-6 w-6': size === 'lg',
          'animate-stroke-fast': !slow,
          'animate-stroke-slow': slow,
          'stroke-light-btnText': strokeColor === 'default' || !strokeColor,
          'stroke-primary': strokeColor === 'primary',
          'stroke-error-card': strokeColor === 'error',
          'stroke-success-card': strokeColor === 'success',
          'stroke-secondary': strokeColor === 'secondary',
          'stroke-accent': strokeColor === 'accent',
          'stroke-info-avatar': strokeColor === 'info',
          'stroke-warning-avatar': strokeColor === 'warning'
        })}
        viewBox="0 0 256 256"
      >
        <line
          x1="128"
          y1="32"
          x2="128"
          y2="64"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="60.1"
          x2="173.3"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="224"
          y1="128"
          x2="192"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="195.9"
          y1="195.9"
          x2="173.3"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="128"
          y1="224"
          x2="128"
          y2="192"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="195.9"
          x2="82.7"
          y2="173.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="32"
          y1="128"
          x2="64"
          y2="128"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
        <line
          x1="60.1"
          y1="60.1"
          x2="82.7"
          y2="82.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="24"
        ></line>
      </svg>
    </div>
  )
}
