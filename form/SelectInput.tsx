import { Field } from 'formik'
import { Select } from 'components/index'

export const SelectInput: React.FC<Select.SelectProps> = (props) => {
  const { name, label, options, size, success, placeholder, ...rest } = props

  return (
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
  )
}
