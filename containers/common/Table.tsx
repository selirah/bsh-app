import { useState, Fragment } from 'react'
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableHeaderRow,
  Pagination,
  BasicLoader
} from 'components'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  getSortedRowModel,
  SortingState
} from '@tanstack/react-table'
import { FormattedMessage } from 'react-intl'

type Props = {
  data: unknown[]
  columns: ColumnDef<any>[]
  isFetching?: boolean
  isSorting?: boolean
}

export const ClientPagination: React.FC<Props> = (props) => {
  const { data, columns, isFetching, isSorting } = props
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting: isSorting ? sorting : null },
    onSortingChange: setSorting,
    getSortedRowModel: isSorting ? getSortedRowModel() : null
  })

  return (
    <Fragment>
      <Table bordered>
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
                    <TableColumn
                      key={cell.id}
                      {...{
                        style: {
                          width: cell.column.getSize()
                        }
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableColumn>
                  )
                })}
              </TableRow>
            )
          })}
          <TableRow>
            {isFetching ? (
              <TableColumn colSpan={1000}>
                <div className="flex items-center space-x-4">
                  <FormattedMessage defaultMessage="Fetching data . . ." />
                  <BasicLoader size="md" spinColor="primary" />
                </div>
              </TableColumn>
            ) : null}
          </TableRow>
        </TableBody>
      </Table>
      <div className="mt-4">
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
    </Fragment>
  )
}

export const ServerPagination: React.FC = () => {
  return <div>Hello</div>
}
