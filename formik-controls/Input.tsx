import { FC } from 'react'
import { Field, ErrorMessage } from 'formik'
import classnames from 'classnames'
import InputError from './InputError'

type InputSizes = 'sm' | 'md' | 'lg'
type IconPosition = 'leading' | 'trailing'

interface InputProps {
  label?: string
  name: string
  size?: InputSizes
  iconPosition?: IconPosition
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  placeholder?: string
  disabled?: boolean
}

export const Input: FC<InputProps> = (props) => {
  const { label, name, size, IconSVG, iconPosition, ...rest } = props
  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames(
            'block mb-[8px] font-lato font-medium text-light-form-label dark:text-dark-form-label',
            {
              'text-pSmall': size === 'sm',
              'text-pNormal': size === 'md' || !size || size === 'lg'
            }
          )}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        {IconSVG && (
          <div
            className={classnames('flex absolute inset-y-0 items-center pointer-events-none', {
              'left-0 pl-3': iconPosition === 'leading' || !iconPosition,
              'right-0 pr-3': iconPosition === 'trailing'
            })}
          >
            <IconSVG className="w-5 h-5 text-light-form-placeholder dark:text-dark-form-placeholder" />
          </div>
        )}
        <Field
          id={name}
          name={name}
          className={classnames(
            'font-montserrat font-regular focus:ring-primary border-light-form-inputBorder dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size,
              'h-[50px] text-pNormal': size === 'lg'
            }
          )}
          {...rest}
        />
      </div>
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </div>
  )
}
