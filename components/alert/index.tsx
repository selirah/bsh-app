import React, { ReactNode } from 'react'
import classnames from 'classnames'
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ExclamationIcon
} from '@heroicons/react/solid'

type AlertColor = 'warning' | 'success' | 'error' | 'info'

interface AlertProps {
  color: AlertColor
  border?: boolean
  children: ReactNode
}

const Alert: React.FC<AlertProps> = (props) => {
  const { children, color, border } = props

  return (
    <div
      className={classnames('flex p-[16px] font-lato font-medium text-pNormal', {
        rounded: !border,
        'bg-warning-container text-warning-text': color === 'warning',
        'bg-success-container text-success-text': color === 'success',
        'bg-info-container text-info-text': color === 'info',
        'bg-error-container text-error-text': color === 'error',
        'border-l-4': border
      })}
      role="alert"
      id="alert"
    >
      {color === 'warning' ? (
        <ExclamationIcon className="flex-shrink-0 inline w-6 h-6 mr-3 mt-0.5" />
      ) : color === 'error' ? (
        <ExclamationCircleIcon className="flex-shrink-0 inline w-6 h-6 mr-3 mt-0.5" />
      ) : color === 'info' ? (
        <InformationCircleIcon className="flex-shrink-0 inline w-6 h-6 mr-3 mt-0.5" />
      ) : (
        <CheckCircleIcon className="flex-shrink-0 inline w-6 h-6 mr-3 mt-0.5" />
      )}
      <div className="mt-0.5">{children}</div>
    </div>
  )
}

export { Alert }
