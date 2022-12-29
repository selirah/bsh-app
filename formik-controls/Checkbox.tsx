import { Field, ErrorMessage } from 'formik'
import classnames from 'classnames'
import InputError from './InputError'

type InputSizes = 'sm' | 'md' | 'lg'
type CheckDirection = 'left' | 'right'
export type ColorTypes =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'

type CheckboxProps = {
  label?: string
  name: string
  size?: InputSizes
  direction?: CheckDirection
  color?: ColorTypes
  disabled?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { name, label, size, direction, color, ...rest } = props

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
      <Field
        name={name}
        type="checkbox"
        id={name}
        className={classnames(
          'checked:shadow-penumbra focus:ring-0 bg-light-container dark:bg-dark-container border rounded border-light-form-inputBorder dark:border-dark-form-inputBorder cursor-pointer common-transition disabled:cursor-not-allowed',
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
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </div>
  )
}
