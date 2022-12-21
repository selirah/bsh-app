import React, { ReactNode } from 'react'
import classnames from 'classnames'
import { FiInfo, FiAlertCircle, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'

type AlertColor = 'warning' | 'success' | 'error' | 'info'

type AlertProps = {
  color: AlertColor
  border?: boolean
  children: ReactNode
}

export const Alert: React.FC<AlertProps> = (props) => {
  const { children, color, border } = props

  return (
    <div
      className={classnames('flex p-[16px]', {
        rounded: !border,
        'bg-warning-light text-warning dark:bg-dark-container dark:border': color === 'warning',
        'bg-success-light text-success dark:bg-dark-container dark:border': color === 'success',
        'bg-info-light text-info dark:bg-dark-container dark:border': color === 'info',
        'bg-error-light text-error dark:bg-dark-container dark:border': color === 'error',
        'border-l-4': border
      })}
      role="alert"
      id="alert"
    >
      {color === 'warning' ? (
        <FiAlertTriangle className="flex-shrink-0 inline w-6 h-6 mr-3 mt-1 " />
      ) : color === 'error' ? (
        <FiAlertCircle className="flex-shrink-0 inline w-6 h-6 mr-3" />
      ) : color === 'info' ? (
        <FiInfo className="flex-shrink-0 inline w-6 h-6 mr-3" />
      ) : (
        <FiCheckCircle className="flex-shrink-0 inline w-6 h-6 mr-3 mt-1" />
      )}
      <div className="">{children}</div>
    </div>
  )
}
