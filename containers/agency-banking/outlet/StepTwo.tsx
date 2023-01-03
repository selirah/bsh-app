import { useContext } from 'react'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Formik, Form } from 'formik'
import { Input, PhoneInput } from 'examples/formik-controls'
import { AgentFormValues } from 'types'
import { Button } from 'components'
import { outletStepTwoValidation } from 'validation-schema/agency-banking'

type Props = {
  data: AgentFormValues
  handleNextStep: (values: AgentFormValues, final?: boolean) => void
  handlePrevStep: (values: AgentFormValues) => void
}

export const StepTwo: React.FC<Props> = (props) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const { data, handleNextStep, handlePrevStep } = props

  const onSubmit = (values: AgentFormValues) => {
    handleNextStep(values)
  }

  return (
    <Formik
      initialValues={data}
      onSubmit={onSubmit}
      validationSchema={outletStepTwoValidation(intl)}
    >
      {({ isValid, values }) => (
        <Form>
          <div className="h-[32rem] relative animate__animated animate__fadeIn">
            <PerfectScrollbar className="px-1">
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agentName"
                    label={intl.formatMessage({ defaultMessage: 'Outlet Name' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter outlet name'
                    })}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <PhoneInput
                    name="phoneNumber"
                    label={intl.formatMessage({ defaultMessage: 'Outlet Phone number' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                  />
                </div>
              </div>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agencyManagerName"
                    label={intl.formatMessage({ defaultMessage: 'Outlet Manager Name' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter outlet manager name'
                    })}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <PhoneInput
                    name="agencyManagerPhone"
                    label={intl.formatMessage({ defaultMessage: 'Outlet Manager Phone number' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                  />
                </div>
              </div>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agencyRegion"
                    label={intl.formatMessage({ defaultMessage: 'Region' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter region'
                    })}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agencyProvince"
                    label={intl.formatMessage({ defaultMessage: 'Province' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter province'
                    })}
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
