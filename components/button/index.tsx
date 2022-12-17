import React, { useState, useEffect, ReactNode } from 'react'
import classnames from 'classnames'

type ButtonColor =
  | 'primary'
  | 'error'
  | 'success'
  | 'accent'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'default'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonType = 'button' | 'submit' | 'reset'

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  color?: ButtonColor
  block?: boolean
  outline?: boolean
  pill?: boolean
  disabled?: boolean
  children: ReactNode
  size?: ButtonSize
  type?: ButtonType
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children, block, color, outline, pill, disabled, size, type, ...rest } = props
  const [mounted, setMounted] = useState(false)
  const [rippling, setRippling] = useState(false)
  const [coords, setCoords] = useState({ x: -1, y: -1 })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (coords.x !== -1 && coords.y !== -1) {
        setRippling(true)
        setTimeout(() => setRippling(false), 500)
      } else {
        setRippling(false)
      }
    }
  }, [coords, mounted])

  useEffect(() => {
    if (mounted) {
      if (!rippling) setCoords({ x: -1, y: -1 })
    }
  }, [rippling, mounted])

  return (
    <button
      className={classnames(
        'relative inline-flex items-center overflow-hidden px-[24px] py-[10px] font-lato common-transition text-center disabled:cursor-not-allowed',
        {
          'w-full justify-center': block,
          rounded: !pill,
          'rounded-full': pill,
          'h-[40px] text-pSmall': size === 'sm',
          'h-[45px] text-pNormal': size === 'md' || !size,
          'h-[50px] text-pLarge': size === 'lg',
          'text-light-btnText': !outline,
          'border-2 font-bold ': outline,

          'bg-light-container dark:bg-dark-container': color === 'default' && !outline,
          'bg-primary hover:bg-primary-dark disabled:bg-primary-light':
            (!color || color === 'primary') && !outline,
          'bg-secondary hover:bg-secondary-dark disabled:bg-secondary-light':
            color === 'secondary' && !outline,
          'bg-accent hover:bg-accent-dark disabled:bg-accent-light': color === 'accent' && !outline,
          'bg-error hover:bg-error-dark disabled:bg-error-light': color === 'error' && !outline,
          'bg-success hover:bg-success-dark disabled:bg-success-light':
            color === 'success' && !outline,
          'bg-info hover:bg-info-dark disabled:bg-info-light': color === 'info' && !outline,
          'bg-warning hover:bg-warning-dark disabled:bg-warning-light':
            color === 'warning' && !outline,

          'border-light-border dark:border-dark-border text-light-text dark:text-dark-text':
            outline && color === 'default',
          'border-primary text-primary hover:border-primary-dark hover:text-primary-dark disabled:border-primary-light disabled:text-primary-light':
            outline && color === 'primary',
          'border-secondary text-secondary hover:border-secondary-dark hover:text-secondary-dark disabled:border-secondary-light disabled:text-secondary-light':
            outline && color === 'secondary',
          'border-accent text-accent hover:border-accent-dark hover:text-accent-dark disabled:border-accent-light disabled:text-accent-light':
            outline && color === 'accent',
          'border-success text-success hover:border-success-dark hover:text-success-dark disabled:border-success-light disabled:text-success-light':
            outline && color === 'success',
          'border-error text-error hover:border-error-dark hover:text-error-dark disabled:border-error-light disabled:text-error-light':
            outline && color === 'error',
          'border-info text-info hover:border-info-dark hover:text-info-dark disabled:border-info-light disabled:text-info-light':
            outline && color === 'info',
          'border-warning text-warning hover:border-warning-dark hover:text-warning-dark disabled:border-warning-light disabled:text-warning-light':
            outline && color === 'warning'
        }
      )}
      onClick={(e) => {
        const rect = e.target as HTMLFormElement
        const r = rect.getBoundingClientRect()
        setCoords({ x: e.clientX - r.left, y: e.clientY - r.top })

        if (onClick) {
          onClick(e)
        }
      }}
      disabled={disabled}
      type={type ?? 'button'}
      {...rest}
    >
      {children}
      {rippling ? (
        <span className="waves-ripple" style={{ left: coords.x, top: coords.y }}></span>
      ) : null}
    </button>
  )
}

Button.defaultProps = {
  color: 'primary'
}
