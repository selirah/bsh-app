import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useIntl } from 'react-intl'
import { AgentObject, StatusTypes, AgentTypes } from 'types'
import moment from 'moment'
import { Badge, Dropdown } from 'components'

export const useAgentListTableColumns = () => {
  const intl = useIntl()

  const callDropdownActions = (row: AgentObject) => {
    const links = [
      {
        title: intl.formatMessage({ defaultMessage: 'View details' }),
        inaccessible: false,
        link: `agency-banking/agents-list/view-details?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Edit' }),
        inaccessible: false,
        link: `agency-banking/agents-list/edit?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'View transactions' }),
        inaccessible: false,
        link: `agency-banking/agents-list/view-transactions?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Block/Deactivate' }),
        inaccessible: false,
        link: `agency-banking/agents-list/block?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Manage users' }),
        inaccessible: false,
        link: `agency-banking/agents-list/manage-users?agentCode=${row.agentCode}`
      },
      {
        title: intl.formatMessage({ defaultMessage: 'Create additional outlet' }),
        inaccessible: false,
        link: `agency-banking/agents-list/create-outlet?agentCode=${row.agentCode}`
      }
    ] as Dropdown.DropdownList[]

    return <Dropdown.Khebab actions={links} />
  }

  const transformStatus = (status: string) => {
    switch (status) {
      case StatusTypes.ACTIVE:
        return (
          <Badge color="success" pill size="sm">
            {status}
          </Badge>
        )
      case StatusTypes.BLOCKED:
        return (
          <Badge color="error" pill size="sm">
            {status}
          </Badge>
        )
      case StatusTypes.PENDINGBLOCK:
        return (
          <Badge color="warning" pill size="sm">
            {status}
          </Badge>
        )
      case StatusTypes.REJECTED:
        return (
          <Badge color="info" pill size="sm">
            {status}
          </Badge>
        )
      case StatusTypes.PENDINGEDIT:
        return (
          <Badge color="warning" pill size="sm">
            {status}
          </Badge>
        )
      case StatusTypes.PENDINGVERIFICATION:
        return (
          <Badge color="default" pill size="sm">
            {status}
          </Badge>
        )
      default:
        return (
          <Badge color="warning" pill size="sm">
            {status}
          </Badge>
        )
    }
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
