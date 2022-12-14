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

type LoaderSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type ButtonLoaderProps = {
  size?: LoaderSize
  slow?: boolean
}

type BasicLoaderProps = ButtonLoaderProps & {
  spinColor?: Color
}

type AppleLoaderProps = ButtonLoaderProps & {
  strokeColor?: Color
}

export const BasicLoader: React.FC<BasicLoaderProps> = (props) => {
  const { size, spinColor, slow } = props
  return (
    <div aria-label="Loading..." role="status">
      <svg
        className={classnames('spinnerContentLoader', {
          'h-4 w-4': size === 'sm',
          'h-5 w-5': size === 'md' || !size,
          'h-6 w-6': size === 'lg',
          'h-8 w-8': size === 'xl',
          'h-10 w-10': size === '2xl',
          'animate-stroke-slow': slow
        })}
        viewBox="0 0 50 50"
      >
        <circle
          className={classnames('spinnerContentLoaderCircle', {
            'stroke-light-btnText': spinColor === 'default' || !spinColor,
            'stroke-primary': spinColor === 'primary',
            'stroke-error': spinColor === 'error',
            'stroke-success': spinColor === 'success',
            'stroke-secondary': spinColor === 'secondary',
            'stroke-accent': spinColor === 'accent',
            'stroke-info': spinColor === 'info',
            'stroke-warning': spinColor === 'warning'
          })}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="3.0"
        />
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
          'h-8 w-8': size === 'xl',
          'h-16 w-16': size === '2xl',
          'animate-stroke-fast': !slow,
          'animate-stroke-slow': slow,
          'stroke-light-btnText': strokeColor === 'default' || !strokeColor,
          'stroke-primary': strokeColor === 'primary',
          'stroke-error': strokeColor === 'error',
          'stroke-success': strokeColor === 'success',
          'stroke-secondary': strokeColor === 'secondary',
          'stroke-accent': strokeColor === 'accent',
          'stroke-info': strokeColor === 'info',
          'stroke-warning': strokeColor === 'warning'
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
