import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { useFetchAgentByCode, useSelfServiceOnboarding } from 'hooks/agency-banking'
import { useSearchCustomer } from 'hooks/customer'
import {
  AgentPayload,
  ErrorResponse,
  SuccessResponse,
  Customer,
  CustomerSearchPayload,
  AgentObject
} from 'types'
import { Alert, BasicLoader, ToastBox, Button, AppleLoader } from 'components'
import { onAxiosError } from 'utils'
import { useRouter } from 'next/router'
import { useToast } from 'hooks'
import { HiCheckBadge, HiCheck } from 'react-icons/hi2'

const SelfServicePage = ({ agentCode }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl()
  const [agent, setAgent] = useState<AgentObject>(null)
  const [error, setError] = useState(null)
  const [customer, setCustomer] = useState<Customer>(null)
  const router = useRouter()
  const createToast = useToast()

  const onCustomerSearchSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as Customer
      setCustomer(obj)
    }
  }

  const { mutate: searchCustomer, isLoading: searchingCustomer } = useSearchCustomer(
    onCustomerSearchSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onFetchAgentSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as AgentObject
      setAgent(obj)
      const payload: CustomerSearchPayload = {
        searchProperty: { label: 'CIF', value: 'CIF' },
        propertyData: obj.externalId
      }
      searchCustomer(payload)
    }
  }

  const { isLoading } = useFetchAgentByCode(
    agentCode,
    onFetchAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSelfServiceOnboardingSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'Agent has been blocked successfully'
          })}
        />
      )
      router.push('/admin/agency-banking/agents-list')
    }
  }

  const { mutate: selfServiceOnboarding, isLoading: isSubmitting } = useSelfServiceOnboarding(
    onSelfServiceOnboardingSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = () => {
    setError(null)
    const payload: AgentPayload = {
      agentStatusId: agent?.agentStatusId,
      agentId: agent?.agentId,
      agentAccounts: agent?.agentAccounts,
      agentName: agent?.agentName,
      msisdn: agent?.msisdn,
      externalId: agent?.externalId,
      parentAgentId: agent?.parentAgentId,
      agentTypeId: agent?.agentTypeId,
      logo: agent?.logo,
      branchId: agent?.branchId,
      agentDocuments: agent?.agentDocuments,
      agentCode: agent?.agentCode,
      idNumber: agent?.idNumber,
      agencyPOSMachine: agent?.agencyPOSMachine,
      agencyRegion: agent?.agencyRegion,
      agencyManagerPhone: agent?.agencyManagerPhone,
      agencyBranch: agent?.agencyBranch,
      agencyTerritory: agent?.agencyTerritory,
      agencySector: agent?.agencySector,
      agencyManagerName: agent?.agencyManagerName,
      agencyProvince: agent?.agencyProvince,
      agencyCommune: agent?.agencyCommune,
      agencyStreet: agent?.agencyStreet,
      agencyBuilding: agent?.agencyBuilding,
      latitude: agent?.latitude,
      longitude: ''
    }
    selfServiceOnboarding(payload)
  }

  return (
    <AdminLayout pageTitle="Block Agent" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="py-[16px] border-b border-light-border dark:border-dark-border">
          <h4 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">
            {intl.formatMessage({ defaultMessage: 'Confirm on Sending Agent Details' })}
          </h4>
        </div>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mt-8">
          {isLoading || searchingCustomer ? <BasicLoader spinColor="primary" size="md" /> : null}
          {agent && customer && (
            <div className="mt-10">
              <h4 className="font-lato text-pLarge text-dark-btnText dark:text-light-btnText mb-6">
                {intl.formatMessage(
                  { defaultMessage: 'Confirm self service for {agentName}' },
                  { agentName: agent?.agentName }
                )}
              </h4>
              <Button size="md" disabled={isSubmitting} onClick={onSubmit}>
                <div className="flex items-center space-x-2">
                  {isSubmitting ? <AppleLoader size="md" /> : <HiCheck />}
                  <span>
                    {isSubmitting
                      ? intl.formatMessage({ defaultMessage: 'Processing...' })
                      : intl.formatMessage({ defaultMessage: 'Confirm' })}
                  </span>
                </div>
              </Button>
            </div>
          )}
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export async function getServerSideProps({ query }) {
  const agentCode = query.agentCode as string
  return {
    props: {
      agentCode
    }
  }
}

// export default authorizationHOC('AgencyBanking:SendAuthDetails', SelfServicePage, true)
export default authorizationHOC('AgencyBanking:Manage', SelfServicePage, true)
