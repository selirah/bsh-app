import { useState, useRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import classnames from 'classnames'
import { Button } from 'components'
import { Transition, AppleLoader } from 'components'

type ColorTypes = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

type AccordionProps = {
  children: React.ReactNode
}

type BasicProps = AccordionProps & {
  title: string
  color?: ColorTypes
}

type ActionButtonProps = AccordionProps & {
  btnText: string
  extraBtnText?: string
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  btnColor?: ColorTypes
  extraBtnColor?: ColorTypes
  extraBtnAction?: () => void
  IconSVGExtra?: React.FC<React.SVGProps<SVGSVGElement>>
  borderBottom?: boolean
  btnLoading?: boolean
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
          'bg-success': color === 'success',
          'bg-error': color === 'error',
          'bg-info': color === 'info',
          'bg-warning': color === 'warning'
        })}
      >
        <h1 className={classnames('text-pNormal font-lato font-regular text-light-btnText', {})}>
          {title}
        </h1>
      </div>
      <div className="absolute top-3 right-[16px] transition-transform duration-500 rotate-0 peer-checked:rotate-180">
        <FiChevronDown className={classnames('h-6 w-6 text-light-btnText', {})} />
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
    IconSVGExtra,
    borderBottom,
    btnLoading
  } = props
  const [addClass, setAddClass] = useState(false)
  const nodeRef = useRef(null)

  return (
    <div className="relative w-full z-10">
      <div className={classnames('h-12 w-full pl-[16px] flex items-center justify-end ')}>
        <div className="flex space-x-2">
          {extraBtnText ? (
            <Button
              color={extraBtnColor ? extraBtnColor : btnColor}
              size="sm"
              onClick={extraBtnAction}
              outline
            >
              {btnLoading ? (
                <AppleLoader strokeColor={extraBtnColor} size="sm" />
              ) : (
                <IconSVGExtra className="h-4 w-4 mr-1" />
              )}{' '}
              {extraBtnText}
            </Button>
          ) : null}
          <Button color={btnColor} size="sm" onClick={() => setAddClass(!addClass)}>
            <input
              type="checkbox"
              className="peer absolute top-0 h-10 left-0 inset-x-0 w-full opacity-0 z-10 cursor-pointer"
            />
            <IconSVG className="h-4 w-4 mr-1" /> {btnText}
            <FiChevronDown
              className={classnames(
                'transition-transform duration-500 rotate-0 h-5 w-5 ml-1 peer-checked:rotate-180',
                {}
              )}
            />
          </Button>
        </div>
      </div>
      <Transition.Dropdown isEnter={addClass} nodeRef={nodeRef}>
        <div
          className={classnames(
            'py-[16px] px-1 bg-light-container dark:bg-dark-container overflow-hidden transition-all max-h-0 duration-300',
            { 'max-h-full': addClass }
          )}
        >
          {borderBottom ? (
            <div className="border-t border-light-border mb-4 dark:border-dark-border" />
          ) : null}
          <div
            className={classnames(
              'w-full text-pNormal font-regular font-montserrat text-light-text dark:text-dark-text',
              {}
            )}
          >
            {children}
          </div>
        </div>
      </Transition.Dropdown>
    </div>
  )
}
