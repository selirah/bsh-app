import React from 'react'
import { FiFolder, FiSearch } from 'react-icons/fi'
import { BsInboxFill } from 'react-icons/bs'
import { Button } from 'components'
import classnames from 'classnames'

type ButtonColor = 'primary' | 'error' | 'success' | 'accent' | 'secondary' | 'info' | 'warning'

type EmptyProps = {
  title: string
  children?: React.ReactNode
  border?: boolean
}

type ActionButtonProps = EmptyProps & {
  btnColor?: ButtonColor
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  btnText: string
  onClick: () => void
}

export const Basic: React.FC<EmptyProps> = (props) => {
  const { title, children, border } = props
  return (
    <div
      className={classnames('w-full rounded bg-light-container dark:bg-dark-container py-12', {
        'border border-light-border dark:border-dark-border border-dashed': border
      })}
    >
      <div className="flex justify-center">
        <FiFolder className="w-[100px] h-[100px] text-light-gray dark:text-dark-gray" />
      </div>
      <div className="text-center mt-4">
        <h6 className="font-lato text-h6 font-bold text-dark-btnText dark:text-light-btnText">
          {title}
        </h6>
        <p className="text-light-text dark:text-dark-text font-montserrat text-pNormal font-regular">
          {children}
        </p>
      </div>
    </div>
  )
}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { btnColor, IconSVG, title, btnText, children, border, onClick } = props
  return (
    <div
      className={classnames('w-full rounded bg-light-container dark:bg-dark-container py-12', {
        'border border-light-border dark:border-dark-border border-dashed': border
      })}
    >
      <div className="flex justify-center">
        <BsInboxFill className="w-[100px] h-[80px] text-light-gray dark:text-dark-gray" />
      </div>
      <div className="text-center mt-4">
        <h6 className="font-lato text-h6 font-bold text-dark-btnText dark:text-light-btnText mb-4">
          {title}
        </h6>
        <p className="text-light-text dark:text-dark-text font-montserrat text-pNormal font-regular">
          {children}
        </p>
        <div className="mt-8">
          <Button size="sm" color={btnColor} onClick={onClick}>
            <IconSVG className="w-4 h-5 mr-2" />
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Filter: React.FC<EmptyProps> = (props) => {
  const { title, children, border } = props
  return (
    <div
      className={classnames('w-full rounded bg-light-container dark:bg-dark-container py-12', {
        'border border-light-border dark:border-dark-border border-dashed': border
      })}
    >
      <div className="flex justify-center">
        <FiSearch className="w-[100px] h-[100px] text-light-gray dark:text-dark-gray" />
      </div>
      <div className="text-center mt-4">
        <h6 className="font-lato text-h6 font-bold text-dark-btnText dark:text-light-btnText">
          {title}
        </h6>
        <p className="text-light-text dark:text-dark-text font-montserrat text-pNormal font-regular">
          {children}
        </p>
      </div>
    </div>
  )
}
