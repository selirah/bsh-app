import React from 'react'
import { StatsCard } from 'components'
import { FiUsers, FiBarChart2 } from 'react-icons/fi'

const chart: StatsCard.ChartObj[] = [
  {
    name: 'Monday',
    value: 4000
  },
  {
    name: 'Tuesday',
    value: 3000
  },
  {
    name: 'Wednesday',
    value: 2000
  },
  {
    name: 'Thursday',
    value: 2780
  },
  {
    name: 'Friday',
    value: 1890
  },
  {
    name: 'Saturday',
    value: 2390
  },
  {
    name: 'Sunday',
    value: 3490
  }
]

const StatsCardComponent = () => {
  return (
    <div className="m-56">
      <StatsCard.Basic title="Total Subscribers" value={71897} />

      <div className="mt-4">
        <StatsCard.Icon title="Total Subscribers" value={71897} IconSVG={FiUsers} circular />
      </div>

      <div className="mt-4">
        <StatsCard.Chart
          title="Weekly income"
          value={750}
          IconSVG={FiBarChart2}
          currency="$"
          chartData={chart}
          chartColor="success"
        />
      </div>
    </div>
  )
}

export default StatsCardComponent
