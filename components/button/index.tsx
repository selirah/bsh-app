import React, { useState, useEffect } from 'react'
import classnames from 'classnames'

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  color?: 'primary'
  block?: boolean
  style?: 'filled' | 'outlined'
  type?: 'pill' | 'rounded'
  icon?: React.ReactNode
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  size?: 'small | medium | large'
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children, icon } = props
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
        'relative overflow-hidden px-[24px] py-[10px] bg-primary text-light-btnText rounded-sm font-lato text-pSmall hover:bg-primaryDark transition duration-300 delay-150 hover:delay-150',
        {}
      )}
      onClick={(e) => {
        const rect = e.target as HTMLFormElement
        const r = rect.getBoundingClientRect()
        setCoords({ x: e.clientX - r.left, y: e.clientY - r.top })

        if (onClick) {
          onClick(e)
        }
      }}
    >
      {children}
      {rippling ? (
        <span className="waves-ripple" style={{ left: coords.x, top: coords.y }}></span>
      ) : null}
    </button>
  )
}

export default Button
