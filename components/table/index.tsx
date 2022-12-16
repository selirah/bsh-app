import React from 'react'
import classnames from 'classnames'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

export type TableProps = {
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
  bordered?: boolean
}

type TableHeaderColumnProps = TableProps & {
  sortable?: boolean
  sortDir?: boolean | string
  colSpan?: number
  onToggleSorting?: (event: unknown) => void
}

type TableRowProps = TableProps & {
  striped?: boolean
  hover?: boolean
}

type TableColumnProps = TableProps & {
  striped?: boolean
  colSpan?: number
}

export const Table: React.FC<TableProps> = (props) => {
  const { children, bordered, ...rest } = props
  return (
    <div className="overflow-x-auto h-full overflow-y-hidden table-auto relative">
      <table
        className={classnames('w-full text-pSmall text-left', {
          'rounded border border-light-border dark:border-dark-border': bordered
        })}
        {...rest}
      >
        {children}
      </table>
    </div>
  )
}

export const TableHeader: React.FC<TableProps> = (props) => {
  const { children, bordered, ...rest } = props
  return (
    <thead
      className={classnames(
        'text-pSmall font-lato font-medium text-dark-btnText uppercase bg-table-header dark:bg-dark-background dark:text-light-btnText',
        {
          'border-b border-light-border dark:border-dark-border': bordered
        }
      )}
      {...rest}
    >
      {children}
    </thead>
  )
}

export const TableHeaderRow: React.FC<TableProps> = (props) => {
  const { children, ...rest } = props
  return <tr {...rest}>{children}</tr>
}

export const TableHeaderColumn: React.FC<TableHeaderColumnProps> = (props) => {
  const { children, align, sortable, sortDir, colSpan, onToggleSorting, bordered, ...rest } = props

  return (
    <th
      scope="col"
      className={classnames('p-[12px]', {
        'cursor-pointer': sortable,
        'border border-light-border dark:border-dark-border': bordered
      })}
      colSpan={colSpan}
      onClick={onToggleSorting}
      {...rest}
    >
      <div
        className={classnames('flex items-center', {
          'justify-left': align === 'left' || !align,
          'justify-right': align === 'right',
          'justify-center': align === 'center'
        })}
      >
        {children}
        {sortable ? (
          sortDir && sortDir === 'desc' ? (
            <FiChevronDown className="w-4 h-4 ml-2 text-light-text dark:text-dark-text" />
          ) : sortDir && sortDir === 'asc' ? (
            <FiChevronUp className="w-4 h-4 ml-2 text-light-text dark:text-dark-text" />
          ) : null
        ) : null}
      </div>
    </th>
  )
}

export const TableBody: React.FC<TableProps> = (props) => {
  const { children, ...rest } = props

  return (
    <tbody className="font-montserrat text-light-text dark:text-dark-text" {...rest}>
      {children}
    </tbody>
  )
}

export const TableRow: React.FC<TableRowProps> = (props) => {
  const { children, align, striped, hover, bordered, ...rest } = props

  return (
    <tr
      className={classnames('', {
        'text-left': align === 'left' || !align,
        'text-right': align === 'right',
        'text-center': align === 'center',
        'bg-light-container dark:bg-dark-container': !striped,
        'bg-table-cell dark:bg-dark-container': striped,
        'hover:bg-table-cell dark:hover:bg-dark-background': hover,
        'border-b border-light-border dark:border-dark-border': bordered
      })}
      {...rest}
    >
      {children}
    </tr>
  )
}

export const TableColumn: React.FC<TableColumnProps> = (props) => {
  const { children, align, striped, colSpan, ...rest } = props

  return (
    <td
      className={classnames('p-[12px]', {
        'text-left': align === 'left' || !align,
        'text-right': align === 'right',
        'text-center': align === 'center',
        'bg-table-cell dark:bg-dark-container': striped
      })}
      colSpan={colSpan}
      {...rest}
    >
      {children}
    </td>
  )
}

export const TableFooter: React.FC<TableProps> = (props) => {
  const { children, ...rest } = props
  return (
    <tfoot
      className="font-montserrat font-bold text-dark-btnText dark:text-light-btnText"
      {...rest}
    >
      {children}
    </tfoot>
  )
}
