import { useState, useContext } from 'react'
import { Formik, Form } from 'formik'
import { LayoutContext } from 'contexts'
import { Textarea } from 'examples/formik-controls'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { useFetchAgentByCode, useUnblockOutletUser } from 'hooks/agency-banking'
import { AgentObject, ErrorResponse, SuccessResponse, OutletUser } from 'types'
import { Alert, BasicLoader, ToastBox, Button, AppleLoader } from 'components'
import { onAxiosError } from 'utils'
import { useRouter } from 'next/router'
import { useToast } from 'hooks'
import { reasonValidation } from 'validation-schema/agency-banking'
import { HiCheckBadge, HiLockOpen } from 'react-icons/hi2'

const UnblockUserPage = ({
  contractId,
  agentCode
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl()
  const { layout } = useContext(LayoutContext)
  const [agent, setAgent] = useState<AgentObject>(null)
  const [error, setError] = useState(null)
  const router = useRouter()
  const createToast = useToast()
  const initialValues: OutletUser = {
    reason: ''
  }

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

  const onUnblockUserSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      createToast(
        <ToastBox.Basic
          IconSVG={HiCheckBadge}
          color="success"
          title={intl.formatMessage({ defaultMessage: 'Nice!!' })}
          description={intl.formatMessage({
            defaultMessage: 'User has been unblocked successfully'
          })}
        />
      )
      router.push(
        `/admin/agency-banking/agents-list/manage-users?agentId=${agent.agentId}&agentCode=${agentCode}`
      )
    }
  }

  const { mutate: unblockOutletUser, isLoading: isSubmitting } = useUnblockOutletUser(
    onUnblockUserSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onSubmit = (values: OutletUser) => {
    const { reason } = values
    const payload: OutletUser = {
      contractId: parseInt(contractId),
      outletCode: agentCode,
      reason: reason
    }
    unblockOutletUser(payload)
  }

  return (
    <AdminLayout pageTitle="Unblock User" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="py-[16px] border-b border-light-border dark:border-dark-border">
          <h4 className="text-h6 font-lato text-dark-btnText dark:text-light-btnText">
            {intl.formatMessage({ defaultMessage: 'Unblock User' })}
          </h4>
        </div>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mt-8">
          {isLoading ? <BasicLoader spinColor="primary" size="md" /> : null}
          {agent && (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={reasonValidation(intl)}
            >
              {({ isValid }) => {
                return (
                  <Form>
                    <div className="w-1/2">
                      <div className="mb-4">
                        <Textarea
                          name="reason"
                          label={intl.formatMessage({ defaultMessage: 'Enter reason' })}
                          size={layout === 'mobile' ? 'sm' : 'md'}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'type reason . . .'
                          })}
                          rows={4}
                        />
                      </div>
                      <div className="mt-4">
                        <Button size="sm" disabled={!isValid || isSubmitting} type="submit">
                          <div className="flex items-center space-x-2">
                            {isSubmitting ? <AppleLoader size="md" /> : <HiLockOpen />}
                            <span>
                              {isSubmitting
                                ? intl.formatMessage({ defaultMessage: 'Processing...' })
                                : intl.formatMessage({ defaultMessage: 'Unblock' })}
                            </span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          )}
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export async function getServerSideProps({ query }) {
  const contractId = query.contractId as string
  const agentCode = query.agentCode as string
  return {
    props: {
      contractId,
      agentCode
    }
  }
}

export default authorizationHOC('AgencyBanking:UnblockUser', UnblockUserPage, true)
