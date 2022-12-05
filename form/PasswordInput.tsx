import { Field } from 'formik'
import { Input } from 'components/index'

export const PasswordInput: React.FC<Input.InputProps> = (props) => {
  const { name, label, placeholder, success, size, ...rest } = props

  return (
    <Field name={name} id={name} {...rest}>
      {({ field, form }) => {
        return (
          <Input.Password
            label={label}
            name={name}
            size={size}
            error={form.errors[name]}
            placeholder={placeholder}
            success={success}
            {...field}
          />
        )
      }}
    </Field>
  )
}
