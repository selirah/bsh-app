import React from 'react'
import { StatsCard } from 'components'
import { UserGroupIcon, ChartBarIcon } from '@heroicons/react/solid'

const chart: StatsCard.ChartObj[] = [
  {
    name: 'Page A',
    value: 4000
  },
  {
    name: 'Page B',
    value: 3000
  },
  {
    name: 'Page C',
    value: 2000
  },
  {
    name: 'Page D',
    value: 2780
  },
  {
    name: 'Page E',
    value: 1890
  },
  {
    name: 'Page F',
    value: 2390
  },
  {
    name: 'Page G',
    value: 3490
  }
]

const StatsCardComponent = () => {
  return (
    <div className="m-56">
      <StatsCard.Basic title="Total Subscribers" value={71897} />

      <div className="mt-4">
        <StatsCard.Icon title="Total Subscribers" value={71897} IconSVG={UserGroupIcon} circular />
      </div>

      <div className="mt-4">
        <StatsCard.Chart
          title="Weekly income"
          value={750}
          IconSVG={ChartBarIcon}
          currency="$"
          chartData={chart}
          chartColor="success"
        />
      </div>
    </div>
  )
}

export default StatsCardComponent
