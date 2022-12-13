import React, { ChangeEvent } from 'react'
import classnames from 'classnames'

type Sizes = 'sm' | 'md' | 'lg'
type ColorTypes = 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'info' | 'warning'

type SwitchProps = {
  size?: Sizes
  name: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: any
  color?: ColorTypes
  label?: string
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const { size, name, label, onChange, value, disabled, color } = props

  return (
    <div className="">
      <label
        htmlFor={name}
        className={classnames('inline-flex relative items-center cursor-pointer')}
      >
        <input
          type="checkbox"
          value={value}
          onChange={onChange}
          className="sr-only peer"
          disabled={disabled}
          name={name}
          id={name}
        />
        <div
          className={classnames(
            "bg-light-gray dark:bg-dark-gray peer-focus:outline-none peer-focus:ring-0 after:h-5 after:w-5 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-light-border after:content-[''] after:absolute after:bg-light-container after:border-light-border after:border after:rounded-full after:transition-all common-transition peer-checked:shadow-penumbra peer-disabled:cursor-not-allowed",
            {
              'w-[45px] h-[25px] after:top-[2px] after:left-[2px]': size === 'sm',
              'w-[50px] h-[30px] after:top-[5px] after:left-[5px]': size === 'md' || !size,
              'w-[55px] h-[35px] after:top-[7px] after:left-[7px]': size === 'lg',
              'peer-checked:bg-primary': color === 'primary' || !color,
              'peer-checked:bg-secondary': color === 'secondary',
              'peer-checked:bg-accent': color === 'accent',
              'peer-checked:bg-success': color === 'success',
              'peer-checked:bg-error': color === 'error',
              'peer-checked:bg-info': color === 'info',
              'peer-checked:bg-warning': color === 'warning'
            }
          )}
        ></div>
        {label ? (
          <span
            className={classnames(
              'font-lato font-medium ml-2 text-light-form-label dark:text-dark-text cursor-pointer',
              {
                'text-pSmall': size === 'sm',
                'text-pNormal': size === 'md' || !size || size === 'lg'
              }
            )}
          >
            {label}
          </span>
        ) : null}
      </label>
    </div>
  )
}
