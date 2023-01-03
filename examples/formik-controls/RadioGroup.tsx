import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Checkbox } from 'components/index'
import InputError from './InputError'
import classnames from 'classnames'

export type Option = {
  label: string
  value: string
  helpText?: string
}

type Props = Checkbox.BasicProps & {
  options: Option[]
  space?: boolean
}

export const RadioGroup: React.FC<Props> = (props) => {
  const { label, name, options, size, color, disabled, space, direction, ...rest } = props
  return (
    <React.Fragment>
      <label
        className={classnames('ml-2 text-light-form-label dark:text-dark-text cursor-pointer', {
          'text-pSmall': size === 'sm',
          'text-pNormal': size === 'md' || !size || size === 'lg'
        })}
      >
        {label}
      </label>
      <Field name={name} {...rest}>
        {({ field, form }) => {
          return options.map((option) => {
            return (
              <div
                className={classnames('flex items-center mb-4', {
                  'justify-start': direction === 'left' || !direction,
                  'justify-between': direction === 'right'
                })}
                key={option.label}
              >
                {direction === 'right' ? (
                  <div className="">
                    <label
                      htmlFor={option.value}
                      className={classnames(
                        'font-regular text-light-form-label dark:text-dark-text cursor-pointer font-montserrat',
                        {
                          'text-pSmall': size === 'sm',
                          'text-pNormal': size === 'md' || !size || size === 'lg'
                        }
                      )}
                    >
                      {option.label}
                    </label>
                    {option.helpText && (
                      <p
                        className={classnames(
                          'text-light-text dark:text-dark-text cursor-pointer font-montserrat text-pSmall'
                        )}
                      >
                        {option.helpText}
                      </p>
                    )}
                  </div>
                ) : null}
                <div className="flex items-center h-8">
                  <input
                    type="radio"
                    id={option.value}
                    {...field}
                    value={option.value}
                    checked={field.value === option.value}
                    disabled={disabled}
                    className={classnames(
                      'focus:ring-0 bg-light-container dark:bg-dark-container border rounded-full cursor-pointer common-transition disabled:cursor-not-allowed',
                      {
                        'border-light-form-inputBorder dark:border-dark-form-inputBorder':
                          !form.errors[name],
                        'w-[20px] h-[20px]': size === 'sm',
                        'w-[25px] h-[25px]': size === 'md' || !size,
                        'w-[30px] h-[30px]': size === 'lg',
                        'text-primary': color === 'primary' || !color,
                        'text-secondary': color === 'secondary',
                        'text-accent': color === 'accent',
                        'text-success': color === 'success',
                        'text-error': color === 'error',
                        'text-info': color === 'info',
                        'text-warning': color === 'warning',
                        'mb-4': space,
                        'border-error': form.errors[name]
                      }
                    )}
                  />
                </div>
                {direction === 'left' || !direction ? (
                  <div className="">
                    <label
                      htmlFor={option.value}
                      className={classnames(
                        'font-regular ml-2 text-light-form-label dark:text-dark-text cursor-pointer font-montserrat',
                        {
                          'text-pSmall': size === 'sm',
                          'text-pNormal': size === 'md' || !size || size === 'lg',
                          'mb-4': space
                        }
                      )}
                    >
                      {option.label}
                    </label>
                    {option.helpText && (
                      <p
                        className={classnames(
                          'ml-2 text-light-text dark:text-dark-text cursor-pointer font-montserrat text-pSmall'
                        )}
                      >
                        {option.helpText}
                      </p>
                    )}
                  </div>
                ) : null}
              </div>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </React.Fragment>
  )
}
