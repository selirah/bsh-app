import { useContext } from 'react'
import { Formik, Form } from 'formik'
import { LayoutContext } from 'contexts'
import { useIntl } from 'react-intl'
import { Input, PhoneInput } from 'examples/formik-controls'
import { Button, AppleLoader } from 'components'
import { OutletUser } from 'types'
import { outletUserValidation } from 'validation-schema/agency-banking'
import { MdCreate } from 'react-icons/md'

type Props = {
  onSubmit: (values: OutletUser) => void
  isSubmitting: boolean
  agentCode: string
}

export const CreateUserForm: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { isSubmitting, onSubmit, agentCode } = props
  const initialValues: OutletUser = {
    outletCode: agentCode,
    name: '',
    idNumber: '',
    msisdn: ''
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={outletUserValidation(intl)}
    >
      {({ isValid }) => {
        return (
          <Form>
            <div className="w-full animate__animated animate__fadeIn">
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="outletCode"
                    label={intl.formatMessage({ defaultMessage: 'Outlet Code' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter outlet code . . .'
                    })}
                    disabled
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <Input
                    name="name"
                    label={intl.formatMessage({ defaultMessage: 'Name' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter name of user . . .'
                    })}
                  />
                </div>
              </div>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="idNumber"
                    label={intl.formatMessage({ defaultMessage: 'ID Number' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter ID number of user . . .'
                    })}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <PhoneInput
                    name="msisdn"
                    label={intl.formatMessage({ defaultMessage: 'Phone Number' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter phone number of user . . .'
                    })}
                  />
                </div>
              </div>
              <div className="mt-8 py-6">
                <Button size="md" disabled={!isValid || isSubmitting} type="submit">
                  <div className="flex items-center space-x-2">
                    {isSubmitting ? <AppleLoader size="lg" /> : <MdCreate />}
                    <span>
                      {isSubmitting
                        ? intl.formatMessage({ defaultMessage: 'Processing...' })
                        : intl.formatMessage({ defaultMessage: 'Save' })}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
