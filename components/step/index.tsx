import React from 'react'
import { FiCheck } from 'react-icons/fi'
import classnames from 'classnames'

type Color = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'error' | 'warning'

type StepProps = {
  title: string
  leftBorder?: boolean
}

type CompletedProps = StepProps & {
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  color?: Color
}

type ActiveProps = StepProps & {
  step: number
  color?: Color
}

type UnattendedProps = StepProps & {
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
          'bg-success': color === 'success',
          'bg-error': color === 'error',
          'bg-info': color === 'info',
          'bg-warning': color === 'warning'
        })}
      >
        {IconSVG ? (
          <IconSVG className="w-[20px] h-[20px] text-light-btnText" />
        ) : (
          <FiCheck className="w-[20px] h-[20px] text-light-btnText" />
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
          'w-[40px] h-[40px] border-2 rounded-full flex justify-center items-center',
          {
            'border-primary': color === 'primary' || !color,
            'border-secondary': color === 'secondary',
            'border-accent': color === 'accent',
            'border-success': color === 'success',
            'border-error': color === 'error',
            'border-info': color === 'info',
            'border-warning': color === 'warning'
          }
        )}
      >
        <span
          className={classnames('font-bold', {
            'text-primary': color === 'primary' || !color,
            'text-secondary': color === 'secondary',
            'text-accent': color === 'accent',
            'text-success': color === 'success',
            'text-error': color === 'error',
            'text-info': color === 'info',
            'text-warning': color === 'warning'
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
      <div className="w-[40px] h-[40px] border-2 border-light-border dark:border-dark-border rounded-full flex justify-center items-center">
        <span className="text-light-text dark:text-dark-text font-bold">{step}</span>
      </div>
      <div className="ml-[20px] text-light-text dark:text-dark-text">{title}</div>
    </div>
  )
}
