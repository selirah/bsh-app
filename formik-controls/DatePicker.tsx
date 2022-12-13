import { Field, ErrorMessage } from 'formik'
import DateView from 'react-datepicker'
import classnames from 'classnames'
import InputError from './InputError'
import { FiCalendar } from 'react-icons/fi'

type InputSizes = 'sm' | 'md' | 'lg'
type IconPosition = 'leading' | 'trailing'
type DateFormat = 'yyyy-MM-dd' | 'dd-MM-yyyy' | 'MM-dd-yyyy'
type DatePlacement = 'top-start' | 'top' | 'top-end' | 'bottom' | 'bottom-end' | 'bottom-start'

type DatepickerProps = {
  label?: string
  name: string
  size?: InputSizes
  iconPosition?: IconPosition
  placeholder?: string
  icon?: boolean
  format?: DateFormat
  disabled?: boolean
  placement?: DatePlacement
}

export const Datepicker: React.FC<DatepickerProps> = (props) => {
  const {
    label,
    name,
    size,
    icon,
    placeholder,
    format,
    disabled,
    placement,
    iconPosition,
    ...rest
  } = props
  return (
    <div className="form-control">
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
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field
          return (
            <div className="relative">
              {icon && (
                <div
                  className={classnames(
                    'flex absolute inset-y-0 items-center pointer-events-none',
                    {
                      'left-0 pl-3': iconPosition === 'leading' || !iconPosition,
                      'right-0 pr-3': iconPosition === 'trailing'
                    }
                  )}
                >
                  <FiCalendar className="z-10 w-5 h-5 text-light-form-placeholder dark:text-dark-form-placeholder" />
                </div>
              )}
              <DateView
                id={name}
                {...field}
                {...rest}
                selected={value}
                onChange={(value) => setFieldValue(name, value)}
                className={classnames(
                  'font-montserrat font-regular focus:ring-primary border-light-form-inputBorder dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
                  {
                    'h-[40px] text-pSmall': size === 'sm',
                    'h-[45px] text-pNormal': size === 'md' || !size,
                    'h-[50px] text-pNormal': size === 'lg'
                  }
                )}
                placeholderText={placeholder}
                dateFormat={format ?? 'yyyy-MM-dd'}
                disabled={disabled}
                popperPlacement={placement ?? 'bottom-start'}
              />
            </div>
          )
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </div>
  )
}
