import { useContext } from 'react'
import { Formik, Form } from 'formik'
import { useIntl } from 'react-intl'
import { FileInput } from 'formik-controls'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { MasterAgentFormValues } from 'types'
import { Button } from 'components'

type Props = {
  data: MasterAgentFormValues
  handleNextStep: (values: MasterAgentFormValues, final?: boolean) => void
  handlePrevStep: (values: MasterAgentFormValues) => void
}

export const StepThree: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { handleNextStep, handlePrevStep, data } = props

  const onSubmit = (values: MasterAgentFormValues) => {
    handleNextStep(values)
  }

  return (
    <Formik initialValues={data} onSubmit={onSubmit}>
      {({ isValid, values }) => (
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
                <div className="mb-4 md:mb-0">
                  <FileInput
                    name="businessCertificate"
                    extensions={['.pdf']}
                    maxSizeInKB={1000}
                    label={intl.formatMessage({
                      defaultMessage: 'Upload business certificate (Form 1A)'
                    })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    multiple={false}
                    maxFiles={1}
                  />
                </div>
              </div>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <FileInput
                    name="scannedDocuments"
                    extensions={['.jpg', '.jpeg', '.png', '.pdf']}
                    maxSizeInKB={1000}
                    label={intl.formatMessage({
                      defaultMessage: 'Upload scanned documents'
                    })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    multiple
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <FileInput
                    name="otherDocuments"
                    extensions={['.jpg', '.jpeg', '.png', '.pdf']}
                    maxSizeInKB={1000}
                    label={intl.formatMessage({
                      defaultMessage: 'Upload other documents (Optional)'
                    })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    multiple
                  />
                </div>
              </div>
            </PerfectScrollbar>
          </div>
          <div className="mt-8 py-6 flex justify-between border-t border-light-border dark:border-dark-border">
            <Button size="sm" outline color="default" onClick={() => handlePrevStep(values)}>
              {intl.formatMessage({ defaultMessage: 'Back' })}
            </Button>
            <Button size="sm" disabled={!isValid} type="submit">
              {intl.formatMessage({ defaultMessage: 'Next' })}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
