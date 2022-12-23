import { useState, useEffect } from 'react'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import {
  Customer,
  CustomerAccount,
  AgentPayload,
  SuccessResponse,
  ErrorResponse,
  MasterAgentFormValues,
  Branch,
  Document
} from 'types'
import { CustomerSearchForm, ProgressStep } from 'controllers'
import { Alert, AppleLoader } from 'components'
import { useValidateAgent, useOnboardAgent } from 'hooks/agency-banking'
import { onAxiosError } from 'utils'
import { StepOne, StepTwo, StepThree, StepFour } from 'containers/agency-banking/ordinary-agent'
import { useSession } from 'next-auth/react'
import { getBase64 } from 'utils'

const OrdinaryAgentPage = () => {
  const intl = useIntl()
  const [customer, setCustomer] = useState<Customer>(null)
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
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
  const { data: session } = useSession()

  const onCreateAgentSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      setSuccess(true)
    }
  }

  const { mutate: onboardAgent, isLoading: isSubmitting } = useOnboardAgent(
    onCreateAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = async (formData: MasterAgentFormValues) => {
    setError(null)
    const {
      usdCommissionAccount,
      cdfCommissionAccount,
      branch,
      agentName,
      agentLogo,
      businessCertificate,
      scannedDocuments,
      otherDocuments
    } = formData
    const usdCommissionAccountObj = JSON.parse(usdCommissionAccount.value) as CustomerAccount
    const cdfCommissionAccountObj = JSON.parse(cdfCommissionAccount.value) as CustomerAccount
    const branchObj = JSON.parse(branch.value) as Branch
    const logo =
      agentLogo.length && !agentLogo[0]?.errors.length
        ? ((await getBase64(agentLogo[0]?.file)) as string)
        : ''
    const certificate =
      businessCertificate.length && !businessCertificate[0]?.errors.length
        ? ((await getBase64(businessCertificate[0]?.file)) as string)
        : ''

    let documents: Document[] = []
    documents.push({ agentDocumentTypeId: 8, documentContent: certificate })
    if (scannedDocuments.length) {
      scannedDocuments.map(async (doc) => {
        if (!doc.errors.length) {
          const base64 = await getBase64(doc.file)
          documents.push({ agentDocumentTypeId: 8, documentContent: base64 })
        }
      })
    }
    if (otherDocuments.length) {
      otherDocuments.map(async (doc) => {
        if (!doc.errors.length) {
          const base64 = await getBase64(doc.file)
          documents.push({ agentDocumentTypeId: 8, documentContent: base64 })
        }
      })
    }

    const payload: AgentPayload = {
      agentAccounts: [
        {
          accountNumber: usdCommissionAccountObj.accountNumber,
          agentAccountTypeId: 2,
          currency: usdCommissionAccountObj.currency
        },
        {
          accountNumber: cdfCommissionAccountObj.accountNumber,
          agentAccountTypeId: 2,
          currency: cdfCommissionAccountObj.currency
        }
      ],
      agentName: agentName,
      msisdn: customer?.phoneNumber,
      agentStatusId: 5,
      externalId: customer?.customerID,
      parentAgentId: null,
      agentTypeId: 4,
      logo: logo,
      branchId: branchObj.branchId,
      agentDocuments: documents,
      agencyRegion: customer?.preferredAddress?.address1,
      agencyStreet: customer?.preferredAddress?.stateCode,
      agencyBranch: branchObj.name,
      createdBy: session?.user?.username
    }
    onboardAgent(payload)
  }

  const handleNextStep = (newData: MasterAgentFormValues, final = false) => {
    setError(null)
    setData((prev) => ({ ...prev, ...newData }))
    if (final) {
      onSubmit(newData)
      return
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = (newData: MasterAgentFormValues) => {
    setError(null)
    setData((prev) => ({ ...prev, ...newData }))
    setCurrentStep((prev) => prev - 1)
  }

  const onValidateAgentSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      setValidateSuccess(true)
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
      success={success}
      error={error}
      isSubmitting={isSubmitting}
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

export default authorizationHOC('AgencyBanking:Create', OrdinaryAgentPage, true)
