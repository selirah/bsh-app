import React, { ReactNode } from 'react'

type AlertColor = 'warning' | 'success' | 'error' | 'info'

interface AlertProps {
  color?: AlertColor
  icon?: ReactNode
  children?: ReactNode
}

const Alert: React.FC<AlertProps> = (props) => {
  const { children } = props
  return <div>index</div>
}

export { Alert }
