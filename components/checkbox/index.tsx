import React, { ChangeEvent } from 'react'
import classnames from 'classnames'

type Sizes = 'sm' | 'md' | 'lg'
type CheckDirection = 'left' | 'right'

interface CheckboxProps {
  size?: Sizes
  name: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  value?: any
  direction?: CheckDirection
}

interface SimpleProps extends CheckboxProps {
  label?: string
}

interface HelpTextProps extends CheckboxProps {
  label: string
  helpText: string
}

export const Simple: React.FC<SimpleProps> = (props) => {
  const { size, name, label, onChange, value, disabled, direction } = props
  return (
    <div
      className={classnames('flex items-center font-lato font-medium', {
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
          'accent-primary focus:outline-none focus:shadow-penumbra bg-light-container dark:bg-dark-container rounded border-light-form-inputBorder dark:border-dark-form-inputBorder focus:ring-light-form-inputBorder dark:focus:ring-dark-form-inputBorder dark:ring-offset-gray-800 focus:ring-2 cursor-pointer common-transition disabled:cursor-not-allowed',
          {
            'w-[20px] h-[20px]': size === 'sm',
            'w-[25px] h-[25px]': size === 'md' || !size,
            'w-[30px] h-[30px]': size === 'lg'
          }
        )}
        onChange={onChange}
        disabled={disabled}
      />
      {direction === 'left' || !direction ? (
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
    </div>
  )
}

export const HelpText: React.FC<HelpTextProps> = (props) => {
  const { size, name, label, onChange, value, disabled, helpText, direction } = props
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
            'accent-primary focus:outline-none focus:shadow-penumbra bg-light-container dark:bg-dark-container rounded border-light-form-inputBorder dark:border-dark-form-inputBorder focus:ring-light-form-inputBorder dark:focus:ring-dark-form-inputBorder dark:ring-offset-gray-800 focus:ring-2 cursor-pointer common-transition disabled:cursor-not-allowed',
            {
              'w-[20px] h-[20px]': size === 'sm',
              'w-[25px] h-[25px]': size === 'md' || !size,
              'w-[30px] h-[30px]': size === 'lg'
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
