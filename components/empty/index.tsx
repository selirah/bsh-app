import React from 'react'
import { FolderAddIcon, SearchIcon } from '@heroicons/react/outline'
import { Button } from 'components'
import classnames from 'classnames'

type ButtonColor = 'primary' | 'error' | 'success' | 'accent' | 'secondary' | 'info' | 'warning'

interface EmptyProps {
  title: string
  children?: React.ReactNode
  border?: boolean
}

interface ActionButtonProps extends EmptyProps {
  btnColor?: ButtonColor
  IconSVG?: React.FC<React.SVGProps<SVGSVGElement>>
  btnText: string
}

export const Basic: React.FC<EmptyProps> = (props) => {
  const { title, children } = props
  return (
    <div
      className={classnames(
        'w-full rounded bg-light-container dark:bg-dark-container py-20',
        'border border-light-border dark:border-dark-border'
      )}
    >
      <div className="flex justify-center">
        <FolderAddIcon className="w-[100px] h-[100px] text-light-gray dark:bg-dark-gray" />
      </div>
      <div className="text-center mt-4">
        <h5 className="font-lato text-h5 font-bold text-dark-btnText dark:text-light-btnText">
          {title}
        </h5>
        <p className="text-light-text dark:text-dark-text font-montserrat text-pLarge">
          {children}
        </p>
      </div>
    </div>
  )
}

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { btnColor, IconSVG, title, btnText, children } = props
  return (
    <div
      className={classnames(
        'w-full rounded bg-light-container dark:bg-dark-container py-20',
        'border border-light-border dark:border-dark-border'
      )}
    >
      <div className="flex justify-center">
        <FolderAddIcon className="w-[100px] h-[100px] text-light-gray dark:bg-dark-gray" />
      </div>
      <div className="text-center mt-4">
        <h5 className="font-lato text-h5 font-bold text-dark-btnText dark:text-light-btnText">
          {title}
        </h5>
        <p className="text-light-text dark:text-dark-text font-montserrat text-pLarge">
          {children}
        </p>
        <div className="mt-8">
          <Button size="md" color={btnColor}>
            <IconSVG className="w-4 h-5 mr-2" />
            {btnText}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const Filter: React.FC<EmptyProps> = (props) => {
  const { title, children } = props
  return (
    <div
      className={classnames(
        'w-full rounded bg-light-container dark:bg-dark-container py-20',
        'border border-light-border dark:border-dark-border'
      )}
    >
      <div className="flex justify-center">
        <SearchIcon className="w-[100px] h-[100px] text-light-gray dark:bg-dark-gray" />
      </div>
      <div className="text-center mt-4">
        <h5 className="font-lato text-h5 font-bold text-dark-btnText dark:text-light-btnText">
          {title}
        </h5>
        <p className="text-light-text dark:text-dark-text font-montserrat text-pLarge">
          {children}
        </p>
      </div>
    </div>
  )
}
