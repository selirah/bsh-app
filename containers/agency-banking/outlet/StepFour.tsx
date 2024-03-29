import { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useIntl } from 'react-intl'
import { FileInput, Checkbox } from 'formik-controls'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AgentFormValues } from 'types'
import { Button } from 'components'

type Props = {
  data: AgentFormValues
  handleNextStep: (values: AgentFormValues, final?: boolean) => void
  handlePrevStep: (values: AgentFormValues) => void
}

export const StepFour: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { handleNextStep, handlePrevStep, data } = props

  const onSubmit = (values: AgentFormValues) => {
    handleNextStep(values)
  }

  return (
    <Formik initialValues={data} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <div className="h-[32rem] relative animate__animated animate__fadeIn">
            <PerfectScrollbar className="px-1">
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <FileInput
                    name="agentLogo"
                    extensions={['.jpg', '.jpeg', '.png']}
                    maxSizeInKB={1000}
                    label={intl.formatMessage({
                      defaultMessage: 'Upload business logo (Optional)'
                    })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    multiple={false}
                    maxFiles={1}
                  />
                </div>
              </div>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Checkbox
                    name="agencyPOSMachine"
                    label={intl.formatMessage({
                      defaultMessage: 'Does outlet requires POS machine?'
                    })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                  />
                </div>
              </div>
            </PerfectScrollbar>
          </div>
          <div className="mt-8 py-6 flex justify-between border-t border-light-border dark:border-dark-border">
            <Button size="sm" outline color="default" onClick={() => handlePrevStep(values)}>
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
            <Button size="sm" type="submit">
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
