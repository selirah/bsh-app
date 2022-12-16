import { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes, AgentDetails } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { useFetchAgentByCode } from 'hooks/agency-banking'
import { AgentObject, ErrorResponse, SuccessResponse } from 'types'
import { Alert, BasicLoader } from 'components'
import { onAxiosError } from 'utils'

const ViewDetailsPage = ({ agentCode }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl()
  const [agent, setAgent] = useState<AgentObject>(null)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)

  const onFetchAgentSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as AgentObject
      setAgent(obj)
    } else {
      setInfo(
        intl.formatMessage({ defaultMessage: 'No agent can be found with provided agent code' })
      )
    }
  }

  const { isLoading, isFetching } = useFetchAgentByCode(
    agentCode,
    onFetchAgentSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  return (
    <AdminLayout pageTitle="Agent Details" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <div className="mb-2">{info && <Alert color="info">{info}</Alert>}</div>
        <div className="mt-8">
          {isLoading || (isFetching && <BasicLoader spinColor="primary" size="md" />)}
          {agent && <AgentDetails agent={agent} />}
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

export default authorizationHOC('AgencyBanking:ViewDetails', ViewDetailsPage, true)
