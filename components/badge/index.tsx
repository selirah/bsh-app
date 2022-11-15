import React, { ReactNode } from 'react'
import classnames from 'classnames'

type BadgeColor = 'default' | 'block' | 'pending' | 'rejected' | 'active'
type BadgeSize = 'small' | 'medium' | 'large'

interface BadgeProps {
  pill?: boolean
  state?: boolean
  children: ReactNode
  color?: BadgeColor
  size?: BadgeSize
}

const Badge: React.FC<BadgeProps> = (props) => {
  const { children, pill, size, color, state } = props
  return (
    <span
      className={classnames('font-lato font-bold px-[16px] py-[4px]', {
        'text-pSmall h-[24px]': !size || size === 'small',
        'text-pNormal h-[30px]': size === 'medium',
        'text-pLarge h-[40px]': size === 'large',
        'bg-badge-default-container text-badge-default-text': !color || color === 'default',
        'bg-badge-block-container text-badge-block-text': color === 'block',
        'bg-badge-pending-container text-badge-pending-text': color === 'pending',
        'bg-badge-rejected-container text-badge-rejected-text': color === 'rejected',
        'bg-badge-active-container text-badge-active-text': color === 'active',
        rounded: !pill,
        'rounded-full': pill
      })}
    >
      {state ? <span className="mr-1">&bull;</span> : null}
      {children}
    </span>
  )
}

export { Badge }
