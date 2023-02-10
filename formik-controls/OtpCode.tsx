import { Field, ErrorMessage } from 'formik'
import { CodeInput, CodeInputProps } from 'components'
import InputError from './InputError'

export const OtpCode: React.FC<CodeInputProps> = (props) => {
  const { name, size, fields, ...rest } = props
  return (
    <div className="">
      <Field name={name} {...rest}>
        {({ form }) => {
          const { setFieldValue } = form
          return (
            <CodeInput
              size={size}
              fields={fields}
              onChange={(value) => setFieldValue(name, value)}
              {...rest}
            />
          )
        }}
      </Field>
      <ErrorMessage name={name}>{(msg) => <InputError size={size}>{msg}</InputError>}</ErrorMessage>
    </div>
  )
}
