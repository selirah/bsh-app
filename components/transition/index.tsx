import React from 'react'
import { CSSTransition } from 'react-transition-group'

type TransitionProps = {
  isEnter: boolean
  nodeRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}

export const Dropdown: React.FC<TransitionProps> = (props) => {
  const { isEnter, nodeRef, children } = props
  return (
    <CSSTransition in={isEnter} nodeRef={nodeRef} timeout={300} classNames="dropdown" unmountOnExit>
      {children}
    </CSSTransition>
  )
}
