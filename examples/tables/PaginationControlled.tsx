import React, { Fragment } from 'react'
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableHeaderRow,
  Pagination
} from 'components'
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  PaginationState
} from '@tanstack/react-table'
import { useQuery, UseQueryResult } from 'react-query'
import { fetchData, Person } from 'mock/fetchData'

type TableComponentProps = {
  dataQuery: UseQueryResult<
    {
      rows: Person[]
      pageCount: number
    },
    unknown
  >
  columns: ColumnDef<Person>[]
  defaultData: any
  pagination: PaginationState
  setPagination: (value: PaginationState) => void
}

const TableComponent = ({
  dataQuery,
  columns,
  defaultData,
  pagination,
  setPagination
}: TableComponentProps) => {
  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    pageCount: dataQuery.data?.pageCount ?? -1,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  })

  // console.log(dataQuery.data.pageCount, pagination.pageSize)

  return (
    <Fragment>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeaderColumn key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </TableHeaderColumn>
                )
              })}
            </TableHeaderRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, i) => {
            const striped = i % 2 === 0
            return (
              <TableRow key={row.id} striped={striped} bordered hover>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableColumn key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableColumn>
                  )
                })}
              </TableRow>
            )
          })}
          <TableRow>
            {dataQuery.isFetching ? (
              <TableColumn colSpan={1000}>Loading...</TableColumn>
            ) : (
              <TableColumn colSpan={1000}>
                Showing {table.getRowModel().rows.length} of ~
                {dataQuery.data.pageCount * pagination.pageSize} results
              </TableColumn>
            )}
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-6">
        <Pagination
          canNextPage={table.getCanNextPage()}
          canPreviousPage={table.getCanPreviousPage()}
          gotoPage={table.setPageIndex}
          nextPage={table.nextPage}
          pageCount={table.getPageCount()}
          pageIndex={table.getState().pagination.pageIndex}
          previousPage={table.previousPage}
          setPageSize={table.setPageSize}
          pageSize={table.getState().pagination.pageSize}
        />
      </div>
      <div className="mt-4">{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
    </Fragment>
  )
}

const PaginationControlledTable = () => {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: (props) => props.column.id
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: (props) => props.column.id
      }
    ],
    []
  )

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const fetchDataOptions = {
    pageIndex,
    pageSize
  }
  const dataQuery = useQuery(['data', fetchDataOptions], () => fetchData(fetchDataOptions), {
    keepPreviousData: true
  })

  const defaultData = React.useMemo(() => [], [])

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  return (
    <div>
      <TableComponent {...{ columns, dataQuery, defaultData, pagination, setPagination }} />
    </div>
  )
}

export default PaginationControlledTable
