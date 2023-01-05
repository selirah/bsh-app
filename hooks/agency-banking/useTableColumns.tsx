import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useIntl } from 'react-intl'
import { AgentObject, StatusTypes, AgentTypes, OutletUser, UserStatusTypes } from 'types'
import moment from 'moment'
import { Dropdown } from 'components'
import { transformStatus } from 'utils/transform-status'

export const useAgentListTableColumns = () => {
  const intl = useIntl()

  const callDropdownActions = (row: AgentObject) => {
    const links = [
      {
        title: intl.formatMessage({ defaultMessage: 'View details' }),
        inaccessible: false,
        link: `/admin/agency-banking/agents-list/view-details?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Edit' }),
        inaccessible: false,
        link: `/admin/agency-banking/agents-list/edit?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'View transactions' }),
        inaccessible: row.agentStatus !== StatusTypes.ACTIVE,
        link: `/admin/agency-banking/agents-list/view-transactions?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Block/Deactivate' }),
        inaccessible: row.agentStatus !== StatusTypes.ACTIVE,
        link: `/admin/agency-banking/agents-list/block?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Unblock/Activate' }),
        inaccessible: row.agentStatus !== StatusTypes.BLOCKED,
        link: `/admin/agency-banking/agents-list/unblock?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Manage users' }),
        inaccessible: row.agentType !== AgentTypes.OUTLET || row.agentStatus !== StatusTypes.ACTIVE,
        link: `/admin/agency-banking/agents-list/manage-users?agentId=${row.agentId}&agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Create additional outlet' }),
        inaccessible: row.agentType === AgentTypes.OUTLET || row.agentStatus !== StatusTypes.ACTIVE,
        link: `/admin/agency-banking/agents-list/create-outlet?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Verify account' }),
        inaccessible: row.agentStatus !== StatusTypes.PENDINGVERIFICATION,
        link: `/admin/agency-banking/agents-list/verify-agent?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Verify edit' }),
        inaccessible: row.agentStatus !== StatusTypes.PENDINGEDIT,
        link: `agents-list/verify-edit?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Reset PIN' }),
        inaccessible: row.agentType === AgentTypes.OUTLET || row.agentStatus !== StatusTypes.ACTIVE,
        link: `/admin/agency-banking/agents-list/reset-pin?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Self service onboarding' }),
        inaccessible: row.agentType === AgentTypes.OUTLET || row.agentStatus !== StatusTypes.ACTIVE,
        link: `/admin/agency-banking/agents-list/self-service?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Verify block' }),
        inaccessible: row.agentStatus !== StatusTypes.PENDINGBLOCK,
        link: `/admin/agency-banking/agents-list/verify-block?agentCode=${row.agentCode}`
      }
    ] as Dropdown.DropdownList[]

    return <Dropdown.Khebab actions={links} />
  }

  const transformAgentType = (type: string) => {
    switch (type) {
      case AgentTypes.MASTERAGENT:
        return <span className="text-primary font-medium">{type}</span>
      case AgentTypes.ORDINARYAGENT:
        return <span className="text-secondary font-medium">{type}</span>
      case AgentTypes.SUBAGENT:
        return <span className="text-accent font-medium">{type}</span>
      case AgentTypes.OUTLET:
        return <span className="text-info font-medium">{type}</span>
    }
  }

  const columns = useMemo<ColumnDef<AgentObject>[]>(
    () => [
      {
        accessorFn: (row) => row.agentType,
        accessorKey: 'agentType',
        cell: (info) => transformAgentType(info.row.original.agentType),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'Type' })}</span>,
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.parentAgentType,
        accessorKey: 'parentAgentType',
        cell: (info) => info.getValue(),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'Parent Type' })}</span>,
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.agentName,
        accessorKey: 'agentName',
        cell: (info) => info.getValue(),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'Name' })}</span>,
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.agentCode,
        accessorKey: 'agentCode',
        cell: (info) => info.getValue(),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'ID' })}</span>,
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.agentStatus,
        accessorKey: 'agentStatus',
        cell: (info) => transformStatus(info.row.original.agentStatus),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'Status' })}</span>,
        footer: (props) => props.column.id,
        meta: {
          textAlign: 'center'
        }
      },
      {
        accessorFn: (row) => row.createdWhen,
        accessorKey: 'createdWhen',
        cell: (info) =>
          moment(new Date(info.row.original.createdWhen)).format('MMM Do, YYYY, h:mm a'),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'Date Created' })}</span>,
        footer: (props) => props.column.id
      },
      {
        accessorKey: ' ',
        cell: (info) => callDropdownActions(info.row.original)
      }
    ],
    [transformStatus, callDropdownActions, transformAgentType]
  )

  return [columns]
}

export const useOutletUsersTableColumns = () => {
  const intl = useIntl()

  const callDropdownActions = (row: OutletUser) => {
    const links = [
      {
        title: intl.formatMessage({ defaultMessage: 'Block/Deactivate' }),
        inaccessible:
          row.status !== UserStatusTypes.ACTIVE &&
          row.status !== UserStatusTypes.RESET &&
          row.status !== UserStatusTypes.PENDINGRESET &&
          row.status !== UserStatusTypes.NEW,
        link: `/admin/agency-banking/agents-list/manage-users/block-user?contractId=${row?.contractId}&agentCode=${row.outletCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Reset PIN' }),
        inaccessible:
          row.status !== UserStatusTypes.ACTIVE &&
          row.status !== UserStatusTypes.RESET &&
          row.status !== UserStatusTypes.PENDINGRESET &&
          row.status !== UserStatusTypes.NEW,
        link: `/admin/agency-banking/agents-list/manage-users/reset-pin?contractId=${row?.contractId}&agentCode=${row.outletCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Unblock/Activate' }),
        inaccessible: row.status !== UserStatusTypes.BLOCKED,
        link: `/admin/agency-banking/agents-list/manage-users/unblock-user?contractId=${row?.contractId}&agentCode=${row.outletCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Verify User' }),
        inaccessible:
          row.status !== UserStatusTypes.PENDINGACTIVATION &&
          row.status !== UserStatusTypes.PENDINGUNBLOCK,
        link: `/admin/agency-banking/agents-list/manage-users/verify-user?contractId=${row?.contractId}&agentCode=${row?.outletCode}&name=${row?.name}`
      }
    ] as Dropdown.DropdownList[]

    return <Dropdown.Khebab actions={links} />
  }

  const columns = useMemo<ColumnDef<OutletUser>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        accessorKey: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'Name' })}</span>,
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.idNumber,
        accessorKey: 'idNumber',
        cell: (info) => info.getValue(),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'ID' })}</span>,
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.msisdn,
        accessorKey: 'msisdn',
        cell: (info) => info.getValue(),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'Mobile Number' })}</span>,
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.status,
        accessorKey: 'status',
        cell: (info) => transformStatus(info.row.original.status),
        header: () => <span>{intl.formatMessage({ defaultMessage: 'Status' })}</span>,
        footer: (props) => props.column.id,
        meta: {
          textAlign: 'center'
        }
      },
      {
        accessorKey: ' ',
        cell: (info) => callDropdownActions(info.row.original)
      }
    ],
    [transformStatus, callDropdownActions]
  )

  return [columns]
}
