import { Field } from 'formik'
import { Checkbox as CB } from 'components/index'

export const Checkbox: React.FC<CB.BasicProps> = (props) => {
  const { name, label, size, ...rest } = props

  return (
    <Field name={name} id={name} {...rest}>
      {({ field, form }) => {
        return (
          <CB.Basic label={label} name={name} size={size} error={form.errors[name]} {...field} />
        )
      }}
    </Field>
  )
}
