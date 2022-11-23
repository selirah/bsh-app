import React from 'react'
import { CheckIcon } from '@heroicons/react/solid'
import classnames from 'classnames'

type Color = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

interface StepProps {
  title: string
  leftBorder?: boolean
}

interface CompletedProps extends StepProps {
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  color?: Color
}

interface ActiveProps extends StepProps {
  step: number
  color?: Color
}

interface UnattendedProps extends StepProps {
  step: number
}

export const Completed: React.FC<CompletedProps> = (props) => {
  const { title, leftBorder, IconSVG, color } = props
  return (
    <div
      className={classnames('flex items-center p-[16px]', {
        'border-r border-light-border dark:border-dark-border': leftBorder
      })}
    >
      <div
        className={classnames('w-[40px] h-[40px] rounded-full flex justify-center items-center', {
          'bg-primary': color === 'primary' || !color,
          'bg-secondary': color === 'secondary',
          'bg-accent': color === 'accent',
          'bg-success-avatar': color === 'success',
          'bg-error-avatar': color === 'error',
          'bg-info-avatar': color === 'info',
          'bg-warning-avatar': color === 'warning'
        })}
      >
        {IconSVG ? (
          <IconSVG className="w-[20px] h-[20px] text-light-btnText" />
        ) : (
          <CheckIcon className="w-[20px] h-[20px] text-light-btnText" />
        )}
      </div>
      <div className="ml-[12px] text-dark-btnText dark:text-light-btnText">{title}</div>
    </div>
  )
}

export const Active: React.FC<ActiveProps> = (props) => {
  const { title, leftBorder, step, color } = props
  return (
    <div
      className={classnames('flex items-center p-[16px]', {
        'border-r border-light-border dark:border-dark-border': leftBorder
      })}
    >
      <div
        className={classnames(
          'w-[50px] h-[50px] border-2 rounded-full flex justify-center items-center',
          {
            'border-primary': color === 'primary' || !color,
            'border-secondary': color === 'secondary',
            'border-accent': color === 'accent',
            'border-success-avatar': color === 'success',
            'border-error-avatar': color === 'error',
            'border-info-avatar': color === 'info',
            'border-warning-avatar': color === 'warning'
          }
        )}
      >
        <span
          className={classnames('font-bold', {
            'text-primary': color === 'primary' || !color,
            'text-secondary': color === 'secondary',
            'text-accent': color === 'accent',
            'text-success-avatar': color === 'success',
            'text-error-avatar': color === 'error',
            'text-info-avatar': color === 'info',
            'text-warning-avatar': color === 'warning'
          })}
        >
          {step}
        </span>
      </div>
      <div className="ml-[20px] text-primary">{title}</div>
    </div>
  )
}

export const UnAttended: React.FC<UnattendedProps> = (props) => {
  const { title, leftBorder, step } = props
  return (
    <div
      className={classnames('flex items-center p-[16px]', {
        'border-r border-light-border dark:border-dark-border': leftBorder
      })}
    >
      <div className="w-[50px] h-[50px] border-2 border-light-border dark:border-dark-border rounded-full flex justify-center items-center">
        <span className="text-light-text dark:text-dark-text font-bold">{step}</span>
      </div>
      <div className="ml-[20px] text-light-text dark:text-dark-text">{title}</div>
    </div>
  )
}
