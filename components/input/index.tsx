import React, { ChangeEvent, Fragment } from 'react'
import classnames from 'classnames'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import { Listbox, Transition } from '@headlessui/react'

type InputSizes = 'sm' | 'md' | 'lg'
type IconPosition = 'leading' | 'trailing'
type DropdownData = {
  label: string
  value: string | number
}

interface InputProps {
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: 'text' | 'number' | 'tel' | 'email'
  name?: string
  label?: string
  error?: string
  success?: boolean
  size?: InputSizes
  placeholder?: string
  disabled?: boolean
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (e: ChangeEvent<HTMLInputElement>) => void
}

interface IconProps extends InputProps {
  iconPosition?: IconPosition
  IconSVG: any
}

interface AddOnProps extends InputProps {
  addOnText: string
  addOnPosition?: IconPosition
}

interface DropdownProps extends InputProps {
  list: DropdownData[]
  selected: DropdownData
  setSelected: (value: DropdownData) => void
}

export const Basic: React.FC<InputProps> = (props) => {
  const { type, name, label, value, placeholder, onChange, disabled, size, error, success } = props

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames('block mb-[8px] font-lato font-medium', {
            'text-pSmall': size === 'sm',
            'text-pNormal': size === 'md' || !size || size === 'lg',
            'text-light-form-label dark:text-dark-form-label': !error && !success,
            'text-error-text': error,
            'text-success-text': success
          })}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          type={type ?? 'text'}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classnames(
            'font-montserrat font-regular bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size || size === 'lg',
              'h-[50px]': size === 'lg',
              'border-light-form-inputBorder focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder':
                !error && !success,
              'border-error-text focus:ring-error-text text-error-text placeholder:text-error-text':
                error,
              'border-success-text text-success-text placeholder:text-success-text focus:ring-success-text':
                success
            }
          )}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {error ? (
        <div className="mt-[8px] items-center flex">
          <ExclamationCircleIcon
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
export const Icon: React.FC<IconProps> = (props) => {
  const {
    type,
    name,
    label,
    value,
    placeholder,
    onChange,
    disabled,
    size,
    error,
    success,
    iconPosition,
    IconSVG
  } = props

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames('block mb-[8px] font-lato font-medium', {
            'text-pSmall': size === 'sm',
            'text-pNormal': size === 'md' || !size || size === 'lg',
            'text-light-form-label dark:text-dark-form-label': !error && !success,
            'text-error-text': error,
            'text-success-text': success
          })}
        >
          {label}
        </label>
      ) : null}
      <div className="relative">
        <div
          className={classnames('flex absolute inset-y-0 items-center pointer-events-none', {
            'left-0 pl-3': iconPosition === 'leading' || !iconPosition,
            'right-0 pr-3': iconPosition === 'trailing'
          })}
        >
          <IconSVG
            className={classnames('w-5 h-5', {
              'text-light-form-placeholder dark:text-dark-form-placeholder': !error && !success,
              'text-error-text': error,
              'text-success-text': success
            })}
          />
        </div>
        <input
          type={type ?? 'text'}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classnames(
            'font-montserrat font-regular bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full pr-[16px] py-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size || size === 'lg',
              'h-[50px]': size === 'lg',
              'pl-[40px]': iconPosition === 'leading' || !iconPosition,
              'pl-[16px]': iconPosition === 'trailing',
              'border-light-form-inputBorder focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder':
                !error && !success,
              'border-error-text focus:ring-error-text text-error-text placeholder:text-error-text':
                error,
              'border-success-text text-success-text placeholder:text-success-text focus:ring-success-text':
                success
            }
          )}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {error ? (
        <div className="mt-[8px] items-center flex">
          <ExclamationCircleIcon
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
export const AddOn: React.FC<AddOnProps> = (props) => {
  const {
    type,
    name,
    label,
    value,
    placeholder,
    onChange,
    disabled,
    size,
    error,
    success,
    addOnPosition,
    addOnText
  } = props

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames('block mb-[8px] font-lato font-medium', {
            'text-pSmall': size === 'sm',
            'text-pNormal': size === 'md' || !size || size === 'lg',
            'text-light-form-label dark:text-dark-form-label': !error && !success,
            'text-error-text': error,
            'text-success-text': success
          })}
        >
          {label}
        </label>
      ) : null}
      <div className="flex">
        {!addOnPosition || addOnPosition === 'leading' ? (
          <span
            className={classnames(
              'inline-flex items-center font-lato font-medium text-light-text dark:text-dark-text px-3 text-sm border border-r-0 rounded-l border-light-form-inputBorder dark:border-dark-border bg-light-container dark:bg-dark-container',
              {
                'text-pSmall': size === 'sm',
                'text-pNormal': !size || size === 'sm' || size === 'lg'
              }
            )}
          >
            {addOnText}
          </span>
        ) : null}
        <input
          type={type ?? 'text'}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classnames(
            'font-montserrat font-regular bg-light-container dark:bg-dark-container border rounded-none  focus:outline-none focus:ring-1 focus:border-transparent block w-full pr-[16px] py-[16px] px-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size || size === 'lg',
              'h-[50px]': size === 'lg',
              'rounded-r': addOnPosition === 'leading' || !addOnPosition,
              'rounded-l': addOnPosition === 'trailing',
              'border-light-form-inputBorder focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder':
                !error && !success,
              'border-error-text focus:ring-error-text text-error-text placeholder:text-error-text':
                error,
              'border-success-text text-success-text placeholder:text-success-text focus:ring-success-text':
                success
            }
          )}
          onChange={onChange}
          disabled={disabled}
        />
        {addOnPosition === 'trailing' ? (
          <span
            className={classnames(
              'inline-flex items-center text-light-text dark:text-dark-text px-3 font-lato font-medium border border-l-0 rounded-r border-light-form-inputBorder dark:border-dark-border bg-light-container dark:bg-dark-container'
            )}
          >
            {addOnText}
          </span>
        ) : null}
      </div>
      {error ? (
        <div className="mt-[8px] items-center flex">
          <ExclamationCircleIcon
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
export const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    type,
    name,
    label,
    value,
    placeholder,
    onChange,
    disabled,
    size,
    error,
    success,
    selected,
    setSelected,
    list
  } = props

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames('block mb-[8px] font-lato font-medium', {
            'text-pSmall': size === 'sm',
            'text-pNormal': size === 'md' || !size || size === 'lg',
            'text-light-form-label dark:text-dark-form-label': !error && !success,
            'text-error-text': error,
            'text-success-text': success
          })}
        >
          {label}
        </label>
      ) : null}
      <div className="flex space-x-2">
        <input
          type={type ?? 'text'}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classnames(
            'font-montserrat font-regular bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size || size === 'lg',
              'h-[50px]': size === 'lg',
              'border-light-form-inputBorder focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder':
                !error && !success,
              'border-error-text focus:ring-error-text text-error-text placeholder:text-error-text':
                error,
              'border-success-text text-success-text placeholder:text-success-text focus:ring-success-text':
                success
            }
          )}
          onChange={onChange}
          disabled={disabled}
        />
        <div className="w-24">
          <Listbox value={selected} onChange={setSelected} disabled={disabled}>
            <div className="relative">
              <Listbox.Button
                className={classnames(
                  'relative w-full border rounded bg-light-container dark:bg-dark-container py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-1 focus:shadow-penumbra common-transition',
                  {
                    'h-[40px] text-pSmall': size === 'sm',
                    'h-[45px] text-pNormal': size === 'md' || !size || size === 'lg',
                    'h-[50px]': size === 'lg',
                    'border-light-form-inputBorder dark:border-dark-border focus:border-primary':
                      !error && !success,
                    'border-error-text text-error-text ': error,
                    'border-success-text text-success-text': success,
                    'cursor-pointer': !disabled,
                    'cursor-not-allowed': disabled
                  }
                )}
              >
                <span className="block truncate">{selected.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <Selector error={error ?? null} success={success ?? false} />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute font-montserrat mt-1 w-full overflow-auto rounded bg-white py-1 text-light-form-inputText shadow-penumbra ring-1 ring-primary ring-opacity-5 focus:outline-none">
                  {list.map((l, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        classnames('relative cursor-pointer select-none py-2 pl-8 pr-4', {
                          'bg-primary text-light-btnText': active,
                          'text-gray-900': !active
                        })
                      }
                      value={l}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={classnames('block truncate font-montserrat', {
                              'font-medium': selected,
                              'font-regular': !selected
                            })}
                          >
                            {l.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <Selected />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      {error ? (
        <div className="mt-[8px] items-center flex">
          <ExclamationCircleIcon
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

const Selected = () => (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    />
  </svg>
)

const Selector: React.FC<{ error: string | null; success: boolean }> = ({ error, success }) => (
  <svg
    className={classnames('h-5 w-5', {
      ' text-light-text dark:text-dark-text': !error && !success,
      ' text-error-text': error,
      ' text-success-text': success
    })}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)
