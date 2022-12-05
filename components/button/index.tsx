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

interface ButtonProps {
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
  const { onClick, children, block, color, outline, pill, disabled, size, type } = props
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
          'bg-primary hover:bg-primaryDark': (!color || color === 'primary') && !outline,
          'bg-secondary hover:bg-secondary-hovered': color === 'secondary' && !outline,
          'bg-error-card hover:bg-error-hovered': color === 'error' && !outline,
          'bg-success-card hover:bg-success-hovered': color === 'success' && !outline,
          'bg-accent hover:bg-accentDark': color === 'accent' && !outline,
          'bg-info-avatar hover:bg-info-text': color === 'info' && !outline,
          'bg-warning-avatar hover:bg-warning-text': color === 'warning' && !outline,
          'bg-light-container dark:bg-dark-container': color === 'default' && !outline,
          'border-2 font-bold ': outline,
          'border-primary text-primary': outline && color === 'primary',
          'border-light-border dark:border-dark-border text-light-text dark:text-dark-text':
            outline && color === 'default',
          'border-error-card text-error-card': outline && color === 'error',
          'border-success-card text-success-card': outline && color === 'success',
          'border-accent text-accent': outline && color === 'accent',
          'disabled:bg-primaryLight': disabled && color === 'primary' && !outline,
          'disabled:bg-accentLight': disabled && color === 'accent' && !outline,
          'disabled:bg-error-disabled': disabled && color === 'error' && !outline,
          'disabled:bg-secondaryLight': disabled && color === 'secondary' && !outline,
          'disabled:bg-success-disabled': disabled && color === 'success' && !outline,
          'disabled:border-primaryLight disabled:text-primaryLight': outline && color === 'primary',
          'disabled:border-error-disabled disabled:text-error-disabled':
            outline && color === 'error',
          'disabled:border-success-disabled disabled:text-success-disabled':
            outline && color === 'success',
          'disabled:border-accentLight disabled:text-accentLight': outline && color === 'accent'
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
    >
      {children}
      {rippling ? (
        <span className="waves-ripple" style={{ left: coords.x, top: coords.y }}></span>
      ) : null}
    </button>
  )
}
