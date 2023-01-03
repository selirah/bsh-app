import React, { ChangeEvent } from 'react'
import classnames from 'classnames'
import { FiArrowRightCircle } from 'react-icons/fi'

type Sizes = 'sm' | 'md' | 'lg'
type RadioDirection = 'left' | 'right'
type ColorTypes = 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'info' | 'warning'

type RadioProps = {
  size?: Sizes
  name: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: any
  direction?: RadioDirection
  label: string
  color?: ColorTypes
}

type HelpTextProps = RadioProps & {
  helpText: string
}

type LayoutProps = RadioProps & {
  description: string
}
export const Basic: React.FC<RadioProps> = (props) => {
  const { size, name, label, onChange, value, disabled, direction, color } = props
  return (
    <div
      className={classnames('flex items-center', {
        'justify-start': direction === 'left' || !direction,
        'justify-between': direction === 'right'
      })}
    >
      {direction === 'right' ? (
        label ? (
          <label
            htmlFor={name}
            className={classnames(
              'ml-2 text-light-form-label dark:text-dark-text cursor-pointer font-montserrat',
              {
                'text-pSmall': size === 'sm',
                'text-pNormal': size === 'md' || !size || size === 'lg'
              }
            )}
          >
            {label}
          </label>
        ) : null
      ) : null}
      <input
        id={name}
        name={name}
        type="radio"
        value={value}
        className={classnames(
          'focus:ring-0 bg-light-container dark:bg-dark-container border rounded-full border-light-form-inputBorder dark:border-dark-form-inputBorder cursor-pointer common-transition disabled:cursor-not-allowed',
          {
            'w-[20px] h-[20px]': size === 'sm',
            'w-[25px] h-[25px]': size === 'md' || !size,
            'w-[30px] h-[30px]': size === 'lg',
            'text-primary': color === 'primary' || !color,
            'text-secondary': color === 'secondary',
            'text-accent': color === 'accent',
            'text-success': color === 'success',
            'text-error': color === 'error',
            'text-info': color === 'info',
            'text-warning': color === 'warning'
          }
        )}
        onChange={onChange}
        disabled={disabled}
      />
      {direction === 'left' || !direction ? (
        label ? (
          <label
            htmlFor={name}
            className={classnames(
              'font-lato font-medium ml-2 text-light-form-label dark:text-dark-text cursor-pointer',
              {
                'text-pSmall': size === 'sm',
                'text-pNormal': size === 'md' || !size || size === 'lg'
              }
            )}
          >
            {label}
          </label>
        ) : null
      ) : null}
    </div>
  )
}
export const HelpText: React.FC<HelpTextProps> = (props) => {
  const { size, name, label, onChange, value, disabled, helpText, direction, color } = props
  return (
    <div
      className={classnames('flex', {
        'justify-start': direction === 'left' || !direction,
        'justify-between': direction === 'right'
      })}
    >
      {direction === 'right' ? (
        <div className="">
          <label
            htmlFor={name}
            className={classnames(
              'ml-2 text-light-form-label dark:text-dark-text cursor-pointer font-lato text-pNormal'
            )}
          >
            {label}
          </label>
          <p
            id={name}
            className={classnames(
              'text-light-text dark:text-dark-text cursor-pointer font-montserrat text-pSmall'
            )}
          >
            {helpText}
          </p>
        </div>
      ) : null}
      <div className="flex items-center h-8">
        <input
          id={name}
          name={name}
          type="radio"
          value={value}
          className={classnames(
            'focus:ring-0 bg-light-container dark:bg-dark-container border rounded-full border-light-form-inputBorder dark:border-dark-form-inputBorder cursor-pointer common-transition disabled:cursor-not-allowed',
            {
              'w-[20px] h-[20px]': size === 'sm',
              'w-[25px] h-[25px]': size === 'md' || !size,
              'w-[30px] h-[30px]': size === 'lg',
              'text-primary': color === 'primary' || !color,
              'text-secondary': color === 'secondary',
              'text-accent': color === 'accent',
              'text-success': color === 'success',
              'text-error': color === 'error',
              'text-info': color === 'info',
              'text-warning': color === 'warning'
            }
          )}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {direction === 'left' || !direction ? (
        <div className="ml-2">
          <label
            htmlFor={name}
            className={classnames(
              'ml-2 text-light-form-label dark:text-dark-text cursor-pointer font-lato text-pNormal'
            )}
          >
            {label}
          </label>
          <p
            id={name}
            className={classnames(
              'ml-2 text-light-text dark:text-dark-text cursor-pointer font-montserrat text-pSmall'
            )}
          >
            {helpText}
          </p>
        </div>
      ) : null}
    </div>
  )
}
export const Layout: React.FC<LayoutProps> = (props) => {
  const { name, label, onChange, value, disabled, description, color } = props

  return (
    <div className="">
      <input
        type="radio"
        onChange={onChange}
        id={name}
        name={name}
        value={value}
        className="hidden peer"
        disabled={disabled}
      />
      <label
        htmlFor={name}
        className={classnames(
          'inline-flex justify-between items-center p-[16px] w-full bg-light-container dark:bg-dark-container rounded border border-light-form-inputBorder dark:border-dark-form-inputBorder cursor-pointer peer-checked:shadow-penumbra common-transition peer-disabled:cursor-not-allowed',
          {
            'hover:border-primary peer-checked:border-primary': color === 'primary' || !color,
            'hover:border-secondary peer-checked:border-secondary': color === 'secondary',
            'hover:border-accent peer-checked:border-accent': color === 'accent',
            'hover:border-success peer-checked:border-success': color === 'success',
            'hover:border-error peer-checked:border-error': color === 'error',
            'hover:border-info peer-checked:border-info': color === 'info',
            'hover:border-warning peer-checked:border-warning': color === 'warning'
          }
        )}
      >
        <div className="block">
          <div
            className={classnames(
              'w-full font-lato font-bold text-light-form-label dark:text-dark-form-label mb-2 text-pNormal'
            )}
          >
            {label}
          </div>
          <div
            className={classnames(
              'w-full font-montserrat font-medium text-light-text dark:text-dark-text text-pSmall'
            )}
          >
            {description}
          </div>
        </div>
        <FiArrowRightCircle
          className={classnames('ml-3 w-6 h-6', {
            'text-primary': color === 'primary' || !color,
            'text-secondary': color === 'secondary',
            'text-accent': color === 'accent',
            'text-success': color === 'success',
            'text-error': color === 'error',
            'text-info': color === 'info',
            'text-warning': color === 'warning'
          })}
        />
      </label>
    </div>
  )
}
