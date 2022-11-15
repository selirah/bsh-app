import React from 'react'
import { Breadcrumb } from '../components'
import {
  ViewListIcon,
  ChartBarIcon,
  PresentationChartLineIcon,
  PlusIcon
} from '@heroicons/react/outline'

export default function Home() {
  const links: Array<{ title: string; link: string; active: boolean }> = [
    { link: '/page', title: 'Agency Banking', active: false },
    { link: '/page/user', title: 'Create Master', active: true }
  ]

  const actions: Array<{ title: string; link: string; icon?: React.ElementType }> = [
    {
      link: '/agency-list',
      title: 'Agency List',
      icon: ViewListIcon
    },
    {
      link: '/agency-reports',
      title: 'Agency Reports',
      icon: ChartBarIcon
    },
    {
      link: '/performance-reports',
      title: 'Performance Reports',
      icon: PresentationChartLineIcon
    },
    {
      link: '/create-agency',
      title: 'Create Agency',
      icon: PlusIcon
    }
  ]

  return (
    <div className="px-8 mt-10">
      <Breadcrumb links={links} actions={actions} />
    </div>
  )
}
