import React from 'react'
import Select from 'react-select'
import classnames from 'classnames'
import { CustomStyles } from './styles'
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import makeAnimated from 'react-select/animated'

type InputSizes = 'sm' | 'md' | 'lg'

type SelectData = {
  label: string
  value: string | number
}

interface SelectProps {
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
}

interface SingleProps extends SelectProps {
  defaultValue?: SelectData | unknown
  onChange: (value: unknown) => void
}

interface MultipleProps extends SelectProps {
  defaultValue?: SelectData[] | unknown
  onChange: (value: unknown) => void
}

export const Single: React.FC<SingleProps> = (props) => {
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
    loading
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
      <Select
        className={classnames('font-montserrat font-regular', {
          'text-pSmall': size === 'sm',
          'text-pNormal': size === 'md' || !size || size === 'lg'
        })}
        classNamePrefix=""
        isDisabled={disabled}
        isLoading={loading}
        defaultValue={defaultValue}
        isClearable
        isSearchable
        options={options}
        placeholder={placeholder}
        instanceId="cdbehbvueifvb"
        onChange={onChange}
        name={name}
        id={name}
        styles={CustomStyles(size ?? 'md', error ?? '', success ?? false)}
      />
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

export const Multiple: React.FC<MultipleProps> = (props) => {
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
    loading
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
        isClearable
        isSearchable
        options={options}
        placeholder={placeholder}
        instanceId="cdbehbvueifvb"
        onChange={onChange}
        name={name}
        id={name}
        styles={CustomStyles(size ?? 'md', error ?? '', success ?? false)}
        components={makeAnimated()}
      />
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