import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import classnames from 'classnames'
import AuthCodeInput from 'react-auth-code-input'

type InputSizes = 'sm' | 'md' | 'lg'

export type CodeInputProps = {
  onChange?: (value: string) => void
  fields?: number
  size?: InputSizes
  error?: string
  disabled?: boolean
  success?: boolean
  name?: string
}

export const CodeInput: React.FC<CodeInputProps> = (props) => {
  const { onChange, fields, size, error, disabled, success } = props
  return (
    <div className="w-full">
      <AuthCodeInput
        onChange={onChange}
        inputClassName={classnames(
          'text-center font-montserrat  font-regular focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
          {
            'w-[40px] h-[40px] text-pSmall': size === 'sm',
            'w-[50px] h-[50px] text-pNormal': size === 'md' || !size,
            'w-[70px] h-[70px] text-pNormal': size === 'lg',
            'border-light-form-inputBorder ': !error && !success,
            'border-error-text': error,
            'border-success-text': success
          }
        )}
        containerClassName="flex space-x-2 items-center"
        disabled={disabled}
        length={fields ?? 6}
        allowedCharacters="numeric"
        autoFocus
      />
      {error ? (
        <div className="mt-[8px] items-center flex">
          <FiAlertCircle
            className={classnames('flex-shrink-0 inline mr-[4px] text-error-text', {
              'w-4 h-4': size === 'sm',
              'w-5 h-5': size === 'md' || !size || size === 'lg'
            })}
          />
          <span
            className={classnames('font-montserrat font-medium text-error-text', {
              'text-pSmall': size === 'sm',
              'text-pNormal': size === 'md' || !size || size === 'lg'
            })}
          >
            {error}
          </span>
        </div>
      ) : null}
    </div>
  )
}
