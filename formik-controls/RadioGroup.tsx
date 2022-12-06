import React from 'react'
import { Field, ErrorMessage } from 'formik'
import { Checkbox } from 'components/index'
import InputError from './InputError'
import classnames from 'classnames'

export type Option = {
  key: string
  value: string
}

interface Props extends Checkbox.BasicProps {
  options: Option[]
}

export const RadioGroup: React.FC<Props> = (props) => {
  const { label, name, options, size, color, disabled, ...rest } = props
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
              <div className="flex items-center mb-2" key={option.key}>
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
                      'text-success-card': color === 'success',
                      'text-error-card': color === 'error',
                      'text-info-avatar': color === 'info',
                      'text-warning-avatar': color === 'warning'
                    }
                  )}
                />
                <label
                  htmlFor={option.value}
                  className={classnames(
                    'ml-2 text-light-form-label dark:text-dark-text cursor-pointer',
                    {
                      'text-pSmall': size === 'sm',
                      'text-pNormal': size === 'md' || !size || size === 'lg'
                    }
                  )}
                >
                  {option.key}
                </label>
              </div>
            )
          })
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </React.Fragment>
  )
}
