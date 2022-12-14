import { useState } from 'react'
import { AdminLayout, BasicContainer } from 'layouts'
import { routes, AgentsListFilter, FilterValues } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import {
  FilterPayload,
  SuccessResponse,
  ErrorResponse,
  Branch,
  Classifier,
  Option,
  KeyValuePair
} from 'types'
import {
  useFetchAgentAccountTypes,
  useFetchAgentStatus,
  useFetchAllAgents
} from 'hooks/agency-banking'
import { useFetchBranches } from 'hooks/common'
import { onAxiosError } from 'utils'
import { Alert /*, BasicLoader*/ } from 'components'

const AgentsListPage = () => {
  const intl = useIntl()
  const [currentPage /*, setCurrentPage*/] = useState(1)
  const [pageSize /*, setPageSize*/] = useState(10)
  const [filterPayload, setFilterPayload] = useState<FilterPayload>({
    keyword: '',
    filters: {},
    page: {
      number: currentPage,
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
    console.log(response)
  }

  const { isLoading: loadingAgentTypes } = useFetchAgentAccountTypes(onFetchAgentTypeSuccess)
  const { isLoading: loadingAgentStatus } = useFetchAgentStatus(onFetchAgentStatusSuccess)
  const { isLoading: loadingBranches } = useFetchBranches(onFetchBranches)
  const { isLoading: loadingAllAgents } = useFetchAllAgents(
    filterPayload,
    onFetchAllAgentsSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  const onHandleFilter = (values: FilterValues) => {
    let filters: KeyValuePair = {}
    const agentTypes = values.agentTypes.length && values.agentTypes.map((d) => d.value)
    const agentStatus = values.agentStatus.length && values.agentStatus.map((d) => d.value)
    const branches = values.branches.length && values.branches.map((d) => d.value)
    const { keyword } = values
    filters['AgentType'] = agentTypes
    filters['AgentStatus'] = agentStatus
    filters['Branch'] = branches
    setFilterPayload({ ...filterPayload, filters, keyword })
  }

  return (
    <AdminLayout pageTitle="Agents List" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <AgentsListFilter
          agentStatus={agentStatus}
          agentTypes={agentTypes}
          branches={branches}
          onHandleFilter={onHandleFilter}
          isSubmitting={loadingAllAgents}
          loadingAgentStatus={loadingAgentStatus}
          loadingBranches={loadingBranches}
          loadingAgentTypes={loadingAgentTypes}
        />
        {/* <BasicLoader spinColor="accent" size="2xl" /> */}
      </BasicContainer>
    </AdminLayout>
  )
}

export default AgentsListPage
