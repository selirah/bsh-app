import React from 'react'
import classnames from 'classnames'
import CountUp from 'react-countup'
import { useIntl } from 'react-intl'
import { AreaChart, Tooltip, XAxis, YAxis, Area, ResponsiveContainer } from 'recharts'

type BgColor = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

type ChartColor = 'success' | 'info' | 'error' | 'warning'

export type ChartObj = {
  name: string
  value: number
}

type StatsCardProps = {
  title: string
  value: number
  currency?: string
}

type BasicProps = StatsCardProps & {
  onClick?: () => void
  actionText?: string
}

type IconProps = StatsCardProps & {
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  bgColor?: BgColor
  onClick?: () => void
  actionText?: string
  circular?: boolean
}

type ChartProps = StatsCardProps & {
  chartData?: ChartObj[]
  IconSVG: React.FC<React.SVGProps<SVGSVGElement>>
  chartColor?: ChartColor
}

export const Basic: React.FC<BasicProps> = (props) => {
  const { title, value, onClick, actionText, currency } = props
  const intl = useIntl()
  return (
    <div className="w-full border border-light-border dark:border-dark-border rounded font-montserrat shadow-penumbra">
      <div
        className={classnames('p-[16px] bg-light-container dark:bg-dark-container', {
          rounded: !onClick,
          'rounded-t': onClick
        })}
      >
        <h6 className="text-h6 text-light-text dark:text-dark-text font-regular">{title}</h6>
        <h4 className="text-h4 text-dark-btnText dark:text-light-btnText font-medium">
          {currency ? <span className="mr-2">{currency}</span> : null}
          <CountUp end={value} separator="," duration={2.75} />
        </h4>
      </div>
      {onClick ? (
        <div
          className="px-[16px] py-[8px] bg-table-cell dark:bg-dark-gray text-dark-btnText dark:text-light-btnText text-pNormal cursor-pointer hover:text-primary common-transition rounded-b"
          onClick={onClick}
        >
          {actionText ??
            intl.formatMessage({
              defaultMessage: 'View all',
              description: 'Action text for stats card'
            })}
        </div>
      ) : null}
    </div>
  )
}

export const Icon: React.FC<IconProps> = (props) => {
  const { IconSVG, title, value, bgColor, actionText, onClick, circular, currency } = props
  const intl = useIntl()

  return (
    <div className="w-full border border-light-border dark:border-dark-border rounded font-montserrat shadow-penumbra">
      <div
        className={classnames('flex p-[16px] bg-light-container dark:bg-dark-container', {
          rounded: !onClick,
          'rounded-t': onClick
        })}
      >
        <div
          className={classnames('flex justify-center items-center mr-[16px] px-[24px]', {
            'bg-primary': bgColor === 'primary' || !bgColor,
            'bg-secondary': bgColor === 'secondary',
            'bg-accent': bgColor === 'accent',
            'bg-success': bgColor === 'success',
            'bg-error': bgColor === 'error',
            'bg-info': bgColor === 'info',
            'bg-warning': bgColor === 'warning',
            rounded: !circular,
            'rounded-full': circular
          })}
        >
          <IconSVG className="w-[36px] h-[36px] text-light-btnText" />
        </div>
        <div>
          <h6 className="text-h6 text-light-text dark:text-dark-text font-regular">{title}</h6>
          <h4 className="text-h4 text-dark-btnText dark:text-light-btnText font-medium">
            {currency ? <span className="mr-2">{currency}</span> : null}
            <CountUp end={value} separator="," duration={2.75} />
          </h4>
        </div>
      </div>
      {onClick ? (
        <div
          className="px-[16px] py-[8px] bg-table-cell dark:bg-dark-gray text-dark-btnText dark:text-light-btnText text-pNormal cursor-pointer hover:text-primary common-transition rounded-b"
          onClick={onClick}
        >
          {actionText ??
            intl.formatMessage({
              defaultMessage: 'View all',
              description: 'Action text for stats card'
            })}
        </div>
      ) : null}
    </div>
  )
}

export const Chart: React.FC<ChartProps> = (props) => {
  const { IconSVG, title, value, chartData, chartColor, currency } = props
  const intl = useIntl()

  return (
    <div className="block shadow-penumbra rounded border border-light-border dark:border-dark-border">
      <div className="flex justify-between p-[16px] bg-light-container dark:bg-dark-container">
        <div
          className={classnames('flex justify-center items-center rounded-full p-[20px]', {
            'bg-badge-info-container text-badge-info-text': chartColor === 'info' || !chartColor,
            'bg-badge-success-container text-badge-success-text': chartColor === 'success',
            'bg-badge-error-container text-badge-error-text': chartColor === 'error',
            'bg-badge-warning-container text-badge-warning-text': chartColor === 'warning'
          })}
        >
          <IconSVG className="w-[32px] h-[32px]" />
        </div>
        <div className="font-montserrat">
          <h6 className="text-h6 text-dark-btnText dark:text-light-btnText font-medium text-right">
            {currency ? <span className="mr-2">{currency}</span> : null}
            <CountUp end={value} separator="," duration={2.75} />
          </h6>
          <p className="text-pLarge text-light-text dark:text-dark-text font-regular">{title}</p>
        </div>
      </div>
      {chartData.length ? (
        <div className="bg-light-container dark:bg-dark-container w-full rounded">
          <ResponsiveContainer width="100%" height={100} className="p-0">
            <AreaChart data={chartData}>
              <XAxis dataKey="name" tick={false} hide />
              <YAxis hide />
              <Tooltip
                labelClassName="text-primary"
                contentStyle={{ backgroundColor: '#fff' }}
                label={intl.formatMessage({ defaultMessage: 'Value', description: '' })}
                isAnimationActive
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={
                  chartColor === 'info' || !chartColor
                    ? '#1F41AE'
                    : chartColor === 'success'
                    ? '#4BDD80'
                    : chartColor === 'error'
                    ? '#A63837'
                    : chartColor === 'warning'
                    ? '#895314'
                    : ''
                }
                fillOpacity={1}
                fill={
                  chartColor === 'info' || !chartColor
                    ? '#DAEAFF'
                    : chartColor === 'success'
                    ? '#DDFDE7'
                    : chartColor === 'error'
                    ? '#FDE3E0'
                    : chartColor === 'warning'
                    ? '#FFF8C3'
                    : ''
                }
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  )
}
