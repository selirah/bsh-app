import React from 'react'
import classnames from 'classnames'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid'

interface TableProps {
  children: React.ReactNode
  align?: 'left' | 'right' | 'center'
  bordered?: boolean
}

interface TableHeaderColumnProps extends TableProps {
  sortable?: boolean
  sortDir?: boolean | string
  colSpan?: number
  onToggleSorting?: (event: unknown) => void
}

interface TableRowProps extends TableProps {
  striped?: boolean
  hover?: boolean
}

interface TableColumnProps extends TableProps {
  striped?: boolean
  colSpan?: number
}

export const Table: React.FC<TableProps> = (props) => {
  const { children, bordered, ...rest } = props
  return (
    <div className="overflow-x-auto relative table-auto">
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
  const { children, bordered, align, ...rest } = props
  return (
    <thead
      className={classnames(
        'text-pSmall font-lato font-medium text-dark-btnText uppercase bg-table-header dark:bg-dark-background dark:text-light-btnText',
        {
          'text-left': align === 'left' || !align,
          'text-right': align === 'right',
          'text-center': align === 'center',
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
        'text-left': align === 'left' || !align,
        'text-right': align === 'right',
        'text-center': align === 'center',
        'cursor-pointer': sortable,
        'border border-light-border dark:border-dark-border': bordered
      })}
      colSpan={colSpan}
      onClick={onToggleSorting}
      {...rest}
    >
      <div className="flex items-center">
        {children}
        {sortable ? (
          sortDir && sortDir === 'desc' ? (
            <ChevronDownIcon className="w-4 h-4 ml-2 text-light-text dark:text-dark-text" />
          ) : sortDir && sortDir === 'asc' ? (
            <ChevronUpIcon className="w-4 h-4 ml-2 text-light-text dark:text-dark-text" />
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
        'bg-table-cell dark:bg-dark-background': striped,
        'hover:bg-table-cell dark:bg-dark-background': hover,
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
        'bg-table-cell dark:bg-dark-background': striped
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
