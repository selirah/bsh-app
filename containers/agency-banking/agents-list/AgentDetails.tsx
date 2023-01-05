import { AgentObject, AgentTypes, StatusTypes } from 'types'
import { DescriptionHeader, DescriptionList, Button } from 'components'
import { useIntl } from 'react-intl'
import { transformStatus } from 'utils/transform-status'
import Link from 'next/link'
import {
  MdUpdate,
  MdCreate,
  MdOutlineShoppingBag,
  MdClose,
  MdOutlineNotificationsActive
} from 'react-icons/md'
import { HiOutlineCheckBadge } from 'react-icons/hi2'
import { FaUsers } from 'react-icons/fa'

type Props = {
  agent: AgentObject
}

export const AgentDetails: React.FC<Props> = (props) => {
  const { agent } = props
  const intl = useIntl()
  const initials = agent.agentName.charAt(0).toUpperCase() + agent.agentName.charAt(1).toUpperCase()
  const commAccountUSD =
    agent.agentAccounts.length &&
    agent.agentAccounts.find((acc) => acc.currency === 'USD' && acc.agentAccountTypeId === 2)
  const commAccountCDF =
    agent.agentAccounts.length &&
    agent.agentAccounts.find((acc) => acc.currency === 'CDF' && acc.agentAccountTypeId === 2)
  const trAccountUSD =
    agent.agentAccounts.length &&
    agent.agentAccounts.find((acc) => acc.currency === 'USD' && acc.agentAccountTypeId === 1)
  const trAccountCDF =
    agent.agentAccounts.length &&
    agent.agentAccounts.find((acc) => acc.currency === 'CDF' && acc.agentAccountTypeId === 1)

  return (
    <>
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
          value1={
            commAccountUSD ? `${commAccountUSD.currency} ${commAccountUSD.accountNumber}` : ''
          }
          title2={intl.formatMessage({ defaultMessage: 'Commission Account CDF' })}
          value2={
            commAccountCDF ? `${commAccountCDF.currency} ${commAccountCDF.accountNumber}` : ''
          }
        />
        <DescriptionList.OneColumn
          title={intl.formatMessage({ defaultMessage: 'Status' })}
          value={transformStatus(agent.agentStatus)}
          bgGray
        />
        {agent.agentStatus === StatusTypes.PENDINGBLOCK ||
        agent.agentStatus === StatusTypes.PENDINGEDIT ? (
          <DescriptionList.OneColumn
            title={intl.formatMessage({ defaultMessage: 'Reason' })}
            value={agent?.reason}
          />
        ) : null}
        {agent.agentType === AgentTypes.OUTLET && (
          <>
            <DescriptionList.TwoColumn
              title1={intl.formatMessage({ defaultMessage: 'Outlet Manager Name' })}
              value1={agent.agencyManagerName}
              title2={intl.formatMessage({ defaultMessage: 'Outlet Manager Phone' })}
              value2={agent.agencyManagerPhone}
            />
            <DescriptionList.TwoColumn
              title1={intl.formatMessage({ defaultMessage: 'Region' })}
              value1={agent.agencyRegion}
              title2={intl.formatMessage({ defaultMessage: 'Province' })}
              value2={agent.agencyProvince}
              bgGray
            />
            <DescriptionList.TwoColumn
              title1={intl.formatMessage({ defaultMessage: 'Territory' })}
              value1={agent.agencyTerritory}
              title2={intl.formatMessage({ defaultMessage: 'Sector' })}
              value2={agent.agencySector}
            />
            <DescriptionList.TwoColumn
              title1={intl.formatMessage({ defaultMessage: 'Commune' })}
              value1={agent.agencyCommune}
              title2={intl.formatMessage({ defaultMessage: 'Street' })}
              value2={agent.agencyStreet}
              bgGray
            />
            <DescriptionList.TwoColumn
              title1={intl.formatMessage({ defaultMessage: 'Building' })}
              value1={agent.agencyBuilding}
              title2={intl.formatMessage({ defaultMessage: 'GPRS Coordinates' })}
              value2={agent.latitude}
            />
            <DescriptionList.TwoColumn
              title1={intl.formatMessage({ defaultMessage: 'Trading Account USD' })}
              value1={trAccountUSD ? `${trAccountUSD.currency} ${trAccountUSD.accountNumber}` : ''}
              title2={intl.formatMessage({ defaultMessage: 'Trading Account CDF' })}
              value2={trAccountCDF ? `${trAccountCDF.currency} ${trAccountCDF.accountNumber}` : ''}
              bgGray
            />
          </>
        )}
      </div>
      <div className="mt-6 border-b py-[8px] border-light-border dark:border-dark-border font-lato">
        <h6 className="text-h6 text-light-text dark:text-dark-text font-light">
          {intl.formatMessage({ defaultMessage: 'Actions' })}
        </h6>
      </div>
      <div className="block w-full md:flex md:space-x-2 mt-4">
        {agent.agentType !== AgentTypes.OUTLET && agent.agentStatus === StatusTypes.ACTIVE && (
          <Link href={`/admin/agency-banking/agents-list/reset-pin?agentCode=${agent.agentCode}`}>
            <Button size="sm" outline>
              <MdUpdate className="text-pNormal" />
              <span className="ml-1">{intl.formatMessage({ defaultMessage: 'Reset PIN' })}</span>
            </Button>
          </Link>
        )}
        {agent.agentType === AgentTypes.OUTLET && agent.agentStatus === StatusTypes.ACTIVE && (
          <Link
            href={`/admin/agency-banking/agents-list/manage-users?agentId=${agent.agentId}&agentCode=${agent.agentCode}`}
          >
            <Button size="sm" outline>
              <FaUsers className="text-pNormal" />
              <span className="ml-1">{intl.formatMessage({ defaultMessage: 'Manage Users' })}</span>
            </Button>
          </Link>
        )}
        <Link href={`/admin/agency-banking/agents-list/edit?agentCode=${agent.agentCode}`}>
          <Button size="sm" outline color="secondary">
            <MdCreate className="text-pNormal" />
            <span className="ml-1">{intl.formatMessage({ defaultMessage: 'Edit' })}</span>
          </Button>
        </Link>
        {agent.agentStatus === StatusTypes.ACTIVE && (
          <Link
            href={`/admin/agency-banking/agents-list/view-transactions?agentCode=${agent.agentCode}`}
          >
            <Button size="sm" outline color="accent">
              <MdOutlineShoppingBag className="text-pNormal" />
              <span className="ml-1">{intl.formatMessage({ defaultMessage: 'Transactions' })}</span>
            </Button>
          </Link>
        )}
        {agent.agentStatus === StatusTypes.ACTIVE && (
          <Link href={`/admin/agency-banking/agents-list/block?agentCode=${agent.agentCode}`}>
            <Button size="sm" outline color="error">
              <MdClose className="text-pNormal" />
              <span className="ml-1">{intl.formatMessage({ defaultMessage: 'Block' })}</span>
            </Button>
          </Link>
        )}
        {agent.agentStatus === StatusTypes.BLOCKED && (
          <Link href={`/admin/agency-banking/agents-list/unblock?agentCode=${agent.agentCode}`}>
            <Button size="sm" outline color="success">
              <MdOutlineNotificationsActive className="text-pNormal" />
              <span className="ml-1">
                {intl.formatMessage({ defaultMessage: 'Unblock Account' })}
              </span>
            </Button>
          </Link>
        )}
        {agent.agentStatus === StatusTypes.PENDINGVERIFICATION && (
          <Link
            href={`/admin/agency-banking/agents-list/verify-agent?agentCode=${agent.agentCode}`}
          >
            <Button size="sm" outline color="success">
              <HiOutlineCheckBadge className="text-pNormal" />
              <span className="ml-1">
                {intl.formatMessage({ defaultMessage: 'Verify Account' })}
              </span>
            </Button>
          </Link>
        )}
        {agent.agentStatus === StatusTypes.PENDINGEDIT && (
          <Link href={`/admin/agency-banking/agents-list/verify-edit?agentCode=${agent.agentCode}`}>
            <Button size="sm" outline color="success">
              <HiOutlineCheckBadge className="text-pNormal" />
              <span className="ml-1">{intl.formatMessage({ defaultMessage: 'Verify Edit' })}</span>
            </Button>
          </Link>
        )}
      </div>
    </>
  )
}
