import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import {
  useFetchAgentByCode,
  useVerifyOutletUserStatus,
  useRejectOutletUserStatus
} from 'hooks/agency-banking'
import {
  AgentObject,
  ErrorResponse,
  SuccessResponse,
  OutletUser,
  VerifyOutletUserPayload
} from 'types'
import { Alert, BasicLoader, ToastBox, Button, AppleLoader } from 'components'
import { onAxiosError } from 'utils'
import { useRouter } from 'next/router'
import { useToast } from 'hooks'
import { HiCheckBadge } from 'react-icons/hi2'
import { MdWarning } from 'react-icons/md'

const VerifyUserPage = ({
  contractId,
  agentCode,
  name
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

  const onVerifySuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'User has been verified successfully'
          })}
        />
      )
      router.push(
        `/admin/agency-banking/agents-list/manage-users?agentId=${agent.agentId}&agentCode=${agentCode}`
      )
    }
  }

  const { mutate: verifyOutletUserStatus, isLoading: isVerifying } = useVerifyOutletUserStatus(
    onVerifySuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onVerify = () => {
    const outlet: OutletUser = {
      contractId: contractId,
      outletCode: agentCode
    }
    const payload: VerifyOutletUserPayload = {
      approvalStatus: 1,
      outletUser: outlet,
      agentId: agent.agentId
    }
    verifyOutletUserStatus(payload)
  }

  const onRejectSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'User has been rejected successfully'
          })}
        />
      )
      router.push(
        `/admin/agency-banking/agents-list/manage-users?agentId=${agent.agentId}&agentCode=${agent.agentCode}`
      )
    }
  }

  const { mutate: rejectOutletUserStatus, isLoading: isRejecting } = useRejectOutletUserStatus(
    onRejectSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onReject = () => {
    const outlet: OutletUser = {
      contractId: contractId,
      outletCode: agentCode
    }
    const payload: VerifyOutletUserPayload = {
      approvalStatus: 2,
      outletUser: outlet,
      agentId: agent.agentId
    }
    rejectOutletUserStatus(payload)
  }

  return (
    <AdminLayout pageTitle="Verify User" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="py-[16px] border-b border-light-border dark:border-dark-border">
          <h4 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">
            {intl.formatMessage({ defaultMessage: 'Verify User' })}
          </h4>
        </div>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mt-8">
          {isLoading ? <BasicLoader spinColor="primary" size="md" /> : null}
          {agent && (
            <div className="block">
              <p className="font-montserrat text-pNormal text-light-text dark:text-dark-text">
                {intl.formatMessage(
                  { defaultMessage: 'Verify or reject outlet user {username}' },
                  { username: name }
                )}
              </p>
              <div className="flex space-x-4 animate__animated animate__fadeIn mt-8">
                <Button size="sm" onClick={onVerify} disabled={isVerifying}>
                  <div className="flex items-center space-x-2">
                    {isVerifying ? <AppleLoader size="md" /> : <HiCheckBadge />}
                    <span>
                      {isVerifying
                        ? intl.formatMessage({ defaultMessage: 'Approving...' })
                        : intl.formatMessage({ defaultMessage: 'Approve Changes' })}
                    </span>
                  </div>
                </Button>
                <Button size="sm" onClick={onReject} disabled={isRejecting} color="error">
                  <div className="flex items-center space-x-2">
                    {isRejecting ? <AppleLoader size="md" /> : <MdWarning />}
                    <span>
                      {isRejecting
                        ? intl.formatMessage({ defaultMessage: 'Rejecting...' })
                        : intl.formatMessage({ defaultMessage: 'Reject Changes' })}
                    </span>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export async function getServerSideProps({ query }) {
  const contractId = query.contractId as number
  const agentCode = query.agentCode as string
  const name = query.name as string

  return {
    props: {
      contractId,
      agentCode,
      name
    }
  }
}

export default authorizationHOC('AgencyBanking:OutletUserStatusUpdate', VerifyUserPage, true)
