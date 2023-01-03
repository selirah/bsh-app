import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes, EditAgentForm, EditOutletForm } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { useFetchAgentByCode, useOnboardAgent } from 'hooks/agency-banking'
import { useSearchCustomer } from 'hooks/customer'
import {
  AgentObject,
  ErrorResponse,
  SuccessResponse,
  AgentTypes,
  Customer,
  CustomerSearchPayload,
  CustomerAccount,
  AgentFormValues,
  Branch,
  AgentPayload
} from 'types'
import { Alert, BasicLoader, ToastBox } from 'components'
import { onAxiosError } from 'utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useToast } from 'hooks'
import { HiCheckBadge } from 'react-icons/hi2'

const EditAgentPage = ({ agentCode }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl()
  const [agent, setAgent] = useState<AgentObject>(null)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)
  const [customer, setCustomer] = useState<Customer>(null)
  const [customerAccounts, setCustomerAccounts] = useState<CustomerAccount[]>([])
  const { data: session } = useSession()
  const router = useRouter()
  const createToast = useToast()

  const onCustomerSearchSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as Customer
      setCustomer(obj)
      let accountArr: CustomerAccount[] = []
      obj.accountDetails.map((a) => {
        return accountArr.push({
          name: `${a.currency} - ${a.schemeType} - ${a.accountNumber}`,
          ...a
        })
      })
      setCustomerAccounts(accountArr)
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
    } else {
      setInfo(
        intl.formatMessage({ defaultMessage: 'No agent can be found with provided agent code' })
      )
    }
  }

  const { isLoading } = useFetchAgentByCode(
    agentCode,
    onFetchAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onEditAgentSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'Agent details has been updated successfully'
          })}
        />
      )
      router.push('/admin/agency-banking/agents-list')
    }
  }

  const { mutate: updateAgent, isLoading: isSubmitting } = useOnboardAgent(
    onEditAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onUpdateAgent = (formData: AgentFormValues) => {
    setError(null)
    const { usdCommissionAccount, cdfCommissionAccount, branch, agentName } = formData
    const usdCommissionAccountObj = JSON.parse(usdCommissionAccount.value) as CustomerAccount
    const cdfCommissionAccountObj = JSON.parse(cdfCommissionAccount.value) as CustomerAccount
    const branchObj = JSON.parse(branch.value) as Branch

    const payload: AgentPayload = {
      agentId: agent?.agentId,
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
      agentStatusId: 6,
      externalId: customer?.customerID,
      parentAgentId: agent?.parentAgentId,
      agentTypeId: agent?.agentTypeId,
      logo: agent?.logo,
      branchId: branchObj.branchId,
      agentDocuments: agent?.agentDocuments,
      agencyRegion: customer?.preferredAddress?.address1,
      agencyStreet: customer?.preferredAddress?.stateCode,
      agencyBranch: branchObj.name,
      createdBy: session?.user?.username
    }
    updateAgent(payload)
  }

  const onUpdateOutlet = (formData: AgentFormValues) => {
    setError(null)
    const {
      usdCommissionAccount,
      cdfCommissionAccount,
      branch,
      agentName,
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

    const payload: AgentPayload = {
      agentId: agent?.agentId,
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
      agentStatusId: 6,
      externalId: agent?.externalId,
      parentAgentId: agent?.agentId,
      agentTypeId: agent?.agentTypeId,
      logo: agent?.logo,
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
    updateAgent(payload)
  }

  return (
    <AdminLayout pageTitle="Edit Agent" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="py-[16px] border-b border-light-border dark:border-dark-border">
          <h4 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">
            {intl.formatMessage({ defaultMessage: 'Edit Agent Details' })}
          </h4>
        </div>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mb-2">{info && <Alert color="info">{info}</Alert>}</div>
        <div className="mt-8">
          {isLoading || searchingCustomer ? <BasicLoader spinColor="primary" size="md" /> : null}
          {agent && customer ? (
            agent.agentType === AgentTypes.OUTLET ? (
              <EditOutletForm
                agent={agent}
                customerAccounts={customerAccounts}
                isSubmitting={isSubmitting}
                onSubmit={onUpdateOutlet}
              />
            ) : (
              <EditAgentForm
                agent={agent}
                customerAccounts={customerAccounts}
                isSubmitting={isSubmitting}
                onSubmit={onUpdateAgent}
              />
            )
          ) : null}
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

export default authorizationHOC('AgencyBanking:EditOutlet', EditAgentPage, true)
