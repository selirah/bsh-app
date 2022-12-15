import React, { ReactNode } from 'react'
import classnames from 'classnames'

type BadgeColor = 'default' | 'error' | 'warning' | 'info' | 'success'
type BadgeSize = 'sm' | 'md' | 'lg'

type BadgeProps = {
  pill?: boolean
  state?: boolean
  children: ReactNode
  color?: BadgeColor
  size?: BadgeSize
}

export const Badge: React.FC<BadgeProps> = (props) => {
  const { children, pill, size, color, state } = props
  return (
    <span
      className={classnames('font-lato font-medium px-[16px] py-[4px]', {
        'text-pSmall h-[16px]': !size || size === 'sm',
        'text-pNormal h-[20px]': size === 'md',
        'text-pLarge h-[24px]': size === 'lg',
        'bg-badge-default-container text-badge-default-text dark:bg-dark-background dark:border':
          !color || color === 'default',
        'bg-badge-error-container text-badge-error-text dark:bg-dark-background dark:border':
          color === 'error',
        'bg-badge-warning-container text-badge-warning-text dark:bg-dark-background dark:border':
          color === 'warning',
        'bg-badge-info-container text-badge-info-text dark:bg-dark-background dark:border':
          color === 'info',
        'bg-badge-success-container text-badge-success-text dark:bg-dark-background dark:border':
          color === 'success',
        rounded: !pill,
        'rounded-full': pill
      })}
    >
      {state ? <span className="mr-1">&bull;</span> : null}
      {children}
    </span>
  )
}
