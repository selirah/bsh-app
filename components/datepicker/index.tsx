import React from 'react'
import classnames from 'classnames'
import DatePicker from 'react-datepicker'
import { FiAlertCircle, FiCalendar } from 'react-icons/fi'

type DateFormat = 'yyyy-MM-dd' | 'dd-MM-yyyy' | 'MM-dd-yyyy'
type InputSizes = 'sm' | 'md' | 'lg'
type DatePlacement = 'top-start' | 'top' | 'top-end' | 'bottom' | 'bottom-end' | 'bottom-start'
type IconPosition = 'leading' | 'trailing'

type DatePickerProps = {
  label?: string
  disabled?: boolean
  placeholder?: string
  onBlur?: () => void
  onFocus?: () => void
  format?: DateFormat
  size?: InputSizes
  showYearDropDown?: boolean
  scrollableYearDropDown?: boolean
  showMonthYearDropdown?: boolean
  showMonthDropDown?: boolean
  scrollableMonthYearDropdown?: boolean
  showFullMonthYearPicker?: boolean
  maxDate?: Date
  placement?: DatePlacement
  minDate?: Date
  yearDropDownItemNumber?: number
  showDisabledMonthNavigation?: boolean
  name?: string
  error?: string
  success?: boolean
  isRange?: boolean
  onChange?: (value: any) => void
  endDate?: Date
  startDate?: Date
  value?: Date
}

export type IconProps = DatePickerProps & {
  iconPosition?: IconPosition
}

export const Basic: React.FC<DatePickerProps> = (props) => {
  const {
    startDate,
    disabled,
    onBlur,
    onChange,
    placeholder,
    format,
    showYearDropDown,
    showMonthDropDown,
    scrollableYearDropDown,
    maxDate,
    placement,
    minDate,
    yearDropDownItemNumber,
    showDisabledMonthNavigation,
    showMonthYearDropdown,
    scrollableMonthYearDropdown,
    showFullMonthYearPicker,
    label,
    onFocus,
    size,
    name,
    error,
    success,
    isRange,
    endDate,
    value
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
      <DatePicker
        className={classnames(
          'font-montserrat font-regular focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
          {
            'h-[40px] text-pSmall': size === 'sm',
            'h-[45px] text-pNormal': size === 'md' || !size,
            'h-[50px] text-pNormal': size === 'lg',
            'border-light-form-inputBorder ': !error && !success,
            'border-error-text': error,
            'border-success-text': success
          }
        )}
        selected={isRange ? startDate : value}
        onChange={onChange}
        dateFormat={format ?? 'yyyy-MM-dd'}
        tabIndex={0}
        disabled={disabled}
        onBlur={onBlur}
        placeholderText={placeholder}
        yearDropdownItemNumber={yearDropDownItemNumber ?? 100}
        scrollableYearDropdown={scrollableYearDropDown}
        showYearDropdown={showYearDropDown}
        showMonthDropdown={showMonthDropDown}
        showMonthYearDropdown={showMonthYearDropdown}
        scrollableMonthYearDropdown={scrollableMonthYearDropdown}
        showFullMonthYearPicker={showFullMonthYearPicker}
        maxDate={maxDate}
        minDate={minDate}
        popperPlacement={placement ?? 'bottom-start'}
        showDisabledMonthNavigation={showDisabledMonthNavigation}
        onFocus={onFocus}
        selectsRange={isRange}
        startDate={startDate}
        endDate={endDate}
        popperClassName="rounded border-light-form-inputBorder"
        calendarClassName="shadow-penumbra border-light-border"
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
    startDate,
    disabled,
    onBlur,
    onChange,
    placeholder,
    format,
    showYearDropDown,
    showMonthDropDown,
    scrollableYearDropDown,
    maxDate,
    placement,
    minDate,
    yearDropDownItemNumber,
    showDisabledMonthNavigation,
    showMonthYearDropdown,
    scrollableMonthYearDropdown,
    showFullMonthYearPicker,
    label,
    onFocus,
    size,
    name,
    error,
    success,
    isRange,
    endDate,
    iconPosition,
    value
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
          <FiCalendar
            className={classnames('z-10 w-5 h-5', {
              'text-light-form-placeholder dark:text-dark-form-placeholder': !error && !success,
              'text-error-text': error,
              'text-success-text': success
            })}
          />
        </div>
        <DatePicker
          className={classnames(
            'font-montserrat font-regular focus:ring-primary dark:border-dark-border text-light-form-inputText dark:text-dark-form-inputText placeholder:text-light-form-placeholder dark:placeholder:text-dark-form-placeholder bg-light-container dark:bg-dark-container border rounded focus:outline-none focus:ring-1 focus:border-transparent block w-full p-[16px] common-transition focus:shadow-penumbra disabled:bg-light-form-inputDisabled dark:disabled:bg-dark-form-inputDisabled disabled:cursor-not-allowed',
            {
              'h-[40px] text-pSmall': size === 'sm',
              'h-[45px] text-pNormal': size === 'md' || !size,
              'h-[50px] text-pNormal': size === 'lg',
              'pl-[40px]': iconPosition === 'leading' || !iconPosition,
              'pl-[16px]': iconPosition === 'trailing',
              'border-light-form-inputBorder ': !error && !success,
              'border-error-text': error,
              'border-success-text': success
            }
          )}
          selected={isRange ? startDate : value}
          onChange={onChange}
          dateFormat={format ?? 'yyyy-MM-dd'}
          tabIndex={0}
          disabled={disabled}
          onBlur={onBlur}
          placeholderText={placeholder}
          yearDropdownItemNumber={yearDropDownItemNumber ?? 100}
          scrollableYearDropdown={scrollableYearDropDown}
          showYearDropdown={showYearDropDown}
          showMonthDropdown={showMonthDropDown}
          showMonthYearDropdown={showMonthYearDropdown}
          scrollableMonthYearDropdown={scrollableMonthYearDropdown}
          showFullMonthYearPicker={showFullMonthYearPicker}
          maxDate={maxDate}
          minDate={minDate}
          popperPlacement={placement ?? 'bottom-start'}
          showDisabledMonthNavigation={showDisabledMonthNavigation}
          onFocus={onFocus}
          selectsRange={isRange}
          startDate={startDate}
          endDate={endDate}
          popperClassName="rounded border-light-form-inputBorder"
          calendarClassName="shadow-penumbra border-light-border"
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
