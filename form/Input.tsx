import { Field } from 'formik'
import { Input } from 'components/index'

export const Basic: React.FC<Input.InputProps> = (props) => {
  const { name, label, placeholder, success, size, disabled, ...rest } = props

  return (
    <Field name={name} id={name} {...rest}>
      {({ field, form }) => {
        return (
          <Input.Basic
            label={label}
            name={name}
            size={size}
            error={form.errors[name]}
            placeholder={placeholder}
            success={success}
            disabled={disabled}
            {...field}
          />
        )
      }}
    </Field>
  )
}

export const Icon: React.FC<Input.IconProps> = (props) => {
  const { name, label, placeholder, success, size, IconSVG, iconPosition, disabled, ...rest } =
    props

  return (
    <Field name={name} id={name} {...rest}>
      {({ field, form }) => {
        return (
          <Input.Icon
            label={label}
            name={name}
            size={size}
            error={form.errors[name]}
            placeholder={placeholder}
            success={success}
            IconSVG={IconSVG}
            iconPosition={iconPosition}
            disabled={disabled}
            {...field}
          />
        )
      }}
    </Field>
  )
}

export const AddOn: React.FC<Input.AddOnProps> = (props) => {
  const { name, label, placeholder, success, size, addOnPosition, addOnText, disabled, ...rest } =
    props

  return (
    <Field name={name} id={name} placeholder="okay" {...rest}>
      {({ field, form }) => {
        return (
          <Input.AddOn
            label={label}
            name={name}
            size={size}
            error={form.errors[name]}
            placeholder={placeholder}
            success={success}
            addOnText={addOnText}
            addOnPosition={addOnPosition}
            disabled={disabled}
            {...field}
          />
        )
      }}
    </Field>
  )
}
