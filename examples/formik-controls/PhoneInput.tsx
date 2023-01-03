import { Fragment } from 'react'
import { Field, ErrorMessage } from 'formik'
import { Input } from 'components/index'
import InputError from './InputError'

export const PhoneInput: React.FC<Input.InputProps> = (props) => {
  const { name, label, size, success, placeholder, disabled, value, ...rest } = props
  return (
    <Fragment>
      <Field name={name} {...rest}>
        {({ form }) => {
          const { setFieldValue } = form
          return (
            <Input.Phone
              name={name}
              label={label}
              onSetPhone={(value) => setFieldValue(name, value)}
              size={size}
              placeholder={placeholder}
              success={success}
              disabled={disabled}
              value={value}
            />
          )
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </Fragment>
  )
}
