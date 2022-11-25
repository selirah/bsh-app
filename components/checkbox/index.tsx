import React, { ChangeEvent, HTMLProps } from 'react'
import classnames from 'classnames'

type Sizes = 'sm' | 'md' | 'lg'
type CheckDirection = 'left' | 'right'
type ColorTypes = 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'info' | 'warning'

interface CheckboxProps {
  size?: Sizes
  name?: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: any
  direction?: CheckDirection
  color?: ColorTypes
}

interface BasicProps extends CheckboxProps {
  label?: string
}

interface HelpTextProps extends CheckboxProps {
  label: string
  helpText: string
}

export const Basic: React.FC<BasicProps> = (props) => {
  const { size, name, label, onChange, value, disabled, direction, color, ...rest } = props
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
            className={classnames('ml-2 text-light-form-label dark:text-dark-text cursor-pointer', {
              'text-pSmall': size === 'sm',
              'text-pNormal': size === 'md' || !size || size === 'lg'
            })}
          >
            {label}
          </label>
        ) : null
      ) : null}
      <input
        id={name}
        name={name}
        type="checkbox"
        value={value}
        className={classnames(
          'checked:shadow-penumbra focus:ring-0 bg-light-container dark:bg-dark-container border rounded border-light-form-inputBorder dark:border-dark-form-inputBorder cursor-pointer common-transition disabled:cursor-not-allowed',
          {
            'w-[20px] h-[20px]': size === 'sm',
            'w-[25px] h-[25px]': size === 'md' || !size,
            'w-[30px] h-[30px]': size === 'lg',
            'text-primary': color === 'primary' || !color,
            'text-secondary': color === 'secondary',
            'text-accent': color === 'accent',
            'text-success-card': color === 'success',
            'text-error-card': color === 'error',
            'text-info-avatar': color === 'info',
            'text-warning-avatar': color === 'warning'
          }
        )}
        onChange={onChange}
        disabled={disabled}
        {...rest}
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
  const { size, name, label, onChange, value, disabled, helpText, direction, color, ...rest } =
    props
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
              'ml-2 text-light-text dark:text-dark-text cursor-pointer font-montserrat text-pSmall'
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
          type="checkbox"
          value={value}
          className={classnames(
            'checked:shadow-penumbra focus:ring-0 bg-light-container dark:bg-dark-container border rounded border-light-form-inputBorder dark:border-dark-form-inputBorder cursor-pointer common-transition disabled:cursor-not-allowed',
            {
              'w-[20px] h-[20px]': size === 'sm',
              'w-[25px] h-[25px]': size === 'md' || !size,
              'w-[30px] h-[30px]': size === 'lg',
              'text-primary': color === 'primary' || !color,
              'text-secondary': color === 'secondary',
              'text-accent': color === 'accent',
              'text-success-card': color === 'success',
              'text-error-card': color === 'error',
              'text-info-avatar': color === 'info',
              'text-warning-avatar': color === 'warning'
            }
          )}
          onChange={onChange}
          disabled={disabled}
          {...rest}
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

interface IndeterminateProps {
  color?: ColorTypes
  size?: Sizes
  indeterminate?: boolean & HTMLProps<HTMLInputElement>
  rest?: any
  checked?: boolean
}

export const Indeterminate: React.FC<IndeterminateProps> = ({
  indeterminate,
  color,
  size,
  ...rest
}) => {
  const ref = React.useRef<HTMLInputElement>(null!)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      className={classnames(
        'checked:shadow-penumbra focus:ring-0 bg-light-container dark:bg-dark-container border rounded border-light-form-inputBorder dark:border-dark-form-inputBorder cursor-pointer common-transition disabled:cursor-not-allowed',
        {
          'w-[20px] h-[20px]': size === 'sm' || !size,
          'w-[25px] h-[25px]': size === 'md',
          'w-[30px] h-[30px]': size === 'lg',
          'text-primary': color === 'primary' || !color,
          'text-secondary': color === 'secondary',
          'text-accent': color === 'accent',
          'text-success-card': color === 'success',
          'text-error-card': color === 'error',
          'text-info-avatar': color === 'info',
          'text-warning-avatar': color === 'warning'
        }
      )}
      ref={ref}
      {...rest}
    />
  )
}
