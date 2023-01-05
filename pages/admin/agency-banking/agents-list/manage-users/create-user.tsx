import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { useFetchAgentByCode, useCreateOutletUser } from 'hooks/agency-banking'
import { AgentObject, ErrorResponse, SuccessResponse, OutletUser, AgentPayload } from 'types'
import { Alert, BasicLoader, ToastBox } from 'components'
import { onAxiosError } from 'utils'
import { useRouter } from 'next/router'
import { useToast } from 'hooks'
import { HiCheckBadge } from 'react-icons/hi2'
import { CreateUserForm } from 'containers/agency-banking'

const CreateOutletUserPage = ({
  agentId,
  agentCode
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl()
  const [agent, setAgent] = useState<AgentObject>(null)
  const [error, setError] = useState(null)
  const router = useRouter()
  const createToast = useToast()

  const onFetchAgentSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as AgentObject
      setAgent(obj)
    }
  }

  const { isLoading } = useFetchAgentByCode(
    agentCode,
    onFetchAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onCreateUserSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'Outlet user has been created successfully'
          })}
        />
      )
      router.push(
        `/admin/agency-banking/agents-list/manage-users?agentId=${agentId}&agentCode=${agentCode}`
      )
    }
  }

  const { mutate: createOutletUser, isLoading: isSubmitting } = useCreateOutletUser(
    onCreateUserSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = (values: OutletUser) => {
    const { idNumber, msisdn, outletCode, name } = values
    let outletUsers: OutletUser[] = []
    outletUsers.push({
      contractId: 0,
      outletCode: outletCode,
      idNumber: idNumber,
      msisdn: msisdn,
      name: name,
      status: '',
      outletStatusId: 0
    })

    const payload: AgentPayload = {
      agentStatusId: 1,
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
      longitude: '',
      outletUsers: outletUsers
    }

    createOutletUser(payload)
  }

  return (
    <AdminLayout pageTitle="Create Outlet User" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="py-[16px] border-b border-light-border dark:border-dark-border">
          <h4 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">
            {intl.formatMessage({ defaultMessage: 'Create Outlet User' })}
          </h4>
        </div>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mt-8">
          {isLoading ? <BasicLoader spinColor="primary" size="md" /> : null}
          {agent && (
            <CreateUserForm agentCode={agentCode} isSubmitting={isSubmitting} onSubmit={onSubmit} />
          )}
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export async function getServerSideProps({ query }) {
  const agentCode = query.agentCode as string
  const agentId = query.agentId as number
  return {
    props: {
      agentId,
      agentCode
    }
  }
}

export default authorizationHOC('AgencyBanking:Create', CreateOutletUserPage, true)
