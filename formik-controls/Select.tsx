import { Field, ErrorMessage } from 'formik'
import { Select } from 'components/index'
import InputError from './InputError'

export const SelectInput: React.FC<Select.SelectProps> = (props) => {
  const { name, label, options, size, success, placeholder, ...rest } = props

  return (
    <div className="">
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
              error={form.errors[name]}
              {...rest}
            />
          )
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </div>
  )
}
