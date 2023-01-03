import { useContext } from 'react'
import { useIntl } from 'react-intl'
import { LayoutContext } from 'contexts'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Formik, Form } from 'formik'
import { Input } from 'examples/formik-controls'
import { AgentFormValues } from 'types'
import { Button } from 'components'
import { outletStepThreeValidation } from 'validation-schema/agency-banking'

type Props = {
  data: AgentFormValues
  handleNextStep: (values: AgentFormValues, final?: boolean) => void
  handlePrevStep: (values: AgentFormValues) => void
}

export const StepThree: React.FC<Props> = (props) => {
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
      validationSchema={outletStepThreeValidation(intl)}
    >
      {({ isValid, values }) => (
        <Form>
          <div className="h-[32rem] relative animate__animated animate__fadeIn">
            <PerfectScrollbar className="px-1">
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agencyTerritory"
                    label={intl.formatMessage({ defaultMessage: 'Territory' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter territory'
                    })}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agencySector"
                    label={intl.formatMessage({ defaultMessage: 'Sector' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter sector'
                    })}
                  />
                </div>
              </div>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agencyCommune"
                    label={intl.formatMessage({ defaultMessage: 'Commune' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter commune'
                    })}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agencyStreet"
                    label={intl.formatMessage({ defaultMessage: 'Street/Physical Location' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter street name'
                    })}
                  />
                </div>
              </div>
              <div className="mt-4 mb-6 md:grid md:grid-cols-2 md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="agencyBuilding"
                    label={intl.formatMessage({ defaultMessage: 'Building' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter building name'
                    })}
                  />
                </div>
                <div className="mb-4 md:mb-0">
                  <Input
                    name="latitude"
                    label={intl.formatMessage({ defaultMessage: 'GPRS Coodinates' })}
                    size={layout === 'mobile' ? 'sm' : 'md'}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Enter GPRS'
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
