import { useState, useMemo } from 'react'
import { AdminLayout, BasicContainer } from 'layouts'
import { routes, AgentsListFilter, FilterValues } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { PaginationState } from '@tanstack/react-table'
import {
  FilterPayload,
  SuccessResponse,
  ErrorResponse,
  Branch,
  Classifier,
  Option,
  KeyValuePair,
  ExportedDocument
} from 'types'
import {
  useFetchAgentAccountTypes,
  useFetchAgentStatus,
  useFetchAllAgents,
  useAgentListTableColumns,
  useExportAgents
} from 'hooks/agency-banking'
import { useFetchBranches } from 'hooks/common'
import { onAxiosError } from 'utils'
import { Alert, Empty } from 'components'
import { Table } from 'containers/common'
import { AgentObject, AgentResponse } from 'types'
import { MdCreate } from 'react-icons/md'

const AgentsListPage = () => {
  const intl = useIntl()
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [filterPayload, setFilterPayload] = useState<FilterPayload>({
    keyword: '',
    filters: {},
    page: {
      number: pageIndex,
      size: pageSize
    },
    sort: {
      by: '',
      order: ''
    }
  })
  const [error, setError] = useState(null)
  const [agentTypes, setAgentTypes] = useState<Option[]>([])
  const [agentStatus, setAgentStatus] = useState<Option[]>([])
  const [branches, setBranches] = useState<Option[]>([])
  const [columns] = useAgentListTableColumns()
  const [agentData, setAgentData] = useState<AgentObject[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const onFetchAgentTypeSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      const actualData = data as Classifier[]
      let arr: Option[] = []
      actualData.map((d) => {
        return arr.push({ label: d.name, value: d.id })
      })
      setAgentTypes(arr)
    }
  }

  const onFetchAgentStatusSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      const actualData = data as Classifier[]
      let arr: Option[] = []
      actualData.map((d) => {
        return arr.push({ label: d.name, value: d.id })
      })
      setAgentStatus(arr)
    }
  }

  const onFetchBranches = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      const actualData = data as Branch[]
      let arr: Option[] = []
      actualData.map((d) => {
        return arr.push({ label: d.name, value: `${d.branchId}` })
      })
      setBranches(arr)
    }
  }

  const onFetchAllAgentsSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as AgentResponse
      setAgentData(obj.data)
      setTotalRecords(obj.totalRecords)
    }
  }

  const onExportAgentsSuccess = (response: SuccessResponse) => {
    const { status, data } = response
    if (status === 200 && data) {
      const file = data as ExportedDocument
      const link = document.createElement('a')
      link.href = `data:text/csv;base64,${file.fileContents}`
      link.download = file.fileDownloadName
      link.click()
    }
  }

  const { isLoading: loadingAgentTypes } = useFetchAgentAccountTypes(onFetchAgentTypeSuccess)
  const { isLoading: loadingAgentStatus } = useFetchAgentStatus(onFetchAgentStatusSuccess)
  const { isLoading: loadingBranches } = useFetchBranches(onFetchBranches)
  const { isLoading, isFetching, isFetched } = useFetchAllAgents(
    filterPayload,
    onFetchAllAgentsSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )
  const { mutate: exportAgents, isLoading: isExportingAgents } = useExportAgents(
    onExportAgentsSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onHandleFilter = async (values: FilterValues) => {
    let filters: KeyValuePair = {}
    const agentTypes = values.agentTypes.length && values.agentTypes.map((d) => d.value)
    const agentStatus = values.agentStatus.length && values.agentStatus.map((d) => d.value)
    const branches = values.branches.length && values.branches.map((d) => d.value)
    const { keyword } = values
    agentTypes.length ? (filters['AgentType'] = agentTypes) : null
    agentStatus.length ? (filters['AgentStatus'] = agentStatus) : null
    branches.length ? (filters['Branch'] = branches) : null
    setFilterPayload({ ...filterPayload, filters, keyword })
  }

  console.log(pagination)

  return (
    <AdminLayout pageTitle="Agents List" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <AgentsListFilter
          agentStatus={agentStatus}
          agentTypes={agentTypes}
          branches={branches}
          onHandleFilter={onHandleFilter}
          loadingAgentStatus={loadingAgentStatus}
          loadingBranches={loadingBranches}
          loadingAgentTypes={loadingAgentTypes}
          onClick={() => (agentData.length ? exportAgents(filterPayload) : null)}
          btnLoading={isExportingAgents}
        />
        <div className="mt-8">
          {isFetched && !agentData.length ? (
            <Empty.ActionButton
              btnText={intl.formatMessage({ defaultMessage: 'Create agent' })}
              IconSVG={MdCreate}
              title={intl.formatMessage({ defaultMessage: 'No Records Found' })}
              onClick={() => null}
            >
              {intl.formatMessage({ defaultMessage: 'Get started by creating a new agent' })}
            </Empty.ActionButton>
          ) : (
            <Table.ServerPagination
              columns={columns}
              data={agentData}
              isSorting
              isFetching={isLoading || isFetching}
              pagination={pagination}
              setPagination={setPagination}
              totalRecords={totalRecords}
            />
          )}
        </div>
      </BasicContainer>
    </AdminLayout>
  )
}

export default AgentsListPage
