import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import classnames from 'classnames'
import { Button } from 'components'

type ColorTypes = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

interface AccordionProps {
  children: React.ReactNode
}

interface BasicProps extends AccordionProps {
  title: string
  color?: ColorTypes
}

interface ActionButtonProps extends AccordionProps {
  btnText: string
  extraBtnText?: string
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  btnColor?: ColorTypes
  extraBtnColor?: ColorTypes
  extraBtnAction?: () => void
  IconSVGExtra?: React.FC<React.SVGProps<SVGSVGElement>>
}

export const Basic: React.FC<BasicProps> = (props) => {
  const { title, color, children } = props
  return (
    <div className="relative w-full overflow-hidden">
      <input
        type="checkbox"
        className="peer absolute top-0 left-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer"
      />
      <div
        className={classnames('h-12 w-full pl-[16px] flex items-center', {
          'bg-primary': color === 'primary' || !color,
          'bg-secondary': color === 'secondary',
          'bg-accent': color === 'accent',
          'bg-success-card': color === 'success',
          'bg-error-card': color === 'error',
          'bg-info-avatar': color === 'info',
          'bg-warning-avatar': color === 'warning'
        })}
      >
        <h1 className={classnames('text-pNormal font-lato font-regular text-light-btnText', {})}>
          {title}
        </h1>
      </div>
      <div className="absolute top-3 right-[16px] transition-transform duration-500 rotate-0 peer-checked:rotate-180">
        <ChevronDownIcon className={classnames('h-6 w-6 text-light-btnText', {})} />
      </div>
      <div className="bg-light-container dark:bg-dark-container overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-96">
        <div
          className={classnames(
            'p-4 text-pNormal font-regular font-montserrat text-light-text dark:text-dark-text',
            {}
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const {
    btnText,
    extraBtnText,
    btnColor,
    extraBtnColor,
    IconSVG,
    extraBtnAction,
    children,
    IconSVGExtra
  } = props
  const [addClass, setAddClass] = useState(false)

  return (
    <div className="relative w-full overflow-hidden">
      <div className={classnames('h-12 w-full pl-[16px] flex items-center justify-end ')}>
        <div className="flex space-x-2">
          {extraBtnText ? (
            <Button
              color={extraBtnColor ? extraBtnColor : btnColor}
              size="sm"
              onClick={extraBtnAction}
              outline
            >
              <IconSVGExtra className="h-4 w-4 mr-1" /> {extraBtnText}
            </Button>
          ) : null}
          <Button color={btnColor} size="sm" onClick={() => setAddClass(!addClass)}>
            <input
              type="checkbox"
              className="peer absolute top-0 h-10 left-0 inset-x-0 w-full opacity-0 z-10 cursor-pointer"
            />
            <IconSVG className="h-4 w-4 mr-1" /> {btnText}
            <ChevronDownIcon
              className={classnames(
                'transition-transform duration-500 rotate-0 h-5 w-5 ml-1 peer-checked:rotate-180',
                {}
              )}
            />
          </Button>
        </div>
      </div>
      <div
        className={classnames(
          'mt-4 bg-light-container dark:bg-dark-container overflow-hidden transition-all max-h-0 duration-500',
          { 'max-h-96': addClass }
        )}
      >
        <div
          className={classnames(
            'p-4 text-pNormal font-regular font-montserrat text-light-text dark:text-dark-text',
            {}
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}