import { ChangeEvent, useState, LegacyRef, useContext } from 'react'
import classnames from 'classnames'
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi'
import { Select } from 'components'
import PhoneInput from 'react-phone-input-2'
import { ThemeContext } from 'contexts'

export type InputSizes = 'sm' | 'md' | 'lg'
export type IconPosition = 'leading' | 'trailing'
type DropdownData = {
  label: string
  value: string
}

export type InputProps = {
  value?: string
  type?: 'text' | 'number' | 'tel' | 'email' | 'password'
  name?: string
  label?: string
  error?: string
  success?: boolean
  size?: InputSizes
  placeholder?: string
  disabled?: boolean
  onFocus?: () => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyUp?: (e: ChangeEvent<HTMLInputElement>) => void
  max?: number
}

type BasicProps = InputProps & {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  ref?: LegacyRef<HTMLInputElement>
}

export type IconProps = InputProps & {
  iconPosition?: IconPosition
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  ref?: LegacyRef<HTMLInputElement>
}

export type AddOnProps = InputProps & {
  addOnText: string
  addOnPosition?: IconPosition
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  ref?: LegacyRef<HTMLInputElement>
}

type DropdownProps = InputProps & {
  list: DropdownData[]
  setSelected: (value: unknown) => void
  loading?: boolean
  selectPlaceholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  ref?: LegacyRef<HTMLInputElement>
}

type PhoneProps = InputProps & {
  onSetPhone: (value: string) => void
  ref?: LegacyRef<HTMLInputElement>
}

export type TextareaProps = InputProps & {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  ref?: LegacyRef<HTMLTextAreaElement>
}

