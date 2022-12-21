import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import {
  Customer,
  CustomerAccount,
  AgentPayload,
  SuccessResponse,
  ErrorResponse,
  MasterAgentFormValues
} from 'types'
import { CustomerSearchForm, ProgressStep } from 'controllers'
import { Alert, AppleLoader } from 'components'
import { useValidateAgent } from 'hooks/agency-banking'
import { onAxiosError } from 'utils'
import { StepOne, StepTwo, StepThree, StepFour } from 'containers/agency-banking'

const MasterAgentPage = () => {
  const intl = useIntl()
  const [customer, setCustomer] = useState<Customer>(null)
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>(null)
  const [error, setError] = useState(null)
  const [success /*, setSuccess*/] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [validateSuccess, setValidateSuccess] = useState(false)
  const [data, setData] = useState<MasterAgentFormValues>({
    usdCommissionAccount: null,
    cdfCommissionAccount: null,
    agentName: '',
    agentLogo: [],
    businessCertificate: [],
    otherDocuments: [],
    scannedDocuments: [],
    branch: null,
    phoneNumber: ''
  })

  const onSubmit = (formData: MasterAgentFormValues) => {
    console.log(formData)
  }

  const handleNextStep = (newData: MasterAgentFormValues, final = false) => {
    setData((prev) => ({ ...prev, ...newData }))
    if (final) {
      onSubmit(newData)
      return
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = (newData: MasterAgentFormValues) => {
    setData((prev) => ({ ...prev, ...newData }))
    setCurrentStep((prev) => prev - 1)
  }

  const onValidateAgentSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      setValidateSuccess(true)
    } else {
      const { request } = response
      const error = request as XMLHttpRequest
      setError(error.responseText)
      setValidateSuccess(false)
    }
  }

  const { mutate: validateAgent, isLoading: validatingAgent } = useValidateAgent(
    onValidateAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const steps = [
    <StepOne
      customer={customer}
      handleNextStep={handleNextStep}
      isAgentValidationSuccess={validateSuccess}
      data={data}
      key={1}
      isValidatingAgent={validatingAgent}
    />,
    <StepTwo
      customerAccounts={customerAccounts}
      data={data}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
      key={2}
      customer={customer}
    />,
    <StepThree
      key={3}
      data={data}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <StepFour
      key={4}
      data={data}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
      customer={customer}
    />
  ]

  useEffect(() => {
    if (customer) {
      const payload: AgentPayload = {
        externalId: customer.customerID,
        msisdn: customer.phoneNumber,
        agentTypeId: 1
      }
      validateAgent(payload)
    }
  }, [customer])

  return (
    <AdminLayout pageTitle="Create Master Agent" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="mt-6">
          <ProgressStep
            totalSteps={steps.length}
            active={currentStep}
            titles={[
              intl.formatMessage({ defaultMessage: 'Customer Search' }),
              intl.formatMessage({ defaultMessage: 'Personal Details' }),
              intl.formatMessage({ defaultMessage: 'Documents' }),
              intl.formatMessage({ defaultMessage: 'Preview' })
            ]}
            success={success}
          />
          <div className="mb-6 mt-4">
            {error && (
              <Alert color="error">
                <h6 className="font-lato text-pNormal font-medium ">
                  {intl.formatMessage({ defaultMessage: 'Finacle Error' })}
                </h6>
                <p className="font-montserrat text-pSmall">{error}</p>
              </Alert>
            )}
          </div>
          {validatingAgent && (
            <div className="flex items-center space-x-4 mb-2 font-montserrat text-pSmall text-light-text dark:text-dark-text">
              {intl.formatMessage({ defaultMessage: 'Validating agent . . .' })}
              <AppleLoader size="md" strokeColor="primary" />
            </div>
          )}
          {currentStep === 1 && (
            <CustomerSearchForm
              setCustomer={setCustomer}
              setCustomerAccounts={setCustomerAccounts}
              setError={setError}
            />
          )}
          {customer && steps[currentStep - 1]}
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export default authorizationHOC('AgencyBanking:Create', MasterAgentPage, true)
