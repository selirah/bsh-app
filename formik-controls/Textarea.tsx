import { FC } from 'react'
import { Field, ErrorMessage } from 'formik'
import classnames from 'classnames'
import InputError from './InputError'

type InputSizes = 'sm' | 'md' | 'lg'

type InputProps = {
  label?: string
  name: string
  size?: InputSizes
  placeholder?: string
  disabled?: boolean
  rows?: number
}

export const Textarea: FC<InputProps> = (props) => {
  const { label, name, size, ...rest } = props
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
      <Field
        id={name}
        name={name}
        className="font-montserrat font-regular border-light-form-inputBorder focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed"
        as="textarea"
        {...rest}
      />

      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </div>
  )
}
