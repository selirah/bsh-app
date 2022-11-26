import React from 'react'
import { NavMenu } from 'components'
import { UserGroupIcon, ChartBarIcon, HomeIcon } from '@heroicons/react/outline'

export default function Home() {
  return (
    <div className="m-56">
      <NavMenu.Basic menuTitle="Dashboard" IconSVG={HomeIcon} />
      <NavMenu.Basic menuTitle="Users" IconSVG={UserGroupIcon} />
      <NavMenu.Basic menuTitle="Reports" IconSVG={ChartBarIcon} />
    </div>
  )
}
