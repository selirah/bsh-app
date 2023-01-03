import { Fragment } from 'react'
import { Field, ErrorMessage, useField } from 'formik'
import { Select } from 'components/index'
import InputError from './InputError'

type Props = Select.SelectProps & {
  isMulti?: boolean
}

export const SelectInput: React.FC<Props> = (props) => {
  const { name, label, options, size, success, placeholder, isMulti, disabled, ...rest } = props
  const [value] = useField(name)

  return (
    <Fragment>
      {!isMulti ? (
        <Field name={name} {...rest}>
          {({ form }) => {
            const { setFieldValue } = form
            return (
              <Select.Single
                options={options}
                name={name}
                label={label}
                onChange={(value) => setFieldValue(name, value)}
                size={size}
                success={success}
                placeholder={placeholder}
                disabled={disabled}
                value={value.value ?? ''}
                {...rest}
              />
            )
          }}
        </Field>
      ) : (
        <Field name={name} {...rest}>
          {({ form }) => {
            const { setFieldValue } = form
            return (
              <Select.Multiple
                options={options}
                name={name}
                label={label}
                onChange={(value) => setFieldValue(name, value)}
                size={size}
                success={success}
                placeholder={placeholder}
                disabled={disabled}
                value={value.value ?? ''}
                {...rest}
              />
            )
          }}
        </Field>
      )}

      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </Fragment>
  )
}
