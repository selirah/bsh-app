import React from 'react'
import { NavMenu } from 'components'
import { ChartBarIcon, HomeIcon, OfficeBuildingIcon } from '@heroicons/react/outline'

const subdata: NavMenu.SubLinkObj[] = [
  {
    link: '/one',
    title: 'Agency Banking'
  },
  {
    link: '/two',
    title: 'm-Banking'
  },
  {
    link: '/three',
    title: 'e-Banking'
  }
]

const NavMenuComponent = () => {
  return (
    <div className="m-56 w-56">
      <NavMenu.Basic menuTitle="Dashboard" IconSVG={HomeIcon} link="/admin" />
      <NavMenu.Basic menuTitle="Banking" IconSVG={OfficeBuildingIcon} link="/admin" />
      <NavMenu.Basic menuTitle="Reports" IconSVG={ChartBarIcon} link="/admin" iconOnly />

      <div className="mt-10 w-56">
        <NavMenu.SubLink menuTitle="Banking" subLinks={subdata} IconSVG={OfficeBuildingIcon} />
      </div>
    </div>
  )
}

export default NavMenuComponent
