import { useState, useMemo, useEffect } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { AdminLayout, BasicContainer, authorizationHOC } from 'layouts'
import { routes, OutletUsersFilter } from 'containers/agency-banking'
import { useIntl } from 'react-intl'
import { PaginationState } from '@tanstack/react-table'
import {
  FilterPayload,
  SuccessResponse,
  ErrorResponse,
  AgencyBankingFilterValues,
  OutletUser,
  OutletUserResponse
} from 'types'
import { useFetchOutletUsers, useOutletUsersTableColumns } from 'hooks/agency-banking'
import { onAxiosError } from 'utils'
import { Alert, Empty } from 'components'
import { Table } from 'controllers'
import { MdCreate } from 'react-icons/md'

const ManageOutletUsersPage = ({
  agentId,
  agentCode
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl()
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [filterPayload, setFilterPayload] = useState<FilterPayload>({
    keyword: '',
    filters: {},
    page: {
      number: pageIndex + 1,
      size: pageSize
    },
    sort: {
      by: '',
      order: ''
    },
    agentId: agentId
  })
  const [error, setError] = useState(null)
  const [columns] = useOutletUsersTableColumns()
  const [outletUsersData, setOutletUsersData] = useState<OutletUser[]>([])
  const [totalRecords, setTotalRecords] = useState(0)
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )
  const router = useRouter()

  const onFetchOutletUsersSuccess = (response: SuccessResponse) => {
    const { data, status } = response
    if (status === 200 && data) {
      const obj = data as OutletUserResponse
      setOutletUsersData(obj.data)
      setTotalRecords(obj.totalRecords)
    }
  }

  const { isLoading, isFetching, isFetched } = useFetchOutletUsers(
    filterPayload,
    onFetchOutletUsersSuccess,
    (error: ErrorResponse) => onAxiosError(error, setError)
  )

  useEffect(() => {
    setFilterPayload({
      ...filterPayload,
      page: { number: pagination.pageIndex + 1, size: pagination.pageSize }
    })
  }, [pagination])

  const onHandleFilter = async (values: AgencyBankingFilterValues) => {
    const { keyword } = values
    setFilterPayload({ ...filterPayload, keyword })
  }

  const onRedirect = () => {
    router.push(
      `/admin/agency-banking/agents-list/manage-users/create-user?agentId=${agentId}&agentCode=${agentCode}`
    )
  }

  return (
    <AdminLayout pageTitle="Manage Outlet Users" breadcrumbActions={routes(intl)}>
      <BasicContainer>
        <div className="mb-2">{error && <Alert color="error">{error}</Alert>}</div>
        <OutletUsersFilter onHandleFilter={onHandleFilter} onClick={onRedirect} />
        <div className="mt-8">
          {isFetched && !isLoading && !isFetching && !outletUsersData.length ? (
            <Empty.ActionButton
              btnText={intl.formatMessage({ defaultMessage: 'Create outlet user' })}
              IconSVG={MdCreate}
              title={intl.formatMessage({ defaultMessage: 'No Records Found' })}
              onClick={onRedirect}
              border
            >
              {intl.formatMessage({ defaultMessage: 'Get started by creating an outlet user' })}
            </Empty.ActionButton>
          ) : (
            <Table.ServerPagination
              columns={columns}
              data={outletUsersData}
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

export async function getServerSideProps({ query }) {
  const agentId = query.agentId as number
  const agentCode = query.agentCode as string
  return {
    props: {
      agentId,
      agentCode
    }
  }
}

export default authorizationHOC('AgencyBanking:ManageUsers', ManageOutletUsersPage, true)
