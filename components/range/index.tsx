import React, { ChangeEvent } from 'react'
import classnames from 'classnames'

type Sizes = 'sm' | 'md' | 'lg'
type ColorTypes = 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'info' | 'warning'

type RangeProps = {
  size?: Sizes
  name: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: any
  color?: ColorTypes
  label?: string
  min?: string
  max?: string
  step?: string
  showIndicator?: boolean
}

export const Range: React.FC<RangeProps> = (props) => {
  const { size, name, label, onChange, value, disabled, color, min, max, step, showIndicator } =
    props

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames(
            'block mb-[8px] font-lato font-medium text-light-form-label dark:text-dark-text',
            {
              'text-pSmall': size === 'sm',
              'text-pNormal': size === 'md' || !size || size === 'lg'
            }
          )}
        >
          {label}
        </label>
      ) : null}
      <div className="flex items-center space-x-2 justify-start">
        {showIndicator ? (
          <span
            className={classnames(
              'font-montserrat font-regular text-light-text dark:text-dark-text',
              {
                'text-pSmall': size === 'sm',
                'text-pNormal': size === 'md',
                'text-pLarge': size === 'lg'
              }
            )}
          >
            {min ?? '0'}
          </span>
        ) : null}
        <input
          id={name}
          type="range"
          value={value}
          className={classnames(
            ' bg-light-border dark:bg-dark-border rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed focus:outline-none',
            {
              'h-1 range-sm': size === 'sm',
              'h-2 range-md': size === 'md' || !size,
              'h-3 range-lg': size === 'lg',
              'range-primary': color === 'primary' || !color,
              'range-secondary': color === 'secondary',
              'range-accent': color === 'accent',
              'range-success': color === 'success',
              'range-error': color === 'error',
              'range-info': color === 'info',
              'range-warning': color === 'warning'
            }
          )}
          onChange={onChange}
          disabled={disabled}
          max={max}
          min={min}
          step={step}
        />
        {showIndicator ? (
          <span
            className={classnames(
              'font-montserrat font-regular text-light-text dark:text-dark-text',
              {
                'text-pSmall': size === 'sm',
                'text-pNormal': size === 'md',
                'text-pLarge': size === 'lg'
              }
            )}
          >
            {value}
          </span>
        ) : null}
      </div>
    </div>
  )
}
