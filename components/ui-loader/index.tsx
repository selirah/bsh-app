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

type LoaderSizes = 'sm' | 'md' | 'lg'

type UILoaderProps = {
  size?: LoaderSizes
  spinColor?: Color
}

export const UILoader: React.FC<UILoaderProps> = (props) => {
  const { size, spinColor } = props

  return (
    <div className="w-full h-full flex justify-center items-center absolute z-10 top-0 right-0 lg:w-[calc(100%-80px)]">
      <svg
        className={classnames('spinnerContentLoader', {
          'w-[30px] h-[30px]': size === 'sm',
          'w-[40px] h-[40px]': size === 'md' || !size,
          'w-[50px] h-[50px]': size === 'lg'
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
