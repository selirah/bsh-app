import React, { ReactNode } from 'react'
import classnames from 'classnames'

type BadgeColor = 'default' | 'block' | 'pending' | 'rejected' | 'active'
type BadgeSize = 'sm' | 'md' | 'lg'

interface BadgeProps {
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
      className={classnames('font-lato font-bold px-[16px] py-[4px]', {
        'text-pSmall h-[24px]': !size || size === 'sm',
        'text-pNormal h-[30px]': size === 'md',
        'text-pLarge h-[40px]': size === 'lg',
        'bg-badge-default-container text-badge-default-text dark:bg-dark-background dark:border':
          !color || color === 'default',
        'bg-badge-block-container text-badge-block-text dark:bg-dark-background dark:border':
          color === 'block',
        'bg-badge-pending-container text-badge-pending-text dark:bg-dark-background dark:border':
          color === 'pending',
        'bg-badge-rejected-container text-badge-rejected-text dark:bg-dark-background dark:border':
          color === 'rejected',
        'bg-badge-active-container text-badge-active-text dark:bg-dark-background dark:border':
          color === 'active',
        rounded: !pill,
        'rounded-full': pill
      })}
    >
      {state ? <span className="mr-1">&bull;</span> : null}
      {children}
    </span>
  )
}
