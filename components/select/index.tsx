import React from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import { CustomStyles } from './styles'
import { FiAlertCircle } from 'react-icons/fi'
import makeAnimated from 'react-select/animated'
import { ThemeContext } from 'contexts/Theme'

type InputSizes = 'sm' | 'md' | 'lg'

export type SelectData = {
  label: string
  value: string
}

export type SelectProps = {
  options: SelectData[]
  name?: string
  label?: string
  error?: string
  size?: InputSizes
  disabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
  placeholder?: string
  loading?: boolean
  success?: boolean
  isClearable?: boolean
}

type SingleProps = SelectProps & {
  defaultValue?: SelectData | unknown
  onChange?: (value: unknown) => void
}

type MultipleProps = SelectProps & {
  defaultValue?: SelectData[] | unknown
  onChange?: (value: unknown) => void
}

export const Single: React.FC<SingleProps> = (props) => {
  const { theme } = React.useContext(ThemeContext)
  const {
    name,
    label,
    defaultValue,
    placeholder,
    onChange,
    disabled,
    size,
    error,
    options,
    success,
    loading,
    isClearable
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
      <Select
        className={classnames('font-montserrat font-regular', {
          'text-pSmall': size === 'sm',
          'text-pNormal': size === 'md' || !size || size === 'lg'
        })}
        classNamePrefix=""
        isDisabled={disabled}
        isLoading={loading}
        defaultValue={defaultValue}
        isClearable={isClearable}
        isSearchable
        options={options}
        placeholder={placeholder}
        instanceId="cdbehbvueifvb"
        onChange={onChange}
        name={name}
        id={name}
        styles={CustomStyles(size ?? 'md', error ?? '', success ?? false, theme)}
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

export const Multiple: React.FC<MultipleProps> = (props) => {
  const { theme } = React.useContext(ThemeContext)
  const {
    name,
    label,
    defaultValue,
    placeholder,
    onChange,
    disabled,
    size,
    error,
    options,
    success,
    loading,
    isClearable
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
      <Select
        className={classnames('font-montserrat font-regular', {
          'text-pSmall': size === 'sm',
          'text-pNormal': size === 'md' || !size || size === 'lg'
        })}
        isMulti
        classNamePrefix=""
        isDisabled={disabled}
        isLoading={loading}
        defaultValue={defaultValue}
        isClearable={isClearable}
        isSearchable
        options={options}
        placeholder={placeholder}
        instanceId="ewewewewewew"
        onChange={onChange}
        name={name}
        id={name}
        styles={CustomStyles(size ?? 'md', error ?? '', success ?? false, theme)}
        components={makeAnimated()}
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
