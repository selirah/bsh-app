import { useState, useRef } from 'react'
import classnames from 'classnames'
import { FiChevronRight } from 'react-icons/fi'
import { Transition } from 'components'
import Link from 'next/link'

export type SubLinkObj = {
  title: string
  link: string
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  scope?: string
}

type NavMenuProps = {
  menuTitle: string
  activeRoute?: string
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  hideTitle?: boolean
  scope?: string
  spacing?: boolean
  setHoverActive?: (value: boolean) => void
}

type BasicProps = NavMenuProps & {
  link?: string
}

type SubLinksProps = NavMenuProps & {
  subLinks: SubLinkObj[]
}

export const Basic: React.FC<BasicProps> = (props) => {
  const { menuTitle, IconSVG, activeRoute, link, hideTitle, spacing } = props
  return (
    <li
      className={classnames(
        'p-[12px] rounded font-montserrat cursor-pointer hover:bg-primary hover:rounded font-regular hover:text-light-btnText duration-300',
        {
          'text-light-text dark:text-dark-text': link !== activeRoute,
          'bg-primary text-light-btnText': link === activeRoute,
          'mb-2': !spacing,
          'mb-9': spacing
        }
      )}
    >
      <Link className="flex items-center cursor-pointer" href={link}>
        <IconSVG
          className={classnames('', {
            'w-[18px] h-[18px]': !hideTitle,
            'w-[22px] h-[22px]': hideTitle,
            'mr-2': !hideTitle
          })}
        />
        {!hideTitle ? <span className="text-pNormal">{menuTitle}</span> : null}
      </Link>
    </li>
  )
}

export const SubLink: React.FC<SubLinksProps> = (props) => {
  const { menuTitle, subLinks, IconSVG, activeRoute, hideTitle, spacing, setHoverActive } = props
  const [isEnter, setIsEnter] = useState(false)
  const nodeRef = useRef(null)

  const onMouseOver = () => {
    setIsEnter(true)
    setHoverActive(true)
  }

  const onMouseOut = () => {
    setIsEnter(false)
    setHoverActive(false)
  }

  return (
    <li
      className="inline-block relative w-full duration-300"
      onMouseOver={onMouseOver}
      onFocus={onMouseOver}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
    >
      <div
        className={classnames(
          'flex justify-between items-center p-[12px] rounded font-montserrat cursor-pointer hover:bg-primary hover:rounded font-regular hover:text-light-btnText',
          {
            'text-light-text dark:text-dark-text ': !subLinks.find((l) => l.link === activeRoute),
            'bg-primary text-light-btnText': subLinks.find((l) => l.link === activeRoute),
            'bg-primary text-[#fff]': isEnter,
            'mb-2': !spacing,
            'mb-9': spacing
          }
        )}
      >
        <div className="flex items-center">
          <IconSVG
            className={classnames('', {
              'w-[18px] h-[18px]': !hideTitle,
              'w-[22px] h-[22px]': hideTitle,
              'mr-2': !hideTitle
            })}
          />
          {!hideTitle ? <span className="text-pNormal">{menuTitle}</span> : null}
        </div>
        <FiChevronRight
          className={classnames('w-4 h-4', {
            invisible: !isEnter,
            visible: isEnter
          })}
        />
      </div>
      <Transition.Dropdown isEnter={isEnter} nodeRef={nodeRef}>
        <ul
          className="w-64 absolute origin-top-right -right-[255px] top-0 rounded border border-light-border dark:border-dark-border shadow-penumbra bg-light-container dark:bg-dark-container font-montserrat text-pSmall z-10"
          ref={nodeRef}
        >
          {subLinks.map((link) => (
            <li key={link.link}>
              <Link className="cursor-pointer" href={link.link}>
                <button
                  className={classnames(
                    'flex w-full items-center disabled:cursor-not-allowed  hover:text-light-btnText hover:bg-primary rounded p-[12px] disabled:hover:bg-primaryLight',
                    {
                      'text-light-text dark:text-dark-text': link.link !== activeRoute,
                      'bg-primary text-light-btnText': link.link === activeRoute
                    }
                  )}
                  // disabled={link.inaccessible}
                >
                  {link.IconSVG ? (
                    <link.IconSVG className="mr-2 w-[16px] h-[16px] " aria-hidden="true" />
                  ) : null}
                  {link.title}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </Transition.Dropdown>
    </li>
  )
}
