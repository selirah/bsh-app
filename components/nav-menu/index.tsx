import React from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/solid'

export type SubLinkObj = {
  title: string
  link: string
  active?: string
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  inaccessible?: boolean
}

interface NavMenuProps {
  menuTitle: string
  active?: boolean
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
}

interface BasicProps extends NavMenuProps {
  link: string
}

interface SubLinksProps extends NavMenuProps {
  subLinks: SubLinkObj[]
}

export const Basic: React.FC<BasicProps> = (props) => {
  const { menuTitle, IconSVG, active, link } = props
  return (
    <div
      className={classnames(
        'p-[12px] rounded font-montserrat cursor-pointer hover:bg-primary hover:rounded font-regular hover:text-light-btnText common-transition',
        {
          'text-light-text dark:text-dark-text ': !active,
          'bg-primary text-light-btnText': active
        }
      )}
    >
      <Link href={link} className="flex items-center">
        {IconSVG ? <IconSVG className="w-[18px] h-[18px] mr-2" /> : null}
        <span className="text-pNormal">{menuTitle}</span>
      </Link>
    </div>
  )
}

export const SubLink: React.FC<SubLinksProps> = (props) => {
  const { menuTitle, subLinks, IconSVG, active } = props
  return (
    <div className="group inline-block relative w-full">
      <div
        className={classnames(
          'flex justify-between items-center p-[12px] rounded font-montserrat cursor-pointer group-hover:bg-primary group-hover:text-light-btnText hover:bg-primary hover:rounded font-regular hover:text-light-btnText common-transition',
          {
            'text-light-text dark:text-dark-text ': !active,
            'bg-primary text-light-btnText': active
          }
        )}
      >
        <div className="flex items-center">
          {IconSVG ? <IconSVG className="w-[18px] h-[18px] mr-2" /> : null}
          <span className="text-pNormal">{menuTitle}</span>
        </div>
        <ChevronRightIcon className="w-4 h-4 invisible group-hover:visible" />
      </div>
      <ul className="w-64 absolute origin-top-right -right-[260px] top-0 hidden group-hover:block rounded border border-light-border dark:border-dark-border shadow-penumbra bg-light-container dark:bg-dark-container font-montserrat transition ease-out duration-100 text-pSmall">
        {subLinks.map((link) => (
          <li key={link.link} className="">
            <Link className="" href={link.link}>
              <button
                className="flex w-full items-center disabled:cursor-not-allowed text-light-text dark:text-dark-text hover:text-light-btnText hover:bg-primary rounded p-[12px] common-transition disabled:hover:bg-primaryLight"
                disabled={link.inaccessible}
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
    </div>
  )
}
