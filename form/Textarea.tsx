import { Field } from 'formik'
import { Input } from 'components/index'

export const Textarea: React.FC<Input.TextareaProps> = (props) => {
  const { name, label, placeholder, success, size, disabled, rows, ...rest } = props

  return (
    <Field name={name} id={name} {...rest}>
      {({ field, form }) => {
        return (
          <Input.Textarea
            label={label}
            name={name}
            size={size}
            error={form.errors[name]}
            placeholder={placeholder}
            success={success}
            disabled={disabled}
            rows={rows}
            {...field}
          />
        )
      }}
    </Field>
  )
}
