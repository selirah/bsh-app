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
  Button,
  Checkbox
} from 'components'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  SortingState,
  RowSelectionState
} from '@tanstack/react-table'
import { makeData, Person } from 'mock/makeData'

type TableComponentProps = {
  data: Person[]
  columns: ColumnDef<Person>[]
  sorting: SortingState
  setSorting: (value: SortingState) => void
  rowSelection: RowSelectionState
  setRowSelection: (value: RowSelectionState) => void
}

const TableComponent = ({
  data,
  columns,
  sorting,
  setSorting,
  rowSelection,
  setRowSelection
}: TableComponentProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection
  })

  return (
    <Fragment>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeaderColumn
                    key={header.id}
                    colSpan={header.colSpan}
                    sortable={header.column.getCanSort()}
                    sortDir={header.column.getIsSorted()}
                    onToggleSorting={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
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
      <div className="mt-4">{table.getSelectedRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getSelectedRowModel().flatRows, null, 2)}</pre>
    </Fragment>
  )
}

const SelectionTable = () => {
  const rerender = React.useReducer(() => ({}), {})[1]
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox.Indeterminate
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
              color: 'primary',
              size: 'sm'
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox.Indeterminate
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
              color: 'primary',
              size: 'sm'
            }}
          />
        )
      },
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

  const [data, setData] = useState<Person[]>([])
  const refreshData = () => setData(() => makeData(1000))
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  React.useEffect(() => {
    setData(makeData(1000))
  }, [])

  return (
    <div>
      <TableComponent {...{ data, columns, sorting, setSorting, rowSelection, setRowSelection }} />

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

export default SelectionTable
