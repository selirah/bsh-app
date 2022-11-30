import React from 'react'
import { NavMenu } from 'components'
import { FiBarChart2, FiHome } from 'react-icons/fi'
import { FaRegBuilding } from 'react-icons/fa'

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
      <NavMenu.Basic menuTitle="Dashboard" IconSVG={FiHome} link="/admin" />
      <NavMenu.Basic menuTitle="Banking" IconSVG={FaRegBuilding} link="/admin" />
      <NavMenu.Basic menuTitle="Reports" IconSVG={FiBarChart2} link="/admin" />

      <div className="mt-10 w-56">
        <NavMenu.SubLink menuTitle="Banking" subLinks={subdata} IconSVG={FaRegBuilding} />
      </div>
    </div>
  )
}

export default NavMenuComponent