export const Basic: React.FC<BasicProps> = (props) => {
  const { type, name, label, value, placeholder, onChange, disabled, size, error, success, max } =
    props

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames('block mb-[8px] font-lato font-medium', {
            'text-pSmall': size === 'sm',
            'text-pNormal': size === 'md' || !size || size === 'lg',
            'text-light-form-label dark:text-dark-form-label': !error && !success,
            'text-error': error,
            'text-success': success
          })}
        >
          {label}
        </label>
      ) : null}
      <input
        type={type ?? 'text'}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        className={classnames(
          'font-montserrat font-regular focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
          {
            'h-[40px] text-pSmall': size === 'sm',
            'h-[45px] text-pNormal': size === 'md' || !size,
            'h-[50px] text-pNormal': size === 'lg',
            'border-light-form-inputBorder ': !error && !success,
            'border-error': error,
            'border-success': success
          }
        )}
        onChange={onChange}
        disabled={disabled}
        maxLength={max}
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
    IconSVG,
    max,
    onBlur,
    ref
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
            'text-error': error,
            'text-success': success
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
              'text-error': error,
              'text-success': success
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
            'font-montserrat font-regular  focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full pr-[16px] py-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size,
              'h-[50px] text-pNormal': size === 'lg',
              'pl-[40px]': iconPosition === 'leading' || !iconPosition,
              'pl-[16px]': iconPosition === 'trailing',
              'border-light-form-inputBorder': !error && !success,
              'border-error-text': error,
              'border-success-text': success
            }
          )}
          onChange={onChange}
          disabled={disabled}
          maxLength={max}
          onBlur={onBlur}
          ref={ref}
        />
      </div>
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
    addOnText,
    max,
    onBlur,
    ref
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
            'text-error': error,
            'text-success': success
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
            'font-montserrat font-regular focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded-none  focus:outline-none focus:ring-1 focus:border-transparent block w-full pr-[16px] py-[16px] px-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size,
              'h-[50px] text-pNormal': size === 'lg',
              'rounded-r': addOnPosition === 'leading' || !addOnPosition,
              'rounded-l': addOnPosition === 'trailing',
              'border-light-form-inputBorder ': !error && !success,
              'border-error': error,
              'border-success': success
            }
          )}
          onChange={onChange}
          disabled={disabled}
          maxLength={max}
          onBlur={onBlur}
          ref={ref}
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
    setSelected,
    list,
    loading,
    selectPlaceholder,
    max,
    onBlur,
    ref
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
            'text-error': error,
            'text-success': success
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
            'font-montserrat font-regular focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size,
              'h-[50px] text-pNormal': size === 'lg',
              'border-light-form-inputBorder ': !error && !success,
              'border-error': error,
              'border-success': success
            }
          )}
          onChange={onChange}
          disabled={disabled}
          maxLength={max}
          onBlur={onBlur}
          ref={ref}
        />
        <div className="w-48">
          <Select.Single
            onChange={setSelected}
            options={list}
            disabled={disabled}
            error={error}
            placeholder={selectPlaceholder}
            loading={loading}
            size={size}
          />
        </div>
      </div>
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
export const Password: React.FC<BasicProps> = (props) => {
  const { name, label, value, placeholder, onChange, disabled, size, error, success, onBlur, ref } =
    props
  const [visible, setVisible] = useState(false)

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames('block mb-[8px] font-lato font-medium', {
            'text-pSmall': size === 'sm',
            'text-pNormal': size === 'md' || !size || size === 'lg',
            'text-light-form-label dark:text-dark-form-label': !error && !success,
            'text-error': error,
            'text-success': success
          })}
        >
          {label}
        </label>
      ) : null}
      <div className="relative flex">
        <input
          type={!visible ? 'password' : 'text'}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          className={classnames(
            'font-montserrat font-regular border-r-0 rounded-r-none  dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size,
              'h-[50px] text-pNormal': size === 'lg',
              'border-light-form-inputBorder focus:ring-primary': !error && !success,
              'border-error': error,
              'border-success': success
            }
          )}
          onChange={onChange}
          disabled={disabled}
          onBlur={onBlur}
          ref={ref}
          autoComplete=""
        />
        <span
          className={classnames(
            'inline-flex items-center text-light-text dark:text-dark-text px-3 font-lato font-medium border border-l-0 rounded-r border-light-form-inputBorder dark:border-dark-border bg-light-container dark:bg-dark-container',
            {
              'border-error-text': error
            }
          )}
        >
          {!visible ? (
            <FiEye
              className={classnames('w-5 h-5 cursor-pointer', {
                'text-light-form-placeholder dark:text-dark-form-placeholder': !error && !success,
                'text-error': error,
                'text-success': success
              })}
              onClick={() => setVisible(!visible)}
            />
          ) : (
            <FiEyeOff
              className={classnames('w-5 h-5 cursor-pointer', {
                'text-light-form-placeholder dark:text-dark-form-placeholder': !error && !success,
                'text-error': error,
                'text-success': success
              })}
              onClick={() => setVisible(!visible)}
            />
          )}
        </span>
      </div>
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
export const Phone: React.FC<PhoneProps> = (props) => {
  const {
    name,
    label,
    value,
    placeholder,
    disabled,
    size,
    error,
    success,
    onBlur,
    onSetPhone,
    ref
  } = props
  const { theme } = useContext(ThemeContext)

  return (
    <div className="">
      {label ? (
        <label
          htmlFor={name}
          className={classnames('block mb-[8px] font-lato font-medium', {
            'text-pSmall': size === 'sm',
            'text-pNormal': size === 'md' || !size || size === 'lg',
            'text-light-form-label dark:text-dark-form-label': !error && !success,
            'text-error': error,
            'text-success': success
          })}
        >
          {label}
        </label>
      ) : null}
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={onSetPhone}
        inputClass={classnames(
          'font-montserrat font-regular focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed'
        )}
        inputStyle={{
          borderRadius: '4px',
          height: size === 'sm' ? '40px' : size === 'md' ? '45px' : size === 'lg' ? '50px' : '45px',
          border: `1px solid ${
            error ? '#B5241E' : success ? '#376A20' : theme === 'dark' ? '#2D2D2D' : '#DDE0E4'
          }`,
          width: 'inherit',
          fontSize:
            size === 'sm' ? '13.2px' : size === 'md' ? '16px' : size === 'lg' ? '19.2px' : '16px'
        }}
        country="cd"
        preferredCountries={['cd', 'us', 'gb', 'gh']}
        inputProps={{
          name: name,
          placeholder: placeholder,
          onBlur: onBlur,
          ref: ref
        }}
        countryCodeEditable={false}
        buttonStyle={{
          border: `1px solid ${
            error ? '#B5241E' : success ? '#376A20' : theme === 'dark' ? '#2D2D2D' : '#DDE0E4'
          }`,
          backgroundColor: theme === 'dark' ? '#212021' : '#FEFEFE'
        }}
        dropdownStyle={{
          backgroundColor: theme === 'dark' ? '#212021' : '#FEFEFE',
          color: theme === 'dark' ? '#FFFFFF' : '#121212'
        }}
        disabled={disabled}
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
export const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    name,
    label,
    value,
    placeholder,
    onChange,
    disabled,
    size,
    error,
    success,
    max,
    rows,
    ref
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
            'text-error': error,
            'text-success': success
          })}
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        className={classnames(
          'font-montserrat font-regular focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
          {
            'border-light-form-inputBorder ': !error && !success,
            'border-error': error,
            'border-success': success
          }
        )}
        onChange={onChange}
        disabled={disabled}
        maxLength={max}
        rows={rows ?? 4}
        ref={ref}
      ></textarea>
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
