import { useState } from 'react'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import {
  Customer,
  CustomerAccount,
  AgentPayload,
  SuccessResponse,
  ErrorResponse,
  AgentFormValues,
  Branch,
  AgentObject
} from 'types'
import { ProgressStep } from 'controllers'
import { Alert } from 'components'
import { useOnboardAgent } from 'hooks/agency-banking'
import { onAxiosError } from 'utils'
import { StepOne, StepTwo, StepThree, StepFour, StepFive } from 'containers/agency-banking//outlet'
import { useSession } from 'next-auth/react'
import { getBase64 } from 'utils'

const OutletPage = () => {
  const intl = useIntl()
  const [customer, setCustomer] = useState<Customer>(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [agent, setAgent] = useState<AgentObject>(null)
  const [data, setData] = useState<AgentFormValues>({
    usdCommissionAccount: null,
    cdfCommissionAccount: null,
    agentName: '',
    agentLogo: [],
    businessCertificate: [],
    otherDocuments: [],
    scannedDocuments: [],
    branch: null,
    phoneNumber: '',
    agentCode: '',
    usdTradingAccount: null,
    cdfTradingAccount: null,
    agencyManagerName: '',
    agencyManagerPhone: '',
    agencyRegion: '',
    agencyPOSMachine: false,
    agencyBuilding: '',
    agencyCommune: '',
    agencyProvince: '',
    agencySector: '',
    agencyStreet: '',
    agencyTerritory: '',
    latitude: ''
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

  const onSubmit = async (formData: AgentFormValues) => {
    setError(null)
    const {
      usdCommissionAccount,
      cdfCommissionAccount,
      branch,
      agentName,
      agentLogo,
      agentCode,
      usdTradingAccount,
      cdfTradingAccount,
      agencyBuilding,
      agencyManagerName,
      agencyManagerPhone,
      agencyPOSMachine,
      agencyProvince,
      agencyCommune,
      agencyRegion,
      agencySector,
      agencyStreet,
      agencyTerritory,
      latitude,
      phoneNumber
    } = formData

    const usdCommissionAccountObj = JSON.parse(usdCommissionAccount.value) as CustomerAccount
    const cdfCommissionAccountObj = JSON.parse(cdfCommissionAccount.value) as CustomerAccount
    const usdTradingAccountObj = JSON.parse(usdTradingAccount.value) as CustomerAccount
    const cdfTradingAccountObj = JSON.parse(cdfTradingAccount.value) as CustomerAccount
    const branchObj = JSON.parse(branch.value) as Branch
    const logo =
      agentLogo.length && !agentLogo[0]?.errors.length
        ? ((await getBase64(agentLogo[0]?.file)) as string)
        : ''

    const payload: AgentPayload = {
      agentAccounts: [
        {
          accountNumber: usdTradingAccountObj.accountNumber,
          agentAccountTypeId: 1,
          currency: usdTradingAccountObj.currency
        },
        {
          accountNumber: cdfTradingAccountObj.accountNumber,
          agentAccountTypeId: 1,
          currency: cdfTradingAccountObj.currency
        },
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
      agentCode: agentCode,
      msisdn: phoneNumber,
      agentStatusId: 5,
      externalId: agent?.externalId,
      parentAgentId: agent?.agentId,
      agentTypeId: 3,
      logo: logo,
      branchId: branchObj.branchId,
      agentDocuments: [],
      agencyRegion: agencyRegion,
      agencyStreet: agencyStreet,
      agencyBranch: branchObj.name,
      createdBy: session?.user?.username,
      agencyPOSMachine: agencyPOSMachine ? 'true' : 'false',
      agencyBuilding: agencyBuilding,
      agencyCommune: agencyCommune,
      agencyManagerName: agencyManagerName,
      agencyManagerPhone: agencyManagerPhone,
      agencyProvince: agencyProvince,
      agencySector: agencySector,
      agencyTerritory: agencyTerritory,
      latitude: latitude,
      longitude: ''
    }
    onboardAgent(payload)
  }

  const handleNextStep = (newData: AgentFormValues, final = false) => {
    setError(null)
    setData((prev) => ({ ...prev, ...newData }))
    if (final) {
      onSubmit(newData)
      return
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = (newData: AgentFormValues) => {
    setError(null)
    setData((prev) => ({ ...prev, ...newData }))
    setCurrentStep((prev) => prev - 1)
  }

  const steps = [
    <StepOne
      handleNextStep={handleNextStep}
      data={data}
      key={1}
      setError={setError}
      setCustomer={setCustomer}
      agent={agent}
      setAgent={setAgent}
    />,
    <StepTwo handleNextStep={handleNextStep} data={data} key={2} handlePrevStep={handlePrevStep} />,
    <StepThree
      handleNextStep={handleNextStep}
      data={data}
      key={3}
      handlePrevStep={handlePrevStep}
    />,
    <StepFour
      key={4}
      data={data}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <StepFive
      key={5}
      data={data}
      error={error}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
      isSubmitting={isSubmitting}
      success={success}
      customer={customer}
      agent={agent}
    />
  ]

  return (
    <AdminLayout pageTitle="Create Outlet" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="mt-6">
          <ProgressStep
            totalSteps={steps.length}
            active={currentStep}
            titles={[
              intl.formatMessage({ defaultMessage: 'Master Agent Details' }),
              intl.formatMessage({ defaultMessage: 'Outlet Details' }),
              intl.formatMessage({ defaultMessage: 'Outlet Address' }),
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
            {steps[currentStep - 1]}
          </div>
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export default authorizationHOC('AgencyBanking:Create', OutletPage, true)
