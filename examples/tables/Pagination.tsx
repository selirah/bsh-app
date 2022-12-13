import React, { Fragment, useState } from 'react'
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableHeaderRow,
  Pagination,
  Button
} from 'components'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender
} from '@tanstack/react-table'
import { makeData, Person } from 'mock/makeData'

type TableComponentProps = {
  data: Person[]
  columns: ColumnDef<Person>[]
}

const TableComponent = ({ data, columns }: TableComponentProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
    // debugTable: true
  })

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

const PaginationTable = () => {
  const rerender = React.useReducer(() => ({}), {})[1]

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Name',
        footer: (props) => props.column.id,
        columns: [
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
          }
        ]
      },
      {
        header: 'Info',
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            footer: (props) => props.column.id
          },
          {
            header: 'More Info',
            columns: [
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
            ]
          }
        ]
      }
    ],
    []
  )

  const [data, setData] = useState<Person[]>([])
  const refreshData = () => setData(() => makeData(100000))

  React.useEffect(() => {
    setData(makeData(100000))
  }, [])

  return (
    <div>
      <TableComponent {...{ data, columns }} />

      <div className="mt-6 flex space-x-4">
        <Button onClick={() => rerender()} size="sm">
          Force Rerender
        </Button>
        <Button onClick={() => refreshData()} size="sm" color="accent">
          Refresh Data
        </Button>
      </div>
    </div>
  )
}

export default PaginationTable
