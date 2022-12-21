import { useIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Formik, Form } from 'formik'
import { Customer, MasterAgentFormValues } from 'types'
import { CustomerDetails } from 'controllers'
import { Button } from 'components'

type Props = {
  data: MasterAgentFormValues
  handleNextStep: (data: MasterAgentFormValues, final?: boolean) => void
  customer: Customer
  isAgentValidationSuccess: boolean
  isValidatingAgent: boolean
}

export const StepOne: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { customer, handleNextStep, data, isAgentValidationSuccess, isValidatingAgent } = props

  const handleSubmit = (values: MasterAgentFormValues) => {
    handleNextStep(values)
  }

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {() => (
        <>
          <Form>
            <div className="h-[32rem] relative animate__animated animate__fadeIn">
              <PerfectScrollbar>
                <CustomerDetails customer={customer} />
              </PerfectScrollbar>
            </div>
            <div className="mt-8 py-6 flex justify-end border-t border-light-border dark:border-dark-border">
              <Button
                size="sm"
                disabled={isAgentValidationSuccess || isValidatingAgent}
                type="submit"
              >
                {intl.formatMessage({ defaultMessage: 'Next' })}
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  )
}
