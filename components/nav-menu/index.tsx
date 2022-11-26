import React from 'react'
import classnames from 'classnames'
import Link from 'next/link'

export type SubLinkObj = {
  title: string
  link: string
  active?: string
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
}

interface NavMenuProps {
  menuTitle: string
  link?: string
  active?: boolean
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
}

interface SubLinksProps extends NavMenuProps {
  subLinks: SubLinkObj[]
}

export const Basic: React.FC<NavMenuProps> = (props) => {
  const { menuTitle, IconSVG, active, link } = props
  return (
    <div
      className={classnames(
        'p-[12px] rounded font-montserrat cursor-pointer hover:bg-primary hover:rounded font-regular hover:text-light-btnText transition ease-in-out delay-150',
        {
          'text-light-text dark:text-dark-text ': !active,
          'bg-primary text-light-btnText': active
        }
      )}
    >
      {link ? (
        <Link href={link} className="flex items-center">
          {IconSVG ? <IconSVG className="w-[18px] h-[18px] mr-2" /> : null}
          <span className="text-pNormal">{menuTitle}</span>
        </Link>
      ) : (
        <div className="flex items-center">
          {IconSVG ? <IconSVG className="w-[18px] h-[18px] mr-2" /> : null}
          <span className="text-pNormal">{menuTitle}</span>
        </div>
      )}
    </div>
  )
}

export const SubLink: React.FC<SubLinksProps> = () => {
  return <div></div>
}
