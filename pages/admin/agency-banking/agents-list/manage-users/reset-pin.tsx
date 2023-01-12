import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { useFetchAgentByCode, useResetOutletUserPin } from 'hooks/agency-banking'
import { AgentObject, ErrorResponse, SuccessResponse, OutletUser } from 'types'
import { Alert, BasicLoader, ToastBox, Button, AppleLoader } from 'components'
import { onAxiosError } from 'utils'
import { useRouter } from 'next/router'
import { useToast } from 'hooks'
import { MdUpdate } from 'react-icons/md'
import { HiCheckBadge } from 'react-icons/hi2'

const ResetPinPage = ({
  contractId,
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

  const onResetUserPinSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'User PIN has been reset successfully'
          })}
        />
      )
      router.push(
        `/admin/agency-banking/agents-list/manage-users?agentId=${agent.agentId}&agentCode=${agentCode}`
      )
    }
  }

  const { mutate: resetOutletUserPin, isLoading: isSubmitting } = useResetOutletUserPin(
    onResetUserPinSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = () => {
    setError(null)
    const payload: OutletUser = {
      contractId: contractId,
      outletCode: agentCode,
      createdWhen: '',
      idNumber: '',
      msisdn: '',
      name: '',
      outletStatusId: 0,
      reason: '',
      status: ''
    }
    resetOutletUserPin(payload)
  }

  return (
    <AdminLayout pageTitle="Reset User PIN" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="py-[16px] border-b border-light-border dark:border-dark-border">
          <h4 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">
            {intl.formatMessage({ defaultMessage: 'Reset User PIN' })}
          </h4>
        </div>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mt-8">
          {isLoading ? <BasicLoader spinColor="primary" size="md" /> : null}
          {agent && (
            <div className="mt-4">
              <Button size="md" disabled={isSubmitting} onClick={onSubmit}>
                <div className="flex items-center space-x-2">
                  {isSubmitting ? <AppleLoader size="md" /> : <MdUpdate />}
                  <span>
                    {isSubmitting
                      ? intl.formatMessage({ defaultMessage: 'Processing...' })
                      : intl.formatMessage({ defaultMessage: 'Reset PIN' })}
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
  const contractId = query.contractId as number
  const agentCode = query.agentCode as string
  return {
    props: {
      contractId,
      agentCode
    }
  }
}

export default authorizationHOC('AgencyBanking:ResetPIN', ResetPinPage, true)
