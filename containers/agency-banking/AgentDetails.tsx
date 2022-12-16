import { AgentObject } from 'types'
import { DescriptionHeader, DescriptionList } from 'components'
import { useIntl } from 'react-intl'
import { transformStatus } from 'utils/transform-status'

type Props = {
  agent: AgentObject
}

export const AgentDetails: React.FC<Props> = (props) => {
  const { agent } = props
  const intl = useIntl()
  const initials = agent.agentName.charAt(0).toUpperCase() + agent.agentName.charAt(1).toUpperCase()
  const accountUSD =
    agent.agentAccounts.length && agent.agentAccounts.find((acc) => acc.currency === 'USD')
  const accountCDF =
    agent.agentAccounts.length && agent.agentAccounts.find((acc) => acc.currency === 'CDF')

  return (
    <div className="mt-8 border border-light-border dark:border-dark-border rounded">
      <DescriptionHeader.HeaderInitials
        description={intl.formatMessage(
          { defaultMessage: 'Personal details of {agentName}' },
          { agentName: agent.agentName }
        )}
        initials={initials}
        title={agent.agentName}
        bgColor="primary"
      />
      <DescriptionList.TwoColumn
        title1={intl.formatMessage({ defaultMessage: 'Agent Name' })}
        value1={agent.agentName}
        title2={intl.formatMessage({ defaultMessage: 'Agent Type' })}
        value2={agent.agentType}
        bgGray
      />
      <DescriptionList.TwoColumn
        title1={intl.formatMessage({ defaultMessage: 'Agent Code' })}
        value1={agent.agentCode}
        title2={intl.formatMessage({ defaultMessage: 'Agent CIF' })}
        value2={agent.externalId}
      />
      <DescriptionList.TwoColumn
        title1={intl.formatMessage({ defaultMessage: 'Branch' })}
        value1={agent.agencyBranch}
        title2={intl.formatMessage({ defaultMessage: 'Mobile Number' })}
        value2={agent.msisdn}
        bgGray
      />
      <DescriptionList.TwoColumn
        title1={intl.formatMessage({ defaultMessage: 'Commission Account USD' })}
        value1={accountUSD ? `${accountUSD.currency} ${accountUSD.accountNumber}` : ''}
        title2={intl.formatMessage({ defaultMessage: 'Commission Account CDF' })}
        value2={accountCDF ? `${accountCDF.currency} ${accountCDF.accountNumber}` : ''}
      />
      <DescriptionList.OneColumn
        title={intl.formatMessage({ defaultMessage: 'Status' })}
        value={transformStatus(agent.agentStatus)}
        bgGray
      />
    </div>
  )
}
