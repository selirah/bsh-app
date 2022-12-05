import { Field } from 'formik'
import { DatePicker as DateView } from 'components'

export const Basic: React.FC<DateView.DatePickerProps> = (props) => {
  const { label, name, ...rest } = props
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field

          return (
            <DateView.Basic
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(value) => setFieldValue(name, value)}
              error={form.errors[name]}
            />
          )
        }}
      </Field>
    </div>
  )
}

export const Icon: React.FC<DateView.IconProps> = (props) => {
  const { label, name, iconPosition, ...rest } = props
  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form
        const { value } = field

        return (
          <DateView.Icon
            id={name}
            {...field}
            {...rest}
            selected={value}
            onChange={(value) => setFieldValue(name, value)}
            error={form.errors[name]}
            label={label}
            iconPosition={iconPosition}
          />
        )
      }}
    </Field>
  )
}
